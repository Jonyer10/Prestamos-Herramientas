/**
 * Puerto (Interface) - Define el contrato para el repositorio de Vecinos
 */
class IVecinoRepository {
  /**
   * Obtiene todos los vecinos
   * @returns {Promise<Array<Vecino>>}
   */
  async findAll() {
    throw new Error('Método findAll() no implementado');
  }

  /**
   * Obtiene un vecino por su ID
   * @param {number} id 
   * @returns {Promise<Vecino|null>}
   */
  async findById(id) {
    throw new Error('Método findById() no implementado');
  }

  /**
   * Obtiene un vecino por su documento
   * @param {string} documento 
   * @returns {Promise<Vecino|null>}
   */
  async findByDocumento(documento) {
    throw new Error('Método findByDocumento() no implementado');
  }

  /**
   * Guarda un nuevo vecino o actualiza uno existente
   * @param {Vecino} vecino 
   * @returns {Promise<Vecino>}
   */
  async save(vecino) {
    throw new Error('Método save() no implementado');
  }

  /**
   * Actualiza un vecino existente
   * @param {number} id 
   * @param {Object} datos 
   * @returns {Promise<Vecino|null>}
   */
  async update(id, datos) {
    throw new Error('Método update() no implementado');
  }

  /**
   * Elimina un vecino por su ID
   * @param {number} id 
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    throw new Error('Método delete() no implementado');
  }

  /**
   * Verifica si un vecino tiene préstamos activos
   * @param {number} id 
   * @returns {Promise<boolean>}
   */
  async tienePrestamosActivos(id) {
    throw new Error('Método tienePrestamosActivos() no implementado');
  }
}

module.exports = IVecinoRepository;
