export interface AbilityScores {
  str: number;
  dex: number;
  con: number;
  int: number;
  wis: number;
  cha: number;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  className: string;
  level: number;
  hp: number;
  maxHp: number;
  ac: number; // Armor Class
  attributes: AbilityScores;
  background: string;
  alignment: string;
  portraitUrl?: string; // For later UI beauty
  // In a real app we'd have spells, inventory, etc.
}

export interface Campaign {
  id: string;
  title: string;
  description: string;
  coverImage?: string;
}
