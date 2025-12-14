import { useState, useEffect, useCallback } from 'react';
import prestamoRepository from '../../infrastructure/api/repositories/HttpPrestamoRepository';

/**
 * Custom Hook para gestionar préstamos
 * Encapsula la lógica de negocio y comunicación con el repositorio
 */
export const usePrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Carga todos los préstamos
   */
  const cargarPrestamos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await prestamoRepository.getAll();
      setPrestamos(data);
    } catch (err) {
      setError(err.message);
      console.error('Error al cargar préstamos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Crea un nuevo préstamo
   */
  const crearPrestamo = async (prestamo) => {
    setError(null);
    try {
      const nuevoPrestamo = await prestamoRepository.create(prestamo);
      // Recargar la lista completa para obtener datos de JOIN
      await cargarPrestamos();
      return nuevoPrestamo;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Actualiza un préstamo existente
   */
  const actualizarPrestamo = async (id, prestamo) => {
    setError(null);
    try {
      const prestamoActualizado = await prestamoRepository.update(id, prestamo);
      await cargarPrestamos(); // Recargar para obtener datos actualizados con JOIN
      return prestamoActualizado;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Marca un préstamo como devuelto
   */
  const devolverPrestamo = async (id) => {
    setError(null);
    try {
      await prestamoRepository.devolver(id);
      await cargarPrestamos(); // Recargar para actualizar la vista
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Elimina un préstamo
   */
  const eliminarPrestamo = async (id) => {
    setError(null);
    try {
      await prestamoRepository.delete(id);
      setPrestamos(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  /**
   * Obtiene un préstamo por ID
   */
  const obtenerPrestamo = async (id) => {
    setError(null);
    try {
      return await prestamoRepository.getById(id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Cargar préstamos al montar el componente
  useEffect(() => {
    cargarPrestamos();
  }, [cargarPrestamos]);

  return {
    prestamos,
    loading,
    error,
    cargarPrestamos,
    crearPrestamo,
    actualizarPrestamo,
    devolverPrestamo,
    eliminarPrestamo,
    obtenerPrestamo
  };
};
