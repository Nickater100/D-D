import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, Settings, Scroll } from 'lucide-react';
import { useGameSession } from '../store/useGameSession';

export default function HomeMenu() {
  const navigate = useNavigate();
  const { sessions } = useGameSession();
  const sessionCount = Object.keys(sessions).length;

  return (
    <div className="container flex-col items-center justify-center h-full animate-fade-in" style={{ minHeight: '100vh' }}>
      <div className="text-center" style={{ marginBottom: '4rem', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '4rem', color: 'var(--accent-gold)', marginBottom: '0.5rem' }}>D&D</h1>
        <h2 style={{ fontSize: '1.5rem', color: 'var(--text-secondary)', letterSpacing: '0.2em' }}>AI MASTER</h2>
      </div>

      <div className="glass-panel flex-col gap-4" style={{ padding: '2rem', width: '100%' }}>
        <button 
          className="btn-primary flex items-center justify-center gap-2" 
          onClick={() => navigate('/campaigns')}
        >
          <BookOpen size={20} />
          EXPLORAR HISTORIAS
        </button>

        <button 
          className="btn-secondary flex items-center justify-center gap-2" 
          onClick={() => navigate('/my-adventures')}
          style={{ position: 'relative' }}
        >
          <Scroll size={20} />
          MIS AVENTURAS
          {sessionCount > 0 && (
            <span style={{ 
              position: 'absolute', top: '-5px', right: '-5px',
              background: 'var(--accent-gold)', color: 'black',
              borderRadius: '50%', width: '20px', height: '20px',
              fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 'bold', boxShadow: '0 0 10px rgba(212,175,55,0.5)'
            }}>
              {sessionCount}
            </span>
          )}
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
