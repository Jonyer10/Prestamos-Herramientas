import { useState, useEffect, useCallback } from 'react';
import herramientaRepository from '../../infrastructure/api/repositories/HttpHerramientaRepository';

/**
 * Custom Hook para gestionar herramientas
 * Encapsula la lógica de negocio y comunicación con el repositorio
 */
export const useHerramientas = () => {
  const [herramientas, setHerramientas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Carga todas las herramientas
   */
  const cargarHerramientas = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await herramientaRepository.getAll();
      setHerramientas(data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar herramientas:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Crea una nueva herramienta
   */
  const crearHerramienta = async (herramienta) => {
    setError(null);
    try {
      const nuevaHerramienta = await herramientaRepository.create(herramienta);
      setHerramientas(prev => [...prev, nuevaHerramienta]);
      return nuevaHerramienta;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Actualiza una herramienta existente
   */
  const actualizarHerramienta = async (id, herramienta) => {
    setError(null);
    try {
      const herramientaActualizada = await herramientaRepository.update(id, herramienta);
      setHerramientas(prev => 
        prev.map(h => h.id === id ? herramientaActualizada : h)
      );
      return herramientaActualizada;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Elimina una herramienta
   */
  const eliminarHerramienta = async (id) => {
    setError(null);
    try {
      await herramientaRepository.delete(id);
      setHerramientas(prev => prev.filter(h => h.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Obtiene una herramienta por ID
   */
  const obtenerHerramienta = async (id) => {
    setError(null);
    try {
      return await herramientaRepository.getById(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Cargar herramientas al montar el componente
  useEffect(() => {
    cargarHerramientas();
  }, [cargarHerramientas]);

  return {
    herramientas,
    loading,
    error,
    cargarHerramientas,
    crearHerramienta,
    actualizarHerramienta,
    eliminarHerramienta,
    obtenerHerramienta
  };
};
