import React, { useState } from 'react';
import { ClipboardList, ChevronDown, ChevronUp, User, MapPin, AlertCircle } from 'lucide-react';
import './ProblemNotesPage.css';

interface ProblemDetail {
  id: number;
  descripcion: string;
  estado_actual: string;
  ambiente: string;
  tipo: string;
}

interface ProblemNote {
  id: number;
  fecha: string;
  reportador: {
    nombre: string;
    correo: string;
    tipo: string;
  };
  detalles: ProblemDetail[];
}

const ProblemNotesPage: React.FC = () => {
  const [expandedNote, setExpandedNote] = useState<number | null>(null);

  const [notes] = useState<ProblemNote[]>([
    {
      id: 101,
      fecha: '11/04/2026 10:30',
      reportador: { nombre: 'Pedro Gomez', correo: 'pgomez@estudiante.uagrm.edu.bo', tipo: 'Estudiante' },
      detalles: [
        { id: 1, descripcion: 'Aire acondicionado no enciende', estado_actual: 'Pendiente', ambiente: 'Aula 12 - Módulo 236', tipo: 'Eléctrico' },
        { id: 2, descripcion: 'Luz parpadeante constante', estado_actual: 'Pendiente', ambiente: 'Aula 12 - Módulo 236', tipo: 'Eléctrico' }
      ]
    },
    {
      id: 102,
      fecha: '11/04/2026 11:15',
      reportador: { nombre: 'María Lopez', correo: 'm.lopez@uagrm.edu.bo', tipo: 'Docente' },
      detalles: [
        { id: 3, descripcion: 'Pupitre roto con astillas expuestas', estado_actual: 'Pendiente', ambiente: 'Aula 5 - Módulo 225', tipo: 'Mobiliario' }
      ]
    }
  ]);

  const toggleNote = (id: number) => {
    setExpandedNote(expandedNote === id ? null : id);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-icon"><ClipboardList size={24} /></div>
        <div className="header-info">
          <h1>Reportes Recibidos</h1>
          <p>Revisa las notas de problemas enviadas por la comunidad universitaria.</p>
        </div>
      </div>

      <div className="notes-list">
        {notes.map(note => (
          <div key={note.id} className={`glass-card note-card ${expandedNote === note.id ? 'expanded' : ''}`}>
            <div className="note-summary" onClick={() => toggleNote(note.id)}>
              <div className="note-main-info">
                <span className="note-id">#NOTA-{note.id}</span>
                <span className="note-date">{note.fecha}</span>
                <span className="note-count-badge">{note.detalles.length} Detalles</span>
              </div>
              
              <div className="note-reporter-brief">
                <User size={16} />
                <span>{note.reportador.nombre}</span>
              </div>

              <div className="note-toggle">
                {expandedNote === note.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {expandedNote === note.id && (
              <div className="note-details-expanded">
                <div className="reporter-full-info">
                  <h4>Datos del Reportador</h4>
                  <p><strong>Correo:</strong> {note.reportador.correo}</p>
                  <p><strong>Tipo:</strong> {note.reportador.tipo}</p>
                </div>

                <div className="problems-table-container">
                  <h4>Detalles del Problema</h4>
                  <table className="problems-table">
                    <thead>
                      <tr>
                        <th>Descripción</th>
                        <th>Tipo</th>
                        <th>Ambiente</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {note.detalles.map(detail => (
                        <tr key={detail.id}>
                          <td>{detail.descripcion}</td>
                          <td><span className="type-pill">{detail.tipo}</span></td>
                          <td className="cell-with-icon"><MapPin size={14} /> {detail.ambiente}</td>
                          <td><span className="status-pill pending">{detail.estado_actual}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemNotesPage;
