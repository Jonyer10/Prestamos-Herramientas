import { useState, useEffect, useCallback } from 'react';
import vecinoRepository from '../../infrastructure/api/repositories/HttpVecinoRepository';

/**
 * Custom Hook para gestionar vecinos
 * Encapsula la lógica de negocio y comunicación con el repositorio
 */
export const useVecinos = () => {
  const [vecinos, setVecinos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Carga todos los vecinos
   */
  const cargarVecinos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await vecinoRepository.getAll();
      setVecinos(data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar vecinos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Crea un nuevo vecino
   */
  const crearVecino = async (vecino) => {
    setError(null);
    try {
      const nuevoVecino = await vecinoRepository.create(vecino);
      setVecinos(prev => [...prev, nuevoVecino]);
      return nuevoVecino;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Actualiza un vecino existente
   */
  const actualizarVecino = async (id, vecino) => {
    setError(null);
    try {
      const vecinoActualizado = await vecinoRepository.update(id, vecino);
      setVecinos(prev => 
        prev.map(v => v.id === id ? vecinoActualizado : v)
      );
      return vecinoActualizado;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Elimina un vecino
   */
  const eliminarVecino = async (id) => {
    setError(null);
    try {
      await vecinoRepository.delete(id);
      setVecinos(prev => prev.filter(v => v.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Obtiene un vecino por ID
   */
  const obtenerVecino = async (id) => {
    setError(null);
    try {
      return await vecinoRepository.getById(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Cargar vecinos al montar el componente
  useEffect(() => {
    cargarVecinos();
  }, [cargarVecinos]);

  return {
    vecinos,
    loading,
    error,
    cargarVecinos,
    crearVecino,
    actualizarVecino,
    eliminarVecino,
    obtenerVecino
  };
};
