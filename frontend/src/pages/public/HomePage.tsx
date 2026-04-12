import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, ShieldCheck, MapPin, ClipboardList } from 'lucide-react';
import './HomePage.css';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <header className="home-nav">
        <div className="home-logo">
          <div className="logo-icon">U</div>
          <span>UAGRM Reportes</span>
        </div>
        <button className="login-link-btn" onClick={() => navigate('/login')}>
          Acceso Personal
        </button>
      </header>

      <main className="home-hero">
        <div className="hero-content">
          <div className="badge">Sistema de Reporte de Incidencias</div>
          <h1>Mantengamos nuestra <span className="highlight">universidad</span> en excelente estado.</h1>
          <p>¿Has notado algún problema en las instalaciones? Infórmanos rápidamente para que podamos solucionarlo.</p>
          
          <div className="hero-actions">
            <button className="cta-button" onClick={() => navigate('/reportar')}>
              <span>Reportar un Problema</span>
              <AlertCircle size={20} />
            </button>
            <button className="secondary-cta">
              Ver incidencias recientes
            </button>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="glass-card feature-card">
            <ShieldCheck className="feature-icon primary" size={24} />
            <h3>Seguro y Rápido</h3>
            <p>Reporta de forma anónima o identificada en segundos.</p>
          </div>
          <div className="glass-card feature-card offset">
            <MapPin className="feature-icon accent" size={24} />
            <h3>Ubicación Precisa</h3>
            <p>Selecciona la facultad, módulo y ambiente exacto.</p>
          </div>
          <div className="glass-card feature-card">
            <ClipboardList className="feature-icon secondary" size={24} />
            <h3>Seguimiento Real</h3>
            <p>Mira el estado de tu reporte hasta que sea solucionado.</p>
          </div>
        </div>
      </main>

      <section className="how-it-works">
        <h2>¿Cómo funciona?</h2>
        <div className="steps-grid">
          <div className="step">
            <div className="step-num">01</div>
            <h4>Reporta</h4>
            <p>Seleccionas el lugar y describes el desperfecto.</p>
          </div>
          <div className="step">
            <div className="step-num">02</div>
            <h4>Verificamos</h4>
            <p>El personal técnico valida y asigna la tarea.</p>
          </div>
          <div className="step">
            <div className="step-num">03</div>
            <h4>Solucionamos</h4>
            <p>Se realiza el mantenimiento y se cierra el caso.</p>
          </div>
        </div>
      </section>
      
      <footer className="home-footer">
        <p>© 2026 Universidad Autónoma Gabriel René Moreno - Gestión de Infraestructura</p>
      </footer>
    </div>
  );
};

export default HomePage;
