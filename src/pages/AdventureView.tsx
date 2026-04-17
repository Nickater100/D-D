import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Sword, Wand2, Zap, RotateCcw, ChevronRight, ChevronLeft, Scroll } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { useRoster } from '../store/useRoster';
import { useGameSession } from '../store/useGameSession';
import { buildSystemPrompt } from '../data/dmPrompt';
import { STARTER_SPELLS } from '../data/spells_es';

// ─── Gemini client (key from .env.local) ─────────────────────────────────────
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY as string;
const MODEL = 'gemini-2.0-flash';

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

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AdventureView() {
  const navigate = useNavigate();
  const { characters, activeCharacterId } = useRoster();
  const { messages, isLoading, addMessage, setLoading, startSession, clearSession } = useGameSession();

  const [inputText, setInputText] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const sessionStarted = useRef(false);

  const character = characters.find(c => c.id === activeCharacterId);
  const charSpells = character
    ? [...STARTER_SPELLS.cantrips, ...STARTER_SPELLS.level_1].filter(s => character.spells?.includes(s.id))
    : [];

  // Auto-scroll to latest message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, streamingText]);

  // ─── Send to Gemini ───────────────────────────────────────────────────────
  const sendToGemini = useCallback(async (userText: string | null, isOpening = false) => {
    if (!character) return;
    if (!API_KEY || API_KEY === 'undefined') {
      setError('⚠️ No se encontró la API Key. Verifica tu archivo .env.local (VITE_GEMINI_API_KEY).');
      return;
    }

    setError(null);
    setLoading(true);
    setStreamingText('');

    if (userText) {
      addMessage({ role: 'user', text: userText });
    }

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      // Build conversation history for Gemini
      const history = messages
        .filter(m => !isOpening)
        .map(m => ({
          role: m.role as 'user' | 'model',
          parts: [{ text: m.text }],
        }));

      const chat = ai.chats.create({
        model: MODEL,
        config: { systemInstruction: buildSystemPrompt(character) },
        history,
      });

      const prompt = isOpening
        ? 'Comienza la aventura con una apertura épica.'
        : userText ?? '';

      const stream = await chat.sendMessageStream({ message: prompt });

      let fullResponse = '';
      for await (const chunk of stream) {
        const chunkText = chunk.text ?? '';
        fullResponse += chunkText;
        setStreamingText(fullResponse);
      }

      addMessage({ role: 'model', text: fullResponse });
      setStreamingText('');
    } catch (err: any) {
      console.error('Gemini error:', err);
      setError(`Error del Narrador: ${err?.message ?? 'Algo salió mal. Intenta de nuevo.'}`);
    } finally {
      setLoading(false);
    }
  }, [character, messages, addMessage, setLoading]);

  // ─── Start session on mount ───────────────────────────────────────────────
  useEffect(() => {
    if (!character || sessionStarted.current) return;
    sessionStarted.current = true;
    startSession(character.id);
    sendToGemini(null, true);
  }, [character]);

  // ─── Handle player send ───────────────────────────────────────────────────
  const handleSend = () => {
    const text = inputText.trim();
    if (!text || isLoading) return;
    setInputText('');
    sendToGemini(text, false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleRestart = () => {
    sessionStarted.current = false;
    clearSession();
    setTimeout(() => {
      sessionStarted.current = true;
      startSession(character!.id);
      sendToGemini(null, true);
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
      {/* CSS for blink animation */}
      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
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
            {messages.map((msg, i) =>
              msg.role === 'model'
                ? <DmBubble key={i} text={msg.text} />
                : <PlayerBubble key={i} text={msg.text} />
            )}
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
        </div>
      </div>

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
            disabled={isLoading}
            placeholder="¿Qué hace tu personaje...?"
            rows={1}
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '12px',
              padding: '10px 14px',
              color: 'var(--text-primary)',
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
            disabled={isLoading || !inputText.trim()}
            style={{
              width: '44px', height: '44px',
              borderRadius: '12px',
              background: isLoading || !inputText.trim()
                ? 'rgba(255,255,255,0.05)'
                : 'linear-gradient(135deg, #d4af37, #92670a)',
              border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: isLoading || !inputText.trim() ? 'not-allowed' : 'pointer',
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
