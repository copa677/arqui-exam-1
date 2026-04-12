export interface Facultad {
  id: number;
  nombre: string;
  abreviatura: string;
  activo: boolean;
  modulos?: Modulo[];
}

export interface Modulo {
  id: number;
  numero_modulo: string;
  facultad_id: number;
  activo: boolean;
  ambientes?: Ambiente[];
}

export interface Ambiente {
  id: number;
  nombre_ambiente: string;
  piso?: number;
  modulo_id: number;
  activo: boolean;
}
