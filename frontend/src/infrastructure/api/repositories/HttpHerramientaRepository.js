import axiosInstance from '../axiosInstance';

/**
 * Repositorio HTTP para Herramientas
 * Adaptador que se comunica con la API REST
 */
export class HttpHerramientaRepository {
  /**
   * Obtiene todas las herramientas
   */
  async getAll() {
    try {
      const { data } = await axiosInstance.get('/herramientas');
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener herramientas');
    }
  }

  /**
   * Obtiene una herramienta por ID
   */
  async getById(id) {
    try {
      const { data } = await axiosInstance.get(`/herramientas/${id}`);
      return data;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al obtener herramienta');
    }
  }

  /**
   * Crea una nueva herramienta
   * Soporta envío de FormData para incluir imagen
   */
  async create(herramienta) {
    try {
      // Si hay imagen, usar FormData
      if (herramienta.imagen) {
        const formData = new FormData();
        formData.append('tipo', herramienta.tipo);
        formData.append('nombre', herramienta.nombre);
        formData.append('estado', herramienta.estado);
        formData.append('disponible', herramienta.disponible);
        if (herramienta.notas) formData.append('notas', herramienta.notas);
        formData.append('imagen', herramienta.imagen);

        const { data } = await axiosInstance.post('/herramientas', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data;
      } else {
        // Sin imagen, enviar JSON normal
        const { data } = await axiosInstance.post('/herramientas', herramienta);
        return data;
      }
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al crear herramienta');
    }
  }

  /**
   * Actualiza una herramienta existente
   */
  async update(id, herramienta) {
    try {
      // Si hay imagen, usar FormData
      if (herramienta.imagen) {
        const formData = new FormData();
        if (herramienta.tipo) formData.append('tipo', herramienta.tipo);
        if (herramienta.nombre) formData.append('nombre', herramienta.nombre);
        if (herramienta.estado) formData.append('estado', herramienta.estado);
        if (herramienta.disponible !== undefined) formData.append('disponible', herramienta.disponible);
        if (herramienta.notas) formData.append('notas', herramienta.notas);
        formData.append('imagen', herramienta.imagen);

        const { data } = await axiosInstance.put(`/herramientas/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        return data;
      } else {
        const { data } = await axiosInstance.put(`/herramientas/${id}`, herramienta);
        return data;
      }
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al actualizar herramienta');
    }
  }

  /**
   * Elimina una herramienta
   */
  async delete(id) {
    try {
      await axiosInstance.delete(`/herramientas/${id}`);
      return true;
    } catch (error) {
      throw new Error(error.response?.data?.error || 'Error al eliminar herramienta');
    }
  }
}

export default new HttpHerramientaRepository();
