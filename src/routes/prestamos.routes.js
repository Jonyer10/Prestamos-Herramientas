const { Router } = require('express');

// Importamos el controlador de préstamos donde están las funciones (getAll, getById, etc.)
const ctrl = require('../controllers/prestamos.controller');
const router = Router();

// Ruta GET /prestamos  lista todos los préstamos (con JOIN para mostrar vecino y herramienta)
router.get('/', ctrl.getAll);

// Ruta GET /prestamos/:id  obtiene un préstamo específico por su ID
router.get('/:id', ctrl.getById);

// Ruta POST /prestamos  crea un nuevo préstamo
router.post('/', ctrl.create);

// Ruta PUT /prestamos/:id/devolver  marca un préstamo como devuelto (actualiza fecha_devolucion)
router.put('/:id/devolver', ctrl.devolver);

// Ruta DELETE /prestamos/:id  elimina un préstamo por su ID
router.delete('/:id', ctrl.remove);

module.exports = router;
