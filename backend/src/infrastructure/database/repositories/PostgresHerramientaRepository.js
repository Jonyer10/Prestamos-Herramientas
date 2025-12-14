const IHerramientaRepository = require('../../../domain/repositories/IHerramientaRepository');
const Herramienta = require('../../../domain/entities/Herramienta');
const pool = require('../db');

/**
 * Adaptador de PostgreSQL para el repositorio de Herramientas
 * Implementa la interfaz IHerramientaRepository
 */
class PostgresHerramientaRepository extends IHerramientaRepository {
  /**
   * Obtiene todas las herramientas
   */
  async findAll() {
    try {
      const { rows } = await pool.query('SELECT * FROM herramientas ORDER BY id');
      return rows.map(row => Herramienta.fromDatabase(row));
    } catch (error) {
      console.error('Error en findAll:', error);
      throw new Error('Error al obtener herramientas de la base de datos');
    }
  }

  /**
   * Obtiene una herramienta por su ID
   */
  async findById(id) {
    try {
      const { rows } = await pool.query('SELECT * FROM herramientas WHERE id=$1', [id]);
      if (rows.length === 0) return null;
      return Herramienta.fromDatabase(rows[0]);
    } catch (error) {
      console.error('Error en findById:', error);
      throw new Error('Error al buscar herramienta por ID');
    }
  }

  /**
   * Guarda una nueva herramienta
   */
  async save(herramienta) {
    try {
      const dbData = herramienta.toDatabase();
      const { rows } = await pool.query(
        `INSERT INTO herramientas (tipo, nombre, estado, disponible, notas, imagen_url)
         VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [dbData.tipo, dbData.nombre, dbData.estado, dbData.disponible, dbData.notas, dbData.imagen_url]
      );
      return Herramienta.fromDatabase(rows[0]);
    } catch (error) {
      console.error('Error en save:', error);
      throw new Error('Error al guardar herramienta en la base de datos');
    }
  }

  /**
   * Actualiza una herramienta existente
   */
  async update(id, datos) {
    try {
      const { rows } = await pool.query(
        `UPDATE herramientas
         SET tipo = COALESCE($1, tipo),
             nombre = COALESCE($2, nombre),
             estado = COALESCE($3, estado),
             disponible = COALESCE($4, disponible),
             notas = COALESCE($5, notas),
             imagen_url = COALESCE($6, imagen_url)
         WHERE id=$7
         RETURNING *`,
        [datos.tipo, datos.nombre, datos.estado, datos.disponible, datos.notas, datos.imagenUrl, id]
      );
      if (rows.length === 0) return null;
      return Herramienta.fromDatabase(rows[0]);
    } catch (error) {
      console.error('Error en update:', error);
      throw new Error('Error al actualizar herramienta');
    }
  }

  /**
   * Elimina una herramienta por su ID
   */
  async delete(id) {
    try {
      const { rowCount } = await pool.query('DELETE FROM herramientas WHERE id=$1', [id]);
      return rowCount > 0;
    } catch (error) {
      console.error('Error en delete:', error);
      throw new Error('Error al eliminar herramienta');
    }
  }

  /**
   * Verifica si una herramienta tiene préstamos activos
   */
  async tienePrestamosActivos(id) {
    try {
      const { rows } = await pool.query(
        'SELECT 1 FROM prestamos WHERE herramienta_id=$1 AND fecha_devolucion IS NULL LIMIT 1',
        [id]
      );
      return rows.length > 0;
    } catch (error) {
      console.error('Error en tienePrestamosActivos:', error);
      throw new Error('Error al verificar préstamos activos');
    }
  }
}

module.exports = PostgresHerramientaRepository;
