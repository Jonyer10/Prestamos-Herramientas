const Prestamo = require('../entities/Prestamo');

/**
 * Servicio de Dominio para Préstamos
 * Contiene la lógica de negocio relacionada con préstamos
 */
class PrestamoService {
  constructor(prestamoRepository, herramientaRepository, vecinoRepository) {
    this.prestamoRepository = prestamoRepository;
    this.herramientaRepository = herramientaRepository;
    this.vecinoRepository = vecinoRepository;
  }

  /**
   * Obtiene todos los préstamos
   */
  async listarTodos() {
    return await this.prestamoRepository.findAll();
  }

  /**
   * Obtiene un préstamo por ID
   */
  async obtenerPorId(id) {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }
    
    const prestamo = await this.prestamoRepository.findById(id);
    if (!prestamo) {
      throw new Error('Préstamo no encontrado');
    }
    
    return prestamo;
  }

  /**
   * Obtiene préstamos activos
   */
  async listarActivos() {
    return await this.prestamoRepository.findActivos();
  }

  /**
   * Crea un nuevo préstamo
   */
  async crear(datos) {
    // Crear instancia de la entidad
    const prestamo = new Prestamo({
      vecinoId: datos.vecinoId,
      herramientaId: datos.herramientaId,
      observaciones: datos.observaciones || null
    });

    // Validar usando la lógica de la entidad
    const validacion = prestamo.validar();
    if (!validacion.valido) {
      throw new Error(validacion.errores.join(', '));
    }

    // Verificar que el vecino existe
    const vecino = await this.vecinoRepository.findById(datos.vecinoId);
    if (!vecino) {
      throw new Error('El vecino especificado no existe');
    }

    // Verificar que la herramienta existe
    const herramienta = await this.herramientaRepository.findById(datos.herramientaId);
    if (!herramienta) {
      throw new Error('La herramienta especificada no existe');
    }

    // Verificar que la herramienta está disponible
    if (!herramienta.estaDisponible()) {
      throw new Error('La herramienta no está disponible para préstamo');
    }

    // Verificar que la herramienta no tenga préstamos activos
    const tienePrestamosActivos = await this.herramientaRepository.tienePrestamosActivos(datos.herramientaId);
    if (tienePrestamosActivos) {
      throw new Error('La herramienta ya tiene un préstamo activo');
    }

    // Guardar el préstamo
    const prestamoCreado = await this.prestamoRepository.save(prestamo);

    // Marcar la herramienta como no disponible
    await this.herramientaRepository.update(datos.herramientaId, { disponible: false });

    return prestamoCreado;
  }

  /**
   * Marca un préstamo como devuelto
   */
  async devolver(id) {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }

    // Obtener el préstamo
    const prestamo = await this.prestamoRepository.findById(id);
    if (!prestamo) {
      throw new Error('Préstamo no encontrado');
    }

    // Verificar que el préstamo está activo
    if (!prestamo.estaActivo()) {
      throw new Error('El préstamo ya ha sido devuelto');
    }

    // Marcar como devuelto
    const prestamoDevuelto = await this.prestamoRepository.marcarComoDevuelto(id);
    
    // Marcar la herramienta como disponible nuevamente
    await this.herramientaRepository.update(prestamo.herramientaId, { disponible: true });

    return prestamoDevuelto;
  }

  /**
   * Actualiza un préstamo
   */
  async actualizar(id, datos) {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }

    // Verificar que el préstamo existe
    const prestamoExistente = await this.prestamoRepository.findById(id);
    if (!prestamoExistente) {
      throw new Error('Préstamo no encontrado');
    }

    // Si se cambia el vecino, verificar que existe
    if (datos.vecinoId) {
      const vecino = await this.vecinoRepository.findById(datos.vecinoId);
      if (!vecino) {
        throw new Error('El vecino especificado no existe');
      }
    }

    // Si se cambia la herramienta, verificar que existe
    if (datos.herramientaId) {
      const herramienta = await this.herramientaRepository.findById(datos.herramientaId);
      if (!herramienta) {
        throw new Error('La herramienta especificada no existe');
      }
    }

    // Actualizar
    return await this.prestamoRepository.update(id, datos);
  }

  /**
   * Elimina un préstamo
   */
  async eliminar(id) {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }

    // Verificar que el préstamo existe
    const prestamo = await this.prestamoRepository.findById(id);
    if (!prestamo) {
      throw new Error('Préstamo no encontrado');
    }

    // Si el préstamo está activo, marcar la herramienta como disponible
    if (prestamo.estaActivo()) {
      await this.herramientaRepository.update(prestamo.herramientaId, { disponible: true });
    }

    // Eliminar
    const eliminado = await this.prestamoRepository.delete(id);
    if (!eliminado) {
      throw new Error('Error al eliminar préstamo');
    }

    return true;
  }
}

module.exports = PrestamoService;
