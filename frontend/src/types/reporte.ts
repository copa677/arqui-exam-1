export interface Reportador {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  tipo_reportador: 'Estudiante' | 'Docente' | 'Administrativo' | string;
  activo: boolean;
}

export interface TipoIncidencia {
  id: number;
  nombre_tipo: string;
  activo: boolean;
}

export interface NotaProblema {
  id: number;
  fecha_envio: string;
  reportador_id: number;
  activo: boolean;
}

export interface DetalleProblema {
  id: number;
  descripcion: string;
  estado_actual: string;
  ambiente_id: number;
  nota_id: number;
  tipo_incidencia_id: number;
  activo: boolean;
}
