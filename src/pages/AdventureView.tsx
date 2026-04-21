import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Sword, Wand2, Zap, Scroll } from 'lucide-react';
import { useRoster } from '../store/useRoster';
import type { Item } from '../types/dnd';
import { useGameSession } from '../store/useGameSession';
import { buildSystemPrompt } from '../data/dmPrompt';
import { ADVENTURE_MODULES } from '../data/adventures';
import { getAIProvider } from '../services/ai';
import type { ChatMessage } from '../services/ai';
import { extractRollRequest, rollDice } from '../utils/diceUtils';
import type { RollResult, RollRequest } from '../utils/diceUtils';
import { ShoppingBag, Sword as SwordIcon, Package, Trash, Shield, ShieldQuestion, Gem, CircleDot, Footprints, Hand, Shirt, HardHat, Waypoints, Eye, Search, Flame, Moon, Activity, AlertTriangle } from 'lucide-react';
import { SRD_FEATS } from '../data/srd/feats';
import { SRD_SKILLS } from '../data/srd/skills';
import { SRD_CONDITIONS } from '../data/srd/conditions';
import { calculateSkillBonus, calculateSavingThrowBonus, calculatePassiveScore } from '../utils/statsUtils';
import { extractItemsFromText, cleanItemTags, extractXpFromText, extractFeaturesFromText } from '../utils/itemUtils';
import { rollAttack, rollDamage } from '../utils/combatUtils';
import { ALL_SRD_SPELLS } from '../data/srd/spells';

// ─── AI Service (Now handled via .env) ───────────────────────────────────────

// ─── Dice Roll Tag Parser ─────────────────────────────────────────────────────
function parseDiceTag(text: string) {
  return text.replace(/\[TIRADA:\s*([^\]]+)\]/g, (_, roll) => `🎲 [${roll.trim()}]`);
}

