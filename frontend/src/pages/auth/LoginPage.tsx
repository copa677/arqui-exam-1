import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = (role: 'admin' | 'encargado') => {
    // En el futuro esto vendrá del JWT
    if (role === 'admin') {
      navigate('/admin/usuarios');
    } else {
      navigate('/tecnico');
    }
  };

  return (
    <div className="login-container">
      {/* ... fondo ... */}
      
      <div className="glass-card login-card">
        <div className="login-header">
          <div className="login-logo">U</div>
          <h2>Acceso al Sistema</h2>
          <p>Inicia sesión según tu rol asignado</p>
        </div>
        
        <form className="login-form" onSubmit={(e) => e.preventDefault()}>
          <div className="input-group">
            <label><Mail size={16} /> Correo Institucional</label>
            <input type="email" placeholder="usuario@uagrm.edu.bo" required />
          </div>
          
          <div className="input-group">
            <label><Lock size={16} /> Contraseña</label>
            <input type="password" placeholder="••••••••" required />
          </div>
          
          <div className="login-actions-demo">
            <button onClick={() => handleLogin('admin')} className="login-button">
              Entrar como Admin
            </button>
            <button onClick={() => handleLogin('encargado')} className="login-button secondary-btn">
              Entrar como Encargado
            </button>
          </div>
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
