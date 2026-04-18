import { create } from 'zustand';

export interface ChatMessage {
  role: 'user' | 'model' | 'system';
  text: string;
  timestamp: number;
}

interface GameSessionState {
  messages: ChatMessage[];
  isLoading: boolean;
  sessionCharacterId: string | null;
  activeModuleId: string | null;
  addMessage: (msg: Omit<ChatMessage, 'timestamp'>) => void;
  setLoading: (v: boolean) => void;
  startSession: (characterId: string, moduleId?: string | null) => void;
  clearSession: () => void;
}

export const useGameSession = create<GameSessionState>((set) => ({
  messages: [],
  isLoading: false,
  sessionCharacterId: null,
  activeModuleId: null,

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, { ...msg, timestamp: Date.now() }],
    })),

  setLoading: (v) => set({ isLoading: v }),

  startSession: (characterId, moduleId = null) =>
    set({ sessionCharacterId: characterId, activeModuleId: moduleId, messages: [], isLoading: false }),

  clearSession: () =>
    set({ messages: [], isLoading: false, sessionCharacterId: null }),
}));
