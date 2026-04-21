import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Character, Item } from '../types/dnd';
import { calculateAC } from '../utils/statsUtils';
import { getMulticlassSpellSlots } from '../utils/multiclassUtils';

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
  addXp: (charId: string, amount: number) => void;
  addFeatureToCharacter: (charId: string, feature: any) => void;
  addMulticlassLevel: (charId: string, classId: string, className: string) => void;
  setActiveCharacter: (id: string | null) => void;

  // Adventuring Actions (Cap. 8)
  longRest: (charId: string) => void;
  shortRest: (charId: string, dieType: number, amount: number) => void;
  addCondition: (charId: string, conditionId: string) => void;
  removeCondition: (charId: string, conditionId: string) => void;
  setExhaustion: (charId: string, level: number) => void;
  updateHp: (charId: string, amount: number) => void;
  addDeathSaveSuccess: (charId: string) => void;
  addDeathSaveFailure: (charId: string, amount: number) => void;
  resetDeathSaves: (charId: string) => void;
  
  // Magic Actions (Cap. 10)
  useSpellSlot: (charId: string, level: number) => void;
  prepareSpell: (charId: string, spellId: string) => void;
  unprepareSpell: (charId: string, spellId: string) => void;
  setConcentration: (charId: string, spellId: string | null) => void;
  levelUp: (charId: string) => void;
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

          const updatedChar = { ...c, equipment };
          updatedChar.ac = calculateAC(updatedChar);
          return updatedChar;
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
          const updatedChar = { ...c, equipment };
          updatedChar.ac = calculateAC(updatedChar);
          return updatedChar;
        })
      })),
    unequipItem: (charId, slot) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId || !c.equipment) return c;
          const equipment = { ...c.equipment };
          delete (equipment as any)[slot];
          const updatedChar = { ...c, equipment };
          updatedChar.ac = calculateAC(updatedChar);
          return updatedChar;
        })
      })),
    addXp: (charId, amount) =>
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === charId ? { ...c, xp: (c.xp || 0) + amount } : c
        ),
      })),
    addFeatureToCharacter: (charId, feature) =>
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === charId ? { ...c, features: [...(c.features || []), feature] } : c
        ),
      })),
    levelUp: (charId: string) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId) return c;
          
          // Increment first class level (default behavior)
          const updatedClasses = [...c.classes];
          if (updatedClasses[0]) {
            updatedClasses[0].level += 1;
          }

          const nextLevel = c.level + 1;
          const hpGain = Math.floor(Math.random() * 8) + 3;

          const { shared, warlock } = getMulticlassSpellSlots(updatedClasses);

          const updatedChar: Character = {
            ...c,
            classes: updatedClasses,
            level: nextLevel,
            maxHp: c.maxHp + hpGain,
            hp: c.maxHp + hpGain,
            spellSlots: shared,
            currentSpellSlots: shared,
            warlockSlots: warlock,
            currentWarlockSlots: warlock?.count || 0
          };
          return updatedChar;
        }),
      })),
    addMulticlassLevel: (charId, classId, className) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId) return c;
          
          const updatedClasses = [...c.classes];
          const existing = updatedClasses.find(cl => cl.classId === classId);
          
          if (existing) {
            existing.level += 1;
          } else {
            updatedClasses.push({ classId, name: className, level: 1 });
          }

          const nextLevel = c.level + 1;
          const hpGain = 5; // Simplified for multiclass
          
          const { shared, warlock } = getMulticlassSpellSlots(updatedClasses);

          const updatedChar: Character = {
            ...c,
            classes: updatedClasses,
            level: nextLevel,
            maxHp: c.maxHp + hpGain,
            hp: c.maxHp + hpGain,
            spellSlots: shared,
            currentSpellSlots: shared,
            warlockSlots: warlock,
            currentWarlockSlots: warlock?.count || 0
          };
          return updatedChar;
        })
      })),
    setActiveCharacter: (id) => set({ activeCharacterId: id }),

    longRest: (charId) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId) return c;
          
          // 1. Recover HP
          const updatedChar = { ...c, hp: c.maxHp };
          
          // 2. Recover Spell Slots
          const { shared, warlock } = getMulticlassSpellSlots(c.classes);
          updatedChar.spellSlots = shared;
          updatedChar.currentSpellSlots = shared;
          updatedChar.warlockSlots = warlock;
          updatedChar.currentWarlockSlots = warlock?.count || 0;
          
          updatedChar.concentration = null;
          
          // 3. Recover Exhaustion (1 level per long rest)
          updatedChar.exhaustion = Math.max(0, (c.exhaustion || 0) - 1);
          
          // 4. Recover Hit Dice (half max)
          updatedChar.hitDice = (c.hitDice || []).map(hd => ({
            ...hd,
            current: Math.min(hd.max, hd.current + Math.floor(hd.max / 2) || 1)
          }));
          
          return updatedChar;
        })
      })),

    shortRest: (charId, dieType, amount) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId) return c;
          
          const hdIndex = (c.hitDice || []).findIndex(hd => hd.type === dieType);
          if (hdIndex === -1 || c.hitDice[hdIndex].current < amount) return c;
          
          const newHitDice = [...c.hitDice];
          newHitDice[hdIndex] = { ...newHitDice[hdIndex], current: newHitDice[hdIndex].current - amount };
          
          const conMod = Math.floor(((c.attributes.con || 10) - 10) / 2);
          const healAmount = amount * (Math.floor(dieType / 2) + 1 + conMod);
          
          return {
            ...c,
            hp: Math.min(c.maxHp, c.hp + healAmount),
            hitDice: newHitDice,
            // Warlocks recover slots on short rest
            currentWarlockSlots: c.warlockSlots?.count || 0
          };
        })
      })),

    addCondition: (charId, conditionId) =>
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === charId && !(c.conditions || []).includes(conditionId)
            ? { ...c, conditions: [...(c.conditions || []), conditionId] }
            : c
        )
      })),

    removeCondition: (charId, conditionId) =>
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === charId
            ? { ...c, conditions: (c.conditions || []).filter(id => id !== conditionId) }
            : c
        )
      })),

    setExhaustion: (charId, level) =>
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === charId ? { ...c, exhaustion: Math.min(6, Math.max(0, level)) } : c
        )
      })),

    updateHp: (charId, amount) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId) return c;
          const newHp = Math.max(0, Math.min(c.maxHp, (c.hp || 0) + amount));
          // Reset death saves if healing from 0
          const shouldReset = c.hp === 0 && newHp > 0;
          
          // Concentration Check if damage
          let concentration = c.concentration;
          if (amount < 0 && concentration) {
            // Logic for auto-break or manual check will be in UI, 
            // but here we can at least flag it or let UI handle the visual trigger.
            // For now, we keep it as is, AdventureView will trigger the check.
          }

          return { 
            ...c, 
            hp: newHp,
            deathSaves: shouldReset ? { success: 0, failure: 0 } : c.deathSaves
          };
        }),
      })),

    addDeathSaveSuccess: (charId) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId) return c;
          const current = c.deathSaves || { success: 0, failure: 0 };
          return { ...c, deathSaves: { ...current, success: Math.min(3, current.success + 1) } };
        }),
      })),

    addDeathSaveFailure: (charId, amount) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId) return c;
          const current = c.deathSaves || { success: 0, failure: 0 };
          return { ...c, deathSaves: { ...current, failure: Math.min(3, current.failure + amount) } };
        }),
      })),

    resetDeathSaves: (charId) =>
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === charId ? { ...c, deathSaves: { success: 0, failure: 0 } } : c
        ),
      })),

    useSpellSlot: (charId, level) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId) return c;
          if (level === 0) return c; // Cantrips
          
          if (c.warlockSlots && level === c.warlockSlots.level) {
            return { ...c, currentWarlockSlots: Math.max(0, (c.currentWarlockSlots || 0) - 1) };
          }
          
          const slots = { ...(c.currentSpellSlots || {}) };
          if (!slots[level]) return c;
          slots[level] = Math.max(0, slots[level] - 1);
          return { ...c, currentSpellSlots: slots };
        }),
      })),

    prepareSpell: (charId, spellId) =>
      set((state) => ({
        characters: state.characters.map((c) => {
          if (c.id !== charId) return c;
          
          // Limit Check (Official Rule: Level + Ability Mod)
          const casterClass = c.classes.find(cl => ['cleric', 'druid', 'wizard', 'paladin'].includes(cl.classId));
          if (!casterClass) return { ...c, preparedSpells: [...(c.preparedSpells || []), spellId] };
          
          const primaryAttr = casterClass.classId === 'wizard' ? c.attributes.int : 
                             casterClass.classId === 'paladin' ? c.attributes.cha : c.attributes.wis;
          const mod = Math.floor((primaryAttr - 10) / 2);
          const limit = Math.max(1, (casterClass.classId === 'paladin' ? Math.floor(casterClass.level / 2) : casterClass.level) + mod);
          
          const current = c.preparedSpells || [];
          if (current.length >= limit) return c; // Limit reached
          
          if (current.includes(spellId)) return c;
          return { ...c, preparedSpells: [...current, spellId] };
        }),
      })),

    unprepareSpell: (charId, spellId) =>
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === charId 
            ? { ...c, preparedSpells: (c.preparedSpells || []).filter(id => id !== spellId) } 
            : c
        ),
      })),

    setConcentration: (charId, spellId) =>
      set((state) => ({
        characters: state.characters.map((c) =>
          c.id === charId ? { ...c, concentration: spellId ? { spellId, dc: 10 } : null } : c
        ),
      })),
    }),
    {
      name: 'dnd-roster-storage-v2',
    }
  )
);
