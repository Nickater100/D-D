export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
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

export interface Item {
  id: string;
  name: string;
  category: 'equipamiento' | 'consumible' | 'otro';
  description: string;
  rarity: 'común' | 'poco común' | 'raro' | 'muy raro' | 'legendario';
  quantity?: number;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  className: string;
  level: number;
  hp: number;
  maxHp: number;
  ac: number; 
  attributes: AbilityScores;
  background: string;
  alignment: string;
  portraitUrl?: string; 
  subclass?: string;
  spells?: string[];
  feats?: string[]; // List of feat IDs
  features?: Feature[];
  inventory?: Item[];
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
}
