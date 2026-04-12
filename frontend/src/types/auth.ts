export interface LoginRequest {
  correo: string;
  password?: string;
}

export interface AuthResponse {
  message: string;
  token: string; // Cambiado de 'jwt' a 'token' para coincidir con el backend
  usuario: {     // Cambiado de 'user' a 'usuario' para coincidir con el backend
    id: number;
    correo: string;
    rol_id: number; // Usamos rol_id numérico
    nombres: string;
    apellidos: string;
    facultad_id?: number;
  };
}
