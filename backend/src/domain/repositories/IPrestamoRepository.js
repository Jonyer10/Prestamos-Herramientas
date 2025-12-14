/**
 * Puerto (Interface) - Define el contrato para el repositorio de Préstamos
 */
class IPrestamoRepository {
  /**
   * Obtiene todos los préstamos con información completa
   * @returns {Promise<Array<Object>>}
   */
  async findAll() {
    throw new Error('Método findAll() no implementado');
  }

  /**
   * Obtiene un préstamo por su ID
   * @param {number} id 
   * @returns {Promise<Prestamo|null>}
   */
  async findById(id) {
    throw new Error('Método findById() no implementado');
  }

  /**
   * Obtiene préstamos activos
   * @returns {Promise<Array<Prestamo>>}
   */
  async findActivos() {
    throw new Error('Método findActivos() no implementado');
  }

  /**
   * Obtiene préstamos por vecino
   * @param {number} vecinoId 
   * @returns {Promise<Array<Prestamo>>}
   */
  async findByVecino(vecinoId) {
    throw new Error('Método findByVecino() no implementado');
  }

  /**
   * Obtiene préstamos por herramienta
   * @param {number} herramientaId 
   * @returns {Promise<Array<Prestamo>>}
   */
  async findByHerramienta(herramientaId) {
    throw new Error('Método findByHerramienta() no implementado');
  }

  /**
   * Guarda un nuevo préstamo
   * @param {Prestamo} prestamo 
   * @returns {Promise<Prestamo>}
   */
  async save(prestamo) {
    throw new Error('Método save() no implementado');
  }

  /**
   * Actualiza un préstamo existente
   * @param {number} id 
   * @param {Object} datos 
   * @returns {Promise<Prestamo|null>}
   */
  async update(id, datos) {
    throw new Error('Método update() no implementado');
  }

  /**
   * Marca un préstamo como devuelto
   * @param {number} id 
   * @returns {Promise<Prestamo|null>}
   */
  async marcarComoDevuelto(id) {
    throw new Error('Método marcarComoDevuelto() no implementado');
  }

  /**
   * Elimina un préstamo por su ID
   * @param {number} id 
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    throw new Error('Método delete() no implementado');
  }
}

module.exports = IPrestamoRepository;
