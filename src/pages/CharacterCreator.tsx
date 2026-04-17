import React, { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Save, User, Shield, Info, Minus, Plus, Wand2, Star, Flame, Heart, Sun, Eye, Sparkles, Skull, BookOpen, Medal } from 'lucide-react';
import { useRoster } from '../store/useRoster';
import type { Character, AbilityScores } from '../types/dnd';
import { SRD_RACES, SRD_CLASSES, SRD_BACKGROUNDS_2024 } from '../data/srd_es';
import { STARTER_SPELLS, GET_CLASS_MAGIC_CAPACITY } from '../data/spells_es';
import { ORIGIN_FEATS } from '../data/feats_es';
import { ErrorBoundary, AttributeBonusSelector } from '../components/CharacterCreatorComponents';

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
  const [selectedSubclass, setSelectedSubclass] = useState<any>(null);
  const [selectedBackground, setSelectedBackground] = useState<any>(null);
  const [charName, setCharName] = useState('');
  
  const lastClickTime = useRef<number>(0);
  const CLICK_COOLDOWN = 150; // ms

  // 2024 Ability Bonus State (Selection within background options)
  const [backgroundBonuses, setBackgroundBonuses] = useState<Partial<Record<AbilityKey, number>>>({});

  // Magic State
  const [selectedCantrips, setSelectedCantrips] = useState<string[]>([]);
  const [selectedLvl1, setSelectedLvl1] = useState<string[]>([]);
  const [previewSpell, setPreviewSpell] = useState<any>(null);

  // Point Buy State
  const [assignedStats, setAssignedStats] = useState<Record<AbilityKey, number>>({
    str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8
  });

  const getBackgroundBonus = (stat: AbilityKey) => {
    return backgroundBonuses[stat] || 0;
  };

  const calculateModifier = (val: number) => Math.floor((val - 10) / 2);

  // Point Buy Logic
  const totalCost = ABILITY_MAP.reduce((acc, stat) => acc + getPointCost(assignedStats[stat]), 0);
  const pointsRemaining = 27 - totalCost;

  const increaseStat = (stat: AbilityKey) => {
    setAssignedStats(prev => {
      const current = prev[stat];
      if (current >= 15) return prev;
      const totalCost = ABILITY_MAP.reduce((acc, s) => acc + getPointCost(prev[s]), 0);
      const remaining = 27 - totalCost;
      const costOfCurrent = getPointCost(current);
      const costOfNext = getPointCost(current + 1);
      const diff = costOfNext - costOfCurrent;
      if (remaining >= diff) {
        return { ...prev, [stat]: current + 1 };
      }
      return prev;
    });
  };

  const throwStatError = (msg: string) => {
     // Simple alert or toast logic
     alert(msg);
  };

  const decreaseStat = (stat: AbilityKey) => {
    setAssignedStats(prev => {
      const current = prev[stat];
      if (current <= 8) return prev;
      return { ...prev, [stat]: current - 1 };
    });
  };

  const hasMagic = () => GET_CLASS_MAGIC_CAPACITY(selectedClass?.id) !== null;

  const handleNext = () => {
    setStep(prev => {
      if (prev === 3 && !hasMagic()) return 5;
      return Math.min(6, prev + 1);
    });
  };

  const handlePrev = () => {
    setStep(prev => {
      if (prev === 5 && !hasMagic()) return 3;
      return Math.max(1, prev - 1);
    });
  };

  const toggleSpell = (id: string, type: 'cantrip' | 'lvl1') => {
    const caps = GET_CLASS_MAGIC_CAPACITY(selectedClass?.id);
    if (!caps) return;

    if (type === 'cantrip') {
      setSelectedCantrips(prev => {
        if (prev.includes(id)) return prev.filter(s => s !== id);
        if (prev.length < caps.cantrips) return [...prev, id];
        return prev;
      });
    } else {
      setSelectedLvl1(prev => {
        if (prev.includes(id)) return prev.filter(s => s !== id);
        if (prev.length < caps.spells) return [...prev, id];
        return prev;
      });
    }
  };

  const handleSave = () => {
    if (!charName) return alert("Elige un nombre legendario para tu héroe.");

    const finalStats: Record<AbilityKey, number> = {
      str: assignedStats.str + getBackgroundBonus('str'),
      dex: assignedStats.dex + getBackgroundBonus('dex'),
      con: assignedStats.con + getBackgroundBonus('con'),
      int: assignedStats.int + getBackgroundBonus('int'),
      wis: assignedStats.wis + getBackgroundBonus('wis'),
      cha: assignedStats.cha + getBackgroundBonus('cha')
    };
    const racialFeatures = (selectedRace.features || []).map((f: any) => ({ ...f, source: 'raza' as const }));
    const bgFeat = ORIGIN_FEATS.find(f => f.id === selectedBackground.featId);
    const backgroundFeatures: any[] = bgFeat ? [{ 
      name: `Dote: ${bgFeat.name}`, 
      description: bgFeat.description, 
      source: 'trasfondo' 
    }] : [];

    const newChar: Character = {
      id: crypto.randomUUID(),
      name: charName,
      race: selectedRace.name,
      className: selectedClass.name,
      subclass: selectedSubclass.name,
      spells: [...selectedCantrips, ...selectedLvl1],
      level: 1,
      hp: selectedClass.hit_die + calculateModifier(finalStats.con),
      maxHp: selectedClass.hit_die + calculateModifier(finalStats.con),
      ac: 10 + calculateModifier(finalStats.dex),
      attributes: finalStats as AbilityScores,
      background: selectedBackground.name,
      alignment: 'Neutral',
      portraitUrl: selectedRace.image,
      feats: [selectedBackground.featId],
      features: [...racialFeatures, ...backgroundFeatures]
    };

    addCharacter(newChar);
    setActiveCharacter(newChar.id);
    navigate('/roster');
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return "Paso 1: Especie";
      case 2: return "Paso 2: Clase y Senda";
      case 3: return "Paso 3: Trasfondo y Origen";
      case 4: return "Paso 4: Hechizos de Inicio";
      case 5: return "Paso 5: Atributos (Point Buy)";
      case 6: return "Paso 6: Firma de la Leyenda";
      default: return "";
    }
  };

  const isNextDisabled = () => {
    if (step === 1 && !selectedRace) return true;
    if (step === 2 && (!selectedClass || !selectedSubclass)) return true;
    if (step === 3) {
      if (!selectedBackground) return true;
      const totalBonuses = Object.values(backgroundBonuses).reduce((a, b) => a + b, 0);
      if (totalBonuses !== 3) return true;
    }
    if (step === 4) {
      const caps = GET_CLASS_MAGIC_CAPACITY(selectedClass?.id);
      if (caps && (selectedCantrips.length < caps.cantrips || selectedLvl1.length < caps.spells)) return true;
    }
    return false;
  };

  const getSpellIcon = (type: string) => {
    switch (type) {
      case "Daño": return <Flame size={20} className="text-orange-500" />;
      case "Curación": return <Heart size={20} className="text-pink-500" />;
      case "Soporte": return <Sun size={20} className="text-yellow-400" />;
      case "Control": return <Eye size={20} className="text-purple-500" />;
      case "Utilidad": return <Sparkles size={20} className="text-blue-300" />;
      case "Defensa": return <Shield size={20} className="text-blue-500" />;
      case "Daño Sotenido": return <Skull size={20} className="text-green-500" />;
      default: return <Wand2 size={20} className="text-gray-400" />;
    }
  };

  // Throttled Atomic Functional Cycle
  const cycleBonus = useCallback((stat: AbilityKey) => {
    const now = Date.now();
    if (now - lastClickTime.current < CLICK_COOLDOWN) return;
    lastClickTime.current = now;

    if (!selectedBackground?.abilityOptions.includes(stat)) return;
    
    setBackgroundBonuses(prev => {
      const nb: Record<string, number> = {};
      Object.entries(prev).forEach(([k, v]) => {
        if (typeof v === 'number' && !Number.isNaN(v)) nb[k] = v;
      });

      const current = nb[stat] || 0;
      const totalWithoutCurrent = Object.values(nb).reduce((a, b) => a + (Number(b) || 0), 0) - current;

      if (current === 0) {
        if (totalWithoutCurrent < 3) nb[stat] = 1;
      } else if (current === 1) {
        if (totalWithoutCurrent === 1) {
          nb[stat] = 2;
        } else {
          delete nb[stat];
        }
      } else {
        delete nb[stat];
      }

      return nb as Record<AbilityKey, number>;
    });
  }, [selectedBackground]);

  // --- RENDERING ---
  return (
    <ErrorBoundary>
      <div className="container animate-fade-in flex-col gap-4" style={{ minHeight: '100vh', display: 'flex' }}>

      {/* HEADER WIZARD */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button className="btn-secondary" style={{ padding: '8px' }} onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <h2 className="font-display text-xl text-gold" style={{ margin: 0 }}>{getStepTitle()}</h2>
        </div>
        <div className="text-secondary font-display">Paso {step} de 6</div>
      </div>

      <div style={{ height: '4px', background: 'var(--glass-border)', borderRadius: '2px', display: 'flex' }}>
        <div style={{ width: `${(step / 6) * 100}%`, background: 'var(--accent-gold)', borderRadius: '2px', transition: 'width 0.3s' }}></div>
      </div>

      {/* CONTENT PANE (SPLIT LAYOUT) */}
      <div className="glass-panel flex gap-4" style={{ flex: 1, padding: '1rem', overflow: 'hidden' }}>

        {/* === STEP 1: RACE === */}
        {step === 1 && (
          <div key="step1" className="flex w-full h-full gap-4">
            <div className="flex-col gap-2 relative" style={{ overflowY: 'auto', paddingRight: '10px', flex: 1 }}>
              {SRD_RACES.map(r => (
                <button key={r.id}
                  className={`btn-secondary text-left w-full ${selectedRace?.id === r.id ? 'active' : ''}`}
                  style={{ border: selectedRace?.id === r.id ? '1px solid var(--accent-gold)' : '' }}
                  onClick={() => setSelectedRace(r)}>
                  {r.name}
                </button>
              ))}
            </div>
            <div className="flex-col gap-4 relative" style={{ flex: 2, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', overflowY: 'auto', overflowX: 'hidden' }}>
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
                  <p className="text-secondary" style={{ zIndex: 1, lineHeight: '1.6' }}>{selectedRace.description}</p>
                  
                  <div style={{ zIndex: 1, marginTop: '1rem' }}>
                    <h3 className="font-display text-gold">Velocidad:</h3>
                    <div className="flex gap-2 flex-wrap" style={{ marginTop: '0.5rem' }}>
                      <div className="px-3 py-1" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)', borderRadius: '4px' }}>{selectedRace.speed} PIES</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}


        {/* === STEP 2: CLASS & SUBCLASS === */}
        {step === 2 && (
          <div key="step2" className="flex w-full h-full gap-4 overflow-hidden">
            <div className="flex-col gap-2" style={{ overflowY: 'auto', paddingRight: '10px', flex: 1 }}>
              <h3 className="font-display text-gold mb-2 uppercase text-xs">Elige tu Clase</h3>
              {SRD_CLASSES.map(c => (
                <button key={c.id}
                  className={`btn-secondary text-left w-full mb-1 ${selectedClass?.id === c.id ? 'active' : ''}`}
                  style={{ border: selectedClass?.id === c.id ? '1px solid var(--accent-gold)' : '' }}
                  onClick={() => {
                    setSelectedClass(c);
                    setSelectedSubclass(null);
                    setSelectedCantrips([]);
                    setSelectedLvl1([]);
                  }}>
                  {c.name}
                </button>
              ))}
            </div>
            
            <div className="flex-col gap-2" style={{ overflowY: 'auto', paddingRight: '10px', flex: 1 }}>
              <h3 className="font-display text-gold mb-2 uppercase text-xs">Especialización</h3>
              {!selectedClass ? (
                 <div className="h-full flex-col items-center justify-center text-muted opacity-40"><Star size={32} /></div>
              ) : (
                selectedClass.subclasses.map((sc: any) => (
                  <button key={sc.id}
                    className={`btn-secondary text-left w-full mb-1 ${selectedSubclass?.id === sc.id ? 'active' : ''}`}
                    style={{ border: selectedSubclass?.id === sc.id ? '1px solid var(--accent-gold)' : '' }}
                    onClick={() => setSelectedSubclass(sc)}>
                    {sc.name}
                  </button>
                ))
              )}
            </div>

            <div className="flex-col gap-4 relative" style={{ flex: 1.5, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', overflowY: 'auto' }}>
              {!selectedClass ? (
                <div className="h-full flex-col items-center justify-center text-muted"><Shield size={64} opacity={0.2} /><p>Define tu camino.</p></div>
              ) : (
                <div className="animate-fade-in flex-col gap-4">
                  <h1 className="font-display text-3xl text-gold">{selectedSubclass?.name || selectedClass.name}</h1>
                  <p className="text-secondary" style={{ lineHeight: '1.6' }}>{selectedSubclass?.desc || selectedClass.description}</p>
                  <div className="flex gap-4 mt-2">
                    <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs">DADO DE GOLPE: d{selectedClass.hit_die}</div>
                    <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs">GRUPO: {selectedClass.group.toUpperCase()}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* === STEP 4: MAGIC === */}
        {step === 4 && (
          <div key="step4" className="flex w-full h-full gap-4 overflow-hidden">
            <div className="w-full flex-col gap-4" style={{ overflowY: 'auto', paddingRight: '10px', flex: 1.2 }}>
              <div className="flex justify-between items-center bg-black/40 p-3 rounded-xl border border-white/10" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
                <div>
                  <p className="text-gold font-display text-lg">{GET_CLASS_MAGIC_CAPACITY(selectedClass.id)?.magicType}</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-col items-end">
                    <span className="font-display text-lg text-purple-400">{selectedCantrips.length}/{GET_CLASS_MAGIC_CAPACITY(selectedClass.id)?.cantrips}</span>
                    <span className="text-muted text-[10px] uppercase">Trucos</span>
                  </div>
                  <div className="flex-col items-end">
                    <span className="font-display text-lg text-blue-400">{selectedLvl1.length}/{GET_CLASS_MAGIC_CAPACITY(selectedClass.id)?.spells}</span>
                    <span className="text-muted text-[10px] uppercase">Lvl 1</span>
                  </div>
                </div>
              </div>

              <h3 className="font-display text-md text-gold mt-2">Trucos</h3>
              <div className="grid grid-cols-2 gap-2">
                {STARTER_SPELLS.cantrips.map(spell => {
                  const isActive = selectedCantrips.includes(spell.id);
                  const cap = GET_CLASS_MAGIC_CAPACITY(selectedClass.id)?.cantrips || 0;
                  const isMaxed = selectedCantrips.length >= cap && !isActive;
                  return (
                    <button key={spell.id}
                      onClick={() => { toggleSpell(spell.id, 'cantrip'); setPreviewSpell(spell); }}
                      disabled={isMaxed}
                      onMouseEnter={() => setPreviewSpell(spell)}
                      className="glass-panel flex items-center justify-start gap-2 p-2 hover:border-purple-500/50"
                      style={{ border: isActive ? '1px solid #c084fc' : '1px solid transparent', opacity: isMaxed ? 0.4 : 1, transition: 'all 0.2s', background: isActive ? 'rgba(192, 132, 252, 0.1)' : '' }}>
                      {getSpellIcon(spell.type)}
                      <span className="font-display text-purple-300 text-sm truncate">{spell.name}</span>
                    </button>
                  )
                })}
              </div>

              <h3 className="font-display text-md text-gold mt-4">Hechizos (Nivel 1)</h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {STARTER_SPELLS.level_1.map(spell => {
                  const isActive = selectedLvl1.includes(spell.id);
                  const cap = GET_CLASS_MAGIC_CAPACITY(selectedClass.id)?.spells || 0;
                  const isMaxed = selectedLvl1.length >= cap && !isActive;
                  return (
                    <button key={spell.id}
                      onClick={() => { toggleSpell(spell.id, 'lvl1'); setPreviewSpell(spell); }}
                      disabled={isMaxed}
                      onMouseEnter={() => setPreviewSpell(spell)}
                      className="glass-panel flex items-center justify-start gap-2 p-2 hover:border-blue-500/50"
                      style={{ border: isActive ? '1px solid #60a5fa' : '1px solid transparent', opacity: isMaxed ? 0.4 : 1, transition: 'all 0.2s', background: isActive ? 'rgba(96, 165, 250, 0.1)' : '' }}>
                      {getSpellIcon(spell.type)}
                      <span className="font-display text-blue-300 text-sm truncate">{spell.name}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="w-full flex-col gap-4 relative" style={{ flex: 1.5, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', overflowY: 'auto' }}>
              {!previewSpell ? (
                <div className="h-full flex-col items-center justify-center text-muted"><Wand2 size={64} opacity={0.2} /><p className="mt-4 text-center">Pasa el cursor o selecciona un conjuro para revelar sus misterios.</p></div>
              ) : (
                <div className="animate-fade-in flex-col gap-4 relative">
                  <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1, transform: 'scale(2)' }}>
                    {getSpellIcon(previewSpell.type)}
                  </div>
                  <h1 className="font-display text-3xl text-gold" style={{ zIndex: 1 }}>{previewSpell.name}</h1>
                  <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-primary self-start uppercase tracking-wider">{previewSpell.type}</span>
                  <p className="text-secondary text-md mt-4" style={{ zIndex: 1, lineHeight: '1.6' }}>{previewSpell.desc}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* === STEP 3: BACKGROUND & FEAT === */}
        {step === 3 && (
          <div key="step3" className="flex w-full h-full gap-4 overflow-hidden">
            <div className="flex-col gap-2" style={{ overflowY: 'auto', paddingRight: '10px', flex: 1 }}>
              {SRD_BACKGROUNDS_2024.map(bg => (
                <button key={bg.id}
                  className={`btn-secondary text-left w-full mb-1 ${selectedBackground?.id === bg.id ? 'active' : ''}`}
                  style={{ border: selectedBackground?.id === bg.id ? '1px solid var(--accent-gold)' : '' }}
                  onClick={() => {
                    setSelectedBackground(bg);
                    setBackgroundBonuses({}); // Reset bonuses when background changes
                  }}>
                  {bg.name}
                </button>
              ))}
            </div>

            <div className="flex-col gap-4 relative" style={{ flex: 1.5, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', overflowY: 'auto' }}>
              {!selectedBackground ? (
                <div className="h-full flex-col items-center justify-center text-muted"><BookOpen size={64} opacity={0.2} /><p>Selecciona tu pasado.</p></div>
              ) : (
                <div key={selectedBackground.id} className="animate-fade-in flex-col gap-4 relative">
                  <h1 className="font-display text-3xl text-gold">{selectedBackground.name}</h1>
                  <p className="text-secondary text-sm" style={{ lineHeight: '1.6' }}>{selectedBackground.description}</p>
                  
                  <div className="flex-col gap-2 p-3 bg-black/40 rounded-xl border border-white/10 mt-2">
                    <div className="flex items-center gap-2 text-gold font-display text-sm mb-2">
                      <Star size={18} /> DOTE DE ORIGEN
                    </div>
                    {(() => {
                      const feat = ORIGIN_FEATS.find(f => f.id === selectedBackground.featId);
                      return (
                        <div className="flex-col">
                          <p className="font-bold text-purple-400">{feat?.name}</p>
                          <p className="text-xs text-secondary mt-1">{feat?.description}</p>
                        </div>
                      );
                    })()}
                  </div>

                  <AttributeBonusSelector 
                    backgroundId={selectedBackground.id}
                    abilityOptions={selectedBackground.abilityOptions}
                    backgroundBonuses={backgroundBonuses}
                    onCycle={cycleBonus}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* === STEP 5: ABILITIES === */}
        {step === 5 && (
          <div key="step5" className="flex-col w-full h-full gap-4 p-2 overflow-y-auto">
            <div className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/10" style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', border: '1px solid var(--glass-border)' }}>
              <div>
                <p className="text-gold font-display text-2xl">Puntuaciones de Característica</p>
                <p className="text-sm text-secondary">Ajusta tus stats base (8-15) usando los 27 puntos disponibles.</p>
              </div>
              <div className="flex-col items-end">
                <span className="font-display text-4xl" style={{ color: pointsRemaining > 0 ? '#fff' : (pointsRemaining === 0 ? 'var(--accent-gold)' : '#ff4444') }}>
                   {pointsRemaining}
                </span>
                <span className="text-muted text-sm uppercase text-right">Puntos</span>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginTop: '1rem' }}>
              {ABILITY_MAP.map(stat => {
                const base = assignedStats[stat];
                const bonus = getBackgroundBonus(stat);
                const finalVal = base + bonus;
                const mod = calculateModifier(finalVal);

                const costOfNext = getPointCost(base + 1) - getPointCost(base);
                const canIncrease = base < 15 && pointsRemaining >= costOfNext;
                const canDecrease = base > 8;

                return (
                  <div key={stat} className="flex-col items-center p-4 glass-panel relative animate-fade-in">
                    <span className="text-muted text-md uppercase font-display text-gold">{stat}</span>
                    <div className="flex items-center gap-4 my-3">
                      <button onClick={() => decreaseStat(stat)} disabled={!canDecrease} className="p-1 rounded border border-white/20 hover:bg-white/10 disabled:opacity-30"><Minus size={16} /></button>
                      <span className="font-display text-3xl w-8 text-center">{base}</span>
                      <button onClick={() => increaseStat(stat)} disabled={!canIncrease} className="p-1 rounded border border-white/20 hover:bg-white/10 disabled:opacity-30"><Plus size={16} /></button>
                    </div>
                    <div className="w-full text-center p-2 rounded" style={{ background: bonus > 0 ? 'rgba(0, 204, 102, 0.1)' : 'rgba(255,255,255,0.05)', borderTop: bonus > 0 ? '1px solid #00cc66' : '1px solid transparent' }}>
                      {bonus > 0 && <div className="text-sm text-green-400 font-bold">+{bonus} Trasfondo = {finalVal}</div>}
                      {bonus === 0 && <div className="text-sm text-secondary">Base = {finalVal}</div>}
                    </div>

                    <div className="absolute -top-3 -right-3 bg-fuchsia-800 rounded-full w-10 h-10 flex flex-col items-center justify-center font-bold text-lg shadow-[0_0_10px_rgba(122,31,162,0.8)] border border-white/20">
                      {mod >= 0 ? `+${mod}` : mod}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* === STEP 6: FINAL === */}
        {step === 6 && (
          <div key="step6" className="flex w-full h-full gap-6 animate-fade-in overflow-hidden p-2">
            
            {/* LEFT: HERO IDENTITY */}
            <div className="flex-col items-center gap-6 justify-center bg-black/40 rounded-3xl border border-white/10 relative p-8" style={{ flex: 1.2 }}>
               <div className="absolute top-4 left-4 text-[10px] text-gold/40 font-display tracking-[0.3em] uppercase">Expediente de Héroe</div>
               
               <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gold to-orange-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                  <div className="relative w-48 h-48 rounded-full overflow-hidden border-2 border-gold/50 shadow-2xl">
                    {selectedRace?.image ? (
                      <img src={selectedRace.image} alt="Avatar" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-black/60 flex items-center justify-center"><User size={64} className="text-gold/20" /></div>
                    )}
                  </div>
               </div>

               <div className="flex-col w-full gap-2 items-center">
                  <label className="text-gold/60 font-display text-[10px] uppercase tracking-widest">Nombre del Personaje</label>
                  <input
                    type="text"
                    value={charName}
                    onChange={e => setCharName(e.target.value)}
                    placeholder="Escribe tu leyenda..."
                    className="w-full font-display text-4xl text-center bg-transparent border-b-2 border-gold/20 focus:border-gold outline-none pb-4 transition-all placeholder:text-white/5"
                  />
               </div>

               <div className="flex gap-2 w-full mt-4">
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                     <div className="text-[10px] text-muted uppercase">Especie</div>
                     <div className="text-gold font-display truncate">{selectedRace?.name}</div>
                  </div>
                  <div className="flex-1 bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                     <div className="text-[10px] text-muted uppercase">Clase</div>
                     <div className="text-gold font-display truncate">{selectedClass?.name}</div>
                  </div>
               </div>
            </div>

            {/* RIGHT: DETAILS & STATS */}
            <div className="flex-col gap-4 overflow-y-auto pr-2" style={{ flex: 1.8 }}>
              
              <div className="grid grid-cols-2 gap-3">
                 <div className="glass-panel p-4 border-l-4 border-l-purple-500">
                    <div className="flex items-center gap-2 text-purple-400 font-display text-xs mb-1">
                       <Medal size={14} /> TRASFONDO
                    </div>
                    <div className="text-white font-display text-lg">{selectedBackground?.name}</div>
                 </div>
                 <div className="glass-panel p-4 border-l-4 border-l-gold">
                    <div className="flex items-center gap-2 text-gold font-display text-xs mb-1">
                       <Star size={14} /> DOTE DE ORIGEN
                    </div>
                    <div className="text-white font-display text-lg">{ORIGIN_FEATS.find(f => f.id === selectedBackground?.featId)?.name}</div>
                 </div>
              </div>

              <div className="glass-panel p-6 flex-col gap-4">
                 <div className="text-[10px] text-gold/60 font-display tracking-widest uppercase mb-2 border-b border-white/10 pb-2">Atributos Finales</div>
                 <div className="grid grid-cols-3 gap-y-6 gap-x-4">
                    {ABILITY_MAP.map(stat => {
                      const base = assignedStats[stat];
                      const bonus = getBackgroundBonus(stat);
                      const total = base + bonus;
                      const mod = calculateModifier(total);
                      return (
                        <div key={stat} className="flex-col items-center">
                           <div className="text-[10px] text-muted uppercase font-bold">{stat}</div>
                           <div className="text-3xl font-display text-white">{total}</div>
                           <div className="text-xs text-gold/60 font-bold bg-gold/10 px-2 rounded-full mt-1">
                              {mod >= 0 ? `+${mod}` : mod}
                           </div>
                        </div>
                      )
                    })}
                 </div>
              </div>

              {hasMagic() && (
                <div className="glass-panel p-6 flex-col gap-4">
                  <div className="text-[10px] text-blue-400 font-display tracking-widest uppercase mb-2 border-b border-white/10 pb-2 flex items-center gap-2">
                    <Wand2 size={16} /> Hechizos Preparados
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {[...selectedCantrips, ...selectedLvl1].map(sId => {
                      const spell = [...STARTER_SPELLS.cantrips, ...STARTER_SPELLS.level_1].find(x => x.id === sId);
                      return <span key={sId} className="px-3 py-1.5 bg-blue-900/20 rounded-lg text-[11px] text-blue-200 border border-blue-500/20 uppercase tracking-tighter">{spell?.name}</span>
                    })}
                  </div>
                </div>
              )}

              <div className="mt-auto pt-4 flex-col gap-2">
                <div className="text-[10px] text-muted italic text-center">Revisa bien tus elecciones antes de grabar tu nombre en los anales de la historia.</div>
              </div>

            </div>
          </div>
        )}

      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex justify-between items-center bg-black/80 backdrop-blur-xl p-4 border-t border-white/10">
        <button onClick={handlePrev} className="btn-secondary" disabled={step === 1}>ANTERIOR</button>
        {step < 6 ? (
          <button onClick={handleNext} className="btn-primary" disabled={isNextDisabled()}>SIGUIENTE</button>
        ) : (
          <button onClick={handleSave} className="btn-primary">INICIAR LEYENDA</button>
        )}
      </div>
    </div>
    </ErrorBoundary>
  );
}
