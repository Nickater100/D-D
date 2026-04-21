import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Shield, Minus, Plus, Wand2, Star, Flame, Heart, Sun, Eye, Sparkles, Skull, BookOpen, Medal } from 'lucide-react';
import { useRoster } from '../store/useRoster';
import type { Character, AbilityScores } from '../types/dnd';
import { ALL_SRD_SPELLS, getStarterSpellsForClass, getMagicCapacity } from '../data/srd/spells';
import { SRD_BACKGROUNDS } from '../data/srd/backgrounds';
import { SRD_RACES } from '../data/srd/races';
import { SRD_CLASSES } from '../data/srd/classes';
import { SRD_SKILLS } from '../data/srd/skills';
import { SRD_ALIGNMENTS } from '../data/srd/alignments';
import { SRD_EQUIPMENT } from '../data/srd/equipment';
import { SRD_FEATS } from '../data/srd/feats';
import { ErrorBoundary } from '../components/CharacterCreatorComponents';
import { calculateModifier, calculateAC } from '../utils/statsUtils';
import { getMulticlassSpellSlots } from '../utils/multiclassUtils';


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
  const [selectedSubrace, setSelectedSubrace] = useState<any>(null);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [selectedSubclass, setSelectedSubclass] = useState<any>(null);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedBackground, setSelectedBackground] = useState<any>(null);
  const [charName, setCharName] = useState('');
  const [pointsRemaining, setPointsRemaining] = useState(27);

  const [selectedAlignment, setSelectedAlignment] = useState<string>('');
  
  // Flexible Race States
  const [flexibleStats, setFlexibleStats] = useState<AbilityKey[]>([]);
  const [flexibleLangs, setFlexibleLangs] = useState<string[]>([]);
  const [flexibleSkills, setFlexibleSkills] = useState<string[]>([]);
  const [toolChoice, setToolChoice] = useState<string>('');

  // Magic State
  const [selectedCantrips, setSelectedCantrips] = useState<string[]>([]);
  const [selectedLvl1, setSelectedLvl1] = useState<string[]>([]);
  const [previewSpell, setPreviewSpell] = useState<any>(null);

  // Chapter 3: Class Choices
  const [selectedCombatStyle, setSelectedCombatStyle] = useState<string>('');
  const [expertiseSkills, setExpertiseSkills] = useState<string[]>([]);

  // Point Buy State
  const [assignedStats, setAssignedStats] = useState<Record<AbilityKey, number>>({
    str: 8, dex: 8, con: 8, int: 8, wis: 8, cha: 8
  });
  const [selectedFeat, setSelectedFeat] = useState<string>('');

  const getRacialBonus = (stat: AbilityKey) => {
    if (!selectedRace) return 0;
    const base = selectedRace.abilityBonuses?.[stat] || 0;
    const sub = selectedSubrace?.abilityBonuses?.[stat] || 0;
    const flex = flexibleStats.includes(stat) ? 1 : 0;
    return base + sub + flex;
  };


  // Point Buy Logic
  const increaseStat = (stat: AbilityKey) => {
    setAssignedStats(prev => {
      const current = prev[stat];
      if (current >= 15) return prev;
      const cost = getPointCost(current + 1) - getPointCost(current);
      if (pointsRemaining >= cost) {
        setPointsRemaining(p => p - cost);
        return { ...prev, [stat]: current + 1 };
      }
      return prev;
    });
  };

  const decreaseStat = (stat: AbilityKey) => {
    if (assignedStats[stat] <= 8) return;
    const cost = getPointCost(assignedStats[stat]) - getPointCost(assignedStats[stat] - 1);
    setAssignedStats(prev => ({ ...prev, [stat]: prev[stat] - 1 }));
    setPointsRemaining(prev => prev + cost);
  };

  const hasMagic = () => getMagicCapacity(selectedClass?.id) !== null;

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
    const caps = getMagicCapacity(selectedClass?.id);
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
      str: assignedStats.str + getRacialBonus('str'),
      dex: assignedStats.dex + getRacialBonus('dex'),
      con: assignedStats.con + getRacialBonus('con'),
      int: assignedStats.int + getRacialBonus('int'),
      wis: assignedStats.wis + getRacialBonus('wis'),
      cha: assignedStats.cha + getRacialBonus('cha')
    };
    
    const racialFeatures = [];
    if (selectedRace?.traits) racialFeatures.push(...selectedRace.traits.map((t: any) => ({ ...t, source: 'raza' })));
    if (selectedSubrace?.traits) racialFeatures.push(...selectedSubrace.traits.map((t: any) => ({ ...t, source: 'raza' })));
    const backgroundFeatures: any[] = selectedBackground ? [{ 
      name: selectedBackground.feature.name, 
      description: selectedBackground.feature.description, 
      source: 'trasfondo' 
    }] : [];

    // --- INVENTORY GENERATION ---
    const inventory: any[] = [];
    const addEqToInv = (eqId: string) => {
       const [baseId, quantityStr] = eqId.split('_x');
       const qty = quantityStr ? parseInt(quantityStr) : 1;
       const eq = SRD_EQUIPMENT[baseId];
       if (!eq) return;

       const convertToItem = (template: any, q: number): import('../types/dnd').Item => ({
          id: crypto.randomUUID(),
          name: template.name,
          description: template.description || '',
          category: template.category === 'weapon' ? 'equipamiento' : template.category === 'armor' ? 'equipamiento' : 'otro',
          subtype: template.weaponType ? 'arma' : template.armorType === 'shield' ? 'escudo' : template.armorType ? 'armadura' : 'otro',
          weaponType: template.weaponType,
          armorType: template.armorType,
          damage: template.damage,             // { dice, type } — structured
          versatileDamage: template.versatileDamage,
          acBase: template.acBase,
          strRequirement: template.strRequirement,
          stealthDisadvantage: template.stealthDisadvantage,
          properties: template.properties,
          cost: template.cost,
          weight: template.weight,
          rarity: 'común',
          quantity: q
       });

       if (eq.category === 'pack' && eq.bundleItems) {
          eq.bundleItems.forEach(bi => {
             const packItem = SRD_EQUIPMENT[bi.id];
             if (packItem) inventory.push(convertToItem(packItem, bi.quantity));
          });
       } else {
          inventory.push(convertToItem(eq, qty));
       }
    };

    if (selectedBackground) selectedBackground.startingEquipmentIds.forEach((id: string) => addEqToInv(id));
    if (selectedClass) {
       selectedClass.startingEquipment.default.forEach((id: string) => addEqToInv(id));
       selectedClass.startingEquipment.choices.forEach((choice: any) => {
          if (choice.options && choice.options.length > 0) {
             choice.options[0].forEach((id: string) => addEqToInv(id)); // Auto-pick first option to prevent naked heroes
          }
       });
    }

    // --- PROFICIENCY CONSOLIDATION ---
    const combinedArmor = [
      ...(selectedClass.proficiencies.armor || []),
      ...(selectedRace?.armorProficiencies || []),
      ...(selectedSubrace?.armorProficiencies || []),
      ...(selectedSubclass?.bonusArmorProficiencies || [])  // Subclass armor bonuses (eg War Domain)
    ];
    const combinedWeapons = [
      ...(selectedClass.proficiencies.weapons || []),
      ...(selectedRace?.weaponProficiencies || []),
      ...(selectedSubrace?.weaponProficiencies || []),
      ...(selectedSubclass?.bonusWeaponProficiencies || [])  // Subclass weapon bonuses
    ];
    const combinedTools = [...(selectedClass.proficiencies.tools || []), ...(selectedBackground?.toolProficiencies || []), ...(toolChoice ? [toolChoice] : [])];
    const combinedSkills = [...selectedSkills, ...flexibleSkills, ...(selectedBackground?.skillProficiencies || [])];

    // --- EXTRA FEATURES from Chapter 3 choices ---
    const classSubclassFeatures = selectedSubclass?.features?.map((f: any) => ({ name: f.name, description: f.description })) || [];
    const combatStyleFeature = selectedCombatStyle && selectedClass.combatStyles
      ? selectedClass.combatStyles.find((s: any) => s.id === selectedCombatStyle)
      : null;
    const extraFeatures = [
      ...classSubclassFeatures,
      ...(combatStyleFeature ? [{ name: `Estilo de Combate: ${combatStyleFeature.name}`, description: combatStyleFeature.description }] : []),
      ...(expertiseSkills.length > 0 ? [{ name: 'Pericia', description: `Competencia doble en: ${expertiseSkills.map(sk => SRD_SKILLS[sk]?.name || sk).join(', ')}.` }] : [])
    ];

    // --- CA INICIAL CALCULADA DESDE EQUIPO (Cap. 5) ---

    // Create a temporary character object to use with calculateAC
    const tempChar: any = {
      classes: [{
        classId: selectedClass.id,
        name: selectedClass.name,
        level: 1,
        subclass: selectedSubclass?.name
      }],
      attributes: finalStats,
      inventory,
      equipment: {}, 
      features: extraFeatures
    };
    
    // We need to simulate the equipment state for calculateAC
    const startingArmor = inventory.find((it: any) => it.armorType && it.armorType !== 'shield');
    const startingShield = inventory.find((it: any) => it.armorType === 'shield');
    if (startingArmor) tempChar.equipment.torso = startingArmor.id;
    if (startingShield) tempChar.equipment.offHand = startingShield.id;

    const calculatedAC = calculateAC(tempChar);

    const newChar: Character = {
      id: crypto.randomUUID(),
      name: charName,
      race: selectedSubrace ? selectedSubrace.name : selectedRace.name,
      classes: tempChar.classes,
      spells: [...selectedCantrips, ...selectedLvl1],
      level: 1,
      hp: Math.max(1, selectedClass.hitDie + calculateModifier(finalStats.con)),
      maxHp: Math.max(1, selectedClass.hitDie + calculateModifier(finalStats.con)),
      ac: calculatedAC,
      attributes: finalStats as AbilityScores,
      background: selectedBackground.name,
      alignment: selectedAlignment as any,
      portraitUrl: selectedRace.image || 'https://images.unsplash.com/photo-1519077336822-4217316719cd?q=80&w=400&fit=crop',
      feats: selectedFeat ? [selectedFeat] : [],
      features: [...racialFeatures, ...backgroundFeatures, ...extraFeatures],
      
      // Real mechanics mapped from DB
      proficiencyBonus: 2,
      savingThrows: selectedClass.savingThrows || [],
      proficiencies: { 
        armor: [...new Set(combinedArmor)], 
        weapons: [...new Set(combinedWeapons)], 
        tools: [...new Set(combinedTools)], 
        skills: [...new Set(combinedSkills)] 
      },
      languages: [...(selectedRace.languages || ['Común']), ...flexibleLangs],
      expertiseSkills,
      inventory,
      equipment: tempChar.equipment,
      
      // Adventuring (Cap. 8)
      exhaustion: 0,
      conditions: [],
      hitDice: [
        { type: selectedClass.hitDie, current: 1, max: 1 }
      ],

      // Magic (Cap. 10)
      spellSlots: getMulticlassSpellSlots(tempChar.classes).shared,
      currentSpellSlots: getMulticlassSpellSlots(tempChar.classes).shared,
      warlockSlots: getMulticlassSpellSlots(tempChar.classes).warlock,
      currentWarlockSlots: getMulticlassSpellSlots(tempChar.classes).warlock?.count || 0,
      preparedSpells: [...selectedLvl1], // Initially prepare selected spells
      concentration: null
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
    if (step === 1) {
      if (!selectedRace || (selectedRace.subraces && selectedRace.subraces.length > 0 && !selectedSubrace)) return true;
      const r = selectedSubrace || selectedRace;
      if (r.flexibleAbilityCount && flexibleStats.length < r.flexibleAbilityCount) return true;
      if (r.flexibleSkillCount && flexibleSkills.length < r.flexibleSkillCount) return true;
      if (r.flexibleLanguageCount && flexibleLangs.length < r.flexibleLanguageCount) return true;
      if (r.toolChoices && !toolChoice) return true;
      return false;
    }
    if (step === 2) {
      if (!selectedClass) return true;
      if (selectedSkills.length < selectedClass.startingProficiencies.skills.choose) return true;
      if (selectedClass.subclasses && selectedClass.subclasses.some((sc: any) => sc.requiredAtLevel === 1) && !selectedSubclass) return true;
      if (selectedClass.combatStyles && !selectedCombatStyle) return true;
      if (selectedClass.expertiseCount && expertiseSkills.length < selectedClass.expertiseCount) return true;
    }
    if (step === 3) {
      if (!selectedBackground || !selectedAlignment) return true;
    }
    if (step === 4) {
      const caps = getMagicCapacity(selectedClass?.id);
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
      case "Daño Sostenido": return <Skull size={20} className="text-green-500" />;
      default: return <Wand2 size={20} className="text-gray-400" />;
    }
  };

  // Removed cycleBonus that was used for 2024 rules

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
            <div className="flex-col gap-4 relative" style={{ overflowY: 'auto', paddingRight: '10px', flex: 1 }}>
              
              <div className="flex-col gap-2">
                <h3 className="font-display text-gold mb-2 uppercase text-xs">Elige tu Especie</h3>
                {Object.values(SRD_RACES).map(r => (
                  <button key={r.id}
                    className={`btn-secondary text-left w-full ${selectedRace?.id === r.id ? 'active' : ''}`}
                    style={{ border: selectedRace?.id === r.id ? '1px solid var(--accent-gold)' : '' }}
                    onClick={() => {
                      setSelectedRace(r);
                      setSelectedSubrace(null);
                    }}>
                    {r.name}
                  </button>
                ))}
              </div>

              {selectedRace?.subraces && selectedRace.subraces.length > 0 && (
                <div className="flex-col gap-2 animate-fade-in mt-4 border-t border-white/10 pt-4">
                  <h3 className="font-display text-gold mb-2 uppercase text-xs">Subraza / Variante</h3>
                  {selectedRace.subraces.map((sr: any) => (
                    <button key={sr.id}
                      className={`btn-secondary text-left w-full ${selectedSubrace?.id === sr.id ? 'active' : ''}`}
                      style={{ border: selectedSubrace?.id === sr.id ? '1px solid var(--accent-gold)' : '' }}
                      onClick={() => {
                        setSelectedSubrace(sr);
                        setFlexibleStats([]);
                        setFlexibleLangs([]);
                        setFlexibleSkills([]);
                        setToolChoice('');
                      }}>
                      {sr.name}
                    </button>
                  ))}
                </div>
              )}

            </div>
            
            <div className="flex-col gap-4 relative" style={{ flex: 2, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', overflowY: 'auto', overflowX: 'hidden' }}>
              {!selectedRace ? (
                <div className="h-full flex-col items-center justify-center text-muted">
                  <User size={64} opacity={0.2} />
                  <p>Selecciona una raza de tu linaje.</p>
                </div>
              ) : (
                <div className="animate-fade-in flex-col gap-4 relative">
                  
                  <h1 className="font-display text-4xl text-gold" style={{ zIndex: 1 }}>
                    {selectedSubrace ? selectedSubrace.name : selectedRace.name}
                  </h1>
                  
                  <p className="text-secondary" style={{ zIndex: 1, lineHeight: '1.6' }}>
                    {selectedSubrace ? selectedSubrace.description : selectedRace.description}
                  </p>
                  
                  <div style={{ zIndex: 1, marginTop: '1rem', display: 'flex', gap: '2rem' }}>
                    <div>
                      <h3 className="font-display text-gold text-xs uppercase mb-2">Velocidad</h3>
                      <div className="px-3 py-1 text-sm bg-black/40 border border-white/10 rounded">{selectedRace.speed} PIES</div>
                    </div>
                    <div>
                      <h3 className="font-display text-gold text-xs uppercase mb-2">Tamaño</h3>
                      <div className="px-3 py-1 text-sm bg-black/40 border border-white/10 rounded">{selectedRace.size}</div>
                    </div>
                  </div>

                  <div style={{ zIndex: 1, marginTop: '1rem' }}>
                    <h3 className="font-display text-gold text-xs uppercase mb-2">Rasgos</h3>
                    <div className="flex-col gap-2">
                       {selectedRace.traits.map((t: any, i: number) => (
                         <div key={`rt_${i}`} className="p-3 bg-gold/5 border border-gold/20 rounded">
                           <span className="font-bold text-gold">{t.name}: </span>
                           <span className="text-sm text-secondary">{t.description}</span>
                         </div>
                       ))}
                       {selectedSubrace && selectedSubrace.traits.map((t: any, i: number) => (
                         <div key={`st_${i}`} className="p-3 bg-purple-500/5 border border-purple-500/20 rounded">
                           <span className="font-bold text-purple-400">{t.name}: </span>
                           <span className="text-sm text-secondary">{t.description}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* FLEXIBLE RACIAL BONUSES */}
                  {(() => {
                    const r = selectedSubrace || selectedRace;
                    if (!r.flexibleAbilityCount && !r.flexibleLanguageCount && !r.flexibleSkillCount && !r.toolChoices) return null;
                    return (
                      <div className="flex-col gap-3 mt-6 border-t border-white/10 pt-4">
                        <h3 className="font-display text-gold text-xs uppercase mb-2">Elecciones Raciales</h3>
                        
                        {r.flexibleAbilityCount && (
                          <div className="p-3 bg-black/40 border border-cyan-500/30 rounded">
                            <h4 className="font-display text-cyan-300 text-sm mb-1">Atributos Extra ({flexibleStats.length} / {r.flexibleAbilityCount})</h4>
                            <p className="text-xs text-secondary mb-3">Suma +1 a {r.flexibleAbilityCount} características diferentes.</p>
                            <div className="flex gap-2 flex-wrap">
                              {ABILITY_MAP.map(stat => {
                                const isBaseBonus = (selectedRace.abilityBonuses?.[stat] || 0) > 0;
                                if (isBaseBonus) return null;
                                const isSelected = flexibleStats.includes(stat);
                                const isMax = flexibleStats.length >= r.flexibleAbilityCount && !isSelected;
                                return (
                                  <button key={`flex_${stat}`} disabled={isMax}
                                    onClick={() => setFlexibleStats(prev => prev.includes(stat) ? prev.filter(s => s !== stat) : [...prev, stat])}
                                    className={`px-3 py-1 rounded text-xs uppercase cursor-pointer transition-all ${isSelected ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-400' : 'bg-white/5 border border-white/10 hover:bg-white/10'} disabled:opacity-30 disabled:cursor-not-allowed`}>
                                    {stat}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {r.flexibleLanguageCount && (
                          <div className="p-3 bg-black/40 border border-blue-500/30 rounded flex items-center justify-between">
                             <div>
                               <h4 className="font-display text-blue-300 text-sm mb-1">Idioma Adicional</h4>
                               <p className="text-xs text-secondary">Aprende {r.flexibleLanguageCount} idioma extra.</p>
                             </div>
                             <select className="bg-black/50 border border-white/10 text-white rounded p-2 text-sm outline-none"
                               value={flexibleLangs[0] || ''}
                               onChange={e => setFlexibleLangs(e.target.value ? [e.target.value] : [])}>
                               <option value="">-- Elige un Idioma --</option>
                               {['Enano', 'Élfico', 'Gigante', 'Gnomo', 'Goblinoide', 'Mediano', 'Orco', 'Abisal', 'Celestial', 'Dracónico', 'Infernal', 'Primordial', 'Silvano', 'Infracomún'].map(l => {
                                 if (selectedRace.languages?.includes(l)) return null;
                                 return <option key={l} value={l}>{l}</option>
                               })}
                             </select>
                          </div>
                        )}

                        {r.toolChoices && (
                          <div className="p-3 bg-black/40 border border-orange-500/30 rounded flex items-center justify-between">
                             <div>
                               <h4 className="font-display text-orange-300 text-sm mb-1">Expertiz en Herramientas</h4>
                               <p className="text-xs text-secondary">Elige 1 herramienta.</p>
                             </div>
                             <select className="bg-black/50 border border-white/10 text-white rounded p-2 text-sm outline-none"
                               value={toolChoice}
                               onChange={e => setToolChoice(e.target.value)}>
                               <option value="">-- Elige Herramienta --</option>
                               {r.toolChoices.map((t: string) => <option key={t} value={t}>{t}</option>)}
                             </select>
                          </div>
                        )}

                        {r.flexibleSkillCount && (
                          <div className="p-3 bg-black/40 border border-purple-500/30 rounded">
                            <h4 className="font-display text-purple-300 text-sm mb-1">Habilidades Libres ({flexibleSkills.length} / {r.flexibleSkillCount})</h4>
                            <p className="text-xs text-secondary mb-3">Elige {r.flexibleSkillCount} destrezas de cualquier tipo.</p>
                            <div className="grid grid-cols-3 gap-2">
                              {Object.entries(SRD_SKILLS).map(([skillId, skillBase]) => {
                                const isSelected = flexibleSkills.includes(skillId);
                                const isMax = flexibleSkills.length >= r.flexibleSkillCount && !isSelected;
                                return (
                                  <button key={`flex_s_${skillId}`} disabled={isMax}
                                    onClick={() => setFlexibleSkills(prev => prev.includes(skillId) ? prev.filter(s => s !== skillId) : [...prev, skillId])}
                                    className={`truncate px-2 py-1 rounded text-[10px] text-left cursor-pointer transition-all ${isSelected ? 'bg-purple-500/20 text-purple-300 border border-purple-400' : 'bg-white/5 border border-white/10 hover:bg-white/10'} disabled:opacity-30 disabled:cursor-not-allowed`}>
                                    {skillBase.name}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* FEAT SELECTION (Human Variant) */}
                        {selectedSubrace?.id === 'human_variant' && (
                          <div className="p-3 bg-black/40 border border-yellow-500/30 rounded animate-fade-in">
                            <h4 className="font-display text-yellow-300 text-sm mb-1">Dote de Inicio</h4>
                            <p className="text-xs text-secondary mb-3">Selecciona tu capacidad especial inicial.</p>
                            <div className="grid grid-cols-2 gap-2">
                               {Object.values(SRD_FEATS).map(feat => (
                                 <button key={feat.id}
                                   onClick={() => setSelectedFeat(feat.id)}
                                   className={`px-3 py-2 rounded text-xs text-left transition-all ${selectedFeat === feat.id ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400' : 'bg-white/5 border border-white/10 hover:bg-white/10'}`}>
                                   <div className="font-bold">{feat.name}</div>
                                   <div className="text-[10px] opacity-60 line-clamp-1">{feat.description}</div>
                                 </button>
                               ))}
                            </div>
                          </div>
                        )}

                      </div>
                    )
                  })()}
                </div>
              )}
            </div>
          </div>
        )}

        {/* === STEP 2: CLASS === */}
        {step === 2 && (
          <div key="step2" className="flex w-full h-full gap-4 overflow-hidden">
            <div className="flex-col gap-2" style={{ overflowY: 'auto', paddingRight: '10px', flex: 1 }}>
              <h3 className="font-display text-gold mb-2 uppercase text-xs">Elige tu Clase</h3>
              {Object.values(SRD_CLASSES).map(c => (
                <button key={c.id}
                  className={`btn-secondary text-left w-full mb-1 ${selectedClass?.id === c.id ? 'active' : ''}`}
                  style={{ border: selectedClass?.id === c.id ? '1px solid var(--accent-gold)' : '' }}
                  onClick={() => {
                    setSelectedClass(c);
                    setSelectedSubclass(null);
                    setSelectedCantrips([]);
                    setSelectedLvl1([]);
                    setSelectedSkills([]);
                    setSelectedCombatStyle('');
                    setExpertiseSkills([]);
                  }}>
                  {c.name}
                </button>
              ))}
            </div>

            <div className="flex-col gap-4 relative" style={{ flex: 1.5, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', overflowY: 'auto' }}>
              {!selectedClass ? (
                <div className="h-full flex-col items-center justify-center text-muted"><Shield size={64} opacity={0.2} /><p>Define tu camino.</p></div>
              ) : (
                <div className="animate-fade-in flex-col gap-4">
                  <h1 className="font-display text-3xl text-gold">{selectedClass.name}</h1>
                  <p className="text-secondary" style={{ lineHeight: '1.6' }}>{selectedClass.description}</p>
                  <div className="flex gap-4 mt-2">
                    <div className="px-3 py-1 bg-white/5 rounded border border-white/10 text-xs">DADO DE GOLPE: d{selectedClass.hitDie}</div>
                  </div>

                  <div style={{ marginTop: '1rem' }}>
                   <h3 className="font-display text-gold text-xs uppercase mb-2">Rasgos Iniciales de Clase</h3>
                     <div className="flex-col gap-2">
                       {selectedClass.features.map((f: any, i: number) => (
                         <div key={`cf_${i}`} className="p-3 bg-blue-500/5 border border-blue-500/20 rounded">
                           <span className="font-bold text-blue-400">{f.name}: </span>
                           <span className="text-sm text-secondary">{f.description}</span>
                         </div>
                       ))}
                    </div>
                  </div>

                  {/* SKILL SELECTION */}
                  <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                    <div className="flex justify-between items-center mb-3">
                       <h3 className="font-display text-gold text-sm uppercase">Competencias en Habilidades</h3>
                       <span className="font-display text-lg text-blue-400">
                          {selectedSkills.length} / {selectedClass.startingProficiencies.skills.choose}
                       </span>
                    </div>
                     <div className="grid grid-cols-2 gap-2">
                       {selectedClass.startingProficiencies.skills.from.map((skillId: string) => {
                         const skill = SRD_SKILLS[skillId];
                         if (!skill) return null;
                         const isSelected = selectedSkills.includes(skillId);
                         const isMaxed = selectedSkills.length >= selectedClass.startingProficiencies.skills.choose && !isSelected;
                         
                         return (
                           <button key={skillId}
                             onClick={() => {
                               setSelectedSkills(prev => {
                                 if (prev.includes(skillId)) return prev.filter(s => s !== skillId);
                                 if (prev.length < selectedClass.startingProficiencies.skills.choose) return [...prev, skillId];
                                 return prev;
                               });
                             }}
                             disabled={isMaxed}
                             className="text-left p-2 rounded border transition-all relative overflow-hidden group"
                             style={{
                               background: isSelected ? 'rgba(96, 165, 250, 0.1)' : 'rgba(0,0,0,0.2)',
                               borderColor: isSelected ? '#60a5fa' : 'rgba(255,255,255,0.05)',
                               opacity: isMaxed ? 0.3 : 1
                             }}>
                              <div className="font-bold text-sm text-white relative z-10">{skill.name}</div>
                              <div className="text-[10px] text-muted uppercase relative z-10">{skill.ability}</div>
                              
                              {/* Hover tooltip for skill description */}
                              <div className="absolute top-0 left-0 right-0 p-2 bg-black/95 text-xs text-white translate-y-full group-hover:translate-y-0 transition-transform z-20 h-full overflow-hidden flex items-center">
                                {skill.description}
                              </div>
                           </button>
                         )
                       })}
                    </div>
                  </div>

                  {/* SUBCLASS SELECTION — Required at Level 1 */}
                  {selectedClass.subclasses && selectedClass.subclasses.some((sc: any) => sc.requiredAtLevel === 1) && (
                    <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-display text-gold text-sm uppercase">Elige tu Senda</h3>
                        {!selectedSubclass && <span className="text-xs text-red-400 animate-pulse">⚠ Requerido</span>}
                      </div>
                      <div className="flex-col gap-2">
                        {selectedClass.subclasses.map((sc: any) => (
                          <button key={sc.id}
                            onClick={() => setSelectedSubclass(sc)}
                            className="text-left p-3 rounded border transition-all w-full"
                            style={{ background: selectedSubclass?.id === sc.id ? 'rgba(168,85,247,0.15)' : 'rgba(0,0,0,0.2)', borderColor: selectedSubclass?.id === sc.id ? '#a855f7' : 'rgba(255,255,255,0.05)' }}>
                            <div className="font-bold text-sm text-purple-300">{sc.name}</div>
                            <div className="text-[11px] text-secondary mt-1 leading-relaxed">{sc.description}</div>
                            {selectedSubclass?.id === sc.id && sc.bonusArmorProficiencies && (
                              <div className="mt-2 flex gap-1 flex-wrap">
                                {sc.bonusArmorProficiencies.map((a: string) => (
                                  <span key={a} className="px-2 py-0.5 text-[10px] bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 rounded">{a}</span>
                                ))}
                              </div>
                            )}
                            {selectedSubclass?.id === sc.id && sc.features && (
                              <div className="mt-2 flex-col gap-1">
                                {sc.features.map((f: any, i: number) => (
                                  <div key={i} className="text-[10px] text-secondary"><span className="text-purple-400 font-bold">{f.name}:</span> {f.description}</div>
                                ))}
                              </div>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* COMBAT STYLE — Fighter & Paladin */}
                  {selectedClass.combatStyles && (
                    <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-display text-gold text-sm uppercase">Estilo de Combate</h3>
                        {!selectedCombatStyle && <span className="text-xs text-red-400 animate-pulse">⚠ Requerido</span>}
                      </div>
                      <div className="flex-col gap-2">
                        {selectedClass.combatStyles.map((style: any) => (
                          <button key={style.id}
                            onClick={() => setSelectedCombatStyle(style.id)}
                            className="text-left p-3 rounded border transition-all w-full"
                            style={{ background: selectedCombatStyle === style.id ? 'rgba(251,146,60,0.1)' : 'rgba(0,0,0,0.2)', borderColor: selectedCombatStyle === style.id ? '#fb923c' : 'rgba(255,255,255,0.05)' }}>
                            <div className="font-bold text-sm text-orange-300">{style.name}</div>
                            <div className="text-[11px] text-secondary mt-1">{style.description}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* EXPERTISE — Rogue */}
                  {selectedClass.expertiseCount && selectedSkills.length >= selectedClass.expertiseCount && (
                    <div style={{ marginTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="font-display text-gold text-sm uppercase">Pericia (Doble Competencia)</h3>
                        <span className="font-display text-lg text-green-400">{expertiseSkills.length}/{selectedClass.expertiseCount}</span>
                      </div>
                      <p className="text-xs text-secondary mb-3">Elige {selectedClass.expertiseCount} de tus habilidades seleccionadas. Tu bonificador de competencia se duplica.</p>
                      <div className="grid grid-cols-2 gap-2">
                        {selectedSkills.map((skillId: string) => {
                          const skill = SRD_SKILLS[skillId];
                          if (!skill) return null;
                          const isSelected = expertiseSkills.includes(skillId);
                          const isMax = expertiseSkills.length >= selectedClass.expertiseCount && !isSelected;
                          return (
                            <button key={`exp_${skillId}`} disabled={isMax}
                              onClick={() => setExpertiseSkills(prev => prev.includes(skillId) ? prev.filter(s => s !== skillId) : [...prev, skillId])}
                              className="text-left p-2 rounded border transition-all"
                              style={{ background: isSelected ? 'rgba(34,197,94,0.1)' : 'rgba(0,0,0,0.2)', borderColor: isSelected ? '#22c55e' : 'rgba(255,255,255,0.05)', opacity: isMax ? 0.3 : 1 }}>
                              <div className="font-bold text-sm text-green-300">{skill.name} ★★</div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

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
                  <p className="text-gold font-display text-lg">{getMagicCapacity(selectedClass.id)?.magicType}</p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-col items-end">
                    <span className="font-display text-lg text-purple-400">{selectedCantrips.length}/{getMagicCapacity(selectedClass.id)?.cantrips}</span>
                    <span className="text-muted text-[10px] uppercase">Trucos</span>
                  </div>
                  <div className="flex-col items-end">
                    <span className="font-display text-lg text-blue-400">{selectedLvl1.length}/{getMagicCapacity(selectedClass.id)?.spells}</span>
                    <span className="text-muted text-[10px] uppercase">Lvl 1</span>
                  </div>
                </div>
              </div>

              <h3 className="font-display text-md text-gold mt-2">Trucos</h3>
              <div className="grid grid-cols-2 gap-2">
                {(() => {
                  const srdSpells = getStarterSpellsForClass(selectedClass.id);
                  const spells = srdSpells.cantrips;
                  return spells.map(spell => {
                    const isActive = selectedCantrips.includes(spell.id);
                    const cap = getMagicCapacity(selectedClass.id)?.cantrips || 0;
                    const isMaxed = selectedCantrips.length >= cap && !isActive;
                    const spellType = spell.type;
                    return (
                      <button key={spell.id}
                        onClick={() => { toggleSpell(spell.id, 'cantrip'); setPreviewSpell(spell); }}
                        disabled={isMaxed}
                        onMouseEnter={() => setPreviewSpell(spell)}
                        className="glass-panel flex items-center justify-start gap-2 p-2 hover:border-purple-500/50"
                        style={{ border: isActive ? '1px solid #c084fc' : '1px solid transparent', opacity: isMaxed ? 0.4 : 1, transition: 'all 0.2s', background: isActive ? 'rgba(192, 132, 252, 0.1)' : '' }}>
                        {getSpellIcon(spellType)}
                        <span className="font-display text-purple-300 text-sm truncate">{spell.name}</span>
                      </button>
                    )
                  });
                })()}
              </div>

              <h3 className="font-display text-md text-gold mt-4">Hechizos (Nivel 1)</h3>
              <div className="grid grid-cols-2 gap-2 mb-6">
                {(() => {
                  const srdSpells = getStarterSpellsForClass(selectedClass.id);
                  const spells = srdSpells.level1;
                  return spells.map(spell => {
                    const isActive = selectedLvl1.includes(spell.id);
                    const cap = getMagicCapacity(selectedClass.id)?.spells || 0;
                    const isMaxed = selectedLvl1.length >= cap && !isActive;
                    const spellType = spell.type;
                    return (
                      <button key={spell.id}
                        onClick={() => { toggleSpell(spell.id, 'lvl1'); setPreviewSpell(spell); }}
                        disabled={isMaxed}
                        onMouseEnter={() => setPreviewSpell(spell)}
                        className="glass-panel flex items-center justify-start gap-2 p-2 hover:border-blue-500/50"
                        style={{ border: isActive ? '1px solid #60a5fa' : '1px solid transparent', opacity: isMaxed ? 0.4 : 1, transition: 'all 0.2s', background: isActive ? 'rgba(96, 165, 250, 0.1)' : '' }}>
                        {getSpellIcon(spellType)}
                        <span className="font-display text-blue-300 text-sm truncate">{spell.name}</span>
                      </button>
                    )
                  });
                })()}
              </div>
            </div>

            <div className="w-full flex-col gap-4 relative" style={{ flex: 1.5, background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', overflowY: 'auto' }}>
              {!previewSpell ? (
                <div className="h-full flex-col items-center justify-center text-muted"><Wand2 size={64} opacity={0.2} /><p className="mt-4 text-center">Pasa el cursor o selecciona un conjuro para revelar sus misterios.</p></div>
              ) : (
                <div className="animate-fade-in flex-col gap-4 relative">
                  <div style={{ position: 'absolute', top: -10, right: -10, opacity: 0.1, transform: 'scale(2)' }}>
                    {getSpellIcon('school' in previewSpell ? previewSpell.school : previewSpell.type)}
                  </div>
                  <h1 className="font-display text-3xl text-gold" style={{ zIndex: 1 }}>{previewSpell.name}</h1>
                  {'school' in previewSpell && (
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 rounded text-xs">{previewSpell.school}</span>
                      <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">{previewSpell.castingTime}</span>
                      <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">{previewSpell.range}</span>
                      <span className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs">{previewSpell.duration}</span>
                      {previewSpell.concentration && <span className="px-2 py-1 bg-orange-500/10 border border-orange-500/20 text-orange-300 rounded text-xs">Concentración</span>}
                      {previewSpell.ritual && <span className="px-2 py-1 bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 rounded text-xs">Ritual</span>}
                    </div>
                  )}
                  {'school' in previewSpell && (
                    <div className="text-xs text-secondary flex gap-1 flex-wrap">
                      <span className="font-bold text-gold">Comp:</span> {previewSpell.components}
                    </div>
                  )}
                  <p className="text-secondary text-sm mt-2" style={{ zIndex: 1, lineHeight: '1.6' }}>{'desc' in previewSpell ? previewSpell.desc : previewSpell.description}</p>
                  {'higherLevel' in previewSpell && previewSpell.higherLevel && (
                    <div className="p-2 mt-2 bg-blue-500/5 border border-blue-500/20 rounded">
                      <span className="font-bold text-blue-400 text-xs">A niveles superiores: </span>
                      <p className="text-secondary text-xs leading-relaxed line-clamp-4">{previewSpell.higherLevel}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* === STEP 3: BACKGROUND & ALIGNMENT === */}
        {step === 3 && (
          <div key="step3" className="flex w-full h-full gap-4 overflow-hidden">
            <div className="flex-col gap-2 relative" style={{ overflowY: 'auto', paddingRight: '10px', flex: 1 }}>
              
              <h3 className="font-display text-gold mb-2 uppercase text-xs">Elige Alineamiento</h3>
              <select 
                className="w-full bg-black/40 border border-white/20 p-2 rounded text-white"
                value={selectedAlignment}
                onChange={e => setSelectedAlignment(e.target.value)}
              >
                <option value="">Selecciona...</option>
                {Object.values(SRD_ALIGNMENTS).map(al => (
                  <option key={al.id} value={al.id}>{al.name} ({al.abbreviation})</option>
                ))}
              </select>

              {selectedAlignment && (
                <div className="p-2 mb-4 bg-white/5 border border-white/10 rounded mt-2">
                   <p className="text-secondary text-sm italic">"{Object.values(SRD_ALIGNMENTS).find(a => a.id === selectedAlignment)?.description}"</p>
                </div>
              )}

              <h3 className="font-display text-gold mb-2 mt-4 uppercase text-xs">Elige Trasfondo</h3>
              {Object.values(SRD_BACKGROUNDS).map(bg => (
                <button key={bg.id}
                  className={`btn-secondary text-left w-full mb-1 ${selectedBackground?.id === bg.id ? 'active' : ''}`}
                  style={{ border: selectedBackground?.id === bg.id ? '1px solid var(--accent-gold)' : '' }}
                  onClick={() => setSelectedBackground(bg)}>
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
                      <Star size={18} /> {selectedBackground.feature.name.toUpperCase()}
                    </div>
                    <div className="flex-col">
                      <p className="text-sm text-secondary mt-1">{selectedBackground.feature.description}</p>
                    </div>
                  </div>

                  <div className="mt-2">
                    <h3 className="font-display text-gold text-xs uppercase mb-2">Conocimientos de Trasfondo</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedBackground.skillProficiencies.map((s: string) => (
                        <span key={s} className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs rounded">
                          {SRD_SKILLS[s]?.name || s}
                        </span>
                      ))}
                    </div>
                  </div>
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
                const bonus = getRacialBonus(stat);
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
                      {bonus > 0 && <div className="text-sm text-green-400 font-bold">+{bonus} Raza = {finalVal}</div>}
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
                       <Star size={14} /> RASGO DE TRASFONDO
                    </div>
                    <div className="text-white font-display text-md truncate">{selectedBackground?.feature?.name}</div>
                 </div>
              </div>

              <div className="glass-panel p-6 flex-col gap-4">
                 <div className="text-[10px] text-gold/60 font-display tracking-widest uppercase mb-2 border-b border-white/10 pb-2">Atributos Finales</div>
                 <div className="grid grid-cols-3 gap-y-6 gap-x-4">
                    {ABILITY_MAP.map(stat => {
                      const base = assignedStats[stat];
                      const bonus = getRacialBonus(stat);
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
                      const spell = ALL_SRD_SPELLS.find(x => x.id === sId);
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
