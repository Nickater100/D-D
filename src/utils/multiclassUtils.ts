import type { AbilityScores } from '../types/dnd';

export interface SpellSlots {
  [level: number]: number;
}

// PHB Multiclass Spellcaster Table
const MULTICLASS_SPELL_SLOTS: Record<number, number[]> = {
  1: [2],
  2: [3],
  3: [4, 2],
  4: [4, 3],
  5: [4, 3, 2],
  6: [4, 3, 3],
  7: [4, 3, 3, 1],
  8: [4, 3, 3, 2],
  9: [4, 3, 3, 3, 1],
  10: [4, 3, 3, 3, 2],
  11: [4, 3, 3, 3, 2, 1],
  12: [4, 3, 3, 3, 2, 1],
  13: [4, 3, 3, 3, 2, 1, 1],
  14: [4, 3, 3, 3, 2, 1, 1],
  15: [4, 3, 3, 3, 2, 1, 1, 1],
  16: [4, 3, 3, 3, 2, 1, 1, 1],
  17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
  18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
  19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
  20: [4, 3, 3, 3, 3, 2, 2, 1, 1]
};

// Pact Magic (Warlock) - PHB Level progression
const WARLOCK_SLOTS: Record<number, { count: number, level: number }> = {
  1: { count: 1, level: 1 },
  2: { count: 2, level: 1 },
  3: { count: 2, level: 2 },
  4: { count: 2, level: 2 },
  5: { count: 2, level: 3 },
  6: { count: 2, level: 3 },
  7: { count: 3, level: 4 },
  8: { count: 3, level: 4 },
  9: { count: 4, level: 5 },
  10: { count: 4, level: 5 }, // 11+ is Mystic Arcanum (ignoring for now as Lvl 1 only project)
};

/**
 * Calculates the spellcaster level following PHB rules.
 * Full: 1:1, Half: 1:2 (down), Third: 1:3 (down)
 */
export function calculateSpellcasterLevel(charClasses: { classId: string, level: number }[]): number {
  let totalLevel = 0;
  
  charClasses.forEach(c => {
    switch (c.classId) {
      case 'bard':
      case 'cleric':
      case 'druid':
      case 'sorcerer':
      case 'wizard':
        totalLevel += c.level;
        break;
      case 'paladin':
      case 'ranger':
        totalLevel += Math.floor(c.level / 2);
        break;
      // Eldritch Knight / Arcane Trickster would be 1/3 (if subclasses were known here)
    }
  });

  return totalLevel;
}

/**
 * Returns the shared spell slots and the separate Warlock slots.
 */
export function getMulticlassSpellSlots(charClasses: { classId: string, level: number }[]) {
  const wizardLevel = calculateSpellcasterLevel(charClasses);
  const sharedSlotsArray = MULTICLASS_SPELL_SLOTS[wizardLevel] || [];
  
  const shared: SpellSlots = {};
  sharedSlotsArray.forEach((count, i) => { shared[i+1] = count; });

  const warlockClass = charClasses.find(c => c.classId === 'warlock');
  const warlock = warlockClass ? WARLOCK_SLOTS[warlockClass.level] : undefined;

  return { shared, warlock };
}

/**
 * Checks if a character meets the attribute requirements to multiclass.
 */
export function canMulticlass(attributes: AbilityScores, fromClassId: string, toClassId: string): { can: boolean, reason?: string } {
  const requirements: Record<string, Partial<AbilityScores>> = {
    barbarian: { str: 13 },
    bard: { cha: 13 },
    cleric: { wis: 13 },
    druid: { wis: 13 },
    fighter: { str: 13 }, // also dex 13, but let's simplify to primary
    monk: { dex: 13, wis: 13 },
    paladin: { str: 13, cha: 13 },
    ranger: { dex: 13, wis: 13 },
    rogue: { dex: 13 },
    sorcerer: { cha: 13 },
    warlock: { cha: 13 },
    wizard: { int: 13 }
  };

  const reqOut = requirements[fromClassId];
  const reqIn = requirements[toClassId];

  if (reqOut) {
    for (const [attr, val] of Object.entries(reqOut)) {
      if ((attributes as any)[attr] < val) return { can: false, reason: `Necesitas ${attr.toUpperCase()} 13 para salir de ${fromClassId}.` };
    }
  }

  if (reqIn) {
    for (const [attr, val] of Object.entries(reqIn)) {
      if ((attributes as any)[attr] < val) return { can: false, reason: `Necesitas ${val} en ${attr.toUpperCase()} para entrar en ${toClassId}.` };
    }
  }

  return { can: true };
}

/**
 * Returns the limited proficiencies given when gaining a class via multiclassing.
 */
export function getMulticlassProficiencies(classId: string) {
  switch (classId) {
    case 'barbarian': return { armor: ['Escudos'], weapons: ['Armas simples', 'Armas marciales'] };
    case 'bard': return { armor: ['Armadura ligera'], skillsChoose: 1 };
    case 'cleric': return { armor: ['Armadura ligera', 'Armadura media', 'Escudos'] };
    case 'druid': return { armor: ['Armadura ligera', 'Armadura media', 'Escudos'] };
    case 'fighter': return { armor: ['Armadura ligera', 'Armadura media', 'Escudos'], weapons: ['Armas simples', 'Armas marciales'] };
    case 'monk': return { weapons: ['Armas simples', 'Espadas cortas'] };
    case 'paladin': return { armor: ['Armadura ligera', 'Armadura media', 'Escudos'], weapons: ['Armas simples', 'Armas marciales'] };
    case 'ranger': return { armor: ['Armadura ligera', 'Armadura media', 'Escudos'], weapons: ['Armas simples', 'Armas marciales'], skillsChoose: 1 };
    case 'rogue': return { armor: ['Armadura ligera'], skillsChoose: 1, tools: ['Herramientas de ladrón'] };
    case 'warlock': return { armor: ['Armadura ligera'], weapons: ['Armas simples'] };
    default: return {};
  }
}
