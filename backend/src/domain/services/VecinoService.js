const Vecino = require('../entities/Vecino');

/**
 * Servicio de Dominio para Vecinos
 * Contiene la lógica de negocio relacionada con vecinos
 */
class VecinoService {
  constructor(vecinoRepository) {
    this.vecinoRepository = vecinoRepository;
  }

  /**
   * Obtiene todos los vecinos
   */
  async listarTodos() {
    return await this.vecinoRepository.findAll();
  }

  /**
   * Obtiene un vecino por ID
   */
  async obtenerPorId(id) {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }
    
    const vecino = await this.vecinoRepository.findById(id);
    if (!vecino) {
      throw new Error('Vecino no encontrado');
    }
    
    return vecino;
  }

  /**
   * Crea un nuevo vecino
   */
  async crear(datos) {
    // Crear instancia de la entidad
    const vecino = new Vecino({
      nombreCompleto: datos.nombreCompleto,
      documento: datos.documento,
      telefono: datos.telefono,
      email: datos.email
    });

    // Validar usando la lógica de la entidad
    const validacion = vecino.validar();
    if (!validacion.valido) {
      throw new Error(validacion.errores.join(', '));
    }

    // Verificar que no exista un vecino con el mismo documento
    const vecinoExistente = await this.vecinoRepository.findByDocumento(datos.documento);
    if (vecinoExistente) {
      throw new Error('Ya existe un vecino registrado con ese documento');
    }

    // Guardar en la base de datos
    return await this.vecinoRepository.save(vecino);
  }

  /**
   * Actualiza un vecino existente
   */
  async actualizar(id, datos) {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }

    // Verificar que el vecino existe
    const vecinoExistente = await this.vecinoRepository.findById(id);
    if (!vecinoExistente) {
      throw new Error('Vecino no encontrado');
    }

    // Si se está actualizando el documento, verificar que no esté duplicado
    if (datos.documento && datos.documento !== vecinoExistente.documento) {
      const vecinoConDocumento = await this.vecinoRepository.findByDocumento(datos.documento);
      if (vecinoConDocumento && vecinoConDocumento.id !== id) {
        throw new Error('Ya existe otro vecino con ese documento');
      }
    }

    // Validar email si se proporciona
    if (datos.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(datos.email)) {
        throw new Error('El email no tiene un formato válido');
      }
    }

    // Actualizar
    const vecinoActualizado = await this.vecinoRepository.update(id, datos);
    if (!vecinoActualizado) {
      throw new Error('Error al actualizar vecino');
    }

    return vecinoActualizado;
  }

  /**
   * Elimina un vecino
   */
  async eliminar(id) {
    if (!id || id <= 0) {
      throw new Error('ID inválido');
    }

    // Verificar que el vecino existe
    const vecino = await this.vecinoRepository.findById(id);
    if (!vecino) {
      throw new Error('Vecino no encontrado');
    }

    // Verificar que no tenga préstamos activos
    const tienePrestamos = await this.vecinoRepository.tienePrestamosActivos(id);
    if (tienePrestamos) {
      throw new Error('No se puede eliminar un vecino con préstamos activos');
    }

    // Eliminar
    const eliminado = await this.vecinoRepository.delete(id);
    if (!eliminado) {
      throw new Error('Error al eliminar vecino');
    }

    return true;
  }
}

module.exports = VecinoService;
