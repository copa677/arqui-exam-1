export interface LoginRequest {
  correo: string;
  password?: string;
}

export interface AuthResponse {
  message: string;
  jwt: string;
  user: {
    id: number;
    correo: string;
    rol: string;
    facultad_id?: number;
  };
}
