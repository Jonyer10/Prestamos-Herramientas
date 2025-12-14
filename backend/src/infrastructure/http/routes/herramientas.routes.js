const { Router } = require('express');
const upload = require('../multerConfig');

// Controlador de herramientas donde están las funciones (getAll, getById, etc.)
const ctrl = require('../controllers/herramientas.controller');
const router = Router();

// Ruta GET /herramientas lista todas las herramientas
router.get('/', ctrl.getAll);

// Ruta GET /herramientas/:id obtiene una herramienta específica por su ID
router.get('/:id', ctrl.getById);

// Ruta POST /herramientas crea una nueva herramienta (con soporte para imagen)
router.post('/', upload.single('imagen'), ctrl.create);

// Ruta PUT /herramientas/:id actualiza una herramienta existente por su ID (con soporte para imagen)
router.put('/:id', upload.single('imagen'), ctrl.update);

// Ruta DELETE /herramientas/:id elimina una herramienta por su ID
router.delete('/:id', ctrl.remove);

module.exports = router;
