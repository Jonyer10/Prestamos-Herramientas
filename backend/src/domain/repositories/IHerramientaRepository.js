/**
 * Puerto (Interface) - Define el contrato para el repositorio de Herramientas
 * Esta interfaz establece qué operaciones debe implementar cualquier adaptador
 * de persistencia para herramientas (PostgreSQL, MongoDB, API externa, etc.)
 */
class IHerramientaRepository {
  /**
   * Obtiene todas las herramientas
   * @returns {Promise<Array<Herramienta>>}
   */
  async findAll() {
    throw new Error('Método findAll() no implementado');
  }

  /**
   * Obtiene una herramienta por su ID
   * @param {number} id 
   * @returns {Promise<Herramienta|null>}
   */
  async findById(id) {
    throw new Error('Método findById() no implementado');
  }

  /**
   * Guarda una nueva herramienta o actualiza una existente
   * @param {Herramienta} herramienta 
   * @returns {Promise<Herramienta>}
   */
  async save(herramienta) {
    throw new Error('Método save() no implementado');
  }

  /**
   * Actualiza una herramienta existente
   * @param {number} id 
   * @param {Object} datos 
   * @returns {Promise<Herramienta|null>}
   */
  async update(id, datos) {
    throw new Error('Método update() no implementado');
  }

  /**
   * Elimina una herramienta por su ID
   * @param {number} id 
   * @returns {Promise<boolean>}
   */
  async delete(id) {
    throw new Error('Método delete() no implementado');
  }

  /**
   * Verifica si una herramienta tiene préstamos activos
   * @param {number} id 
   * @returns {Promise<boolean>}
   */
  async tienePrestamosActivos(id) {
    throw new Error('Método tienePrestamosActivos() no implementado');
  }
}

module.exports = IHerramientaRepository;
