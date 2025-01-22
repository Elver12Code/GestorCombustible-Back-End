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
    const unidades = await prisma.unidadOperativa.findMany(); // Obtiene las unidades operativas
    res.json(unidades);
  } catch (error) {
    console.error("Error al obtener unidades operativas:", error);
    res.status(500).json({ error: "Error al obtener unidades operativas" });
  }
});

// Endpoint para agregar una nueva unidad operativa
app.post("/api/unidades", async (req, res) => {
  try {
    const { name, stock } = req.body;
    const nuevaUnidad = await prisma.unidadOperativa.create({
      data: {
        name,
        stock: Number(stock),
      },
    });
    res.status(201).json(nuevaUnidad);
  } catch (error) {
    console.error("Error al agregar nueva unidad operativa:", error);
    res.status(500).json({ error: "Error al agregar nueva unidad operativa" });
  }
});

app.post("/api/consumos", async (req, res) => {
  try {
    const { unidadOperativaId, stock,
      ordenConsumo,
      clasificador,
      meta,
      combustible,
      cantidad,
      unidad,
      observacion,
      conductorNombre, 
      conductorApellido, 
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
      !conductorApellido
    ) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
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
    // Reducir el stock de la unidad operativa
    const nuevoStock = unidadOperativa.stock - cantidad;
    await prisma.unidadOperativa.update({
      where: { id: unidadOperativaId },
      data: { stock: nuevoStock },
    });

    const currentDate = new Date();
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
        stock: parseFloat(stock, nuevoStock), // Asegurar que sea un número
        formNumber: nextFormNumber,
        fecha: new Date(), // Fecha actual
        conductor: { connect: { id: conductor.id } }, 
        unidadOperativa: {
          connect: { id: unidadOperativaId }, // Relacionar con la unidad operativa
        },
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



// Inicializa el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
