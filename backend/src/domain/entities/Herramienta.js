/**
 * Entidad Herramienta - Representa una herramienta del banco
 * Esta clase contiene la lógica de negocio pura, independiente de la infraestructura
 */
class Herramienta {
  constructor({ id, tipo, nombre, estado, disponible, notas, imagenUrl }) {
    this.id = id;
    this.tipo = tipo;
    this.nombre = nombre;
    this.estado = estado;
    this.disponible = disponible !== undefined ? disponible : true;
    this.notas = notas || null;
    this.imagenUrl = imagenUrl || null;
  }

  /**
   * Valida que la herramienta tenga los datos obligatorios
   */
  validar() {
    const errores = [];

    if (!this.tipo || this.tipo.trim() === '') {
      errores.push('El tipo es obligatorio');
    }

    if (!this.nombre || this.nombre.trim() === '') {
      errores.push('El nombre es obligatorio');
    }

    if (!this.estado || this.estado.trim() === '') {
      errores.push('El estado es obligatorio');
    }

    const estadosValidos = ['nuevo', 'bueno', 'regular', 'malo'];
    if (this.estado && !estadosValidos.includes(this.estado.toLowerCase())) {
      errores.push(`El estado debe ser uno de: ${estadosValidos.join(', ')}`);
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  /**
   * Marca la herramienta como no disponible
   */
  marcarComoNoDisponible() {
    this.disponible = false;
  }

  /**
   * Marca la herramienta como disponible
   */
  marcarComoDisponible() {
    this.disponible = true;
  }

  /**
   * Verifica si la herramienta está disponible para préstamo
   */
  estaDisponible() {
    return this.disponible === true;
  }

  /**
   * Convierte la entidad a un objeto plano para la base de datos
   */
  toDatabase() {
    return {
      id: this.id,
      tipo: this.tipo,
      nombre: this.nombre,
      estado: this.estado,
      disponible: this.disponible,
      notas: this.notas,
      imagen_url: this.imagenUrl
    };
  }

  /**
   * Crea una instancia desde los datos de la base de datos
   */
  static fromDatabase(row) {
    return new Herramienta({
      id: row.id,
      tipo: row.tipo,
      nombre: row.nombre,
      estado: row.estado,
      disponible: row.disponible,
      notas: row.notas,
      imagenUrl: row.imagen_url
    });
  }
}

module.exports = Herramienta;
