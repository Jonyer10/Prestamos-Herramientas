const PrestamoService = require('../../../domain/services/PrestamoService');
const PostgresPrestamoRepository = require('../../database/repositories/PostgresPrestamoRepository');
const PostgresHerramientaRepository = require('../../database/repositories/PostgresHerramientaRepository');
const PostgresVecinoRepository = require('../../database/repositories/PostgresVecinoRepository');

// Instancias de repositorios y servicio
const prestamoRepository = new PostgresPrestamoRepository();
const herramientaRepository = new PostgresHerramientaRepository();
const vecinoRepository = new PostgresVecinoRepository();
const prestamoService = new PrestamoService(prestamoRepository, herramientaRepository, vecinoRepository);

/**
 * Controlador HTTP para Préstamos
 * Maneja las peticiones HTTP y delega la lógica de negocio al servicio
 */

// Lista todos los préstamos con información completa
const getAll = async (req, res) => {
  try {
    const prestamos = await prestamoService.listarTodos();
    res.json(prestamos);
  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({ error: error.message || 'Error al listar préstamos' });
  }
};

// Obtener préstamo por ID
const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const prestamo = await prestamoService.obtenerPorId(parseInt(id));
    res.json(prestamo);
  } catch (error) {
    console.error('Error en getById:', error);
    if (error.message === 'Préstamo no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Error al obtener préstamo' });
  }
};

// Crear préstamo 
const create = async (req, res) => {
  try {
    const { vecinoId, herramientaId, observaciones } = req.body;

    const prestamoCreado = await prestamoService.crear({
      vecinoId: parseInt(vecinoId),
      herramientaId: parseInt(herramientaId),
      observaciones
    });

    res.status(201).json(prestamoCreado);
  } catch (error) {
    console.error('Error en create:', error);
    res.status(400).json({ error: error.message || 'Error al crear préstamo' });
  }
};

// Actualizar préstamo 
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { vecino_id, herramienta_id, fecha_prestamo, fecha_devolucion, observaciones } = req.body;
    
    const prestamoActualizado = await prestamoService.actualizar(parseInt(id), {
      vecinoId: vecino_id ? parseInt(vecino_id) : undefined,
      herramientaId: herramienta_id ? parseInt(herramienta_id) : undefined,
      fechaPrestamo: fecha_prestamo,
      fechaDevolucion: fecha_devolucion,
      observaciones
    });

    res.json(prestamoActualizado);
  } catch (error) {
    console.error('Error en update:', error);
    if (error.message === 'Préstamo no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message || 'Error al actualizar préstamo' });
  }
};

// Marcar préstamo como devuelto
const devolver = async (req, res) => {
  try {
    const { id } = req.params;
    const prestamoDevuelto = await prestamoService.devolver(parseInt(id));
    res.json(prestamoDevuelto);
  } catch (error) {
    console.error('Error en devolver:', error);
    if (error.message === 'Préstamo no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message.includes('ya ha sido devuelto')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Error al devolver préstamo' });
  }
};

// Eliminar préstamo
const remove = async (req, res) => {
  try {
    const { id } = req.params;
    await prestamoService.eliminar(parseInt(id));
    res.status(204).send();
  } catch (error) {
    console.error('Error en remove:', error);
    if (error.message === 'Préstamo no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Error al eliminar préstamo' });
  }
};

// Se exportan las funciones para usarlas en las rutas
module.exports = {
  getAll,
  getById,
  create,     
  update,
  devolver,
  remove
};
