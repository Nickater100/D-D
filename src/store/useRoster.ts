import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character } from '../types/dnd';

interface RosterState {
  characters: Character[];
  activeCharacterId: string | null;
  addCharacter: (char: Character) => void;
  deleteCharacter: (id: string) => void;
  setActiveCharacter: (id: string | null) => void;
}

export const useRoster = create<RosterState>()(
  persist(
    (set) => ({
      characters: [],
      activeCharacterId: null,
      addCharacter: (char) =>
        set((state) => ({ characters: [...state.characters, char] })),
      deleteCharacter: (id) =>
        set((state) => ({
          characters: state.characters.filter((c) => c.id !== id),
          activeCharacterId: state.activeCharacterId === id ? null : state.activeCharacterId,
        })),
      setActiveCharacter: (id) => set({ activeCharacterId: id }),
    }),
    {
      name: 'dnd-roster-storage',
    }
  )
);
