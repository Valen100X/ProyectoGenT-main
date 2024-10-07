const express = require('express');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json()); // Para que Express entienda JSON

// Serve the index.html file on GET requests to /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Configurar conexión a PostgreSQL
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// Cargar schema.sql al iniciar
const schemaPath = path.join(__dirname, 'schema.sql');
fs.readFile(schemaPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error al leer el archivo schema.sql:', err);
    process.exit(1);
  }
  pool.query(data)
    .then(() => console.log('Tabla creada o verificada correctamente.'))
    .catch(err => console.error('Error al ejecutar schema.sql:', err));
});

// Rutas de la API
// Obtener todas las donaciones
app.get('/donaciones', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM donaciones');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener donaciones:', error);
    res.status(500).json({ error: 'Error al obtener donaciones' });
  }
});

// Obtener una donación por id
app.get('/donaciones/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM donaciones WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Donación no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener la donación:', error);
    res.status(500).json({ error: 'Error al obtener la donación' });
  }
});

// Crear una nueva donación
app.post('/donaciones', async (req, res) => {
  const { nombre, email, dni, causa, tipo } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO donaciones (nombre, email, dni, causa, tipo) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [nombre, email, dni, causa, tipo]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear donación:', error);
    res.status(500).json({ error: 'Error al crear donación' });
  }
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
