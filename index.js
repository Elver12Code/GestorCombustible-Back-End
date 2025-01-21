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
    const { unidadOperativaId, stock } = req.body;

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

    const currentDate = new Date();

    // Crea el nuevo registro de consumo
    const nuevoConsumo = await prisma.consumoCombustible.create({
      data: {
        unidadOperativa: {
          connect: { id: unidadOperativaId },
        },
        stock: stock,
        formNumber: nextFormNumber,
        fecha: currentDate,
      },
    });

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
