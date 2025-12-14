/**
 * Entidad Préstamo - Representa un préstamo de herramienta a un vecino
 * Contiene la lógica de negocio relacionada con los préstamos
 */
class Prestamo {
  constructor({ id, vecinoId, herramientaId, fechaPrestamo, fechaDevolucion, observaciones }) {
    this.id = id;
    this.vecinoId = vecinoId;
    this.herramientaId = herramientaId;
    this.fechaPrestamo = fechaPrestamo;
    this.fechaDevolucion = fechaDevolucion;
    this.observaciones = observaciones || null;
  }

  /**
   * Valida que el préstamo tenga los datos obligatorios
   */
  validar() {
    const errores = [];

    if (!this.vecinoId) {
      errores.push('El ID del vecino es obligatorio');
    }

    if (!this.herramientaId) {
      errores.push('El ID de la herramienta es obligatorio');
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  /**
   * Verifica si el préstamo está activo (no ha sido devuelto)
   */
  estaActivo() {
    return this.fechaDevolucion === null || this.fechaDevolucion === undefined;
  }

  /**
   * Marca el préstamo como devuelto
   */
  devolver() {
    if (!this.estaActivo()) {
      throw new Error('El préstamo ya ha sido devuelto');
    }
    this.fechaDevolucion = new Date();
  }

  /**
   * Calcula los días que ha durado el préstamo
   */
  calcularDiasPrestamo() {
    const fechaInicio = new Date(this.fechaPrestamo);
    const fechaFin = this.fechaDevolucion ? new Date(this.fechaDevolucion) : new Date();
    
    const diferenciaTiempo = fechaFin - fechaInicio;
    const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));
    
    return diferenciaDias;
  }

  /**
   * Convierte la entidad a un objeto plano para la base de datos
   */
  toDatabase() {
    return {
      id: this.id,
      vecino_id: this.vecinoId,
      herramienta_id: this.herramientaId,
      fecha_prestamo: this.fechaPrestamo,
      fecha_devolucion: this.fechaDevolucion,
      observaciones: this.observaciones
    };
  }

  /**
   * Crea una instancia desde los datos de la base de datos
   */
  static fromDatabase(row) {
    return new Prestamo({
      id: row.id,
      vecinoId: row.vecino_id,
      herramientaId: row.herramienta_id,
      fechaPrestamo: row.fecha_prestamo,
      fechaDevolucion: row.fecha_devolucion,
      observaciones: row.observaciones
    });
  }
}

module.exports = Prestamo;
