import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CombatEncounter, CombatEntity } from '../types/dnd';

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
  playerHp: number;
  playerMaxHp: number;
  encounter?: CombatEncounter;
}

interface GameSessionState {
  sessions: Record<string, GameSession>;
  currentSessionId: string | null;
  isLoading: boolean;
  
  // Actions
  createSession: (characterName: string, characterId: string, hp: number, maxHp: number, moduleTitle: string, moduleId: string | null) => string | null;
  resumeSession: (sessionId: string) => void;
  deleteSession: (sessionId: string) => void;
  addMessage: (msg: Omit<ChatMessage, 'timestamp'>) => void;
  setLoading: (v: boolean) => void;
  clearCurrentSession: () => void;
  updateSessionHp: (amount: number) => void;

  // Combat Actions
  startCombat: (player: CombatEntity, enemies: Omit<CombatEntity, 'id' | 'initiative' | 'isPlayer'>[]) => void;
  nextTurn: () => void;
  damageEntity: (entityId: string, amount: number) => void;
  endCombat: () => void;
}

export const useGameSession = create<GameSessionState>()(
  persist(
    (set, get) => ({
      sessions: {},
      currentSessionId: null,
      isLoading: false,

      createSession: (characterName, characterId, hp, maxHp, moduleTitle, moduleId) => {
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
          updatedAt: Date.now(),
          playerHp: hp,
          playerMaxHp: maxHp
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

      updateSessionHp: (amount) => {
        const currentId = get().currentSessionId;
        if (!currentId) return;

        set((state) => {
          const session = state.sessions[currentId];
          if (!session) return state;

          const updatedSession: GameSession = {
            ...session,
            playerHp: Math.max(0, Math.min(session.playerMaxHp, session.playerHp + amount)),
            updatedAt: Date.now()
          };

          return {
            sessions: { ...state.sessions, [currentId]: updatedSession }
          };
        });
      },

      startCombat: (player, enemies) => {
        const currentId = get().currentSessionId;
        if (!currentId) return;

        // Roll initiatives
        const roll = (mod: number = 0) => Math.floor(Math.random() * 20) + 1 + mod;

        const combatants: CombatEntity[] = [
          { ...player, initiative: roll() }, // Assuming dex mod is already in roll result or passed
          ...enemies.map((e, index) => ({
            ...e,
            id: `enemy-${index}-${Date.now()}`,
            isPlayer: false,
            initiative: roll(),
            type: 'enemy' as const
          }))
        ].sort((a, b) => b.initiative - a.initiative);

        set((state) => {
          const session = state.sessions[currentId];
          if (!session) return state;

          const updatedSession: GameSession = {
            ...session,
            encounter: {
              isActive: true,
              turnIndex: 0,
              round: 1,
              entities: combatants
            }
          };

          return {
            sessions: { ...state.sessions, [currentId]: updatedSession }
          };
        });
      },

      nextTurn: () => {
        const currentId = get().currentSessionId;
        if (!currentId) return;

        set((state) => {
          const session = state.sessions[currentId];
          if (!session?.encounter) return state;

          const { turnIndex, entities, round } = session.encounter;
          let nextIndex = turnIndex;
          let nextRound = round;
          let foundNext = false;

          // Find next conscious combatant
          for (let i = 1; i <= entities.length; i++) {
            const checkIndex = (turnIndex + i) % entities.length;
            const entity = entities[checkIndex];
            
            // Player always gets a turn (even at 0 HP for death saves)
            // Enemies only get a turn if they have HP > 0
            if (entity.isPlayer || entity.hp > 0) {
              nextIndex = checkIndex;
              if (checkIndex < turnIndex) nextRound += 1;
              foundNext = true;
              break;
            }
          }

          if (!foundNext) return state; // Should not happen if encounter is active

          const updatedSession: GameSession = {
            ...session,
            encounter: {
              ...session.encounter,
              turnIndex: nextIndex,
              round: nextRound
            }
          };

          return {
            sessions: { ...state.sessions, [currentId]: updatedSession }
          };
        });
      },

      damageEntity: (entityId, amount) => {
        const currentId = get().currentSessionId;
        if (!currentId) return;

        set((state) => {
          const session = state.sessions[currentId];
          if (!session?.encounter) return state;

          let playerDamage = 0;
          const updatedEntities = session.encounter.entities.map(e => {
            if (e.id === entityId) {
              const newHp = Math.max(0, e.hp - amount);
              if (e.isPlayer) playerDamage = amount;
              return { ...e, hp: newHp };
            }
            return e;
          });

          const updatedSession: GameSession = {
            ...session,
            playerHp: playerDamage > 0 
              ? Math.max(0, session.playerHp - playerDamage)
              : session.playerHp,
            encounter: {
              ...session.encounter,
              entities: updatedEntities
            }
          };

          return {
            sessions: { ...state.sessions, [currentId]: updatedSession }
          };
        });
      },

      endCombat: () => {
        const currentId = get().currentSessionId;
        if (!currentId) return;

        set((state) => {
          const session = state.sessions[currentId];
          if (!session) return state;

          const updatedSession: GameSession = {
            ...session,
            encounter: undefined
          };

          return {
            sessions: { ...state.sessions, [currentId]: updatedSession }
          };
        });
      }
    }),
    {
      name: 'dnd-ai-master-sessions-v2',
    }
  )
);
