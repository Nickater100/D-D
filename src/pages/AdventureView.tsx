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
import { ShoppingBag, Sword as SwordIcon, FlaskConical, Package, Trash } from 'lucide-react';

// ─── AI Service (Now handled via .env) ───────────────────────────────────────

// ─── Dice Roll Tag Parser ─────────────────────────────────────────────────────
function parseDiceTag(text: string) {
  return text.replace(/\[TIRADA:\s*([^\]]+)\]/g, (_, roll) => `🎲 [${roll.trim()}]`);
}

// ─── DM Message Bubble ───────────────────────────────────────────────────────
const DmBubble = React.memo(({ text, isStreaming }: { text: string; isStreaming?: boolean }) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', padding: '4px 0' }}>
    <div style={{
      width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, #7c3aed, #4f46e5)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '16px', boxShadow: '0 0 12px rgba(124,58,237,0.4)'
    }}>🎭</div>
    <div style={{
      background: 'rgba(124, 58, 237, 0.08)',
      border: '1px solid rgba(124, 58, 237, 0.2)',
      borderRadius: '4px 16px 16px 16px',
      padding: '12px 16px',
      maxWidth: '85%',
      fontSize: '14px',
      lineHeight: '1.7',
      color: 'var(--text-primary)',
      fontFamily: 'Georgia, serif',
      letterSpacing: '0.01em',
    }}>
      {parseDiceTag(text)}
      {isStreaming && <span style={{ 
        display: 'inline-block', width: '2px', height: '14px', 
        background: '#a78bfa', marginLeft: '2px', verticalAlign: 'middle',
        animation: 'blink 0.8s step-end infinite'
      }}/>}
    </div>
  </div>
));

// ─── Player Message Bubble ────────────────────────────────────────────────────
const PlayerBubble = React.memo(({ text }: { text: string }) => (
  <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start', justifyContent: 'flex-end', padding: '4px 0' }}>
    <div style={{
      background: 'rgba(212, 175, 55, 0.1)',
      border: '1px solid rgba(212, 175, 55, 0.25)',
      borderRadius: '16px 4px 16px 16px',
      padding: '10px 16px',
      maxWidth: '75%',
      fontSize: '14px',
      lineHeight: '1.6',
      color: 'var(--text-primary)',
    }}>
      {text}
    </div>
    <div style={{
      width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
      background: 'linear-gradient(135deg, #d4af37, #92670a)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '14px', boxShadow: '0 0 8px rgba(212,175,55,0.3)'
    }}>⚔️</div>
  </div>
));

// ─── Animated d20 Component ──────────────────────────────────────────────────
const D20Die = ({ isRolling, result }: { isRolling: boolean; result: number | null }) => (
  <div style={{
    width: '60px', height: '60px', position: 'relative',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transform: isRolling ? 'rotate(360deg)' : 'none',
    transition: 'transform 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
  }}>
    <svg viewBox="0 0 100 100" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.4))' }}>
      <path d="M50 5 L95 25 L95 75 L50 95 L5 75 L5 25 Z" fill="rgba(8, 8, 20, 0.9)" stroke="#d4af37" strokeWidth="2"/>
      <path d="M50 5 L50 95 M5 25 L95 25 M5 75 L95 75 M50 5 L5 75 M50 5 L95 75 M5 25 L50 95 M95 25 L50 95" stroke="#d4af37" strokeWidth="1" opacity="0.5"/>
      <text x="50" y="58" textAnchor="middle" fill="#d4af37" fontSize="24" fontWeight="bold" fontFamily="var(--font-display)">
        {isRolling ? '?' : (result || 20)}
      </text>
    </svg>
  </div>
);

