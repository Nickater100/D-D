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
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
}
