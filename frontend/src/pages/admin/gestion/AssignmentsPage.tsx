import React, { useState } from 'react';
import { UserPlus, HardHat, Info, Send, CheckCircle2 } from 'lucide-react';
import './AssignmentsPage.css';

interface Technician {
  id: number;
  nombre: string;
  especialidad: string;
  tareas_activas: number;
}

interface PendingProblem {
  id: number;
  descripcion: string;
  ubicacion: string;
  prioridad: 'Alta' | 'Media' | 'Baja';
  tipo: string;
}

const AssignmentsPage: React.FC = () => {
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null);
  const [assignedSuccess, setAssignedSuccess] = useState<number | null>(null);

  const [problems] = useState<PendingProblem[]>([
    { id: 1, descripcion: 'Fuga de agua en el baño de hombres', ubicacion: 'Módulo 225 - 2do Piso', prioridad: 'Alta', tipo: 'Sanitario' },
    { id: 2, descripcion: 'Toma corriente quemado', ubicacion: 'Módulo 236 - Aula 4', prioridad: 'Media', tipo: 'Eléctrico' },
    { id: 3, descripcion: 'Silla de aula sin respaldo', ubicacion: 'Módulo 210 - Aula 1', prioridad: 'Baja', tipo: 'Mobiliario' }
  ]);

  const [technicians] = useState<Technician[]>([
    { id: 1, nombre: 'Ricardo Arispe', especialidad: 'Plomero / Sanitario', tareas_activas: 2 },
    { id: 2, nombre: 'Carlos Vaca', especialidad: 'Electricista', tareas_activas: 1 },
    { id: 3, nombre: 'Luis Duran', especialidad: 'Mantenimiento General', tareas_activas: 0 }
  ]);

  const handleAssign = (problemId: number, technicianId: number) => {
    // Simular asignación
    setAssignedSuccess(problemId);
    setTimeout(() => {
      setAssignedSuccess(null);
      setSelectedProblem(null);
    }, 2000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-icon"><UserPlus size={24} /></div>
        <div className="header-info">
          <h1>Asignación de Tareas</h1>
          <p>Asigna los problemas reportados al encargado de mantenimiento adecuado.</p>
        </div>
      </div>

      <div className="problems-grid">
        {problems.map(problem => (
          <div key={problem.id} className={`glass-card assignment-card ${selectedProblem === problem.id ? 'active' : ''}`}>
            <div className="assignment-content">
              <div className="assignment-top">
                <span className={`priority-tag ${problem.prioridad.toLowerCase()}`}>{problem.prioridad}</span>
                <span className="type-label">{problem.tipo}</span>
              </div>
              
              <h3>{problem.descripcion}</h3>
              <p className="problem-location">{problem.ubicacion}</p>

              {assignedSuccess === problem.id ? (
                <div className="success-overlay">
                  <CheckCircle2 size={32} />
                  <span>Tarea Asignada</span>
                </div>
              ) : selectedProblem === problem.id ? (
                <div className="technician-selector fade-in">
                  <h4>Seleccionar Técnico</h4>
                  {technicians.map(tech => (
                    <button key={tech.id} className="tech-option" onClick={() => handleAssign(problem.id, tech.id)}>
                      <div className="tech-info">
                        <span className="tech-name">{tech.nombre}</span>
                        <span className="tech-desc">{tech.especialidad} | {tech.tareas_activas} tareas</span>
                      </div>
                      <Send size={16} />
                    </button>
                  ))}
                  <button className="cancel-btn" onClick={() => setSelectedProblem(null)}>Cancelar</button>
                </div>
              ) : (
                <button className="assign-btn" onClick={() => setSelectedProblem(problem.id)}>
                  Asignar a Técnico
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentsPage;
