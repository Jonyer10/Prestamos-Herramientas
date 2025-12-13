import { useEffect, useState } from "react";
import axios from "axios";

export default function PrestamosList() {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    cargarPrestamos();
  }, []);

  const cargarPrestamos = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/prestamos`)
      .then(res => setPrestamos(res.data))
      .catch(err => console.error("Error al cargar préstamos", err));
  };

  // Función para marcar préstamo como devuelto
  const devolverPrestamo = async (id) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/prestamos/${id}/devolver`);
      cargarPrestamos(); // Se recarga la lista para ver la fecha actualizada
    } catch (error) {
      console.error("Error al devolver préstamo:", error);
      alert("No se pudo marcar como devuelto");
    }
  };

  // Función para eliminar préstamo
  const eliminarPrestamo = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/prestamos/${id}`);
      setPrestamos(prestamos.filter(p => p.id !== id));
    } catch (error) {
      console.error("Error al eliminar préstamo:", error);
      alert("No se pudo eliminar el préstamo");
    }
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold mb-2 text-gray-700">Préstamos registrados</h3>

      <ul className="space-y-2">
        {prestamos.map(p => (
          <li key={p.id} className="border rounded p-3 bg-gray-50 flex justify-between items-center">
            <div>
              <strong>Herramienta:</strong> {p.herramienta}
              <br />
              <strong>Vecino:</strong> {p.vecino}
              <br />
              <span className="text-sm text-gray-600">
                Prestado el {p.fecha_prestamo?.slice(0, 10)}
                {p.fecha_devolucion && ` — Devuelto el ${p.fecha_devolucion.slice(0, 10)}`}
                {p.observaciones && ` — ${p.observaciones}`}
              </span>
            </div>

            <div className="flex gap-2">
              {/*Botón para devolver */}
              {!p.fecha_devolucion && (
                <button
                  onClick={() => devolverPrestamo(p.id)}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-800"
                >
                  Devolver
                </button>
              )}

              {/* Botón para eliminar */}
              <button
                onClick={() => eliminarPrestamo(p.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-800"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
