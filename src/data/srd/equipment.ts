export type ItemCategory = 'weapon' | 'armor' | 'gear' | 'pack' | 'tool';
export type WeaponType = 'simple_melee' | 'simple_ranged' | 'martial_melee' | 'martial_ranged';
export type ArmorType = 'light' | 'medium' | 'heavy' | 'shield';

export interface EquipmentDefinition {
  id: string;
  name: string;
  category: ItemCategory;
  cost: number; // In GP
  weight: number; // In lb
  description?: string;
  
  // For Weapons
  weaponType?: WeaponType;
  damage?: { dice: string; type: string }; // "1d6", "piercing"
  properties?: string[]; // "finesse", "light", "thrown", "two-handed", "versatile", "ammunition"

  // For Armor
  armorType?: ArmorType;
  acBase?: number;
  stealthDisadvantage?: boolean;
  strRequirement?: number;

  // For Packs
  bundleItems?: { id: string; quantity: number }[];
}

export const SRD_EQUIPMENT: Record<string, EquipmentDefinition> = {
  // --- WEAPONS ---
  dagger: { id: 'dagger', name: 'Daga', category: 'weapon', cost: 2, weight: 1, weaponType: 'simple_melee', damage: { dice: '1d4', type: 'perforante' }, properties: ['finesse', 'light', 'thrown (20/60)'] },
  mace: { id: 'mace', name: 'Maza', category: 'weapon', cost: 5, weight: 4, weaponType: 'simple_melee', damage: { dice: '1d6', type: 'contundente' }, properties: [] },
  quarterstaff: { id: 'quarterstaff', name: 'Bastón', category: 'weapon', cost: 0.2, weight: 4, weaponType: 'simple_melee', damage: { dice: '1d6', type: 'contundente' }, properties: ['versatile (1d8)'] },
  javelin: { id: 'javelin', name: 'Jabalina', category: 'weapon', cost: 0.5, weight: 2, weaponType: 'simple_melee', damage: { dice: '1d6', type: 'perforante' }, properties: ['thrown (30/120)'] },
  light_crossbow: { id: 'light_crossbow', name: 'Ballesta ligera', category: 'weapon', cost: 25, weight: 5, weaponType: 'simple_ranged', damage: { dice: '1d8', type: 'perforante' }, properties: ['ammunition (80/320)', 'loading', 'two-handed'] },
  shortbow: { id: 'shortbow', name: 'Arco corto', category: 'weapon', cost: 25, weight: 2, weaponType: 'simple_ranged', damage: { dice: '1d6', type: 'perforante' }, properties: ['ammunition (80/320)', 'two-handed'] },
  
  battleaxe: { id: 'battleaxe', name: 'Hacha de batalla', category: 'weapon', cost: 10, weight: 4, weaponType: 'martial_melee', damage: { dice: '1d8', type: 'cortante' }, properties: ['versatile (1d10)'] },
  greataxe: { id: 'greataxe', name: 'Gran hacha', category: 'weapon', cost: 30, weight: 7, weaponType: 'martial_melee', damage: { dice: '1d12', type: 'cortante' }, properties: ['heavy', 'two-handed'] },
  longsword: { id: 'longsword', name: 'Espada larga', category: 'weapon', cost: 15, weight: 3, weaponType: 'martial_melee', damage: { dice: '1d8', type: 'cortante' }, properties: ['versatile (1d10)'] },
  shortsword: { id: 'shortsword', name: 'Espada corta', category: 'weapon', cost: 10, weight: 2, weaponType: 'martial_melee', damage: { dice: '1d6', type: 'perforante' }, properties: ['finesse', 'light'] },
  rapier: { id: 'rapier', name: 'Estoque', category: 'weapon', cost: 25, weight: 2, weaponType: 'martial_melee', damage: { dice: '1d8', type: 'perforante' }, properties: ['finesse'] },
  warhammer: { id: 'warhammer', name: 'Martillo de guerra', category: 'weapon', cost: 15, weight: 2, weaponType: 'martial_melee', damage: { dice: '1d8', type: 'contundente' }, properties: ['versatile (1d10)'] },
  longbow: { id: 'longbow', name: 'Arco largo', category: 'weapon', cost: 50, weight: 2, weaponType: 'martial_ranged', damage: { dice: '1d8', type: 'perforante' }, properties: ['ammunition (150/600)', 'heavy', 'two-handed'] },

  // --- ARMORS ---
  leather_armor: { id: 'leather_armor', name: 'Armadura de cuero', category: 'armor', cost: 10, weight: 10, armorType: 'light', acBase: 11 },
  studded_leather: { id: 'studded_leather', name: 'Cuero tachonado', category: 'armor', cost: 45, weight: 13, armorType: 'light', acBase: 12 },
  scale_mail: { id: 'scale_mail', name: 'Cota de escamas', category: 'armor', cost: 50, weight: 45, armorType: 'medium', acBase: 14, stealthDisadvantage: true },
  chain_mail: { id: 'chain_mail', name: 'Cota de malla', category: 'armor', cost: 75, weight: 55, armorType: 'heavy', acBase: 16, stealthDisadvantage: true, strRequirement: 13 },
  shield: { id: 'shield', name: 'Escudo', category: 'armor', cost: 10, weight: 6, armorType: 'shield', acBase: 2 },

  // --- PACKS (Bundle items) ---
  explorers_pack: { 
    id: 'explorers_pack', name: 'Pack de Explorador', category: 'pack', cost: 10, weight: 59, 
    bundleItems: [{ id: 'backpack', quantity: 1 }, { id: 'bedroll', quantity: 1 }, { id: 'mess_kit', quantity: 1 }, { id: 'tinderbox', quantity: 1 }, { id: 'torch', quantity: 10 }, { id: 'rations', quantity: 10 }, { id: 'waterskin', quantity: 1 }, { id: 'hempen_rope', quantity: 1 }]
  },
  dungeoneers_pack: { 
    id: 'dungeoneers_pack', name: 'Pack de Explorador de Mazmorras', category: 'pack', cost: 12, weight: 61.5, 
    bundleItems: [{ id: 'backpack', quantity: 1 }, { id: 'crowbar', quantity: 1 }, { id: 'hammer', quantity: 1 }, { id: 'piton', quantity: 10 }, { id: 'torch', quantity: 10 }, { id: 'tinderbox', quantity: 1 }, { id: 'rations', quantity: 10 }, { id: 'waterskin', quantity: 1 }, { id: 'hempen_rope', quantity: 1 }]
  },
  priests_pack: { 
    id: 'priests_pack', name: 'Pack de Sacerdote', category: 'pack', cost: 19, weight: 25, 
    bundleItems: [{ id: 'backpack', quantity: 1 }, { id: 'blanket', quantity: 1 }, { id: 'candle', quantity: 10 }, { id: 'tinderbox', quantity: 1 }, { id: 'alms_box', quantity: 1 }, { id: 'incense', quantity: 2 }, { id: 'censer', quantity: 1 }, { id: 'vestments', quantity: 1 }, { id: 'rations', quantity: 2 }, { id: 'waterskin', quantity: 1 }]
  },
  scholars_pack: { 
    id: 'scholars_pack', name: 'Pack de Erudito', category: 'pack', cost: 40, weight: 10, 
    bundleItems: [{ id: 'backpack', quantity: 1 }, { id: 'book_of_lore', quantity: 1 }, { id: 'ink_bottle', quantity: 1 }, { id: 'ink_pen', quantity: 1 }, { id: 'parchment', quantity: 10 }, { id: 'little_bag_of_sand', quantity: 1 }, { id: 'small_knife', quantity: 1 }]
  },

  // --- GEAR & TOOLS ---
  holy_symbol: { id: 'holy_symbol', name: 'Símbolo Sagrado', category: 'gear', cost: 5, weight: 1 },
  thieves_tools: { id: 'thieves_tools', name: 'Herramientas de Ladrón', category: 'tool', cost: 25, weight: 1 },
  spellbook: { id: 'spellbook', name: 'Grimorio (Libro de conjuros)', category: 'gear', cost: 50, weight: 3 },
  arrows_20: { id: 'arrows_20', name: 'Carcaj con 20 flechas', category: 'gear', cost: 1, weight: 1 },
  crossbow_bolts_20: { id: 'crossbow_bolts_20', name: 'Caja con 20 virotes', category: 'gear', cost: 1, weight: 1 }
};
