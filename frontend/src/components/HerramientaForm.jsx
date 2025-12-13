import { useState } from "react"; // Hook de React para manejar estados
import axios from "axios";        // Librería para hacer peticiones HTTP al backend
import Mensaje_Alerta from "./Mensaje_Alerta"; // Componente para mostrar mensajes de éxito o error

// Componente HerramientaForm
export default function HerramientaForm({ onCreated }) {
  // Estado inicial del formulario
  const [form, setForm] = useState({
    tipo: "",
    nombre: "",
    estado: "",
    notas: ""
  });

  // Mensajes de alerta (exito o error)
  const [message, setMessage] = useState({ type: "", text: "" });

  // Función cuando usuario escribe en un input o selecciona una opción
  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    // Se actualiza el estado del formulario dinámicamente
    setForm(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value // Si es checkbox guarda verdadero/falso, si no guarda el valor
    }));
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = async e => {
    e.preventDefault(); // Evita que la página se recargue
    try {
      // Se envian los datos del formulario al backend con axios
      await axios.post(`${import.meta.env.VITE_API_URL}/herramientas`, form);

      // Mensaje de éxito
      setMessage({ type: "success", text: "Herramienta registrada correctamente ✅" });

      // Limpieza de los campos del formulario
      setForm({ tipo: "", nombre: "", estado: "", notas: "" });

      // Si existe la prop onCreated, se ejecuta (refrescar lista de herramientas)
      if (onCreated) onCreated();
    } catch (error) {
      // Mensaje de error
      setMessage({ type: "error", text: "Error al registrar herramienta ❌" });
      console.error(error);
    }
  };

  // Renderizado del formulario
  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      {/* Componente de mensajes de éxito o error */}
      <Mensaje_Alerta type={message.type} text={message.text} />

      {/* Campo para el tipo de herramienta */}
      <input
        name="tipo"
        value={form.tipo}
        onChange={handleChange}
        placeholder="Tipo"
        required
        className="border rounded px-3 py-2 w-full"
      />

      {/* Campo para el nombre de la herramienta */}
      <input
        name="nombre"
        value={form.nombre}
        onChange={handleChange}
        placeholder="Nombre"
        required
        className="border rounded px-3 py-2 w-full"
      />

      {/* Campo para el estado de la herramienta (SELECT) */}
      {/* El usuario puede elegir entre opciones predefinidas */}
      <select
        name="estado"
        value={form.estado}
        onChange={handleChange}
        required
        className="border rounded px-3 py-2 w-full"
      >
        <option value="">Seleccione estado</option>
        <option value="Bueno">Bueno</option>
        <option value="Regular">Regular</option>
        <option value="Malo">Malo</option>
      </select>

      {/* Campo para notas u observaciones */}
      <input
        name="notas"
        value={form.notas}
        onChange={handleChange}
        placeholder="Notas"
        className="border rounded px-3 py-2 w-full"
      />

      {/* Botón para enviar el formulario */}
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Registrar herramienta
      </button>
    </form>
  );
}
