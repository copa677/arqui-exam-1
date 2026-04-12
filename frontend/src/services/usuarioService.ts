import api from './api';
import type { Usuario, Rol } from '../types/usuario';

export const usuarioService = {
  getUsuarios: async () => {
    const response = await api.get<Usuario[]>('/usuarios');
    return response.data;
  },
  getUsuario: async (id: number) => {
    const response = await api.get<Usuario>(`/usuarios/${id}`);
    return response.data;
  },
  createUsuario: async (data: Partial<Usuario>) => {
    const response = await api.post<Usuario>('/usuarios', data);
    return response.data;
  },
  updateUsuario: async (id: number, data: Partial<Usuario>) => {
    const response = await api.put<Usuario>(`/usuarios/${id}`, data);
    return response.data;
  },
  deleteUsuario: async (id: number) => {
    const response = await api.delete(`/usuarios/${id}`);
    return response.data;
  },
  getRoles: async () => {
    const response = await api.get<Rol[]>('/roles');
    return response.data;
  }
};
