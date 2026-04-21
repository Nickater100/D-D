import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoster } from '../store/useRoster';
import { Shield, Plus, ArrowLeft, Trash2, User, Wand2, Zap, Activity } from 'lucide-react';
import { ALL_SRD_SPELLS } from '../data/srd/spells';
import { SRD_RACES } from '../data/srd_es';

export default function CharacterRoster() {
  const navigate = useNavigate();
  const { characters, activeCharacterId, setActiveCharacter, deleteCharacter } = useRoster();
  const [activeTab, setActiveTab] = React.useState<'general' | 'magic' | 'passives'>('general');

  // Handle tab switching without closing the character card
  const handleTabClick = (e: React.MouseEvent, tab: any) => {
    e.stopPropagation();
    setActiveTab(tab);
  };

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
            const spells = ALL_SRD_SPELLS.filter(s => char.spells?.includes(s.id));

            return (
              <div 
                key={char.id} 
                className="glass-panel flex-col transition-all duration-300" 
                style={{ 
                  padding: '1rem', 
                  border: isActive ? '1px solid var(--accent-gold)' : '1px solid var(--glass-border)',
                  boxShadow: isActive ? '0 0 30px rgba(212, 175, 55, 0.1)' : undefined,
                  background: isActive ? 'rgba(0,0,0,0.6)' : undefined
                }}
              >
                {/* Header Row */}
                <div 
                  className="flex justify-between items-center cursor-pointer w-full" 
                  onClick={() => {
                    setActiveCharacter(isActive ? null : char.id);
                    if (!isActive) setActiveTab('general');
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-gold/30 bg-black/40">
                      {char.portraitUrl ? <img src={char.portraitUrl} className="w-full h-full object-cover" /> : <User className="w-full h-full p-2 text-gold/20" />}
                    </div>
                    <div className="flex-col">
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-xl text-white">{char.name}</h3>
                        {isActive && <div className="w-2 h-2 rounded-full bg-gold animate-pulse"></div>}
                      </div>
                      <p className="text-[10px] text-muted uppercase tracking-widest">
                        {char.race} • {char.classes.map(c => `${c.name} ${c.level}`).join(' / ')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button 
                      className="p-2 hover:bg-red-500/10 rounded-lg text-red-500/40 hover:text-red-500 transition-colors"
                      onClick={(e) => { e.stopPropagation(); if(confirm('¿Borrar héroe?')) deleteCharacter(char.id) }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Detailed Tabs View */}
                {isActive && (() => {
                  const race = SRD_RACES.find(r => r.name === char.race);
                  const speed = race?.speed ?? 30;
                  const profBonus = 2; // Level 1
                  const calcMod = (v: number) => Math.floor((v - 10) / 2);
                  const fmtMod = (v: number) => v >= 0 ? `+${v}` : `${v}`;
                  const STAT_LABELS: Record<string, string> = { str: 'FUE', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR' };
                  const STAT_COLORS: Record<string, string> = { str: '#ef4444', dex: '#22d3ee', con: '#f97316', int: '#a78bfa', wis: '#4ade80', cha: '#f472b6' };

                  return (
                  <div className="animate-fade-in mt-5 border-t border-white/10 pt-5 overflow-hidden">
                    {/* Sub-nav Tabs — Underline style */}
                    <div className="flex gap-1 mb-5">
                      {[
                        { id: 'general', label: 'General', icon: Activity },
                        { id: 'magic',   label: 'Magia',   icon: Wand2    },
                        { id: 'passives',label: 'Pasivas', icon: Zap      }
                      ].map(t => (
                        <button
                          key={t.id}
                          onClick={(e) => handleTabClick(e, t.id)}
                          style={{
                            flex: 1,
                            padding: '8px 4px',
                            borderRadius: '8px 8px 0 0',
                            borderBottom: activeTab === t.id ? '2px solid var(--accent-gold)' : '2px solid transparent',
                            background: activeTab === t.id ? 'rgba(212,175,55,0.07)' : 'transparent',
                            color: activeTab === t.id ? 'var(--accent-gold)' : 'var(--text-muted)',
                            fontSize: '10px',
                            fontFamily: 'var(--font-display)',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            transition: 'all 0.2s ease',
                            cursor: 'pointer',
                            border: 'none',
                          }}
                        >
                          <t.icon size={13} />
                          {t.label}
                        </button>
                      ))}
                    </div>
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', marginBottom: '16px' }}/>

                    {/* ── GENERAL TAB ── */}
                    {activeTab === 'general' && (
                      <div className="flex-col gap-3 animate-fade-in">
                        {/* Stat Grid — large cards with modifier */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', gap: '8px' }}>
                          {Object.entries(char.attributes).map(([k, v]) => {
                            const mod = calcMod(v as number);
                            const color = STAT_COLORS[k] ?? '#fff';
                            return (
                              <div key={k} style={{ background: 'rgba(0,0,0,0.5)', border: `1px solid ${color}22`, borderRadius: '12px', padding: '10px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                                <span style={{ fontSize: '9px', color: color, opacity: 0.6, letterSpacing: '0.1em', fontFamily: 'var(--font-display)', textTransform: 'uppercase' }}>{STAT_LABELS[k]}</span>
                                <span style={{ fontSize: '22px', fontFamily: 'var(--font-display)', color: 'white', lineHeight: 1.1 }}>{v as number}</span>
                                <span style={{ fontSize: '11px', color: color, fontWeight: 600 }}>{fmtMod(mod)}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Combat Row — HP / AC / Speed */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '8px' }}>
                          {[
                            { label: 'Vida Máx.', value: `${char.maxHp} HP`, color: '#4ade80', icon: '❤️' },
                            { label: 'Armadura', value: `${char.ac} CA`,   color: '#60a5fa', icon: '🛡️' },
                            { label: 'Velocidad', value: `${speed / 2} m`, color: '#fbbf24', icon: '⚡' },
                          ].map(stat => (
                            <div key={stat.label} style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '10px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span style={{ fontSize: '18px' }}>{stat.icon}</span>
                              <span style={{ fontSize: '16px', fontFamily: 'var(--font-display)', color: stat.color }}>{stat.value}</span>
                              <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{stat.label}</span>
                            </div>
                          ))}
                        </div>

                        {/* Info Row — Proficiency / Background / Initiative */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Bon. Competencia</span>
                            <span style={{ fontSize: '15px', fontFamily: 'var(--font-display)', color: '#c084fc' }}>+{profBonus}</span>
                          </div>
                          <div style={{ background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '10px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Iniciativa</span>
                            <span style={{ fontSize: '15px', fontFamily: 'var(--font-display)', color: '#22d3ee' }}>{fmtMod(calcMod(char.attributes.dex))}</span>
                          </div>
                        </div>

                        {/* Background badge */}
                        <div style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Trasfondo</span>
                          <span style={{ fontSize: '13px', fontFamily: 'var(--font-display)', color: 'var(--accent-gold)' }}>{char.background}</span>
                        </div>
                      </div>
                    )}

                      {activeTab === 'magic' && (
                        <div className="flex-col gap-2 animate-fade-in">
                          {spells.length > 0 ? spells.map(s => (
                            <div key={s.id} className="bg-white/5 p-3 rounded-xl border border-white/10">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-blue-400 font-display uppercase text-xs">{s.name}</span>
                                <span className="text-[9px] text-muted italic">{s.type}</span>
                              </div>
                              <p className="text-[11px] text-secondary line-clamp-2 leading-relaxed">{s.description}</p>
                            </div>
                          )) : (
                            <div className="h-32 flex-col items-center justify-center text-muted opacity-30 italic text-sm">No posee artes místicas.</div>
                          )}
                        </div>
                      )}

                      {activeTab === 'passives' && (
                        <div className="flex-col gap-2 animate-fade-in">
                          {char.features && char.features.length > 0 ? char.features.map((f, i) => (
                            <div key={i} className="bg-white/5 p-3 rounded-xl border border-white/10">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-purple-400 font-display uppercase text-xs">{f.name}</span>
                                <span className="text-[9px] text-muted uppercase">Origen: {f.source}</span>
                              </div>
                              <p className="text-[11px] text-secondary leading-relaxed">{f.description}</p>
                            </div>
                          )) : (
                            <div className="h-32 flex-col items-center justify-center text-muted opacity-30 italic text-sm">Sin rasgos especiales.</div>
                          )}
                        </div>
                      )}
                  </div>
                  );
                })()}

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
