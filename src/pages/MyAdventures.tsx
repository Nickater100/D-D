import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameSession } from '../store/useGameSession';
import { useRoster } from '../store/useRoster';
import { ADVENTURE_MODULES } from '../data/adventures';
import { ArrowLeft, Play, Trash2, Calendar, User, BookOpen, AlertCircle, X } from 'lucide-react';

export default function MyAdventures() {
  const navigate = useNavigate();
  const { sessions, deleteSession, resumeSession } = useGameSession();
  const { characters } = useRoster();
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);

  const sortedSessions = Object.values(sessions).sort((a, b) => b.updatedAt - a.updatedAt);

  const handleResume = (id: string) => {
    resumeSession(id);
    navigate('/adventure');
  };

  const confirmDelete = (id: string) => {
    deleteSession(id);
    setSessionToDelete(null);
  };

  return (
    <div className="container animate-fade-in flex-col gap-6" style={{ minHeight: '100vh', display: 'flex', paddingBottom: '2rem' }}>
      <div className="flex items-center gap-4">
        <button className="btn-secondary" style={{ padding: '8px' }} onClick={() => navigate('/')}>
          <ArrowLeft size={24} />
        </button>
        <h2 className="font-display text-2xl text-gold" style={{ margin: 0 }}>Mis Aventuras</h2>
      </div>

      <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(212, 175, 55, 0.05)' }}>
        <p className="text-center text-sm" style={{ color: 'var(--text-secondary)', margin: 0 }}>
          Ranuras utilizadas: <strong className="text-gold">{sortedSessions.length} / 5</strong>
        </p>
      </div>

      {sortedSessions.length === 0 ? (
        <div className="glass-panel flex-col items-center justify-center gap-4" style={{ padding: '4rem 2rem', opacity: 0.8 }}>
          <BookOpen size={48} style={{ color: 'var(--glass-border)' }} />
          <div className="text-center">
            <h3 className="font-display text-xl" style={{ margin: '0 0 0.5rem' }}>No hay aventuras activas</h3>
            <p className="text-muted text-sm">Empieza una nueva historia en la biblioteca de módulos.</p>
          </div>
          <button className="btn-primary" onClick={() => navigate('/campaigns')}>
            EXPLORAR HISTORIAS
          </button>
        </div>
      ) : (
        <div className="flex-col gap-4">
          {sortedSessions.map((session) => {
            const char = characters.find(c => c.id === session.characterId);
            const mod = ADVENTURE_MODULES.find(m => m.id === session.moduleId);
            const lastPlayed = new Date(session.updatedAt).toLocaleDateString('es-ES', { 
              day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' 
            });

            const isConfirming = sessionToDelete === session.id;

            return (
              <div 
                key={session.id} 
                className="glass-panel adventure-card" 
                style={{ 
                  padding: '1.2rem 1.5rem', 
                  transition: 'transform 0.2s, border-color 0.2s',
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  borderColor: isConfirming ? '#ff4444' : undefined,
                  overflow: 'hidden'
                }}
              >
                {/* Overlay para Confirmación de Borrado */}
                {isConfirming && (
                  <div style={{
                    position: 'absolute', inset: 0, background: 'rgba(20, 10, 10, 0.95)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    gap: '20px', zIndex: 10, animation: 'fadeIn 0.2s'
                  }}>
                    <div className="flex items-center gap-2 text-[#ff4444]">
                      <AlertCircle size={20} />
                      <span className="font-display text-sm">¿BORRAR PARTIDA?</span>
                    </div>
                    <div className="flex gap-2">
                      <button 
                        className="btn-secondary" 
                        onClick={() => setSessionToDelete(null)}
                        style={{ padding: '8px 16px', fontSize: '12px' }}
                      >
                        NO
                      </button>
                      <button 
                        className="btn-primary" 
                        onClick={() => confirmDelete(session.id)}
                        style={{ padding: '8px 16px', fontSize: '12px', background: '#ff4444', color: 'white' }}
                      >
                        SÍ, ELIMINAR
                      </button>
                    </div>
                  </div>
                )}

                {/* Clickable Area (Left & Center) */}
                <div 
                  onClick={() => handleResume(session.id)}
                  style={{ flex: 1, cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '8px' }}
                >
                  <h3 className="font-display text-lg text-gold" style={{ margin: 0 }}>{session.name}</h3>
                  
                  <div className="flex wrap gap-4 text-xs text-secondary">
                    <div className="flex items-center gap-2">
                      <User size={12} className="text-muted" style={{ pointerEvents: 'none' }} />
                      <span>{char?.name || 'Héroe Desconocido'}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={12} className="text-muted" style={{ pointerEvents: 'none' }} />
                      <span>{lastPlayed}</span>
                    </div>
                  </div>
                </div>

                {/* Actions Area (Right) */}
                <div className="flex gap-2" style={{ flexShrink: 0 }}>
                  <button 
                    className="btn-secondary" 
                    onClick={(e) => { e.stopPropagation(); setSessionToDelete(session.id); }}
                    title="Borrar Aventura"
                    style={{ 
                      padding: '10px', 
                      color: '#ff4444', 
                      borderColor: 'rgba(255,68,68,0.2)',
                      background: 'rgba(255,68,68,0.05)'
                    }}
                  >
                    <Trash2 size={18} style={{ pointerEvents: 'none' }} />
                  </button>
                  <button 
                    className="btn-primary" 
                    onClick={() => handleResume(session.id)}
                    style={{ padding: '10px 18px' }}
                  >
                    <Play size={18} style={{ pointerEvents: 'none' }} />
                  </button>
                </div>

                <style>{`
                  .adventure-card:hover {
                    border-color: rgba(212, 175, 55, 0.4);
                    background: rgba(255,255,255,0.03);
                  }
                  .adventure-card:focus-within {
                    border-color: var(--accent-gold);
                  }
                `}</style>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