// ─── Dice Roller Overlay ─────────────────────────────────────────────────────
const DiceOverlay = ({ rollRequest, isRolling, result, onRoll }: any) => {
  const getStatusColor = () => {
    if (!result) return 'var(--accent-gold)';
    if (result.isCritical) return '#fbbf24'; // Intense gold
    if (result.isFumble) return '#ef4444'; // Bright red
    if (result.isSuccess === true) return '#4ade80'; // Green
    if (result.isSuccess === false) return '#f87171'; // Red
    return 'var(--accent-gold)';
  };

  const color = getStatusColor();

  return (
    <div style={{
      position: 'absolute', bottom: '80px', left: '50%', transform: 'translateX(-50%)',
      width: '90%', maxWidth: '400px', background: 'rgba(8, 8, 20, 0.98)',
      border: `2px solid ${color}`, borderRadius: '16px',
      padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px',
      boxShadow: `0 10px 40px rgba(0,0,0,0.9), 0 0 30px ${color}22`,
      zIndex: 30, animation: 'slideUp 0.3s ease-out',
      transition: 'border-color 0.4s, box-shadow 0.4s'
    }}>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.2em', margin: '0 0 6px' }}>
          {rollRequest.dc ? `OBJETIVO CD: ${rollRequest.dc}` : 'TIRADA REQUERIDA'}
        </p>
        <h3 style={{ margin: 0, color: 'white', fontSize: '24px', fontFamily: 'var(--font-display)' }}>
          {rollRequest.formula}
        </h3>
      </div>
      
      <div style={{ 
        transform: result?.isFumble ? 'translateX(0px)' : 'none',
        animation: result?.isFumble ? 'shake 0.4s ease-in-out' : 'none'
      }}>
        <D20Die isRolling={isRolling} result={result?.dice} />
      </div>

      <div style={{ textAlign: 'center', height: '24px' }}>
        {result && (
          <p style={{ 
            margin: 0, color, fontWeight: 'bold', fontSize: '16px', 
            letterSpacing: '0.1em', animation: 'fadeIn 0.3s' 
          }}>
            {result.isCritical ? '¡CRÍTICO!' : (result.isFumble ? '¡PIFIA!' : (result.isSuccess ? '¡ÉXITO!' : (result.isSuccess === false ? 'FALLO' : '')))}
          </p>
        )}
      </div>
      
      <button 
        className="btn-primary" 
        onClick={onRoll} 
        disabled={isRolling || !!result}
        style={{ 
          width: '100%', padding: '14px', 
          background: result ? 'rgba(255,255,255,0.05)' : 'linear-gradient(135deg, #d4af37, #92670a)',
          color: result ? 'var(--text-muted)' : 'black',
          opacity: isRolling ? 0.7 : 1 
        }}
      >
        {isRolling ? 'LANZANDO...' : (result ? 'COMPLETADO' : 'LANZAR DADO')}
      </button>
    </div>
  );
};

