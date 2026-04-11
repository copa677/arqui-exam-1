import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LogOut, User } from 'lucide-react';
import './MaintenanceLayout.css';

const MaintenanceLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Aquí se limpiará el token en el futuro
    navigate('/login');
  };

  return (
    <div className="maintenance-layout">
      <header className="maintenance-header">
        <div className="header-brand">
          <div className="header-logo">U</div>
          <span>UAGRM | Gestión Técnica</span>
        </div>
        
        <div className="header-actions">
          <div className="user-pill">
            <User size={18} />
            <span>Técnico de Mantenimiento</span>
          </div>
          <button onClick={handleLogout} className="logout-pill" title="Cerrar Sesión">
            <LogOut size={18} />
          </button>
        </div>
      </header>
      
      <main className="maintenance-content">
        <Outlet />
      </main>
    </div>
  );
};

export default MaintenanceLayout;
