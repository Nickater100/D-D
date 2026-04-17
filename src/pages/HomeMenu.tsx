import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Settings } from 'lucide-react';

export default function HomeMenu() {
  const navigate = useNavigate();

  return (
    <div className="container flex-col items-center justify-center h-full animate-fade-in" style={{ minHeight: '100vh' }}>
      <div className="text-center" style={{ marginBottom: '4rem', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>D&D</h1>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', letterSpacing: '0.2em' }}>AI MASTER</h2>
      </div>

      <div className="glass-panel flex-col gap-4" style={{ padding: '2rem', width: '100%' }}>
        <button 
          className="btn-primary flex items-center justify-center gap-2" 
          onClick={() => navigate('/adventure')}
        >
          <BookOpen size={20} />
          INICIAR AVENTURA
        </button>

        <div style={{ height: '1px', background: 'var(--glass-border)', margin: '1rem 0' }}></div>

        <button 
          className="btn-secondary flex items-center justify-center gap-2" 
          onClick={() => navigate('/roster')}
        >
          <Users size={20} />
          MIS PERSONAJES
        </button>

        <button 
          className="btn-secondary flex items-center justify-center gap-2" 
          onClick={() => alert('Configuración próximamente')}
        >
          <Settings size={20} />
          CONFIGURACIÓN
        </button>
      </div>

      <p className="text-muted text-sm text-center" style={{ marginTop: '3rem' }}>
        v2.0 - Node Edition | Solo Adventure
      </p>
    </div>
  );
}
