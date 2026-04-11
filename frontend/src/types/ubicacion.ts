export interface Facultad {
  id: number;
  nombre: string;
  abreviatura: string;
  activo: boolean;
}

export interface Modulo {
  id: number;
  numero_modulo: string;
  facultad_id: number;
  activo: boolean;
}

export interface Ambiente {
  id: number;
  nombre_ambiente: string;
  piso?: number;
  modulo_id: number;
  activo: boolean;
}
