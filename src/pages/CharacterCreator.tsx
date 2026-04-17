import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Save, User, Shield, Info, Minus, Plus } from 'lucide-react';
import { useRoster } from '../store/useRoster';
import type { Character } from '../types/dnd';
import { SRD_RACES, SRD_CLASSES } from '../data/srd_es';

// --- Hardcoded Backgrounds ---
const BACKGROUNDS = [
  { id: 'acolyte', name: 'Acólito', description: 'Has pasado tu vida al servicio de un templo.' },
  { id: 'criminal', name: 'Criminal', description: 'Tienes una historia de romper la ley y salir impune.' },
  { id: 'folk_hero', name: 'Héroe del Pueblo', description: 'Provienes de las clases bajas pero tu destino es la grandeza.' },
  { id: 'noble', name: 'Noble', description: 'Naciste en medio de la riqueza y el poder.' },
  { id: 'sage', name: 'Sabio', description: 'Pasaste años estudiando la historia oculta y tomos arcanos.' },
  { id: 'soldier', name: 'Soldado', description: 'La guerra corría por tus venas desde que eras joven.' }
];

const ABILITY_MAP = ['str', 'dex', 'con', 'int', 'wis', 'cha'] as const;
type AbilityKey = typeof ABILITY_MAP[number];

const getPointCost = (val: number) => {
  if (val <= 13) return val - 8;
  if (val === 14) return 7;
  if (val === 15) return 9;
  return 0;
};

