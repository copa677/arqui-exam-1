import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, Loader2 } from 'lucide-react';
import { login } from '../../services/authService';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await login({ correo, password });
      
      // Guardar en LocalStorage con los nombres de campo correctos del backend
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.usuario));

      // Redirigir según el rol_id (1 = Decano, 2 = Mantenimiento)
      if (response.usuario.rol_id === 1) {
        navigate('/admin/usuarios');
      } else if (response.usuario.rol_id === 2) {
        navigate('/tecnico');
      } else {
        setError('Rol no autorizado para acceder al sistema administrativo.');
      }
    } catch (err: any) {
      setError(err.response?.data?.error || 'Error al iniciar sesión. Verifica tus credenciales.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="glass-card login-card">
        <div className="login-header">
          <div className="login-logo">U</div>
          <h2>Acceso al Sistema</h2>
          <p>Inicia sesión con tu cuenta institucional</p>
        </div>
        
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="error-message">{error}</div>}
          
          <div className="input-group">
            <label><Mail size={16} /> Correo Institucional</label>
            <input 
              type="email" 
              placeholder="usuario@uagrm.edu.bo" 
              required 
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          
          <div className="input-group">
            <label><Lock size={16} /> Contraseña</label>
            <input 
              type="password" 
              placeholder="••••••••" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button type="submit" className="login-button" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : 'Entrar al Sistema'}
          </button>
        </form>
        
        <div className="login-footer">
          <button className="text-button" onClick={() => navigate('/')}>
            Volver al inicio público
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
