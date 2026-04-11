import React, { useState } from 'react';
import { Plus, Building2, Layers, Home, Edit, Trash2 } from 'lucide-react';
import './LocationsPage.css';

const LocationsPage: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState('facultades');

  const mockFacultades = [
    { id: 1, nombre: 'Facultad de Ciencias de la Computación', abr: 'FICCT', modulos: 5 },
    { id: 2, nombre: 'Facultad de Tecnología', abr: 'TECNÓ', modulos: 3 },
  ];

  const mockModulos = [
    { id: 1, nro: '236', facultad: 'FICCT', ambientes: 15 },
    { id: 2, nro: '225', facultad: 'TECNÓ', ambientes: 10 },
    { id: 3, nro: '237', facultad: 'FICCT', ambientes: 12 },
  ];

  const mockAmbientes = [
    { id: 1, nombre: 'Aula 12', piso: 'Planta Baja', modulo: '236' },
    { id: 2, nombre: 'Laboratorio de Redes', piso: '1er Piso', modulo: '236' },
    { id: 3, nombre: 'Aula 05', piso: '2do Piso', modulo: '225' },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-icon"><Building2 size={24} /></div>
        <div className="header-info">
          <h1>Estructura de Ubicación</h1>
          <p className="page-subtitle">Gestiona la jerarquía física de la universidad.</p>
        </div>
      </div>

      <div className="tab-navigation">
        <button 
          className={`tab-btn ${activeSubTab === 'facultades' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('facultades')}
        >
          <Building2 size={18} />
          <span>Facultades</span>
        </button>
        <button 
          className={`tab-btn ${activeSubTab === 'modulos' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('modulos')}
        >
          <Layers size={18} />
          <span>Módulos</span>
        </button>
        <button 
          className={`tab-btn ${activeSubTab === 'ambientes' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('ambientes')}
        >
          <Home size={18} />
          <span>Ambientes</span>
        </button>
      </div>

      <div className="glass-card table-container">
        <div className="table-header-row">
          <h3>Lista de {activeSubTab.charAt(0).toUpperCase() + activeSubTab.slice(1)}</h3>
          <button className="add-btn">
            <Plus size={16} />
            <span>Agregar {activeSubTab.slice(0, -1)}</span>
          </button>
        </div>
        
        <table className="custom-table">
          <thead>
            {activeSubTab === 'facultades' && (
              <tr>
                <th>Nombre</th>
                <th>Abreviatura</th>
                <th>Módulos</th>
                <th>Acciones</th>
              </tr>
            )}
            {activeSubTab === 'modulos' && (
              <tr>
                <th>Nro Módulo</th>
                <th>Facultad</th>
                <th>Ambientes</th>
                <th>Acciones</th>
              </tr>
            )}
            {activeSubTab === 'ambientes' && (
              <tr>
                <th>Nombre Ambiente</th>
                <th>Piso</th>
                <th>Módulo</th>
                <th>Acciones</th>
              </tr>
            )}
          </thead>
          <tbody>
            {activeSubTab === 'facultades' && mockFacultades.map(f => (
              <tr key={f.id}>
                <td>{f.nombre}</td>
                <td><span className="code-badge">{f.abr}</span></td>
                <td>{f.modulos}</td>
                <td>
                  <div className="actions-cell">
                    <button className="edit-btn"><Edit size={16} /></button>
                    <button className="delete-btn"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {activeSubTab === 'modulos' && mockModulos.map(m => (
              <tr key={m.id}>
                <td>Módulo {m.nro}</td>
                <td>{m.facultad}</td>
                <td>{m.ambientes}</td>
                <td>
                  <div className="actions-cell">
                    <button className="edit-btn"><Edit size={16} /></button>
                    <button className="delete-btn"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
            {activeSubTab === 'ambientes' && mockAmbientes.map(a => (
              <tr key={a.id}>
                <td>{a.nombre}</td>
                <td>{a.piso}</td>
                <td>Módulo {a.modulo}</td>
                <td>
                  <div className="actions-cell">
                    <button className="edit-btn"><Edit size={16} /></button>
                    <button className="delete-btn"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LocationsPage;
