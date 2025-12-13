const { Router } = require('express');

// Importamos el controlador de vecinos donde están las funciones (getAll, getById, etc.)
const ctrl = require('../controllers/vecinos.controller');
const router = Router();

// Ruta GET /vecinos  lista todos los vecinos
router.get('/', ctrl.getAll);        

// Ruta GET /vecinos/:id  obtiene un vecino específico por su ID
router.get('/:id', ctrl.getById);    

// Ruta POST /vecinos  crea un nuevo vecino
router.post('/', ctrl.create);       

// Ruta PUT /vecinos/:id  actualiza un vecino existente por su ID
router.put('/:id', ctrl.update);     

// Ruta DELETE /vecinos/:id  elimina un vecino por su ID
router.delete('/:id', ctrl.remove);  

module.exports = router;
