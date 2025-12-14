const IPrestamoRepository = require('../../../domain/repositories/IPrestamoRepository');
const Prestamo = require('../../../domain/entities/Prestamo');
const pool = require('../db');

/**
 * Adaptador de PostgreSQL para el repositorio de Préstamos
 * Implementa la interfaz IPrestamoRepository
 */
class PostgresPrestamoRepository extends IPrestamoRepository {
  /**
   * Obtiene todos los préstamos con información completa (JOIN)
   */
  async findAll() {
    try {
      const { rows } = await pool.query(`
        SELECT p.id, p.fecha_prestamo, p.fecha_devolucion, p.observaciones,
               p.vecino_id, p.herramienta_id,
               v.nombre_completo AS vecino,
               h.nombre AS herramienta,
               h.imagen_url AS herramienta_imagen
        FROM prestamos p
        JOIN vecinos v ON p.vecino_id = v.id
        JOIN herramientas h ON p.herramienta_id = h.id
        ORDER BY p.id DESC
      `);
      return rows; // Devuelve los datos con JOIN
    } catch (error) {
      console.error('Error en findAll:', error);
      throw new Error('Error al obtener préstamos de la base de datos');
    }
  }

  /**
   * Obtiene un préstamo por su ID
   */
  async findById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM prestamos WHERE id=$1', [id]);
      if (rows.length === 0) return null;
      return Prestamo.fromDatabase(rows[0]);
    } catch (error) {
      console.error('Error en findById:', error);
      throw new Error('Error al buscar préstamo por ID');
    }
  }

  /**
   * Obtiene préstamos activos
   */
  async findActivos() {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM prestamos WHERE fecha_devolucion IS NULL ORDER BY fecha_prestamo DESC'
      );
      return rows.map(row => Prestamo.fromDatabase(row));
    } catch (error) {
      console.error('Error en findActivos:', error);
      throw new Error('Error al obtener préstamos activos');
    }
  }

  /**
   * Obtiene préstamos por vecino
   */
  async findByVecino(vecinoId) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM prestamos WHERE vecino_id=$1 ORDER BY fecha_prestamo DESC',
        [vecinoId]
      );
      return rows.map(row => Prestamo.fromDatabase(row));
    } catch (error) {
      console.error('Error en findByVecino:', error);
      throw new Error('Error al obtener préstamos por vecino');
    }
  }

  /**
   * Obtiene préstamos por herramienta
   */
  async findByHerramienta(herramientaId) {
    try {
      const { rows } = await pool.query(
        'SELECT * FROM prestamos WHERE herramienta_id=$1 ORDER BY fecha_prestamo DESC',
        [herramientaId]
      );
      return rows.map(row => Prestamo.fromDatabase(row));
    } catch (error) {
      console.error('Error en findByHerramienta:', error);
      throw new Error('Error al obtener préstamos por herramienta');
    }
  }

  /**
   * Guarda un nuevo préstamo
   */
  async save(prestamo) {
    try {
      const dbData = prestamo.toDatabase();
      const { rows } = await pool.query(
        `INSERT INTO prestamos (vecino_id, herramienta_id, fecha_prestamo, observaciones)
         VALUES ($1, $2, CURRENT_DATE, $3) RETURNING *`,
        [dbData.vecino_id, dbData.herramienta_id, dbData.observaciones]
      );
      return Prestamo.fromDatabase(rows[0]);
    } catch (error) {
      console.error('Error en save:', error);
      throw new Error('Error al guardar préstamo en la base de datos');
    }
  }

  /**
   * Actualiza un préstamo existente
   */
  async update(id, datos) {
    try {
      const { rows } = await pool.query(
        `UPDATE prestamos 
         SET vecino_id = COALESCE($1, vecino_id),
             herramienta_id = COALESCE($2, herramienta_id),
             fecha_prestamo = COALESCE($3, fecha_prestamo),
             fecha_devolucion = COALESCE($4, fecha_devolucion),
             observaciones = COALESCE($5, observaciones)
         WHERE id=$6 RETURNING *`,
        [datos.vecinoId, datos.herramientaId, datos.fechaPrestamo, datos.fechaDevolucion, datos.observaciones, id]
      );
      if (rows.length === 0) return null;
      return Prestamo.fromDatabase(rows[0]);
    } catch (error) {
      console.error('Error en update:', error);
      throw new Error('Error al actualizar préstamo');
    }
  }

  /**
   * Marca un préstamo como devuelto
   */
  async marcarComoDevuelto(id) {
    try {
      const { rows } = await pool.query(
        `UPDATE prestamos 
         SET fecha_devolucion = CURRENT_DATE 
         WHERE id = $1 
         RETURNING *`,
        [id]
      );
      if (rows.length === 0) return null;
      return Prestamo.fromDatabase(rows[0]);
    } catch (error) {
      console.error('Error en marcarComoDevuelto:', error);
      throw new Error('Error al marcar préstamo como devuelto');
    }
  }

  /**
   * Elimina un préstamo por su ID
   */
  async delete(id) {
    try {
      const { rowCount } = await pool.query('DELETE FROM prestamos WHERE id=$1', [id]);
      return rowCount > 0;
    } catch (error) {
      console.error('Error en delete:', error);
      throw new Error('Error al eliminar préstamo');
    }
  }
}

module.exports = PostgresPrestamoRepository;
