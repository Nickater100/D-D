import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoster } from '../store/useRoster';
import { Shield, Plus, ArrowLeft, Trash2, CheckCircle2 } from 'lucide-react';

export default function CharacterRoster() {
  const navigate = useNavigate();
  const { characters, activeCharacterId, setActiveCharacter, deleteCharacter } = useRoster();

  return (
    <div className="container animate-fade-in flex-col gap-6" style={{ minHeight: '100vh', display: 'flex' }}>
      {/* Header */}
      <div className="flex items-center gap-4">
        <button className="btn-secondary" style={{ padding: '8px' }} onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-display text-2xl text-gold" style={{ margin: 0 }}>Mis Personajes</h2>
      </div>

      {characters.length === 0 ? (
        <div className="glass-panel text-center flex-col items-center justify-center gap-4" style={{ padding: '3rem 1rem', flex: 1 }}>
          <Shield size={48} className="text-muted" />
          <h3 style={{ color: 'var(--text-secondary)' }}>Aún no tienes ningún héroe</h3>
          <p className="text-sm text-muted">Forja tu primer personaje para la aventura.</p>
        </div>
      ) : (
        <div className="flex-col gap-4" style={{ flex: 1, overflowY: 'auto' }}>
          {characters.map(char => {
            const isActive = char.id === activeCharacterId;
            return (
              <div 
                key={char.id} 
                className="glass-panel flex justify-between items-center" 
                style={{ 
                  padding: '1rem 1.5rem', 
                  border: isActive ? '1px solid var(--accent-gold)' : undefined,
                  boxShadow: isActive ? '0 0 15px rgba(212, 175, 55, 0.2)' : undefined
                }}
              >
                <div 
                  className="flex-col cursor-pointer" 
                  style={{ flex: 1 }} 
                  onClick={() => setActiveCharacter(isActive ? null : char.id)}
                >
                  <div className="flex items-center gap-2">
                    <h3 className="font-display text-xl" style={{ margin: 0 }}>{char.name}</h3>
                    {isActive && <CheckCircle2 size={16} className="text-gold" />}
                  </div>
                  <p className="text-sm text-secondary">Nivel {char.level} • {char.race} {char.className}</p>
                </div>
                
                <button 
                  className="btn-secondary" 
                  style={{ padding: '8px', border: 'none', color: '#ff4444' }}
                  onClick={(e) => { e.stopPropagation(); deleteCharacter(char.id) }}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Button */}
      <button 
        className="btn-primary flex items-center justify-center gap-2" 
        onClick={() => navigate('/create-character')}
        style={{ marginTop: 'auto' }}
      >
        <Plus size={20} />
        NUEVO PERSONAJE
      </button>
    </div>
  );
}
