// Componente Mensaje_Alerta
// Recibe dos props:
// - type: el tipo de mensaje ("success" o "error")
// - text: el texto que se mostrará en pantalla
export default function Mensaje_Alerta({ type, text }) {
  // Si no hay texto, retorna null
  if (!text) return null;


  const baseClasses = "p-2 rounded mb-4";

  // Según el mensaje, se aplica estilo verde para succes y estilo rojo para error:
  const styles =
    type === "success"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return <div className={`${baseClasses} ${styles}`}>{text}</div>;
}