const XP_LEVELS = [0, 0, 300, 900, 2700, 6500, 14000, 23000, 34000, 48000, 64000];

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdventureView() {
  const navigate = useNavigate();
  const { characters, activeCharacterId } = useRoster();
  const { 
    sessions, currentSessionId, isLoading, addMessage, setLoading,
    startCombat, endCombat, nextTurn, damageEntity, deleteSession,
    updateSessionHp
  } = useGameSession();


  const currentSession = currentSessionId ? sessions[currentSessionId] : null;
  const messages = currentSession?.messages || [];
  const activeModuleId = currentSession?.moduleId;

  const [inputText, setInputText] = useState('');
  const [streamingText, setStreamingText] = useState('');
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pendingRoll, setPendingRoll] = useState<RollRequest | null>(null);
  const [isRolling, setIsRolling] = useState(false);
  const [rollResult, setRollResult] = useState<RollResult | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionStarted = useRef(false);

  const [activeTab, setActiveTab] = useState<'aventura' | 'ficha' | 'inventario' | 'equipo'>('aventura');
  const [inventoryTab, setInventoryTab] = useState<'equipamiento' | 'consumible' | 'otro'>('equipamiento');
  const [newItemsAlert, setNewItemsAlert] = useState<any[]>([]);
  const [slotSelection, setSlotSelection] = useState<string | null>(null);
  const [showRestModal, setShowRestModal] = useState(false);
  const [selectedTargetId, setSelectedTargetId] = useState<string | null>(null);
  const lastProcessedTurn = useRef<number | null>(null);

  const { 
    addItemToCharacter, removeItemFromCharacter, equipItem, 
    equipItemInSlot, unequipItem, addXp, addFeatureToCharacter, 
    levelUp, longRest, shortRest, removeCondition: removeConditionByStore,
    updateHp, addDeathSaveSuccess, addDeathSaveFailure,
    useSpellSlot, prepareSpell, unprepareSpell, setConcentration
  } = useRoster();

  const character = characters.find(c => c.id === activeCharacterId);
  const activeModule = ADVENTURE_MODULES.find(m => m.id === activeModuleId);
  const encounter = currentSession?.encounter;
  const currentTurnEntity = encounter?.entities[encounter.turnIndex];
  const isPlayerTurn = currentTurnEntity?.isPlayer === true;

  const charSpells = character
    ? ALL_SRD_SPELLS.filter(s => character.spells?.includes(s.id))
    : [];

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // ─── Send to AI ────────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (userText: string | null, isOpening = false) => {
    if (!character) return;

    setError(null);
    setLoading(true);
    setStreamingText('');

    if (userText) {
      addMessage({ role: 'user', text: userText });
    }

    try {
      const ai = getAIProvider();

      const history: ChatMessage[] = messages
        .filter(_m => !isOpening)
        .map(m => ({
          role: m.role as 'user' | 'model',
          text: m.text,
        }));

      const systemPrompt = buildSystemPrompt(character, activeModule, encounter);
      const promptText = isOpening
        ? 'Comienza la aventura con una apertura épica.'
        : userText ?? '';

      // Prepare context for the provider (history + current message)
      const currentMessages: ChatMessage[] = [...history, { role: 'user', text: promptText }];

      const stream = await ai.sendMessageStream(currentMessages, systemPrompt);

      let fullResponse = '';
      for await (const chunk of stream) {
        fullResponse += chunk;
        setStreamingText(fullResponse);
      }

      addMessage({ role: 'model', text: cleanItemTags(fullResponse) });
      setStreamingText('');

      // Check for items
      const foundItems = extractItemsFromText(fullResponse);
      if (foundItems.length > 0) {
        foundItems.forEach(item => {
          addItemToCharacter(character.id, item);
          setNewItemsAlert(prev => [...prev, { ...item, type: 'OBJETO' }]);
        });
      }

      // Check for XP
      const gainedXp = extractXpFromText(fullResponse);
      if (gainedXp > 0) {
        addXp(character.id, gainedXp);
        setNewItemsAlert(prev => [...prev, { name: `${gainedXp} XP de experiencia`, type: 'XP' }]);
      }

      // Check for Features
      const foundFeatures = extractFeaturesFromText(fullResponse);
      if (foundFeatures.length > 0) {
        foundFeatures.forEach(feat => {
          addFeatureToCharacter(character.id, feat);
          setNewItemsAlert(prev => [...prev, { ...feat, type: 'RASGO' }]);
        });
      }

      if (foundItems.length > 0 || gainedXp > 0 || foundFeatures.length > 0) {
        setTimeout(() => setNewItemsAlert([]), 5000);
      }

      // Check for pending roll
      const rollReq = extractRollRequest(fullResponse);
      if (rollReq) {
        setPendingRoll(rollReq);
      }

      // Check for [DAÑO: X] tags (Cap. 9)
      const damageMatch = fullResponse.match(/\[DAÑO:\s*(\d+)\]/i);
      if (damageMatch && character) {
        const dmg = parseInt(damageMatch[1]);
        
        // Concentration Check (Cap. 10)
        if (character.concentration && dmg > 0) {
          const conMod = Math.floor(((character.attributes.con || 10) - 10) / 2);
          const saveRoll = Math.floor(Math.random() * 20) + 1;
          const total = saveRoll + conMod + (character.proficiencyBonus); // Using proficiency for saves
          const dc = Math.max(10, Math.floor(dmg / 2));
          
          if (total < dc) {
            setConcentration(character.id, null);
            addMessage({ role: 'system', text: `💔 ¡Has perdido la concentración! (${total} vs CD ${dc})` });
          } else {
            addMessage({ role: 'system', text: `🛡️ Mantienes la concentración (${total} vs CD ${dc})` });
          }
        }

        updateSessionHp(-dmg);
        addMessage({ role: 'system', text: `💥 ¡Has recibido ${dmg} puntos de daño!` });
      }

      // Check for [COMBATE: Name | HP | AC, ...] tags (Cap. 9)
      const combatMatch = fullResponse.match(/\[COMBATE:\s*([^\]]+)\]/i);
      if (combatMatch && character) {
        const combatantsStr = combatMatch[1];
        const enemies = combatantsStr.split(',').map(enemyStr => {
          const [name, hpStr, acStr] = enemyStr.split('|').map(s => s.trim());
          const hp = parseInt(hpStr) || 10;
          return {
            name: name,
            hp: hp,
            maxHp: hp, // Set maxHp equal to initial hp
            ac: parseInt(acStr) || 10,
            type: 'enemy' as const
          };
        });

        const playerEntity = {
          id: character.id,
          name: character.name,
          hp: currentSession?.playerHp ?? character.hp,
          maxHp: currentSession?.playerMaxHp ?? character.maxHp,
          ac: character.ac,
          initiative: 0,
          isPlayer: true
        };

        startCombat(playerEntity, enemies);
        addMessage({ role: 'system', text: '⚔️ Se ha iniciado un combate. ¡Orden de iniciativa establecido!' });
      }

    } catch (err: any) {
      console.error('AI error:', err);
      const isConfigError = err.message?.includes('Configuración incompleta');
      const msg = isConfigError 
        ? `⚠️ Error de Configuración: Verifica tu archivo .env.local. Asegúrate de tener VITE_AI_API_KEY y VITE_AI_PROVIDER configurados.`
        : `Error del Narrador: ${err?.message ?? 'Algo salió mal. Intenta de nuevo.'}`;
      
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [character, messages, activeModule, addMessage, setLoading, encounter, updateHp]);

  // ─── Player Combat Actions (Cap. 9) ─────────────────────────────────────────
  const handlePlayerAttack = (targetId: string, item: Item) => {
    if (!character || !encounter) return;
    
    const attack = rollAttack(character, item);
    const target = encounter.entities.find(e => e.id === targetId);
    
    if (!target) return;

    let hitResult = `🎲 [ATAQUE: ${attack.total}] vs CA ${target.ac} -> `;
    const isHit = attack.isCrit || (!attack.isFumble && attack.total >= target.ac);

    if (isHit) {
      const damage = rollDamage(character, item, attack.isCrit);
      hitResult += `💥 ¡IMPACTO! (Daño: ${damage.total} ${damage.type})`;
      damageEntity(targetId, damage.total);
      
      if (target.hp - damage.total <= 0) {
        hitResult += ` 💀 ${target.name} ha caído.`;
      }
    } else {
      hitResult += `❌ FALLO.`;
    }

    addMessage({ role: 'system', text: `Atacas a ${target.name} con ${item.name}. ${hitResult}` });
  };

  const handlePlayerSpellCast = (targetId: string, spellId: string) => {
    if (!character || !encounter) return;
    const spell = ALL_SRD_SPELLS.find(s => s.id === spellId);
    if (!spell) return;

    // Check slots
    if (spell.level > 0) {
      const isWarlock = character.classes.some(c => c.classId === 'warlock');
      const hasShared = (character.currentSpellSlots?.[spell.level] || 0) > 0;
      const hasWarlock = isWarlock && (character.currentWarlockSlots || 0) > 0 && spell.level <= (character.warlockSlots?.level || 0);
      
      if (!hasShared && !hasWarlock) {
        addMessage({ role: 'system', text: `❌ No te quedan espacios de conjuro de nivel ${spell.level}.` });
        return;
      }
      useSpellSlot(character.id, spell.level);
    }

    if (spell.concentration) {
      setConcentration(character.id, spell.id);
    }

    const target = encounter.entities.find(e => e.id === targetId);
    addMessage({ role: 'system', text: `✨ Lanzas ${spell.name}${target ? ` sobre ${target.name}` : ''}. ${spell.concentration ? '(Requiere Concentración)' : ''}` });
    
    // Notify AI
    sendMessage(`[SISTEMA: El jugador ha lanzado el conjuro "${spell.name}" (Nivel ${spell.level})${target ? ` contra ${target.name}` : ''}. Aplica los efectos correspondientes.]`);
  };

  const handleStartMockCombat = () => {
    if (!character) return;
    const playerEntity = {
      id: character.id,
      name: character.name,
      hp: currentSession?.playerHp ?? character.hp,
      maxHp: currentSession?.playerMaxHp ?? character.maxHp,
      ac: character.ac,
      initiative: 0,
      isPlayer: true
    };
    const enemies = [
      { name: 'Trasgo A', hp: 7, maxHp: 7, ac: 13, type: 'enemy' as const },
      { name: 'Trasgo B', hp: 7, maxHp: 7, ac: 13, type: 'enemy' as const }
    ];
    startCombat(playerEntity, enemies);
    addMessage({ role: 'system', text: '⚔️ Se ha iniciado el combate. ¡Orden de iniciativa establecido!' });
  };

  const handleRoll = async () => {
    if (!pendingRoll || isRolling) return;
    
    setIsRolling(true);
    setRollResult(null);

    // Initial wait for animation
    await new Promise(r => setTimeout(r, 1500));
    
    const result = rollDice(pendingRoll);
    setRollResult(result);
    
    // Wait for display
    await new Promise(r => setTimeout(r, 1000));
    
    const resultText = `Tirada realizada para [${result.formula}${result.dc ? ` | CD: ${result.dc}` : ''}]. Resultado: ${result.total} (${result.dice} + ${result.modifier})${result.isSuccess !== undefined ? (result.isSuccess ? ' - ¡ÉXITO!' : ' - FALLO') : ''}`;
    addMessage({ role: 'system', text: resultText });
    
    setPendingRoll(null);
    setIsRolling(false);
    setRollResult(null);

    // Send the result to the AI automatically
    const systemMsg = result.isCritical 
      ? `[SISTEMA: ¡CRÍTICO NATURAL! El jugador ha sacado un 20. Total: ${result.total}. Éxito automático.]`
      : result.isFumble
      ? `[SISTEMA: ¡PIFIA NATURAL! El jugador ha sacado un 1. Total: ${result.total}. Fracaso automático.]`
      : `[SISTEMA: Tirada realizada. Resultado: ${result.total} (${result.dice} + ${result.modifier})${result.dc ? `. Objetivo CD: ${result.dc}. ${result.isSuccess ? 'ÉXITO' : 'FRACASO'}` : ''}]`;

    sendMessage(systemMsg);
  };

  // ─── Death Saving Throws (Cap. 9) ──────────────────────────────────────────
  const handleDeathSave = async () => {
    if (!character || character.hp > 0 || isRolling) return;
    
    setIsRolling(true);
    // Use the dice rolling system for visual feedback
    await new Promise(r => setTimeout(r, 1000));
    const result = { 
      total: Math.floor(Math.random() * 20) + 1,
      dice: 0, modifier: 0, isCritical: false, isFumble: false
    };
    result.isCritical = result.total === 20;
    result.isFumble = result.total === 1;
    
    setRollResult({ ...result, formula: '1d20', dice: result.total, modifier: 0 });
    await new Promise(r => setTimeout(r, 1000));

    if (result.isCritical) {
      updateHp(character.id, 1);
      updateSessionHp(1);
      addMessage({ role: 'system', text: `✨ ¡20 NATURAL! Te recuperas con 1 HP y vuelves a la consciencia.` });
    } else if (result.isFumble) {
      addDeathSaveFailure(character.id, 2);
      addMessage({ role: 'system', text: `💀 ¡PIFIA! 2 fallos en salvaciones de muerte.` });
    } else if (result.total >= 10) {
      addDeathSaveSuccess(character.id);
      addMessage({ role: 'system', text: `✅ Éxito en salvación de muerte (${result.total}).` });
    } else {
      addDeathSaveFailure(character.id, 1);
      addMessage({ role: 'system', text: `❌ Fracaso en salvación de muerte (${result.total}).` });
    }

    setIsRolling(false);
    setRollResult(null);
    nextTurn();
  };

  // Victory Detection
  const allEnemiesDead = encounter?.isActive && encounter.entities.filter(e => !e.isPlayer).every(e => e.hp <= 0);

  // Permadeath Check
  useEffect(() => {
    if (character?.deathSaves && character.deathSaves.failure >= 3 && currentSessionId) {
      // Trigger deletion after a small delay for dramatic effect
      const timer = setTimeout(() => {
        deleteSession(currentSessionId);
        navigate('/campaigns');
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [character?.deathSaves?.failure, currentSessionId, deleteSession, navigate]);

  // ─── AI Combat Turn Trigger (Cap. 9) ───────────────────────────────────────
  useEffect(() => {
    if (!encounter?.isActive || isPlayerTurn || isLoading || !currentTurnEntity) return;
    
    // Prevent double-triggering for the same turn
    if (lastProcessedTurn.current === encounter.turnIndex) return;

    // It's an enemy's turn! Prompt the DM.
    const triggerAiTurn = async () => {
      lastProcessedTurn.current = encounter.turnIndex;
      // Small delay for natural flow
      await new Promise(r => setTimeout(r, 1200));
      sendMessage(`[TURNO: ${currentTurnEntity.name}] DM: Realiza su acción de combate siguiendo las reglas.`);
    };

    triggerAiTurn();
  }, [encounter?.isActive, encounter?.turnIndex, isPlayerTurn, isLoading, currentTurnEntity, sendMessage]);

  // ─── Start session on mount ───────────────────────────────────────────────
  useEffect(() => {
    // Only proceed if we have a character and haven't started this session yet in this component life
    if (!character || sessionStarted.current || !currentSessionId) return;
    
    // Safety check: ensure currentSession is actually loaded from the store
    if (!currentSession) return;

    sessionStarted.current = true;
    
    if (messages.length === 0) {
      if (activeModule?.startingMessage) {
        addMessage({ role: 'model', text: activeModule.startingMessage });
      } else {
        sendMessage(null, true);
      }
    }
  }, [character, currentSessionId, currentSession, activeModule, messages.length, sendMessage, addMessage]);

// ─── Handle player send ───────────────────────────────────────────────────
  const handleSend = () => {
    const text = inputText.trim();
    if (!text || isLoading) return;
    setInputText('');
    sendMessage(text, false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  // const handleRestart = () => {
  //   if (!character) return;
  //   sessionStarted.current = false;
  //   clearCurrentSession();
  //   setTimeout(() => {
  //     navigate('/campaigns');
  //   }, 100);
  // };

  // ─── No active character guard ────────────────────────────────────────────
  if (!character) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '2rem' }}>
        <Scroll size={48} style={{ color: 'var(--text-muted)' }} />
        <h2 style={{ color: 'var(--accent-gold)', fontFamily: 'var(--font-display)' }}>Sin Héroe Activo</h2>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
          Necesitas seleccionar un personaje activo en el Roster antes de comenzar la aventura.
        </p>
        <button className="btn-primary" onClick={() => navigate('/roster')}>
          IR AL ROSTER
        </button>
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh', width: '100vw',
      background: 'var(--bg-black)',
      display: 'flex', flexDirection: 'column',
      color: 'white', overflow: 'hidden'
    }}>
      {/* Permadeath Overlay (Global) */}
      {character && character.deathSaves && character.deathSaves.failure >= 3 && (
        <div style={{ 
          position: 'fixed', inset: 0, zIndex: 10000, 
          background: 'rgba(0,0,0,0.98)', display: 'flex', flexDirection: 'column', 
          alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px'
        }}>
          <div style={{ fontSize: '100px', marginBottom: '20px', animation: 'pulse 2s infinite' }}>💀</div>
          <h1 style={{ fontSize: '56px', color: '#ef4444', fontFamily: 'var(--font-display)', marginBottom: '10px', letterSpacing: '4px' }}>TU HISTORIA HA TERMINADO</h1>
          <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)', maxWidth: '600px', lineHeight: '1.6' }}>
            Has sucumbido ante tus heridas en las profundidades de la aventura. <br />
            Siguiendo las leyes del <strong>Destino Brutal</strong>, esta campaña ha sido borrada permanentemente.
          </p>
          <div style={{ marginTop: '50px', fontSize: '14px', color: '#ef4444', opacity: 0.8, letterSpacing: '3px', fontWeight: 'bold' }}>
            BORRANDO REGISTROS DE CAMPAÑA...
          </div>
        </div>
      )}
      {/* ─── MAIN HEADER / NAVIGATION ────────────────────────────────────────── */}
      <header style={{
        height: '60px', borderBottom: '1px solid rgba(255,255,255,0.1)',
        display: 'flex', alignItems: 'center', padding: '0 20px', gap: '20px',
        background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 100
      }}>
        <button onClick={() => navigate('/campaigns')} style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
          <ArrowLeft size={20} />
        </button>
        
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {[
            { id: 'aventura', label: 'AVENTURA', icon: <Wand2 size={16} /> },
            { id: 'ficha', label: 'FICHA', icon: <Scroll size={16} /> },
            { id: 'inventario', label: 'INVENTARIO', icon: <ShoppingBag size={16} /> },
            { id: 'equipo', label: 'EQUIPO', icon: <Sword size={16} /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id as any); setSlotSelection(null); }}
              style={{
                background: activeTab === tab.id ? 'rgba(212,175,55,0.1)' : 'none',
                border: 'none', 
                borderBottom: activeTab === tab.id ? '2px solid var(--accent-gold)' : '2px solid transparent',
                color: activeTab === tab.id ? 'var(--accent-gold)' : 'var(--text-muted)',
                padding: '8px 16px', fontSize: '12px', fontWeight: 'bold', letterSpacing: '0.1em',
                cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '8px'
              }}
            >
              {tab.icon} {tab.label}
              {tab.id === 'inventario' && character?.inventory && character.inventory.length > 0 && (
                <span style={{ fontSize: '10px', opacity: 0.7 }}>({character.inventory.length})</span>
              )}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{character?.name}</div>
            <div style={{ fontSize: '10px', color: 'var(--accent-gold)' }}>
              {currentSession?.playerHp} / {currentSession?.playerMaxHp} PG
            </div>
          </div>
          <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
            <SwordIcon size={18} />
          </div>
        </div>
      </header>

      {/* ─── MAIN TAB CONTENT AREA ────────────────────────────────────────────── */}
      <main style={{ flex: 1, overflow: 'auto', position: 'relative' }}>
        {activeTab === 'aventura' && (
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column', maxWidth: '900px', margin: '0 auto', width: '100%' }}>
            
            {/* COMBAT INITIATIVE BANNER (Cap. 9) */}
            {encounter?.isActive && (
              <div style={{ 
                background: 'rgba(212,175,55,0.05)', borderBottom: '1px solid rgba(212,175,55,0.2)',
                padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '15px', overflowX: 'auto',
                backdropFilter: 'blur(10px)', zIndex: 10
              }}>
                <div style={{ fontSize: '10px', color: 'var(--accent-gold)', fontWeight: 'bold', whiteSpace: 'nowrap' }}>RONDA {encounter.round} | TURNO:</div>
                {encounter.entities.map((e, i) => (
                  <div key={e.id} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', padding: '4px 12px',
                    borderRadius: '20px', background: encounter.turnIndex === i ? 'var(--accent-gold)' : 'rgba(255,255,255,0.05)',
                    border: `1px solid ${encounter.turnIndex === i ? 'white' : 'rgba(255,255,255,0.1)'}`,
                    transition: 'all 0.3s ease'
                  }}>
                    <span style={{ fontSize: '10px', color: encounter.turnIndex === i ? 'black' : 'white', fontWeight: 'bold' }}>{e.initiative}</span>
                    <span style={{ fontSize: '12px', color: encounter.turnIndex === i ? 'black' : 'white' }}>{e.name}</span>
                  </div>
                ))}
              </div>
            )}

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 120px', position: 'relative' }}>
              
              {/* ENEMIES LIST OVERLAY (Cap. 9) */}
              {encounter?.isActive && (
                <div style={{ position: 'sticky', top: '10px', right: '10px', zIndex: 5, pointerEvents: 'none' }}>
                   <div style={{ float: 'right', width: '220px', pointerEvents: 'auto' }} className="glass-panel animate-fade-in">
                      <div style={{ padding: '12px', borderBottom: '1px solid rgba(255,255,255,0.05)', fontSize: '9px', color: '#fca5a5', fontWeight: 'bold' }}>ENEMIGOS ACTIVOS</div>
                      <div style={{ maxHeight: '300px', overflowY: 'auto', padding: '8px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {encounter.entities.filter(e => !e.isPlayer).map(e => (
                          <div 
                            key={e.id}
                            onClick={() => setSelectedTargetId(e.id)}
                            style={{
                              padding: '8px', borderRadius: '6px', background: 'rgba(0,0,0,0.3)',
                              border: `1px solid ${selectedTargetId === e.id ? '#ef4444' : 'rgba(255,255,255,0.05)'}`,
                              cursor: 'pointer', transition: 'all 0.2s'
                            }}
                          >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '11px' }}>
                              <span style={{ fontWeight: 'bold', color: e.hp <= 0 ? 'rgba(255,255,255,0.3)' : 'white' }}>{e.name}</span>
                              <span style={{ opacity: 0.4 }}>CA {e.ac}</span>
                            </div>
                            <div style={{ height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                              <div style={{ 
                                height: '100%', width: `${(e.hp / e.maxHp) * 100}%`,
                                background: 'linear-gradient(90deg, #ef4444, #b91c1c)',
                                transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                              }} />
                            </div>
                          </div>
                        ))}
                      </div>
                   </div>
                </div>
              )}
              {messages.length === 0 && !streamingText && (
                <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎭</div>
                  <p style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontStyle: 'italic' }}>
                    El Narrador está preparando tu destino...
                  </p>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {messages.map((msg, i) => {
                  if (msg.role === 'model') return <DmBubble key={i} text={msg.text} />;
                  if (msg.role === 'user') return <PlayerBubble key={i} text={msg.text} />;
                  return <SystemBubble key={i} text={msg.text} />;
                })}
                
                {newItemsAlert.map((item, idx) => (
                  <ItemPickupAlert key={idx} name={item.name} category={item.category} />
                ))}

                {streamingText && <DmBubble text={streamingText} isStreaming />}
                {isLoading && !streamingText && (
                  <div style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '4px 0' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🎭</div>
                    <div style={{ display: 'flex', gap: '5px', padding: '14px 18px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '4px 16px 16px 16px' }}>
                      {[0,1,2].map(i => (
                        <div key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a78bfa', animation: `blink 1.2s ease-in-out ${i * 0.2}s infinite` }} />
                      ))}
                    </div>
                  </div>
                )}
                {error && (
                  <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: '12px', padding: '12px 16px', color: '#fca5a5', fontSize: '13px' }}>
                    {error}
                  </div>
                )}
              </div>
              <div ref={chatEndRef} />
            </div>

            {/* Input area & Combat Actions */}
            <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.5)' }}>
              
              {/* COMBAT ACTIONS (Cap. 9) */}
              {encounter?.isActive && (
                <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto 15px auto' }}>
                  <div style={{ fontSize: '10px', color: isPlayerTurn ? 'var(--accent-gold)' : '#f87171', fontWeight: 'bold', marginBottom: '8px', textTransform: 'uppercase' }}>
                    {isPlayerTurn ? '🔧 TUS ACCIONES' : `⏳ TURNO DE ${currentTurnEntity?.name?.toUpperCase()}`}
                  </div>
                  
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {isPlayerTurn && character && character.hp > 0 && character.inventory?.filter(i => (character.equipment as any)?.mainHand === i.id || (character.equipment as any)?.ranged === i.id).map(weapon => (
                      <button
                        key={weapon.id}
                        disabled={!selectedTargetId || isLoading}
                        onClick={() => handlePlayerAttack(selectedTargetId!, weapon)}
                        className="glass-button"
                        style={{ padding: '8px 12px', fontSize: '11px', borderColor: 'rgba(239, 68, 68, 0.4)', background: 'rgba(239, 68, 68, 0.05)', display: 'flex', alignItems: 'center', gap: '6px' }}
                      >
                        ⚔️ Atacar con {weapon.name} {selectedTargetId ? '' : '(Selecciona Objetivo)'}
                      </button>
                    ))}

                    {/* SPELLS ACTIONS (Cap. 10) */}
                    {isPlayerTurn && character && character.hp > 0 && ALL_SRD_SPELLS.filter(s => {
                      const isKnown = character.spells?.includes(s.id);
                      if (!isKnown) return false;
                      
                      // Filter by preparation for preparing classes
                      const needsPrep = character.classes.some(c => ['cleric', 'druid', 'wizard', 'paladin'].includes(c.classId));
                      if (needsPrep && s.level > 0 && !character.preparedSpells?.includes(s.id)) return false;
                      
                      return true;
                    }).map(spell => {
                      const canCast = spell.level === 0 || (character.currentSpellSlots?.[spell.level] || 0) > 0 || (character.currentWarlockSlots || 0) > 0;
                      return (
                        <button
                          key={spell.id}
                          disabled={isLoading || !canCast}
                          onClick={() => handlePlayerSpellCast(selectedTargetId || 'narrative', spell.id)}
                          className="glass-button"
                          style={{ 
                            padding: '8px 12px', fontSize: '11px', 
                            borderColor: spell.level === 0 ? 'rgba(56, 189, 248, 0.4)' : 'rgba(168, 85, 247, 0.4)', 
                            background: spell.level === 0 ? 'rgba(56, 189, 248, 0.05)' : 'rgba(168, 85, 247, 0.05)',
                            display: 'flex', alignItems: 'center', gap: '6px',
                            opacity: canCast ? 1 : 0.5
                          }}
                        >
                          ✨ {spell.name} {spell.level > 0 ? `(Nvl ${spell.level})` : '(Truco)'}
                        </button>
                      );
                    })}

                    {/* Death Save Button */}
                    {isPlayerTurn && character && character.hp === 0 && (character.deathSaves?.failure || 0) < 3 && (character.deathSaves?.success || 0) < 3 && (
                      <button
                        onClick={handleDeathSave}
                        disabled={isRolling}
                        className="glass-button"
                        style={{ padding: '8px 15px', fontSize: '12px', borderColor: '#ef4444', color: '#f87171', fontWeight: 'bold' }}
                      >
                        🎲 Realizar Salvación de Muerte
                      </button>
                    )}

                    {/* Victory Button */}
                    {allEnemiesDead && (
                      <button
                        onClick={() => endCombat()}
                        className="glass-button"
                        style={{ padding: '8px 15px', fontSize: '12px', borderColor: 'var(--accent-gold)', color: 'var(--accent-gold)', fontWeight: 'bold' }}
                      >
                        🏆 Finalizar Combate (Victoria)
                      </button>
                    )}

                    <button 
                      onClick={() => nextTurn()} 
                      disabled={isLoading || (isPlayerTurn && character?.hp === 0 && (character?.deathSaves?.success || 0) < 3)}
                      className="glass-button" 
                      style={{ padding: '8px 12px', fontSize: '11px', background: 'rgba(255,255,255,0.05)', borderColor: isPlayerTurn ? 'var(--accent-gold)' : 'rgba(255,255,255,0.2)' }}
                    >
                      ⏩ {isPlayerTurn ? 'Finalizar Turno' : 'Siguiente Combate'}
                    </button>
                  </div>

                  {/* Spell Slots Tracker (Cap. 10) */}
                  {character && character.spellSlots && Object.keys(character.spellSlots).length > 0 && (
                    <div style={{ display: 'flex', gap: '15px', padding: '10px', background: 'rgba(168, 85, 247, 0.05)', borderRadius: '8px', marginTop: '10px', border: '1px solid rgba(168, 85, 247, 0.1)' }}>
                      <div style={{ fontSize: '10px', color: '#c084fc', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>
                         <Zap size={10} /> ESPACIOS:
                      </div>
                      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                        {Object.entries(character.spellSlots).map(([lvl, max]) => (
                          <div key={lvl} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                            <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.5)' }}>Niv {lvl}:</span>
                            <div style={{ display: 'flex', gap: '3px' }}>
                              {Array.from({ length: Number(max) }).map((_, i) => (
                                <div 
                                  key={i} 
                                  style={{ 
                                    width: '8px', height: '8px', borderRadius: '2px', 
                                    background: (character.currentSpellSlots?.[Number(lvl)] || 0) > i ? '#c084fc' : 'rgba(255,255,255,0.1)',
                                    boxShadow: (character.currentSpellSlots?.[Number(lvl)] || 0) > i ? '0 0 5px #c084fc' : 'none'
                                  }} 
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                        {character.warlockSlots && (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '10px' }}>
                            <span style={{ fontSize: '9px', color: '#fb923c' }}>Pacto (Niv {character.warlockSlots.level}):</span>
                            <div style={{ display: 'flex', gap: '3px' }}>
                              {Array.from({ length: character.warlockSlots.count }).map((_, i) => (
                                <div 
                                  key={i} 
                                  style={{ 
                                    width: '8px', height: '8px', borderRadius: '50%', 
                                    background: (character.currentWarlockSlots || 0) > i ? '#fb923c' : 'rgba(255,255,255,0.1)',
                                    boxShadow: (character.currentWarlockSlots || 0) > i ? '0 0 5px #fb923c' : 'none'
                                  }} 
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Concentration Indicator (Cap. 10) */}
                  {character?.concentration && (
                    <div className="animate-pulse" style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'rgba(56, 189, 248, 0.1)', borderRadius: '6px', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                      <Eye size={12} color="#38bdf8" />
                      <span style={{ fontSize: '10px', color: '#7dd3fc', fontWeight: 'bold' }}>
                        CONCENTRACIÓN: {ALL_SRD_SPELLS.find(s => s.id === character.concentration?.spellId)?.name || 'Hechizo'}
                      </span>
                      <button 
                        onClick={() => setConcentration(character.id, null)}
                        style={{ marginLeft: 'auto', background: 'none', border: 'none', color: '#38bdf8', fontSize: '12px', cursor: 'pointer', padding: '0 4px' }}
                      >
                        × Cancelar
                      </button>
                    </div>
                  )}

                  {/* Death Saves Counters */}
                  {character && character.hp === 0 && (
                    <div style={{ display: 'flex', gap: '20px', marginTop: '10px', padding: '10px', background: 'rgba(0,0,0,0.3)', borderRadius: '8px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '10px', color: '#4ade80' }}>ÉXITOS:</span>
                        {[1, 2, 3].map(i => (
                          <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #4ade80', background: (character.deathSaves?.success || 0) >= i ? '#4ade80' : 'transparent' }} />
                        ))}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '10px', color: '#f87171' }}>FALLOS:</span>
                        {[1, 2, 3].map(i => (
                          <div key={i} style={{ width: '10px', height: '10px', borderRadius: '50%', border: '1px solid #f87171', background: (character.deathSaves?.failure || 0) >= i ? '#f87171' : 'transparent' }} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={e => setInputText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isLoading || !!pendingRoll}
                  placeholder={pendingRoll ? "Completa la tirada para continuar..." : "¿Qué hace tu personaje...?"}
                  rows={1}
                  style={{
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '12px', padding: '12px 60px 12px 14px', color: 'white', resize: 'none', fontSize: '14px'
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !inputText.trim() || !!pendingRoll}
                  style={{
                    position: 'absolute', right: '10px', bottom: '10px',
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'var(--accent-gold)', color: 'black',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                  }}
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ─── FICHA VIEW ───────────────────────────────────────────────────── */}
        {activeTab === 'ficha' && (
          <div style={{ padding: '40px', maxWidth: '1100px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* HERO HEADER & XP BAR */}
            <div className="glass-panel" style={{ padding: '30px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: '20px' }}>
                <div>
                  <div style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '2px', fontWeight: 'bold' }}>HÉROE DE NIVEL {character?.level}</div>
                  <h1 style={{ fontSize: '36px', margin: '0', fontFamily: 'var(--font-display)', color: 'white' }}>{character?.name}</h1>
                  <div style={{ fontSize: '14px', color: 'var(--text-muted)' }}>
                    {character?.race} — {character?.classes.map(c => `${c.name} ${c.level}${c.subclass ? ` (${c.subclass})` : ''}`).join(' / ')}
                  </div>
                  
                  {/* Sentidos Pasivos (Cap. 7) */}
                  <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                      <Eye size={12} /> <span style={{ color: 'var(--accent-gold)' }}>Percepción Pasiva: {calculatePassiveScore(character!, 'perception')}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>
                      <Search size={12} /> <span>Investigación Pasiva: {calculatePassiveScore(character!, 'investigation')}</span>
                    </div>
                  </div>

                  {/* Conditions & Exhaustion Display (Cap. 8) */}
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                    {character?.exhaustion && character.exhaustion > 0 ? (
                      <div style={{ 
                        display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', 
                        background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', 
                        borderRadius: '4px', fontSize: '10px', color: '#fca5a5' 
                      }}>
                        <AlertTriangle size={10} /> AGOTAMIENTO {character.exhaustion}
                      </div>
                    ) : null}
                    {character?.conditions?.map(cId => {
                      const cData = SRD_CONDITIONS[cId];
                      return (
                        <div key={cId} style={{ 
                          display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', 
                          background: 'rgba(168,85,247,0.1)', border: '1px solid #a855f7', 
                          borderRadius: '4px', fontSize: '10px', color: '#d8b4fe' 
                        }} title={cData?.description}>
                          <Activity size={10} /> {cData?.name || cId}
                          <button onClick={() => removeConditionByStore(character.id, cId)} style={{ background: 'none', border: 'none', color: 'white', opacity: 0.5, cursor: 'pointer', marginLeft: '4px' }}>×</button>
                        </div>
                      );
                    })}
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  {/* Rest Button (Cap. 8) */}
                  <button 
                    onClick={() => setShowRestModal(true)}
                    className="glass-button"
                    style={{ 
                      display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '10px 20px', borderRadius: '8px', fontSize: '14px', 
                      background: 'rgba(212,175,55,0.1)', border: '1px solid var(--accent-gold)', 
                      color: 'var(--accent-gold)', cursor: 'pointer' 
                    }}
                  >
                    <Flame size={16} /> Descansar
                  </button>

                  <button 
                    onClick={handleStartMockCombat}
                    className="glass-button"
                    style={{ 
                      padding: '10px 20px', borderRadius: '8px', fontSize: '14px', 
                      background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', 
                      color: '#f87171', cursor: 'pointer' 
                    }}
                  >
                    ⚔️ Iniciar Combate
                  </button>

                  {/* Level Up Button */}
                  {character && (character.xp || 0) >= (XP_LEVELS[character.level + 1] || Infinity) && (
                    <button 
                      onClick={() => levelUp(character.id)}
                      className="animate-pulse"
                      style={{ 
                        background: 'linear-gradient(45deg, #d4af37, #f1c40f)', color: 'black', 
                        border: 'none', padding: '12px 24px', borderRadius: '8px', 
                        fontWeight: 'bold', cursor: 'pointer', boxShadow: '0 0 20px rgba(212,175,55,0.4)',
                        fontSize: '14px'
                      }}
                    >
                      ✨ ¡SUBIR DE NIVEL!
                    </button>
                  )}
                </div>
              </div>

              {/* XP Progress */}
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', marginBottom: '8px', color: 'var(--text-muted)' }}>
                  <span>XP: {character?.xp || 0}</span>
                  <span>SIGUIENTE NIVEL: {XP_LEVELS[character!.level + 1] || '---'}</span>
                </div>
                <div style={{ height: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ 
                    height: '100%', 
                    width: `${Math.min(100, ((character?.xp || 0) - XP_LEVELS[character!.level]) / (XP_LEVELS[character!.level + 1] - XP_LEVELS[character!.level]) * 100)}%`,
                    background: 'linear-gradient(90deg, var(--accent-gold), #f1c40f)',
                    transition: 'width 0.5s ease-out'
                  }} />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 0.8fr) minmax(300px, 1fr) minmax(300px, 1.2fr)', gap: '30px' }}>
              {/* Stats Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div className="glass-panel" style={{ padding: '20px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '1px', marginBottom: '15px', fontWeight: 'bold' }}>ATRIBUTOS</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {Object.entries(character?.attributes || {}).map(([k, v]) => {
                      const m = Math.floor(((v as number) - 10) / 2);
                      const colors: Record<string, string> = { str: '#ef4444', dex: '#22d3ee', con: '#f97316', int: '#a78bfa', wis: '#4ade80', cha: '#f472b6' };
                      return (
                        <div key={k} style={{ textAlign: 'center', padding: '10px', border: `1px solid ${colors[k]}22`, background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
                          <div style={{ fontSize: '8px', color: colors[k], opacity: 0.7 }}>{(k as string).toUpperCase()}</div>
                          <div style={{ fontSize: '24px', fontFamily: 'var(--font-display)' }}>{v as number}</div>
                          <div style={{ color: colors[k], fontSize: '12px' }}>{m >= 0 ? `+${m}` : m}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Tiradas de Salvación (Cap. 7) */}
                <div className="glass-panel" style={{ padding: '20px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '1px', marginBottom: '15px', fontWeight: 'bold' }}>SALVACIONES</p>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {(['str', 'dex', 'con', 'int', 'wis', 'cha'] as const).map(abi => {
                      const bonus = calculateSavingThrowBonus(character!, abi);
                      const isProf = character!.savingThrows.includes(abi);
                      return (
                        <div key={`save-${abi}`} style={{ 
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                          padding: '8px 12px', background: isProf ? 'rgba(212,175,55,0.05)' : 'rgba(0,0,0,0.2)',
                          border: isProf ? '1px solid rgba(212,175,55,0.2)' : '1px solid rgba(255,255,255,0.05)',
                          borderRadius: '6px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: isProf ? 'var(--accent-gold)' : 'transparent', border: '1px solid rgba(255,255,255,0.2)' }}></div>
                            <span style={{ fontSize: '11px', color: isProf ? 'white' : 'rgba(255,255,255,0.5)', textTransform: 'uppercase' }}>{abi}</span>
                          </div>
                          <span style={{ fontSize: '14px', fontWeight: 'bold', color: isProf ? 'var(--accent-gold)' : 'white' }}>{bonus >= 0 ? `+${bonus}` : bonus}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* HP and AC info */}
                <div style={{ display: 'flex', gap: '10px' }}>
                  <div className="glass-panel" style={{ flex: 1, padding: '15px', textAlign: 'center', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <div style={{ fontSize: '9px', color: '#fca5a5' }}>PUNTOS DE VIDA</div>
                    <div style={{ fontSize: '24px', color: 'white' }}>{currentSession?.playerHp} / {currentSession?.playerMaxHp}</div>
                  </div>
                  <div className="glass-panel" style={{ flex: 1, padding: '15px', textAlign: 'center', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <div style={{ fontSize: '9px', color: '#93c5fd' }}>CLASE DE ARMADURA</div>
                    <div style={{ fontSize: '24px', color: 'white' }}>{character?.ac}</div>
                  </div>
                </div>

                {/* Dados de Golpe (Cap. 8) */}
                <div className="glass-panel" style={{ padding: '20px' }}>
                   <p style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '1px', marginBottom: '15px', fontWeight: 'bold' }}>DADOS DE GOLPE</p>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                      {character?.hitDice?.map((hd, i) => (
                        <div key={i} style={{ 
                          flex: 1, minWidth: '100px', padding: '10px', 
                          background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.05)', 
                          borderRadius: '8px', textAlign: 'center'
                        }}>
                          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.4)', marginBottom: '5px' }}>D{hd.type}</div>
                          <div style={{ fontSize: '20px', color: 'white' }}>{hd.current} / {hd.max}</div>
                        </div>
                      ))}
                      {!character?.hitDice?.length && <div style={{ fontSize: '12px', opacity: 0.3 }}>No hay dados disponibles.</div>}
                   </div>
                </div>
              </div>

              {/* Passives and Features Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                
                {/* ENEMIES LIST (Cap. 9) */}
                {encounter?.isActive && (
                  <div className="glass-panel" style={{ padding: '20px', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                    <p style={{ fontSize: '10px', color: '#fca5a5', letterSpacing: '1px', marginBottom: '15px', fontWeight: 'bold' }}>ENEMIGOS EN EL ÁREA</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      {encounter.entities.filter(e => !e.isPlayer).map(e => (
                        <div 
                          key={e.id}
                          onClick={() => setSelectedTargetId(e.id)}
                          style={{
                            padding: '12px', borderRadius: '8px', background: 'rgba(0,0,0,0.3)',
                            border: `1px solid ${selectedTargetId === e.id ? '#ef4444' : 'rgba(255,255,255,0.05)'}`,
                            cursor: 'pointer', transition: 'all 0.2s'
                          }}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', color: e.hp <= 0 ? 'rgba(255,255,255,0.3)' : 'white' }}>{e.name}</span>
                            <span style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)' }}>CA {e.ac}</span>
                          </div>
                          {/* Animated HP Bar */}
                          <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', overflow: 'hidden' }}>
                            <div style={{ 
                              height: '100%', width: `${(e.hp / e.maxHp) * 100}%`,
                              background: 'linear-gradient(90deg, #ef4444, #b91c1c)',
                              transition: 'width 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                            }} />
                          </div>
                          <div style={{ textAlign: 'right', fontSize: '10px', color: '#fca5a5', marginTop: '4px' }}>{e.hp} / {e.maxHp} HP</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div>
                  <p style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '1px', marginBottom: '15px', fontWeight: 'bold' }}>PASIVAS Y RASGOS</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {character?.features?.map((f, i) => (
                      <div key={i} className="glass-panel animate-fade-in" style={{ 
                        padding: '14px', borderLeft: `3px solid ${f.source === 'otro' ? '#ef4444' : 'var(--accent-gold)'}`,
                        background: f.source === 'otro' ? 'rgba(239,68,68,0.05)' : 'rgba(212,175,55,0.05)'
                      }}>
                        <div style={{ fontSize: '14px', fontWeight: 'bold', color: f.source === 'otro' ? '#fca5a5' : 'white', marginBottom: '4px' }}>
                          {f.source === 'otro' && '⚠️ '}{f.name}
                        </div>
                        <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>{f.description}</p>
                      </div>
                    ))}
                    {!character?.features?.length && <div style={{ opacity: 0.3, fontSize: '12px' }}>Ningún rasgo activo.</div>}
                  </div>
                </div>

                {/* DOTES (FEATS) SECTION (Cap. 6) */}
                {character?.feats && character.feats.length > 0 && (
                  <div style={{ marginTop: '30px' }}>
                    <p style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '1px', marginBottom: '15px', fontWeight: 'bold' }}>DOTES</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {character.feats.map(featId => {
                        const feat = SRD_FEATS[featId];
                        return (
                          <div key={featId} className="glass-panel" style={{ padding: '14px', borderLeft: '3px solid #fbbf24', background: 'rgba(251,191,36,0.05)' }}>
                            <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'white', marginBottom: '4px' }}>{feat?.name || featId}</div>
                            <p style={{ fontSize: '11px', color: 'var(--text-muted)', margin: 0 }}>{feat?.description}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              {/* Skills Column (Cap. 7) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                 <div className="glass-panel" style={{ padding: '20px' }}>
                    <p style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '1px', marginBottom: '15px', fontWeight: 'bold' }}>HABILIDADES</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      {Object.values(SRD_SKILLS).map(skill => {
                        const bonus = calculateSkillBonus(character!, skill.id);
                        const isProf = character!.proficiencies.skills.includes(skill.id);
                        const isExp = character!.expertiseSkills?.includes(skill.id);
                        
                        return (
                          <div key={skill.id} style={{ 
                            display: 'flex', justifyContent: 'space-between', alignItems: 'center', 
                            padding: '6px 12px', background: isProf ? 'rgba(251,191,36,0.03)' : 'transparent',
                            borderRadius: '4px', borderBottom: '1px solid rgba(255,255,255,0.02)'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                               <div style={{ 
                                 width: '8px', height: '8px', borderRadius: '50%', 
                                 background: isExp ? 'var(--accent-gold)' : (isProf ? 'rgba(212,175,55,0.5)' : 'transparent'),
                                 border: '1px solid rgba(255,255,255,0.2)',
                                 boxShadow: isExp ? '0 0 8px var(--accent-gold)' : 'none'
                               }} title={isExp ? 'Pericia' : (isProf ? 'Competencia' : 'Sin competencia')}></div>
                               <span style={{ fontSize: '12px', color: isProf ? 'white' : 'rgba(255,255,255,0.4)' }}>{skill.name}</span>
                               <span style={{ fontSize: '9px', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>({skill.ability})</span>
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 'bold', color: isProf ? 'var(--accent-gold)' : 'white' }}>
                              {bonus >= 0 ? `+${bonus}` : bonus}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                 </div>
              </div>

            </div>

            {/* ESPACIOS DE CONJURO (Cap. 6) */}
            {(character?.spellSlots || character?.warlockSlots) && (
              <div>
                <p style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '1px', marginBottom: '15px', fontWeight: 'bold' }}>ESPACIOS DE CONJURO DISPONIBLES</p>
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {character.spellSlots && Object.entries(character.spellSlots).map(([lvl, max]) => (
                    <div key={`slot-${lvl}`} className="glass-panel" style={{ padding: '10px 20px', textAlign: 'center', border: '1px solid rgba(167,139,250,0.3)', background: 'rgba(167,139,250,0.05)' }}>
                      <div style={{ fontSize: '8px', color: '#a78bfa' }}>NIVEL {lvl}</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                        {character.currentSpellSlots?.[Number(lvl)] || 0} / {max}
                      </div>
                    </div>
                  ))}
                  {character.warlockSlots && (
                    <div className="glass-panel" style={{ padding: '10px 20px', textAlign: 'center', border: '1px solid rgba(251,146,60,0.4)', background: 'rgba(251,146,60,0.05)' }}>
                      <div style={{ fontSize: '8px', color: '#fb923c' }}>PACTO (Lvl {character.warlockSlots.level})</div>
                      <div style={{ fontSize: '18px', fontWeight: 'bold', color: 'white' }}>
                        {character.currentWarlockSlots || 0} / {character.warlockSlots.count}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* SPELLBOOK SECTION */}
            {charSpells.length > 0 && (
              <div>
                <p style={{ fontSize: '10px', color: 'var(--accent-gold)', letterSpacing: '1px', marginBottom: '15px', fontWeight: 'bold' }}>GRIMORIO (HECHIZOS ACTIVOS)</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
                  {charSpells.map(s => (
                    <div key={s.id} className="glass-panel" style={{ 
                      padding: '20px', borderTop: '2px solid #a78bfa',
                      background: 'linear-gradient(180deg, rgba(167,139,250,0.05) 0%, transparent 100%)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '10px' }}>
                        <div>
                          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>{s.name}</div>
                          <div style={{ fontSize: '9px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {s.level === 0 ? 'Truco' : `Nivel ${s.level}`} — {s.school}
                          </div>
                        </div>
                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                          {s.level > 0 && character.classes.some(c => ['cleric', 'druid', 'wizard', 'paladin'].includes(c.classId)) && (
                            <button
                              onClick={() => {
                                if (character.preparedSpells?.includes(s.id)) {
                                  unprepareSpell(character.id, s.id);
                                } else {
                                  prepareSpell(character.id, s.id);
                                }
                              }}
                              className="glass-button"
                              style={{ 
                                padding: '4px 8px', fontSize: '10px', 
                                background: character.preparedSpells?.includes(s.id) ? 'rgba(34, 197, 94, 0.1)' : 'rgba(255,255,255,0.05)',
                                borderColor: character.preparedSpells?.includes(s.id) ? '#4ade80' : 'rgba(255,255,255,0.2)',
                                color: character.preparedSpells?.includes(s.id) ? '#4ade80' : 'rgba(255,255,255,0.4)'
                              }}
                            >
                              {character.preparedSpells?.includes(s.id) ? 'PREPARADO' : 'PREPARAR'}
                            </button>
                          )}
                          <div style={{ fontSize: '18px' }}>✨</div>
                        </div>
                      </div>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>{s.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── INVENTARIO VIEW ──────────────────────────────────────────────── */}
        {activeTab === 'inventario' && (
          <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-gold)', fontSize: '24px', margin: 0 }}>Inventario</h2>
              <div style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '5px', borderRadius: '10px' }}>
                {['equipamiento', 'consumible', 'otro'].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setInventoryTab(cat as any)}
                    style={{
                      padding: '8px 16px', borderRadius: '8px', border: 'none', fontSize: '12px',
                      background: inventoryTab === cat ? 'var(--accent-gold)' : 'none',
                      color: inventoryTab === cat ? 'black' : 'var(--text-muted)',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}
                  >
                    {cat.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {(character?.inventory || []).filter(i => i.category === inventoryTab).map(item => (
                <div key={item.id} className="glass-panel" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--accent-gold)', fontWeight: 'bold' }}>{item.name}</span>
                    <button onClick={() => removeItemFromCharacter(character!.id, item.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><Trash size={14} /></button>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', flex: 1 }}>{item.description}</p>
                  
                  {/* Cost and Weight (Cap. 5) */}
                  <div style={{ display: 'flex', gap: '15px', fontSize: '11px', color: 'rgba(255,255,255,0.4)', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '8px' }}>
                    <span>💰 {item.cost || 0} po</span>
                    <span>⚖️ {item.weight || 0} lb</span>
                  </div>

                  {item.category === 'equipamiento' && (
                    <button 
                      onClick={() => equipItem(character!.id, item.id)}
                      style={{ padding: '8px', borderRadius: '6px', background: 'rgba(212,175,55,0.1)', border: '1px solid var(--accent-gold)', color: 'var(--accent-gold)', cursor: 'pointer' }}
                    >
                      Equipar
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ─── EQUIPO VIEW ───────────────────────────────────────────────────── */}
        {activeTab === 'equipo' && (
          <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <div style={{ position: 'relative', height: '600px', display: 'grid', gridTemplateColumns: '120px 1fr 120px', gap: '20px', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <EquipmentSlotUI slot="head" label="Cabeza" icon={<HardHat />} character={character!} onSelect={setSlotSelection} />
                <EquipmentSlotUI slot="cloak" label="Capa" icon={<Waypoints />} character={character!} onSelect={setSlotSelection} />
                <EquipmentSlotUI slot="torso" label="Torso" icon={<Shirt />} character={character!} onSelect={setSlotSelection} />
                <EquipmentSlotUI slot="gloves" label="Guantes" icon={<Hand />} character={character!} onSelect={setSlotSelection} />
                <EquipmentSlotUI slot="boots" label="Botas" icon={<Footprints />} character={character!} onSelect={setSlotSelection} />
              </div>
              <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.02)', borderRadius: '20px' }}>
                <div style={{ textAlign: 'center', opacity: 0.2 }}>
                  <SwordIcon size={120} />
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <EquipmentSlotUI slot="amulet" label="Amuleto" icon={<Gem />} character={character!} onSelect={setSlotSelection} />
                <EquipmentSlotUI slot="ring1" label="Anillo 1" icon={<CircleDot />} character={character!} onSelect={setSlotSelection} />
                <EquipmentSlotUI slot="ring2" label="Anillo 2" icon={<CircleDot />} character={character!} onSelect={setSlotSelection} />
                <EquipmentSlotUI slot="mainHand" label="Principal" icon={<SwordIcon />} character={character!} onSelect={setSlotSelection} />
                <EquipmentSlotUI slot="offHand" label="Secundario" icon={<Shield />} character={character!} onSelect={setSlotSelection} />
                <EquipmentSlotUI slot="ranged" label="Distancia" icon={<CircleDot />} character={character!} onSelect={setSlotSelection} />
              </div>
            </div>

            <div style={{ background: 'rgba(0,0,0,0.3)', borderRadius: '12px', padding: '24px', border: '1px solid rgba(255,255,255,0.05)', overflowY: 'auto' }}>
              {slotSelection ? (
                <div>
                  <h3 style={{ margin: '0 0 20px', fontSize: '18px', color: 'var(--accent-gold)' }}>Seleccionar: {slotSelection.toUpperCase()}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {(character?.inventory || [])
                      .filter(i => i.category === 'equipamiento')
                      .filter(i => {
                        const s = slotSelection.toLowerCase();
                        const name = i.name.toLowerCase();
                        const subtype = i.subtype;

                        if (s === 'mainhand') return subtype === 'arma' || name.includes('espada') || name.includes('daga') || name.includes('hacha') || name.includes('mazo') || name.includes('garrote');
                        if (s === 'offhand') return subtype === 'escudo' || subtype === 'arma' || name.includes('escudo') || name.includes('daga') || name.includes('espada corta');
                        if (s === 'ranged') return (subtype === 'arma' && i.properties?.includes('distancia')) || name.includes('arco') || name.includes('ballesta');
                        if (s === 'head') return subtype === 'casco' || name.includes('casco') || name.includes('yelmo') || name.includes('diadema');
                        if (s === 'torso') return subtype === 'armadura' || name.includes('armadura') || name.includes('cota') || name.includes('jubon') || name.includes('tunica');
                        if (s === 'cloak') return subtype === 'capa' || name.includes('capa') || name.includes('manto');
                        if (s === 'gloves') return subtype === 'guantes' || name.includes('guantes') || name.includes('protegebrazos');
                        if (s === 'boots') return subtype === 'botas' || name.includes('botas') || name.includes('calzado');
                        if (s === 'amulet') return subtype === 'amuleto' || name.includes('amuleto') || name.includes('collar') || name.includes('medallon');
                        if (s === 'ring1' || s === 'ring2') return subtype === 'anillo' || name.includes('anillo') || name.includes('sortija');
                        
                        return false;
                      })
                      .map(item => (
                        <div 
                          key={item.id} 
                          onClick={() => { equipItemInSlot(character!.id, item.id, slotSelection); setSlotSelection(null); }}
                          style={{ 
                            padding: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', cursor: 'pointer',
                            border: '1px solid transparent', transition: 'all 0.2s'
                          }}
                          onMouseEnter={e => e.currentTarget.style.border = '1px solid var(--accent-gold)'}
                          onMouseLeave={e => e.currentTarget.style.border = '1px solid transparent'}
                        >
                          <div style={{ fontSize: '14px', fontWeight: 'bold', color: 'var(--accent-gold)' }}>{item.name}</div>
                          <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.description}</div>
                        </div>
                      ))}
                    <button 
                      onClick={() => { unequipItem(character!.id, slotSelection); setSlotSelection(null); }}
                      style={{ padding: '12px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', marginTop: '20px' }}
                    >
                      Desequipar Ranura
                    </button>
                  </div>
                </div>
              ) : (
                <div style={{ textAlign: 'center', paddingTop: '100px', opacity: 0.3 }}>
                  <ShieldQuestion size={48} style={{ marginBottom: '20px' }} />
                  <p>Selecciona una ranura para equipar objetos</p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {pendingRoll && (
        <DiceOverlay 
          rollRequest={pendingRoll} 
          isRolling={isRolling} 
          result={rollResult}
          onRoll={handleRoll}
        />
      )}

      {/* REST MODAL (Cap. 8) */}
      {showRestModal && character && (
        <div style={{ 
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
          zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
        }}>
          <div className="glass-panel animate-scale-in" style={{ maxWidth: '500px', width: '100%', padding: '30px' }}>
            <h2 className="font-display text-2xl text-gold mb-2 text-center">EL CAMPAMENTO</h2>
            <p className="text-secondary text-sm text-center mb-6">¿Qué tipo de descanso realizarán los héroes?</p>
            
            <div className="flex-col gap-4">
              {/* Opción Descanso Corto */}
              <button 
                onClick={() => {
                  const hd = character.hitDice?.find(d => d.current > 0);
                  if (hd) {
                    shortRest(character.id, hd.type, 1);
                    // Recover HP in session too
                    const heal = Math.floor(Math.random() * hd.type) + 1 + Math.floor(((character.attributes.con || 10) - 10) / 2);
                    updateSessionHp(Math.max(1, heal));
                    addMessage({ role: 'system', text: `Has realizado un Descanso Corto. Usas un dado de golpe d${hd.type} para recuperar fuerzas.` });
                  } else {
                    alert('No te quedan dados de golpe.');
                  }
                  setShowRestModal(false);
                }}
                className="glass-button w-full p-4 text-left group"
                style={{ background: 'rgba(212,175,55,0.05)', borderColor: 'rgba(212,175,55,0.2)' }}
              >
                <div className="flex gap-4 items-center">
                  <div className="p-3 rounded-lg bg-yellow-500/10 text-yellow-500 group-hover:scale-110 transition-transform">
                    <Flame size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase tracking-wider">Descanso Corto (1 hora)</div>
                    <div className="text-xs text-secondary">Consume 1 Dado de Golpe para curarte. Los brujos recuperan sus pactos mágicos.</div>
                  </div>
                </div>
              </button>

              {/* Opción Descanso Largo */}
              <button 
                onClick={() => {
                  longRest(character.id);
                  updateSessionHp(currentSession?.playerMaxHp || 99);
                  addMessage({ role: 'system', text: 'Realizas un Descanso Largo bajo la protección de la noche. Recuperas HP, Conjuros y 1 nivel de Agotamiento.' });
                  setShowRestModal(false);
                }}
                className="glass-button w-full p-4 text-left group"
                style={{ background: 'rgba(34,197,94,0.05)', borderColor: 'rgba(34,197,94,0.2)' }}
              >
                <div className="flex gap-4 items-center">
                  <div className="p-3 rounded-lg bg-green-500/10 text-green-500 group-hover:scale-110 transition-transform">
                    <Moon size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-white uppercase tracking-wider">Descanso Largo (8 horas)</div>
                    <div className="text-xs text-secondary">Recuperas todos tus PG, todos tus Conjuros y la mitad de tus Dados de Golpe.</div>
                  </div>
                </div>
              </button>

              <button 
                onClick={() => setShowRestModal(false)}
                className="w-full mt-4 text-secondary text-xs uppercase letter-spacing-1 hover:text-white transition-colors"
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Slot UI Component ──────────────────────────────────────────────────
function EquipmentSlotUI({ slot, label, icon, character, onSelect }: { slot: string; label: string; icon: React.ReactNode; character: any; onSelect: (s: string) => void }) {
  const itemId = (character.equipment as any)?.[slot];
  const item = (character.inventory || []).find((i: any) => i.id === itemId);
  
  // STR Requirement check (Cap. 5)
  const strReqFail = item?.strRequirement && character.attributes.str < item.strRequirement;

  return (
    <div 
      onClick={() => onSelect(slot)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: item ? 'rgba(212,175,55,0.08)' : 'rgba(0,0,0,0.3)',
        border: `1px solid ${strReqFail ? '#ef4444' : (item ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)')}`,
        borderRadius: '10px', padding: '10px', cursor: 'pointer', transition: 'all 0.2s',
        position: 'relative'
      }}
    >
      <div style={{ color: strReqFail ? '#ef4444' : 'var(--accent-gold)', opacity: 0.6 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: '13px', fontWeight: item ? 'bold' : 'normal', color: item ? 'white' : 'rgba(255,255,255,0.3)' }}>
          {item ? item.name : 'Vacio'}
        </div>
        {strReqFail && (
          <div style={{ fontSize: '9px', color: '#fca5a5', fontWeight: 'bold', marginTop: '2px' }}>
            ⚠️ REQUIERE FUE {item.strRequirement}
          </div>
        )}
      </div>
      {strReqFail && <div style={{ position: 'absolute', top: '-5px', right: '-5px', background: '#ef4444', height: '10px', width: '100%', borderRadius: '4px', opacity: 0.1 }} />}
    </div>
  );
}

const SystemBubble = ({ text }: { text: string }) => (
  <div style={{ alignSelf: 'center', margin: '20px 0', width: '100%', maxWidth: '600px' }}>
    <div style={{ background: 'rgba(212, 175, 55, 0.05)', border: '1px dashed rgba(212, 175, 55, 0.3)', borderRadius: '8px', padding: '12px 20px', textAlign: 'center' }}>
      <p style={{ margin: 0, fontSize: '13px', color: 'var(--accent-gold)', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}>
        {text}
      </p>
    </div>
  </div>
);

const DmBubble = ({ text, isStreaming }: { text: string; isStreaming?: boolean }) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', maxWidth: '85%' }}>
    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '16px' }}>🎭</div>
    <div className="glass-panel animate-fade-in" style={{ padding: '14px 18px', background: 'rgba(124,58,237,0.08)', border: '1px solid rgba(124,58,237,0.2)', borderRadius: '4px 16px 16px 16px' }}>
      <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', whiteSpace: 'pre-wrap', color: 'var(--text-secondary)', fontFamily: 'Georgia, serif' }}>
        {parseDiceTag(text)}
        {isStreaming && <span className="streaming-cursor">|</span>}
      </p>
    </div>
  </div>
);

const PlayerBubble = ({ text }: { text: string }) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', alignSelf: 'flex-end', flexDirection: 'row-reverse', maxWidth: '85%' }}>
    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '18px', color: '#000' }}>👤</div>
    <div className="glass-panel animate-fade-in" style={{ padding: '14px 18px', background: 'rgba(212, 175, 55, 0.1)', border: '1px solid rgba(212, 175, 55, 0.2)', borderRadius: '16px 4px 16px 16px' }}>
      <p style={{ margin: 0, fontSize: '15px', lineHeight: '1.6', color: 'white', fontWeight: 500 }}>
        {text}
      </p>
    </div>
  </div>
);

function ItemPickupAlert({ name, type }: { name: string; category?: string; type?: string }) {
  const isXp = type === 'XP';
  const isRasgo = type === 'RASGO';

  return (
    <div className="item-pickup-alert" style={{ 
      alignSelf: 'center', 
      animation: 'slideUp 0.3s ease-out forwards',
      background: isXp ? 'rgba(34, 211, 238, 0.1)' : isRasgo ? 'rgba(239, 68, 68, 0.1)' : 'rgba(212, 175, 55, 0.1)',
      border: `1px solid ${isXp ? '#22d3ee' : isRasgo ? '#ef4444' : 'var(--accent-gold)'}`,
      padding: '12px 20px', borderRadius: '12px', minWidth: '300px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <div style={{ 
          width: '40px', height: '40px', borderRadius: '10px', 
          background: isXp ? '#22d3ee' : isRasgo ? '#ef4444' : 'var(--accent-gold)', 
          display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' 
        }}>
          {isXp ? <Zap size={20} /> : isRasgo ? <Shield size={20} /> : <Package size={20} />}
        </div>
        <div>
          <div style={{ fontSize: '10px', color: isXp ? '#22d3ee' : isRasgo ? '#ef4444' : 'var(--accent-gold)', fontWeight: 'bold', letterSpacing: '1.5px' }}>
            {isXp ? 'EXPERIENCIA GANADA' : isRasgo ? 'NUEVO RASGO PASIVO' : 'OBJETO ENCONTRADO'}
          </div>
          <div style={{ fontSize: '16px', fontWeight: 'bold', color: 'white' }}>{name}</div>
        </div>
      </div>
    </div>
  );
}

function DiceOverlay({ rollRequest, isRolling, result, onRoll }: { rollRequest: any; isRolling: boolean; result: any; onRoll: () => void }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
      animation: 'fadeIn 0.3s'
    }}>
      <div style={{
        background: 'rgba(20, 20, 25, 0.95)', border: '1px solid var(--accent-gold)',
        borderRadius: '24px', padding: '40px', maxWidth: '400px', width: '90%',
        textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}>
        <div style={{ fontSize: '12px', color: 'var(--accent-gold)', letterSpacing: '2px', marginBottom: '10px' }}>DEMANDA DEL DESTINO</div>
        <h2 style={{ fontSize: '32px', margin: '0 0 10px', fontFamily: 'var(--font-display)' }}>{rollRequest.formula}</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Dificultad (CD): {rollRequest.dc}</p>
        
        {result ? (
          <div style={{ marginBottom: '20px', animation: 'slideUp 0.3s' }}>
            <div style={{ fontSize: '64px', fontWeight: 900, color: result.success ? '#4ade80' : '#ef4444' }}>{result.total}</div>
            <div style={{ fontSize: '20px', color: result.success ? '#4ade80' : '#ef4444', fontWeight: 'bold' }}>
              {result.success ? 'ÉXITO CRÍTICO' : 'FALLO TOTAL'}
            </div>
          </div>
        ) : (
          <button 
            className="btn-primary" 
            onClick={onRoll} 
            disabled={isRolling}
            style={{ width: '100%', paddingTop: '16px', paddingBottom: '16px', fontSize: '18px' }}
          >
            {isRolling ? 'Lanzando...' : 'LANZAR DADOS'}
          </button>
        )}
      </div>
    </div>
  );
}
