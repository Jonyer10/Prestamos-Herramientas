import axiosInstance from '../axiosInstance';

/**
 * Repositorio HTTP para Préstamos
 * Adaptador que se comunica con la API REST
 */
export class HttpPrestamoRepository {
  /**
   * Obtiene todos los préstamos
   */
  async getAll() {
    try {
      const { data } = await axiosInstance.get('/prestamos');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener préstamos');
    }
  }

  /**
   * Obtiene un préstamo por ID
   */
  async getById(id) {
    try {
      const { data } = await axiosInstance.get(`/prestamos/${id}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener préstamo');
    }
  }

  /**
   * Crea un nuevo préstamo
   */
  async create(prestamo) {
    try {
      const { data } = await axiosInstance.post('/prestamos', prestamo);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al crear préstamo');
    }
  }

  /**
   * Actualiza un préstamo existente
   */
  async update(id, prestamo) {
    try {
      const { data } = await axiosInstance.put(`/prestamos/${id}`, prestamo);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al actualizar préstamo');
    }
  }

  /**
   * Marca un préstamo como devuelto
   */
  async devolver(id) {
    try {
      const { data } = await axiosInstance.put(`/prestamos/${id}/devolver`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al marcar préstamo como devuelto');
    }
  }

  /**
   * Elimina un préstamo
   */
  async delete(id) {
    try {
      await axiosInstance.delete(`/prestamos/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al eliminar préstamo');
    }
  }
}

export default new HttpPrestamoRepository();
