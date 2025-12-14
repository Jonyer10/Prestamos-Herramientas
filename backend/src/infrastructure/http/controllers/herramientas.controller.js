const HerramientaService = require('../../../domain/services/HerramientaService');
const PostgresHerramientaRepository = require('../../database/repositories/PostgresHerramientaRepository');

// Instancias de repositorio y servicio
const herramientaRepository = new PostgresHerramientaRepository();
const herramientaService = new HerramientaService(herramientaRepository);

/**
 * Controlador HTTP para Herramientas
 * Maneja las peticiones HTTP y delega la lógica de negocio al servicio
 */

// Listar todas las herramientas
exports.getAll = async (req, res) => {
  try {
    const herramientas = await herramientaService.listarTodas();
    res.json(herramientas);
  } catch (error) {
    console.error('Error en getAll:', error);
    res.status(500).json({ error: error.message || 'Error al listar herramientas' });
  }
};

// Obtener una herramienta por ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params;
    const herramienta = await herramientaService.obtenerPorId(parseInt(id));
    res.json(herramienta);
  } catch (error) {
    console.error('Error en getById:', error);
    if (error.message === 'Herramienta no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Error al consultar herramienta' });
  }
};

// Crear una nueva herramienta
exports.create = async (req, res) => {
  try {
    const { tipo, nombre, estado, disponible, notas } = req.body;
    
    // Obtener la URL de la imagen si se subió un archivo
    let imagenUrl = null;
    if (req.file) {
      imagenUrl = `/uploads/herramientas/${req.file.filename}`;
    }

    const herramientaCreada = await herramientaService.crear({
      tipo,
      nombre,
      estado,
      disponible,
      notas,
      imagenUrl
    });

    res.status(201).json(herramientaCreada);
  } catch (error) {
    console.error('Error en create:', error);
    res.status(400).json({ error: error.message || 'Error al crear herramienta' });
  }
};

// Actualizar una herramienta existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { tipo, nombre, estado, disponible, notas } = req.body;
    
    // Obtener la URL de la imagen si se subió un archivo nuevo
    let imagenUrl;
    if (req.file) {
      imagenUrl = `/uploads/herramientas/${req.file.filename}`;
    }

    const herramientaActualizada = await herramientaService.actualizar(parseInt(id), {
      tipo,
      nombre,
      estado,
      disponible,
      notas,
      imagenUrl
    });

    res.json(herramientaActualizada);
  } catch (error) {
    console.error('Error en update:', error);
    if (error.message === 'Herramienta no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    res.status(400).json({ error: error.message || 'Error al actualizar herramienta' });
  }
};

// Eliminar una herramienta
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    await herramientaService.eliminar(parseInt(id));
    res.status(204).send();
  } catch (error) {
    console.error('Error en remove:', error);
    if (error.message === 'Herramienta no encontrada') {
      return res.status(404).json({ error: error.message });
    }
    if (error.message.includes('préstamos activos')) {
      return res.status(409).json({ error: error.message });
    }
    res.status(500).json({ error: error.message || 'Error al eliminar herramienta' });
  }
};
