import api from './api';
import type { Facultad, Modulo, Ambiente } from '../types/ubicacion';

export const ubicacionService = {
  // Facultades
  getFacultades: async () => {
    const response = await api.get<Facultad[]>('/facultades');
    return response.data;
  },
  createFacultad: async (data: Partial<Facultad>) => {
    const response = await api.post<Facultad>('/facultades', data);
    return response.data;
  },

  // Módulos
  getModulos: async () => {
    const response = await api.get<Modulo[]>('/modulos');
    return response.data;
  },
  createModulo: async (data: Partial<Modulo>) => {
    const response = await api.post<Modulo>('/modulos', data);
    return response.data;
  },

  // Ambientes
  getAmbientes: async () => {
    const response = await api.get<Ambiente[]>('/ambientes');
    return response.data;
  },
  createAmbiente: async (data: Partial<Ambiente>) => {
    const response = await api.post<Ambiente>('/ambientes', data);
    return response.data;
  }
};
