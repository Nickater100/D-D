import type { Character } from '../types/dnd';
import { SRD_SKILLS } from '../data/srd/skills';

/**
 * Calculates the ability modifier for a given score.
 * (Score - 10) / 2 rounded down.
 */
export const calculateModifier = (val: number) => Math.floor((val - 10) / 2);

/**
 * Calculates the Armor Class (AC) for a character based on their current equipment.
 * Logic follows PHB Chapter 5 rules.
 */
export function calculateAC(character: Character): number {
  const inventory = character.inventory || [];
  const equipment = character.equipment || {};
  const stats = character.attributes;
  const features = character.features || [];

  const modDex = calculateModifier(stats.dex);
  const modCon = calculateModifier(stats.con);
  const modWis = calculateModifier(stats.wis);

  // 1. Find equipped armor and shield
  const torsoId = equipment.torso;
  const offHandId = equipment.offHand;

  const armor = inventory.find(i => i.id === torsoId);
  const offHandItem = inventory.find(i => i.id === offHandId);
  const hasShield = offHandItem?.armorType === 'shield' || offHandItem?.subtype === 'escudo';

  let baseAC = 10 + modDex; // default unarmored
  let isWearingArmor = false;

  if (armor?.acBase) {
    isWearingArmor = true;
    const type = armor.armorType;
    if (type === 'light') {
      baseAC = armor.acBase + modDex;
    } else if (type === 'medium') {
      baseAC = armor.acBase + Math.min(modDex, 2);
    } else if (type === 'heavy') {
      baseAC = armor.acBase; // Heavy armor ignores Dex
    }
  } else {
    // Unarmored features (Cap. 3 & 6)
    const hasClassName = (id: string) => character.classes.some(c => c.classId === id);
    const subclass = character.classes[0]?.subclass || '';

    if (hasClassName('barbarian')) {
      baseAC = 10 + modDex + modCon;
    } else if (hasClassName('monk')) {
      baseAC = 10 + modDex + modWis;
    } else if (hasClassName('sorcerer') && subclass.includes('Dracónico')) {
      baseAC = 13 + modDex;
    }
  }

  // Common bonuses
  if (hasShield) {
    baseAC += 2;
  }

  // Combat Style: Defense (+1 while wearing armor)
  const hasDefenseStyle = features.some(f => f.name.includes('Defensa'));
  if (hasDefenseStyle && isWearingArmor) {
    baseAC += 1;
  }

  return baseAC;
}

/**
 * Calculates the total bonus for a skill.
 * Mod + Proficiency (if applicable) + Expertise (if applicable)
 */
export function calculateSkillBonus(character: Character, skillId: string): number {
  const skill = SRD_SKILLS[skillId];
  if (!skill) return 0;

  const abilityScore = character.attributes[skill.ability];
  const mod = calculateModifier(abilityScore);
  const isProficient = character.proficiencies.skills.includes(skillId);
  const isExpert = character.expertiseSkills?.includes(skillId);

  let bonus = mod;
  if (isProficient) bonus += character.proficiencyBonus;
  if (isExpert) bonus += character.proficiencyBonus; // Double proficiency

  return bonus;
}

/**
 * Calculates the total bonus for a saving throw.
 */
export function calculateSavingThrowBonus(character: Character, ability: keyof typeof character.attributes): number {
  const mod = calculateModifier(character.attributes[ability]);
  const isProficient = character.savingThrows.includes(ability);

  let bonus = mod;
  if (isProficient) bonus += character.proficiencyBonus;

  return bonus;
}

/**
 * Calculates passive sense scores (e.g. Passive Perception).
 * Base 10 + Skill Bonus.
 */
export function calculatePassiveScore(character: Character, skillId: string): number {
  return 10 + calculateSkillBonus(character, skillId);
}
