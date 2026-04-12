import api from './api';
import type { Reportador, TipoIncidencia, NotaProblema, DetalleProblema } from '../types/reporte';

export const reporteService = {
  // Reportadores
  createReportador: async (data: Partial<Reportador>) => {
    const response = await api.post<Reportador>('/reportadores', data);
    return response.data;
  },

  // Notas
  getNotasProblema: async () => {
    const response = await api.get<NotaProblema[]>('/notas');
    return response.data;
  },
  createNota: async (data: Partial<NotaProblema>) => {
    const response = await api.post<NotaProblema>('/notas', data);
    return response.data;
  },

  // Detalles
  getDetalles: async () => {
    const response = await api.get<DetalleProblema[]>('/detalles');
    return response.data;
  },
  createDetalle: async (data: Partial<DetalleProblema>) => {
    const response = await api.post<DetalleProblema>('/detalles', data);
    return response.data;
  },
  updateDetalle: async (id: number, data: Partial<DetalleProblema>) => {
    const response = await api.put<DetalleProblema>(`/detalles/${id}`, data);
    return response.data;
  },

  // Tipos
  getTiposIncidencia: async () => {
    const response = await api.get<TipoIncidencia[]>('/tipos-incidencia');
    return response.data;
  }
};
