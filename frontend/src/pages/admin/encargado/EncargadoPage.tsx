import React, { useState } from 'react';
import { Play, CheckCircle2, AlertTriangle, Clock, MapPin } from 'lucide-react';
import './EncargadoPage.css';

interface Task {
  id: number;
  titulo: string;
  descripcion: string;
  ubicacion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  estado: 'Pendiente' | 'En Proceso' | 'Finalizado';
}

const EncargadoPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, titulo: 'Fuga de Agua - Baño 2do Piso', descripcion: 'Goteo constante en el grifo principal del baño de hombres.', ubicacion: 'Módulo 225 - Facultad de Tecnología', prioridad: 'Alta', estado: 'Pendiente' },
    { id: 2, titulo: 'Luminaria Fundida - Aula 12', descripcion: 'Falla en 3 tubos LED del sector central.', ubicacion: 'Módulo 236 - Facultad de Computación', prioridad: 'Media', estado: 'En Proceso' },
    { id: 3, titulo: 'Pupitre Roto', descripcion: 'Soporte de madera desprendido.', ubicacion: 'Módulo 225 - Aula 5', prioridad: 'Baja', estado: 'Pendiente' }
  ]);

  const updateStatus = (id: number, newStatus: 'En Proceso' | 'Finalizado') => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, estado: newStatus } : t));
  };

  return (
    <div className="encargado-container">
      <div className="encargado-header">
        <h1>Mis Tareas Asignadas</h1>
        <p>Gestiona y actualiza el estado de las reparaciones a tu cargo.</p>
      </div>

      <div className="stats-grid">
        <div className="glass-card stat-item">
          <span className="stat-label">Pendientes</span>
          <span className="stat-value">{tasks.filter(t => t.estado === 'Pendiente').length}</span>
        </div>
        <div className="glass-card stat-item">
          <span className="stat-label">En Proceso</span>
          <span className="stat-value highlight-text">{tasks.filter(t => t.estado === 'En Proceso').length}</span>
        </div>
        <div className="glass-card stat-item">
          <span className="stat-label">Resueltas</span>
          <span className="stat-value success-text">{tasks.filter(t => t.estado === 'Finalizado').length}</span>
        </div>
      </div>

      <div className="tasks-grid">
        {tasks.map(task => (
          <div key={task.id} className={`glass-card task-card ${task.estado.toLowerCase().replace(' ', '-')}`}>
            <div className="task-badge-row">
              <span className={`priority-badge ${task.prioridad.toLowerCase()}`}>{task.prioridad}</span>
              <span className={`status-text`}>
                {task.estado === 'Pendiente' && <Clock size={14} />}
                {task.estado === 'En Proceso' && <Play size={14} />}
                {task.estado === 'Finalizado' && <CheckCircle2 size={14} />}
                {task.estado}
              </span>
            </div>
            
            <h3>{task.titulo}</h3>
            <p className="task-desc">{task.descripcion}</p>
            
            <div className="task-meta">
              <MapPin size={16} />
              <span>{task.ubicacion}</span>
            </div>

            <div className="task-actions">
              {task.estado === 'Pendiente' && (
                <button className="action-btn start-btn" onClick={() => updateStatus(task.id, 'En Proceso')}>
                  <Play size={16} /> Iniciar Tarea
                </button>
              )}
              {task.estado === 'En Proceso' && (
                <button className="action-btn finish-btn" onClick={() => updateStatus(task.id, 'Finalizado')}>
                  <CheckCircle2 size={16} /> Finalizar Tarea
                </button>
              )}
              {task.estado === 'Finalizado' && (
                <div className="completed-msg">
                  <CheckCircle2 size={18} /> Tarea Completada
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EncargadoPage;
