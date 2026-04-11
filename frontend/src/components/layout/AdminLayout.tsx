import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import Sidebar from '../sidebar/Sidebar';
import './AdminLayout.css';

const AdminLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    // En el futuro aquí se limpiará el token
    navigate('/');
  };

  // Obtener la pestaña activa de la URL para mostrarla en el breadcrumb
  const activeTab = location.pathname.split('/').pop() || 'admin';

  return (
    <div className="admin-layout">
      <Sidebar />
      
      <div className="admin-wrapper">
        <header className="admin-header">
          <div className="header-breadcrumbs">
            <span>UAGRM</span> / <span className="active-bc">{activeTab}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Cerrar Sesión</button>
        </header>

        <main className="admin-main">
          {/* Outlet renderiza las rutas hijas (usuarios, ubicacion, dashboard) */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
