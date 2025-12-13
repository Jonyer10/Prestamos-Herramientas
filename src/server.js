const express = require('express'); // Framework para crear el servidor y manejar rutas
const cors = require('cors');       // Middleware para permitir peticiones desde otros orígenes (ej. frontend)
require('dotenv').config();         // Carga las variables de entorno desde el archivo .env

//  rutas de cada módulo
const herramientasRoutes = require('./routes/herramientas.routes');
const vecinosRoutes = require('./routes/vecinos.routes');
const prestamosRoutes = require('./routes/prestamos.routes');

// aplicación Express
const app = express();

// Middlewares globales
app.use(cors());           // Habilita CORS para que el frontend pueda consumir la API
app.use(express.json());   // Permite recibir y procesar datos en formato JSON en el body de las peticiones

// Definimos las rutas principales de la API

app.use('/herramientas', herramientasRoutes); // Ruta gestión de herramientas
app.use('/vecinos', vecinosRoutes);           // Ruta gestión de vecinos
app.use('/prestamos', prestamosRoutes);       // Ruta gestión de préstamos

// Puerto de ejecución
const port = process.env.PORT || 4000;

// Inicia el servidor
app.listen(port, () => {
  console.log(`API corriendo en puerto ${port}`);
});
