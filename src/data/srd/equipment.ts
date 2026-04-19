export type ItemCategory = 'weapon' | 'armor' | 'gear' | 'pack' | 'tool';
export type WeaponType = 'simple_melee' | 'simple_ranged' | 'martial_melee' | 'martial_ranged';
export type ArmorType = 'light' | 'medium' | 'heavy' | 'shield';
export type DamageType = 'contundente' | 'perforante' | 'cortante';

export interface EquipmentDefinition {
  id: string;
  name: string;
  category: ItemCategory;
  cost: number;    // In GP
  weight: number;  // In lb
  description?: string;

  // For Weapons
  weaponType?: WeaponType;
  damage?: { dice: string; type: DamageType };
  versatileDamage?: string;  // e.g. "1d10" when used two-handed
  properties?: string[];     // 'finesse'|'light'|'thrown'|'two-handed'|'heavy'|'reach'|'loading'|'ammunition'

  // For Armor
  armorType?: ArmorType;
  acBase?: number;
  stealthDisadvantage?: boolean;
  strRequirement?: number;

  // For Packs
  bundleItems?: { id: string; quantity: number }[];
}

export const SRD_EQUIPMENT: Record<string, EquipmentDefinition> = {

  // ============================================================
  // ARMAS SIMPLES — CUERPO A CUERPO
  // ============================================================
  club: {
    id: 'club', name: 'Clava', category: 'weapon', cost: 0.1, weight: 2,
    weaponType: 'simple_melee', damage: { dice: '1d4', type: 'contundente' },
    properties: ['light']
  },
  dagger: {
    id: 'dagger', name: 'Daga', category: 'weapon', cost: 2, weight: 1,
    weaponType: 'simple_melee', damage: { dice: '1d4', type: 'perforante' },
    properties: ['finesse', 'light', 'thrown (20/60)']
  },
  greatclub: {
    id: 'greatclub', name: 'Gran Clava', category: 'weapon', cost: 0.2, weight: 10,
    weaponType: 'simple_melee', damage: { dice: '1d8', type: 'contundente' },
    properties: ['two-handed']
  },
  handaxe: {
    id: 'handaxe', name: 'Hacha de mano', category: 'weapon', cost: 5, weight: 2,
    weaponType: 'simple_melee', damage: { dice: '1d6', type: 'cortante' },
    properties: ['light', 'thrown (20/60)']
  },
  javelin: {
    id: 'javelin', name: 'Jabalina', category: 'weapon', cost: 0.5, weight: 2,
    weaponType: 'simple_melee', damage: { dice: '1d6', type: 'perforante' },
    properties: ['thrown (30/120)']
  },
  light_hammer: {
    id: 'light_hammer', name: 'Martillo ligero', category: 'weapon', cost: 2, weight: 2,
    weaponType: 'simple_melee', damage: { dice: '1d4', type: 'contundente' },
    properties: ['light', 'thrown (20/60)']
  },
  mace: {
    id: 'mace', name: 'Maza', category: 'weapon', cost: 5, weight: 4,
    weaponType: 'simple_melee', damage: { dice: '1d6', type: 'contundente' },
    properties: []
  },
  quarterstaff: {
    id: 'quarterstaff', name: 'Bastón', category: 'weapon', cost: 0.2, weight: 4,
    weaponType: 'simple_melee', damage: { dice: '1d6', type: 'contundente' },
    versatileDamage: '1d8', properties: ['versatile']
  },
  sickle: {
    id: 'sickle', name: 'Hoz', category: 'weapon', cost: 1, weight: 2,
    weaponType: 'simple_melee', damage: { dice: '1d4', type: 'cortante' },
    properties: ['light']
  },
  spear: {
    id: 'spear', name: 'Lanza', category: 'weapon', cost: 1, weight: 3,
    weaponType: 'simple_melee', damage: { dice: '1d6', type: 'perforante' },
    versatileDamage: '1d8', properties: ['thrown (20/60)', 'versatile']
  },

  // ============================================================
  // ARMAS SIMPLES — A DISTANCIA
  // ============================================================
  dart: {
    id: 'dart', name: 'Dardo', category: 'weapon', cost: 0.05, weight: 0.25,
    weaponType: 'simple_ranged', damage: { dice: '1d4', type: 'perforante' },
    properties: ['finesse', 'thrown (20/60)']
  },
  shortbow: {
    id: 'shortbow', name: 'Arco corto', category: 'weapon', cost: 25, weight: 2,
    weaponType: 'simple_ranged', damage: { dice: '1d6', type: 'perforante' },
    properties: ['ammunition (80/320)', 'two-handed']
  },
  sling: {
    id: 'sling', name: 'Honda', category: 'weapon', cost: 0.1, weight: 0,
    weaponType: 'simple_ranged', damage: { dice: '1d4', type: 'contundente' },
    properties: ['ammunition (30/120)']
  },
  light_crossbow: {
    id: 'light_crossbow', name: 'Ballesta ligera', category: 'weapon', cost: 25, weight: 5,
    weaponType: 'simple_ranged', damage: { dice: '1d8', type: 'perforante' },
    properties: ['ammunition (80/320)', 'loading', 'two-handed']
  },
  hand_crossbow: {
    id: 'hand_crossbow', name: 'Ballesta de mano', category: 'weapon', cost: 75, weight: 3,
    weaponType: 'simple_ranged', damage: { dice: '1d6', type: 'perforante' },
    properties: ['ammunition (30/120)', 'light', 'loading']
  },

  // ============================================================
  // ARMAS MARCIALES — CUERPO A CUERPO
  // ============================================================
  battleaxe: {
    id: 'battleaxe', name: 'Hacha de batalla', category: 'weapon', cost: 10, weight: 4,
    weaponType: 'martial_melee', damage: { dice: '1d8', type: 'cortante' },
    versatileDamage: '1d10', properties: ['versatile']
  },
  flail: {
    id: 'flail', name: 'Mangual', category: 'weapon', cost: 10, weight: 2,
    weaponType: 'martial_melee', damage: { dice: '1d8', type: 'contundente' },
    properties: []
  },
  glaive: {
    id: 'glaive', name: 'Guja', category: 'weapon', cost: 20, weight: 6,
    weaponType: 'martial_melee', damage: { dice: '1d10', type: 'cortante' },
    properties: ['heavy', 'reach', 'two-handed']
  },
  greataxe: {
    id: 'greataxe', name: 'Gran hacha', category: 'weapon', cost: 30, weight: 7,
    weaponType: 'martial_melee', damage: { dice: '1d12', type: 'cortante' },
    properties: ['heavy', 'two-handed']
  },
  greatsword: {
    id: 'greatsword', name: 'Gran espada', category: 'weapon', cost: 50, weight: 6,
    weaponType: 'martial_melee', damage: { dice: '2d6', type: 'cortante' },
    properties: ['heavy', 'two-handed']
  },
  halberd: {
    id: 'halberd', name: 'Alabarda', category: 'weapon', cost: 20, weight: 6,
    weaponType: 'martial_melee', damage: { dice: '1d10', type: 'cortante' },
    properties: ['heavy', 'reach', 'two-handed']
  },
  longsword: {
    id: 'longsword', name: 'Espada larga', category: 'weapon', cost: 15, weight: 3,
    weaponType: 'martial_melee', damage: { dice: '1d8', type: 'cortante' },
    versatileDamage: '1d10', properties: ['versatile']
  },
  maul: {
    id: 'maul', name: 'Trituradora', category: 'weapon', cost: 10, weight: 10,
    weaponType: 'martial_melee', damage: { dice: '2d6', type: 'contundente' },
    properties: ['heavy', 'two-handed']
  },
  morningstar: {
    id: 'morningstar', name: 'Estrella de la mañana', category: 'weapon', cost: 15, weight: 4,
    weaponType: 'martial_melee', damage: { dice: '1d8', type: 'perforante' },
    properties: []
  },
  pike: {
    id: 'pike', name: 'Pica', category: 'weapon', cost: 5, weight: 18,
    weaponType: 'martial_melee', damage: { dice: '1d10', type: 'perforante' },
    properties: ['heavy', 'reach', 'two-handed']
  },
  rapier: {
    id: 'rapier', name: 'Estoque', category: 'weapon', cost: 25, weight: 2,
    weaponType: 'martial_melee', damage: { dice: '1d8', type: 'perforante' },
    properties: ['finesse']
  },
  scimitar: {
    id: 'scimitar', name: 'Cimitarra', category: 'weapon', cost: 25, weight: 3,
    weaponType: 'martial_melee', damage: { dice: '1d6', type: 'cortante' },
    properties: ['finesse', 'light']
  },
  shortsword: {
    id: 'shortsword', name: 'Espada corta', category: 'weapon', cost: 10, weight: 2,
    weaponType: 'martial_melee', damage: { dice: '1d6', type: 'perforante' },
    properties: ['finesse', 'light']
  },
  trident: {
    id: 'trident', name: 'Tridente', category: 'weapon', cost: 5, weight: 4,
    weaponType: 'martial_melee', damage: { dice: '1d6', type: 'perforante' },
    versatileDamage: '1d8', properties: ['thrown (20/60)', 'versatile']
  },
  warhammer: {
    id: 'warhammer', name: 'Martillo de guerra', category: 'weapon', cost: 15, weight: 2,
    weaponType: 'martial_melee', damage: { dice: '1d8', type: 'contundente' },
    versatileDamage: '1d10', properties: ['versatile']
  },
  war_pick: {
    id: 'war_pick', name: 'Piolet de guerra', category: 'weapon', cost: 5, weight: 2,
    weaponType: 'martial_melee', damage: { dice: '1d8', type: 'perforante' },
    properties: []
  },
  whip: {
    id: 'whip', name: 'Látigo', category: 'weapon', cost: 2, weight: 3,
    weaponType: 'martial_melee', damage: { dice: '1d4', type: 'cortante' },
    properties: ['finesse', 'reach']
  },
  lance: {
    id: 'lance', name: 'Lanza de caballería', category: 'weapon', cost: 10, weight: 6,
    weaponType: 'martial_melee', damage: { dice: '1d12', type: 'perforante' },
    properties: ['reach', 'special']
  },

  // ============================================================
  // ARMAS MARCIALES — A DISTANCIA
  // ============================================================
  longbow: {
    id: 'longbow', name: 'Arco largo', category: 'weapon', cost: 50, weight: 2,
    weaponType: 'martial_ranged', damage: { dice: '1d8', type: 'perforante' },
    properties: ['ammunition (150/600)', 'heavy', 'two-handed']
  },
  heavy_crossbow: {
    id: 'heavy_crossbow', name: 'Ballesta pesada', category: 'weapon', cost: 50, weight: 18,
    weaponType: 'martial_ranged', damage: { dice: '1d10', type: 'perforante' },
    properties: ['ammunition (100/400)', 'heavy', 'loading', 'two-handed']
  },
  blowgun: {
    id: 'blowgun', name: 'Cerbatana', category: 'weapon', cost: 10, weight: 1,
    weaponType: 'martial_ranged', damage: { dice: '1', type: 'perforante' },
    properties: ['ammunition (25/100)', 'loading']
  },
  net: {
    id: 'net', name: 'Red', category: 'weapon', cost: 1, weight: 3,
    weaponType: 'martial_ranged', damage: { dice: '0', type: 'contundente' },
    properties: ['special', 'thrown (5/15)']
  },

  // ============================================================
  // ARMADURAS LIGERAS
  // ============================================================
  padded_armor: {
    id: 'padded_armor', name: 'Armadura acolchada', category: 'armor', cost: 5, weight: 8,
    armorType: 'light', acBase: 11, stealthDisadvantage: true
  },
  leather_armor: {
    id: 'leather_armor', name: 'Armadura de cuero', category: 'armor', cost: 10, weight: 10,
    armorType: 'light', acBase: 11
  },
  studded_leather: {
    id: 'studded_leather', name: 'Cuero tachonado', category: 'armor', cost: 45, weight: 13,
    armorType: 'light', acBase: 12
  },

  // ============================================================
  // ARMADURAS MEDIAS
  // ============================================================
  hide_armor: {
    id: 'hide_armor', name: 'Armadura de cuero endurecido', category: 'armor', cost: 10, weight: 12,
    armorType: 'medium', acBase: 12
  },
  chain_shirt: {
    id: 'chain_shirt', name: 'Camisote de mallas', category: 'armor', cost: 50, weight: 20,
    armorType: 'medium', acBase: 13
  },
  scale_mail: {
    id: 'scale_mail', name: 'Cota de escamas', category: 'armor', cost: 50, weight: 45,
    armorType: 'medium', acBase: 14, stealthDisadvantage: true
  },
  breastplate: {
    id: 'breastplate', name: 'Peto', category: 'armor', cost: 400, weight: 20,
    armorType: 'medium', acBase: 14
  },
  half_plate: {
    id: 'half_plate', name: 'Semicota de placas', category: 'armor', cost: 750, weight: 40,
    armorType: 'medium', acBase: 15, stealthDisadvantage: true
  },

  // ============================================================
  // ARMADURAS PESADAS
  // ============================================================
  ring_mail: {
    id: 'ring_mail', name: 'Cota de anillos', category: 'armor', cost: 30, weight: 40,
    armorType: 'heavy', acBase: 14, stealthDisadvantage: true
  },
  chain_mail: {
    id: 'chain_mail', name: 'Cota de malla', category: 'armor', cost: 75, weight: 55,
    armorType: 'heavy', acBase: 16, stealthDisadvantage: true, strRequirement: 13
  },
  splint_armor: {
    id: 'splint_armor', name: 'Loriga', category: 'armor', cost: 200, weight: 60,
    armorType: 'heavy', acBase: 17, stealthDisadvantage: true, strRequirement: 15
  },
  plate_armor: {
    id: 'plate_armor', name: 'Armadura de placas', category: 'armor', cost: 1500, weight: 65,
    armorType: 'heavy', acBase: 18, stealthDisadvantage: true, strRequirement: 15
  },

  // ============================================================
  // ESCUDO
  // ============================================================
  shield: {
    id: 'shield', name: 'Escudo', category: 'armor', cost: 10, weight: 6,
    armorType: 'shield', acBase: 2
  },

  // ============================================================
  // EQUIPO DE AVENTURERO — GESENCIALES
  // ============================================================
  holy_symbol: { id: 'holy_symbol', name: 'Símbolo Sagrado', category: 'gear', cost: 5, weight: 1 },
  thieves_tools: { id: 'thieves_tools', name: 'Herramientas de Ladrón', category: 'tool', cost: 25, weight: 1 },
  spellbook: { id: 'spellbook', name: 'Grimorio', category: 'gear', cost: 50, weight: 3 },
  arrows_20: { id: 'arrows_20', name: 'Carcaj con 20 flechas', category: 'gear', cost: 1, weight: 1 },
  crossbow_bolts_20: { id: 'crossbow_bolts_20', name: 'Caja con 20 virotes', category: 'gear', cost: 1, weight: 1 },
  arcane_focus: { id: 'arcane_focus', name: 'Foco Arcano', category: 'gear', cost: 10, weight: 1 },
  component_pouch: { id: 'component_pouch', name: 'Bolsa de Componentes', category: 'gear', cost: 25, weight: 2 },
  druidic_focus: { id: 'druidic_focus', name: 'Foco Druídico', category: 'gear', cost: 1, weight: 2 },

  // Equipo de background
  book: { id: 'book', name: 'Libro', category: 'gear', cost: 25, weight: 5 },
  ink_bottle: { id: 'ink_bottle', name: 'Botella de tinta', category: 'gear', cost: 10, weight: 0 },
  quill: { id: 'quill', name: 'Pluma', category: 'gear', cost: 0.02, weight: 0 },
  parchment: { id: 'parchment', name: 'Pergamino (x10)', category: 'gear', cost: 1, weight: 0 },
  crowbar: { id: 'crowbar', name: 'Palanca', category: 'gear', cost: 2, weight: 5 },
  ritual_dagger: { id: 'ritual_dagger', name: 'Daga ritual', category: 'gear', cost: 0, weight: 1 },
  winter_blanket: { id: 'winter_blanket', name: 'Manta de invierno', category: 'gear', cost: 0.5, weight: 3 },
  common_clothes: { id: 'common_clothes', name: 'Ropa común', category: 'gear', cost: 0.5, weight: 3 },
  travelers_clothes: { id: 'travelers_clothes', name: 'Ropa de viajero', category: 'gear', cost: 2, weight: 4 },
  fine_clothes: { id: 'fine_clothes', name: 'Ropa fina', category: 'gear', cost: 15, weight: 6 },
  disguise_kit: { id: 'disguise_kit', name: 'Kit de disfraz', category: 'tool', cost: 25, weight: 3 },
  herbalism_kit: { id: 'herbalism_kit', name: 'Kit de herboristería', category: 'tool', cost: 5, weight: 3 },
  playing_card_set: { id: 'playing_card_set', name: 'Juego de cartas', category: 'tool', cost: 0.5, weight: 0 },
  hunting_trap: { id: 'hunting_trap', name: 'Trampa de caza', category: 'gear', cost: 5, weight: 25 },
  staff: { id: 'staff', name: 'Bastón (atrezzo)', category: 'gear', cost: 0.2, weight: 4 },
  musical_instrument: { id: 'musical_instrument', name: 'Instrumento musical', category: 'tool', cost: 25, weight: 2 },
  signet_ring: { id: 'signet_ring', name: 'Anillo con sello', category: 'gear', cost: 5, weight: 0 },
  belaying_pin: { id: 'belaying_pin', name: 'Cabilla (clava)', category: 'gear', cost: 0, weight: 2 },
  silk_rope_50ft: { id: 'silk_rope_50ft', name: 'Cuerda de seda (50 pies)', category: 'gear', cost: 10, weight: 5 },
  artisans_tools: { id: 'artisans_tools', name: 'Herramientas de artesano', category: 'tool', cost: 5, weight: 5 },
  shovel: { id: 'shovel', name: 'Pala', category: 'gear', cost: 2, weight: 5 },
  iron_pot: { id: 'iron_pot', name: 'Puchero de hierro', category: 'gear', cost: 2, weight: 10 },
  small_knife: { id: 'small_knife', name: 'Cuchillo pequeño', category: 'gear', cost: 0, weight: 0.5 },
  prayer_book: { id: 'prayer_book', name: 'Libro de oraciones', category: 'gear', cost: 25, weight: 2 },
  incense_x5: { id: 'incense_x5', name: 'Incienso (x5 palitos)', category: 'gear', cost: 0.1, weight: 0 },
  vestments: { id: 'vestments', name: 'Vestimentas', category: 'gear', cost: 1, weight: 4 },
  costume: { id: 'costume', name: 'Disfraz', category: 'gear', cost: 5, weight: 4 },

  // Monedas de inicio representadas como gear
  gold_5: { id: 'gold_5', name: '5 po', category: 'gear', cost: 5, weight: 0.1 },
  gold_10: { id: 'gold_10', name: '10 po', category: 'gear', cost: 10, weight: 0.2 },
  gold_15: { id: 'gold_15', name: '15 po', category: 'gear', cost: 15, weight: 0.3 },
  gold_25: { id: 'gold_25', name: '25 po', category: 'gear', cost: 25, weight: 0.5 },

  // ============================================================
  // PACKS DE AVENTURERO
  // ============================================================
  explorers_pack: {
    id: 'explorers_pack', name: 'Pack de Explorador', category: 'pack', cost: 10, weight: 59,
    bundleItems: [
      { id: 'backpack', quantity: 1 }, { id: 'bedroll', quantity: 1 }, { id: 'mess_kit', quantity: 1 },
      { id: 'tinderbox', quantity: 1 }, { id: 'torch', quantity: 10 }, { id: 'rations', quantity: 10 },
      { id: 'waterskin', quantity: 1 }, { id: 'hempen_rope', quantity: 1 }
    ]
  },
  dungeoneers_pack: {
    id: 'dungeoneers_pack', name: 'Pack de Explorador de Mazmorras', category: 'pack', cost: 12, weight: 61.5,
    bundleItems: [
      { id: 'backpack', quantity: 1 }, { id: 'crowbar', quantity: 1 }, { id: 'hammer', quantity: 1 },
      { id: 'piton', quantity: 10 }, { id: 'torch', quantity: 10 }, { id: 'tinderbox', quantity: 1 },
      { id: 'rations', quantity: 10 }, { id: 'waterskin', quantity: 1 }, { id: 'hempen_rope', quantity: 1 }
    ]
  },
  priests_pack: {
    id: 'priests_pack', name: 'Pack de Sacerdote', category: 'pack', cost: 19, weight: 25,
    bundleItems: [
      { id: 'backpack', quantity: 1 }, { id: 'blanket', quantity: 1 }, { id: 'candle', quantity: 10 },
      { id: 'tinderbox', quantity: 1 }, { id: 'alms_box', quantity: 1 }, { id: 'incense', quantity: 2 },
      { id: 'censer', quantity: 1 }, { id: 'vestments', quantity: 1 }, { id: 'rations', quantity: 2 },
      { id: 'waterskin', quantity: 1 }
    ]
  },
  scholars_pack: {
    id: 'scholars_pack', name: 'Pack de Erudito', category: 'pack', cost: 40, weight: 10,
    bundleItems: [
      { id: 'backpack', quantity: 1 }, { id: 'book', quantity: 1 }, { id: 'ink_bottle', quantity: 1 },
      { id: 'quill', quantity: 1 }, { id: 'parchment', quantity: 10 }, { id: 'small_knife', quantity: 1 }
    ]
  },
  entertainers_pack: {
    id: 'entertainers_pack', name: 'Pack de Animador', category: 'pack', cost: 40, weight: 38,
    bundleItems: [
      { id: 'backpack', quantity: 1 }, { id: 'bedroll', quantity: 1 }, { id: 'costume', quantity: 2 },
      { id: 'candle', quantity: 5 }, { id: 'rations', quantity: 5 }, { id: 'waterskin', quantity: 1 }
    ]
  },
  diplomats_pack: {
    id: 'diplomats_pack', name: 'Pack de Diplomático', category: 'pack', cost: 39, weight: 36,
    bundleItems: [
      { id: 'chest', quantity: 1 }, { id: 'fine_clothes', quantity: 2 }, { id: 'ink_bottle', quantity: 1 },
      { id: 'quill', quantity: 1 }, { id: 'small_knife', quantity: 1 }, { id: 'perfume', quantity: 1 },
      { id: 'parchment', quantity: 5 }, { id: 'signet_ring', quantity: 1 }
    ]
  },
  burglars_pack: {
    id: 'burglars_pack', name: 'Pack de Ladrón', category: 'pack', cost: 16, weight: 44.5,
    bundleItems: [
      { id: 'backpack', quantity: 1 }, { id: 'ball_bearings', quantity: 1000 }, { id: 'string_10ft', quantity: 1 },
      { id: 'bell', quantity: 1 }, { id: 'candle', quantity: 5 }, { id: 'crowbar', quantity: 1 },
      { id: 'hammer', quantity: 1 }, { id: 'piton', quantity: 10 }, { id: 'hooded_lantern', quantity: 1 },
      { id: 'flask_oil', quantity: 2 }, { id: 'rations', quantity: 5 }, { id: 'tinderbox', quantity: 1 },
      { id: 'waterskin', quantity: 1 }, { id: 'hempen_rope', quantity: 1 }
    ]
  },
};
