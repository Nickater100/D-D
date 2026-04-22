import type { Character, Item, CreatureAttack } from '../types/dnd';
import { calculateModifier } from './statsUtils';

export interface RollDetail {
  roll: number;
  bonus: number;
  total: number;
  isCrit: boolean;
  isFumble: boolean;
}

export interface DamageDetail {
  dice: string;
  roll: number;
  bonus: number;
  total: number;
  type: string;
}

/**
 * Calculates attack bonus for a specific weapon.
 * (Ability Mod + Proficiency)
 */
export function getAttackBonus(character: Character, item: Item): number {
  if (item.category !== 'equipamiento' || item.subtype !== 'arma') return 0;

  const { attributes, proficiencyBonus, proficiencies } = character;
  
  // 1. Determine ability used (Str or Dex for Finesse/Ranged)
  let ability = 'str';
  const isFinesse = item.properties?.includes('finesse');
  const isRanged = item.weaponType?.includes('ranged');

  if (isRanged || (isFinesse && attributes.dex > attributes.str)) {
    ability = 'dex';
  }

  const mod = calculateModifier(attributes[ability as keyof typeof attributes]);
  
  // 2. Check proficiency
  let bonus = mod;
  const isProficient = proficiencies.weapons.some(p => 
    p.toLowerCase() === item.weaponType?.toLowerCase() || 
    p.toLowerCase() === item.name.toLowerCase()
  );

  if (isProficient) {
    bonus += proficiencyBonus;
  }

  return bonus;
}

/**
 * Executes a d20 attack roll.
 */
export function rollAttack(character: Character, item: Item): RollDetail {
  const bonus = getAttackBonus(character, item);
  const roll = Math.floor(Math.random() * 20) + 1;
  
  return {
    roll,
    bonus,
    total: roll + bonus,
    isCrit: roll === 20,
    isFumble: roll === 1
  };
}

/**
 * Executes a damage roll for a weapon.
 */
export function rollDamage(character: Character, item: Item, isCrit: boolean = false): DamageDetail {
  const { attributes } = character;
  
  // Ability mod (same logic as attack)
  let ability = 'str';
  const isFinesse = item.properties?.includes('finesse');
  const isRanged = item.weaponType?.includes('ranged');
  if (isRanged || (isFinesse && attributes.dex > attributes.str)) {
    ability = 'dex';
  }
  const bonus = calculateModifier(attributes[ability as keyof typeof attributes]);

  const diceStr = item.damage?.dice || '1d4';
  const type = item.damage?.type || 'fuerza';

  // Parse dice (e.g. "1d8")
  const [count, sides] = diceStr.split('d').map(Number);
  
  let rollTotal = 0;
  const numDice = isCrit ? count * 2 : count;

  for (let i = 0; i < numDice; i++) {
    rollTotal += Math.floor(Math.random() * sides) + 1;
  }

  return {
    dice: `${numDice}d${sides}`,
    roll: rollTotal,
    bonus,
    total: Math.max(1, rollTotal + bonus),
    type
  };
}

/**
 * Executes a d20 attack roll for a creature.
 */
export function rollCreatureAttack(attack: CreatureAttack, targetAC: number): { hit: boolean; roll: number; total: number; isCrit: boolean; isFumble: boolean; } {
  const roll = Math.floor(Math.random() * 20) + 1;
  const total = roll + attack.toHit;
  const isCrit = roll === 20;
  const isFumble = roll === 1;
  const hit = isCrit || (!isFumble && total >= targetAC);

  return { hit, roll, total, isCrit, isFumble };
}

/**
 * Executes a damage roll for a creature's attack.
 */
export function rollCreatureDamage(attack: CreatureAttack, isCrit: boolean = false): { total: number; detail: string; type: string } {
  const diceStr = attack.damage;
  const type = attack.damageType;

  const rollDice = (str: string, crit: boolean) => {
    if (!str) return 0;
    // Handle formats like "2d4+2" or "1d8"
    const match = str.match(/(\d+)d(\d+)([+-]\d+)?/);
    if (!match) return 0;
    
    const count = parseInt(match[1]);
    const sides = parseInt(match[2]);
    const bonus = parseInt(match[3] || '0');
    
    let total = 0;
    const numDice = crit ? count * 2 : count;
    for (let i = 0; i < numDice; i++) {
      total += Math.floor(Math.random() * sides) + 1;
    }
    return total + bonus;
  };

  const primaryDamage = rollDice(diceStr, isCrit);
  let total = primaryDamage;
  let detail = `${primaryDamage} (${type})`;

  if (attack.extraDamage) {
    const extraDamage = rollDice(attack.extraDamage, isCrit);
    total += extraDamage;
    detail += ` + ${extraDamage} (${attack.extraDamageType || 'extra'})`;
  }

  return { total: Math.max(1, total), detail, type };
}
