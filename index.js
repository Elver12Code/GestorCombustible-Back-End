
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());


// Endpoint para obtener todas las unidades operativas
app.get("/api/unidades", async (req, res) => {
  try {
    const unidades = await prisma.unidadOperativa.findMany({
      select: {
        id: true,
        name: true,
        stock: true,
        stockInicial: true,  
      },
    }); 
    res.json(unidades);
  } catch (error) {
    console.error("Error al obtener unidades operativas:", error);
    res.status(500).json({ error: "Error al obtener unidades operativas" });
  }
});

// Endpoint para agregar una nueva unidad operativa
app.post("/api/unidades", async (req, res) => {
  try {
    const { name, stock, stockInicial } = req.body;
    const nuevaUnidad = await prisma.unidadOperativa.create({
      data: {
        name,
        stock: parseFloat(stock),
        stockInicial: parseFloat(stockInicial),  

      },
    });
    res.status(201).json(nuevaUnidad);
  } catch (error) {
    console.error("Error al agregar nueva unidad operativa:", error);
    res.status(500).json({ error: "Error al agregar nueva unidad operativa" });
  }
});

// Obtener todos los solicitantes
app.get("/api/solicitantes", async (req, res) => {
  try {
    const solicitantes = await prisma.solicitante.findMany(); 
    res.json(solicitantes);
  } catch (error) {
    console.error("Error al obtener solicitantes:", error);
    res.status(500).json({ error: "Error al obtener solicitantes" });
  }
});

// Agregar un nuevo solicitante
app.post("/api/solicitantes", async (req, res) => {
  try {
    const { nombres, apellidos } = req.body; 

    if (!nombres || !apellidos) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const nuevoSolicitante = await prisma.solicitante.create({
      data: {
        nombres,
        apellidos,
      },
    });
    res.status(201).json(nuevoSolicitante);
  } catch (error) {
    console.error("Error al agregar solicitante:", error);
    res.status(500).json({ error: "Error al agregar solicitante" });
  }
});

// Obtener todos los autorizados
app.get("/api/autorizados", async (req, res) => {
  try {
    const autorizados = await prisma.autorizado.findMany(); 
    res.json(autorizados);
  } catch (error) {
    console.error("Error al obtener autorizados:", error);
    res.status(500).json({ error: "Error al obtener autorizados" });
  }
});

// Agregar un nuevo autorizados
app.post("/api/autorizados", async (req, res) => {
  try {
    const { nombres, apellidos } = req.body; 

    if (!nombres || !apellidos) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    const nuevoAutorizado = await prisma.autorizado.create({
      data: {
        nombres,
        apellidos,
      },
    });
    res.status(201).json(nuevoAutorizado);
  } catch (error) {
    console.error("Error al agregar autorizados:", error);
    res.status(500).json({ error: "Error al agregar autorizados" });
  }
});

