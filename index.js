
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
        stockInicial: true,  // Asegúrate de incluir stockInicial
      },
    }); // Obtiene las unidades operativas
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
        stock: Number(stock),
        stockInicial: Number(stockInicial),  // Asegúrate de incluir stockInicial

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
    const solicitantes = await prisma.solicitante.findMany(); // Obtiene los solicitantes
    res.json(solicitantes);
  } catch (error) {
    console.error("Error al obtener solicitantes:", error);
    res.status(500).json({ error: "Error al obtener solicitantes" });
  }
});

// Agregar un nuevo solicitante
app.post("/api/solicitantes", async (req, res) => {
  try {
    const { nombres, apellidos } = req.body; // Extraemos los datos del solicitante

    if (!nombres || !apellidos) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Crear el nuevo solicitante
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
    const autorizados = await prisma.autorizado.findMany(); // Obtiene los autorizados
    res.json(autorizados);
  } catch (error) {
    console.error("Error al obtener autorizados:", error);
    res.status(500).json({ error: "Error al obtener autorizados" });
  }
});

// Agregar un nuevo autorizados
app.post("/api/autorizados", async (req, res) => {
  try {
    const { nombres, apellidos } = req.body; // Extraemos los datos del solicitante

    if (!nombres || !apellidos) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Crear el nuevo autorizados
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
      // Si no existe, crear una nueva máquina
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
      orderBy: { fecha: "asc" }, // Ordenar por la fecha más antigua
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
      ? primerRegistroConsumo.stockInicial // Usar el stock inicial del primer registro
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
          value: 1,  // Si no existe, empieza desde 1
        },
      });
    }

    // Calcula el siguiente número de formulario
    const nextFormNumber = lastFormNumber.value;
    
    // Actualiza el número de formulario para la próxima vez
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
    const formattedDate = currentDate.toISOString().split('T')[0];  // Esto te dará solo 'YYYY-MM-DD'
    
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

    // Crea el nuevo registro de consumo
    const nuevoConsumo = await prisma.consumoCombustible.create({
      data: {
        ordenConsumo,
        clasificador,
        meta,
        combustible,
        cantidad: parseFloat(cantidad), // Asegurar que sea un número
        unidad,
        observacion,
        stock: stockInicial,
        stockActual, // Asegurar que sea un número
        stockInicial,
        formNumber: nextFormNumber,
        fecha: new Date(),
        conductor: { 
          connect: { id: conductor.id } }, 
        proveedor: { 
          connect: { id: proveedor.id } },
        unidadOperativa: {
          connect: { id: unidadOperativaId }, // Relacionar con la unidad operativa
        },
        solicitante: {
          connect: { id: solicitanteId }, // Relacionar con la unidad operativa
        },
        autorizado: {
          connect: { id: autorizadoId }, // Relacionar con la unidad operativa
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
        conductor: true,          // Incluye información del conductor
        unidadOperativa: true,    // Incluye información de la unidad operativa
        solicitante: true,        // Incluye información del solicitante
        autorizado: true,         // Incluye información del autorizado
        maquina: true,  
      },
    });

    // Incluye el stock actual en cada consumo, si es necesario
    const consumosConStock = consumos.map(consumo => ({
      ...consumo,
      stockActual: consumo.stockActual,  // O el campo que refleje el stock actual
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
    // Obtener el último formNumber
    let lastFormNumber = await prisma.formNumber.findFirst();

    if (!lastFormNumber) {
      // Si no existe, devolver 1 como el primer número de formulario
      lastFormNumber = await prisma.formNumber.create({
        data: {
          value: 1,  // Si no existe, empieza desde 1
        },
      });
    }

    return res.json({ formNumber: lastFormNumber.value });
  } catch (error) {
    console.error("Error al obtener formNumber:", error);
    res.status(500).json({ error: "Error al obtener formNumber." });
  }
});
// Endpoint para eliminar un consumo por ID
app.delete("/api/consumos/:id", async (req, res) => {
  const { id } = req.params; // Obtener el ID desde los parámetros de la URL
  try {
    // Verificar si el registro existe antes de intentar eliminarlo
    const consumo = await prisma.consumoCombustible.findUnique({
      where: { id: parseInt(id) }, // Asegúrate de convertir a número si el ID es numérico
    });

    if (!consumo) {
      return res.status(404).json({ error: "Registro no encontrado" });
    }

    // Eliminar el registro
    await prisma.consumoCombustible.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({ message: "Registro eliminado exitosamente" });
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