export default function CharacterCreator() {
  const navigate = useNavigate();
  const addCharacter = useRoster(state => state.addCharacter);
  const setActiveCharacter = useRoster(state => state.setActiveCharacter);

  const [step, setStep] = useState(1);
  const [selectedRace, setSelectedRace] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedBackground, setSelectedBackground] = useState<any>(null);
  const [charName, setCharName] = useState('');

  // Point Buy State
  const [assignedStats, setAssignedStats] = useState<Record<AbilityKey, number>>({
    str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8
  });

  const getRacialBonus = (stat: AbilityKey) => {
    if (!selectedRace) return 0;
    return selectedRace.bonuses[stat] || 0;
  };

  const calculateModifier = (val: number) => Math.floor((val - 10) / 2);

  // Point Buy Logic
  const totalCost = ABILITY_MAP.reduce((acc, stat) => acc + getPointCost(assignedStats[stat]), 0);
  const pointsRemaining = 27 - totalCost;

  const increaseStat = (stat: AbilityKey) => {
    const current = assignedStats[stat];
    if (current >= 15) return;
    const costOfNext = getPointCost(current + 1) - getPointCost(current);
    if (pointsRemaining >= costOfNext) {
      setAssignedStats({ ...assignedStats, [stat]: current + 1 });
    }
  };

  const decreaseStat = (stat: AbilityKey) => {
    const current = assignedStats[stat];
    if (current <= 8) return;
    setAssignedStats({ ...assignedStats, [stat]: current - 1 });
  };

  const handleSave = () => {
    if (!charName) return alert("Elige un nombre legendario para tu héroe.");

    const finalStats: Record<AbilityKey, number> = {
      str: assignedStats.str + getRacialBonus('str'),
      dex: assignedStats.dex + getRacialBonus('dex'),
      con: assignedStats.con + getRacialBonus('con'),
      int: assignedStats.int + getRacialBonus('int'),
      wis: assignedStats.wis + getRacialBonus('wis'),
      cha: assignedStats.cha + getRacialBonus('cha')
    };

    const newChar: Character = {
      id: crypto.randomUUID(),
      name: charName,
      race: selectedRace.name,
      className: selectedClass.name,
      level: 1,
      hp: selectedClass.hit_die + calculateModifier(finalStats.con),
      maxHp: selectedClass.hit_die + calculateModifier(finalStats.con),
      ac: 10 + calculateModifier(finalStats.dex),
      attributes: finalStats as any,
      background: selectedBackground.name,
      alignment: 'Neutral',
      portraitUrl: selectedRace.image
    };

    addCharacter(newChar);
    setActiveCharacter(newChar.id);
    navigate('/roster');
  };

  return (
    <div className="container animate-fade-in flex-col gap-4" style={{ minHeight: '100vh', display: 'flex' }}>
      
      {/* HEADER WIZARD */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="btn-secondary" style={{ padding: '8px' }} onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-display text-xl text-gold" style={{ margin: 0 }}>
            {step === 1 && "Paso 1: Origen y Raza"}
            {step === 2 && "Paso 2: Clase"}
            {step === 3 && "Paso 3: Trasfondo"}
            {step === 4 && "Paso 4: Point Buy Estricto"}
            {step === 5 && "Paso 5: Resumen"}
          </h2>
        </div>
        <div className="text-secondary font-display">Paso {step} de 5</div>
      </div>

      <div style={{ height: '4px', background: 'var(--glass-border)', borderRadius: '2px', display: 'flex' }}>
        <div style={{ width: `${(step / 5) * 100}%`, background: 'var(--accent-gold)', borderRadius: '2px', transition: 'width 0.3s' }}></div>
      </div>

      {/* CONTENT PANE (SPLIT LAYOUT) */}
      <div className="glass-panel flex gap-4" style={{ flex: 1, padding: '1rem', overflow: 'hidden' }}>
        
        {/* === STEP 1: RACE === */}
        {step === 1 && (
          <>
            <div className="w-full flex-col gap-2 relative" style={{ overflowY: 'auto', paddingRight: '10px', flex: 1 }}>
              {SRD_RACES.map(r => (
                <button key={r.id}
                  className={`btn-secondary text-left w-full ${selectedRace?.id === r.id ? 'active' : ''}`}
                  style={{ border: selectedRace?.id === r.id ? '1px solid var(--accent-gold)' : '' }}
                  onClick={() => setSelectedRace(r)}>
                  {r.name}
                </button>
              ))}
            </div>
            <div className="w-full flex-col gap-4 relative" style={{ flex: 2, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', overflowY: 'auto', overflowX: 'hidden' }}>
              {!selectedRace ? (
                <div className="h-full flex-col items-center justify-center text-muted">
                  <User size={64} opacity={0.2} />
                  <p>Selecciona una raza de tu linaje.</p>
                </div>
              ) : (
                <div className="animate-fade-in flex-col gap-4 relative">
                  {selectedRace.image && (
                     <div style={{ position: 'absolute', top: -20, right: -20, width: '200px', height: '200px', opacity: 0.3, maskImage: 'linear-gradient(to bottom, black 20%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent)' }}>
                        <img src={selectedRace.image} alt="Archetype" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                     </div>
                  )}

                  <h1 className="font-display text-4xl text-gold" style={{ zIndex: 1 }}>{selectedRace.name}</h1>
                  <p className="text-sm text-secondary" style={{ zIndex: 1 }}>Velocidad: {selectedRace.speed} pies</p>
                  
                  <div style={{ zIndex: 1, marginTop: '1rem' }}>
                    <h3 className="font-display text-gold">Bonificaciones Base:</h3>
                    <div className="flex gap-2 flex-wrap" style={{ marginTop: '0.5rem' }}>
                      {ABILITY_MAP.map(stat => {
                        const bonus = selectedRace.bonuses[stat];
                        if (bonus > 0) return <div key={stat} className="px-3 py-1" style={{ background: 'rgba(0, 204, 102, 0.2)', border: '1px solid #00cc66', borderRadius: '4px', color: '#00cc66' }}>+{bonus} {stat.toUpperCase()}</div>;
                        return null;
                      })}
                    </div>
                  </div>
                  <div style={{ zIndex: 1, marginTop: '1rem' }}>
                    <h3 className="font-display text-gold mb-2">Composición:</h3>
                    <p className="text-sm text-primary mb-2 line-height">{selectedRace.alignment}</p>
                    <p className="text-sm text-muted">{selectedRace.size}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* === STEP 2: CLASS === */}
        {step === 2 && (
          <>
            <div className="w-full flex-col gap-2" style={{ overflowY: 'auto', paddingRight: '10px', flex: 1 }}>
              {SRD_CLASSES.map(c => (
                <button key={c.id}
                  className={`btn-secondary text-left w-full ${selectedClass?.id === c.id ? 'active' : ''}`}
                  style={{ border: selectedClass?.id === c.id ? '1px solid var(--accent-gold)' : '' }}
                  onClick={() => setSelectedClass(c)}>
                  {c.name}
                </button>
              ))}
            </div>
            <div className="w-full flex-col gap-4 relative" style={{ flex: 2, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', overflowY: 'auto' }}>
              {!selectedClass ? (
                 <div className="h-full flex-col items-center justify-center text-muted"><Shield size={64} opacity={0.2} /><p>Selecciona tu camino marcial o mágico.</p></div>
              ) : (
                <div className="animate-fade-in flex-col gap-4 relative">
                  
                  <div style={{ position: 'absolute', top: -20, right: -20, width: '200px', height: '200px', opacity: 0.2, maskImage: 'linear-gradient(to bottom, black 20%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent)' }}>
                      <img src={`/assets/${selectedClass.group}.png`} alt="Class" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  <h1 className="font-display text-4xl text-gold" style={{ zIndex: 1 }}>{selectedClass.name}</h1>
                  <p className="text-xl text-secondary" style={{ zIndex: 1 }}><strong>Dado de Golpe:</strong> d{selectedClass.hit_die}</p>
                  
                  <div style={{ zIndex: 1, marginTop: '2rem' }}>
                    <h3 className="font-display text-gold">Tiradas de Salvación Principales:</h3>
                    <p className="text-md text-primary mt-2">{selectedClass.saves.join(' y ')}</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* === STEP 3: BACKGROUND === */}
        {step === 3 && (
          <>
            <div className="w-full flex-col gap-2" style={{ overflowY: 'auto', paddingRight: '10px', flex: 1 }}>
              {BACKGROUNDS.map(bg => (
                <button key={bg.id}
                  className={`btn-secondary text-left w-full`}
                  style={{ border: selectedBackground?.id === bg.id ? '1px solid var(--accent-gold)' : '' }}
                  onClick={() => setSelectedBackground(bg)}>
                  {bg.name}
                </button>
              ))}
            </div>
            <div className="w-full flex-col gap-4" style={{ flex: 1.5, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', overflowY: 'auto' }}>
              {!selectedBackground ? (
                <div className="h-full flex-col items-center justify-center text-muted"><Info size={64} opacity={0.2} /><p>Selecciona tu vida pasada.</p></div>
              ) : (
                <div className="animate-fade-in flex-col gap-4">
                  <h1 className="font-display text-3xl text-gold">{selectedBackground.name}</h1>
                  <p className="text-md text-secondary" style={{ lineHeight: '1.6' }}>{selectedBackground.description}</p>
                </div>
              )}
            </div>
          </>
        )}

        {/* === STEP 4: ABILITIES === */}
        {step === 4 && (
          <div className="flex-col w-full h-full gap-4 p-2">
            <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/10" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <div>
                <p className="text-gold font-display text-2xl">Point Buy (Compra de Puntos)</p>
                <p className="text-sm text-secondary">Ajusta tus características. La base es 8, el máximo es 15.</p>
              </div>
              <div className="flex-col items-end">
                <span className="font-display text-4xl" style={{ color: pointsRemaining > 0 ? '#fff' : (pointsRemaining === 0 ? 'var(--accent-gold)' : '#ff4444') }}>
                  {pointsRemaining}
                </span>
                <span className="text-muted text-sm uppercase">Puntos Disponibles</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1rem' }}>
              {ABILITY_MAP.map(stat => {
                const base = assignedStats[stat];
                const bonus = getRacialBonus(stat);
                const finalVal = base + bonus;
                const mod = calculateModifier(finalVal);
                
                const costOfNext = getPointCost(base + 1) - getPointCost(base);
                const canIncrease = base < 15 && pointsRemaining >= costOfNext;
                const canDecrease = base > 8;

                return (
                  <div key={stat} className="flex-col items-center p-4 glass-panel" style={{ position: 'relative' }}>
                    <span className="text-muted text-md uppercase font-display text-gold">{stat}</span>
                    
                    <div className="flex items-center gap-4 my-3">
                      <button 
                        onClick={() => decreaseStat(stat)}
                        disabled={!canDecrease}
                        style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: canDecrease ? 'white' : 'gray', padding: '4px', borderRadius: '4px', cursor: canDecrease ? 'pointer' : 'not-allowed' }}>
                        <Minus size={16} />
                      </button>
                      
                      <span className="font-display" style={{ fontSize: '2.5rem', width: '40px', textAlign: 'center' }}>
                        {base}
                      </span>
                      
                      <button 
                         onClick={() => increaseStat(stat)}
                         disabled={!canIncrease}
                         style={{ background: 'transparent', border: '1px solid var(--glass-border)', color: canIncrease ? 'white' : 'gray', padding: '4px', borderRadius: '4px', cursor: canIncrease ? 'pointer' : 'not-allowed' }}>
                        <Plus size={16} />
                      </button>
                    </div>

                    <div className="w-full text-center p-2 rounded" style={{ background: bonus > 0 ? 'rgba(0, 204, 102, 0.1)' : 'rgba(255,255,255,0.05)', borderTop: bonus > 0 ? '1px solid #00cc66' : '1px solid transparent' }}>
                       {bonus > 0 && <div className="text-sm" style={{ color: '#00cc66', fontWeight: 'bold' }}>+{bonus} Raza = {finalVal}</div>}
                       {bonus === 0 && <div className="text-sm text-secondary">Total = {finalVal}</div>}
                    </div>
                    
                    <div style={{ position: 'absolute', top: -15, right: -15, background: 'var(--accent-purple)', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem', boxShadow: '0 0 10px rgba(122, 31, 162, 0.8)' }}>
                      {mod >= 0 ? `+${mod}` : mod}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* === STEP 5: FINAL === */}
        {step === 5 && (
          <div className="flex-col w-full h-full items-center justify-center gap-6">
            <div style={{ position: 'relative', width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-gold)' }}>
                {selectedRace?.image ? (
                   <img src={selectedRace.image} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                   <div className="w-full h-full bg-black flex items-center justify-center"><User size={40} className="text-gold" /></div>
                )}
            </div>
            
            <div className="flex-col w-full" style={{ maxWidth: '400px' }}>
              <label className="text-gold font-display text-sm mb-2 text-center">Nombre de tu Héroe</label>
              <input 
                type="text" 
                value={charName}
                onChange={e => setCharName(e.target.value)}
                placeholder="Escribe el nombre legendario..."
                style={{ 
                  width: '100%', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--accent-gold)', 
                  color: 'white', padding: '16px', borderRadius: '8px', fontSize: '1.2rem', fontFamily: 'Outfit',
                  outline: 'none', textAlign: 'center'
                }}
              />
            </div>

            <div className="flex gap-4 w-full justify-center" style={{ maxWidth: '400px' }}>
              <div className="glass-panel text-center p-3 flex-col flex-1">
                <span className="text-muted text-sm">RAZA</span>
                <span className="text-gold font-display">{selectedRace?.name}</span>
              </div>
              <div className="glass-panel text-center p-3 flex-col flex-1">
                <span className="text-muted text-sm">CLASE</span>
                <span className="text-gold font-display">{selectedClass?.name}</span>
              </div>
            </div>
            
            <div className="glass-panel text-center p-3 flex-col w-full" style={{ maxWidth: '400px' }}>
              <span className="text-muted text-sm">TRASFONDO</span>
              <span className="text-gold font-display">{selectedBackground?.name}</span>
            </div>

          </div>
        )}

      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-between mt-4">
        <button 
          className="btn-secondary" 
          disabled={step === 1}
          onClick={() => setStep(s => Math.max(1, s - 1))}
          style={{ opacity: step === 1 ? 0.3 : 1 }}
        >
          ANTERIOR
        </button>
        
        {step < 5 ? (
          <button 
            className="btn-primary flex items-center gap-2"
            onClick={() => setStep(s => Math.min(5, s + 1))}
            disabled={
              (step === 1 && !selectedRace) || 
              (step === 2 && !selectedClass) || 
              (step === 3 && !selectedBackground)
            }
          >
            SIGUIENTE <ChevronRight size={18} />
          </button>
        ) : (
          <button 
            className="btn-primary flex items-center gap-2" style={{ background: 'linear-gradient(135deg, #00cc66, #00994c)' }}
            onClick={handleSave}
          >
            <Save size={18} /> CONFIRMAR Y GUARDAR
          </button>
        )}
      </div>

    </div>
  );
}
