const IVecinoRepository = require('../../../domain/repositories/IVecinoRepository');
const Vecino = require('../../../domain/entities/Vecino');
const pool = require('../db');

/**
 * Adaptador de PostgreSQL para el repositorio de Vecinos
 * Implementa la interfaz IVecinoRepository
 */
class PostgresVecinoRepository extends IVecinoRepository {
  /**
   * Obtiene todos los vecinos
   */
  async findAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM vecinos ORDER BY id');
      return rows.map(row => Vecino.fromDatabase(row));
    } catch (error) {
      console.error('Error en findAll:', error);
      throw new Error('Error al obtener vecinos de la base de datos');
    }
  }

  /**
   * Obtiene un vecino por su ID
   */
  async findById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM vecinos WHERE id=$1', [id]);
      if (rows.length === 0) return null;
      return Vecino.fromDatabase(rows[0]);
    } catch (error) {
      console.error('Error en findById:', error);
      throw new Error('Error al buscar vecino por ID');
    }
  }

  /**
   * Obtiene un vecino por su documento
   */
  async findByDocumento(documento) {
    try {
      const { rows } = await pool.query('SELECT * FROM vecinos WHERE documento=$1', [documento]);
      if (rows.length === 0) return null;
      return Vecino.fromDatabase(rows[0]);
    } catch (error) {
      console.error('Error en findByDocumento:', error);
      throw new Error('Error al buscar vecino por documento');
    }
  }

  /**
   * Guarda un nuevo vecino
   */
  async save(vecino) {
    try {
      const dbData = vecino.toDatabase();
      const { rows } = await pool.query(
        `INSERT INTO vecinos (nombre_completo, documento, telefono, email)
         VALUES ($1, $2, $3, $4) RETURNING *`,
        [dbData.nombre_completo, dbData.documento, dbData.telefono, dbData.email]
      );
      return Vecino.fromDatabase(rows[0]);
    } catch (error) {
      console.error('Error en save:', error);
      // Error de documento duplicado
      if (error.code === '23505') {
        throw new Error('Ya existe un vecino con ese documento');
      }
      throw new Error('Error al guardar vecino en la base de datos');
    }
  }

  /**
   * Actualiza un vecino existente
   */
  async update(id, datos) {
    try {
      const { rows } = await pool.query(
        `UPDATE vecinos
         SET nombre_completo = COALESCE($1, nombre_completo),
             documento = COALESCE($2, documento),
             telefono = COALESCE($3, telefono),
             email = COALESCE($4, email)
         WHERE id=$5 RETURNING *`,
        [datos.nombreCompleto, datos.documento, datos.telefono, datos.email, id]
      );
      if (rows.length === 0) return null;
      return Vecino.fromDatabase(rows[0]);
    } catch (error) {
      console.error('Error en update:', error);
      if (error.code === '23505') {
        throw new Error('Ya existe un vecino con ese documento');
      }
      throw new Error('Error al actualizar vecino');
    }
  }

  /**
   * Elimina un vecino por su ID
   */
  async delete(id) {
    try {
      const { rowCount } = await pool.query('DELETE FROM vecinos WHERE id=$1', [id]);
      return rowCount > 0;
    } catch (error) {
      console.error('Error en delete:', error);
      throw new Error('Error al eliminar vecino');
    }
  }

  /**
   * Verifica si un vecino tiene préstamos activos
   */
  async tienePrestamosActivos(id) {
    try {
      const { rows } = await pool.query(
        'SELECT 1 FROM prestamos WHERE vecino_id=$1 AND fecha_devolucion IS NULL LIMIT 1',
        [id]
      );
      return rows.length > 0;
    } catch (error) {
      console.error('Error en tienePrestamosActivos:', error);
      throw new Error('Error al verificar préstamos activos');
    }
  }
}

module.exports = PostgresVecinoRepository;
