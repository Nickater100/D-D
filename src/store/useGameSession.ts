import { create } from 'zustand';

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}

interface GameSessionState {
  messages: ChatMessage[];
  isLoading: boolean;
  sessionCharacterId: string | null;
  addMessage: (msg: Omit<ChatMessage, 'timestamp'>) => void;
  setLoading: (v: boolean) => void;
  startSession: (characterId: string) => void;
  clearSession: () => void;
}

export const useGameSession = create<GameSessionState>((set) => ({
  messages: [],
  isLoading: false,
  sessionCharacterId: null,

  addMessage: (msg) =>
    set((state) => ({
      messages: [...state.messages, { ...msg, timestamp: Date.now() }],
    })),

  setLoading: (v) => set({ isLoading: v }),

  startSession: (characterId) =>
    set({ sessionCharacterId: characterId, messages: [], isLoading: false }),

  clearSession: () =>
    set({ messages: [], isLoading: false, sessionCharacterId: null }),
}));
