import { useEffect, useState } from "react";
import axios from "axios";

// Componente HerramientasList
export default function HerramientasList() {
  // Estado inicial: Arreglo vacío dondese guardan las herramientas que vienen del backend
  const [herramientas, setHerramientas] = useState([]);

  
  // Petición al backend para obtener la lista de herramientas
  useEffect(() => {
    cargarHerramientas();
  }, []);

  // Función para cargar herramientas desde el backend
  const cargarHerramientas = () => {
    axios
      .get("http://localhost:4000/herramientas")
      .then(res => setHerramientas(res.data))
      .catch(() => alert("Error cargando herramientas"));
  };

  // Función para eliminar una herramienta
  const eliminarHerramienta = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/herramientas/${id}`);
      // Se actualiza el estado filtrando la herramienta eliminada
      setHerramientas(herramientas.filter(h => h.id !== id));
    } catch (error) {
      console.error("Error al eliminar herramienta:", error);
      alert("No se pudo eliminar la herramienta");
    }
  };

  // Renderizado del contenido del componente
  return (
    <div>
      {/* Título*/}
      <h3 className="text-lg font-semibold mb-4">Herramientas</h3>

      {/* Lista de herramientas */}
      <ul>
        {herramientas.map(h => (
          <li key={h.id} className="flex justify-between items-center mb-2">
            {/* Nombre y el tipo de cada herramienta */}
            <span>{h.nombre} ({h.tipo})</span>

            {/* Botón para eliminar herramienta */}
            <button
              onClick={() => eliminarHerramienta(h.id)}
              className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-800"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
