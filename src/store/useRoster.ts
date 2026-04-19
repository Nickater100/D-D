import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character, Item } from '../types/dnd';

interface RosterState {
  characters: Character[];
  activeCharacterId: string | null;
  addCharacter: (char: Character) => void;
  deleteCharacter: (id: string) => void;
  addItemToCharacter: (charId: string, item: Item) => void;
  removeItemFromCharacter: (charId: string, itemId: string) => void;
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
      addItemToCharacter: (charId, item) =>
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === charId ? { ...c, inventory: [...(c.inventory || []), item] } : c
        ),
      })),
    removeItemFromCharacter: (charId, itemId) =>
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === charId
            ? { ...c, inventory: (c.inventory || []).filter((i) => i.id !== itemId) }
            : c
        ),
      })),
    setActiveCharacter: (id) => set({ activeCharacterId: id }),
    }),
    {
      name: 'dnd-roster-storage',
    }
  )
);
