import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Save, User, Shield, Info, Minus, Plus, Wand2, Star, Flame, Heart, Sun, Eye, Sparkles, Skull, BookOpen, Medal } from 'lucide-react';
import { useRoster } from '../store/useRoster';
import type { Character, AbilityScores } from '../types/dnd';
import { SRD_RACES, SRD_CLASSES, SRD_BACKGROUNDS_2024 } from '../data/srd_es';
import { STARTER_SPELLS, GET_CLASS_MAGIC_CAPACITY } from '../data/spells_es';
import { ORIGIN_FEATS } from '../data/feats_es';

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
    const current = assignedStats[stat];
    if (current >= 15) return;
    const costOfNext = getPointCost(current + 1) - getPointCost(current);
    if (pointsRemaining >= costOfNext) {
      setAssignedStats({ ...assignedStats, [stat]: current + 1 });
    }
  };

  const throwStatError = (msg: string) => {
     // Simple alert or toast logic
     alert(msg);
  };

  const decreaseStat = (stat: AbilityKey) => {
    const current = assignedStats[stat];
    if (current <= 8) return;
    setAssignedStats({ ...assignedStats, [stat]: current - 1 });
  };

  const hasMagic = () => GET_CLASS_MAGIC_CAPACITY(selectedClass?.id) !== null;

  const handleNext = () => {
    if (step === 3 && !hasMagic()) setStep(5);
    else setStep(s => Math.min(6, s + 1));
  };

  const handlePrev = () => {
    if (step === 5 && !hasMagic()) setStep(3);
    else setStep(s => Math.max(1, s - 1));
  };

  const toggleSpell = (id: string, type: 'cantrip' | 'lvl1') => {
    const caps = GET_CLASS_MAGIC_CAPACITY(selectedClass?.id);
    if (!caps) return;

    if (type === 'cantrip') {
      if (selectedCantrips.includes(id)) setSelectedCantrips(selectedCantrips.filter(s => s !== id));
      else if (selectedCantrips.length < caps.cantrips) setSelectedCantrips([...selectedCantrips, id]);
    } else {
      if (selectedLvl1.includes(id)) setSelectedLvl1(selectedLvl1.filter(s => s !== id));
      else if (selectedLvl1.length < caps.spells) setSelectedLvl1([...selectedLvl1, id]);
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
      feats: [selectedBackground.featId]
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

  const toggleBonus = (stat: AbilityKey) => {
    const current = backgroundBonuses[stat] || 0;
    const totalSelected = Object.values(backgroundBonuses).reduce((a, b) => a + (b || 0), 0);

    if (current > 0) {
      // Remove or decrease
      const newBonuses = { ...backgroundBonuses };
      if (current === 2) delete newBonuses[stat];
      else if (current === 1) delete newBonuses[stat];
      setBackgroundBonuses(newBonuses);
    } else {
      // Add
      if (totalSelected === 0) {
        // First choice: can be +1 or +2
        setBackgroundBonuses({ ...backgroundBonuses, [stat]: 2 });
      } else if (totalSelected === 2) {
        // Already have a +2, next must be +1 (in a different stat)
        setBackgroundBonuses({ ...backgroundBonuses, [stat]: 1 });
      } else if (totalSelected === 1) {
        // Already have a +1, can add another +1
        setBackgroundBonuses({ ...backgroundBonuses, [stat]: 1 });
      } else if (totalSelected === 3) {
        throwStatError("Ya has asignado tus 3 puntos de bonificación.");
      }
    }
  };

  const handleStatBonusClick = (stat: AbilityKey) => {
    if (!selectedBackground) return;
    if (!selectedBackground.abilityOptions.includes(stat)) return;

    const current = backgroundBonuses[stat] || 0;
    const total = Object.values(backgroundBonuses).reduce((a, b) => a + b, 0);

    // D&D 2024: +2/+1 or +1/+1/+1
    if (current === 2) {
      // Toggle off +2
      const nb = { ...backgroundBonuses };
      delete nb[stat];
      setBackgroundBonuses(nb);
    } else if (current === 1) {
      // Toggle off +1
      const nb = { ...backgroundBonuses };
      delete nb[stat];
      setBackgroundBonuses(nb);
    } else {
      // Adding new
      if (total === 0) {
         // Ask or default to +2? Let's make it simple: first click is +1, second on same is +2? 
         // Actually, let's do a simple cycle or separate buttons.
         // Let's do: 1st click = +2, 2nd click = +1, 3rd = off.
         setBackgroundBonuses({ ...backgroundBonuses, [stat]: 2 });
      } else if (total === 2) {
         // We have a +2 elsewhere, so this must be +1
         setBackgroundBonuses({ ...backgroundBonuses, [stat]: 1 });
      } else if (total === 1) {
         // We have a +1 elsewhere, this must be +1
         setBackgroundBonuses({ ...backgroundBonuses, [stat]: 1 });
      } else if (total === 2 && Object.values(backgroundBonuses).includes(1)) {
         // We have two +1s, this must be the third +1
         setBackgroundBonuses({ ...backgroundBonuses, [stat]: 1 });
      }
    }
  };

  // Improved Cycle: Off -> +1 -> +2 (if possible) -> Off
  const cycleBonus = (stat: AbilityKey) => {
    if (!selectedBackground?.abilityOptions.includes(stat)) return;
    
    const current = backgroundBonuses[stat] || 0;
    const nb = { ...backgroundBonuses };
    const totalWithoutCurrent = Object.values(nb).reduce((a, b) => a + b, 0) - current;

    if (current === 0) {
      // Try +1
      if (totalWithoutCurrent < 3) nb[stat] = 1;
    } else if (current === 1) {
      // Try +2
      if (totalWithoutCurrent === 1) nb[stat] = 2; // Can go to +2 if we only have one +1 elsewhere
      else delete nb[stat]; // Back to off
    } else if (current === 2) {
      // Back to off
      delete nb[stat];
    }
    setBackgroundBonuses(nb);
  };

  // --- RENDERING ---
  return (
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
          <div className="flex w-full h-full gap-4">
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
          <div className="flex w-full h-full gap-4 overflow-hidden">
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
          <>
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
          </>
        )}

        {/* === STEP 3: BACKGROUND & FEAT === */}
        {step === 3 && (
          <div className="flex w-full h-full gap-4 overflow-hidden">
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
                <div className="animate-fade-in flex-col gap-4 relative">
                  <h1 className="font-display text-3xl text-gold">{selectedBackground.name}</h1>
                  <p className="text-secondary text-sm" style={{ lineHeight: '1.6' }}>{selectedBackground.description}</p>
                  
                  <div className="flex-col gap-2 p-3 bg-black/40 rounded-xl border border-white/10 mt-2">
                    <div className="flex items-center gap-2 text-gold font-display text-sm mb-2">
                      <Star size={18} /> DOTE DE ORIGEN
                    </div>
                    {(() => {
                      const feat = ORIGIN_FEATS.find(f => f.id === selectedBackground.featId);
                      return (
                        <div className="animate-fade-in">
                          <p className="font-bold text-purple-400">{feat?.name}</p>
                          <p className="text-xs text-secondary mt-1">{feat?.description}</p>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="flex-col gap-2 p-3 bg-black/40 rounded-xl border border-white/10">
                    <div className="flex items-center gap-2 text-gold font-display text-sm mb-2">
                      <Medal size={18} /> BONOS DE ATRIBUTO (Elige +2/+1 o +1/+1/+1)
                    </div>
                    <div className="flex gap-2">
                      {selectedBackground.abilityOptions.map((statId: string) => {
                        const stat = statId as AbilityKey;
                        const val = backgroundBonuses[stat] || 0;
                        return (
                          <button key={stat}
                            onClick={() => cycleBonus(stat)}
                            className={`flex-1 p-2 rounded border text-sm font-display transition-all ${val > 0 ? 'bg-gold/20 border-gold text-gold' : 'bg-white/5 border-white/10 text-muted'}`}>
                            {stat.toUpperCase()} {val > 0 ? `+${val}` : ''}
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-[10px] text-muted italic mt-2 text-center">Haz clic para asignar y ciclar los bonos (Total: 3 puntos)</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* === STEP 5: ABILITIES === */}
        {step === 5 && (
          <div className="flex-col w-full h-full gap-4 p-2 overflow-y-auto">
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
          <div className="flex-col w-full h-full items-center justify-center gap-6 relative p-4 overflow-y-auto">
            <div className="flex-col items-center gap-2">
              <div style={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-gold)' }}>
                {selectedRace?.image ? (
                  <img src={selectedRace.image} alt="Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div className="w-full h-full bg-black flex items-center justify-center"><User size={40} className="text-gold" /></div>
                )}
              </div>
              <h2 className="text-gold font-display text-2xl mt-2 tracking-widest uppercase">Resumen del Héroe</h2>
            </div>

            <div className="flex-col w-full" style={{ maxWidth: '400px' }}>
              <label className="text-gold font-display text-sm mb-2 text-center uppercase opacity-60">Firma tu Leyenda</label>
              <input
                type="text"
                value={charName}
                onChange={e => setCharName(e.target.value)}
                placeholder="Nombre del Personaje..."
                className="w-full font-display text-2xl text-center bg-transparent border-b-2 border-gold/50 focus:border-gold outline-none pb-2 transition-all"
              />
            </div>

            <div className="flex gap-4 w-full flex-wrap justify-center mt-4" style={{ maxWidth: '600px' }}>
              <div className="glass-panel text-center p-3 flex-col flex-1 min-w-[140px]">
                <span className="text-muted text-[10px] uppercase font-bold tracking-tighter">ESPECIE</span>
                <span className="text-gold font-display">{selectedRace?.name}</span>
              </div>
              <div className="glass-panel text-center p-3 flex-col flex-1 min-w-[140px]">
                <span className="text-muted text-[10px] uppercase font-bold tracking-tighter">CLASE</span>
                <span className="text-gold font-display">{selectedClass?.name}</span>
              </div>
              <div className="glass-panel text-center p-3 flex-col flex-1 min-w-[140px]">
                <span className="text-muted text-[10px] uppercase font-bold tracking-tighter">TRASFONDO</span>
                <span className="text-gold font-display">{selectedBackground?.name}</span>
              </div>
              
              <div className="glass-panel text-center p-3 flex-col w-full border border-purple-500/30">
                <span className="text-muted text-[10px] uppercase font-bold tracking-tighter mb-1">DOTE DE ORIGEN</span>
                <span className="text-purple-300 font-display">{ORIGIN_FEATS.find(f => f.id === selectedBackground?.featId)?.name}</span>
              </div>

              {hasMagic() && (
                <div className="glass-panel text-center p-3 flex-col w-full border border-blue-500/30">
                  <span className="text-muted text-[10px] uppercase font-bold tracking-tighter mb-1">HECHIZOS MEMORIZADOS</span>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {[...selectedCantrips, ...selectedLvl1].map(sId => {
                      const spell = [...STARTER_SPELLS.cantrips, ...STARTER_SPELLS.level_1].find(x => x.id === sId);
                      return <span key={sId} className="px-2 py-1 bg-blue-900/30 rounded text-[10px] text-blue-200 border border-blue-500/30 uppercase">{spell?.name}</span>
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-between mt-4">
        <button className="btn-secondary" disabled={step === 1} onClick={handlePrev} style={{ opacity: step === 1 ? 0.3 : 1 }}>
          ANTERIOR
        </button>

        {step < 6 ? (
          <button className="btn-primary flex items-center gap-2" onClick={handleNext} disabled={isNextDisabled()}>
            SIGUIENTE <ChevronRight size={18} />
          </button>
        ) : (
          <button className="btn-primary flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400" onClick={handleSave}>
            <Save size={18} /> INICIAR LEYENDA
          </button>
        )}
      </div>

    </div>
  );
}
