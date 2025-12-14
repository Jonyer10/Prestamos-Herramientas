const express = require('express'); // Framework para crear el servidor y manejar rutas
const cors = require('cors');       // Middleware para permitir peticiones desde otros orígenes (ej. frontend)
const path = require('path');       // Para manejar rutas de archivos
require('dotenv').config();         // Carga las variables de entorno desde el archivo .env

//  rutas de cada módulo
const herramientasRoutes = require('./infrastructure/http/routes/herramientas.routes');
const vecinosRoutes = require('./infrastructure/http/routes/vecinos.routes');
const prestamosRoutes = require('./infrastructure/http/routes/prestamos.routes');

// aplicación Express
const app = express();

// Middlewares globales
app.use(cors());           // Habilita CORS para que el frontend pueda consumir la API
app.use(express.json());   // Permite recibir y procesar datos en formato JSON en el body de las peticiones

// Servir archivos estáticos (imágenes de herramientas)
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Definimos las rutas principales de la API
app.use('/herramientas', herramientasRoutes); // Ruta gestión de herramientas
app.use('/vecinos', vecinosRoutes);           // Ruta gestión de vecinos
app.use('/prestamos', prestamosRoutes);       // Ruta gestión de préstamos

// Puerto de ejecución
const port = process.env.PORT || 4000;

// Inicia el servidor
app.listen(port, () => {
  console.log(`API corriendo en puerto ${port}`);
  console.log(`Archivos estáticos servidos desde: ${path.join(__dirname, '../uploads')}`);
});
