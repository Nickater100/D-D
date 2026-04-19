import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Sword, Wand2, Zap, RotateCcw, ChevronRight, ChevronLeft, Scroll } from 'lucide-react';
import { useRoster } from '../store/useRoster';
import { useGameSession } from '../store/useGameSession';
import { buildSystemPrompt } from '../data/dmPrompt';
import { STARTER_SPELLS } from '../data/spells_es';
import { getAIProvider } from '../services/ai';
import type { ChatMessage } from '../services/ai';
import { extractRollRequest, rollDice } from '../utils/diceUtils';
import type { RollResult, RollRequest } from '../utils/diceUtils';
import { ADVENTURE_MODULES } from '../data/adventures';
import { extractItemsFromText, cleanItemTags } from '../utils/itemUtils';
import { ShoppingBag, Sword as SwordIcon, FlaskConical, Package, Trash, Shield, ShieldQuestion, Gem, CircleDot, Footprints, Hand, Shirt, HardHat, Waypoints } from 'lucide-react';

// ─── AI Service (Now handled via .env) ───────────────────────────────────────

// ─── Dice Roll Tag Parser ─────────────────────────────────────────────────────
function parseDiceTag(text: string) {
  return text.replace(/\[TIRADA:\s*([^\]]+)\]/g, (_, roll) => `🎲 [${roll.trim()}]`);
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdventureView() {
  const navigate = useNavigate();
  const { characters, activeCharacterId } = useRoster();
  const { sessions, currentSessionId, isLoading, addMessage, setLoading, clearCurrentSession } = useGameSession();

  const currentSession = currentSessionId ? sessions[currentSessionId] : null;
  const messages = currentSession?.messages || [];
  const activeModuleId = currentSession?.moduleId;

  const [inputText, setInputText] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  const { addItemToCharacter, removeItemFromCharacter, equipItem, equipItemInSlot, unequipItem } = useRoster();

  const character = characters.find(c => c.id === activeCharacterId);
  const activeModule = ADVENTURE_MODULES.find(m => m.id === activeModuleId);

  const charSpells = character
    ? [...STARTER_SPELLS.cantrips, ...STARTER_SPELLS.level_1].filter(s => character.spells?.includes(s.id))
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
        .filter(m => !isOpening)
        .map(m => ({
          role: m.role as 'user' | 'model',
          text: m.text,
        }));

      const systemPrompt = buildSystemPrompt(character, activeModule);
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
          setNewItemsAlert(prev => [...prev, item]);
        });
        // Auto-clear alerts after 5s
        setTimeout(() => setNewItemsAlert([]), 5000);
      }

      // Check for pending roll
      const rollReq = extractRollRequest(fullResponse);
      if (rollReq) {
        setPendingRoll(rollReq);
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
  }, [character, messages, addMessage, setLoading]);

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

  const handleRestart = () => {
    if (!character) return;
    sessionStarted.current = false;
    clearCurrentSession();
    setTimeout(() => {
      navigate('/campaigns');
    }, 100);
  };

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
              {tab.id === 'inventario' && character?.inventory?.length > 0 && (
                <span style={{ fontSize: '10px', opacity: 0.7 }}>({character.inventory.length})</span>
              )}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '12px', fontWeight: 'bold' }}>{character?.name}</div>
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>LVL {character?.level} {character?.className}</div>
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
            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px 120px' }}>
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

            {/* Input area */}
            <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(0,0,0,0.5)' }}>
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
          <div style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--accent-gold)', fontSize: '24px', marginBottom: '24px' }}>Ficha del Héroe</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="glass-panel" style={{ padding: '20px' }}>
                  <p style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '10px' }}>ATRIBUTOS</p>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                    {Object.entries(character?.attributes || {}).map(([k, v]) => {
                      const m = Math.floor(((v as number) - 10) / 2);
                      const colors: Record<string, string> = { str: '#ef4444', dex: '#22d3ee', con: '#f97316', int: '#a78bfa', wis: '#4ade80', cha: '#f472b6' };
                      return (
                        <div key={k} style={{ textAlign: 'center', padding: '10px', border: `1px solid ${colors[k]}44`, borderRadius: '8px' }}>
                          <span style={{ fontSize: '10px', color: colors[k] }}>{(k as string).toUpperCase()}</span>
                          <div style={{ fontSize: '24px' }}>{v as number}</div>
                          <div style={{ color: colors[k] }}>{m >= 0 ? `+${m}` : m}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
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

      {/* ─── DICE OVERLAY ────────────────────────────────────────────────── */}
      {pendingRoll && (
        <DiceOverlay 
          rollRequest={pendingRoll} 
          isRolling={isRolling} 
          result={rollResult}
          onRoll={handleRoll}
        />
      )}
    </div>
  );
}

// ─── Slot UI Component ──────────────────────────────────────────────────
function EquipmentSlotUI({ slot, label, icon, character, onSelect }: { slot: string; label: string; icon: React.ReactNode; character: any; onSelect: (s: string) => void }) {
  const itemId = (character.equipment as any)?.[slot];
  const item = (character.inventory || []).find((i: any) => i.id === itemId);

  return (
    <div 
      onClick={() => onSelect(slot)}
      style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: item ? 'rgba(212,175,55,0.08)' : 'rgba(0,0,0,0.3)',
        border: `1px solid ${item ? 'var(--accent-gold)' : 'rgba(255,255,255,0.1)'}`,
        borderRadius: '10px', padding: '10px', cursor: 'pointer', transition: 'all 0.2s'
      }}
    >
      <div style={{ color: 'var(--accent-gold)', opacity: 0.6 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: '13px', fontWeight: item ? 'bold' : 'normal', color: item ? 'white' : 'rgba(255,255,255,0.3)' }}>
          {item ? item.name : 'Vacio'}
        </div>
      </div>
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

function ItemPickupAlert({ name, category }: { name: string; category: string }) {
  return (
    <div className="item-pickup-alert" style={{ alignSelf: 'center', animation: 'slideUp 0.3s ease-out forwards' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--accent-gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'black' }}>
          <Package size={18} />
        </div>
        <div>
          <div style={{ fontSize: '10px', color: 'var(--accent-gold)', fontWeight: 'bold', letterSpacing: '1px' }}>OBJETO ENCONTRADO</div>
          <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{name}</div>
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
            style={{ width: '100%', py: '16px', fontSize: '18px' }}
          >
            {isRolling ? 'Lanzando...' : 'LANZAR DADOS'}
          </button>
        )}
      </div>
    </div>
  );
}
