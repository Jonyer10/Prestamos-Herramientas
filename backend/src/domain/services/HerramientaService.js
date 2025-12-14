const Herramienta = require('../entities/Herramienta');

/**
 * Servicio de Dominio para Herramientas
 * Contiene la lógica de negocio relacionada con herramientas
 */
class HerramientaService {
  constructor(herramientaRepository) {
    this.herramientaRepository = herramientaRepository;
  }

  /**
   * Obtiene todas las herramientas
   */
  async listarTodas() {
    return await this.herramientaRepository.findAll();
  }

  /**
   * Obtiene una herramienta por ID
   */
  async obtenerPorId(id) {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }
    
    const herramienta = await this.herramientaRepository.findById(id);
    if (!herramienta) {
      throw new Error('Herramienta no encontrada');
    }
    
    return herramienta;
  }

  /**
   * Crea una nueva herramienta
   */
  async crear(datos) {
    // Crear instancia de la entidad
    const herramienta = new Herramienta({
      tipo: datos.tipo,
      nombre: datos.nombre,
      estado: datos.estado,
      disponible: datos.disponible !== undefined ? datos.disponible : true,
      notas: datos.notas || null,
      imagenUrl: datos.imagenUrl || null
    });

    // Validar usando la lógica de la entidad
    const validacion = herramienta.validar();
    if (!validacion.valido) {
      throw new Error(validacion.errores.join(', '));
    }

    // Guardar en la base de datos
    return await this.herramientaRepository.save(herramienta);
  }

  /**
   * Actualiza una herramienta existente
   */
  async actualizar(id, datos) {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }

    // Verificar que la herramienta existe
    const herramientaExistente = await this.herramientaRepository.findById(id);
    if (!herramientaExistente) {
      throw new Error('Herramienta no encontrada');
    }

    // Validar datos si se proporcionan
    if (datos.estado) {
      const estadosValidos = ['nuevo', 'bueno', 'regular', 'malo'];
      if (!estadosValidos.includes(datos.estado.toLowerCase())) {
        throw new Error(`El estado debe ser uno de: ${estadosValidos.join(', ')}`);
      }
    }

    // Actualizar
    const herramientaActualizada = await this.herramientaRepository.update(id, datos);
    if (!herramientaActualizada) {
      throw new Error('Error al actualizar herramienta');
    }

    return herramientaActualizada;
  }

  /**
   * Elimina una herramienta
   */
  async eliminar(id) {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }

    // Verificar que la herramienta existe
    const herramienta = await this.herramientaRepository.findById(id);
    if (!herramienta) {
      throw new Error('Herramienta no encontrada');
    }

    // Verificar que no tenga préstamos activos
    const tienePrestamos = await this.herramientaRepository.tienePrestamosActivos(id);
    if (tienePrestamos) {
      throw new Error('No se puede eliminar una herramienta con préstamos activos');
    }

    // Eliminar
    const eliminada = await this.herramientaRepository.delete(id);
    if (!eliminada) {
      throw new Error('Error al eliminar herramienta');
    }

    return true;
  }

  /**
   * Marca una herramienta como disponible/no disponible
   */
  async cambiarDisponibilidad(id, disponible) {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }

    const herramienta = await this.herramientaRepository.findById(id);
    if (!herramienta) {
      throw new Error('Herramienta no encontrada');
    }

    if (disponible) {
      herramienta.marcarComoDisponible();
    } else {
      herramienta.marcarComoNoDisponible();
    }

    return await this.herramientaRepository.update(id, { disponible: herramienta.disponible });
  }
}

module.exports = HerramientaService;
