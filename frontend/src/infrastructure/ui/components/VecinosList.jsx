import { useEffect, useState } from "react";
import axios from "axios";

// Componente VecinosList
export default function VecinosList() {
  const [vecinos, setVecinos] = useState([]);

  // useEffect se ejecuta automáticamente cuando el componente se monta en pantalla
  useEffect(() => {
    cargarVecinos();
  }, []);

  // Función para cargar vecinos desde el backend
  const cargarVecinos = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/vecinos`)
      .then(res => setVecinos(res.data))
      .catch(err => console.error("Error al cargar vecinos", err));
  };

  // Función para eliminar vecino
  const eliminarVecino = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/vecinos/${id}`);
      // Actualizacion del estado quitando el vecino eliminado
      setVecinos(vecinos.filter(v => v.id !== id));
    } catch (error) {
      console.error("Error al eliminar vecino:", error);
      alert("No se pudo eliminar el vecino");
    }
  };

  // Renderizado del componente
  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Vecinos registrados</h3>

      <ul className="space-y-2">
        {vecinos.map(v => (
          <li key={v.id} className="border rounded p-3 bg-gray-50 flex justify-between items-center">
            <div>
              <strong>{v.nombre_completo}</strong> — {v.documento}
              <div className="text-sm text-gray-600">
                Tel: {v.telefono || "N/A"} | Email: {v.email || "N/A"}
              </div>
            </div>

            {/* Botón para eliminar vecino */}
            <button
              onClick={() => eliminarVecino(v.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
