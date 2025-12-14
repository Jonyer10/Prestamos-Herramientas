import { useState } from "react";
import "./styles/main.css";
import HerramientasList from "./infrastructure/ui/components/HerramientasList";
import HerramientaForm from "./infrastructure/ui/components/HerramientaForm";
import PrestamosList from "./infrastructure/ui/components/PrestamosList";
import VecinoForm from "./infrastructure/ui/components/VecinoForm";
import PrestamoForm from "./infrastructure/ui/components/PrestamoForm";
import VecinosList from "./infrastructure/ui/components/VecinosList";

// Iconos de Heroicons
import {
  WrenchScrewdriverIcon, // Ícono para la sección de Herramientas
  UserGroupIcon, // Ícono para la sección de Vecinos
  ClipboardDocumentCheckIcon, // Ícono para la sección de Préstamos
} from "@heroicons/react/24/outline";

function App() {
  // Estado que controla qué pestaña está activa
  const [tab, setTab] = useState("herramientas");

  // Log para verificar que la URL de la API se está cargando desde el archivo .env
  console.log("API URL desde .env:", import.meta.env.VITE_API_URL);

  return (
    <div className="app-container">
      {/* título */}
      <header>
        <h1>Banco de Herramientas</h1>
        <nav>
          {/* Botón para cambiar a la pestaña de Herramientas */}
          <button
            onClick={() => setTab("herramientas")}
            className={tab === "herramientas" ? "active" : ""}
          >
            <WrenchScrewdriverIcon className="icon" />
            Herramientas
          </button>

          {/* Botón para cambiar a la pestaña de Vecinos */}
          <button
            onClick={() => setTab("vecinos")}
            className={tab === "vecinos" ? "active" : ""}
          >
            <UserGroupIcon className="icon" />
            Vecinos
          </button>

          {/* Botón para cambiar a la pestaña de Préstamos */}
          <button
            onClick={() => setTab("prestamos")}
            className={tab === "prestamos" ? "active" : ""}
          >
            <ClipboardDocumentCheckIcon className="icon" />
            Préstamos
          </button>
        </nav>
      </header>

      <main>
        {/* Sección de Herramientas */}
        {tab === "herramientas" && (
          <div className="section-container">
            <h2 className="section-title blue">Gestión de Herramientas</h2>
            <div className="block">
              {/* Formulario para registrar nuevas herramientas */}
              <HerramientaForm />
            </div>
            <div className="block">
              {/* Lista de herramientas registradas */}
              <HerramientasList />
            </div>
          </div>
        )}

        {/* Sección de Vecinos */}
        {tab === "vecinos" && (
          <div className="section-container">
            <h2 className="section-title green">Registro de Vecinos</h2>
            <div className="block">
              {/* Formulario para registrar nuevos vecinos */}
              <VecinoForm />
            </div>
            <div className="block">
              {/* Lista de vecinos registrados */}
              <VecinosList />
            </div>
          </div>
        )}

        {/* Sección de Préstamos */}
        {tab === "prestamos" && (
          <div className="section-container">
            <h2 className="section-title purple">Gestión de Préstamos</h2>
            <div className="block">
              {/* Formulario para crear un nuevo préstamo */}
              <PrestamoForm />
            </div>
            <div className="block">
              {/* Lista de préstamos registrados */}
              <PrestamosList />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
