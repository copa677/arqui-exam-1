export interface Usuario {
  id?: number;
  nombres: string;
  apellidos: string;
  telefono?: string;
  correo: string;
  password?: string;
  rol_id: number;
  facultad_id?: number;
  activo?: boolean;
}

export interface Rol {
  id: number;
  nombre_rol: string;
  activo: boolean;
}