app.post("/api/consumos", async (req, res) => {
  try {
    const { unidadOperativaId, solicitanteId, autorizadoId, stock,
      ordenConsumo,
      clasificador,
      meta,
      combustible,
      cantidad,
      unidad,
      observacion,
      conductorNombre, 
      conductorApellido,
      proveedorNombres,
      proveedorApellidos,
      proveedorRuc,
      placa,
      tipo,
      maquina,
      fecha,
     } = req.body;

    // Validar que todos los campos necesarios estén presentes
    if (
      !unidadOperativaId ||
      !ordenConsumo ||
      !clasificador ||
      !meta ||
      !combustible ||
      !cantidad ||
      !unidad ||
      !conductorNombre || 
      !conductorApellido ||
      !maquina ||
      !placa ||
      !tipo ||
      !solicitanteId ||
      !autorizadoId ||
      !proveedorNombres ||
      !proveedorApellidos ||
      !proveedorRuc

    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }
    
    // Verificar si la máquina ya existe
    let maquinaExistente = await prisma.maquina.findFirst({
      where: { placa },
    });

    if (!maquinaExistente) {
      maquinaExistente = await prisma.maquina.create({
        data: {
          nombre: maquina,
          placa,
          tipo,
        },
      });
    }
    // Verifica que el `unidadOperativaId` esté definido
    if (!unidadOperativaId) {
      return res.status(400).json({ error: "Unidad operativa no especificada" });
    }

    // Verifica que la unidad operativa exista en la base de datos
    const unidadOperativa = await prisma.unidadOperativa.findUnique({
      where: { id: unidadOperativaId },
    });

    if (!unidadOperativa) {
      return res.status(404).json({ error: "Unidad operativa no encontrada" });
    }
    // Obtener el stock inicial desde el primer registro de la unidad operativa
    const primerRegistroConsumo = await prisma.consumoCombustible.findFirst({
      where: { unidadOperativaId },
      orderBy: { fecha: "asc" }, 
    });
    
     // Verifica que el `solicitanteId` esté definido
     if (!solicitanteId) {
      return res.status(400).json({ error: "solicitante no especificada" });
    }

    // Verifica que la unidad operativa exista en la base de datos
    const solicitante = await prisma.solicitante.findUnique({
      where: { id: solicitanteId },
    });

    if (!solicitante) {
      return res.status(404).json({ error: "solicitante no encontrada" });
    }
    
    // Verifica que el `Autorizado` esté definido
    if (!autorizadoId) {
      return res.status(400).json({ error: "Unidad Autorizado no especificada" });
    }

    // Verifica que Autorizado exista en la base de datos
    const autorizado = await prisma.autorizado.findUnique({
      where: { id: autorizadoId },
    });

    if (!autorizado) {
      return res.status(404).json({ error: "Unidad Autorizado no encontrada" });
    }
    const stockInicial = primerRegistroConsumo
      ? primerRegistroConsumo.stockInicial 
      : unidadOperativa.stock;

    // Verifica si hay suficiente stock
    if (unidadOperativa.stock < cantidad) {
      return res.status(400).json({ error: "Stock insuficiente para este consumo" });
    }

    // Obtiene el último formNumber de la tabla FormNumber
    let lastFormNumber = await prisma.formNumber.findFirst();

    if (!lastFormNumber) {
      lastFormNumber = await prisma.formNumber.create({
        data: {
          value: 1,  
        },
      });
    }

    // Calcula el siguiente número de formulario
    const nextFormNumber = lastFormNumber.value;
    
    await prisma.formNumber.update({
      where: { id: lastFormNumber.id },
      data: { value: nextFormNumber + 1 },
    });

    // Reducir el stock actual de la unidad operativa
    const nuevoStockActual = unidadOperativa.stock - cantidad;

    await prisma.unidadOperativa.update({
      where: { id: unidadOperativaId },
      data: { stock: nuevoStockActual },
    });

    const currentDate = new Date();
    
    // Formatear la fecha para eliminar la hora
    const formattedDate = currentDate.toISOString().split('T')[0];  
    
    // Crear o buscar al conductor por nombre y apellido
    let conductor = await prisma.conductor.findFirst({
      where: {
        nombres: conductorNombre,
        apellidos: conductorApellido
      }
    });

    // Si el conductor no existe, lo crea
    if (!conductor) {
      conductor = await prisma.conductor.create({
        data: {
          nombres: conductorNombre,
          apellidos: conductorApellido
        }
      });
    }
    // Crear o buscar al proveedor por nombre y apellido
    let proveedor = await prisma.proveedor.findFirst({
      where: {
        nombres: proveedorNombres,
        apellidos: proveedorApellidos,
        ruc: proveedorRuc
      }
    });

    // Si el proveedor no existe, lo crea
    if (!proveedor) {
      proveedor = await prisma.proveedor.create({
        data: {
          nombres: proveedorNombres,
          apellidos: proveedorApellidos,
          ruc: proveedorRuc
        }
      });
    }

    // Actualizar el stock después del consumo
    const stockActual = unidadOperativa.stock - cantidad;
    await prisma.unidadOperativa.update({
      where: { id: unidadOperativaId },
      data: { stock: stockActual },
    });

    // Buscar el formNumber disponible más bajo
    const formNumbers = await prisma.consumoCombustible.findMany({
      orderBy: { formNumber: 'asc' },
    });

    let formNumber = 1;
    for (let i = 0; i < formNumbers.length; i++) {
      if (formNumbers[i].formNumber !== formNumber) {
        break;
      }
      formNumber++;
    }
    const fechaISO = new Date(req.body.fecha).toISOString(); 

    // Crea el nuevo registro de consumo
    const nuevoConsumo = await prisma.consumoCombustible.create({
      data: {
        ordenConsumo,
        clasificador,
        meta,
        combustible,
        cantidad: parseFloat(cantidad), 
        unidad,
        observacion,
        stock: stockInicial,
        stockActual, 
        stockInicial,
        formNumber: nextFormNumber,
        fecha: fechaISO, 
        conductor: { 
          connect: { id: conductor.id } }, 
        proveedor: { 
          connect: { id: proveedor.id } },
        unidadOperativa: {
          connect: { id: unidadOperativaId }, 
        },
        solicitante: {
          connect: { id: solicitanteId }, 
        },
        autorizado: {
          connect: { id: autorizadoId }, 
        },
        maquina: { 
          connect: { id: maquinaExistente.id } },
      },
    });
    
    if (unidadOperativa.stock < cantidad) {
      return res.status(400).json({ error: "Stock insuficiente para este consumo" });
    }

    res.status(201).json(nuevoConsumo);
  } catch (error) {
    console.error("Error al registrar consumo:", error);
    res.status(500).json({ error: "Hubo un problema al registrar el consumo" });
  }
});

