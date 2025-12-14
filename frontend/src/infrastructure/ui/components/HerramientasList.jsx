import { useHerramientas } from "../../../application/hooks/useHerramientas";

// Componente HerramientasList con arquitectura hexagonal
export default function HerramientasList() {
  const { herramientas, loading, error, eliminarHerramienta } =
    useHerramientas();

  // Función para eliminar con confirmación
  const handleEliminar = async (id, nombre) => {
    if (
      window.confirm(`¿Estás seguro de eliminar la herramienta "${nombre}"?`)
    ) {
      try {
        await eliminarHerramienta(id);
      } catch (error) {
        alert(error.message || "No se pudo eliminar la herramienta");
      }
    }
  };

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Cargando herramientas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        <span>⚠️</span>
        <span>Error: {error}</span>
      </div>
    );
  }

  if (herramientas.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🔧</div>
        <h3 className="empty-state-title">No hay herramientas registradas</h3>
        <p className="empty-state-description">
          Comienza agregando tu primera herramienta
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="card-title" style={{ marginBottom: "var(--spacing-lg)" }}>
        Herramientas Disponibles ({herramientas.length})
      </h3>

      <div className="herramientas-list">
        {herramientas.map((h) => (
          <div key={h.id} className="herramienta-card">
            {/* Imagen de la herramienta */}
            {h.imagen_url || h.imagenUrl ? (
              <img
                src={`${apiUrl}${h.imagen_url || h.imagenUrl}`}
                alt={h.nombre}
                className="herramienta-imagen"
                onError={(e) => {
                  e.target.style.display = "none";
                  e.target.nextSibling.style.display = "flex";
                }}
              />
            ) : null}
            <div
              className="herramienta-imagen placeholder"
              style={h.imagen_url || h.imagenUrl ? { display: "none" } : {}}
            >
              🔧
            </div>

            {/* Información de la herramienta */}
            <div className="herramienta-info">
              <h4 className="herramienta-nombre">{h.nombre}</h4>
              <p className="herramienta-tipo">{h.tipo}</p>

              <div
                style={{
                  display: "flex",
                  gap: "var(--spacing-sm)",
                  alignItems: "center",
                }}
              >
                <span
                  className={`herramienta-estado ${h.estado.toLowerCase()}`}
                >
                  {h.estado}
                </span>
                {h.disponible ? (
                  <span className="badge badge-success">Disponible</span>
                ) : (
                  <span className="badge badge-warning">En préstamo</span>
                )}
              </div>

              {h.notas && (
                <p
                  style={{
                    fontSize: "var(--font-size-sm)",
                    color: "var(--text-secondary)",
                    marginTop: "var(--spacing-sm)",
                  }}
                >
                  {h.notas}
                </p>
              )}
            </div>

            {/* Acciones */}
            <div className="herramienta-actions">
              <button
                onClick={() => handleEliminar(h.id, h.nombre)}
                className="btn btn-danger btn-sm"
                style={{ flex: 1 }}
              >
                🗑️ Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
