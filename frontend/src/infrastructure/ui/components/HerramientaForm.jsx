import { useState } from "react";
import { useHerramientas } from '../../../application/hooks/useHerramientas';
import Mensaje_Alerta from "./Mensaje_Alerta";

// Componente HerramientaForm con soporte para imágenes y arquitectura hexagonal
export default function HerramientaForm() {
  const { crearHerramienta } = useHerramientas();

  // Estado inicial del formulario
  const [form, setForm] = useState({
    tipo: "",
    nombre: "",
    estado: "",
    notas: "",
    disponible: true
  });

  const [imagen, setImagen] = useState(null);
  const [imagenPreview, setImagenPreview] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  // Maneja cambios en los inputs
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  // Maneja la selección de imagen
  const handleImagenChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      // Crear preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagenPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Envía el formulario
  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      // Crear objeto con los datos incluyendo la imagen
      const herramientaData = {
        ...form,
        imagen: imagen
      };

      await crearHerramienta(herramientaData);

      setMessage({ type: "success", text: "✅ Herramienta registrada correctamente" });
      
      // Limpiar formulario
      setForm({ tipo: "", nombre: "", estado: "", notas: "", disponible: true });
      setImagen(null);
      setImagenPreview(null);
      // Limpiar input file
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      setMessage({ type: "error", text: `❌ ${error.message || 'Error al registrar herramienta'}` });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Mensaje_Alerta type={message.type} text={message.text} />

      <div className="form-group">
        <label className="form-label">Tipo de Herramienta *</label>
        <input
          name="tipo"
          value={form.tipo}
          onChange={handleChange}
          placeholder="Ej: Eléctrica, Manual, Jardinería"
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Nombre *</label>
        <input
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Ej: Taladro, Martillo, Tijeras de podar"
          required
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Estado *</label>
        <select
          name="estado"
          value={form.estado}
          onChange={handleChange}
          required
          className="form-control"
        >
          <option value="">Seleccione estado</option>
          <option value="nuevo">Nuevo</option>
          <option value="bueno">Bueno</option>
          <option value="regular">Regular</option>
          <option value="malo">Malo</option>
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Imagen de la Herramienta</label>
        <div className="file-input-wrapper">
          <input
            type="file"
            accept="image/*"
            onChange={handleImagenChange}
          />
          <div className={`file-input-label ${imagen ? 'has-file' : ''}`}>
            <span>📷</span>
            <span>{imagen ? imagen.name : 'Seleccionar imagen'}</span>
          </div>
        </div>
        {imagenPreview && (
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <img
              src={imagenPreview}
              alt="Preview"
              style={{ 
                width: '100%', 
                maxWidth: '300px', 
                height: 'auto', 
                borderRadius: 'var(--border-radius-md)',
                boxShadow: 'var(--shadow-md)'
              }}
            />
          </div>
        )}
        <p className="form-help">Formatos: JPG, PNG, GIF, WEBP (Máximo 5MB)</p>
      </div>

      <div className="form-group">
        <label className="form-label">Notas u Observaciones</label>
        <textarea
          name="notas"
          value={form.notas}
          onChange={handleChange}
          placeholder="Información adicional sobre la herramienta..."
          className="form-control"
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary" 
        disabled={loading}
        style={{ width: '100%' }}
      >
        {loading ? (
          <>
            <span className="spinner spinner-sm"></span>
            <span>Registrando...</span>
          </>
        ) : (
          <>
            <span>🔧</span>
            <span>Registrar Herramienta</span>
          </>
        )}
      </button>
    </form>
  );
}
