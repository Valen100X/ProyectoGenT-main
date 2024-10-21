const express = require("express");
const { Pool } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(express.json()); // To enable Express to understand JSON

const cors = require("cors");

// Configure CORS to accept requests from any origin
app.use(
  cors({
    origin: "*", // Allow any origin for testing; specify your frontend port if necessary
  })
);

// Serve the index.html file on GET requests to /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Create a function to establish the connection with retry logic
async function connectWithRetry() {
  const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
  });

  let attempts = 0;
  const maxAttempts = 20;
  const retryDelay = 5000; // milliseconds

  while (attempts < maxAttempts) {
    try {
      await pool.query("SELECT NOW()"); // Simple query to check connection
      console.log("Connected to PostgreSQL successfully!");
      return pool; // Return the pool if connection is successful
    } catch (err) {
      attempts++;
      console.error(`Connection attempt ${attempts} failed:`, err);
      if (attempts < maxAttempts) {
        console.log(`Retrying in ${retryDelay / 1000} seconds...`);
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
      } else {
        console.error("Max connection attempts reached. Exiting...");
        process.exit(1); // Exit if max attempts reached
      }
    }
  }
}

// Load schema.sql on startup
const schemaPath = path.join(__dirname, "schema.sql");
const loadSchema = async (pool) => {
  try {
    const data = await fs.promises.readFile(schemaPath, "utf8");
    await pool.query(data);
    console.log("Schema created or verified successfully.");
  } catch (err) {
    console.error("Error reading schema.sql:", err);
    process.exit(1);
  }
};

// Initialize database connection and load schema
let pool;
(async () => {
  pool = await connectWithRetry();
  await loadSchema(pool);
})();

// API routes
// Get all donations
// Rutas de la API
// Obtener todas las donaciones
app.get("/donaciones", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM donaciones");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener donaciones:", error);
    res.status(500).json({ error: "Error al obtener donaciones" });
  }
});

app.delete("/donaciones/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM donaciones WHERE id=$1", [id]);

    if (result) {
      res.status(200).json({ message: "Se ha eliminado correctamente" });
    }
  } catch (error) {
    console.error("Error al obtener la donación:", error);
    res.status(500).json({ error: "Error al obtener la donación" });
  }
});

app.delete("/recibirdonacion/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query("DELETE FROM recibirdonacion WHERE id=$1", [
      id,
    ]);

    if (result) {
      res.status(200).json({ message: "Se ha eliminado correctamente" });
    }
  } catch (error) {
    console.error("Error al obtener la donación:", error);
    res.status(500).json({ error: "Error al obtener la donación" });
  }
});

app.get("/recibirdonacion/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM recibirdonacion WHERE id = $1",
      [id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Donación no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener la donación:", error);
    res.status(500).json({ error: "Error al obtener la donación" });
  }
});

app.get("/recibirdonacion", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM recibirdonacion");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener donaciones:", error);
    res.status(500).json({ error: "Error al obtener donaciones" });
  }
});

// Obtener una donación por id
app.get("/donaciones/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM donaciones WHERE id = $1", [
      id,
    ]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Donación no encontrada" });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al obtener la donación:", error);
    res.status(500).json({ error: "Error al obtener la donación" });
  }
});

// Crear una nueva donación
app.post("/donaciones", async (req, res) => {
  const { nombre, email, dni, causa, tipo_donacion } = req.body;

  console.log(req.body);
  try {
    const result = await pool.query(
      "INSERT INTO donaciones (nombre, email, dni, causa, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, email, dni, causa, tipo_donacion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    postpo;
    console.error("Error al crear donación:", error);
    res.status(500).json({ error: "Error al crear donación" });
  }
});

app.post("/recibirdonacion", async (req, res) => {
  const { nombre, email, dni, causa, tipo_donacion } = req.body;

  console.log(req.body);
  try {
    const result = await pool.query(
      "INSERT INTO recibirdonacion (nombre, email, dni, causa, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [nombre, email, dni, causa, tipo_donacion]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    postpo;
    console.error("Error al crear donación:", error);
    res.status(500).json({ error: "Error al crear donación" });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
