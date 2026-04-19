import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Play, Map, Sparkles, BookOpen } from 'lucide-react';
import { useRoster } from '../store/useRoster';
import { useGameSession } from '../store/useGameSession';
import { ADVENTURE_MODULES } from '../data/adventures';

export default function CampaignMenu() {
  const navigate = useNavigate();
  const { activeCharacterId, characters } = useRoster();
  const { createSession } = useGameSession();

  const activeChar = characters.find(c => c.id === activeCharacterId);

  const startModule = (moduleId: string) => {
    if (!activeChar) return;
    
    const mod = ADVENTURE_MODULES.find(m => m.id === moduleId);
    const sessionId = createSession(
      activeChar.name, 
      activeChar.id, 
      mod?.title || 'Aventura', 
      moduleId
    );

    if (!sessionId) {
      alert('⚠️ Has alcanzado el límite de 5 aventuras guardadas. Por favor, elimina una partida en "Mis Aventuras" para comenzar una nueva.');
      return;
    }

    navigate('/adventure');
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'classic': return <Map className="text-gold" size={24} />;
      case 'random': return <Sparkles className="text-purple-400" style={{ color: '#b388ff' }} size={24} />;
      default: return <BookOpen size={24} />;
    }
  };

  return (
    <div className="container animate-fade-in flex-col gap-6" style={{ minHeight: '100vh', display: 'flex', paddingBottom: '2rem' }}>
      <div className="flex items-center gap-4">
        <button className="btn-secondary" style={{ padding: '8px' }} onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-display text-2xl text-gold" style={{ margin: 0 }}>Módulos de Aventura</h2>
      </div>

      {!activeChar && (
        <div className="glass-panel" style={{ border: '1px solid #ff4444', background: 'rgba(255, 68, 68, 0.1)' }}>
          <p className="text-center" style={{ margin: '1rem', color: '#ffaaaa' }}>
            <strong>Atención:</strong> No tienes ningún héroe activo seleccionado. 
            Ve a "Mis Personajes" para elegir quién protagonizará la travesía.
          </p>
        </div>
      )}

      {activeChar && (
        <div className="glass-panel">
          <p className="text-center" style={{ margin: '1rem', color: 'var(--text-secondary)' }}>
            Héroe Seleccionado: <strong className="text-gold font-display text-xl">{activeChar.name}</strong> 
            <span className="text-muted"> (Nivel {activeChar.level} {activeChar.classes.map(c => `${c.name} ${c.level}`).join(' / ')})</span>
          </p>
        </div>
      )}

      <div className="flex-col gap-4">
        {ADVENTURE_MODULES.map(mod => (
          <div key={mod.id} className="glass-panel flex-col gap-4" style={{ padding: '1.5rem', border: mod.type === 'random' ? '1px solid rgba(179,136,255,0.2)' : undefined }}>
            <div className="flex justify-between items-start">
              <div className="flex gap-4">
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '12px', borderRadius: '12px' }}>
                  {getIcon(mod.type)}
                </div>
                <div>
                  <h3 className="font-display text-xl" style={{ margin: 0 }}>{mod.title}</h3>
                  <span className="text-muted text-sm">{mod.author}</span>
                </div>
              </div>
            </div>
            
            <p className="text-secondary text-sm">{mod.description}</p>
            
            <button 
              className="btn-primary flex items-center justify-center gap-2 w-full mt-2" 
              onClick={() => startModule(mod.id)}
              disabled={!activeChar}
              style={{ 
                opacity: !activeChar ? 0.5 : 1, 
                cursor: !activeChar ? 'not-allowed' : 'pointer',
                background: mod.type === 'random' ? 'linear-gradient(135deg, #7c3aed, #4f46e5)' : undefined,
                color: mod.type === 'random' ? 'white' : undefined,
              }}
            >
              <Play size={18} /> INICIAR AVENTURA
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
