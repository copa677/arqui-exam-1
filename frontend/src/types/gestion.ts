export interface Asignacion {
  id: number;
  fecha_asignacion: string;
  detalle_problema_id: number;
  usuario_id: number;
  activo: boolean;
}

export interface HistorialEstado {
  id: number;
  tipo: 'Cambio de Estado' | 'Comentario';
  estado: string;
  fecha_cambio: string;
  comentario_tecnico?: string;
  asignacion_id: number;
  activo: boolean;
}

export interface Evidencia {
  id: number;
  url_archivo: string;
  momento: 'Antes' | 'Despues';
  asignacion_id: number;
  activo: boolean;
}
