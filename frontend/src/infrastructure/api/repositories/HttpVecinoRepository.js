import axiosInstance from '../axiosInstance';

/**
 * Repositorio HTTP para Vecinos
 * Adaptador que se comunica con la API REST
 */
export class HttpVecinoRepository {
  /**
   * Obtiene todos los vecinos
   */
  async getAll() {
    try {
      const { data } = await axiosInstance.get('/vecinos');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener vecinos');
    }
  }

  /**
   * Obtiene un vecino por ID
   */
  async getById(id) {
    try {
      const { data } = await axiosInstance.get(`/vecinos/${id}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener vecino');
    }
  }

  /**
   * Crea un nuevo vecino
   */
  async create(vecino) {
    try {
      const { data } = await axiosInstance.post('/vecinos', vecino);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al crear vecino');
    }
  }

  /**
   * Actualiza un vecino existente
   */
  async update(id, vecino) {
    try {
      const { data } = await axiosInstance.put(`/vecinos/${id}`, vecino);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al actualizar vecino');
    }
  }

  /**
   * Elimina un vecino
   */
  async delete(id) {
    try {
      await axiosInstance.delete(`/vecinos/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al eliminar vecino');
    }
  }
}

export default new HttpVecinoRepository();
