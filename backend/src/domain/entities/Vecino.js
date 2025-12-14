/**
 * Entidad Vecino - Representa un vecino registrado en el sistema
 * Contiene la lógica de negocio relacionada con los vecinos
 */
class Vecino {
  constructor({ id, nombreCompleto, documento, telefono, email }) {
    this.id = id;
    this.nombreCompleto = nombreCompleto;
    this.documento = documento;
    this.telefono = telefono;
    this.email = email;
  }

  /**
   * Valida que el vecino tenga los datos obligatorios y correctos
   */
  validar() {
    const errores = [];

    if (!this.nombreCompleto || this.nombreCompleto.trim() === '') {
      errores.push('El nombre completo es obligatorio');
    }

    if (!this.documento || this.documento.trim() === '') {
      errores.push('El documento es obligatorio');
    }

    // Validación básica de email si existe
    if (this.email && this.email.trim() !== '') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.email)) {
        errores.push('El email no tiene un formato válido');
      }
    }

    // Validación básica de teléfono si existe
    if (this.telefono && this.telefono.trim() !== '') {
      const telefonoRegex = /^[0-9+\-\s()]+$/;
      if (!telefonoRegex.test(this.telefono)) {
        errores.push('El teléfono solo puede contener números, espacios y los caracteres +, -, ()');
      }
    }

    return {
      valido: errores.length === 0,
      errores
    };
  }

  /**
   * Convierte la entidad a un objeto plano para la base de datos
   */
  toDatabase() {
    return {
      id: this.id,
      nombre_completo: this.nombreCompleto,
      documento: this.documento,
      telefono: this.telefono,
      email: this.email
    };
  }

  /**
   * Crea una instancia desde los datos de la base de datos
   */
  static fromDatabase(row) {
    return new Vecino({
      id: row.id,
      nombreCompleto: row.nombre_completo,
      documento: row.documento,
      telefono: row.telefono,
      email: row.email
    });
  }
}

module.exports = Vecino;
