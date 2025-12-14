const VecinoService = require('../../../domain/services/VecinoService');
const PostgresVecinoRepository = require('../../database/repositories/PostgresVecinoRepository');

// Instancias de repositorio y servicio
const vecinoRepository = new PostgresVecinoRepository();
const vecinoService = new VecinoService(vecinoRepository);

/**
 * Controlador HTTP para Vecinos
 * Maneja las peticiones HTTP y delega la lógica de negocio al servicio
 */

// Listar todos los vecinos
exports.getAll = async (req, res) => {
  try {
    const vecinos = await vecinoService.listarTodos();
    res.json(vecinos);
  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({ error: error.message || 'Error al listar vecinos' });
  }
};

// Obtener un vecino por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const vecino = await vecinoService.obtenerPorId(parseInt(id));
    res.json(vecino);
  } catch (error) {
    console.error('Error en getById:', error);
    if (error.message === 'Vecino no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Error al consultar vecino' });
  }
};

// Crear un nuevo vecino
exports.create = async (req, res) => {
  try {
    const { nombre_completo, documento, telefono, email } = req.body;
    
    const vecinoCreado = await vecinoService.crear({
      nombreCompleto: nombre_completo,
      documento,
      telefono,
      email
    });

    res.status(201).json(vecinoCreado);
  } catch (error) {
    console.error('Error en create:', error);
    res.status(400).json({ error: error.message || 'Error al crear vecino' });
  }
};

// Actualizar un vecino existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre_completo, documento, telefono, email } = req.body;
    
    const vecinoActualizado = await vecinoService.actualizar(parseInt(id), {
      nombreCompleto: nombre_completo,
      documento,
      telefono,
      email
    });

    res.json(vecinoActualizado);
  } catch (error) {
    console.error('Error en update:', error);
    if (error.message === 'Vecino no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message || 'Error al actualizar vecino' });
  }
};

// Eliminar un vecino
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await vecinoService.eliminar(parseInt(id));
    res.status(204).send();
  } catch (error) {
    console.error('Error en remove:', error);
    if (error.message === 'Vecino no encontrado') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message.includes('préstamos activos')) {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Error al eliminar vecino' });
  }
};
