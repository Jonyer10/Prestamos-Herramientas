// Pool de la librería pg (PostgreSQL para Node.js)
const { Pool } = require('pg');

// dotenv para poder leer las variables de entorno desde el archivo .env
require('dotenv').config();

// Instancia de Pool (conexión a la base de datos)
// Cada propiedad se obtiene desde las variables de entorno definidas en .env
const pool = new Pool({
  host: process.env.PGHOST,       // Dirección del servidor de la base de datos
  port: process.env.PGPORT,       // Puerto de conexión (por defecto PostgreSQL usa 5432)
  database: process.env.PGDATABASE, // Nombre de la base de datos
  user: process.env.PGUSER,       // Usuario para conectarse
  password: process.env.PGPASSWORD // Contraseña del usuario
});

// Mensaje en consola a que base se esta conectando
console.log('Conectando a la base:', process.env.PGDATABASE);

// Se exporta para usarlo en otros archivos
module.exports = pool;