// ─── System Message Bubble ───────────────────────────────────────────────────
const SystemBubble = React.memo(({ text }: { text: string }) => (
  <div style={{ display: 'flex', justifyContent: 'center', padding: '12px 0' }}>
    <div style={{
      background: 'rgba(212, 175, 55, 0.05)',
      border: '1px solid rgba(212, 175, 55, 0.2)',
      borderRadius: '8px',
      padding: '8px 24px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      color: 'var(--accent-gold)',
      fontSize: '12px',
      fontStyle: 'italic',
      letterSpacing: '0.05em',
      boxShadow: 'inset 0 0 15px rgba(212,175,55,0.05)'
    }}>
      <RotateCcw size={14} />
      {text}
    </div>
  </div>
));

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

  const [sidebarTab, setSidebarTab] = useState<'ficha' | 'inventario'>('ficha');
  const [inventoryTab, setInventoryTab] = useState<'equipamiento' | 'consumible' | 'otro'>('equipamiento');
  const [newItemsAlert, setNewItemsAlert] = useState<any[]>([]);

  const { addItemToCharacter, removeItemFromCharacter } = useRoster();

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
      navigate('/campaigns'); // Go back to library on restart to be safe, or just clear.
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
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      {/* CSS for animations */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes slideUp { from{transform: translateX(-50%) translateY(20px); opacity:0} to{transform: translateX(-50%) translateY(0); opacity:1} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }
        @keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
      `}</style>


      {/* ─── HEADER ─────────────────────────────────────────────────────── */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'rgba(0,0,0,0.7)',
        borderBottom: '1px solid rgba(212,175,55,0.15)',
        backdropFilter: 'blur(12px)',
        position: 'sticky', top: 0, zIndex: 10
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button className="btn-secondary" style={{ padding: '6px' }} onClick={() => navigate('/')}>
            <ArrowLeft size={20} />
          </button>
          <div>
            <p style={{ fontSize: '10px', color: 'var(--text-muted)', letterSpacing: '0.15em', textTransform: 'uppercase', margin: 0 }}>Aventura Activa</p>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', color: 'var(--accent-gold)', fontSize: '16px' }}>
              {character.name}
            </h3>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <span style={{ fontSize: '10px', background: 'rgba(239,68,68,0.15)', border: '1px solid rgba(239,68,68,0.3)', color: '#f87171', borderRadius: '6px', padding: '3px 8px' }}>
              ❤️ {character.maxHp} HP
            </span>
            <span style={{ fontSize: '10px', background: 'rgba(96,165,250,0.1)', border: '1px solid rgba(96,165,250,0.25)', color: '#93c5fd', borderRadius: '6px', padding: '3px 8px' }}>
              🛡️ {character.ac} CA
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={handleRestart}
            title="Nueva sesión"
            style={{ padding: '6px 10px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}
          >
            <RotateCcw size={14} /> Reiniciar
          </button>
          <button
            onClick={() => setSidebarOpen(p => !p)}
            style={{ padding: '6px 10px', background: sidebarOpen ? 'rgba(124,58,237,0.15)' : 'rgba(255,255,255,0.05)', border: `1px solid ${sidebarOpen ? 'rgba(124,58,237,0.4)' : 'rgba(255,255,255,0.1)'}`, borderRadius: '8px', color: sidebarOpen ? '#a78bfa' : 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px' }}
          >
            <Scroll size={14} /> Ficha
          </button>
        </div>
      </div>

      {/* ─── MAIN LAYOUT ─────────────────────────────────────────────────── */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', position: 'relative' }}>

        {/* ─── CHAT AREA ──────────────────────────────────────────────────── */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '20px 16px 120px',
          transition: 'margin-right 0.3s ease',
          marginRight: sidebarOpen ? '280px' : '0',
        }}>
          {messages.length === 0 && !streamingText && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>🎭</div>
              <p style={{ fontFamily: 'Georgia, serif', fontSize: '15px', fontStyle: 'italic' }}>
                El Narrador está preparando tu destino...
              </p>
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '760px', margin: '0 auto' }}>
            {messages.map((msg, i) => {
              if (msg.role === 'model') return <DmBubble key={i} text={msg.text} />;
              if (msg.role === 'user') return <PlayerBubble key={i} text={msg.text} />;
              return <SystemBubble key={i} text={msg.text} />;
            })}
            
            {/* New Items Alert Area */}
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

        {/* ─── SIDEBAR — CHARACTER SHEET ───────────────────────────────────── */}
        <div style={{
          position: 'fixed', top: '57px', right: 0, bottom: 0,
          width: '280px',
          background: 'rgba(8, 8, 20, 0.95)',
          borderLeft: '1px solid rgba(255,255,255,0.06)',
          backdropFilter: 'blur(12px)',
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.3s ease',
          overflowY: 'auto',
          padding: '16px',
          display: 'flex', flexDirection: 'column', gap: '14px',
          zIndex: 9,
        }}>
          {/* Sidebar Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
            <button 
              onClick={() => setSidebarTab('ficha')}
              style={{
                flex: 1, padding: '10px', background: 'none', border: 'none',
                borderBottom: sidebarTab === 'ficha' ? '2px solid var(--accent-gold)' : 'none',
                color: sidebarTab === 'ficha' ? 'var(--accent-gold)' : 'var(--text-muted)',
                fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              FICHA
            </button>
            <button 
              onClick={() => setSidebarTab('inventario')}
              style={{
                flex: 1, padding: '10px', background: 'none', border: 'none',
                borderBottom: sidebarTab === 'inventario' ? '2px solid var(--accent-gold)' : 'none',
                color: sidebarTab === 'inventario' ? 'var(--accent-gold)' : 'var(--text-muted)',
                fontSize: '11px', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
              }}
            >
              INVENTARIO {character.inventory && character.inventory.length > 0 && <span style={{ background: 'var(--accent-gold)', color: 'black', borderRadius: '50%', width: '16px', height: '16px', fontSize: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{character.inventory.length}</span>}
            </button>
          </div>

          {sidebarTab === 'ficha' ? (
            <>
              <div>
                <p style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', margin: '0 0 8px' }}>Estadísticas</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '6px' }}>
                  {Object.entries(character.attributes).map(([k, v]) => {
                    const m = Math.floor(((v as number) - 10) / 2);
                    const colors: Record<string, string> = { str: '#ef4444', dex: '#22d3ee', con: '#f97316', int: '#a78bfa', wis: '#4ade80', cha: '#f472b6' };
                    const labels: Record<string, string> = { str: 'FUE', dex: 'DES', con: 'CON', int: 'INT', wis: 'SAB', cha: 'CAR' };
                    return (
                      <div key={k} style={{ background: 'rgba(0,0,0,0.4)', border: `1px solid ${colors[k]}22`, borderRadius: '8px', padding: '6px 4px', textAlign: 'center' }}>
                        <div style={{ fontSize: '8px', color: colors[k], opacity: 0.7, letterSpacing: '0.1em' }}>{labels[k]}</div>
                        <div style={{ fontSize: '18px', fontFamily: 'var(--font-display)' }}>{v as number}</div>
                        <div style={{ fontSize: '10px', color: colors[k] }}>{m >= 0 ? `+${m}` : m}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {character.features && character.features.length > 0 && (
                <div>
                  <p style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', margin: '0 0 8px' }}>Rasgos Pasivos</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {character.features.map((f, i) => (
                      <div key={i} style={{ background: 'rgba(124,58,237,0.07)', border: '1px solid rgba(124,58,237,0.15)', borderRadius: '8px', padding: '8px 10px' }}>
                        <div style={{ fontSize: '10px', color: '#c084fc', fontFamily: 'var(--font-display)', marginBottom: '3px' }}>{f.name}</div>
                        <div style={{ fontSize: '10px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>{f.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {charSpells.length > 0 && (
                <div>
                  <p style={{ fontSize: '9px', letterSpacing: '0.15em', color: 'var(--text-muted)', textTransform: 'uppercase', margin: '0 0 8px' }}>Hechizos</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {charSpells.map(s => (
                      <div key={s.id} style={{ background: 'rgba(59,130,246,0.07)', border: '1px solid rgba(59,130,246,0.15)', borderRadius: '8px', padding: '8px 10px' }}>
                        <div style={{ fontSize: '10px', color: '#93c5fd', fontFamily: 'var(--font-display)' }}>{s.name}</div>
                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontStyle: 'italic' }}>{s.type}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Inventory Sub-tabs */}
              <div style={{ display: 'flex', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', padding: '2px' }}>
                <button 
                  onClick={() => setInventoryTab('equipamiento')}
                  style={{
                    flex: 1, padding: '6px', border: 'none', borderRadius: '6px',
                    background: inventoryTab === 'equipamiento' ? 'rgba(212,175,55,0.1)' : 'transparent',
                    color: inventoryTab === 'equipamiento' ? 'var(--accent-gold)' : 'var(--text-muted)',
                    fontSize: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <SwordIcon size={12} />
                </button>
                <button 
                  onClick={() => setInventoryTab('consumible')}
                  style={{
                    flex: 1, padding: '6px', border: 'none', borderRadius: '6px',
                    background: inventoryTab === 'consumible' ? 'rgba(212,175,55,0.1)' : 'transparent',
                    color: inventoryTab === 'consumible' ? 'var(--accent-gold)' : 'var(--text-muted)',
                    fontSize: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <FlaskConical size={12} />
                </button>
                <button 
                  onClick={() => setInventoryTab('otro')}
                  style={{
                    flex: 1, padding: '6px', border: 'none', borderRadius: '6px',
                    background: inventoryTab === 'otro' ? 'rgba(212,175,55,0.1)' : 'transparent',
                    color: inventoryTab === 'otro' ? 'var(--accent-gold)' : 'var(--text-muted)',
                    fontSize: '9px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center'
                  }}
                >
                  <Package size={12} />
                </button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(character.inventory || []).filter(i => i.category === inventoryTab).length === 0 ? (
                  <div style={{ padding: '20px', textAlign: 'center', opacity: 0.5 }}>
                    <p style={{ fontSize: '11px', margin: 0 }}>Vacio</p>
                  </div>
                ) : (
                  (character.inventory || [])
                    .filter(i => i.category === inventoryTab)
                    .map(item => (
                      <div key={item.id} className="glass-panel" style={{ padding: '10px', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '4px' }}>
                          <span style={{ fontSize: '11px', color: 'var(--accent-gold)', fontWeight: 'bold' }}>{item.name}</span>
                          <button 
                            onClick={() => removeItemFromCharacter(character.id, item.id)}
                            style={{ background: 'none', border: 'none', color: '#ef4444', opacity: 0.5, cursor: 'pointer', padding: '2px' }}
                          >
                            <Trash size={12} />
                          </button>
                        </div>
                        <p style={{ fontSize: '10px', color: 'var(--text-secondary)', margin: 0, lineHeight: '1.4' }}>{item.description}</p>
                      </div>
                    ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ─── DICE OVERLAY ────────────────────────────────────────────────── */}
      {pendingRoll && (
        <DiceOverlay 
          rollRequest={pendingRoll} 
          isRolling={isRolling} 
          result={rollResult}
          onRoll={handleRoll}
        />
      )}

      {/* ─── INPUT BAR (fixed bottom) ────────────────────────────────────── */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0,
        right: sidebarOpen ? '280px' : '0',
        transition: 'right 0.3s ease',
        background: 'rgba(5, 5, 15, 0.95)',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        backdropFilter: 'blur(16px)',
        padding: '12px 16px',
        zIndex: 20,
      }}>
        <div style={{ maxWidth: '760px', margin: '0 auto', display: 'flex', gap: '10px', alignItems: 'flex-end' }}>
          <textarea
            ref={inputRef}
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading || !!pendingRoll}
            placeholder={pendingRoll ? "Completa la tirada para continuar..." : "¿Qué hace tu personaje...?"}
            rows={1}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              border: pendingRoll ? '1px solid rgba(212,175,55,0.3)' : '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '10px 14px',
              color: pendingRoll ? 'var(--text-muted)' : 'var(--text-primary)',
              fontSize: '14px',
              resize: 'none',
              outline: 'none',
              fontFamily: 'inherit',
              lineHeight: '1.5',
              maxHeight: '120px',
              scrollbarWidth: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(212,175,55,0.4)'}
            onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !inputText.trim() || !!pendingRoll}
            style={{
              width: '44px', height: '44px',
              borderRadius: '12px',
              background: (isLoading || !inputText.trim() || !!pendingRoll)
                ? 'rgba(255,255,255,0.05)'
                : 'linear-gradient(135deg, #d4af37, #92670a)',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: (isLoading || !inputText.trim() || !!pendingRoll) ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              flexShrink: 0,
            }}
          >
            <Send size={18} color={isLoading || !inputText.trim() ? 'rgba(255,255,255,0.2)' : 'black'} />
          </button>
        </div>
        <p style={{ textAlign: 'center', fontSize: '10px', color: 'var(--text-muted)', margin: '6px 0 0', opacity: 0.5 }}>
          Enter para enviar · Shift+Enter para nueva línea
        </p>
      </div>
    </div>
  );
}
