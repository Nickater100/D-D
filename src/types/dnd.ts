import type { AbilityKey } from '../data/srd/skills';
import type { AlignmentId } from '../data/srd/alignments';

export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface Proficiencies {
  armor: string[];
  weapons: string[];
  tools: string[];
  skills: string[]; // IDs from skills.ts
}


export interface Feat {
  id: string;
  name: string;
  description: string;
}

export interface Background2024 {
  id: string;
  name: string;
  description: string;
  abilityOptions: string[]; // e.g. ["str", "con", "wis"]
  featId: string;
  skills: string[];
}

export interface Feature {
  name: string;
  description: string;
  source: 'raza' | 'trasfondo' | 'clase' | 'otro';
}

export type EquipmentSlot = 
  | 'head' | 'cloak' | 'torso' | 'gloves' | 'boots' 
  | 'amulet' | 'ring1' | 'ring2' 
  | 'mainHand' | 'offHand' | 'ranged';

export interface Item {
  id: string;
  name: string;
  category: 'equipamiento' | 'consumible' | 'otro';
  subtype?: 'arma' | 'armadura' | 'escudo' | 'casco' | 'guantes' | 'botas' | 'capa' | 'amuleto' | 'anillo' | 'otro';
  weaponType?: string;           // 'simple_melee' | 'simple_ranged' | 'martial_melee' | 'martial_ranged'
  armorType?: string;            // 'light' | 'medium' | 'heavy' | 'shield'
  damage?: { dice: string; type: string };  // structured damage from SRD
  versatileDamage?: string;      // damage dice when used two-handed (e.g. '1d10')
  acBase?: number;               // base AC for armor
  strRequirement?: number;       // STR needed to wear without penalty
  stealthDisadvantage?: boolean; // armor imposes disadvantage on Stealth
  properties?: string[];         // 'finesse', 'light', 'two-handed', 'reach', etc.
  description: string;
  rarity: 'común' | 'poco común' | 'raro' | 'muy raro' | 'legendario';
  cost?: number;                 // value in GP
  weight?: number;               // weight in lb
  quantity?: number;
}

export interface CharacterClass {
  classId: string;
  name: string;
  level: number;
  subclass?: string;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  classes: CharacterClass[];
  level: number;
  hp: number;
  maxHp: number;
  ac: number;
  attributes: AbilityScores;
  background: string;
  alignment: AlignmentId | 'Neutral'; // Standard 5e alignments
  portraitUrl?: string; // e.g. path to generic class image

  // Progression & Identifiers
  xp?: number;
  
  // 5e Complex Mechanics
  proficiencyBonus: number;
  savingThrows: AbilityKey[];
  proficiencies: Proficiencies;
  languages: string[];
  expertiseSkills?: string[]; // list of skill IDs with double proficiency bonus

  // Features, Spells & Feats
  feats?: string[]; // list of feat IDs
  spells?: string[]; // list of spell IDs (all known/learned)
  preparedSpells?: string[]; // list of currently prepared spell IDs
  spellSlots?: Record<number, number>; // Max slots
  currentSpellSlots?: Record<number, number>; // Available today
  warlockSlots?: { count: number, level: number }; // Max Pact Magic
  currentWarlockSlots?: number; // Available Pact Magic
  concentration?: { spellId: string; dc: number } | null;
  features?: Feature[]; // Used for both class features and narrative consequences
  
  inventory?: Item[];
  equipment?: Partial<Record<EquipmentSlot, string>>; // Maps slot to Item ID

  // Adventuring (Cap. 8)
  exhaustion: number; // 0 to 6
  conditions: string[]; // list of condition IDs
  hitDice: {
    type: number;   // e.g. 8 for d8
    current: number;
    max: number;
  }[];
  deathSaves?: { success: number; failure: number };
}

export interface CombatEntity {
  id: string;
  name: string;
  hp: number;
  maxHp: number;
  ac: number;
  initiative: number;
  isPlayer: boolean;
  type?: 'enemy' | 'ally' | 'neutral';
}

export interface CombatEncounter {
  isActive: boolean;
  turnIndex: number;
  round: number;
  entities: CombatEntity[];
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
}
