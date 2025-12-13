const { Router } = require('express');

// Controlador de herramientas donde están las funciones (getAll, getById, etc.)
const ctrl = require('../controllers/herramientas.controller');
const router = Router();

// Ruta GET /herramientas lista todas las herramientas
router.get('/', ctrl.getAll);

// Ruta GET /herramientas/:obtiene una herramienta específica por su ID
router.get('/:id', ctrl.getById);

// Ruta POST /herramientas crea una nueva herramienta
router.post('/', ctrl.create);

// Ruta PUT /herramientas/:actualiza una herramienta existente por su ID
router.put('/:id', ctrl.update);

// Ruta DELETE /herramientas/:elimina una herramienta por su ID
router.delete('/:id', ctrl.remove);

module.exports = router;
