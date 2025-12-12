import { useState } from 'react';
import './App.css';

import HerramientasList from './components/HerramientasList';
import HerramientaForm from './components/HerramientaForm';
import PrestamosList from './components/PrestamosList';
import VecinoForm from './components/VecinoForm';
import PrestamoForm from './components/PrestamoForm';
import VecinosList from './components/VecinosList';

import {
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ClipboardDocumentCheckIcon
} from '@heroicons/react/24/outline';

function App() {
  const [tab, setTab] = useState('herramientas');

  console.log('API URL desde .env:', import.meta.env.VITE_API_URL);

  return (
    <div className="app-container">
      <header>
        <h1>Banco de Herramientas</h1>
        <nav>
          <button
            onClick={() => setTab('herramientas')}
            className={tab === 'herramientas' ? 'active' : ''}
          >
            <WrenchScrewdriverIcon className="icon" />
            Herramientas
          </button>
          <button
            onClick={() => setTab('vecinos')}
            className={tab === 'vecinos' ? 'active' : ''}
          >
            <UserGroupIcon className="icon" />
            Vecinos
          </button>
          <button
            onClick={() => setTab('prestamos')}
            className={tab === 'prestamos' ? 'active' : ''}
          >
            <ClipboardDocumentCheckIcon className="icon" />
            Préstamos
          </button>
        </nav>
      </header>

      <main>
        {tab === 'herramientas' && (
          <div className="section-container">
            <h2 className="section-title blue">Gestión de Herramientas</h2>
            <div className="block">
              <HerramientaForm onCreated={() => window.location.reload()} />
            </div>
            <div className="block">
              <HerramientasList />
            </div>
          </div>
        )}

        {tab === 'vecinos' && (
          <div className="section-container">
            <h2 className="section-title green">Registro de Vecinos</h2>
            <div className="block">
              <VecinoForm onCreated={() => window.location.reload()} />
            </div>
            <div className="block">
              <VecinosList />
            </div>
          </div>
        )}

        {tab === 'prestamos' && (
          <div className="section-container">
            <h2 className="section-title purple">Gestión de Préstamos</h2>
            <div className="block">
              <PrestamoForm onCreated={() => window.location.reload()} />
            </div>
            <div className="block">
              <PrestamosList />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