app.get("/api/consumos", async (req, res) => {
  try {
    const consumos = await prisma.consumoCombustible.findMany({
      include: {
        conductor: true,          
        unidadOperativa: true,    
        solicitante: true,        
        autorizado: true,         
        maquina: true,  
      },
    });

    // Incluye el stock actual en cada consumo, si es necesario
    const consumosConStock = consumos.map(consumo => ({
      ...consumo,
      stockActual: consumo.stockActual,  
    }));

    res.json(consumos);
  } catch (error) {
    console.error("Error al obtener consumos:", error);
    res.status(500).json({ error: "Error al obtener consumos." });
  }
});

//
app.get('/api/formNumber', async (req, res) => {
  try {
    let lastFormNumber = await prisma.formNumber.findFirst();

    if (!lastFormNumber) {
      lastFormNumber = await prisma.formNumber.create({
        data: {
          value: 1,  
        },
      });
    }

    return res.json({ formNumber: lastFormNumber.value });
  } catch (error) {
    console.error("Error al obtener formNumber:", error);
    res.status(500).json({ error: "Error al obtener formNumber." });
  }
});
app.delete("/api/consumos/:id", async (req, res) => {
  const { id } = req.params; 
  try {
    const consumo = await prisma.consumoCombustible.findUnique({
      where: { id: parseInt(id) }, 
    });

    if (!consumo) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }

    // Obtener la unidad operativa asociada
    const unidadOperativa = await prisma.unidadOperativa.findUnique({
      where: { id: consumo.unidadOperativaId },
    });

    if (!unidadOperativa) {
      return res.status(404).json({ error: "Unidad operativa no encontrada" });
    }

    await prisma.$transaction(async (prisma) => {
      const nuevoStock = unidadOperativa.stock + consumo.cantidad;
      await prisma.unidadOperativa.update({
        where: { id: consumo.unidadOperativaId },
        data: { stock: nuevoStock },
      });

      // Eliminar el registro
      await prisma.consumoCombustible.delete({
        where: { id: parseInt(id) },
      });

      // Reorganizar los formNumbers para llenar el hueco
      await prisma.consumoCombustible.updateMany({
        where: { formNumber: { gt: consumo.formNumber } },
        data: {
          formNumber: {
            decrement: 1, 
          },
        },
      });
      // Reajustar el valor del formNumber
      const consumosRestantes = await prisma.consumoCombustible.findMany({
        orderBy: { formNumber: 'asc' }, 
      });

      // Asignar el siguiente valor correcto al formNumber
      if (consumosRestantes.length > 0) {
        let nextFormNumber = 1;
        for (const consumoRestante of consumosRestantes) {
          if (consumoRestante.formNumber !== nextFormNumber) {
            await prisma.consumoCombustible.update({
              where: { id: consumoRestante.id },
              data: { formNumber: nextFormNumber },
            });
          }
          nextFormNumber++;
        }

        // Actualiza el valor global de formNumber
        await prisma.formNumber.update({
          where: { id: 1 }, 
          data: { value: nextFormNumber },
        });
      } else {
        // Si no hay registros restantes, resetear formNumber a 1
        await prisma.formNumber.update({
          where: { id: 1 }, 
          data: { value: 1 },
        });
      }
    });

    res.status(200).json({
      message: "Registro eliminado exitosamente, stock actualizado, y formNumbers reorganizados",
    });
  } catch (error) {
    console.error("Error al eliminar el registro:", error);
    res.status(500).json({ error: "Error al eliminar el registro" });
  }
});

// Inicializa el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});


/* // Configuración de CORS para permitir acceso desde cualquier origen
app.use(cors({
  origin: "*", // Permitir solicitudes de cualquier origen
  methods: ["GET", "POST", "DELETE"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());


// Inicializa el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});*/