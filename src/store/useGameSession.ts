import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
}

export interface GameSession {
  id: string;
  name: string;
  characterId: string;
  moduleId: string | null;
  messages: ChatMessage[];
  updatedAt: number;
}

interface GameSessionState {
  sessions: Record<string, GameSession>;
  currentSessionId: string | null;
  isLoading: boolean;
  
  // Actions
  createSession: (characterName: string, characterId: string, moduleTitle: string, moduleId: string | null) => string | null;
  resumeSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  addMessage: (msg: Omit<ChatMessage, 'timestamp'>) => void;
  setLoading: (v: boolean) => void;
  clearCurrentSession: () => void;
}

export const useGameSession = create<GameSessionState>()(
  persist(
    (set, get) => ({
      sessions: {},
      currentSessionId: null,
      isLoading: false,

      createSession: (characterName, characterId, moduleTitle, moduleId) => {
        const sessions = get().sessions;
        const sessionCount = Object.keys(sessions).length;

        if (sessionCount >= 5) {
          return null;
        }

        const id = typeof crypto.randomUUID === 'function' 
          ? crypto.randomUUID() 
          : Math.random().toString(36).substring(2, 15);
        const date = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'short' });
        const name = `${characterName} en ${moduleTitle} - ${date}`;

        const newSession: GameSession = {
          id,
          name,
          characterId,
          moduleId,
          messages: [],
          updatedAt: Date.now()
        };

        set((state) => ({
          sessions: { ...state.sessions, [id]: newSession },
          currentSessionId: id
        }));

        return id;
      },

      resumeSession: (sessionId) => {
        set({ currentSessionId: sessionId });
      },

      deleteSession: (sessionId) => {
        set((state) => {
          const newSessions = { ...state.sessions };
          delete newSessions[sessionId];
          return {
            sessions: newSessions,
            currentSessionId: state.currentSessionId === sessionId ? null : state.currentSessionId
          };
        });
      },

      addMessage: (msg) => {
        const currentId = get().currentSessionId;
        if (!currentId) return;

        set((state) => {
          const session = state.sessions[currentId];
          if (!session) return state;

          const updatedSession: GameSession = {
            ...session,
            messages: [...session.messages, { ...msg, timestamp: Date.now() }],
            updatedAt: Date.now()
          };

          return {
            sessions: { ...state.sessions, [currentId]: updatedSession }
          };
        });
      },

      setLoading: (v) => set({ isLoading: v }),

      clearCurrentSession: () => set({ currentSessionId: null, isLoading: false }),
    }),
    {
      name: 'dnd-ai-master-sessions',
    }
  )
);
