import React from 'react';
import { UserPlus, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import './UsersPage.css';

const UsersPage: React.FC = () => {
  const mockUsers = [
    { id: 1, nombres: 'Juan', apellidos: 'Perez', correo: 'juan@uagrm.edu', rol: 'Decano', activo: true },
    { id: 2, nombres: 'Maria', apellidos: 'Garcia', correo: 'maria@uagrm.edu', rol: 'Mantenimiento', activo: true },
    { id: 3, nombres: 'Carlos', apellidos: 'Lopez', correo: 'carlos@uagrm.edu', rol: 'Estudiante', activo: false },
    { id: 4, nombres: 'Ana', apellidos: 'Soto', correo: 'ana@uagrm.edu', rol: 'Mantenimiento', activo: true },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <div>
          <h1>Gestión de Usuarios</h1>
          <p className="page-subtitle">Administra los accesos y roles del sistema.</p>
        </div>
        <button className="primary-button">
          <UserPlus size={18} />
          <span>Nuevo Usuario</span>
        </button>
      </div>

      <div className="glass-card table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Correo</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mockUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="avatar-sm">{user.nombres[0]}{user.apellidos[0]}</div>
                    <span>{user.nombres} {user.apellidos}</span>
                  </div>
                </td>
                <td>{user.correo}</td>
                <td><span className="rol-badge">{user.rol}</span></td>
                <td>
                  <span className={`status-badge ${user.activo ? 'activo' : 'inactivo'}`}>
                    {user.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button title="Editar"><Edit2 size={16} /></button>
                    <button title="Eliminar" className="delete-btn"><Trash2 size={16} /></button>
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

export default UsersPage;
