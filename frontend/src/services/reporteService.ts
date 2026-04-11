import api from './api';
import type { Reportador, TipoIncidencia, NotaProblema, DetalleProblema } from '../types/reporte';

export const reporteService = {
  createReportador: async (data: Partial<Reportador>) => {
    const response = await api.post<Reportador>('/reportes/reportadores', data);
    return response.data;
  },
  createNota: async (data: Partial<NotaProblema>) => {
    const response = await api.post<NotaProblema>('/reportes/notas', data);
    return response.data;
  },
  createDetalle: async (data: Partial<DetalleProblema>) => {
    const response = await api.post<DetalleProblema>('/reportes/detalles', data);
    return response.data;
  },
  getTiposIncidencia: async () => {
    const response = await api.get<TipoIncidencia[]>('/reportes/tipos');
    return response.data;
  }
};
