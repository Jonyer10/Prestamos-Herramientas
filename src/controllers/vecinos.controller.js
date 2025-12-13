// Conexión a la base de datos
const pool = require('../db');

// Controlador para listar todos los vecinos
exports.getAll = async (req, res) => {
  try {
    // Selecciona todos los vecinos ordenados por id
    const { rows } = await pool.query('SELECT * FROM vecinos ORDER BY id');
    // Responde con el resultado en formato JSON
    res.json(rows);
  } catch {
    // Si ocurre un error, devuelve código 500 
    res.status(500).json({ error: 'Error al listar vecinos' });
  }
};

// Controlador para obtener un vecino por su ID
exports.getById = async (req, res) => {
  try {
    const { id } = req.params; // Captura el id desde la URL
    // Consulta SQL para buscar vecino por id
    const { rows } = await pool.query('SELECT * FROM vecinos WHERE id=$1', [id]);
    // Si no se encuentra, devuelve error 404
    if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
    // Devuelve el vecino encontrado
    res.json(rows[0]);
  } catch {
    res.status(500).json({ error: 'Error al consultar vecino' });
  }
};

// Controlador para crear un nuevo vecino
exports.create = async (req, res) => {
  try {
    // Captura los datos enviados en el body de la petición
    const { nombre_completo, documento, telefono, email } = req.body;

    // Inseta el nuevo vecino en la base de datos
    const { rows } = await pool.query(
      `INSERT INTO vecinos (nombre_completo, documento, telefono, email)
       VALUES ($1,$2,$3,$4) RETURNING *`,
      [nombre_completo, documento, telefono, email]
    );

    // Responde con el vecino creado y código 201 (creado)
    res.status(201).json(rows[0]);
  } catch {
    // Si hay error en los datos (ej. documento duplicado), Devuelve código 400
    res.status(400).json({ error: 'Documento duplicado o datos inválidos' });
  }
};

// Controlador para actualizar un vecino existente
exports.update = async (req, res) => {
  try {
    const { id } = req.params; // ID del vecino a actualizar
    const { nombre_completo, documento, telefono, email } = req.body;

    // Se acyualiza, si el valor es null, mantiene el existente
    const { rows } = await pool.query(
      `UPDATE vecinos
       SET nombre_completo = COALESCE($1, nombre_completo),
           documento = COALESCE($2, documento),
           telefono = COALESCE($3, telefono),
           email = COALESCE($4, email)
       WHERE id=$5 RETURNING *`,
      [nombre_completo, documento, telefono, email, id]
    );

    // Si no se encuentra el vecino, Devuelve 404
    if (!rows.length) return res.status(404).json({ error: 'No encontrado' });
    // Si se actualiza correctamente, Devuelve el vecino modificado
    res.json(rows[0]);
  } catch {
    res.status(400).json({ error: 'Error al actualizar vecino' });
  }
};

// Controlador para eliminar un vecino
exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    // Antes de eliminar, Verifica si el vecino tiene préstamos activos
    const active = await pool.query(
      'SELECT 1 FROM prestamos WHERE vecino_id=$1 AND fecha_devolucion IS NULL LIMIT 1',
      [id]
    );

    // Si existe un préstamo activo, Devuelve error 409 (conflicto)
    if (active.rows.length) {
      return res.status(409).json({ error: 'El vecino tiene préstamo activo' });
    }

    // Si no tiene préstamos activos, Elimina el vecino
    const { rowCount } = await pool.query('DELETE FROM vecinos WHERE id=$1', [id]);

    // Si no se encuentra el vecino, Devuelve 404
    if (!rowCount) return res.status(404).json({ error: 'No encontrado' });

    // Si se elimina correctamente, Devuelve 204 (sin contenido)
    res.status(204).send();
  } catch {
    res.status(500).json({ error: 'Error al eliminar vecino' });
  }
};
