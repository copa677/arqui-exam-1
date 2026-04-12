import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, MapPin, ClipboardList, UserPlus } from 'lucide-react';
import './Sidebar.css';

const Sidebar: React.FC = () => {
  const menuItems = [
    { id: 'usuarios', path: '/admin/usuarios', icon: Users, label: 'Personal Universitario' },
    { id: 'ubicacion', path: '/admin/ubicacion', icon: MapPin, label: 'Estructura Física' },
    { id: 'notas', path: '/admin/notas', icon: ClipboardList, label: 'Reportes Recibidos' },
    { id: 'asignaciones', path: '/admin/asignaciones', icon: UserPlus, label: 'Asignación de Tareas' },
  ];

  return (
    <aside className="sidebar-container glass-card">
      <div className="sidebar-header">
        <div className="brand-badge">U</div>
        <h3>UAGRM Reportes</h3>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.id}
            to={item.path}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon className="nav-icon" size={20} />
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p>© 2026 UAGRM Incidencias</p>
      </div>
    </aside>
  );
};

export default Sidebar;
