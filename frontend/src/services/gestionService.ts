import api from './api';
import type { Asignacion, HistorialEstado, Evidencia } from '../types/gestion';

export const gestionService = {
  // Asignaciones
  getAsignaciones: async () => {
    const response = await api.get<Asignacion[]>('/asignaciones');
    return response.data;
  },
  createAsignacion: async (data: Partial<Asignacion>) => {
    const response = await api.post<Asignacion>('/asignaciones', data);
    return response.data;
  },

  // Historial y Estados
  getHistorial: async () => {
    const response = await api.get<HistorialEstado[]>('/historial');
    return response.data;
  },
  createHistorial: async (data: Partial<HistorialEstado>) => {
    const response = await api.post<HistorialEstado>('/historial', data);
    return response.data;
  },

  // Evidencias
  getEvidencias: async () => {
    const response = await api.get<Evidencia[]>('/evidencias');
    return response.data;
  },
  createEvidencia: async (data: Partial<Evidencia>) => {
    const response = await api.post<Evidencia>('/evidencias', data);
    return response.data;
  }
};
