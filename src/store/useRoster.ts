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
  equipItem: (charId: string, itemId: string) => void;
  equipItemInSlot: (charId: string, itemId: string, slot: string) => void;
  unequipItem: (charId: string, slot: string) => void;
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
    equipItem: (charId, itemId) =>
      set((state) => {
        const characters = state.characters.map((c) => {
          if (c.id !== charId) return c;
          
          const item = (c.inventory || []).find(i => i.id === itemId);
          if (!item) return c;

          const equipment = { ...(c.equipment || {}) };
          const properties = item.properties || [];
          const name = item.name.toLowerCase();

          // Helper to find slot
          let targetSlot: any = null;
          
          // Enhanced subtype detection
          const subtype = item.subtype || (
            name.includes('espada') || name.includes('daga') || name.includes('hacha') || name.includes('arco') ? 'arma' :
            name.includes('escudo') ? 'escudo' :
            name.includes('armadura') || name.includes('cota') ? 'armadura' :
            name.includes('casco') || name.includes('yelmo') ? 'casco' : 'otro'
          );

          switch (subtype) {
            case 'casco': targetSlot = 'head'; break;
            case 'capa': targetSlot = 'cloak'; break;
            case 'armadura': targetSlot = 'torso'; break;
            case 'guantes': targetSlot = 'gloves'; break;
            case 'botas': targetSlot = 'boots'; break;
            case 'amuleto': targetSlot = 'amulet'; break;
            case 'anillo': targetSlot = equipment.ring1 ? 'ring2' : 'ring1'; break;
            case 'arma': 
              if (properties.includes('distancia')) {
                targetSlot = 'ranged';
              } else if (properties.includes('dos-manos')) {
                targetSlot = 'mainHand';
                delete (equipment as any).offHand; // Clear offhand for 2H
              } else {
                targetSlot = 'mainHand';
              }
              break;
            case 'escudo':
              // Can't equip shield if holding 2H weapon
              const mainWeapon = (c.inventory || []).find(i => i.id === equipment.mainHand);
              if (mainWeapon?.properties?.includes('dos-manos')) {
                delete (equipment as any).mainHand;
              }
              targetSlot = 'offHand';
              break;
          }

          if (targetSlot) {
            // Check for dual wielding (only if both are sutil)
            if (targetSlot === 'mainHand' && subtype === 'arma' && !properties.includes('dos-manos')) {
               const offItem = (c.inventory || []).find(i => i.id === (equipment as any).offHand);
               if (offItem && offItem.subtype === 'arma' && (!properties.includes('sutil') || !offItem.properties?.includes('sutil'))) {
                 delete (equipment as any).offHand;
               }
            }
            (equipment as any)[targetSlot] = itemId;
          }

          return { ...c, equipment };
        });
        return { characters };
      }),
    equipItemInSlot: (charId, itemId, slot) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId) return c;
          const equipment = { ...(c.equipment || {}) };
          
          // Basic validation for 2-hands
          const item = (c.inventory || []).find(i => i.id === itemId);
          if (slot === 'mainHand' && item?.properties?.includes('dos-manos')) {
            delete (equipment as any).offHand;
          }
          if (slot === 'offHand') {
            const mainId = (equipment as any).mainHand;
            const mainItem = (c.inventory || []).find(i => i.id === mainId);
            if (mainItem?.properties?.includes('dos-manos')) {
              delete (equipment as any).mainHand;
            }
          }

          (equipment as any)[slot] = itemId;
          return { ...c, equipment };
        })
      })),
    unequipItem: (charId, slot) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId || !c.equipment) return c;
          const equipment = { ...c.equipment };
          delete (equipment as any)[slot];
          return { ...c, equipment };
        })
      })),
    setActiveCharacter: (id) => set({ activeCharacterId: id }),
    }),
    {
      name: 'dnd-roster-storage',
    }
  )
);
