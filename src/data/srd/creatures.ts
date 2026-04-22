// ═══════════════════════════════════════════════════════════════════════════════
// AUTO-GENERATED — Do not edit manually!
// Source: dnd5eapi.co (SRD 5.1, CC-BY 4.0)
// Generated: 2026-04-22
// Total creatures: 334
// ═══════════════════════════════════════════════════════════════════════════════

export interface CreatureAttack {
  name: string;
  toHit: number;
  damage: string;
  damageType: string;
  extraDamage?: string;
  extraDamageType?: string;
  description?: string;
}

export interface CreatureDefinition {
  id: string;
  name: string;
  type: string;
  size: string;
  cr: number;
  xp: number;
  ac: number;
  hp: number;
  hitDice: string;
  speed: number;
  str: number; dex: number; con: number;
  int: number; wis: number; cha: number;
  attacks: CreatureAttack[];
  multiattack?: string;
  specialAbilities?: string[];
}

export const SRD_CREATURES: CreatureDefinition[] = [
  {
    id: 'aboleth', name: 'Aboleth',
    type: 'aberration', size: 'Large',
    cr: 10, xp: 5900, ac: 17, hp: 135, hitDice: '18d10', speed: 10,
    str: 21, dex: 9, con: 15, int: 18, wis: 15, cha: 18,
    attacks: [
      { name: 'Tentacle', toHit: 9, damage: '2d6+5', damageType: 'Bludgeoning', extraDamage: '1d12', extraDamageType: 'Acid', description: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 14 Constitution saving throw or become diseased. The disease has no effect for 1 minute and can be removed by any magic that cures disease. After 1 minute, the diseased creature\'s skin becomes translucent and slimy, the creature can\'t regain hit points unless it is underwater, and the disease can be removed only by heal or another disease-curing spell of 6th level or higher. When the creature is outside a body of water, it takes 6 (1d12) acid damage every 10 minutes unless moisture is applied to the skin before 10 minutes have passed.' },
      { name: 'Tail', toHit: 9, damage: '3d6+5', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) bludgeoning damage.' },
    ],
    multiattack: 'The aboleth makes three tentacle attacks.',
    specialAbilities: ['Amphibious', 'Mucous Cloud', 'Probing Telepathy']
  },
  {
    id: 'acolyte', name: 'Acolyte',
    type: 'humanoid', size: 'Medium',
    cr: 0.25, xp: 50, ac: 10, hp: 9, hitDice: '2d8', speed: 30,
    str: 10, dex: 10, con: 10, int: 10, wis: 14, cha: 11,
    attacks: [
      { name: 'Club', toHit: 2, damage: '1d4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.' },
    ],
    specialAbilities: ['Spellcasting']
  },
  {
    id: 'adult-black-dragon', name: 'Adult Black Dragon',
    type: 'dragon', size: 'Huge',
    cr: 14, xp: 11500, ac: 19, hp: 195, hitDice: '17d12', speed: 40,
    str: 23, dex: 14, con: 21, int: 14, wis: 13, cha: 17,
    attacks: [
      { name: 'Bite', toHit: 11, damage: '2d10+6', damageType: 'Piercing', extraDamage: '1d8', extraDamageType: 'Acid', description: 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) acid damage.' },
      { name: 'Claw', toHit: 11, damage: '2d6+6', damageType: 'Slashing', description: 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.' },
      { name: 'Tail', toHit: 11, damage: '2d8+6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious', 'Legendary Resistance']
  },
  {
    id: 'adult-blue-dragon', name: 'Adult Blue Dragon',
    type: 'dragon', size: 'Huge',
    cr: 16, xp: 15000, ac: 19, hp: 225, hitDice: '18d12', speed: 40,
    str: 25, dex: 10, con: 23, int: 16, wis: 15, cha: 19,
    attacks: [
      { name: 'Bite', toHit: 12, damage: '2d10+7', damageType: 'Piercing', extraDamage: '1d10', extraDamageType: 'Lightning', description: 'Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) piercing damage plus 5 (1d10) lightning damage.' },
      { name: 'Claw', toHit: 12, damage: '2d6+7', damageType: 'Slashing', description: 'Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 7) slashing damage.' },
      { name: 'Tail', toHit: 12, damage: '2d8+7', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +12 to hit, reach 15 ft., one target. Hit: 16 (2d8 + 7) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Legendary Resistance']
  },
  {
    id: 'adult-brass-dragon', name: 'Adult Brass Dragon',
    type: 'dragon', size: 'Huge',
    cr: 13, xp: 10000, ac: 18, hp: 172, hitDice: '15d12', speed: 40,
    str: 23, dex: 10, con: 21, int: 14, wis: 13, cha: 17,
    attacks: [
      { name: 'Bite', toHit: 11, damage: '2d10+6', damageType: 'Piercing', description: 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage.' },
      { name: 'Claw', toHit: 11, damage: '2d6+6', damageType: 'Slashing', description: 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.' },
      { name: 'Tail', toHit: 11, damage: '2d8+6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Legendary Resistance']
  },
  {
    id: 'adult-bronze-dragon', name: 'Adult Bronze Dragon',
    type: 'dragon', size: 'Huge',
    cr: 15, xp: 13000, ac: 19, hp: 212, hitDice: '17d12', speed: 40,
    str: 25, dex: 10, con: 23, int: 16, wis: 15, cha: 19,
    attacks: [
      { name: 'Bite', toHit: 12, damage: '2d10+7', damageType: 'Piercing', description: 'Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 18 (2d10 + 7) piercing damage.' },
      { name: 'Claw', toHit: 12, damage: '2d6+7', damageType: 'Slashing', description: 'Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 14 (2d6 + 7) slashing damage.' },
      { name: 'Tail', toHit: 12, damage: '2d8+7', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +12 to hit, reach 15 ft., one target. Hit: 16 (2d8 + 7) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious', 'Legendary Resistance']
  },
  {
    id: 'adult-copper-dragon', name: 'Adult Copper Dragon',
    type: 'dragon', size: 'Huge',
    cr: 14, xp: 11500, ac: 18, hp: 184, hitDice: '16d12', speed: 40,
    str: 23, dex: 12, con: 21, int: 18, wis: 15, cha: 17,
    attacks: [
      { name: 'Bite', toHit: 11, damage: '2d10+6', damageType: 'Piercing', description: 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage.' },
      { name: 'Claw', toHit: 11, damage: '2d6+6', damageType: 'Slashing', description: 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.' },
      { name: 'Tail', toHit: 11, damage: '2d8+6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Legendary Resistance']
  },
  {
    id: 'adult-gold-dragon', name: 'Adult Gold Dragon',
    type: 'dragon', size: 'Huge',
    cr: 17, xp: 18000, ac: 19, hp: 256, hitDice: '19d12', speed: 40,
    str: 27, dex: 14, con: 25, int: 16, wis: 15, cha: 24,
    attacks: [
      { name: 'Bite', toHit: 14, damage: '2d10+8', damageType: 'Piercing', description: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage.' },
      { name: 'Claw', toHit: 14, damage: '2d6+8', damageType: 'Slashing', description: 'Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.' },
      { name: 'Tail', toHit: 14, damage: '2d8+8', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious', 'Legendary Resistance']
  },
  {
    id: 'adult-green-dragon', name: 'Adult Green Dragon',
    type: 'dragon', size: 'Huge',
    cr: 15, xp: 13000, ac: 19, hp: 207, hitDice: '18d12', speed: 40,
    str: 23, dex: 12, con: 21, int: 18, wis: 15, cha: 17,
    attacks: [
      { name: 'Bite', toHit: 11, damage: '2d10+6', damageType: 'Piercing', extraDamage: '2d6', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 7 (2d6) poison damage.' },
      { name: 'Claw', toHit: 11, damage: '2d6+6', damageType: 'Slashing', description: 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.' },
      { name: 'Tail', toHit: 11, damage: '2d8+6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious', 'Legendary Resistance']
  },
  {
    id: 'adult-red-dragon', name: 'Adult Red Dragon',
    type: 'dragon', size: 'Huge',
    cr: 17, xp: 18000, ac: 19, hp: 256, hitDice: '19d12', speed: 40,
    str: 27, dex: 10, con: 25, int: 16, wis: 13, cha: 21,
    attacks: [
      { name: 'Bite', toHit: 14, damage: '2d10+8', damageType: 'Piercing', extraDamage: '2d6', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 7 (2d6) fire damage.' },
      { name: 'Claw', toHit: 14, damage: '2d6+8', damageType: 'Slashing', description: 'Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.' },
      { name: 'Tail', toHit: 14, damage: '2d8+8', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Legendary Resistance']
  },
  {
    id: 'adult-silver-dragon', name: 'Adult Silver Dragon',
    type: 'dragon', size: 'Huge',
    cr: 16, xp: 15000, ac: 19, hp: 243, hitDice: '18d12', speed: 40,
    str: 27, dex: 10, con: 25, int: 16, wis: 13, cha: 21,
    attacks: [
      { name: 'Bite', toHit: 13, damage: '2d10+8', damageType: 'Piercing', description: 'Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 19 (2d10 + 8) piercing damage.' },
      { name: 'Claw', toHit: 13, damage: '2d6+8', damageType: 'Slashing', description: 'Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 15 (2d6 + 8) slashing damage.' },
      { name: 'Tail', toHit: 13, damage: '2d8+8', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Legendary Resistance']
  },
  {
    id: 'adult-white-dragon', name: 'Adult White Dragon',
    type: 'dragon', size: 'Huge',
    cr: 13, xp: 10000, ac: 18, hp: 200, hitDice: '16d12', speed: 40,
    str: 22, dex: 10, con: 22, int: 8, wis: 12, cha: 12,
    attacks: [
      { name: 'Bite', toHit: 11, damage: '2d10+6', damageType: 'Piercing', extraDamage: '1d8', extraDamageType: 'Cold', description: 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 4 (1d8) cold damage.' },
      { name: 'Claw', toHit: 11, damage: '2d6+6', damageType: 'Slashing', description: 'Melee Weapon Attack: +11 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.' },
      { name: 'Tail', toHit: 11, damage: '2d8+6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +11 to hit, reach 15 ft., one target. Hit: 15 (2d8 + 6) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Ice Walk', 'Legendary Resistance']
  },
  {
    id: 'air-elemental', name: 'Air Elemental',
    type: 'elemental', size: 'Large',
    cr: 5, xp: 1800, ac: 15, hp: 90, hitDice: '12d10', speed: 30,
    str: 14, dex: 20, con: 14, int: 6, wis: 10, cha: 6,
    attacks: [
      { name: 'Slam', toHit: 8, damage: '2d8+5', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage.' },
    ],
    multiattack: 'The elemental makes two slam attacks.',
    specialAbilities: ['Air Form']
  },
  {
    id: 'ancient-black-dragon', name: 'Ancient Black Dragon',
    type: 'dragon', size: 'Gargantuan',
    cr: 21, xp: 33000, ac: 22, hp: 367, hitDice: '21d20', speed: 40,
    str: 27, dex: 14, con: 25, int: 16, wis: 15, cha: 19,
    attacks: [
      { name: 'Bite', toHit: 15, damage: '2d10+8', damageType: 'Piercing', extraDamage: '2d8', extraDamageType: 'Acid', description: 'Melee Weapon Attack:+ 15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) acid damage.' },
      { name: 'Claw', toHit: 15, damage: '2d6+8', damageType: 'Slashing', description: 'Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.' },
      { name: 'Tail', toHit: 15, damage: '2d8+8', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious', 'Legendary Resistance']
  },
  {
    id: 'ancient-blue-dragon', name: 'Ancient Blue Dragon',
    type: 'dragon', size: 'Gargantuan',
    cr: 23, xp: 50000, ac: 22, hp: 481, hitDice: '26d20', speed: 40,
    str: 29, dex: 10, con: 27, int: 18, wis: 17, cha: 21,
    attacks: [
      { name: 'Bite', toHit: 16, damage: '2d10+9', damageType: 'Piercing', extraDamage: '2d10', extraDamageType: 'Lightning', description: 'Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 20 (2d10 + 9) piercing damage plus 11 (2d10) lightning damage.' },
      { name: 'Claw', toHit: 16, damage: '2d6+9', damageType: 'Slashing', description: 'Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 16 (2d6 + 9) slashing damage.' },
      { name: 'Tail', toHit: 16, damage: '2d8+9', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +16 to hit, reach 20 ft., one target. Hit: 18 (2d8 + 9) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Legendary Resistance']
  },
  {
    id: 'ancient-brass-dragon', name: 'Ancient Brass Dragon',
    type: 'dragon', size: 'Gargantuan',
    cr: 20, xp: 25000, ac: 20, hp: 297, hitDice: '17d20', speed: 40,
    str: 27, dex: 10, con: 25, int: 16, wis: 15, cha: 19,
    attacks: [
      { name: 'Bite', toHit: 14, damage: '2d10+8', damageType: 'Piercing', description: 'Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage.' },
      { name: 'Claw', toHit: 14, damage: '2d6+8', damageType: 'Slashing', description: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.' },
      { name: 'Tail', toHit: 14, damage: '2d8+8', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +14 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Legendary Resistance']
  },
  {
    id: 'ancient-bronze-dragon', name: 'Ancient Bronze Dragon',
    type: 'dragon', size: 'Gargantuan',
    cr: 22, xp: 41000, ac: 22, hp: 444, hitDice: '24d20', speed: 40,
    str: 29, dex: 10, con: 27, int: 18, wis: 17, cha: 21,
    attacks: [
      { name: 'Bite', toHit: 16, damage: '2d10+9', damageType: 'Piercing', description: 'Melee Weapon Attack: +16 to hit, reach 15 ft., one target. Hit: 20 (2d10 + 9) piercing damage.' },
      { name: 'Claw', toHit: 16, damage: '2d6+9', damageType: 'Slashing', description: 'Melee Weapon Attack: +16 to hit, reach 10 ft., one target. Hit: 16 (2d6 + 9) slashing damage.' },
      { name: 'Tail', toHit: 16, damage: '2d8+9', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +16 to hit, reach 20 ft., one target. Hit: 18 (2d8 + 9) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious', 'Legendary Resistance']
  },
  {
    id: 'ancient-copper-dragon', name: 'Ancient Copper Dragon',
    type: 'dragon', size: 'Gargantuan',
    cr: 21, xp: 33000, ac: 21, hp: 350, hitDice: '20d20', speed: 40,
    str: 27, dex: 12, con: 25, int: 20, wis: 17, cha: 19,
    attacks: [
      { name: 'Bite', toHit: 15, damage: '2d10+8', damageType: 'Piercing', description: 'Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage.' },
      { name: 'Claw', toHit: 15, damage: '2d6+8', damageType: 'Slashing', description: 'Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.' },
      { name: 'Tail', toHit: 15, damage: '2d8+8', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Legendary Resistance']
  },
  {
    id: 'ancient-gold-dragon', name: 'Ancient Gold Dragon',
    type: 'dragon', size: 'Gargantuan',
    cr: 24, xp: 62000, ac: 22, hp: 546, hitDice: '28d20', speed: 40,
    str: 30, dex: 14, con: 29, int: 18, wis: 17, cha: 28,
    attacks: [
      { name: 'Bite', toHit: 17, damage: '2d10+10', damageType: 'Piercing', description: 'Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage.' },
      { name: 'Claw', toHit: 17, damage: '2d6+10', damageType: 'Slashing', description: 'Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.' },
      { name: 'Tail', toHit: 17, damage: '2d8+10', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious', 'Legendary Resistance']
  },
  {
    id: 'ancient-green-dragon', name: 'Ancient Green Dragon',
    type: 'dragon', size: 'Gargantuan',
    cr: 22, xp: 41000, ac: 21, hp: 385, hitDice: '22d20', speed: 40,
    str: 27, dex: 12, con: 25, int: 20, wis: 17, cha: 19,
    attacks: [
      { name: 'Bite', toHit: 15, damage: '2d10+8', damageType: 'Piercing', extraDamage: '3d6', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +15 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 10 (3d6) poison damage.' },
      { name: 'Claw', toHit: 15, damage: '4d6+8', damageType: 'Slashing', description: 'Melee Weapon Attack: +15 to hit, reach 10 ft., one target. Hit: 22 (4d6 + 8) slashing damage.' },
      { name: 'Tail', toHit: 15, damage: '2d8+8', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +15 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious', 'Legendary Resistance']
  },
  {
    id: 'ancient-red-dragon', name: 'Ancient Red Dragon',
    type: 'dragon', size: 'Gargantuan',
    cr: 24, xp: 62000, ac: 22, hp: 546, hitDice: '28d20', speed: 40,
    str: 30, dex: 10, con: 29, int: 18, wis: 15, cha: 23,
    attacks: [
      { name: 'Bite', toHit: 17, damage: '2d10+10', damageType: 'Bludgeoning', extraDamage: '4d6', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage plus 14 (4d6) fire damage.' },
      { name: 'Claw', toHit: 17, damage: '2d6+10', damageType: 'Slashing', description: 'Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.' },
      { name: 'Tail', toHit: 17, damage: '2d8+10', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Legendary Resistance']
  },
  {
    id: 'ancient-silver-dragon', name: 'Ancient Silver Dragon',
    type: 'dragon', size: 'Gargantuan',
    cr: 23, xp: 50000, ac: 22, hp: 487, hitDice: '25d20', speed: 40,
    str: 30, dex: 10, con: 29, int: 18, wis: 15, cha: 23,
    attacks: [
      { name: 'Bite', toHit: 17, damage: '2d10+10', damageType: 'Piercing', description: 'Melee Weapon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage.' },
      { name: 'Claw', toHit: 17, damage: '2d6+10', damageType: 'Slashing', description: 'Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.' },
      { name: 'Tail', toHit: 17, damage: '2d8+10', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Legendary Resistance']
  },
  {
    id: 'ancient-white-dragon', name: 'Ancient White Dragon',
    type: 'dragon', size: 'Gargantuan',
    cr: 20, xp: 25000, ac: 20, hp: 333, hitDice: '18d20', speed: 40,
    str: 26, dex: 10, con: 26, int: 10, wis: 13, cha: 14,
    attacks: [
      { name: 'Bite', toHit: 14, damage: '2d10+8', damageType: 'Piercing', extraDamage: '2d8', extraDamageType: 'Cold', description: 'Melee Weapon Attack: +14 to hit, reach 15 ft., one target. Hit: 19 (2d10 + 8) piercing damage plus 9 (2d8) cold damage.' },
      { name: 'Claw', toHit: 14, damage: '2d6+8', damageType: 'Slashing', description: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) slashing damage.' },
      { name: 'Tail', toHit: 14, damage: '2d8+8', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +14 to hit, reach 20 ft., one target. Hit: 17 (2d8 + 8) bludgeoning damage.' },
    ],
    multiattack: 'The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Ice Walk', 'Legendary Resistance']
  },
  {
    id: 'androsphinx', name: 'Androsphinx',
    type: 'monstrosity', size: 'Large',
    cr: 17, xp: 18000, ac: 17, hp: 199, hitDice: '19d10', speed: 40,
    str: 22, dex: 10, con: 20, int: 16, wis: 18, cha: 23,
    attacks: [
      { name: 'Claw', toHit: 12, damage: '2d10+6', damageType: 'Slashing', description: 'Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 17 (2d10 + 6) slashing damage.' },
    ],
    multiattack: 'The sphinx makes two claw attacks.',
    specialAbilities: ['Inscrutable', 'Magic Weapons', 'Spellcasting']
  },
  {
    id: 'animated-armor', name: 'Animated Armor',
    type: 'construct', size: 'Medium',
    cr: 1, xp: 200, ac: 18, hp: 33, hitDice: '6d8', speed: 25,
    str: 14, dex: 11, con: 13, int: 1, wis: 3, cha: 1,
    attacks: [
      { name: 'Slam', toHit: 4, damage: '1d6+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage.' },
    ],
    multiattack: 'The armor makes two melee attacks.',
    specialAbilities: ['Antimagic Susceptibility', 'False Appearance']
  },
  {
    id: 'ankheg', name: 'Ankheg',
    type: 'monstrosity', size: 'Large',
    cr: 2, xp: 450, ac: 14, hp: 39, hitDice: '6d10', speed: 30,
    str: 17, dex: 11, con: 13, int: 1, wis: 13, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '2d6+3', damageType: 'Slashing', extraDamage: '1d6', extraDamageType: 'Acid', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage plus 3 (1d6) acid damage. If the target is a Large or smaller creature, it is grappled (escape DC 13). Until this grapple ends, the ankheg can bite only the grappled creature and has advantage on attack rolls to do so.' },
    ],
  },
  {
    id: 'ape', name: 'Ape',
    type: 'beast', size: 'Medium',
    cr: 0.5, xp: 100, ac: 12, hp: 19, hitDice: '3d8', speed: 30,
    str: 16, dex: 14, con: 14, int: 6, wis: 12, cha: 7,
    attacks: [
      { name: 'Fist', toHit: 5, damage: '1d6+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.' },
      { name: 'Rock', toHit: 5, damage: '1d6+3', damageType: 'Bludgeoning', description: 'Ranged Weapon Attack: +5 to hit, range 25/50 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.' },
    ],
    multiattack: 'The ape makes two fist attacks.'
  },
  {
    id: 'archmage', name: 'Archmage',
    type: 'humanoid', size: 'Medium',
    cr: 12, xp: 8400, ac: 12, hp: 99, hitDice: '18d8', speed: 30,
    str: 10, dex: 14, con: 12, int: 20, wis: 15, cha: 16,
    attacks: [
      { name: 'Dagger', toHit: 6, damage: '1d4+2', damageType: 'Piercing', description: 'Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage.' },
    ],
    specialAbilities: ['Magic Resistance', 'Spellcasting']
  },
  {
    id: 'assassin', name: 'Assassin',
    type: 'humanoid', size: 'Medium',
    cr: 8, xp: 3900, ac: 15, hp: 78, hitDice: '12d8', speed: 30,
    str: 11, dex: 16, con: 14, int: 13, wis: 11, cha: 10,
    attacks: [
      { name: 'Shortsword', toHit: 6, damage: '1d6+3', damageType: 'Piercing', extraDamage: '7d6', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.' },
      { name: 'Light Crossbow', toHit: 6, damage: '1d8+3', damageType: 'Piercing', extraDamage: '7d6', extraDamageType: 'Poison', description: 'Ranged Weapon Attack: +6 to hit, range 80/320 ft., one target. Hit: 7 (1d8 + 3) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.' },
    ],
    multiattack: 'The assassin makes two shortsword attacks.',
    specialAbilities: ['Assassinate', 'Evasion', 'Sneak Attack (1/Turn)']
  },
  {
    id: 'awakened-shrub', name: 'Awakened Shrub',
    type: 'plant', size: 'Small',
    cr: 0, xp: 10, ac: 9, hp: 10, hitDice: '3d6', speed: 20,
    str: 3, dex: 8, con: 11, int: 10, wis: 10, cha: 6,
    attacks: [
      { name: 'Rake', toHit: 1, damage: '1d4-1', damageType: 'Slashing', description: 'Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) slashing damage.' },
    ],
    specialAbilities: ['False Appearance']
  },
  {
    id: 'awakened-tree', name: 'Awakened Tree',
    type: 'plant', size: 'Huge',
    cr: 2, xp: 450, ac: 13, hp: 59, hitDice: '7d12', speed: 20,
    str: 19, dex: 6, con: 15, int: 10, wis: 10, cha: 7,
    attacks: [
      { name: 'Slam', toHit: 6, damage: '3d6+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage.' },
    ],
    specialAbilities: ['False Appearance']
  },
  {
    id: 'axe-beak', name: 'Axe Beak',
    type: 'beast', size: 'Large',
    cr: 0.25, xp: 50, ac: 11, hp: 19, hitDice: '3d10', speed: 50,
    str: 14, dex: 12, con: 12, int: 2, wis: 10, cha: 5,
    attacks: [
      { name: 'Beak', toHit: 4, damage: '1d8+2', damageType: 'Slashing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage.' },
    ],
  },
  {
    id: 'azer', name: 'Azer',
    type: 'elemental', size: 'Medium',
    cr: 2, xp: 450, ac: 15, hp: 39, hitDice: '6d8', speed: 30,
    str: 17, dex: 12, con: 15, int: 12, wis: 13, cha: 10,
    attacks: [
      { name: 'Warhammer', toHit: 5, damage: '1d8+3', damageType: 'Bludgeoning', extraDamage: '1d6', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage, or 8 (1d10 + 3) bludgeoning damage if used with two hands to make a melee attack, plus 3 (1d6) fire damage.' },
    ],
    specialAbilities: ['Heated Body', 'Heated Weapons', 'Illumination']
  },
  {
    id: 'baboon', name: 'Baboon',
    type: 'beast', size: 'Small',
    cr: 0, xp: 10, ac: 12, hp: 3, hitDice: '1d6', speed: 30,
    str: 8, dex: 14, con: 11, int: 4, wis: 12, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 1, damage: '1d4-1', damageType: 'Piercing', description: 'Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) piercing damage.' },
    ],
    specialAbilities: ['Pack Tactics']
  },
  {
    id: 'badger', name: 'Badger',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 10, hp: 3, hitDice: '1d4', speed: 20,
    str: 4, dex: 11, con: 12, int: 2, wis: 12, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 2, damage: '1', damageType: 'Piercing', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 piercing damage.' },
    ],
    specialAbilities: ['Keen Smell']
  },
  {
    id: 'balor', name: 'Balor',
    type: 'fiend', size: 'Huge',
    cr: 19, xp: 22000, ac: 19, hp: 262, hitDice: '21d12', speed: 40,
    str: 26, dex: 15, con: 22, int: 20, wis: 16, cha: 22,
    attacks: [
      { name: 'Longsword', toHit: 14, damage: '3d8+8', damageType: 'Slashing', extraDamage: '3d8', extraDamageType: 'Lightning', description: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) slashing damage plus 13 (3d8) lightning damage. If the balor scores a critical hit, it rolls damage dice three times, instead of twice.' },
      { name: 'Whip', toHit: 14, damage: '2d6+8', damageType: 'Slashing', extraDamage: '3d6', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +14 to hit, reach 30 ft., one target. Hit: 15 (2d6 + 8) slashing damage plus 10 (3d6) fire damage, and the target must succeed on a DC 20 Strength saving throw or be pulled up to 25 feet toward the balor.' },
    ],
    multiattack: 'The balor makes two attacks: one with its longsword and one with its whip.',
    specialAbilities: ['Death Throes', 'Fire Aura', 'Magic Resistance', 'Magic Weapons']
  },
  {
    id: 'bandit', name: 'Bandit',
    type: 'humanoid', size: 'Medium',
    cr: 0.125, xp: 25, ac: 12, hp: 11, hitDice: '2d8', speed: 30,
    str: 11, dex: 12, con: 12, int: 10, wis: 10, cha: 10,
    attacks: [
      { name: 'Scimitar', toHit: 3, damage: '1d6+1', damageType: 'Slashing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage.' },
      { name: 'Light Crossbow', toHit: 3, damage: '1d8+1', damageType: 'Piercing', description: 'Ranged Weapon Attack: +3 to hit, range 80 ft./320 ft., one target. Hit: 5 (1d8 + 1) piercing damage.' },
    ],
  },
  {
    id: 'bandit-captain', name: 'Bandit Captain',
    type: 'humanoid', size: 'Medium',
    cr: 2, xp: 450, ac: 15, hp: 65, hitDice: '10d8', speed: 30,
    str: 15, dex: 16, con: 14, int: 14, wis: 11, cha: 14,
    attacks: [
      { name: 'Scimitar', toHit: 5, damage: '1d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.' },
      { name: 'Dagger', toHit: 5, damage: '1d4+3', damageType: 'Piercing', description: 'Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d4 + 3) piercing damage.' },
    ],
    multiattack: 'The captain makes three melee attacks: two with its scimitar and one with its dagger. Or the captain makes two ranged attacks with its daggers.'
  },
  {
    id: 'barbed-devil', name: 'Barbed Devil',
    type: 'fiend', size: 'Medium',
    cr: 5, xp: 1800, ac: 15, hp: 110, hitDice: '13d8', speed: 30,
    str: 16, dex: 17, con: 18, int: 12, wis: 14, cha: 14,
    attacks: [
      { name: 'Claw', toHit: 6, damage: '1d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage.' },
      { name: 'Tail', toHit: 6, damage: '2d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage.' },
      { name: 'Hurl Flame', toHit: 5, damage: '3d6', damageType: 'Fire', description: 'Ranged Spell Attack: +5 to hit, range 150 ft., one target. Hit: 10 (3d6) fire damage. If the target is a flammable object that isn\'t being worn or carried, it also catches fire.' },
    ],
    multiattack: 'The devil makes three melee attacks: one with its tail and two with its claws. Alternatively, it can use Hurl Flame twice.',
    specialAbilities: ['Barbed Hide', 'Devil\'s Sight', 'Magic Resistance']
  },
  {
    id: 'basilisk', name: 'Basilisk',
    type: 'monstrosity', size: 'Medium',
    cr: 3, xp: 700, ac: 12, hp: 52, hitDice: '8d8', speed: 20,
    str: 16, dex: 8, con: 15, int: 2, wis: 8, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '2d6+3', damageType: 'Piercing', extraDamage: '2d6', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage plus 7 (2d6) poison damage.' },
    ],
    specialAbilities: ['Petrifying Gaze']
  },
  {
    id: 'bat', name: 'Bat',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 12, hp: 1, hitDice: '1d4', speed: 5,
    str: 2, dex: 15, con: 8, int: 2, wis: 12, cha: 4,
    attacks: [
      { name: 'Bite', toHit: 0, damage: '1', damageType: 'Piercing', description: 'Melee Weapon Attack: +0 to hit, reach 5 ft., one creature. Hit: 1 piercing damage.' },
    ],
    specialAbilities: ['Echolocation', 'Keen Hearing']
  },
  {
    id: 'bearded-devil', name: 'Bearded Devil',
    type: 'fiend', size: 'Medium',
    cr: 3, xp: 700, ac: 13, hp: 52, hitDice: '8d8', speed: 30,
    str: 16, dex: 15, con: 15, int: 9, wis: 11, cha: 11,
    attacks: [
      { name: 'Beard', toHit: 5, damage: '1d8+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) piercing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. While poisoned in this way, the target can\'t regain hit points. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.' },
      { name: 'Glaive', toHit: 5, damage: '1d10+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 10 ft., one target. Hit: 8 (1d10 + 3) slashing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 12 Constitution saving throw or lose 5 (1d10) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 5 (1d10). Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing.' },
    ],
    multiattack: 'The devil makes two attacks: one with its beard and one with its glaive.',
    specialAbilities: ['Devil\'s Sight', 'Magic Resistance', 'Steadfast']
  },
  {
    id: 'behir', name: 'Behir',
    type: 'monstrosity', size: 'Huge',
    cr: 11, xp: 7200, ac: 17, hp: 168, hitDice: '16d12', speed: 50,
    str: 23, dex: 16, con: 18, int: 7, wis: 14, cha: 12,
    attacks: [
      { name: 'Bite', toHit: 10, damage: '3d10+6', damageType: 'Piercing', description: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 22 (3d10 + 6) piercing damage.' },
      { name: 'Constrict', toHit: 10, damage: '2d10+6', damageType: 'Bludgeoning', extraDamage: '2d10+6', extraDamageType: 'Slashing', description: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one Large or smaller creature. Hit: 17 (2d10 + 6) bludgeoning damage plus 17 (2d10 + 6) slashing damage. The target is grappled (escape DC 16) if the behir isn\'t already constricting a creature, and the target is restrained until this grapple ends.' },
    ],
    multiattack: 'The behir makes two attacks: one with its bite and one to constrict.'
  },
  {
    id: 'berserker', name: 'Berserker',
    type: 'humanoid', size: 'Medium',
    cr: 2, xp: 450, ac: 13, hp: 67, hitDice: '9d8', speed: 30,
    str: 16, dex: 12, con: 17, int: 9, wis: 11, cha: 9,
    attacks: [
      { name: 'Greataxe', toHit: 5, damage: '1d12+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage.' },
    ],
    specialAbilities: ['Reckless']
  },
  {
    id: 'black-bear', name: 'Black Bear',
    type: 'beast', size: 'Medium',
    cr: 0.5, xp: 100, ac: 11, hp: 19, hitDice: '3d8', speed: 40,
    str: 15, dex: 10, con: 14, int: 2, wis: 12, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 3, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Claws', toHit: 3, damage: '2d4+2', damageType: 'Slashing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage.' },
    ],
    multiattack: 'The bear makes two attacks: one with its bite and one with its claws.',
    specialAbilities: ['Keen Smell']
  },
  {
    id: 'black-dragon-wyrmling', name: 'Black Dragon Wyrmling',
    type: 'dragon', size: 'Medium',
    cr: 2, xp: 450, ac: 17, hp: 33, hitDice: '6d8', speed: 30,
    str: 15, dex: 14, con: 13, int: 10, wis: 11, cha: 13,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d10+2', damageType: 'Piercing', extraDamage: '1d4', extraDamageType: 'Acid', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 2 (1d4) acid damage.' },
    ],
    specialAbilities: ['Amphibious']
  },
  {
    id: 'black-pudding', name: 'Black Pudding',
    type: 'ooze', size: 'Large',
    cr: 4, xp: 1100, ac: 7, hp: 85, hitDice: '10d10', speed: 20,
    str: 16, dex: 5, con: 16, int: 1, wis: 6, cha: 1,
    attacks: [
      { name: 'Pseudopod', toHit: 5, damage: '1d6+3', damageType: 'Bludgeoning', extraDamage: '4d8', extraDamageType: 'Acid', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage plus 18 (4d8) acid damage. In addition, nonmagical armor worn by the target is partly dissolved and takes a permanent and cumulative -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10.' },
    ],
    specialAbilities: ['Amorphous', 'Corrosive Form', 'Spider Climb']
  },
  {
    id: 'blink-dog', name: 'Blink Dog',
    type: 'fey', size: 'Medium',
    cr: 0.25, xp: 50, ac: 13, hp: 22, hitDice: '4d8', speed: 40,
    str: 12, dex: 17, con: 12, int: 10, wis: 13, cha: 11,
    attacks: [
      { name: 'Bite', toHit: 3, damage: '1d6+1', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage.' },
    ],
    specialAbilities: ['Keen Hearing and Smell']
  },
  {
    id: 'blood-hawk', name: 'Blood Hawk',
    type: 'beast', size: 'Small',
    cr: 0.125, xp: 25, ac: 12, hp: 7, hitDice: '2d6', speed: 10,
    str: 6, dex: 14, con: 10, int: 3, wis: 14, cha: 5,
    attacks: [
      { name: 'Beak', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.' },
    ],
    specialAbilities: ['Keen Sight', 'Pack Tactics']
  },
  {
    id: 'blue-dragon-wyrmling', name: 'Blue Dragon Wyrmling',
    type: 'dragon', size: 'Medium',
    cr: 3, xp: 700, ac: 17, hp: 52, hitDice: '8d8', speed: 30,
    str: 17, dex: 10, con: 15, int: 12, wis: 11, cha: 15,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d10+3', damageType: 'Piercing', extraDamage: '1d6', extraDamageType: 'Lightning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage plus 3 (1d6) lightning damage.' },
    ],
  },
  {
    id: 'boar', name: 'Boar',
    type: 'beast', size: 'Medium',
    cr: 0.25, xp: 50, ac: 11, hp: 11, hitDice: '2d8', speed: 40,
    str: 13, dex: 11, con: 12, int: 2, wis: 9, cha: 5,
    attacks: [
      { name: 'Tusk', toHit: 3, damage: '1d6+1', damageType: 'Slashing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) slashing damage.' },
    ],
    specialAbilities: ['Charge', 'Relentless']
  },
  {
    id: 'bone-devil', name: 'Bone Devil',
    type: 'fiend', size: 'Large',
    cr: 9, xp: 5000, ac: 19, hp: 142, hitDice: '15d10', speed: 40,
    str: 18, dex: 16, con: 18, int: 13, wis: 14, cha: 16,
    attacks: [
      { name: 'Claw', toHit: 8, damage: '1d8+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 8 (1d8 + 4) slashing damage.' },
      { name: 'Sting', toHit: 8, damage: '2d8+4', damageType: 'Piercing', extraDamage: '5d6', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 13 (2d8 + 4) piercing damage plus 17 (5d6) poison damage, and the target must succeed on a DC 14 Constitution saving throw or become poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.' },
    ],
    multiattack: 'The devil makes three attacks: two with its claws and one with its sting.',
    specialAbilities: ['Devil\'s Sight', 'Magic Resistance']
  },
  {
    id: 'brass-dragon-wyrmling', name: 'Brass Dragon Wyrmling',
    type: 'dragon', size: 'Medium',
    cr: 1, xp: 100, ac: 16, hp: 16, hitDice: '3d8', speed: 30,
    str: 15, dex: 10, con: 13, int: 10, wis: 11, cha: 13,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d10+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage.' },
    ],
  },
  {
    id: 'bronze-dragon-wyrmling', name: 'Bronze Dragon Wyrmling',
    type: 'dragon', size: 'Medium',
    cr: 2, xp: 450, ac: 17, hp: 32, hitDice: '5d8', speed: 30,
    str: 17, dex: 10, con: 15, int: 12, wis: 11, cha: 15,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d10+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage.' },
    ],
    specialAbilities: ['Amphibious']
  },
  {
    id: 'brown-bear', name: 'Brown Bear',
    type: 'beast', size: 'Large',
    cr: 1, xp: 200, ac: 11, hp: 34, hitDice: '4d10', speed: 40,
    str: 19, dex: 10, con: 16, int: 2, wis: 13, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d8+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.' },
      { name: 'Claws', toHit: 5, damage: '2d6+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.' },
    ],
    multiattack: 'The bear makes two attacks: one with its bite and one with its claws.',
    specialAbilities: ['Keen Smell']
  },
  {
    id: 'bugbear', name: 'Bugbear',
    type: 'humanoid', size: 'Medium',
    cr: 1, xp: 200, ac: 16, hp: 27, hitDice: '5d8', speed: 30,
    str: 15, dex: 14, con: 13, int: 8, wis: 11, cha: 9,
    attacks: [
      { name: 'Morningstar', toHit: 4, damage: '2d8+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 11 (2d8 + 2) piercing damage.' },
      { name: 'Javelin', toHit: 4, damage: '2d6+2', damageType: 'Piercing', description: 'Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 9 (2d6 + 2) piercing damage in melee or 5 (1d6 + 2) piercing damage at range.' },
    ],
    specialAbilities: ['Brute', 'Surprise Attack']
  },
  {
    id: 'bulette', name: 'Bulette',
    type: 'monstrosity', size: 'Large',
    cr: 5, xp: 1800, ac: 17, hp: 94, hitDice: '9d10', speed: 40,
    str: 19, dex: 11, con: 21, int: 2, wis: 10, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '4d12+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 30 (4d12 + 4) piercing damage.' },
    ],
    specialAbilities: ['Standing Leap']
  },
  {
    id: 'camel', name: 'Camel',
    type: 'beast', size: 'Large',
    cr: 0.125, xp: 25, ac: 9, hp: 15, hitDice: '2d10', speed: 50,
    str: 16, dex: 8, con: 14, int: 2, wis: 8, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.' },
    ],
  },
  {
    id: 'cat', name: 'Cat',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 12, hp: 2, hitDice: '1d4', speed: 40,
    str: 3, dex: 15, con: 10, int: 3, wis: 12, cha: 7,
    attacks: [
      { name: 'Claws', toHit: 0, damage: '1', damageType: 'Slashing', description: 'Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 slashing damage.' },
    ],
    specialAbilities: ['Keen Smell']
  },
  {
    id: 'centaur', name: 'Centaur',
    type: 'monstrosity', size: 'Large',
    cr: 2, xp: 450, ac: 12, hp: 45, hitDice: '6d10', speed: 50,
    str: 18, dex: 14, con: 14, int: 9, wis: 13, cha: 11,
    attacks: [
      { name: 'Pike', toHit: 6, damage: '1d10+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 9 (1d10 + 4) piercing damage.' },
      { name: 'Hooves', toHit: 6, damage: '2d6+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.' },
      { name: 'Longbow', toHit: 4, damage: '1d8+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.' },
    ],
    multiattack: 'The centaur makes two attacks: one with its pike and one with its hooves or two with its longbow.',
    specialAbilities: ['Charge']
  },
  {
    id: 'chain-devil', name: 'Chain Devil',
    type: 'fiend', size: 'Medium',
    cr: 8, xp: 3900, ac: 16, hp: 85, hitDice: '10d8', speed: 30,
    str: 18, dex: 15, con: 18, int: 11, wis: 12, cha: 14,
    attacks: [
      { name: 'Chain', toHit: 8, damage: '2d6+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) slashing damage. The target is grappled (escape DC 14) if the devil isn\'t already grappling a creature. Until this grapple ends, the target is restrained and takes 7 (2d6) piercing damage at the start of each of its turns.' },
    ],
    multiattack: 'The devil makes two attacks with its chains.',
    specialAbilities: ['Devil\'s Sight', 'Magic Resistance']
  },
  {
    id: 'chimera', name: 'Chimera',
    type: 'monstrosity', size: 'Large',
    cr: 6, xp: 2300, ac: 14, hp: 114, hitDice: '12d10', speed: 30,
    str: 19, dex: 11, con: 19, int: 3, wis: 14, cha: 10,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '2d6+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage.' },
      { name: 'Horns', toHit: 7, damage: '1d12+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (1d12 + 4) bludgeoning damage.' },
      { name: 'Claws', toHit: 7, damage: '2d6+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.' },
    ],
    multiattack: 'The chimera makes three attacks: one with its bite, one with its horns, and one with its claws. When its fire breath is available, it can use the breath in place of its bite or horns.'
  },
  {
    id: 'chuul', name: 'Chuul',
    type: 'aberration', size: 'Large',
    cr: 4, xp: 1100, ac: 16, hp: 93, hitDice: '11d10', speed: 30,
    str: 19, dex: 10, con: 16, int: 5, wis: 11, cha: 5,
    attacks: [
      { name: 'Pincer', toHit: 6, damage: '2d6+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage. The target is grappled (escape DC 14) if it is a Large or smaller creature and the chuul doesn\'t have two other creatures grappled.' },
    ],
    multiattack: 'The chuul makes two pincer attacks. If the chuul is grappling a creature, the chuul can also use its tentacles once.',
    specialAbilities: ['Amphibious', 'Sense Magic']
  },
  {
    id: 'clay-golem', name: 'Clay Golem',
    type: 'construct', size: 'Large',
    cr: 9, xp: 5000, ac: 14, hp: 133, hitDice: '14d10', speed: 20,
    str: 20, dex: 9, con: 18, int: 3, wis: 8, cha: 1,
    attacks: [
      { name: 'Slam', toHit: 8, damage: '2d10+5', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 15 Constitution saving throw or have its hit point maximum reduced by an amount equal to the damage taken. The target dies if this attack reduces its hit point maximum to 0. The reduction lasts until removed by the greater restoration spell or other magic.' },
    ],
    multiattack: 'The golem makes two slam attacks.',
    specialAbilities: ['Acid Absorption', 'Berserk', 'Immutable Form', 'Magic Resistance', 'Magic Weapons']
  },
  {
    id: 'cloaker', name: 'Cloaker',
    type: 'aberration', size: 'Large',
    cr: 8, xp: 3900, ac: 14, hp: 78, hitDice: '12d10', speed: 10,
    str: 17, dex: 15, con: 12, int: 13, wis: 12, cha: 14,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '2d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 10 (2d6 + 3) piercing damage, and if the target is Large or smaller, the cloaker attaches to it. If the cloaker has advantage against the target, the cloaker attaches to the target\'s head, and the target is blinded and unable to breathe while the cloaker is attached. While attached, the cloaker can make this attack only against the target and has advantage on the attack roll. The cloaker can detach itself by spending 5 feet of its movement. A creature, including the target, can take its action to detach the cloaker by succeeding on a DC 16 Strength check.' },
      { name: 'Tail', toHit: 6, damage: '1d8+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 7 (1d8 + 3) slashing damage.' },
    ],
    multiattack: 'The cloaker makes two attacks: one with its bite and one with its tail.',
    specialAbilities: ['Damage Transfer', 'False Appearance', 'Light Sensitivity']
  },
  {
    id: 'cloud-giant', name: 'Cloud Giant',
    type: 'giant', size: 'Huge',
    cr: 9, xp: 5000, ac: 14, hp: 200, hitDice: '16d12', speed: 40,
    str: 27, dex: 10, con: 22, int: 12, wis: 16, cha: 16,
    attacks: [
      { name: 'Morningstar', toHit: 12, damage: '3d8+8', damageType: 'Piercing', description: 'Melee Weapon Attack: +12 to hit, reach 10 ft., one target. Hit: 21 (3d8 + 8) piercing damage.' },
      { name: 'Rock', toHit: 12, damage: '4d10+8', damageType: 'Bludgeoning', description: 'Ranged Weapon Attack: +12 to hit, range 60/240 ft., one target. Hit: 30 (4d10 + 8) bludgeoning damage.' },
    ],
    multiattack: 'The giant makes two morningstar attacks.',
    specialAbilities: ['Keen Smell', 'Innate Spellcasting']
  },
  {
    id: 'cockatrice', name: 'Cockatrice',
    type: 'monstrosity', size: 'Small',
    cr: 0.5, xp: 100, ac: 11, hp: 27, hitDice: '6d6', speed: 20,
    str: 6, dex: 12, con: 12, int: 2, wis: 13, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 3, damage: '1d4+1', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) piercing damage, and the target must succeed on a DC 11 Constitution saving throw against being magically petrified. On a failed save, the creature begins to turn to stone and is restrained. It must repeat the saving throw at the end of its next turn. On a success, the effect ends. On a failure, the creature is petrified for 24 hours.' },
    ],
  },
  {
    id: 'commoner', name: 'Commoner',
    type: 'humanoid', size: 'Medium',
    cr: 0, xp: 10, ac: 10, hp: 4, hitDice: '1d8', speed: 30,
    str: 10, dex: 10, con: 10, int: 10, wis: 10, cha: 10,
    attacks: [
      { name: 'Club', toHit: 2, damage: '1d4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.' },
    ],
  },
  {
    id: 'constrictor-snake', name: 'Constrictor Snake',
    type: 'beast', size: 'Large',
    cr: 0.25, xp: 50, ac: 12, hp: 13, hitDice: '2d10', speed: 30,
    str: 15, dex: 14, con: 12, int: 1, wis: 10, cha: 3,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Constrict', toHit: 4, damage: '1d8+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 14). Until this grapple ends, the creature is restrained, and the snake can\'t constrict another target.' },
    ],
  },
  {
    id: 'copper-dragon-wyrmling', name: 'Copper Dragon Wyrmling',
    type: 'dragon', size: 'Medium',
    cr: 1, xp: 200, ac: 16, hp: 22, hitDice: '4d8', speed: 30,
    str: 15, dex: 12, con: 13, int: 14, wis: 11, cha: 13,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d10+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage.' },
    ],
  },
  {
    id: 'couatl', name: 'Couatl',
    type: 'celestial', size: 'Medium',
    cr: 4, xp: 1100, ac: 19, hp: 97, hitDice: '13d8', speed: 30,
    str: 16, dex: 20, con: 17, int: 18, wis: 20, cha: 18,
    attacks: [
      { name: 'Bite', toHit: 8, damage: '1d6+5', damageType: 'Piercing', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one creature. Hit: 8 (1d6 + 5) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 24 hours. Until this poison ends, the target is unconscious. Another creature can use an action to shake the target awake.' },
      { name: 'Constrict', toHit: 6, damage: '2d6+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one Medium or smaller creature. Hit: 10 (2d6 + 3) bludgeoning damage, and the target is grappled (escape DC 15). Until this grapple ends, the target is restrained, and the couatl can\'t constrict another target.' },
    ],
    specialAbilities: ['Innate Spellcasting', 'Magic Weapons', 'Shielded Mind']
  },
  {
    id: 'crab', name: 'Crab',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 11, hp: 2, hitDice: '1d4', speed: 20,
    str: 2, dex: 11, con: 10, int: 1, wis: 8, cha: 2,
    attacks: [
      { name: 'Claw', toHit: 0, damage: '1', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage.' },
    ],
    specialAbilities: ['Amphibious']
  },
  {
    id: 'crocodile', name: 'Crocodile',
    type: 'beast', size: 'Large',
    cr: 0.5, xp: 100, ac: 12, hp: 19, hitDice: '3d10', speed: 20,
    str: 15, dex: 10, con: 13, int: 2, wis: 10, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d10+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target is grappled (escape DC 12). Until this grapple ends, the target is restrained, and the crocodile can\'t bite another target' },
    ],
    specialAbilities: ['Hold Breath']
  },
  {
    id: 'cult-fanatic', name: 'Cult Fanatic',
    type: 'humanoid', size: 'Medium',
    cr: 2, xp: 450, ac: 13, hp: 22, hitDice: '6d8', speed: 30,
    str: 11, dex: 14, con: 12, int: 10, wis: 13, cha: 14,
    attacks: [
      { name: 'Dagger', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one creature. Hit: 4 (1d4 + 2) piercing damage.' },
    ],
    multiattack: 'The fanatic makes two melee attacks.',
    specialAbilities: ['Dark Devotion', 'Spellcasting']
  },
  {
    id: 'cultist', name: 'Cultist',
    type: 'humanoid', size: 'Medium',
    cr: 0.125, xp: 25, ac: 12, hp: 9, hitDice: '2d8', speed: 30,
    str: 11, dex: 12, con: 10, int: 10, wis: 11, cha: 10,
    attacks: [
      { name: 'Scimitar', toHit: 3, damage: '1d6+1', damageType: 'Slashing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6 + 1) slashing damage.' },
    ],
    specialAbilities: ['Dark Devotion']
  },
  {
    id: 'darkmantle', name: 'Darkmantle',
    type: 'monstrosity', size: 'Small',
    cr: 0.5, xp: 100, ac: 11, hp: 22, hitDice: '5d6', speed: 10,
    str: 16, dex: 12, con: 13, int: 2, wis: 10, cha: 5,
    attacks: [
      { name: 'Crush', toHit: 5, damage: '1d6+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 6 (1d6 + 3) bludgeoning damage, and the darkmantle attaches to the target. If the target is Medium or smaller and the darkmantle has advantage on the attack roll, it attaches by engulfing the target\'s head, and the target is also blinded and unable to breathe while the darkmantle is attached in this way.\nWhile attached to the target, the darkmantle can attack no other creature except the target but has advantage on its attack rolls. The darkmantle\'s speed also becomes 0, it can\'t benefit from any bonus to its speed, and it moves with the target.\nA creature can detach the darkmantle by making a successful DC 13 Strength check as an action. On its turn, the darkmantle can detach itself from the target by using 5 feet of movement.' },
    ],
    specialAbilities: ['Echolocation', 'False Appearance']
  },
  {
    id: 'death-dog', name: 'Death Dog',
    type: 'monstrosity', size: 'Medium',
    cr: 1, xp: 200, ac: 12, hp: 39, hitDice: '6d8', speed: 40,
    str: 15, dex: 14, con: 14, int: 3, wis: 13, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d6+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage. If the target is a creature, it must succeed on a DC 12 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the creature must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. This reduction lasts until the disease is cured. The creature dies if the disease reduces its hit point maximum to 0.' },
    ],
    multiattack: 'The dog makes two bite attacks.',
    specialAbilities: ['Two-Headed']
  },
  {
    id: 'deep-gnome-svirfneblin', name: 'Deep Gnome (Svirfneblin)',
    type: 'humanoid', size: 'Small',
    cr: 0.5, xp: 50, ac: 15, hp: 16, hitDice: '3d6', speed: 20,
    str: 15, dex: 14, con: 14, int: 12, wis: 10, cha: 9,
    attacks: [
      { name: 'War Pick', toHit: 4, damage: '1d8+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.' },
      { name: 'Poisoned Dart', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 30/120 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 12 Constitution saving throw or be poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success' },
    ],
    specialAbilities: ['Stone Camouflage', 'Gnome Cunning', 'Innate Spellcasting']
  },
  {
    id: 'deer', name: 'Deer',
    type: 'beast', size: 'Medium',
    cr: 0, xp: 10, ac: 13, hp: 4, hitDice: '1d8', speed: 50,
    str: 11, dex: 16, con: 11, int: 2, wis: 14, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 2, damage: '1d4', damageType: 'Piercing', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage.' },
    ],
  },
  {
    id: 'deva', name: 'Deva',
    type: 'celestial', size: 'Medium',
    cr: 10, xp: 5900, ac: 17, hp: 136, hitDice: '16d8', speed: 30,
    str: 18, dex: 18, con: 18, int: 17, wis: 20, cha: 20,
    attacks: [
      { name: 'Mace', toHit: 8, damage: '1d6+4', damageType: 'Bludgeoning', extraDamage: '4d8', extraDamageType: 'Radiant', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage plus 18 (4d8) radiant damage.' },
    ],
    multiattack: 'The deva makes two melee attacks.',
    specialAbilities: ['Angelic Weapons', 'Innate Spellcasting', 'Magic Resistance']
  },
  {
    id: 'dire-wolf', name: 'Dire Wolf',
    type: 'beast', size: 'Large',
    cr: 1, xp: 200, ac: 14, hp: 37, hitDice: '5d10', speed: 50,
    str: 17, dex: 15, con: 15, int: 3, wis: 12, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '2d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.' },
    ],
    specialAbilities: ['Keen Hearing and Smell', 'Pack Tactics']
  },
  {
    id: 'djinni', name: 'Djinni',
    type: 'elemental', size: 'Large',
    cr: 11, xp: 7200, ac: 17, hp: 161, hitDice: '14d10', speed: 30,
    str: 21, dex: 15, con: 22, int: 15, wis: 16, cha: 20,
    attacks: [
      { name: 'Scimitar', toHit: 9, damage: '2d6+5', damageType: 'Slashing', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage plus 3 (1d6) lightning or thunder damage (djinni\'s choice).' },
    ],
    multiattack: 'The djinni makes three scimitar attacks.',
    specialAbilities: ['Elemental Demise', 'Innate Spellcasting']
  },
  {
    id: 'doppelganger', name: 'Doppelganger',
    type: 'monstrosity', size: 'Medium',
    cr: 3, xp: 700, ac: 14, hp: 52, hitDice: '8d8', speed: 30,
    str: 11, dex: 18, con: 14, int: 11, wis: 12, cha: 14,
    attacks: [
      { name: 'Slam', toHit: 6, damage: '1d6+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) bludgeoning damage.' },
    ],
    multiattack: 'The doppelganger makes two melee attacks.',
    specialAbilities: ['Shapechanger', 'Ambusher', 'Surprise Attack']
  },
  {
    id: 'draft-horse', name: 'Draft Horse',
    type: 'beast', size: 'Large',
    cr: 0.25, xp: 50, ac: 10, hp: 19, hitDice: '3d10', speed: 40,
    str: 18, dex: 10, con: 12, int: 2, wis: 11, cha: 7,
    attacks: [
      { name: 'Hooves', toHit: 6, damage: '2d4+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) bludgeoning damage.' },
    ],
  },
  {
    id: 'dragon-turtle', name: 'Dragon Turtle',
    type: 'dragon', size: 'Gargantuan',
    cr: 17, xp: 18000, ac: 20, hp: 341, hitDice: '22d20', speed: 20,
    str: 25, dex: 10, con: 20, int: 10, wis: 12, cha: 12,
    attacks: [
      { name: 'Bite', toHit: 13, damage: '3d12+7', damageType: 'Piercing', description: 'Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 26 (3d12 + 7) piercing damage.' },
      { name: 'Claw', toHit: 13, damage: '2d8+7', damageType: 'Piercing', description: 'Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 16 (2d8 + 7) slashing damage.' },
      { name: 'Tail', toHit: 13, damage: '3d12+7', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +13 to hit, reach 15 ft., one target. Hit: 26 (3d12 + 7) bludgeoning damage. If the target is a creature, it must succeed on a DC 20 Strength saving throw or be pushed up to 10 feet away from the dragon turtle and knocked prone.' },
    ],
    multiattack: 'The dragon turtle makes three attacks: one with its bite and two with its claws. It can make one tail attack in place of its two claw attacks.',
    specialAbilities: ['Amphibious']
  },
  {
    id: 'dretch', name: 'Dretch',
    type: 'fiend', size: 'Small',
    cr: 0.25, xp: 25, ac: 11, hp: 18, hitDice: '4d6', speed: 20,
    str: 11, dex: 11, con: 12, int: 5, wis: 8, cha: 3,
    attacks: [
      { name: 'Bite', toHit: 2, damage: '1d6', damageType: 'Piercing', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage.' },
      { name: 'Claws', toHit: 2, damage: '2d4', damageType: 'Slashing', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 5 (2d4) slashing damage.' },
    ],
    multiattack: 'The dretch makes two attacks: one with its bite and one with its claws.'
  },
  {
    id: 'drider', name: 'Drider',
    type: 'monstrosity', size: 'Large',
    cr: 6, xp: 2300, ac: 19, hp: 123, hitDice: '13d10', speed: 30,
    str: 16, dex: 16, con: 18, int: 13, wis: 14, cha: 12,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '1d4', damageType: 'Piercing', extraDamage: '2d8', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 2 (1d4) piercing damage plus 9 (2d8) poison damage.' },
      { name: 'Longsword', toHit: 6, damage: '1d4', damageType: 'bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.' },
      { name: 'Longbow', toHit: 6, damage: '1d8+3', damageType: 'Piercing', extraDamage: '1d8', extraDamageType: 'Poison', description: 'Ranged Weapon Attack: +6 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 4 (1d8) poison damage.' },
    ],
    multiattack: 'The drider makes three attacks, either with its longsword or its longbow. It can replace one of those attacks with a bite attack.',
    specialAbilities: ['Fey Ancestry', 'Innate Spellcasting', 'Spider Climb', 'Sunlight Sensitivity', 'Web Walker']
  },
  {
    id: 'drow', name: 'Drow',
    type: 'humanoid', size: 'Medium',
    cr: 0.25, xp: 50, ac: 15, hp: 13, hitDice: '3d8', speed: 30,
    str: 10, dex: 14, con: 10, int: 11, wis: 11, cha: 12,
    attacks: [
      { name: 'Shortsword', toHit: 4, damage: '1d6+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Hand Crossbow', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage, and the target must succeed on a DC 13 Constitution saving throw or be poisoned for 1 hour. If the saving throw fails by 5 or more, the target is also unconscious while poisoned in this way. The target wakes up if it takes damage or if another creature takes an action to shake it awake.' },
    ],
    specialAbilities: ['Fey Ancestry', 'Innate Spellcasting', 'Sunlight Sensitivity']
  },
  {
    id: 'druid', name: 'Druid',
    type: 'humanoid', size: 'Medium',
    cr: 2, xp: 450, ac: 11, hp: 27, hitDice: '5d8', speed: 30,
    str: 10, dex: 12, con: 13, int: 12, wis: 15, cha: 11,
    attacks: [
      { name: 'Quarterstaff', toHit: 2, damage: '1d4', damageType: 'bludgeoning', description: ' Melee Weapon Attack: +2 to hit (+4 to hit with shillelagh), reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage, 4 (1d8) bludgeoning damage if wielded with two hands, or 6 (1d8 + 2) bludgeoning damage with shillelagh.' },
    ],
    specialAbilities: ['Spellcasting']
  },
  {
    id: 'dryad', name: 'Dryad',
    type: 'fey', size: 'Medium',
    cr: 1, xp: 200, ac: 11, hp: 22, hitDice: '5d8', speed: 30,
    str: 10, dex: 12, con: 11, int: 14, wis: 15, cha: 18,
    attacks: [
      { name: 'Club', toHit: 2, damage: '1d4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +2 to hit (+6 to hit with shillelagh), reach 5 ft., one target. Hit: 2 (1 d4) bludgeoning damage, or 8 (1d8 + 4) bludgeoning damage with shillelagh.' },
    ],
    specialAbilities: ['Innate Spellcasting', 'Magic Resistance', 'Speak with Beasts and Plants', 'Tree Stride']
  },
  {
    id: 'duergar', name: 'Duergar',
    type: 'humanoid', size: 'Medium',
    cr: 1, xp: 200, ac: 16, hp: 26, hitDice: '4d8', speed: 25,
    str: 14, dex: 11, con: 14, int: 11, wis: 10, cha: 9,
    attacks: [
      { name: 'War Pick', toHit: 4, damage: '1d8+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage, or 11 (2d8 + 2) piercing damage while enlarged.' },
      { name: 'Javelin', toHit: 4, damage: '1d6+2', damageType: 'Bludgeoning', description: 'Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 9 (2d6 + 2) piercing damage while enlarged.' },
    ],
    specialAbilities: ['Duergar Resilience', 'Sunlight Sensitivity']
  },
  {
    id: 'dust-mephit', name: 'Dust Mephit',
    type: 'elemental', size: 'Small',
    cr: 0.5, xp: 100, ac: 12, hp: 17, hitDice: '5d6', speed: 30,
    str: 5, dex: 14, con: 10, int: 9, wis: 11, cha: 10,
    attacks: [
      { name: 'Claws', toHit: 4, damage: '1d4+2', damageType: 'Slashing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) slashing damage.' },
    ],
    specialAbilities: ['Death Burst', 'Innate Spellcasting']
  },
  {
    id: 'eagle', name: 'Eagle',
    type: 'beast', size: 'Small',
    cr: 0, xp: 10, ac: 12, hp: 3, hitDice: '1d6', speed: 10,
    str: 6, dex: 15, con: 10, int: 2, wis: 14, cha: 7,
    attacks: [
      { name: 'Talons', toHit: 4, damage: '1d4+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage.' },
    ],
    specialAbilities: ['Keen Sight']
  },
  {
    id: 'earth-elemental', name: 'Earth Elemental',
    type: 'elemental', size: 'Large',
    cr: 5, xp: 1800, ac: 17, hp: 126, hitDice: '12d10', speed: 30,
    str: 20, dex: 8, con: 20, int: 5, wis: 10, cha: 5,
    attacks: [
      { name: 'Slam', toHit: 8, damage: '2d8+5', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage.' },
    ],
    multiattack: 'The elemental makes two slam attacks.',
    specialAbilities: ['Earth Glide', 'Siege Monster']
  },
  {
    id: 'efreeti', name: 'Efreeti',
    type: 'elemental', size: 'Large',
    cr: 11, xp: 7200, ac: 17, hp: 200, hitDice: '16d10', speed: 40,
    str: 22, dex: 12, con: 24, int: 16, wis: 15, cha: 16,
    attacks: [
      { name: 'Scimitar', toHit: 10, damage: '2d6+6', damageType: 'Slashing', extraDamage: '2d6', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage plus 7 (2d6) fire damage.' },
      { name: 'Hurl Flame', toHit: 7, damage: '5d6', damageType: 'Fire', description: 'Ranged Spell Attack: +7 to hit, range 120 ft., one target. Hit: 17 (5d6) fire damage.' },
    ],
    multiattack: 'The efreeti makes two scimitar attacks or uses its Hurl Flame twice.',
    specialAbilities: ['Elemental Demise', 'Innate Spellcasting']
  },
  {
    id: 'elephant', name: 'Elephant',
    type: 'beast', size: 'Huge',
    cr: 4, xp: 1100, ac: 12, hp: 76, hitDice: '8d12', speed: 40,
    str: 22, dex: 9, con: 17, int: 3, wis: 11, cha: 6,
    attacks: [
      { name: 'Gore', toHit: 8, damage: '3d8+6', damageType: 'Piercing', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 19 (3d8 + 6) piercing damage.' },
      { name: 'Stomp', toHit: 8, damage: '3d10+6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one prone creature. Hit: 22 (3d10 + 6) bludgeoning damage.' },
    ],
    specialAbilities: ['Trampling Charge']
  },
  {
    id: 'elk', name: 'Elk',
    type: 'beast', size: 'Large',
    cr: 0.25, xp: 50, ac: 10, hp: 13, hitDice: '2d10', speed: 50,
    str: 16, dex: 10, con: 12, int: 2, wis: 10, cha: 6,
    attacks: [
      { name: 'Ram', toHit: 5, damage: '1d6+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) bludgeoning damage.' },
      { name: 'Hooves', toHit: 5, damage: '2d4+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one prone creature. Hit: 8 (2d4 + 3) bludgeoning damage.' },
    ],
    specialAbilities: ['Charge']
  },
  {
    id: 'erinyes', name: 'Erinyes',
    type: 'fiend', size: 'Medium',
    cr: 12, xp: 8400, ac: 18, hp: 153, hitDice: '18d8', speed: 30,
    str: 18, dex: 16, con: 18, int: 14, wis: 14, cha: 18,
    attacks: [
      { name: 'Longsword', toHit: 8, damage: '1d4', damageType: 'bludgeoning', extraDamage: '3d8', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage, or 9 (1d10 + 4) slashing damage if used with two hands, plus 13 (3d8) poison damage.' },
      { name: 'Longbow', toHit: 7, damage: '1d8+3', damageType: 'Piercing', extraDamage: '3d8', extraDamageType: 'Poison', description: 'Ranged Weapon Attack: +7 to hit, range 150/600 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 13 (3d8) poison damage, and the target must succeed on a DC 14 Constitution saving throw or be poisoned. The poison lasts until it is removed by the lesser restoration spell or similar magic.' },
    ],
    multiattack: 'The erinyes makes three attacks',
    specialAbilities: ['Hellish Weapons', 'Magic Resistance']
  },
  {
    id: 'ettercap', name: 'Ettercap',
    type: 'monstrosity', size: 'Medium',
    cr: 2, xp: 450, ac: 13, hp: 44, hitDice: '8d8', speed: 30,
    str: 14, dex: 15, con: 13, int: 7, wis: 12, cha: 8,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '2d6+2', damageType: 'Piercing', extraDamage: '1d8', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 6 (1d8 + 2) piercing damage plus 4 (1d8) poison damage. The target must succeed on a DC 11 Constitution saving throw or be poisoned for 1 minute. The creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.' },
      { name: 'Claws', toHit: 4, damage: '2d4+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage.' },
      { name: 'Web', toHit: 4, damage: '1d4', damageType: 'bludgeoning', description: 'Ranged Weapon Attack: +4 to hit, range 30/60 ft., one Large or smaller creature. Hit: The creature is restrained by webbing. As an action, the restrained creature can make a DC 11 Strength check, escaping from the webbing on a success. The effect ends if the webbing is destroyed. The webbing has AC 10, 5 hit points, is vulnerable to fire damage and immune to bludgeoning damage.' },
    ],
    multiattack: 'The ettercap makes two attacks: one with its bite and one with its claws.',
    specialAbilities: ['Spider Climb', 'Web Sense', 'Web Walker']
  },
  {
    id: 'ettin', name: 'Ettin',
    type: 'giant', size: 'Large',
    cr: 4, xp: 1100, ac: 12, hp: 85, hitDice: '10d10', speed: 40,
    str: 21, dex: 8, con: 17, int: 6, wis: 10, cha: 8,
    attacks: [
      { name: 'Battleaxe', toHit: 7, damage: '2d8+5', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.' },
      { name: 'Morningstar', toHit: 7, damage: '2d8+5', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) piercing damage.' },
    ],
    multiattack: 'The ettin makes two attacks: one with its battleaxe and one with its morningstar.',
    specialAbilities: ['Two Heads', 'Wakeful']
  },
  {
    id: 'fire-elemental', name: 'Fire Elemental',
    type: 'elemental', size: 'Large',
    cr: 5, xp: 1800, ac: 13, hp: 102, hitDice: '12d10', speed: 50,
    str: 10, dex: 17, con: 16, int: 6, wis: 10, cha: 7,
    attacks: [
      { name: 'Touch', toHit: 6, damage: '2d6+3', damageType: 'Fire', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) fire damage. If the target is a creature or a flammable object, it ignites. Until a creature takes an action to douse the fire, the target takes 5 (1d10) fire damage at the start of each of its turns.' },
    ],
    multiattack: 'The elemental makes two touch attacks.',
    specialAbilities: ['Fire Form', 'Illumination', 'Water Susceptibility']
  },
  {
    id: 'fire-giant', name: 'Fire Giant',
    type: 'giant', size: 'Huge',
    cr: 9, xp: 5000, ac: 18, hp: 162, hitDice: '13d12', speed: 30,
    str: 25, dex: 9, con: 23, int: 10, wis: 14, cha: 13,
    attacks: [
      { name: 'Greatsword', toHit: 11, damage: '6d6+7', damageType: 'Slashing', description: 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 28 (6d6 + 7) slashing damage.' },
      { name: 'Rock', toHit: 11, damage: '4d10+7', damageType: 'Bludgeoning', description: 'Ranged Weapon Attack: +11 to hit, range 60/240 ft., one target. Hit: 29 (4d10 + 7) bludgeoning damage.' },
    ],
    multiattack: 'The giant makes two greatsword attacks.'
  },
  {
    id: 'flesh-golem', name: 'Flesh Golem',
    type: 'construct', size: 'Medium',
    cr: 5, xp: 1800, ac: 9, hp: 93, hitDice: '11d8', speed: 30,
    str: 19, dex: 9, con: 18, int: 6, wis: 10, cha: 5,
    attacks: [
      { name: 'Slam', toHit: 7, damage: '2d8+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.' },
    ],
    multiattack: 'The golem makes two slam attacks.',
    specialAbilities: ['Berserk', 'Aversion of Fire', 'Immutable Form', 'Lightning Absorption', 'Magic Resistance', 'Magic Weapons']
  },
  {
    id: 'flying-snake', name: 'Flying Snake',
    type: 'beast', size: 'Tiny',
    cr: 0.125, xp: 25, ac: 14, hp: 5, hitDice: '2d4', speed: 30,
    str: 4, dex: 18, con: 11, int: 2, wis: 12, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '1', damageType: 'Bludgeoning', extraDamage: '3d4', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 1 piercing damage plus 7 (3d4) poison damage.' },
    ],
    specialAbilities: ['Flyby']
  },
  {
    id: 'flying-sword', name: 'Flying Sword',
    type: 'construct', size: 'Small',
    cr: 0.25, xp: 50, ac: 17, hp: 17, hitDice: '5d6', speed: 0,
    str: 12, dex: 15, con: 11, int: 1, wis: 5, cha: 1,
    attacks: [
      { name: 'Longsword', toHit: 3, damage: '1d8+1', damageType: 'Slashing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage.' },
    ],
    specialAbilities: ['Antimagic Susceptibility', 'False Appearance']
  },
  {
    id: 'frog', name: 'Frog',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 0, ac: 11, hp: 1, hitDice: '1d4', speed: 20,
    str: 1, dex: 13, con: 8, int: 1, wis: 8, cha: 3,
    attacks: [],
    specialAbilities: ['Amphibious', 'Standing Leap']
  },
  {
    id: 'frost-giant', name: 'Frost Giant',
    type: 'giant', size: 'Huge',
    cr: 8, xp: 3900, ac: 15, hp: 138, hitDice: '12d12', speed: 40,
    str: 23, dex: 9, con: 21, int: 9, wis: 10, cha: 12,
    attacks: [
      { name: 'Greataxe', toHit: 9, damage: '3d12+6', damageType: 'Slashing', description: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 25 (3d12 + 6) slashing damage.' },
      { name: 'Rock', toHit: 9, damage: '4d10+6', damageType: 'Bludgeoning', description: 'Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage.' },
    ],
    multiattack: 'The giant makes two greataxe attacks.'
  },
  {
    id: 'gargoyle', name: 'Gargoyle',
    type: 'elemental', size: 'Medium',
    cr: 2, xp: 450, ac: 15, hp: 52, hitDice: '7d8', speed: 30,
    str: 15, dex: 11, con: 16, int: 6, wis: 11, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Claws', toHit: 4, damage: '1d6+2', damageType: 'Slashing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.' },
    ],
    multiattack: 'The gargoyle makes two attacks: one with its bite and one with its claws.',
    specialAbilities: ['False Appearance']
  },
  {
    id: 'gelatinous-cube', name: 'Gelatinous Cube',
    type: 'ooze', size: 'Large',
    cr: 2, xp: 450, ac: 6, hp: 84, hitDice: '8d10', speed: 15,
    str: 14, dex: 3, con: 20, int: 1, wis: 6, cha: 1,
    attacks: [
      { name: 'Pseudopod', toHit: 4, damage: '3d6', damageType: 'Acid', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) acid damage.' },
    ],
    specialAbilities: ['Ooze Cube', 'Transparent']
  },
  {
    id: 'ghast', name: 'Ghast',
    type: 'undead', size: 'Medium',
    cr: 2, xp: 450, ac: 13, hp: 36, hitDice: '8d8', speed: 30,
    str: 16, dex: 17, con: 10, int: 11, wis: 10, cha: 8,
    attacks: [
      { name: 'Bite', toHit: 3, damage: '2d8+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 12 (2d8 + 3) piercing damage.' },
      { name: 'Claws', toHit: 5, damage: '2d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If the target is a creature other than an undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.' },
    ],
    specialAbilities: ['Stench', 'Turn Defiance']
  },
  {
    id: 'ghost', name: 'Ghost',
    type: 'undead', size: 'Medium',
    cr: 4, xp: 1100, ac: 11, hp: 45, hitDice: '10d8', speed: 0,
    str: 7, dex: 13, con: 10, int: 10, wis: 12, cha: 17,
    attacks: [
      { name: 'Withering Touch', toHit: 5, damage: '4d6+3', damageType: 'Necrotic', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 17 (4d6 + 3) necrotic damage.' },
    ],
    specialAbilities: ['Ethereal Sight', 'Incorporeal Movement']
  },
  {
    id: 'ghoul', name: 'Ghoul',
    type: 'undead', size: 'Medium',
    cr: 1, xp: 200, ac: 12, hp: 22, hitDice: '5d8', speed: 30,
    str: 13, dex: 15, con: 10, int: 7, wis: 10, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 2, damage: '2d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 9 (2d6 + 2) piercing damage.' },
      { name: 'Claws', toHit: 4, damage: '2d4+2', damageType: 'Slashing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) slashing damage. If the target is a creature other than an elf or undead, it must succeed on a DC 10 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.' },
    ],
  },
  {
    id: 'giant-ape', name: 'Giant Ape',
    type: 'beast', size: 'Huge',
    cr: 7, xp: 2900, ac: 12, hp: 157, hitDice: '15d12', speed: 40,
    str: 23, dex: 14, con: 18, int: 7, wis: 12, cha: 7,
    attacks: [
      { name: 'Fist', toHit: 9, damage: '3d10+6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (3d10 + 6) bludgeoning damage.' },
      { name: 'Rock', toHit: 9, damage: '7d6+6', damageType: 'Bludgeoning', description: 'Ranged Weapon Attack: +9 to hit, range 50/100 ft., one target. Hit: 30 (7d6 + 6) bludgeoning damage.' },
    ],
    multiattack: 'The ape makes two fist attacks.'
  },
  {
    id: 'giant-badger', name: 'Giant Badger',
    type: 'beast', size: 'Medium',
    cr: 0.25, xp: 50, ac: 10, hp: 13, hitDice: '2d8', speed: 30,
    str: 13, dex: 10, con: 15, int: 2, wis: 12, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 3, damage: '1d6+1', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage.' },
      { name: 'Claws', toHit: 3, damage: '2d4+1', damageType: 'Slashing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage.' },
    ],
    multiattack: 'The badger makes two attacks: one with its bite and one with its claws.',
    specialAbilities: ['Keen Smell']
  },
  {
    id: 'giant-bat', name: 'Giant Bat',
    type: 'beast', size: 'Large',
    cr: 0.25, xp: 50, ac: 13, hp: 22, hitDice: '4d10', speed: 10,
    str: 15, dex: 16, con: 11, int: 2, wis: 12, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage.' },
    ],
    specialAbilities: ['Echolocation', 'Keen Hearing']
  },
  {
    id: 'giant-boar', name: 'Giant Boar',
    type: 'beast', size: 'Large',
    cr: 2, xp: 450, ac: 12, hp: 42, hitDice: '5d10', speed: 40,
    str: 17, dex: 10, con: 16, int: 2, wis: 7, cha: 5,
    attacks: [
      { name: 'Tusk', toHit: 5, damage: '2d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.' },
    ],
    specialAbilities: ['Charge', 'Relentless']
  },
  {
    id: 'giant-centipede', name: 'Giant Centipede',
    type: 'beast', size: 'Small',
    cr: 0.25, xp: 50, ac: 13, hp: 4, hitDice: '1d6', speed: 30,
    str: 5, dex: 14, con: 12, int: 1, wis: 7, cha: 3,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or take 10 (3d6) poison damage. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.' },
    ],
  },
  {
    id: 'giant-constrictor-snake', name: 'Giant Constrictor Snake',
    type: 'beast', size: 'Huge',
    cr: 2, xp: 450, ac: 12, hp: 60, hitDice: '8d12', speed: 30,
    str: 19, dex: 14, con: 12, int: 1, wis: 10, cha: 3,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '2d6+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage.' },
      { name: 'Constrict', toHit: 6, damage: '2d8+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 13 (2d8 + 4) bludgeoning damage, and the target is grappled (escape DC 16). Until this grapple ends, the creature is restrained, and the snake can\'t constrict another target.' },
    ],
  },
  {
    id: 'giant-crab', name: 'Giant Crab',
    type: 'beast', size: 'Medium',
    cr: 0.125, xp: 25, ac: 15, hp: 13, hitDice: '3d8', speed: 30,
    str: 13, dex: 15, con: 11, int: 1, wis: 9, cha: 3,
    attacks: [
      { name: 'Claw', toHit: 3, damage: '1d6+1', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage, and the target is grappled (escape DC 11). The crab has two claws, each of which can grapple only one target.' },
    ],
    specialAbilities: ['Amphibious']
  },
  {
    id: 'giant-crocodile', name: 'Giant Crocodile',
    type: 'beast', size: 'Huge',
    cr: 5, xp: 1800, ac: 14, hp: 85, hitDice: '9d12', speed: 30,
    str: 21, dex: 9, con: 17, int: 2, wis: 10, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 8, damage: '3d10+5', damageType: 'Piercing', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 21 (3d10 + 5) piercing damage, and the target is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the crocodile can\'t bite another target.' },
      { name: 'Tail', toHit: 8, damage: '2d8+5', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target not grappled by the crocodile. Hit: 14 (2d8 + 5) bludgeoning damage. If the target is a creature, it must succeed on a DC 16 Strength saving throw or be knocked prone.' },
    ],
    multiattack: 'The crocodile makes two attacks: one with its bite and one with its tail.',
    specialAbilities: ['Hold Breath']
  },
  {
    id: 'giant-eagle', name: 'Giant Eagle',
    type: 'beast', size: 'Large',
    cr: 1, xp: 200, ac: 13, hp: 26, hitDice: '4d10', speed: 10,
    str: 16, dex: 17, con: 13, int: 8, wis: 14, cha: 10,
    attacks: [
      { name: 'Beak', toHit: 5, damage: '1d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage.' },
      { name: 'Talons', toHit: 5, damage: '2d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.' },
    ],
    multiattack: 'The eagle makes two attacks: one with its beak and one with its talons.',
    specialAbilities: ['Keen Sight']
  },
  {
    id: 'giant-elk', name: 'Giant Elk',
    type: 'beast', size: 'Huge',
    cr: 2, xp: 450, ac: 14, hp: 42, hitDice: '5d12', speed: 60,
    str: 19, dex: 16, con: 14, int: 7, wis: 14, cha: 10,
    attacks: [
      { name: 'Ram', toHit: 6, damage: '2d6+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.' },
      { name: 'Hooves', toHit: 6, damage: '4d8+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one prone creature. Hit: 22 (4d8 + 4) bludgeoning damage.' },
    ],
    specialAbilities: ['Charge']
  },
  {
    id: 'giant-fire-beetle', name: 'Giant Fire Beetle',
    type: 'beast', size: 'Small',
    cr: 0, xp: 10, ac: 13, hp: 4, hitDice: '1d6', speed: 30,
    str: 8, dex: 10, con: 12, int: 1, wis: 7, cha: 3,
    attacks: [
      { name: 'Bite', toHit: 1, damage: '1d6-1', damageType: 'Slashing', description: 'Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 2 (1d6 - 1) slashing damage.' },
    ],
    specialAbilities: ['Illumination']
  },
  {
    id: 'giant-frog', name: 'Giant Frog',
    type: 'beast', size: 'Medium',
    cr: 0.25, xp: 50, ac: 11, hp: 18, hitDice: '4d8', speed: 30,
    str: 12, dex: 13, con: 11, int: 2, wis: 10, cha: 3,
    attacks: [
      { name: 'Bite', toHit: 3, damage: '1d6+1', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage, and the target is grappled (escape DC 11). Until this grapple ends, the target is restrained, and the frog can\'t bite another target.' },
    ],
    specialAbilities: ['Amphibious', 'Standing Leap']
  },
  {
    id: 'giant-goat', name: 'Giant Goat',
    type: 'beast', size: 'Large',
    cr: 0.5, xp: 100, ac: 11, hp: 19, hitDice: '3d10', speed: 40,
    str: 17, dex: 11, con: 12, int: 3, wis: 12, cha: 6,
    attacks: [
      { name: 'Ram', toHit: 5, damage: '2d4+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) bludgeoning damage.' },
    ],
    specialAbilities: ['Charge', 'Sure-Footed']
  },
  {
    id: 'giant-hyena', name: 'Giant Hyena',
    type: 'beast', size: 'Large',
    cr: 1, xp: 200, ac: 12, hp: 45, hitDice: '6d10', speed: 50,
    str: 16, dex: 14, con: 14, int: 2, wis: 12, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '2d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage.' },
    ],
    specialAbilities: ['Rampage']
  },
  {
    id: 'giant-lizard', name: 'Giant Lizard',
    type: 'beast', size: 'Large',
    cr: 0.25, xp: 50, ac: 12, hp: 19, hitDice: '3d10', speed: 30,
    str: 15, dex: 12, con: 13, int: 2, wis: 10, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d8+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.' },
    ],
  },
  {
    id: 'giant-octopus', name: 'Giant Octopus',
    type: 'beast', size: 'Large',
    cr: 1, xp: 200, ac: 11, hp: 52, hitDice: '8d10', speed: 10,
    str: 17, dex: 13, con: 13, int: 4, wis: 10, cha: 4,
    attacks: [
      { name: 'Tentacles', toHit: 5, damage: '2d6+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 15 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage. If the target is a creature, it is grappled (escape DC 16). Until this grapple ends, the target is restrained, and the octopus can\'t use its tentacles on another target.' },
    ],
    specialAbilities: ['Hold Breath', 'Underwater Camouflage', 'Water Breathing']
  },
  {
    id: 'giant-owl', name: 'Giant Owl',
    type: 'beast', size: 'Large',
    cr: 0.25, xp: 50, ac: 12, hp: 19, hitDice: '3d10', speed: 5,
    str: 13, dex: 15, con: 12, int: 8, wis: 13, cha: 10,
    attacks: [
      { name: 'Talons', toHit: 3, damage: '2d6+1', damageType: 'Slashing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 8 (2d6 + 1) slashing damage.' },
    ],
    specialAbilities: ['Flyby', 'Keen Hearing and Sight']
  },
  {
    id: 'giant-poisonous-snake', name: 'Giant Poisonous Snake',
    type: 'beast', size: 'Medium',
    cr: 0.25, xp: 50, ac: 14, hp: 11, hitDice: '2d8', speed: 30,
    str: 10, dex: 18, con: 13, int: 2, wis: 10, cha: 3,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '1d4+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 6 (1d4 + 4) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.' },
    ],
  },
  {
    id: 'giant-rat', name: 'Giant Rat',
    type: 'beast', size: 'Small',
    cr: 0.125, xp: 25, ac: 12, hp: 7, hitDice: '2d6', speed: 30,
    str: 7, dex: 15, con: 11, int: 2, wis: 10, cha: 4,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.' },
    ],
    specialAbilities: ['Keen Smell', 'Pack Tactics']
  },
  {
    id: 'giant-rat-diseased', name: 'Giant Rat (Diseased)',
    type: 'beast', size: 'Small',
    cr: 0.125, xp: 25, ac: 12, hp: 7, hitDice: '2d6', speed: 30,
    str: 7, dex: 15, con: 11, int: 2, wis: 10, cha: 4,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 10 Constitution saving throw or contract a disease. Until the disease is cured, the target can\'t regain hit points except by magical means, and the target\'s hit point maximum decreases by 3 (1d6) every 24 hours. If the target\'s hit point maximum drops to 0 as a result of this disease, the target dies.' },
    ],
    specialAbilities: ['Keen Smell', 'Pack Tactics']
  },
  {
    id: 'giant-scorpion', name: 'Giant Scorpion',
    type: 'beast', size: 'Large',
    cr: 3, xp: 700, ac: 15, hp: 52, hitDice: '7d10', speed: 40,
    str: 15, dex: 13, con: 15, int: 1, wis: 9, cha: 3,
    attacks: [
      { name: 'Claw', toHit: 4, damage: '1d8+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) bludgeoning damage, and the target is grappled (escape DC 12). The scorpion has two claws, each of which can grapple only one target.' },
      { name: 'Sting', toHit: 4, damage: '1d10+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target must make a DC 12 Constitution saving throw, taking 22 (4d10) poison damage on a failed save, or half as much damage on a successful one.' },
    ],
    multiattack: 'The scorpion makes three attacks: two with its claws and one with its sting.'
  },
  {
    id: 'giant-sea-horse', name: 'Giant Sea Horse',
    type: 'beast', size: 'Large',
    cr: 0.5, xp: 100, ac: 13, hp: 16, hitDice: '3d10', speed: 0,
    str: 12, dex: 15, con: 11, int: 2, wis: 12, cha: 5,
    attacks: [
      { name: 'Ram', toHit: 3, damage: '1d6+1', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage.' },
    ],
    specialAbilities: ['Charge', 'Water Breathing']
  },
  {
    id: 'giant-shark', name: 'Giant Shark',
    type: 'beast', size: 'Huge',
    cr: 5, xp: 1800, ac: 13, hp: 126, hitDice: '11d12', speed: 30,
    str: 23, dex: 11, con: 21, int: 1, wis: 10, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 9, damage: '3d10+6', damageType: 'Piercing', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 22 (3d10 + 6) piercing damage.' },
    ],
    specialAbilities: ['Blood Frenzy', 'Water Breathing']
  },
  {
    id: 'giant-spider', name: 'Giant Spider',
    type: 'beast', size: 'Large',
    cr: 1, xp: 200, ac: 14, hp: 26, hitDice: '4d10', speed: 30,
    str: 14, dex: 16, con: 12, int: 2, wis: 11, cha: 4,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d8+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 7 (1d8 + 3) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 9 (2d8) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.' },
      { name: 'Web', toHit: 5, damage: '1d4', damageType: 'bludgeoning', description: 'Ranged Weapon Attack: +5 to hit, range 30/60 ft., one creature. Hit: The target is restrained by webbing. As an action, the restrained target can make a DC 12 Strength check, bursting the webbing on a success. The webbing can also be attacked and destroyed (AC 10; hp 5; vulnerability to fire damage; immunity to bludgeoning, poison, and psychic damage).' },
    ],
    specialAbilities: ['Spider Climb', 'Web Sense', 'Web Walker']
  },
  {
    id: 'giant-toad', name: 'Giant Toad',
    type: 'beast', size: 'Large',
    cr: 1, xp: 200, ac: 11, hp: 39, hitDice: '6d10', speed: 20,
    str: 15, dex: 13, con: 13, int: 2, wis: 10, cha: 3,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d10+2', damageType: 'Piercing', extraDamage: '1d10', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 5 (1d10) poison damage, and the target is grappled (escape DC 13). Until this grapple ends, the target is restrained, and the toad can\'t bite another target.' },
    ],
    specialAbilities: ['Amphibious', 'Standing Leap']
  },
  {
    id: 'giant-vulture', name: 'Giant Vulture',
    type: 'beast', size: 'Large',
    cr: 1, xp: 200, ac: 10, hp: 22, hitDice: '3d10', speed: 10,
    str: 15, dex: 10, con: 15, int: 6, wis: 12, cha: 7,
    attacks: [
      { name: 'Beak', toHit: 4, damage: '2d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage.' },
      { name: 'Talons', toHit: 4, damage: '2d6+2', damageType: 'Slashing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage.' },
    ],
    multiattack: 'The vulture makes two attacks: one with its beak and one with its talons.',
    specialAbilities: ['Keen Sight and Smell', 'Pack Tactics']
  },
  {
    id: 'giant-wasp', name: 'Giant Wasp',
    type: 'beast', size: 'Medium',
    cr: 0.5, xp: 100, ac: 12, hp: 13, hitDice: '3d8', speed: 10,
    str: 10, dex: 14, con: 10, int: 1, wis: 10, cha: 3,
    attacks: [
      { name: 'Sting', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.' },
    ],
  },
  {
    id: 'giant-weasel', name: 'Giant Weasel',
    type: 'beast', size: 'Medium',
    cr: 0.125, xp: 25, ac: 13, hp: 9, hitDice: '2d8', speed: 40,
    str: 11, dex: 16, con: 10, int: 4, wis: 12, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d4+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage.' },
    ],
    specialAbilities: ['Keen Hearing and Smell']
  },
  {
    id: 'giant-wolf-spider', name: 'Giant Wolf Spider',
    type: 'beast', size: 'Medium',
    cr: 0.25, xp: 50, ac: 13, hp: 11, hitDice: '2d8', speed: 40,
    str: 12, dex: 16, con: 13, int: 3, wis: 12, cha: 4,
    attacks: [
      { name: 'Bite', toHit: 3, damage: '1d6+1', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 4 (1d6 + 1) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 7 (2d6) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.' },
    ],
    specialAbilities: ['Spider Climb', 'Web Sense', 'Web Walker']
  },
  {
    id: 'gibbering-mouther', name: 'Gibbering Mouther',
    type: 'aberration', size: 'Medium',
    cr: 2, xp: 450, ac: 9, hp: 67, hitDice: '9d8', speed: 10,
    str: 10, dex: 8, con: 16, int: 3, wis: 10, cha: 6,
    attacks: [
      { name: 'Bites', toHit: 2, damage: '5d6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 17 (5d6) piercing damage. If the target is Medium or smaller, it must succeed on a DC 10 Strength saving throw or be knocked prone. If the target is killed by this damage, it is absorbed into the mouther.' },
    ],
    multiattack: 'The gibbering mouther makes one bite attack and, if it can, uses its Blinding Spittle.',
    specialAbilities: ['Aberrant Ground', 'Gibbering']
  },
  {
    id: 'glabrezu', name: 'Glabrezu',
    type: 'fiend', size: 'Large',
    cr: 9, xp: 5000, ac: 17, hp: 157, hitDice: '15d10', speed: 40,
    str: 20, dex: 15, con: 21, int: 19, wis: 17, cha: 16,
    attacks: [
      { name: 'Pincer', toHit: 9, damage: '2d10+5', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage. If the target is a Medium or smaller creature, it is grappled (escape DC 15). The glabrezu has two pincers, each of which can grapple only one target.' },
      { name: 'Fist', toHit: 9, damage: '2d4+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) bludgeoning damage.' },
    ],
    multiattack: 'The glabrezu makes four attacks: two with its pincers and two with its fists. Alternatively, it makes two attacks with its pincers and casts one spell.',
    specialAbilities: ['Innate Spellcasting', 'Magic Resistance']
  },
  {
    id: 'gladiator', name: 'Gladiator',
    type: 'humanoid', size: 'Medium',
    cr: 5, xp: 1800, ac: 16, hp: 112, hitDice: '15d8', speed: 30,
    str: 18, dex: 15, con: 16, int: 10, wis: 12, cha: 15,
    attacks: [
      { name: 'Spear', toHit: 7, damage: '1d4', damageType: 'bludgeoning', description: 'Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack.' },
      { name: 'Shield Bash', toHit: 7, damage: '2d4+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 9 (2d4 + 4) bludgeoning damage. If the target is a Medium or smaller creature, it must succeed on a DC 15 Strength saving throw or be knocked prone.' },
    ],
    multiattack: 'The gladiator makes three melee attacks or two ranged attacks.',
    specialAbilities: ['Brave', 'Brute']
  },
  {
    id: 'gnoll', name: 'Gnoll',
    type: 'humanoid', size: 'Medium',
    cr: 0.5, xp: 100, ac: 15, hp: 22, hitDice: '5d8', speed: 30,
    str: 14, dex: 12, con: 11, int: 6, wis: 10, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage.' },
      { name: 'Spear', toHit: 4, damage: '1d4', damageType: 'bludgeoning', description: 'Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack.' },
      { name: 'Longbow', toHit: 3, damage: '1d8+1', damageType: 'Piercing', description: 'Ranged Weapon Attack: +3 to hit, range 150/600 ft., one target. Hit: 5 (1d8 + 1) piercing damage.' },
    ],
    specialAbilities: ['Rampage']
  },
  {
    id: 'goat', name: 'Goat',
    type: 'beast', size: 'Medium',
    cr: 0, xp: 10, ac: 10, hp: 4, hitDice: '1d8', speed: 40,
    str: 12, dex: 10, con: 11, int: 2, wis: 10, cha: 5,
    attacks: [
      { name: 'Ram', toHit: 3, damage: '1d4+1', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage.' },
    ],
    specialAbilities: ['Charge', 'Sure-Footed']
  },
  {
    id: 'goblin', name: 'Goblin',
    type: 'humanoid', size: 'Small',
    cr: 0.25, xp: 50, ac: 15, hp: 7, hitDice: '2d6', speed: 30,
    str: 8, dex: 14, con: 10, int: 10, wis: 8, cha: 8,
    attacks: [
      { name: 'Scimitar', toHit: 4, damage: '1d6+2', damageType: 'Slashing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) slashing damage.' },
      { name: 'Shortbow', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
    ],
    specialAbilities: ['Nimble Escape']
  },
  {
    id: 'gold-dragon-wyrmling', name: 'Gold Dragon Wyrmling',
    type: 'dragon', size: 'Medium',
    cr: 3, xp: 700, ac: 17, hp: 60, hitDice: '8d8', speed: 30,
    str: 19, dex: 14, con: 17, int: 14, wis: 11, cha: 16,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '1d10+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) piercing damage.' },
    ],
    specialAbilities: ['Amphibious']
  },
  {
    id: 'gorgon', name: 'Gorgon',
    type: 'monstrosity', size: 'Large',
    cr: 5, xp: 1800, ac: 19, hp: 114, hitDice: '12d10', speed: 40,
    str: 20, dex: 11, con: 18, int: 2, wis: 12, cha: 7,
    attacks: [
      { name: 'Gore', toHit: 8, damage: '2d12+5', damageType: 'Piercing', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 18 (2d12 + 5) piercing damage.' },
      { name: 'Hooves', toHit: 8, damage: '2d10+5', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 16 (2d10 + 5) bludgeoning damage.' },
    ],
    specialAbilities: ['Trampling Charge']
  },
  {
    id: 'gray-ooze', name: 'Gray Ooze',
    type: 'ooze', size: 'Medium',
    cr: 0.5, xp: 100, ac: 8, hp: 22, hitDice: '3d8', speed: 10,
    str: 12, dex: 6, con: 16, int: 1, wis: 6, cha: 2,
    attacks: [
      { name: 'Pseudopod', toHit: 3, damage: '1d6+1', damageType: 'Bludgeoning', extraDamage: '2d6', extraDamageType: 'Acid', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage plus 7 (2d6) acid damage, and if the target is wearing nonmagical metal armor, its armor is partly corroded and takes a permanent and cumulative -1 penalty to the AC it offers. The armor is destroyed if the penalty reduces its AC to 10.' },
    ],
    specialAbilities: ['Amorphous', 'Corrode Metal', 'False Appearance']
  },
  {
    id: 'green-dragon-wyrmling', name: 'Green Dragon Wyrmling',
    type: 'dragon', size: 'Medium',
    cr: 2, xp: 450, ac: 17, hp: 38, hitDice: '7d8', speed: 30,
    str: 15, dex: 12, con: 13, int: 14, wis: 11, cha: 13,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d10+2', damageType: 'Piercing', extraDamage: '1d6', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 3 (1d6) poison damage.' },
    ],
    specialAbilities: ['Amphibious']
  },
  {
    id: 'green-hag', name: 'Green Hag',
    type: 'fey', size: 'Medium',
    cr: 3, xp: 700, ac: 17, hp: 82, hitDice: '11d8', speed: 30,
    str: 18, dex: 12, con: 16, int: 13, wis: 14, cha: 14,
    attacks: [
      { name: 'Claws', toHit: 6, damage: '2d8+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.' },
    ],
    specialAbilities: ['Amphibious', 'Innate Spellcasting', 'Mimicry']
  },
  {
    id: 'grick', name: 'Grick',
    type: 'monstrosity', size: 'Medium',
    cr: 2, xp: 450, ac: 14, hp: 27, hitDice: '6d8', speed: 30,
    str: 14, dex: 14, con: 11, int: 3, wis: 14, cha: 5,
    attacks: [
      { name: 'Tentacles', toHit: 4, damage: '2d6+2', damageType: 'Slashing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage.' },
      { name: 'Beak', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
    ],
    multiattack: 'The grick makes one attack with its tentacles. If that attack hits, the grick can make one beak attack against the same target.',
    specialAbilities: ['Stone Camouflage']
  },
  {
    id: 'griffon', name: 'Griffon',
    type: 'monstrosity', size: 'Large',
    cr: 2, xp: 450, ac: 12, hp: 59, hitDice: '7d10', speed: 30,
    str: 18, dex: 15, con: 16, int: 2, wis: 13, cha: 8,
    attacks: [
      { name: 'Beak', toHit: 6, damage: '1d8+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.' },
      { name: 'Claws', toHit: 6, damage: '2d6+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.' },
    ],
    multiattack: 'The griffon makes two attacks: one with its beak and one with its claws.',
    specialAbilities: ['Keen Sight']
  },
  {
    id: 'grimlock', name: 'Grimlock',
    type: 'humanoid', size: 'Medium',
    cr: 0.25, xp: 50, ac: 11, hp: 11, hitDice: '2d8', speed: 30,
    str: 16, dex: 12, con: 12, int: 9, wis: 8, cha: 6,
    attacks: [
      { name: 'Spiked Bone Club', toHit: 5, damage: '1d4+3', damageType: 'Bludgeoning', extraDamage: '1d4', extraDamageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) bludgeoning damage plus 2 (1d4) piercing damage.' },
    ],
    specialAbilities: ['Blind Senses', 'Keen Hearing and Smell', 'Stone Camouflage']
  },
  {
    id: 'guard', name: 'Guard',
    type: 'humanoid', size: 'Medium',
    cr: 0.125, xp: 25, ac: 16, hp: 11, hitDice: '2d8', speed: 30,
    str: 13, dex: 12, con: 12, int: 10, wis: 11, cha: 10,
    attacks: [
      { name: 'Spear', toHit: 3, damage: '1d4', damageType: 'bludgeoning', description: 'Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack.' },
    ],
  },
  {
    id: 'guardian-naga', name: 'Guardian Naga',
    type: 'monstrosity', size: 'Large',
    cr: 10, xp: 5900, ac: 18, hp: 127, hitDice: '15d10', speed: 40,
    str: 19, dex: 18, con: 16, int: 16, wis: 19, cha: 18,
    attacks: [
      { name: 'Bite', toHit: 8, damage: '1d8+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one creature. Hit: 8 (1d8 + 4) piercing damage, and the target must make a DC 15 Constitution saving throw, taking 45 (10d8) poison damage on a failed save, or half as much damage on a successful one.' },
      { name: 'Spit Poison', toHit: 8, damage: '1d4', damageType: 'bludgeoning', description: 'Ranged Weapon Attack: +8 to hit, range 15/30 ft., one creature. Hit: The target must make a DC 15 Constitution saving throw, taking 45 (10d8) poison damage on a failed save, or half as much damage on a successful one.' },
    ],
    specialAbilities: ['Rejuvenation', 'Spellcasting']
  },
  {
    id: 'gynosphinx', name: 'Gynosphinx',
    type: 'monstrosity', size: 'Large',
    cr: 11, xp: 7200, ac: 17, hp: 136, hitDice: '16d10', speed: 40,
    str: 18, dex: 15, con: 16, int: 18, wis: 18, cha: 18,
    attacks: [
      { name: 'Claw', toHit: 9, damage: '2d8+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.' },
    ],
    multiattack: 'The sphinx makes two claw attacks.',
    specialAbilities: ['Inscrutable', 'Magic Weapons', 'Spellcasting']
  },
  {
    id: 'half-red-dragon-veteran', name: 'Half-Red Dragon Veteran',
    type: 'humanoid', size: 'Medium',
    cr: 5, xp: 1800, ac: 18, hp: 65, hitDice: '10d8', speed: 30,
    str: 16, dex: 13, con: 14, int: 10, wis: 11, cha: 10,
    attacks: [
      { name: 'Longsword', toHit: 5, damage: '1d4', damageType: 'bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.' },
      { name: 'Shortsword', toHit: 5, damage: '1d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage.' },
      { name: 'Heavy Crossbow', toHit: 3, damage: '1d10+1', damageType: 'Piercing', description: 'Ranged Weapon Attack: +3 to hit, range 100/400 ft., one target. Hit: 6 (1d10 + 1) piercing damage.' },
    ],
    multiattack: 'The veteran makes two longsword attacks. If it has a shortsword drawn, it can also make a shortsword attack.'
  },
  {
    id: 'harpy', name: 'Harpy',
    type: 'monstrosity', size: 'Medium',
    cr: 1, xp: 200, ac: 11, hp: 38, hitDice: '7d8', speed: 20,
    str: 12, dex: 13, con: 12, int: 7, wis: 10, cha: 13,
    attacks: [
      { name: 'Claws', toHit: 3, damage: '2d4+1', damageType: 'Slashing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) slashing damage.' },
      { name: 'Club', toHit: 3, damage: '1d4+1', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) bludgeoning damage.' },
    ],
    multiattack: 'The harpy makes two attacks: one with its claws and one with its club.'
  },
  {
    id: 'hawk', name: 'Hawk',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 13, hp: 1, hitDice: '1d4', speed: 10,
    str: 5, dex: 16, con: 8, int: 2, wis: 14, cha: 6,
    attacks: [
      { name: 'Talons', toHit: 5, damage: '1', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 slashing damage.' },
    ],
    specialAbilities: ['Keen Sight']
  },
  {
    id: 'hell-hound', name: 'Hell Hound',
    type: 'fiend', size: 'Medium',
    cr: 3, xp: 700, ac: 15, hp: 45, hitDice: '7d8', speed: 50,
    str: 17, dex: 12, con: 14, int: 6, wis: 13, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d8+3', damageType: 'Piercing', extraDamage: '2d6', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 7 (2d6) fire damage.' },
    ],
    specialAbilities: ['Keen Hearing and Smell', 'Pack Tactics']
  },
  {
    id: 'hezrou', name: 'Hezrou',
    type: 'fiend', size: 'Large',
    cr: 8, xp: 3900, ac: 16, hp: 136, hitDice: '13d10', speed: 30,
    str: 19, dex: 17, con: 20, int: 5, wis: 12, cha: 13,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '2d10+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage.' },
      { name: 'Claws', toHit: 7, damage: '2d6+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.' },
    ],
    multiattack: 'The hezrou makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Magic Resistance', 'Stench']
  },
  {
    id: 'hill-giant', name: 'Hill Giant',
    type: 'giant', size: 'Huge',
    cr: 5, xp: 1800, ac: 13, hp: 105, hitDice: '10d12', speed: 40,
    str: 21, dex: 8, con: 19, int: 5, wis: 9, cha: 6,
    attacks: [
      { name: 'Greatclub', toHit: 8, damage: '3d8+5', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 18 (3d8 + 5) bludgeoning damage.' },
      { name: 'Rock', toHit: 8, damage: '3d10+5', damageType: 'Bludgeoning', description: 'Ranged Weapon Attack: +8 to hit, range 60/240 ft., one target. Hit: 21 (3d10 + 5) bludgeoning damage.' },
    ],
    multiattack: 'The giant makes two greatclub attacks.'
  },
  {
    id: 'hippogriff', name: 'Hippogriff',
    type: 'monstrosity', size: 'Large',
    cr: 1, xp: 200, ac: 11, hp: 19, hitDice: '3d10', speed: 40,
    str: 17, dex: 13, con: 13, int: 2, wis: 12, cha: 8,
    attacks: [
      { name: 'Beak', toHit: 5, damage: '1d10+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage.' },
      { name: 'Claws', toHit: 5, damage: '2d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.' },
    ],
    multiattack: 'The hippogriff makes two attacks: one with its beak and one with its claws.',
    specialAbilities: ['Keen Sight']
  },
  {
    id: 'hobgoblin', name: 'Hobgoblin',
    type: 'humanoid', size: 'Medium',
    cr: 0.5, xp: 100, ac: 18, hp: 11, hitDice: '2d8', speed: 30,
    str: 13, dex: 12, con: 12, int: 10, wis: 10, cha: 9,
    attacks: [
      { name: 'Longsword', toHit: 3, damage: '1d4', damageType: 'bludgeoning', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) slashing damage, or 6 (1d10 + 1) slashing damage if used with two hands.' },
      { name: 'Longbow', toHit: 3, damage: '1d8+1', damageType: 'Piercing', description: 'Ranged Weapon Attack: +3 to hit, range 150/600 ft., one target. Hit: 5 (1d8 + 1) piercing damage.' },
    ],
    specialAbilities: ['Martial Advantage']
  },
  {
    id: 'homunculus', name: 'Homunculus',
    type: 'construct', size: 'Tiny',
    cr: 0, xp: 10, ac: 13, hp: 5, hitDice: '2d4', speed: 20,
    str: 4, dex: 15, con: 11, int: 10, wis: 10, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must succeed on a DC 10 Constitution saving throw or be poisoned for 1 minute. If the saving throw fails by 5 or more, the target is instead poisoned for 5 (1d10) minutes and unconscious while poisoned in this way.' },
    ],
    specialAbilities: ['Telepathic Bond']
  },
  {
    id: 'horned-devil', name: 'Horned Devil',
    type: 'fiend', size: 'Large',
    cr: 11, xp: 7200, ac: 18, hp: 178, hitDice: '17d10', speed: 20,
    str: 22, dex: 17, con: 21, int: 12, wis: 16, cha: 17,
    attacks: [
      { name: 'Fork', toHit: 10, damage: '2d8+6', damageType: 'Piercing', description: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (2d8 + 6) piercing damage.' },
      { name: 'Tail', toHit: 10, damage: '1d8+6', damageType: 'Piercing', description: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 10 (1d8 + 6) piercing damage. If the target is a creature other than an undead or a construct, it must succeed on a DC 17 Constitution saving throw or lose 10 (3d6) hit points at the start of each of its turns due to an infernal wound. Each time the devil hits the wounded target with this attack, the damage dealt by the wound increases by 10 (3d6). Any creature can take an action to stanch the wound with a successful DC 12 Wisdom (Medicine) check. The wound also closes if the target receives magical healing.' },
      { name: 'Hurl Flame', toHit: 7, damage: '4d6', damageType: 'Fire', description: 'Ranged Spell Attack: +7 to hit, range 150 ft., one target. Hit: 14 (4d6) fire damage. If the target is a flammable object that isn\'t being worn or carried, it also catches fire.' },
    ],
    multiattack: 'The devil makes three melee attacks: two with its fork and one with its tail. It can use Hurl Flame in place of any melee attack.',
    specialAbilities: ['Devil\'s Sight', 'Magic Resistance']
  },
  {
    id: 'hunter-shark', name: 'Hunter Shark',
    type: 'beast', size: 'Large',
    cr: 2, xp: 450, ac: 12, hp: 45, hitDice: '6d10', speed: 30,
    str: 18, dex: 13, con: 15, int: 1, wis: 10, cha: 4,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '2d8+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.' },
    ],
    specialAbilities: ['Blood Frenzy', 'Water Breathing']
  },
  {
    id: 'hydra', name: 'Hydra',
    type: 'monstrosity', size: 'Huge',
    cr: 8, xp: 3900, ac: 15, hp: 172, hitDice: '15d12', speed: 30,
    str: 20, dex: 12, con: 20, int: 2, wis: 10, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 8, damage: '1d10+5', damageType: 'Piercing', description: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 10 (1d10 + 5) piercing damage.' },
    ],
    multiattack: 'The hydra makes as many bite attacks as it has heads.',
    specialAbilities: ['Hold Breath', 'Multiple Heads', 'Reactive Heads', 'Wakeful']
  },
  {
    id: 'hyena', name: 'Hyena',
    type: 'beast', size: 'Medium',
    cr: 0, xp: 10, ac: 11, hp: 5, hitDice: '1d8', speed: 50,
    str: 11, dex: 13, con: 12, int: 2, wis: 12, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 2, damage: '1d6', damageType: 'Piercing', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) piercing damage.' },
    ],
    specialAbilities: ['Pack Tactics']
  },
  {
    id: 'ice-devil', name: 'Ice Devil',
    type: 'fiend', size: 'Large',
    cr: 14, xp: 11500, ac: 18, hp: 180, hitDice: '19d10', speed: 40,
    str: 21, dex: 14, con: 18, int: 18, wis: 15, cha: 18,
    attacks: [
      { name: 'Bite', toHit: 10, damage: '2d6+5', damageType: 'Piercing', extraDamage: '3d6', extraDamageType: 'Cold', description: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) piercing damage plus 10 (3d6) cold damage.' },
      { name: 'Claws', toHit: 10, damage: '2d4+5', damageType: 'Slashing', extraDamage: '3d6', extraDamageType: 'Cold', description: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 10 (2d4 + 5) slashing damage plus 10 (3d6) cold damage.' },
      { name: 'Tail', toHit: 10, damage: '2d6+5', damageType: 'Bludgeoning', extraDamage: '3d6', extraDamageType: 'Cold', description: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 12 (2d6 + 5) bludgeoning damage plus 10 (3d6) cold damage.' },
    ],
    multiattack: 'The devil makes three attacks: one with its bite, one with its claws, and one with its tail.',
    specialAbilities: ['Devil\'s Sight', 'Magic Resistance']
  },
  {
    id: 'ice-mephit', name: 'Ice Mephit',
    type: 'elemental', size: 'Small',
    cr: 0.5, xp: 100, ac: 11, hp: 21, hitDice: '6d6', speed: 30,
    str: 7, dex: 13, con: 10, int: 9, wis: 11, cha: 12,
    attacks: [
      { name: 'Claws', toHit: 3, damage: '1d4+1', damageType: 'Slashing', extraDamage: '1d4', extraDamageType: 'Cold', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) slashing damage plus 2 (1d4) cold damage.' },
    ],
    specialAbilities: ['Death Burst', 'False Appearance', 'Innate Spellcasting']
  },
  {
    id: 'imp', name: 'Imp',
    type: 'fiend', size: 'Tiny',
    cr: 1, xp: 200, ac: 13, hp: 10, hitDice: '3d4', speed: 20,
    str: 6, dex: 17, con: 13, int: 11, wis: 12, cha: 14,
    attacks: [
      { name: 'Sting (Bite in Beast Form)', toHit: 5, damage: '1d4+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage, and the target must make on a DC 11 Constitution saving throw, taking 10 (3d6) poison damage on a failed save, or half as much damage on a successful one.' },
    ],
    specialAbilities: ['Shapechanger', 'Devil\'s Sight', 'Magic Resistance']
  },
  {
    id: 'invisible-stalker', name: 'Invisible Stalker',
    type: 'elemental', size: 'Medium',
    cr: 6, xp: 2300, ac: 14, hp: 104, hitDice: '16d8', speed: 50,
    str: 16, dex: 19, con: 14, int: 10, wis: 15, cha: 11,
    attacks: [
      { name: 'Slam', toHit: 6, damage: '2d6+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage.' },
    ],
    multiattack: 'The stalker makes two slam attacks.',
    specialAbilities: ['Invisibility', 'Faultless Tracker']
  },
  {
    id: 'iron-golem', name: 'Iron Golem',
    type: 'construct', size: 'Large',
    cr: 16, xp: 15000, ac: 20, hp: 210, hitDice: '20d10', speed: 30,
    str: 24, dex: 9, con: 20, int: 3, wis: 11, cha: 1,
    attacks: [
      { name: 'Slam', toHit: 13, damage: '3d8+7', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 20 (3d8 + 7) bludgeoning damage.' },
      { name: 'Sword', toHit: 13, damage: '3d10+7', damageType: 'Slashing', description: 'Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 23 (3d10 + 7) slashing damage.' },
    ],
    multiattack: 'The golem makes two melee attacks.',
    specialAbilities: ['Fire Absorption', 'Immutable Form', 'Magic Resistance', 'Magic Weapons']
  },
  {
    id: 'jackal', name: 'Jackal',
    type: 'beast', size: 'Small',
    cr: 0, xp: 10, ac: 12, hp: 3, hitDice: '1d6', speed: 40,
    str: 8, dex: 15, con: 11, int: 3, wis: 12, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 1, damage: '1d4-1', damageType: 'Piercing', description: 'Melee Weapon Attack: +1 to hit, reach 5 ft., one target. Hit: 1 (1d4 - 1) piercing damage.' },
    ],
    specialAbilities: ['Keen Hearing and Smell', 'Pack Tactics']
  },
  {
    id: 'killer-whale', name: 'Killer Whale',
    type: 'beast', size: 'Huge',
    cr: 3, xp: 700, ac: 12, hp: 90, hitDice: '12d12', speed: 30,
    str: 19, dex: 10, con: 13, int: 3, wis: 12, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '5d6+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 21 (5d6 + 4) piercing damage.' },
    ],
    specialAbilities: ['Echolocation', 'Hold Breath', 'Keen Hearing']
  },
  {
    id: 'knight', name: 'Knight',
    type: 'humanoid', size: 'Medium',
    cr: 3, xp: 700, ac: 18, hp: 52, hitDice: '8d8', speed: 30,
    str: 16, dex: 11, con: 14, int: 11, wis: 11, cha: 15,
    attacks: [
      { name: 'Greatsword', toHit: 5, damage: '2d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.' },
      { name: 'Heavy Crossbow', toHit: 2, damage: '1d10', damageType: 'Piercing', description: 'Ranged Weapon Attack: +2 to hit, range 100/400 ft., one target. Hit: 5 (1d10) piercing damage.' },
    ],
    multiattack: 'The knight makes two melee attacks.',
    specialAbilities: ['Brave']
  },
  {
    id: 'kobold', name: 'Kobold',
    type: 'humanoid', size: 'Small',
    cr: 0.125, xp: 25, ac: 12, hp: 5, hitDice: '2d6', speed: 30,
    str: 7, dex: 15, con: 9, int: 8, wis: 7, cha: 8,
    attacks: [
      { name: 'Dagger', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.' },
      { name: 'Sling', toHit: 4, damage: '1d4+2', damageType: 'Bludgeoning', description: 'Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 4 (1d4 + 2) bludgeoning damage.' },
    ],
    specialAbilities: ['Sunlight Sensitivity', 'Pack Tactics']
  },
  {
    id: 'kraken', name: 'Kraken',
    type: 'monstrosity', size: 'Gargantuan',
    cr: 23, xp: 50000, ac: 18, hp: 472, hitDice: '27d20', speed: 20,
    str: 30, dex: 11, con: 25, int: 22, wis: 18, cha: 20,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '3d8+10', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 23 (3d8 + 10) piercing damage. If the target is a Large or smaller creature grappled by the kraken, that creature is swallowed, and the grapple ends. While swallowed, the creature is blinded and restrained, it has total cover against attacks and other effects outside the kraken, and it takes 42 (12d6) acid damage at the start of each of the kraken\'s turns. If the kraken takes 50 damage or more on a single turn from a creature inside it, the kraken must succeed on a DC 25 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the kraken. If the kraken dies, a swallowed creature is no longer restrained by it and can escape from the corpse using 15 feet of movement, exiting prone.' },
      { name: 'Tentacle', toHit: 7, damage: '3d6+10', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +7 to hit, reach 30 ft., one target. Hit: 20 (3d6 + 10) bludgeoning damage, and the target is grappled (escape DC 18). Until this grapple ends, the target is restrained. The kraken has ten tentacles, each of which can grapple one target.' },
    ],
    multiattack: 'The kraken makes three tentacle attacks, each of which it can replace with one use of Fling.',
    specialAbilities: ['Amphibious', 'Freedom of Movement', 'Siege Monster']
  },
  {
    id: 'lamia', name: 'Lamia',
    type: 'monstrosity', size: 'Large',
    cr: 4, xp: 1100, ac: 13, hp: 97, hitDice: '13d10', speed: 30,
    str: 16, dex: 13, con: 15, int: 14, wis: 15, cha: 16,
    attacks: [
      { name: 'Claws', toHit: 5, damage: '2d10+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 14 (2d10 + 3) slashing damage.' },
      { name: 'Dagger', toHit: 5, damage: '1d4+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage.' },
      { name: 'Intoxicating Touch', toHit: 5, damage: '1d4', damageType: 'bludgeoning', description: 'Melee Spell Attack: +5 to hit, reach 5 ft., one creature. Hit: The target is magically cursed for 1 hour. Until the curse ends, the target has disadvantage on Wisdom saving throws and all ability checks.' },
    ],
    multiattack: 'The lamia makes two attacks: one with its claws and one with its dagger or Intoxicating Touch.',
    specialAbilities: ['Innate Spellcasting']
  },
  {
    id: 'lemure', name: 'Lemure',
    type: 'fiend', size: 'Medium',
    cr: 0, xp: 10, ac: 7, hp: 13, hitDice: '3d8', speed: 15,
    str: 10, dex: 5, con: 11, int: 1, wis: 11, cha: 3,
    attacks: [
      { name: 'Fist', toHit: 3, damage: '1d4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.' },
    ],
    specialAbilities: ['Devil\'s Sight', 'Hellish Rejuvenation']
  },
  {
    id: 'lich', name: 'Lich',
    type: 'undead', size: 'Medium',
    cr: 21, xp: 33000, ac: 17, hp: 135, hitDice: '18d8', speed: 30,
    str: 11, dex: 16, con: 16, int: 20, wis: 14, cha: 16,
    attacks: [
      { name: 'Paralyzing Touch', toHit: 12, damage: '3d6', damageType: 'Cold', description: 'Melee Spell Attack: +12 to hit, reach 5 ft., one creature. Hit: 10 (3d6) cold damage. The target must succeed on a DC 18 Constitution saving throw or be paralyzed for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.' },
    ],
    specialAbilities: ['Legendary Resistance', 'Rejuvenation', 'Spellcasting', 'Turn Resistance']
  },
  {
    id: 'lion', name: 'Lion',
    type: 'beast', size: 'Large',
    cr: 1, xp: 200, ac: 12, hp: 26, hitDice: '4d10', speed: 50,
    str: 17, dex: 15, con: 13, int: 3, wis: 12, cha: 8,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d8+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage.' },
      { name: 'Claw', toHit: 5, damage: '1d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.' },
    ],
    specialAbilities: ['Keen Smell', 'Pack Tactics', 'Pounce', 'Running Leap']
  },
  {
    id: 'lizard', name: 'Lizard',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 10, hp: 2, hitDice: '1d4', speed: 20,
    str: 2, dex: 11, con: 10, int: 1, wis: 8, cha: 3,
    attacks: [
      { name: 'Bite', toHit: 0, damage: '1', damageType: 'Piercing', description: 'Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.' },
    ],
  },
  {
    id: 'lizardfolk', name: 'Lizardfolk',
    type: 'humanoid', size: 'Medium',
    cr: 0.5, xp: 100, ac: 13, hp: 22, hitDice: '4d8', speed: 30,
    str: 15, dex: 10, con: 13, int: 7, wis: 12, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Heavy Club', toHit: 4, damage: '1d6+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) bludgeoning damage.' },
      { name: 'Javelin', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Spiked Shield', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
    ],
    multiattack: 'The lizardfolk makes two melee attacks, each one with a different weapon.',
    specialAbilities: ['Hold Breath']
  },
  {
    id: 'mage', name: 'Mage',
    type: 'humanoid', size: 'Medium',
    cr: 6, xp: 2300, ac: 12, hp: 40, hitDice: '9d8', speed: 30,
    str: 9, dex: 14, con: 11, int: 17, wis: 12, cha: 11,
    attacks: [
      { name: 'Dagger', toHit: 5, damage: '1d4+2', damageType: 'Piercing', description: 'Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d4 + 2) piercing damage.' },
    ],
    specialAbilities: ['Spellcasting']
  },
  {
    id: 'magma-mephit', name: 'Magma Mephit',
    type: 'elemental', size: 'Small',
    cr: 0.5, xp: 100, ac: 11, hp: 22, hitDice: '5d6', speed: 30,
    str: 8, dex: 12, con: 12, int: 7, wis: 10, cha: 10,
    attacks: [
      { name: 'Claws', toHit: 3, damage: '1d4+1', damageType: 'Slashing', extraDamage: '1d4', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one creature. Hit: 3 (1d4 + 1) slashing damage plus 2 (1d4) fire damage.' },
    ],
    specialAbilities: ['Death Burst', 'False Appearance', 'Innate Spellcasting']
  },
  {
    id: 'magmin', name: 'Magmin',
    type: 'elemental', size: 'Small',
    cr: 0.5, xp: 100, ac: 14, hp: 9, hitDice: '2d6', speed: 30,
    str: 7, dex: 15, con: 12, int: 8, wis: 11, cha: 10,
    attacks: [
      { name: 'Touch', toHit: 4, damage: '2d6', damageType: 'Fire', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d6) fire damage. If the target is a creature or a flammable object, it ignites. Until a target takes an action to douse the fire, the target takes 3 (1d6) fire damage at the end of each of its turns.' },
    ],
    specialAbilities: ['Death Burst', 'Ignited Illumination']
  },
  {
    id: 'mammoth', name: 'Mammoth',
    type: 'beast', size: 'Huge',
    cr: 6, xp: 2300, ac: 13, hp: 126, hitDice: '11d12', speed: 40,
    str: 24, dex: 9, con: 21, int: 3, wis: 11, cha: 6,
    attacks: [
      { name: 'Gore', toHit: 10, damage: '4d8+7', damageType: 'Piercing', description: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 25 (4d8 + 7) piercing damage.' },
      { name: 'Stomp', toHit: 10, damage: '4d10+7', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one prone creature. Hit: 29 (4d10 + 7) bludgeoning damage.' },
    ],
    specialAbilities: ['Trampling Charge']
  },
  {
    id: 'manticore', name: 'Manticore',
    type: 'monstrosity', size: 'Large',
    cr: 3, xp: 700, ac: 14, hp: 68, hitDice: '8d10', speed: 30,
    str: 17, dex: 16, con: 17, int: 7, wis: 12, cha: 8,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d8+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage.' },
      { name: 'Claw', toHit: 5, damage: '1d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.' },
      { name: 'Tail Spike', toHit: 5, damage: '1d8+3', damageType: 'Piercing', description: 'Ranged Weapon Attack: +5 to hit, range 100/200 ft., one target. Hit: 7 (1d8 + 3) piercing damage.' },
    ],
    multiattack: 'The manticore makes three attacks: one with its bite and two with its claws or three with its tail spikes.',
    specialAbilities: ['Tail Spike Regrowth']
  },
  {
    id: 'marilith', name: 'Marilith',
    type: 'fiend', size: 'Large',
    cr: 16, xp: 15000, ac: 18, hp: 189, hitDice: '18d10', speed: 40,
    str: 18, dex: 20, con: 20, int: 18, wis: 16, cha: 20,
    attacks: [
      { name: 'Longsword', toHit: 9, damage: '2d8+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.' },
      { name: 'Tail', toHit: 9, damage: '2d10+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one creature. Hit: 15 (2d10 + 4) bludgeoning damage. If the target is Medium or smaller, it is grappled (escape DC 19). Until this grapple ends, the target is restrained, the marilith can automatically hit the target with its tail, and the marilith can\'t make tail attacks against other targets.' },
    ],
    multiattack: 'The marilith can make seven attacks: six with its longswords and one with its tail.',
    specialAbilities: ['Magic Resistance', 'Magic Weapons', 'Reactive']
  },
  {
    id: 'mastiff', name: 'Mastiff',
    type: 'beast', size: 'Medium',
    cr: 0.125, xp: 25, ac: 12, hp: 5, hitDice: '1d8', speed: 40,
    str: 13, dex: 14, con: 12, int: 3, wis: 12, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 3, damage: '1d6+1', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.' },
    ],
    specialAbilities: ['Keen Hearing and Smell']
  },
  {
    id: 'medusa', name: 'Medusa',
    type: 'monstrosity', size: 'Medium',
    cr: 6, xp: 2300, ac: 15, hp: 127, hitDice: '17d8', speed: 30,
    str: 10, dex: 15, con: 16, int: 12, wis: 13, cha: 15,
    attacks: [
      { name: 'Snake Hair', toHit: 5, damage: '1d4+2', damageType: 'Piercing', extraDamage: '4d6', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage plus 14 (4d6) poison damage.' },
      { name: 'Shortsword', toHit: 5, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Longbow', toHit: 5, damage: '1d8+2', damageType: 'Piercing', extraDamage: '2d6', extraDamageType: 'Poison', description: 'Ranged Weapon Attack: +5 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage plus 7 (2d6) poison damage.' },
    ],
    multiattack: 'The medusa makes either three melee attacks--one with its snake hair and two with its shortsword--or two ranged attacks with its longbow.',
    specialAbilities: ['Petrifying Gaze']
  },
  {
    id: 'merfolk', name: 'Merfolk',
    type: 'humanoid', size: 'Medium',
    cr: 0.125, xp: 25, ac: 11, hp: 11, hitDice: '2d8', speed: 10,
    str: 10, dex: 13, con: 12, int: 11, wis: 11, cha: 12,
    attacks: [
      { name: 'Spear', toHit: 2, damage: '1d4', damageType: 'bludgeoning', description: 'Melee or Ranged Weapon Attack: +2 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 3 (1d6) piercing damage, or 4 (1d8) piercing damage if used with two hands to make a melee attack.' },
    ],
    specialAbilities: ['Amphibious']
  },
  {
    id: 'merrow', name: 'Merrow',
    type: 'monstrosity', size: 'Large',
    cr: 2, xp: 450, ac: 13, hp: 45, hitDice: '6d10', speed: 10,
    str: 18, dex: 10, con: 15, int: 8, wis: 10, cha: 9,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '1d8+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.' },
      { name: 'Claws', toHit: 6, damage: '2d4+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (2d4 + 4) slashing damage.' },
      { name: 'Harpoon', toHit: 6, damage: '2d6+4', damageType: 'Piercing', description: 'Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 11 (2d6 + 4) piercing damage. If the target is a Huge or smaller creature, it must succeed on a Strength contest against the merrow or be pulled up to 20 feet toward the merrow.' },
    ],
    multiattack: 'The merrow makes two attacks: one with its bite and one with its claws or harpoon.',
    specialAbilities: ['Amphibious']
  },
  {
    id: 'mimic', name: 'Mimic',
    type: 'monstrosity', size: 'Medium',
    cr: 2, xp: 450, ac: 12, hp: 58, hitDice: '9d8', speed: 15,
    str: 17, dex: 12, con: 15, int: 5, wis: 13, cha: 8,
    attacks: [
      { name: 'Pseudopod', toHit: 5, damage: '1d8+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage. If the mimic is in object form, the target is subjected to its Adhesive trait.' },
      { name: 'Bite', toHit: 5, damage: '1d8+3', damageType: 'Piercing', extraDamage: '1d8', extraDamageType: 'Acid', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 4 (1d8) acid damage.' },
    ],
    specialAbilities: ['Shapechanger', 'Adhesive (Object Form Only)', 'False Appearance (Object Form Only)', 'Grappler']
  },
  {
    id: 'minotaur', name: 'Minotaur',
    type: 'monstrosity', size: 'Large',
    cr: 3, xp: 700, ac: 14, hp: 76, hitDice: '9d10', speed: 40,
    str: 18, dex: 11, con: 16, int: 6, wis: 16, cha: 9,
    attacks: [
      { name: 'Greataxe', toHit: 6, damage: '2d12+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.' },
      { name: 'Gore', toHit: 6, damage: '2d8+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.' },
    ],
    specialAbilities: ['Charge', 'Labyrinthine Recall', 'Reckless']
  },
  {
    id: 'minotaur-skeleton', name: 'Minotaur Skeleton',
    type: 'undead', size: 'Large',
    cr: 2, xp: 450, ac: 12, hp: 67, hitDice: '9d10', speed: 40,
    str: 18, dex: 11, con: 15, int: 6, wis: 8, cha: 5,
    attacks: [
      { name: 'Greataxe', toHit: 6, damage: '2d12+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 17 (2d12 + 4) slashing damage.' },
      { name: 'Gore', toHit: 6, damage: '2d8+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) piercing damage.' },
    ],
    specialAbilities: ['Charge']
  },
  {
    id: 'mule', name: 'Mule',
    type: 'beast', size: 'Medium',
    cr: 0.125, xp: 25, ac: 10, hp: 11, hitDice: '2d8', speed: 40,
    str: 14, dex: 10, con: 13, int: 2, wis: 10, cha: 5,
    attacks: [
      { name: 'Hooves', toHit: 2, damage: '1d4+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) bludgeoning damage.' },
    ],
    specialAbilities: ['Beast of Burden', 'Sure-Footed']
  },
  {
    id: 'mummy', name: 'Mummy',
    type: 'undead', size: 'Medium',
    cr: 3, xp: 700, ac: 11, hp: 58, hitDice: '9d8', speed: 20,
    str: 16, dex: 8, con: 15, int: 6, wis: 10, cha: 12,
    attacks: [
      { name: 'Rotting Fist', toHit: 5, damage: '2d6+3', damageType: 'Bludgeoning', extraDamage: '3d6', extraDamageType: 'Necrotic', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage plus 10 (3d6) necrotic damage. If the target is a creature, it must succeed on a DC 12 Constitution saving throw or be cursed with mummy rot. The cursed target can\'t regain hit points, and its hit point maximum decreases by 10 (3d6) for every 24 hours that elapse. If the curse reduces the target\'s hit point maximum to 0, the target dies, and its body turns to dust. The curse lasts until removed by the remove curse spell or other magic.' },
    ],
    multiattack: 'The mummy can use its Dreadful Glare and makes one attack with its rotting fist.'
  },
  {
    id: 'mummy-lord', name: 'Mummy Lord',
    type: 'undead', size: 'Medium',
    cr: 15, xp: 13000, ac: 17, hp: 97, hitDice: '13d8', speed: 20,
    str: 18, dex: 10, con: 17, int: 11, wis: 18, cha: 16,
    attacks: [
      { name: 'Rotting Fist', toHit: 9, damage: '3d6+4', damageType: 'Bludgeoning', extraDamage: '6d6', extraDamageType: 'Necrotic', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 14 (3d6 + 4) bludgeoning damage plus 21 (6d6) necrotic damage. If the target is a creature, it must succeed on a DC 16 Constitution saving throw or be cursed with mummy rot. The cursed target can\'t regain hit points, and its hit point maximum decreases by 10 (3d6) for every 24 hours that elapse. If the curse reduces the target\'s hit point maximum to 0, the target dies, and its body turns to dust. The curse lasts until removed by the remove curse spell or other magic.' },
    ],
    multiattack: 'The mummy can use its Dreadful Glare and makes one attack with its rotting fist.',
    specialAbilities: ['Magic Resistance', 'Rejuvenation', 'Spellcasting']
  },
  {
    id: 'nalfeshnee', name: 'Nalfeshnee',
    type: 'fiend', size: 'Large',
    cr: 13, xp: 10000, ac: 18, hp: 184, hitDice: '16d10', speed: 20,
    str: 21, dex: 10, con: 22, int: 19, wis: 12, cha: 15,
    attacks: [
      { name: 'Bite', toHit: 10, damage: '5d10+5', damageType: 'Piercing', description: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 32 (5d10 + 5) piercing damage.' },
      { name: 'Claw', toHit: 10, damage: '3d6+5', damageType: 'Slashing', description: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 15 (3d6 + 5) slashing damage.' },
    ],
    multiattack: 'The nalfeshnee uses Horror Nimbus if it can. It then makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Magic Resistance']
  },
  {
    id: 'night-hag', name: 'Night Hag',
    type: 'fiend', size: 'Medium',
    cr: 5, xp: 1800, ac: 17, hp: 112, hitDice: '15d8', speed: 30,
    str: 18, dex: 15, con: 16, int: 16, wis: 14, cha: 16,
    attacks: [
      { name: 'Claws (Hag Form Only)', toHit: 7, damage: '2d8+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.' },
    ],
    specialAbilities: ['Innate Spellcasting', 'Magic Resistance', 'Night Hag Items']
  },
  {
    id: 'nightmare', name: 'Nightmare',
    type: 'fiend', size: 'Large',
    cr: 3, xp: 700, ac: 13, hp: 68, hitDice: '8d10', speed: 60,
    str: 18, dex: 15, con: 16, int: 10, wis: 13, cha: 15,
    attacks: [
      { name: 'Hooves', toHit: 6, damage: '2d8+4', damageType: 'Bludgeoning', extraDamage: '2d6', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage plus 7 (2d6) fire damage.' },
    ],
    specialAbilities: ['Confer Fire Resistance', 'Illumination']
  },
  {
    id: 'noble', name: 'Noble',
    type: 'humanoid', size: 'Medium',
    cr: 0.125, xp: 25, ac: 15, hp: 9, hitDice: '2d8', speed: 30,
    str: 11, dex: 12, con: 11, int: 12, wis: 14, cha: 16,
    attacks: [
      { name: 'Rapier', toHit: 3, damage: '1d8+1', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.' },
    ],
  },
  {
    id: 'ochre-jelly', name: 'Ochre Jelly',
    type: 'ooze', size: 'Large',
    cr: 2, xp: 450, ac: 8, hp: 45, hitDice: '6d10', speed: 10,
    str: 15, dex: 6, con: 14, int: 2, wis: 6, cha: 1,
    attacks: [
      { name: 'Pseudopod', toHit: 4, damage: '2d6+2', damageType: 'Bludgeoning', extraDamage: '1d6', extraDamageType: 'Acid', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) bludgeoning damage plus 3 (1d6) acid damage.' },
    ],
    specialAbilities: ['Amorphous', 'Spider Climb']
  },
  {
    id: 'octopus', name: 'Octopus',
    type: 'beast', size: 'Small',
    cr: 0, xp: 10, ac: 12, hp: 3, hitDice: '1d6', speed: 5,
    str: 4, dex: 15, con: 11, int: 3, wis: 10, cha: 4,
    attacks: [
      { name: 'Tentacles', toHit: 4, damage: '1', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 bludgeoning damage, and the target is grappled (escape DC 10). Until this grapple ends, the octopus can\'t use its tentacles on another target.' },
      { name: 'Ink Cloud', toHit: 0, damage: '1d4', damageType: 'bludgeoning', description: 'A 5-foot-radius cloud of ink extends all around the octopus if it is underwater. The area is heavily obscured for 1 minute, although a significant current can disperse the ink. After releasing the ink, the octopus can use the Dash action as a bonus action.' },
    ],
    specialAbilities: ['Hold Breath', 'Underwater Camouflage', 'Water Breathing']
  },
  {
    id: 'ogre', name: 'Ogre',
    type: 'giant', size: 'Large',
    cr: 2, xp: 450, ac: 11, hp: 59, hitDice: '7d10', speed: 40,
    str: 19, dex: 8, con: 16, int: 5, wis: 7, cha: 7,
    attacks: [
      { name: 'Greatclub', toHit: 6, damage: '2d8+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.' },
      { name: 'Javelin', toHit: 6, damage: '2d6+4', damageType: 'Piercing', description: 'Melee or Ranged Weapon Attack: +6 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 11 (2d6 + 4) piercing damage.' },
    ],
  },
  {
    id: 'ogre-zombie', name: 'Ogre Zombie',
    type: 'undead', size: 'Large',
    cr: 2, xp: 450, ac: 8, hp: 85, hitDice: '9d10', speed: 30,
    str: 19, dex: 6, con: 18, int: 3, wis: 6, cha: 5,
    attacks: [
      { name: 'Morningstar', toHit: 6, damage: '2d8+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.' },
    ],
    specialAbilities: ['Undead Fortitude']
  },
  {
    id: 'oni', name: 'Oni',
    type: 'giant', size: 'Large',
    cr: 7, xp: 2900, ac: 16, hp: 110, hitDice: '13d10', speed: 30,
    str: 19, dex: 11, con: 16, int: 14, wis: 12, cha: 15,
    attacks: [
      { name: 'Claw (Oni Form Only)', toHit: 7, damage: '1d8+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) slashing damage.' },
      { name: 'Glaive', toHit: 7, damage: '2d10+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) slashing damage, or 9 (1d10 + 4) slashing damage in Small or Medium form.' },
    ],
    multiattack: 'The oni makes two attacks, either with its claws or its glaive.',
    specialAbilities: ['Innate Spellcasting', 'Magic Weapons', 'Regeneration']
  },
  {
    id: 'orc', name: 'Orc',
    type: 'humanoid', size: 'Medium',
    cr: 0.5, xp: 100, ac: 13, hp: 15, hitDice: '2d8', speed: 30,
    str: 16, dex: 12, con: 16, int: 7, wis: 11, cha: 10,
    attacks: [
      { name: 'Greataxe', toHit: 5, damage: '1d12+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 9 (1d12 + 3) slashing damage.' },
      { name: 'Javelin', toHit: 5, damage: '1d6+3', damageType: 'Piercing', description: 'Melee or Ranged Weapon Attack: +5 to hit, reach 5 ft. or range 30/120 ft., one target. Hit: 6 (1d6 + 3) piercing damage.' },
    ],
    specialAbilities: ['Aggressive']
  },
  {
    id: 'otyugh', name: 'Otyugh',
    type: 'aberration', size: 'Large',
    cr: 5, xp: 1800, ac: 14, hp: 114, hitDice: '12d10', speed: 30,
    str: 16, dex: 11, con: 19, int: 6, wis: 13, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '2d8+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d8 + 3) piercing damage. If the target is a creature, it must succeed on a DC 15 Constitution saving throw against disease or become poisoned until the disease is cured. Every 24 hours that elapse, the target must repeat the saving throw, reducing its hit point maximum by 5 (1d10) on a failure. The disease is cured on a success. The target dies if the disease reduces its hit point maximum to 0. This reduction to the target\'s hit point maximum lasts until the disease is cured.' },
      { name: 'Tentacle', toHit: 6, damage: '1d8+3', damageType: 'Bludgeoning', extraDamage: '1d8', extraDamageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 7 (1d8 + 3) bludgeoning damage plus 4 (1d8) piercing damage. If the target is Medium or smaller, it is grappled (escape DC 13) and restrained until the grapple ends. The otyugh has two tentacles, each of which can grapple one target.' },
    ],
    multiattack: 'The otyugh makes three attacks: one with its bite and two with its tentacles.',
    specialAbilities: ['Limited Telepathy']
  },
  {
    id: 'owl', name: 'Owl',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 11, hp: 1, hitDice: '1d4', speed: 5,
    str: 3, dex: 13, con: 8, int: 2, wis: 12, cha: 7,
    attacks: [
      { name: 'Talons', toHit: 3, damage: '1', damageType: 'Slashing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 1 slashing damage.' },
    ],
    specialAbilities: ['Flyby', 'Keen Hearing and Sight']
  },
  {
    id: 'owlbear', name: 'Owlbear',
    type: 'monstrosity', size: 'Large',
    cr: 3, xp: 700, ac: 13, hp: 59, hitDice: '7d10', speed: 40,
    str: 20, dex: 12, con: 17, int: 3, wis: 12, cha: 7,
    attacks: [
      { name: 'Beak', toHit: 7, damage: '1d10+5', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one creature. Hit: 10 (1d10 + 5) piercing damage.' },
      { name: 'Claws', toHit: 7, damage: '2d8+5', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) slashing damage.' },
    ],
    multiattack: 'The owlbear makes two attacks: one with its beak and one with its claws.',
    specialAbilities: ['Keen Sight and Smell']
  },
  {
    id: 'panther', name: 'Panther',
    type: 'beast', size: 'Medium',
    cr: 0.25, xp: 50, ac: 12, hp: 13, hitDice: '3d8', speed: 50,
    str: 14, dex: 15, con: 10, int: 3, wis: 14, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Claw', toHit: 4, damage: '1d4+2', damageType: 'Slashing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) slashing damage.' },
    ],
    specialAbilities: ['Keen Smell', 'Pounce']
  },
  {
    id: 'pegasus', name: 'Pegasus',
    type: 'celestial', size: 'Large',
    cr: 2, xp: 450, ac: 12, hp: 59, hitDice: '7d10', speed: 60,
    str: 18, dex: 15, con: 16, int: 10, wis: 15, cha: 13,
    attacks: [
      { name: 'Hooves', toHit: 6, damage: '2d6+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.' },
    ],
  },
  {
    id: 'phase-spider', name: 'Phase Spider',
    type: 'monstrosity', size: 'Large',
    cr: 3, xp: 700, ac: 13, hp: 32, hitDice: '5d10', speed: 30,
    str: 15, dex: 15, con: 12, int: 6, wis: 10, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d10+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target must make a DC 11 Constitution saving throw, taking 18 (4d8) poison damage on a failed save, or half as much damage on a successful one. If the poison damage reduces the target to 0 hit points, the target is stable but poisoned for 1 hour, even after regaining hit points, and is paralyzed while poisoned in this way.' },
    ],
    specialAbilities: ['Ethereal Jaunt', 'Spider Climb', 'Web Walker']
  },
  {
    id: 'pit-fiend', name: 'Pit Fiend',
    type: 'fiend', size: 'Large',
    cr: 20, xp: 25000, ac: 19, hp: 300, hitDice: '24d10', speed: 30,
    str: 26, dex: 14, con: 24, int: 22, wis: 18, cha: 24,
    attacks: [
      { name: 'Bite', toHit: 14, damage: '4d6+8', damageType: 'Piercing', description: 'Melee Weapon Attack: +14 to hit, reach 5 ft., one target. Hit: 22 (4d6 + 8) piercing damage. The target must succeed on a DC 21 Constitution saving throw or become poisoned. While poisoned in this way, the target can\'t regain hit points, and it takes 21 (6d6) poison damage at the start of each of its turns. The poisoned target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.' },
      { name: 'Claw', toHit: 14, damage: '2d8+8', damageType: 'Slashing', description: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 17 (2d8 + 8) slashing damage.' },
      { name: 'Mace', toHit: 14, damage: '2d6+8', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 15 (2d6 + 8) bludgeoning damage plus 21 (6d6) fire damage.' },
      { name: 'Tail', toHit: 14, damage: '3d10+8', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 24 (3d10 + 8) bludgeoning damage.' },
    ],
    multiattack: 'The pit fiend makes four attacks: one with its bite, one with its claw, one with its mace, and one with its tail.',
    specialAbilities: ['Fear Aura', 'Magic Resistance', 'Magic Weapons', 'Innate Spellcasting']
  },
  {
    id: 'planetar', name: 'Planetar',
    type: 'celestial', size: 'Large',
    cr: 16, xp: 15000, ac: 19, hp: 200, hitDice: '16d10', speed: 40,
    str: 24, dex: 20, con: 24, int: 19, wis: 22, cha: 25,
    attacks: [
      { name: 'Greatsword', toHit: 12, damage: '4d6+7', damageType: 'Slashing', extraDamage: '5d8', extraDamageType: 'Radiant', description: 'Melee Weapon Attack: +12 to hit, reach 5 ft., one target. Hit: 21 (4d6 + 7) slashing damage plus 22 (5d8) radiant damage.' },
    ],
    multiattack: 'The planetar makes two melee attacks.',
    specialAbilities: ['Angelic Weapons', 'Divine Awareness', 'Innate Spellcasting', 'Magic Resistance']
  },
  {
    id: 'plesiosaurus', name: 'Plesiosaurus',
    type: 'beast', size: 'Large',
    cr: 2, xp: 450, ac: 13, hp: 68, hitDice: '8d10', speed: 20,
    str: 18, dex: 15, con: 16, int: 2, wis: 12, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '3d6+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 10 ft., one target. Hit: 14 (3d6 + 4) piercing damage.' },
    ],
    specialAbilities: ['Hold Breath']
  },
  {
    id: 'poisonous-snake', name: 'Poisonous Snake',
    type: 'beast', size: 'Tiny',
    cr: 0.125, xp: 25, ac: 13, hp: 2, hitDice: '1d4', speed: 30,
    str: 2, dex: 16, con: 11, int: 1, wis: 10, cha: 3,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage, and the target must make a DC 10 Constitution saving throw, taking 5 (2d4) poison damage on a failed save, or half as much damage on a successful one.' },
    ],
  },
  {
    id: 'polar-bear', name: 'Polar Bear',
    type: 'beast', size: 'Large',
    cr: 2, xp: 450, ac: 12, hp: 42, hitDice: '5d10', speed: 40,
    str: 20, dex: 10, con: 16, int: 2, wis: 13, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '1d8+5', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (1d8 + 5) piercing damage.' },
      { name: 'Claws', toHit: 7, damage: '2d6+5', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.' },
    ],
    multiattack: 'The bear makes two attacks: one with its bite and one with its claws.',
    specialAbilities: ['Keen Smell']
  },
  {
    id: 'pony', name: 'Pony',
    type: 'beast', size: 'Medium',
    cr: 0.125, xp: 25, ac: 10, hp: 11, hitDice: '2d8', speed: 40,
    str: 15, dex: 10, con: 13, int: 2, wis: 11, cha: 7,
    attacks: [
      { name: 'Hooves', toHit: 4, damage: '2d4+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) bludgeoning damage.' },
    ],
  },
  {
    id: 'priest', name: 'Priest',
    type: 'humanoid', size: 'Medium',
    cr: 2, xp: 450, ac: 13, hp: 27, hitDice: '5d8', speed: 25,
    str: 10, dex: 10, con: 12, int: 13, wis: 16, cha: 13,
    attacks: [
      { name: 'Mace', toHit: 2, damage: '1d6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 3 (1d6) bludgeoning damage.' },
    ],
    specialAbilities: ['Divine Eminence', 'Spellcasting']
  },
  {
    id: 'pseudodragon', name: 'Pseudodragon',
    type: 'dragon', size: 'Tiny',
    cr: 0.25, xp: 50, ac: 13, hp: 7, hitDice: '2d4', speed: 15,
    str: 6, dex: 15, con: 13, int: 10, wis: 12, cha: 10,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage.' },
      { name: 'Sting', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 4 (1d4 + 2) piercing damage, and the target must succeed on a DC 11 Constitution saving throw or become poisoned for 1 hour. If the saving throw fails by 5 or more, the target falls unconscious for the same duration, or until it takes damage or another creature uses an action to shake it awake.' },
    ],
    specialAbilities: ['Keen Senses', 'Magic Resistance', 'Limited Telepathy']
  },
  {
    id: 'purple-worm', name: 'Purple Worm',
    type: 'monstrosity', size: 'Gargantuan',
    cr: 15, xp: 13000, ac: 18, hp: 247, hitDice: '15d20', speed: 50,
    str: 28, dex: 7, con: 22, int: 1, wis: 8, cha: 4,
    attacks: [
      { name: 'Bite', toHit: 9, damage: '3d8+9', damageType: 'Piercing', description: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 22 (3d8 + 9) piercing damage. If the target is a Large or smaller creature, it must succeed on a DC 19 Dexterity saving throw or be swallowed by the worm. A swallowed creature is blinded and restrained, it has total cover against attacks and other effects outside the worm, and it takes 21 (6d6) acid damage at the start of each of the worm\'s turns.\nIf the worm takes 30 damage or more on a single turn from a creature inside it, the worm must succeed on a DC 21 Constitution saving throw at the end of that turn or regurgitate all swallowed creatures, which fall prone in a space within 10 feet of the worm. If the worm dies, a swallowed creature is no longer restrained by it and can escape from the corpse by using 20 feet of movement, exiting prone.' },
      { name: 'Tail Stinger', toHit: 9, damage: '3d6+9', damageType: 'Piercing', description: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one creature. Hit: 19 (3d6 + 9) piercing damage, and the target must make a DC 19 Constitution saving throw, taking 42 (12d6) poison damage on a failed save, or half as much damage on a successful one.' },
    ],
    multiattack: 'The worm makes two attacks: one with its bite and one with its stinger.',
    specialAbilities: ['Tunneler']
  },
  {
    id: 'quasit', name: 'Quasit',
    type: 'fiend', size: 'Tiny',
    cr: 1, xp: 200, ac: 13, hp: 7, hitDice: '3d4', speed: 40,
    str: 5, dex: 17, con: 10, int: 7, wis: 10, cha: 10,
    attacks: [
      { name: 'Claw (Bite in Beast Form)', toHit: 4, damage: '1d4+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d4 + 3) piercing damage, and the target must succeed on a DC 10 Constitution saving throw or take 5 (2d4) poison damage and become poisoned for 1 minute. The target can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success.' },
    ],
    specialAbilities: ['Shapechanger', 'Magic Resistance']
  },
  {
    id: 'quipper', name: 'Quipper',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 13, hp: 1, hitDice: '1d4', speed: 30,
    str: 2, dex: 16, con: 9, int: 1, wis: 7, cha: 2,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 1 piercing damage.' },
    ],
    specialAbilities: ['Blood Frenzy', 'Water Breathing']
  },
  {
    id: 'rakshasa', name: 'Rakshasa',
    type: 'fiend', size: 'Medium',
    cr: 13, xp: 10000, ac: 16, hp: 110, hitDice: '13d8', speed: 40,
    str: 14, dex: 17, con: 18, int: 13, wis: 16, cha: 20,
    attacks: [
      { name: 'Claw', toHit: 7, damage: '2d6+2', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 9 (2d6 + 2) slashing damage, and the target is cursed if it is a creature. The magical curse takes effect whenever the target takes a short or long rest, filling the target\'s thoughts with horrible images and dreams. The cursed target gains no benefit from finishing a short or long rest. The curse lasts until it is lifted by a remove curse spell or similar magic.' },
    ],
    multiattack: 'The rakshasa makes two claw attacks',
    specialAbilities: ['Limited Magic Immunity', 'Innate Spellcasting']
  },
  {
    id: 'rat', name: 'Rat',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 10, hp: 1, hitDice: '1d4', speed: 20,
    str: 2, dex: 11, con: 9, int: 2, wis: 10, cha: 4,
    attacks: [
      { name: 'Bite', toHit: 0, damage: '1', damageType: 'Piercing', description: 'Melee Weapon Attack: +0 to hit, reach 5 ft., one target. Hit: 1 piercing damage.' },
    ],
    specialAbilities: ['Keen Smell']
  },
  {
    id: 'raven', name: 'Raven',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 12, hp: 1, hitDice: '1d4', speed: 10,
    str: 2, dex: 14, con: 8, int: 2, wis: 12, cha: 6,
    attacks: [
      { name: 'Beak', toHit: 4, damage: '1', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 1 piercing damage.' },
    ],
    specialAbilities: ['Mimicry']
  },
  {
    id: 'red-dragon-wyrmling', name: 'Red Dragon Wyrmling',
    type: 'dragon', size: 'Medium',
    cr: 4, xp: 1100, ac: 17, hp: 75, hitDice: '10d8', speed: 30,
    str: 19, dex: 10, con: 17, int: 12, wis: 11, cha: 15,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '1d10+4', damageType: 'Piercing', extraDamage: '1d6', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) piercing damage plus 3 (1d6) fire damage.' },
    ],
  },
  {
    id: 'reef-shark', name: 'Reef Shark',
    type: 'beast', size: 'Medium',
    cr: 0.5, xp: 100, ac: 12, hp: 22, hitDice: '4d8', speed: 30,
    str: 14, dex: 13, con: 13, int: 1, wis: 10, cha: 4,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d8+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage.' },
    ],
    specialAbilities: ['Pack Tactics', 'Water Breathing']
  },
  {
    id: 'remorhaz', name: 'Remorhaz',
    type: 'monstrosity', size: 'Huge',
    cr: 11, xp: 7200, ac: 17, hp: 195, hitDice: '17d12', speed: 30,
    str: 24, dex: 13, con: 21, int: 4, wis: 10, cha: 5,
    attacks: [
      { name: 'Bite', toHit: 11, damage: '6d10+7', damageType: 'Piercing', extraDamage: '3d6', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +11 to hit, reach 10 ft., one target. Hit: 40 (6d10 + 7) piercing damage plus 10 (3d6) fire damage. If the target is a creature, it is grappled (escape DC 17). Until this grapple ends, the target is restrained, and the remorhaz can\'t bite another target.' },
    ],
    specialAbilities: ['Heated Body']
  },
  {
    id: 'rhinoceros', name: 'Rhinoceros',
    type: 'beast', size: 'Large',
    cr: 2, xp: 450, ac: 11, hp: 45, hitDice: '6d10', speed: 40,
    str: 21, dex: 8, con: 15, int: 2, wis: 12, cha: 6,
    attacks: [
      { name: 'Gore', toHit: 7, damage: '2d8+5', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 14 (2d8 + 5) bludgeoning damage.' },
    ],
    specialAbilities: ['Charge']
  },
  {
    id: 'riding-horse', name: 'Riding Horse',
    type: 'beast', size: 'Large',
    cr: 0.25, xp: 25, ac: 10, hp: 13, hitDice: '2d10', speed: 60,
    str: 16, dex: 10, con: 12, int: 2, wis: 11, cha: 7,
    attacks: [
      { name: 'Hooves', toHit: 5, damage: '2d4+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (2d4 + 3) bludgeoning damage.' },
    ],
  },
  {
    id: 'roc', name: 'Roc',
    type: 'monstrosity', size: 'Gargantuan',
    cr: 11, xp: 7200, ac: 15, hp: 248, hitDice: '16d20', speed: 20,
    str: 28, dex: 10, con: 20, int: 3, wis: 10, cha: 9,
    attacks: [
      { name: 'Beak', toHit: 13, damage: '4d8+9', damageType: 'Piercing', description: 'Melee Weapon Attack: +13 to hit, reach 10 ft., one target. Hit: 27 (4d8 + 9) piercing damage.' },
      { name: 'Talons', toHit: 13, damage: '4d6+9', damageType: 'Slashing', description: 'Melee Weapon Attack: +13 to hit, reach 5 ft., one target. Hit: 23 (4d6 + 9) slashing damage, and the target is grappled (escape DC 19). Until this grapple ends, the target is restrained, and the roc can\'t use its talons on another target.' },
    ],
    multiattack: 'The roc makes two attacks: one with its beak and one with its talons.',
    specialAbilities: ['Keen Sight']
  },
  {
    id: 'roper', name: 'Roper',
    type: 'monstrosity', size: 'Large',
    cr: 5, xp: 1800, ac: 20, hp: 93, hitDice: '11d10', speed: 10,
    str: 18, dex: 8, con: 17, int: 7, wis: 16, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '4d8+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 22 (4d8 + 4) piercing damage.' },
      { name: 'Tendril', toHit: 7, damage: '1d4', damageType: 'bludgeoning', description: 'Melee Weapon Attack: +7 to hit, reach 50 ft., one creature. Hit: The target is grappled (escape DC 15). Until the grapple ends, the target is restrained and has disadvantage on Strength checks and Strength saving throws, and the roper can\'t use the same tendril on another target.' },
    ],
    multiattack: 'The roper makes four attacks with its tendrils, uses Reel, and makes one attack with its bite.',
    specialAbilities: ['False Appearance', 'Grasping Tendrils', 'Spider Climb']
  },
  {
    id: 'rug-of-smothering', name: 'Rug of Smothering',
    type: 'construct', size: 'Large',
    cr: 2, xp: 450, ac: 12, hp: 33, hitDice: '6d10', speed: 10,
    str: 17, dex: 14, con: 10, int: 1, wis: 3, cha: 1,
    attacks: [
      { name: 'Smother', toHit: 5, damage: '1d4', damageType: 'bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one Medium or smaller creature. Hit: The creature is grappled (escape DC 13). Until this grapple ends, the target is restrained, blinded, and at risk of suffocating, and the rug can\'t smother another target. In addition, at the start of each of the target\'s turns, the target takes 10 (2d6 + 3) bludgeoning damage.' },
    ],
    specialAbilities: ['Antimagic Susceptibility', 'Damage Transfer', 'False Appearance']
  },
  {
    id: 'rust-monster', name: 'Rust Monster',
    type: 'monstrosity', size: 'Medium',
    cr: 0.5, xp: 100, ac: 14, hp: 27, hitDice: '5d8', speed: 40,
    str: 13, dex: 12, con: 13, int: 2, wis: 13, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 3, damage: '1d8+1', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 5 (1d8 + 1) piercing damage.' },
    ],
    specialAbilities: ['Iron Scent', 'Rust Metal']
  },
  {
    id: 'saber-toothed-tiger', name: 'Saber-Toothed Tiger',
    type: 'beast', size: 'Large',
    cr: 2, xp: 450, ac: 12, hp: 52, hitDice: '7d10', speed: 40,
    str: 18, dex: 14, con: 15, int: 3, wis: 12, cha: 8,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '1d10+5', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (1d10 + 5) piercing damage.' },
      { name: 'Claw', toHit: 6, damage: '2d6+5', damageType: 'Slashing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.' },
    ],
    specialAbilities: ['Keen Smell', 'Pounce']
  },
  {
    id: 'sahuagin', name: 'Sahuagin',
    type: 'humanoid', size: 'Medium',
    cr: 0.5, xp: 100, ac: 12, hp: 22, hitDice: '4d8', speed: 30,
    str: 13, dex: 11, con: 12, int: 12, wis: 13, cha: 9,
    attacks: [
      { name: 'Bite', toHit: 3, damage: '1d4+1', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) piercing damage.' },
      { name: 'Claws', toHit: 3, damage: '1d4+1', damageType: 'Slashing', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 3 (1d4 + 1) slashing damage.' },
      { name: 'Spear', toHit: 3, damage: '1d4', damageType: 'bludgeoning', description: 'Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack.' },
    ],
    multiattack: 'The sahuagin makes two melee attacks: one with its bite and one with its claws or spear.',
    specialAbilities: ['Blood Frenzy', 'Limited Amphibiousness', 'Shark Telepathy']
  },
  {
    id: 'salamander', name: 'Salamander',
    type: 'elemental', size: 'Large',
    cr: 5, xp: 1800, ac: 15, hp: 90, hitDice: '12d10', speed: 30,
    str: 18, dex: 14, con: 15, int: 11, wis: 10, cha: 12,
    attacks: [
      { name: 'Spear', toHit: 7, damage: '1d4', damageType: 'bludgeoning', extraDamage: '1d6', extraDamageType: 'Fire', description: 'Melee or Ranged Weapon Attack: +7 to hit, reach 5 ft. or range 20 ft./60 ft., one target. Hit: 11 (2d6 + 4) piercing damage, or 13 (2d8 + 4) piercing damage if used with two hands to make a melee attack, plus 3 (1d6) fire damage.' },
      { name: 'Tail', toHit: 7, damage: '2d6+4', damageType: 'Bludgeoning', extraDamage: '2d6', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage plus 7 (2d6) fire damage, and the target is grappled (escape DC 14). Until this grapple ends, the target is restrained, the salamander can automatically hit the target with its tail, and the salamander can\'t make tail attacks against other targets.' },
    ],
    multiattack: 'The salamander makes two attacks: one with its spear and one with its tail.',
    specialAbilities: ['Heated Body', 'Heated Weapons']
  },
  {
    id: 'satyr', name: 'Satyr',
    type: 'fey', size: 'Medium',
    cr: 0.5, xp: 100, ac: 14, hp: 31, hitDice: '7d8', speed: 40,
    str: 12, dex: 16, con: 11, int: 12, wis: 10, cha: 14,
    attacks: [
      { name: 'Ram', toHit: 3, damage: '2d4+1', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 6 (2d4 + 1) bludgeoning damage.' },
      { name: 'Shortsword', toHit: 5, damage: '1d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1 d6 + 3) piercing damage.' },
      { name: 'Shortbow', toHit: 5, damage: '1d6+3', damageType: 'Piercing', description: 'Ranged Weapon Attack: +5 to hit, range 80/320 ft., one target. Hit: 6 (1d6 + 3) piercing damage.' },
    ],
    specialAbilities: ['Magic Resistance']
  },
  {
    id: 'scorpion', name: 'Scorpion',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 11, hp: 1, hitDice: '1d4', speed: 10,
    str: 2, dex: 11, con: 8, int: 1, wis: 8, cha: 2,
    attacks: [
      { name: 'Sting', toHit: 2, damage: '1', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must make a DC 9 Constitution saving throw, taking 4 (1d8) poison damage on a failed save, or half as much damage on a successful one.' },
    ],
  },
  {
    id: 'scout', name: 'Scout',
    type: 'humanoid', size: 'Medium',
    cr: 0.5, xp: 100, ac: 13, hp: 16, hitDice: '3d8', speed: 30,
    str: 11, dex: 14, con: 12, int: 11, wis: 13, cha: 11,
    attacks: [
      { name: 'Shortsword', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Longbow', toHit: 4, damage: '1d8+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.' },
    ],
    multiattack: 'The scout makes two melee attacks or two ranged attacks.',
    specialAbilities: ['Keen Hearing and Sight']
  },
  {
    id: 'sea-hag', name: 'Sea Hag',
    type: 'fey', size: 'Medium',
    cr: 2, xp: 450, ac: 14, hp: 52, hitDice: '7d8', speed: 30,
    str: 16, dex: 13, con: 16, int: 12, wis: 12, cha: 13,
    attacks: [
      { name: 'Claws', toHit: 5, damage: '2d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage.' },
    ],
    specialAbilities: ['Amphibious', 'Horrific Appearance']
  },
  {
    id: 'sea-horse', name: 'Sea Horse',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 0, ac: 11, hp: 1, hitDice: '1d4', speed: 30,
    str: 1, dex: 12, con: 8, int: 1, wis: 10, cha: 2,
    attacks: [],
    specialAbilities: ['Water Breathing']
  },
  {
    id: 'shadow', name: 'Shadow',
    type: 'undead', size: 'Medium',
    cr: 0.5, xp: 100, ac: 12, hp: 16, hitDice: '3d8', speed: 40,
    str: 6, dex: 14, con: 13, int: 6, wis: 10, cha: 8,
    attacks: [
      { name: 'Strength Drain', toHit: 4, damage: '2d6+2', damageType: 'Necrotic', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 9 (2d6 + 2) necrotic damage, and the target\'s Strength score is reduced by 1d4. The target dies if this reduces its Strength to 0. Otherwise, the reduction lasts until the target finishes a short or long rest.\nIf a non-evil humanoid dies from this attack, a new shadow rises from the corpse 1d4 hours later.' },
    ],
    specialAbilities: ['Amorphous', 'Shadow Stealth', 'Sunlight Weakness']
  },
  {
    id: 'shambling-mound', name: 'Shambling Mound',
    type: 'plant', size: 'Large',
    cr: 5, xp: 1800, ac: 15, hp: 136, hitDice: '16d10', speed: 20,
    str: 18, dex: 8, con: 16, int: 5, wis: 10, cha: 5,
    attacks: [
      { name: 'Slam', toHit: 7, damage: '2d8+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.' },
    ],
    multiattack: 'The shambling mound makes two slam attacks. If both attacks hit a Medium or smaller target, the target is grappled (escape DC 14), and the shambling mound uses its Engulf on it.',
    specialAbilities: ['Lightning Absorption']
  },
  {
    id: 'shield-guardian', name: 'Shield Guardian',
    type: 'construct', size: 'Large',
    cr: 7, xp: 2900, ac: 17, hp: 142, hitDice: '15d10', speed: 30,
    str: 18, dex: 8, con: 18, int: 7, wis: 10, cha: 3,
    attacks: [
      { name: 'Fist', toHit: 7, damage: '2d6+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.' },
    ],
    multiattack: 'The guardian makes two fist attacks.',
    specialAbilities: ['Bound', 'Regeneration', 'Spell Storing']
  },
  {
    id: 'shrieker', name: 'Shrieker',
    type: 'plant', size: 'Medium',
    cr: 0, xp: 10, ac: 5, hp: 13, hitDice: '3d8', speed: 0,
    str: 1, dex: 1, con: 10, int: 1, wis: 3, cha: 1,
    attacks: [],
    specialAbilities: ['False Appearance']
  },
  {
    id: 'silver-dragon-wyrmling', name: 'Silver Dragon Wyrmling',
    type: 'dragon', size: 'Medium',
    cr: 2, xp: 450, ac: 17, hp: 45, hitDice: '6d8', speed: 30,
    str: 19, dex: 10, con: 17, int: 12, wis: 11, cha: 15,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '1d10+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 9 (1d10 + 4) piercing damage.' },
    ],
  },
  {
    id: 'skeleton', name: 'Skeleton',
    type: 'undead', size: 'Medium',
    cr: 0.25, xp: 50, ac: 13, hp: 13, hitDice: '2d8', speed: 30,
    str: 10, dex: 14, con: 15, int: 6, wis: 8, cha: 5,
    attacks: [
      { name: 'Shortsword', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Shortbow', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 80/320 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
    ],
  },
  {
    id: 'solar', name: 'Solar',
    type: 'celestial', size: 'Large',
    cr: 21, xp: 33000, ac: 21, hp: 243, hitDice: '18d10', speed: 50,
    str: 26, dex: 22, con: 26, int: 25, wis: 25, cha: 30,
    attacks: [
      { name: 'Greatsword', toHit: 15, damage: '4d6+8', damageType: 'Radiant', extraDamage: '6d8', extraDamageType: 'Radiant', description: 'Melee Weapon Attack: +15 to hit, reach 5 ft., one target. Hit: 22 (4d6 + 8) slashing damage plus 27 (6d8) radiant damage.' },
      { name: 'Slaying Longbow', toHit: 13, damage: '2d8+6', damageType: 'Piercing', extraDamage: '6d8', extraDamageType: 'Radiant', description: 'Ranged Weapon Attack: +13 to hit, range 150/600 ft., one target. Hit: 15 (2d8 + 6) piercing damage plus 27 (6d8) radiant damage. If the target is a creature that has 190 hit points or fewer, it must succeed on a DC 15 Constitution saving throw or die.' },
    ],
    multiattack: 'The solar makes two greatsword attacks.',
    specialAbilities: ['Angelic Weapons', 'Divine Awareness', 'Innate Spellcasting', 'Magic Resistance']
  },
  {
    id: 'specter', name: 'Specter',
    type: 'undead', size: 'Medium',
    cr: 1, xp: 200, ac: 12, hp: 22, hitDice: '5d8', speed: 0,
    str: 1, dex: 14, con: 11, int: 10, wis: 10, cha: 11,
    attacks: [
      { name: 'Life Drain', toHit: 4, damage: '3d6', damageType: 'Necrotic', description: 'Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 10 (3d6) necrotic damage. The target must succeed on a DC 10 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the creature finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.' },
    ],
    specialAbilities: ['Incorporeal Movement', 'Sunlight Sensitivity']
  },
  {
    id: 'spider', name: 'Spider',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 12, hp: 1, hitDice: '1d4', speed: 20,
    str: 2, dex: 14, con: 8, int: 1, wis: 10, cha: 2,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 1 piercing damage, and the target must succeed on a DC 9 Constitution saving throw or take 2 (1d4) poison damage.' },
    ],
    specialAbilities: ['Spider Climb', 'Web Sense', 'Web Walker']
  },
  {
    id: 'spirit-naga', name: 'Spirit Naga',
    type: 'monstrosity', size: 'Large',
    cr: 8, xp: 3900, ac: 15, hp: 75, hitDice: '10d10', speed: 40,
    str: 18, dex: 17, con: 14, int: 16, wis: 15, cha: 16,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '1d6+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 7 (1d6 + 4) piercing damage, and the target must make a DC 13 Constitution saving throw, taking 31 (7d8) poison damage on a failed save, or half as much damage on a successful one.' },
    ],
    specialAbilities: ['Rejuvenation', 'Spellcasting']
  },
  {
    id: 'sprite', name: 'Sprite',
    type: 'fey', size: 'Tiny',
    cr: 0.25, xp: 50, ac: 15, hp: 2, hitDice: '1d4', speed: 10,
    str: 3, dex: 18, con: 10, int: 14, wis: 13, cha: 11,
    attacks: [
      { name: 'Longsword', toHit: 2, damage: '1', damageType: 'Slashing', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 1 slashing damage.' },
      { name: 'Shortbow', toHit: 6, damage: '1', damageType: 'Piercing', description: 'Ranged Weapon Attack: +6 to hit, range 40/160 ft., one target. Hit: 1 piercing damage, and the target must succeed on a DC 10 Constitution saving throw or become poisoned for 1 minute. If its saving throw result is 5 or lower, the poisoned target falls unconscious for the same duration, or until it takes damage or another creature takes an action to shake it awake.' },
    ],
  },
  {
    id: 'spy', name: 'Spy',
    type: 'humanoid', size: 'Medium',
    cr: 1, xp: 200, ac: 12, hp: 27, hitDice: '6d8', speed: 30,
    str: 10, dex: 15, con: 10, int: 12, wis: 14, cha: 16,
    attacks: [
      { name: 'Shortsword', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Hand Crossbow', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
    ],
    multiattack: 'The spy makes two melee attacks.',
    specialAbilities: ['Cunning Action', 'Sneak Attack (1/Turn)']
  },
  {
    id: 'steam-mephit', name: 'Steam Mephit',
    type: 'elemental', size: 'Small',
    cr: 0.25, xp: 50, ac: 10, hp: 21, hitDice: '6d6', speed: 30,
    str: 5, dex: 11, con: 10, int: 11, wis: 10, cha: 12,
    attacks: [
      { name: 'Claws', toHit: 2, damage: '1d4', damageType: 'Slashing', extraDamage: '1d4', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one creature. Hit: 2 (1d4) slashing damage plus 2 (1d4) fire damage.' },
    ],
    specialAbilities: ['Death Burst', 'Innate Spellcasting']
  },
  {
    id: 'stirge', name: 'Stirge',
    type: 'beast', size: 'Tiny',
    cr: 0.125, xp: 25, ac: 14, hp: 2, hitDice: '1d4', speed: 10,
    str: 4, dex: 16, con: 11, int: 2, wis: 8, cha: 6,
    attacks: [
      { name: 'Blood Drain', toHit: 5, damage: '1d4+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 5 (1d4 + 3) piercing damage, and the stirge attaches to the target. While attached, the stirge doesn\'t attack. Instead, at the start of each of the stirge\'s turns, the target loses 5 (1d4 + 3) hit points due to blood loss.\nThe stirge can detach itself by spending 5 feet of its movement. It does so after it drains 10 hit points of blood from the target or the target dies. A creature, including the target, can use its action to detach the stirge.' },
    ],
  },
  {
    id: 'stone-giant', name: 'Stone Giant',
    type: 'giant', size: 'Huge',
    cr: 7, xp: 2900, ac: 17, hp: 126, hitDice: '11d12', speed: 40,
    str: 23, dex: 15, con: 20, int: 10, wis: 12, cha: 9,
    attacks: [
      { name: 'Greatclub', toHit: 9, damage: '3d8+6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +9 to hit, reach 15 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage.' },
      { name: 'Rock', toHit: 9, damage: '4d10+6', damageType: 'Bludgeoning', description: 'Ranged Weapon Attack: +9 to hit, range 60/240 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage. If the target is a creature, it must succeed on a DC 17 Strength saving throw or be knocked prone.' },
    ],
    multiattack: 'The giant makes two greatclub attacks.',
    specialAbilities: ['Stone Camouflage']
  },
  {
    id: 'stone-golem', name: 'Stone Golem',
    type: 'construct', size: 'Large',
    cr: 10, xp: 5900, ac: 17, hp: 178, hitDice: '17d10', speed: 30,
    str: 22, dex: 9, con: 20, int: 3, wis: 11, cha: 1,
    attacks: [
      { name: 'Slam', toHit: 10, damage: '3d8+6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 19 (3d8 + 6) bludgeoning damage.' },
    ],
    multiattack: 'The golem makes two slam attacks.',
    specialAbilities: ['Immutable Form', 'Magic Resistance', 'Magic Weapons']
  },
  {
    id: 'storm-giant', name: 'Storm Giant',
    type: 'giant', size: 'Huge',
    cr: 13, xp: 10000, ac: 16, hp: 230, hitDice: '20d12', speed: 50,
    str: 29, dex: 14, con: 20, int: 16, wis: 18, cha: 18,
    attacks: [
      { name: 'Greatsword', toHit: 14, damage: '6d6+9', damageType: 'Slashing', description: 'Melee Weapon Attack: +14 to hit, reach 10 ft., one target. Hit: 30 (6d6 + 9) slashing damage.' },
      { name: 'Rock', toHit: 14, damage: '4d12+9', damageType: 'Bludgeoning', description: 'Ranged Weapon Attack: +14 to hit, range 60/240 ft., one target. Hit: 35 (4d12 + 9) bludgeoning damage.' },
    ],
    multiattack: 'The giant makes two greatsword attacks.',
    specialAbilities: ['Amphibious', 'Innate Spellcasting']
  },
  {
    id: 'succubus-incubus', name: 'Succubus/Incubus',
    type: 'fiend', size: 'Medium',
    cr: 4, xp: 1100, ac: 15, hp: 66, hitDice: '12d8', speed: 30,
    str: 8, dex: 17, con: 13, int: 15, wis: 12, cha: 20,
    attacks: [
      { name: 'Claw (Fiend Form Only)', toHit: 5, damage: '1d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.' },
    ],
    specialAbilities: ['Telepathic Bond', 'Shapechanger']
  },
  {
    id: 'swarm-of-bats', name: 'Swarm of Bats',
    type: 'swarm of Tiny beasts', size: 'Medium',
    cr: 0.25, xp: 50, ac: 12, hp: 22, hitDice: '5d8', speed: 0,
    str: 5, dex: 15, con: 10, int: 2, wis: 12, cha: 4,
    attacks: [
      { name: 'Bites', toHit: 4, damage: '2d4', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 0 ft., one creature in the swarm\'s space. Hit: 5 (2d4) piercing damage, or 2 (1d4) piercing damage if the swarm has half of its hit points or fewer.' },
    ],
    specialAbilities: ['Echolocation', 'Keen Hearing', 'Swarm']
  },
  {
    id: 'swarm-of-beetles', name: 'Swarm of Beetles',
    type: 'swarm of Tiny beasts', size: 'Medium',
    cr: 0.5, xp: 100, ac: 12, hp: 22, hitDice: '5d8', speed: 20,
    str: 3, dex: 13, con: 10, int: 1, wis: 7, cha: 1,
    attacks: [
      { name: 'Bites', toHit: 3, damage: '4d4', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm\'s space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer.' },
    ],
    specialAbilities: ['Swarm']
  },
  {
    id: 'swarm-of-centipedes', name: 'Swarm of Centipedes',
    type: 'swarm of Tiny beasts', size: 'Medium',
    cr: 0.5, xp: 100, ac: 12, hp: 22, hitDice: '5d8', speed: 20,
    str: 3, dex: 13, con: 10, int: 1, wis: 7, cha: 1,
    attacks: [
      { name: 'Bites', toHit: 3, damage: '4d4', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm\'s space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer.\nA creature reduced to 0 hit points by a swarm of centipedes is stable but poisoned for 1 hour, even after regaining hit points, and paralyzed while poisoned in this way.' },
    ],
    specialAbilities: ['Swarm']
  },
  {
    id: 'swarm-of-insects', name: 'Swarm of Insects',
    type: 'swarm of Tiny beasts', size: 'Medium',
    cr: 0.5, xp: 100, ac: 12, hp: 22, hitDice: '5d8', speed: 20,
    str: 3, dex: 13, con: 10, int: 1, wis: 7, cha: 1,
    attacks: [
      { name: 'Bites', toHit: 3, damage: '4d4', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm\'s space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer.' },
    ],
    specialAbilities: ['Swarm']
  },
  {
    id: 'swarm-of-poisonous-snakes', name: 'Swarm of Poisonous Snakes',
    type: 'swarm of Tiny beasts', size: 'Medium',
    cr: 2, xp: 450, ac: 14, hp: 36, hitDice: '8d8', speed: 30,
    str: 8, dex: 18, con: 11, int: 1, wis: 10, cha: 3,
    attacks: [
      { name: 'Bites', toHit: 6, damage: '2d6', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 0 ft., one creature in the swarm\'s space. Hit: 7 (2d6) piercing damage, or 3 (1d6) piercing damage if the swarm has half of its hit points or fewer. The target must make a DC 10 Constitution saving throw, taking 14 (4d6) poison damage on a failed save, or half as much damage on a successful one.' },
    ],
    specialAbilities: ['Swarm']
  },
  {
    id: 'swarm-of-quippers', name: 'Swarm of Quippers',
    type: 'swarm of Tiny beasts', size: 'Medium',
    cr: 1, xp: 200, ac: 13, hp: 28, hitDice: '8d8', speed: 0,
    str: 13, dex: 16, con: 9, int: 1, wis: 7, cha: 2,
    attacks: [
      { name: 'Bites', toHit: 5, damage: '4d6', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 0 ft., one creature in the swarm\'s space. Hit: 14 (4d6) piercing damage, or 7 (2d6) piercing damage if the swarm has half of its hit points or fewer.' },
    ],
    specialAbilities: ['Blood Frenzy', 'Swarm', 'Water Breathing']
  },
  {
    id: 'swarm-of-rats', name: 'Swarm of Rats',
    type: 'swarm of Tiny beasts', size: 'Medium',
    cr: 0.25, xp: 50, ac: 10, hp: 24, hitDice: '7d8', speed: 30,
    str: 9, dex: 11, con: 9, int: 2, wis: 10, cha: 3,
    attacks: [
      { name: 'Bites', toHit: 2, damage: '2d6', damageType: 'Piercing', description: 'Melee Weapon Attack: +2 to hit, reach 0 ft., one target in the swarm\'s space. Hit: 7 (2d6) piercing damage, or 3 (1d6) piercing damage if the swarm has half of its hit points or fewer.' },
    ],
    specialAbilities: ['Keen Smell', 'Swarm']
  },
  {
    id: 'swarm-of-ravens', name: 'Swarm of Ravens',
    type: 'swarm of Tiny beasts', size: 'Medium',
    cr: 0.25, xp: 50, ac: 12, hp: 24, hitDice: '7d8', speed: 10,
    str: 6, dex: 14, con: 8, int: 3, wis: 12, cha: 6,
    attacks: [
      { name: 'Beaks', toHit: 4, damage: '2d6', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target in the swarm\'s space. Hit: 7 (2d6) piercing damage, or 3 (1d6) piercing damage if the swarm has half of its hit points or fewer.' },
    ],
    specialAbilities: ['Swarm']
  },
  {
    id: 'swarm-of-spiders', name: 'Swarm of Spiders',
    type: 'swarm of Tiny beasts', size: 'Medium',
    cr: 0.5, xp: 100, ac: 12, hp: 22, hitDice: '5d8', speed: 20,
    str: 3, dex: 13, con: 10, int: 1, wis: 7, cha: 1,
    attacks: [
      { name: 'Bites', toHit: 3, damage: '4d4', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm\'s space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer.' },
    ],
    specialAbilities: ['Swarm', 'Spider Climb', 'Web Sense', 'Web Walker']
  },
  {
    id: 'swarm-of-wasps', name: 'Swarm of Wasps',
    type: 'swarm of Tiny beasts', size: 'Medium',
    cr: 0.5, xp: 100, ac: 12, hp: 22, hitDice: '5d8', speed: 5,
    str: 3, dex: 13, con: 10, int: 1, wis: 7, cha: 1,
    attacks: [
      { name: 'Bites', toHit: 3, damage: '4d4', damageType: 'Piercing', description: 'Melee Weapon Attack: +3 to hit, reach 0 ft., one target in the swarm\'s space. Hit: 10 (4d4) piercing damage, or 5 (2d4) piercing damage if the swarm has half of its hit points or fewer.' },
    ],
    specialAbilities: ['Swarm']
  },
  {
    id: 'tarrasque', name: 'Tarrasque',
    type: 'monstrosity', size: 'Gargantuan',
    cr: 30, xp: 155000, ac: 25, hp: 676, hitDice: '33d20', speed: 40,
    str: 30, dex: 11, con: 30, int: 3, wis: 11, cha: 11,
    attacks: [
      { name: 'Bite', toHit: 19, damage: '4d12+10', damageType: 'Piercing', description: 'Melee Weapon Attack: +19 to hit, reach 10 ft., one target. Hit: 36 (4d12 + 10) piercing damage. If the target is a creature, it is grappled (escape DC 20). Until this grapple ends, the target is restrained, and the tarrasque can\'t bite another target.' },
      { name: 'Claw', toHit: 19, damage: '4d8+10', damageType: 'Slashing', description: 'Melee Weapon Attack: +19 to hit, reach 15 ft., one target. Hit: 28 (4d8 + 10) slashing damage.' },
      { name: 'Horns', toHit: 19, damage: '4d10+10', damageType: 'Piercing', description: 'Melee Weapon Attack: +19 to hit, reach 10 ft., one target. Hit: 32 (4d10 + 10) piercing damage.' },
      { name: 'Tail', toHit: 19, damage: '4d6+10', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +19 to hit, reach 20 ft., one target. Hit: 24 (4d6 + 10) bludgeoning damage. If the target is a creature, it must succeed on a DC 20 Strength saving throw or be knocked prone.' },
    ],
    multiattack: 'The tarrasque can use its Frightful Presence. It then makes five attacks: one with its bite, two with its claws, one with its horns, and one with its tail. It can use its Swallow instead of its bite.',
    specialAbilities: ['Legendary Resistance', 'Magic Resistance', 'Reflective Carapace', 'Siege Monster']
  },
  {
    id: 'thug', name: 'Thug',
    type: 'humanoid', size: 'Medium',
    cr: 0.5, xp: 100, ac: 11, hp: 32, hitDice: '5d8', speed: 30,
    str: 15, dex: 11, con: 14, int: 10, wis: 10, cha: 11,
    attacks: [
      { name: 'Mace', toHit: 4, damage: '1d6+2', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) bludgeoning damage.' },
      { name: 'Heavy Crossbow', toHit: 2, damage: '1d10', damageType: 'Piercing', description: 'Ranged Weapon Attack: +2 to hit, range 100/400 ft., one target. Hit: 5 (1d10) piercing damage.' },
    ],
    multiattack: 'The thug makes two melee attacks.',
    specialAbilities: ['Pack Tactics']
  },
  {
    id: 'tiger', name: 'Tiger',
    type: 'beast', size: 'Large',
    cr: 1, xp: 200, ac: 12, hp: 37, hitDice: '5d10', speed: 40,
    str: 17, dex: 15, con: 14, int: 3, wis: 12, cha: 8,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d10+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage.' },
      { name: 'Claw', toHit: 5, damage: '1d8+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage.' },
    ],
    specialAbilities: ['Keen Smell', 'Pounce']
  },
  {
    id: 'treant', name: 'Treant',
    type: 'plant', size: 'Huge',
    cr: 9, xp: 5000, ac: 16, hp: 138, hitDice: '12d12', speed: 30,
    str: 23, dex: 8, con: 21, int: 12, wis: 16, cha: 12,
    attacks: [
      { name: 'Slam', toHit: 10, damage: '3d6+6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 16 (3d6 + 6) bludgeoning damage.' },
      { name: 'Rock', toHit: 10, damage: '4d10+6', damageType: 'Bludgeoning', description: 'Ranged Weapon Attack: +10 to hit, range 60/180 ft., one target. Hit: 28 (4d10 + 6) bludgeoning damage.' },
    ],
    multiattack: 'The treant makes two slam attacks.',
    specialAbilities: ['False Appearance', 'Siege Monster']
  },
  {
    id: 'tribal-warrior', name: 'Tribal Warrior',
    type: 'humanoid', size: 'Medium',
    cr: 0.125, xp: 25, ac: 12, hp: 11, hitDice: '2d8', speed: 30,
    str: 13, dex: 11, con: 12, int: 8, wis: 11, cha: 8,
    attacks: [
      { name: 'Spear', toHit: 3, damage: '1d4', damageType: 'bludgeoning', description: 'Melee or Ranged Weapon Attack: +3 to hit, reach 5 ft. or range 20/60 ft., one target. Hit: 4 (1d6 + 1) piercing damage, or 5 (1d8 + 1) piercing damage if used with two hands to make a melee attack.' },
    ],
    specialAbilities: ['Pack Tactics']
  },
  {
    id: 'triceratops', name: 'Triceratops',
    type: 'beast', size: 'Huge',
    cr: 5, xp: 1800, ac: 13, hp: 95, hitDice: '10d12', speed: 50,
    str: 22, dex: 9, con: 17, int: 2, wis: 11, cha: 5,
    attacks: [
      { name: 'Gore', toHit: 9, damage: '4d8+6', damageType: 'Piercing', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 24 (4d8 + 6) piercing damage.' },
      { name: 'Stomp', toHit: 9, damage: '3d10+6', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one prone creature. Hit: 22 (3d10 + 6) bludgeoning damage' },
    ],
    specialAbilities: ['Trampling Charge']
  },
  {
    id: 'troll', name: 'Troll',
    type: 'giant', size: 'Large',
    cr: 5, xp: 1800, ac: 15, hp: 84, hitDice: '8d10', speed: 30,
    str: 18, dex: 13, con: 20, int: 7, wis: 9, cha: 7,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '1d6+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 7 (1d6 + 4) piercing damage.' },
      { name: 'Claw', toHit: 7, damage: '2d6+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.' },
    ],
    multiattack: 'The troll makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Keen Smell', 'Regeneration']
  },
  {
    id: 'tyrannosaurus-rex', name: 'Tyrannosaurus Rex',
    type: 'beast', size: 'Huge',
    cr: 8, xp: 3900, ac: 13, hp: 136, hitDice: '13d12', speed: 50,
    str: 25, dex: 10, con: 19, int: 2, wis: 12, cha: 9,
    attacks: [
      { name: 'Bite', toHit: 10, damage: '4d12+7', damageType: 'Piercing', description: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 33 (4d12 + 7) piercing damage. If the target is a Medium or smaller creature, it is grappled (escape DC 17). Until this grapple ends, the target is restrained, and the tyrannosaurus can\'t bite another target.' },
      { name: 'Tail', toHit: 10, damage: '3d8+7', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 20 (3d8 + 7) bludgeoning damage.' },
    ],
    multiattack: 'The tyrannosaurus makes two attacks: one with its bite and one with its tail. It can\'t make both attacks against the same target.'
  },
  {
    id: 'unicorn', name: 'Unicorn',
    type: 'celestial', size: 'Large',
    cr: 5, xp: 1800, ac: 12, hp: 67, hitDice: '9d10', speed: 50,
    str: 18, dex: 14, con: 15, int: 11, wis: 17, cha: 16,
    attacks: [
      { name: 'Hooves', toHit: 7, damage: '2d6+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.' },
      { name: 'Horn', toHit: 7, damage: '1d8+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 8 (1d8 + 4) piercing damage.' },
    ],
    multiattack: 'The unicorn makes two attacks: one with its hooves and one with its horn.',
    specialAbilities: ['Charge', 'Innate Spellcasting', 'Magic Resistance', 'Magic Weapons']
  },
  {
    id: 'vampire-bat', name: 'Vampire, Bat Form',
    type: 'undead', size: 'Medium',
    cr: 13, xp: 10000, ac: 16, hp: 144, hitDice: '17d8', speed: 5,
    str: 18, dex: 18, con: 18, int: 17, wis: 15, cha: 18,
    attacks: [
      { name: 'Bite', toHit: 9, damage: '1d6+4', damageType: 'Piercing', extraDamage: '3d6', extraDamageType: 'Necrotic', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. Hit: 7 (1d6 + 4) piercing damage plus 10 (3d6) necrotic damage. The target\'s hit point maximum is reduced by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0. A humanoid slain in this way and then buried in the ground rises the following night as a vampire spawn under the vampire\'s control.' },
    ],
    specialAbilities: ['Shapechanger', 'Legendary Resistance', 'Misty Escape', 'Regeneration', 'Spider Climb', 'Vampire Weaknesses']
  },
  {
    id: 'vampire-mist', name: 'Vampire, Mist Form',
    type: 'undead', size: 'Medium',
    cr: 13, xp: 10000, ac: 16, hp: 144, hitDice: '17d8', speed: 30,
    str: 18, dex: 18, con: 18, int: 17, wis: 15, cha: 18,
    attacks: [],
    specialAbilities: ['Shapechanger', 'Legendary Resistance', 'Misty Escape', 'Regeneration', 'Spider Climb', 'Vampire Weaknesses']
  },
  {
    id: 'vampire-spawn', name: 'Vampire Spawn',
    type: 'undead', size: 'Medium',
    cr: 5, xp: 1800, ac: 15, hp: 82, hitDice: '11d8', speed: 30,
    str: 16, dex: 16, con: 16, int: 11, wis: 10, cha: 12,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '1d6+3', damageType: 'Piercing', extraDamage: '2d6', extraDamageType: 'Necrotic', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. Hit: 6 (1d6 + 3) piercing damage plus 7 (2d6) necrotic damage. The target\'s hit point maximum is reduced by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.' },
      { name: 'Claws', toHit: 6, damage: '2d4+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 8 (2d4 + 3) slashing damage. Instead of dealing damage, the vampire can grapple the target (escape DC 13).' },
    ],
    multiattack: 'The vampire makes two attacks, only one of which can be a bite attack.',
    specialAbilities: ['Regeneration', 'Spider Climb', 'Vampire Weaknesses']
  },
  {
    id: 'vampire-vampire', name: 'Vampire, Vampire Form',
    type: 'undead', size: 'Medium',
    cr: 13, xp: 10000, ac: 16, hp: 144, hitDice: '17d8', speed: 30,
    str: 18, dex: 18, con: 18, int: 17, wis: 15, cha: 18,
    attacks: [
      { name: 'Unarmed Strike', toHit: 9, damage: '1d8+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one creature. Hit: 8 (1d8 + 4) bludgeoning damage. Instead of dealing damage, the vampire can grapple the target (escape DC 18).' },
      { name: 'Bite', toHit: 9, damage: '1d6+4', damageType: 'Piercing', extraDamage: '3d6', extraDamageType: 'Necrotic', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one willing creature, or a creature that is grappled by the vampire, incapacitated, or restrained. Hit: 7 (1d6 + 4) piercing damage plus 10 (3d6) necrotic damage. The target\'s hit point maximum is reduced by an amount equal to the necrotic damage taken, and the vampire regains hit points equal to that amount. The reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0. A humanoid slain in this way and then buried in the ground rises the following night as a vampire spawn under the vampire\'s control.' },
    ],
    multiattack: 'The vampire makes two attacks, only one of which can be a bite attack.',
    specialAbilities: ['Shapechanger', 'Legendary Resistance', 'Misty Escape', 'Regeneration', 'Spider Climb', 'Vampire Weaknesses']
  },
  {
    id: 'veteran', name: 'Veteran',
    type: 'humanoid', size: 'Medium',
    cr: 3, xp: 700, ac: 17, hp: 58, hitDice: '9d8', speed: 30,
    str: 16, dex: 13, con: 14, int: 10, wis: 11, cha: 10,
    attacks: [
      { name: 'Longsword', toHit: 5, damage: '1d4', damageType: 'bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage, or 8 (1d10 + 3) slashing damage if used with two hands.' },
      { name: 'Shortsword', toHit: 5, damage: '1d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) piercing damage.' },
      { name: 'Heavy Crossbow', toHit: 3, damage: '1d10+1', damageType: 'Piercing', description: 'Ranged Weapon Attack: +3 to hit, range 100/400 ft., one target. Hit: 6 (1d10 + 1) piercing damage.' },
    ],
    multiattack: 'The veteran makes two longsword attacks. If it has a shortsword drawn, it can also make a shortsword attack.'
  },
  {
    id: 'violet-fungus', name: 'Violet Fungus',
    type: 'plant', size: 'Medium',
    cr: 0.25, xp: 50, ac: 5, hp: 18, hitDice: '4d8', speed: 5,
    str: 3, dex: 1, con: 10, int: 1, wis: 3, cha: 1,
    attacks: [
      { name: 'Rotting Touch', toHit: 2, damage: '1d8', damageType: 'Necrotic', description: 'Melee Weapon Attack: +2 to hit, reach 10 ft., one creature. Hit: 4 (1d8) necrotic damage.' },
    ],
    multiattack: 'The fungus makes 1d4 Rotting Touch attacks.',
    specialAbilities: ['False Appearance']
  },
  {
    id: 'vrock', name: 'Vrock',
    type: 'fiend', size: 'Large',
    cr: 6, xp: 2300, ac: 15, hp: 104, hitDice: '11d10', speed: 40,
    str: 17, dex: 15, con: 18, int: 8, wis: 13, cha: 8,
    attacks: [
      { name: 'Beak', toHit: 6, damage: '2d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage.' },
      { name: 'Talons', toHit: 6, damage: '2d10+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 14 (2d10 + 3) slashing damage.' },
    ],
    multiattack: 'The vrock makes two attacks: one with its beak and one with its talons.',
    specialAbilities: ['Magic Resistance']
  },
  {
    id: 'vulture', name: 'Vulture',
    type: 'beast', size: 'Medium',
    cr: 0, xp: 10, ac: 10, hp: 5, hitDice: '1d8', speed: 10,
    str: 7, dex: 10, con: 13, int: 2, wis: 12, cha: 4,
    attacks: [
      { name: 'Beak', toHit: 2, damage: '1d4', damageType: 'Piercing', description: 'Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) piercing damage.' },
    ],
    specialAbilities: ['Keen Sight and Smell', 'Pack Tactics']
  },
  {
    id: 'warhorse', name: 'Warhorse',
    type: 'beast', size: 'Large',
    cr: 0.5, xp: 100, ac: 11, hp: 19, hitDice: '3d10', speed: 60,
    str: 18, dex: 12, con: 13, int: 2, wis: 12, cha: 7,
    attacks: [
      { name: 'Hooves', toHit: 6, damage: '2d6+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.' },
    ],
    specialAbilities: ['Trampling Charge']
  },
  {
    id: 'warhorse-skeleton', name: 'Warhorse Skeleton',
    type: 'undead', size: 'Large',
    cr: 0.5, xp: 100, ac: 13, hp: 22, hitDice: '3d10', speed: 60,
    str: 18, dex: 12, con: 15, int: 2, wis: 8, cha: 5,
    attacks: [
      { name: 'Hooves', toHit: 6, damage: '2d6+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) bludgeoning damage.' },
    ],
  },
  {
    id: 'water-elemental', name: 'Water Elemental',
    type: 'elemental', size: 'Large',
    cr: 5, xp: 1800, ac: 14, hp: 114, hitDice: '12d10', speed: 30,
    str: 18, dex: 14, con: 18, int: 5, wis: 10, cha: 8,
    attacks: [
      { name: 'Slam', toHit: 7, damage: '2d8+4', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) bludgeoning damage.' },
    ],
    multiattack: 'The elemental makes two slam attacks.',
    specialAbilities: ['Water Form', 'Freeze']
  },
  {
    id: 'weasel', name: 'Weasel',
    type: 'beast', size: 'Tiny',
    cr: 0, xp: 10, ac: 13, hp: 1, hitDice: '1d4', speed: 30,
    str: 3, dex: 16, con: 8, int: 2, wis: 12, cha: 3,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one creature. Hit: 1 piercing damage.' },
    ],
    specialAbilities: ['Keen Hearing and Smell']
  },
  {
    id: 'werebear-bear', name: 'Werebear, Bear Form',
    type: 'humanoid', size: 'Medium',
    cr: 5, xp: 1800, ac: 11, hp: 135, hitDice: '18d8', speed: 40,
    str: 19, dex: 10, con: 17, int: 11, wis: 12, cha: 12,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '2d10+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage. If the target is a humanoid, it must succeed on a DC 14 Constitution saving throw or be cursed with werebear lycanthropy.' },
      { name: 'Claw', toHit: 7, damage: '2d8+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.' },
    ],
    multiattack: 'In bear form, the werebear makes two claw attacks. In humanoid form, it makes two greataxe attacks. In hybrid form, it can attack like a bear or a humanoid.',
    specialAbilities: ['Shapechanger', 'Keen Smell']
  },
  {
    id: 'werebear-human', name: 'Werebear, Human Form',
    type: 'humanoid', size: 'Medium',
    cr: 5, xp: 1800, ac: 10, hp: 135, hitDice: '18d8', speed: 30,
    str: 19, dex: 10, con: 17, int: 11, wis: 12, cha: 12,
    attacks: [
      { name: 'Greataxe', toHit: 7, damage: '1d12+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (1d12 + 4) slashing damage.' },
    ],
    multiattack: 'In bear form, the werebear makes two claw attacks. In humanoid form, it makes two greataxe attacks. In hybrid form, it can attack like a bear or a humanoid.',
    specialAbilities: ['Shapechanger', 'Keen Smell']
  },
  {
    id: 'werebear-hybrid', name: 'Werebear, Hybrid Form',
    type: 'humanoid', size: 'Medium',
    cr: 5, xp: 1800, ac: 11, hp: 135, hitDice: '18d8', speed: 40,
    str: 19, dex: 10, con: 17, int: 11, wis: 12, cha: 12,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '2d10+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 15 (2d10 + 4) piercing damage. If the target is a humanoid, it must succeed on a DC 14 Constitution saving throw or be cursed with werebear lycanthropy.' },
      { name: 'Claw', toHit: 7, damage: '2d8+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.' },
      { name: 'Greataxe', toHit: 7, damage: '1d12+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 10 (1d12 + 4) slashing damage.' },
    ],
    multiattack: 'In bear form, the werebear makes two claw attacks. In humanoid form, it makes two greataxe attacks. In hybrid form, it can attack like a bear or a humanoid.',
    specialAbilities: ['Shapechanger', 'Keen Smell']
  },
  {
    id: 'wereboar-boar', name: 'Wereboar, Boar Form',
    type: 'humanoid', size: 'Medium',
    cr: 4, xp: 1100, ac: 11, hp: 78, hitDice: '12d8', speed: 40,
    str: 17, dex: 10, con: 15, int: 10, wis: 11, cha: 8,
    attacks: [
      { name: 'Tusks', toHit: 5, damage: '2d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If the target is a humanoid, it must succeed on a DC 12 Constitution saving throw or be cursed with wereboar lycanthropy.' },
    ],
    specialAbilities: ['Shapechanger', 'Charge (Boar or Hybrid Form Only)', 'Relentless']
  },
  {
    id: 'wereboar-human', name: 'Wereboar, Human Form',
    type: 'humanoid', size: 'Medium',
    cr: 4, xp: 1100, ac: 10, hp: 78, hitDice: '12d8', speed: 30,
    str: 17, dex: 10, con: 15, int: 10, wis: 11, cha: 8,
    attacks: [
      { name: 'Maul', toHit: 5, damage: '2d6+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage.' },
    ],
    multiattack: 'The wereboar makes two attacks, only one of which can be with its tusks.',
    specialAbilities: ['Shapechanger', 'Relentless']
  },
  {
    id: 'wereboar-hybrid', name: 'Wereboar, Hybrid Form',
    type: 'humanoid', size: 'Medium',
    cr: 4, xp: 1100, ac: 11, hp: 78, hitDice: '12d8', speed: 30,
    str: 17, dex: 10, con: 15, int: 10, wis: 11, cha: 8,
    attacks: [
      { name: 'Maul', toHit: 5, damage: '2d6+3', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) bludgeoning damage.' },
      { name: 'Tusks', toHit: 5, damage: '2d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) slashing damage. If the target is a humanoid, it must succeed on a DC 12 Constitution saving throw or be cursed with wereboar lycanthropy.' },
    ],
    multiattack: 'The wereboar makes two attacks, only one of which can be with its tusks.',
    specialAbilities: ['Shapechanger', 'Charge (Boar or Hybrid Form Only)', 'Relentless']
  },
  {
    id: 'wererat-human', name: 'Wererat, Human Form',
    type: 'humanoid', size: 'Medium',
    cr: 2, xp: 450, ac: 12, hp: 33, hitDice: '6d8', speed: 30,
    str: 10, dex: 15, con: 12, int: 11, wis: 10, cha: 8,
    attacks: [
      { name: 'Shortsword', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Hand Crossbow', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
    ],
    multiattack: 'The wererat makes two attacks, only one of which can be a bite.',
    specialAbilities: ['Shapechanger', 'Keen Smell']
  },
  {
    id: 'wererat-hybrid', name: 'Wererat, Hybrid Form',
    type: 'humanoid', size: 'Medium',
    cr: 2, xp: 450, ac: 12, hp: 33, hitDice: '6d8', speed: 30,
    str: 10, dex: 15, con: 12, int: 11, wis: 10, cha: 8,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage. If the target is a humanoid, it must succeed on a DC 11 Constitution saving throw or be cursed with wererat lycanthropy.' },
      { name: 'Shortsword', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
      { name: 'Hand Crossbow', toHit: 4, damage: '1d6+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 30/120 ft., one target. Hit: 5 (1d6 + 2) piercing damage.' },
    ],
    multiattack: 'The wererat makes two attacks, only one of which can be a bite.',
    specialAbilities: ['Shapechanger', 'Keen Smell']
  },
  {
    id: 'wererat-rat', name: 'Wererat, Rat Form',
    type: 'humanoid', size: 'Medium',
    cr: 2, xp: 450, ac: 12, hp: 33, hitDice: '6d8', speed: 30,
    str: 10, dex: 15, con: 12, int: 11, wis: 10, cha: 8,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 4 (1d4 + 2) piercing damage. If the target is a humanoid, it must succeed on a DC 11 Constitution saving throw or be cursed with wererat lycanthropy.' },
    ],
    specialAbilities: ['Shapechanger', 'Keen Smell']
  },
  {
    id: 'weretiger-human', name: 'Weretiger, Human Form',
    type: 'humanoid', size: 'Medium',
    cr: 4, xp: 1100, ac: 12, hp: 120, hitDice: '16d8', speed: 30,
    str: 17, dex: 15, con: 16, int: 10, wis: 13, cha: 11,
    attacks: [
      { name: 'Scimitar', toHit: 5, damage: '1d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.' },
      { name: 'Longbow', toHit: 4, damage: '1d8+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.' },
    ],
    multiattack: 'In humanoid form, the weretiger makes two scimitar attacks or two longbow attacks. In hybrid form, it can attack like a humanoid or make two claw attacks.',
    specialAbilities: ['Shapechanger', 'Keen Hearing and Smell']
  },
  {
    id: 'weretiger-hybrid', name: 'Weretiger, Hybrid Form',
    type: 'humanoid', size: 'Medium',
    cr: 4, xp: 1100, ac: 12, hp: 120, hitDice: '16d8', speed: 30,
    str: 17, dex: 15, con: 16, int: 10, wis: 13, cha: 11,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d10+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage. If the target is a humanoid, it must succeed on a DC 13 Constitution saving throw or be cursed with weretiger lycanthropy.' },
      { name: 'Claw', toHit: 5, damage: '1d8+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage.' },
      { name: 'Scimitar', toHit: 5, damage: '1d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.' },
      { name: 'Longbow', toHit: 4, damage: '1d8+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.' },
    ],
    multiattack: 'In humanoid form, the weretiger makes two scimitar attacks or two longbow attacks. In hybrid form, it can attack like a humanoid or make two claw attacks.',
    specialAbilities: ['Shapechanger', 'Keen Hearing and Smell', 'Pounce']
  },
  {
    id: 'weretiger-tiger', name: 'Weretiger, Tiger Form',
    type: 'humanoid', size: 'Medium',
    cr: 4, xp: 1100, ac: 12, hp: 120, hitDice: '16d8', speed: 40,
    str: 17, dex: 15, con: 16, int: 10, wis: 13, cha: 11,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '1d10+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 8 (1d10 + 3) piercing damage. If the target is a humanoid, it must succeed on a DC 13 Constitution saving throw or be cursed with weretiger lycanthropy.' },
      { name: 'Claw', toHit: 5, damage: '1d8+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) slashing damage.' },
    ],
    specialAbilities: ['Shapechanger', 'Keen Hearing and Smell', 'Pounce']
  },
  {
    id: 'werewolf-human', name: 'Werewolf, Human Form',
    type: 'humanoid', size: 'Medium',
    cr: 3, xp: 700, ac: 11, hp: 58, hitDice: '9d8', speed: 30,
    str: 15, dex: 13, con: 14, int: 10, wis: 11, cha: 10,
    attacks: [
      { name: 'Spear', toHit: 4, damage: '1d4', damageType: 'bludgeoning', description: 'Melee or Ranged Weapon Attack: +4 to hit, reach 5 ft. or range 20/60 ft., one creature. Hit: 5 (1d6 + 2) piercing damage, or 6 (1d8 + 2) piercing damage if used with two hands to make a melee attack.' },
    ],
    multiattack: 'The werewolf makes two attacks: two with its spear (humanoid form) or one with its bite and one with its claws (hybrid form).',
    specialAbilities: ['Shapechanger', 'Keen Hearing and Smell']
  },
  {
    id: 'werewolf-hybrid', name: 'Werewolf, Hybrid Form',
    type: 'humanoid', size: 'Medium',
    cr: 3, xp: 700, ac: 12, hp: 58, hitDice: '9d8', speed: 30,
    str: 15, dex: 13, con: 14, int: 10, wis: 11, cha: 10,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d8+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage. If the target is a humanoid, it must succeed on a DC 12 Constitution saving throw or be cursed with werewolf lycanthropy.' },
      { name: 'Claws', toHit: 4, damage: '2d4+2', damageType: 'Slashing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (2d4 + 2) slashing damage.' },
    ],
    multiattack: 'The werewolf makes two attacks: two with its spear (humanoid form) or one with its bite and one with its claws (hybrid form).',
    specialAbilities: ['Shapechanger', 'Keen Hearing and Smell']
  },
  {
    id: 'werewolf-wolf', name: 'Werewolf, Wolf Form',
    type: 'humanoid', size: 'Medium',
    cr: 3, xp: 700, ac: 12, hp: 58, hitDice: '9d8', speed: 40,
    str: 15, dex: 13, con: 14, int: 10, wis: 11, cha: 10,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d8+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) piercing damage. If the target is a humanoid, it must succeed on a DC 12 Constitution saving throw or be cursed with werewolf lycanthropy.' },
    ],
    specialAbilities: ['Shapechanger', 'Keen Hearing and Smell']
  },
  {
    id: 'white-dragon-wyrmling', name: 'White Dragon Wyrmling',
    type: 'dragon', size: 'Medium',
    cr: 2, xp: 450, ac: 16, hp: 32, hitDice: '5d8', speed: 30,
    str: 14, dex: 10, con: 14, int: 5, wis: 10, cha: 11,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '1d10+2', damageType: 'Piercing', extraDamage: '1d4', extraDamageType: 'Cold', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (1d10 + 2) piercing damage plus 2 (1d4) cold damage.' },
    ],
  },
  {
    id: 'wight', name: 'Wight',
    type: 'undead', size: 'Medium',
    cr: 3, xp: 700, ac: 14, hp: 45, hitDice: '6d8', speed: 30,
    str: 15, dex: 14, con: 16, int: 10, wis: 13, cha: 15,
    attacks: [
      { name: 'Life Drain', toHit: 4, damage: '1d6+2', damageType: 'Necrotic', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 5 (1d6 + 2) necrotic damage. The target must succeed on a DC 13 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.\nA humanoid slain by this attack rises 24 hours later as a zombie under the wight\'s control, unless the humanoid is restored to life or its body is destroyed. The wight can have no more than twelve zombies under its control at one time.' },
      { name: 'Longsword', toHit: 4, damage: '1d4', damageType: 'bludgeoning', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 6 (1d8 + 2) slashing damage, or 7 (1d10 + 2) slashing damage if used with two hands.' },
      { name: 'Longbow', toHit: 4, damage: '1d8+2', damageType: 'Piercing', description: 'Ranged Weapon Attack: +4 to hit, range 150/600 ft., one target. Hit: 6 (1d8 + 2) piercing damage.' },
    ],
    multiattack: 'The wight makes two longsword attacks or two longbow attacks. It can use its Life Drain in place of one longsword attack.',
    specialAbilities: ['Sunlight Sensitivity']
  },
  {
    id: 'will-o-wisp', name: 'Will-o\'-Wisp',
    type: 'undead', size: 'Tiny',
    cr: 2, xp: 450, ac: 19, hp: 22, hitDice: '9d4', speed: 0,
    str: 1, dex: 28, con: 10, int: 13, wis: 14, cha: 11,
    attacks: [
      { name: 'Shock', toHit: 4, damage: '2d8', damageType: 'Lightning', description: 'Melee Spell Attack: +4 to hit, reach 5 ft., one creature. Hit: 9 (2d8) lightning damage.' },
    ],
    specialAbilities: ['Consume Life', 'Ephemeral', 'Incorporeal Movement', 'Variable Illumination']
  },
  {
    id: 'winter-wolf', name: 'Winter Wolf',
    type: 'monstrosity', size: 'Large',
    cr: 3, xp: 700, ac: 13, hp: 75, hitDice: '10d10', speed: 50,
    str: 18, dex: 13, con: 14, int: 7, wis: 12, cha: 8,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '2d6+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) piercing damage. If the target is a creature, it must succeed on a DC 14 Strength saving throw or be knocked prone.' },
    ],
    specialAbilities: ['Keen Hearing and Smell', 'Pack Tactics', 'Snow Camouflage']
  },
  {
    id: 'wolf', name: 'Wolf',
    type: 'beast', size: 'Medium',
    cr: 0.25, xp: 50, ac: 13, hp: 11, hitDice: '2d8', speed: 40,
    str: 12, dex: 15, con: 12, int: 3, wis: 12, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 4, damage: '2d4+2', damageType: 'Piercing', description: 'Melee Weapon Attack: +4 to hit, reach 5 ft., one target. Hit: 7 (2d4 + 2) piercing damage. If the target is a creature, it must succeed on a DC 11 Strength saving throw or be knocked prone.' },
    ],
    specialAbilities: ['Keen Hearing and Smell', 'Pack Tactics']
  },
  {
    id: 'worg', name: 'Worg',
    type: 'monstrosity', size: 'Large',
    cr: 0.5, xp: 100, ac: 13, hp: 26, hitDice: '4d10', speed: 50,
    str: 16, dex: 13, con: 13, int: 7, wis: 11, cha: 8,
    attacks: [
      { name: 'Bite', toHit: 5, damage: '2d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 10 (2d6 + 3) piercing damage. If the target is a creature, it must succeed on a DC 13 Strength saving throw or be knocked prone.' },
    ],
    specialAbilities: ['Keen Hearing and Smell']
  },
  {
    id: 'wraith', name: 'Wraith',
    type: 'undead', size: 'Medium',
    cr: 5, xp: 1800, ac: 13, hp: 67, hitDice: '9d8', speed: 0,
    str: 6, dex: 16, con: 16, int: 12, wis: 14, cha: 15,
    attacks: [
      { name: 'Life Drain', toHit: 6, damage: '4d8+3', damageType: 'Necrotic', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one creature. Hit: 21 (4d8 + 3) necrotic damage. The target must succeed on a DC 14 Constitution saving throw or its hit point maximum is reduced by an amount equal to the damage taken. This reduction lasts until the target finishes a long rest. The target dies if this effect reduces its hit point maximum to 0.' },
    ],
    specialAbilities: ['Incorporeal Movement', 'Sunlight Sensitivity']
  },
  {
    id: 'wyvern', name: 'Wyvern',
    type: 'dragon', size: 'Large',
    cr: 6, xp: 2300, ac: 13, hp: 110, hitDice: '13d10', speed: 20,
    str: 19, dex: 10, con: 16, int: 5, wis: 12, cha: 6,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '2d6+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage.' },
      { name: 'Claws', toHit: 7, damage: '2d8+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 13 (2d8 + 4) slashing damage.' },
      { name: 'Stinger', toHit: 7, damage: '2d6+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one creature. Hit: 11 (2d6 + 4) piercing damage. The target must make a DC 15 Constitution saving throw, taking 24 (7d6) poison damage on a failed save, or half as much damage on a successful one.' },
    ],
    multiattack: 'The wyvern makes two attacks: one with its bite and one with its stinger. While flying, it can use its claws in place of one other attack.'
  },
  {
    id: 'xorn', name: 'Xorn',
    type: 'elemental', size: 'Medium',
    cr: 5, xp: 1800, ac: 19, hp: 73, hitDice: '7d8', speed: 20,
    str: 17, dex: 10, con: 22, int: 11, wis: 10, cha: 11,
    attacks: [
      { name: 'Bite', toHit: 6, damage: '3d6+3', damageType: 'Piercing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 13 (3d6 + 3) piercing damage.' },
      { name: 'Claw', toHit: 6, damage: '1d6+3', damageType: 'Slashing', description: 'Melee Weapon Attack: +6 to hit, reach 5 ft., one target. Hit: 6 (1d6 + 3) slashing damage.' },
    ],
    multiattack: 'The xorn makes three claw attacks and one bite attack.',
    specialAbilities: ['Earth Glide', 'Stone Camouflage', 'Treasure Sense']
  },
  {
    id: 'young-black-dragon', name: 'Young Black Dragon',
    type: 'dragon', size: 'Large',
    cr: 7, xp: 2900, ac: 18, hp: 127, hitDice: '15d10', speed: 40,
    str: 19, dex: 14, con: 17, int: 12, wis: 11, cha: 15,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '2d10+4', damageType: 'Piercing', extraDamage: '1d8', extraDamageType: 'Acid', description: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 4 (1d8) acid damage.' },
      { name: 'Claw', toHit: 7, damage: '2d6+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.' },
    ],
    multiattack: 'The dragon makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious']
  },
  {
    id: 'young-blue-dragon', name: 'Young Blue Dragon',
    type: 'dragon', size: 'Large',
    cr: 9, xp: 5000, ac: 18, hp: 152, hitDice: '16d10', speed: 40,
    str: 21, dex: 10, con: 19, int: 14, wis: 13, cha: 17,
    attacks: [
      { name: 'Bite', toHit: 9, damage: '2d10+5', damageType: 'Piercing', extraDamage: '1d10', extraDamageType: 'Lightning', description: 'Melee Weapon Attack: +9 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) piercing damage plus 5 (1d10) lightning damage.' },
      { name: 'Claw', toHit: 9, damage: '2d6+5', damageType: 'Slashing', description: 'Melee Weapon Attack: +9 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.' },
    ],
    multiattack: 'The dragon makes three attacks: one with its bite and two with its claws.'
  },
  {
    id: 'young-brass-dragon', name: 'Young Brass Dragon',
    type: 'dragon', size: 'Large',
    cr: 6, xp: 2300, ac: 17, hp: 110, hitDice: '13d10', speed: 40,
    str: 19, dex: 10, con: 17, int: 12, wis: 11, cha: 15,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '2d10+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage.' },
      { name: 'Claw', toHit: 7, damage: '2d6+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.' },
    ],
    multiattack: 'The dragon makes three attacks: one with its bite and two with its claws.'
  },
  {
    id: 'young-bronze-dragon', name: 'Young Bronze Dragon',
    type: 'dragon', size: 'Large',
    cr: 8, xp: 3900, ac: 18, hp: 142, hitDice: '15d10', speed: 40,
    str: 21, dex: 10, con: 19, int: 14, wis: 13, cha: 17,
    attacks: [
      { name: 'Bite', toHit: 8, damage: '2d10+5', damageType: 'Piercing', description: 'Melee Weapon Attack: +8 to hit, reach 10 ft., one target. Hit: 16 (2d10 + 5) piercing damage.' },
      { name: 'Claw', toHit: 8, damage: '2d6+5', damageType: 'Slashing', description: 'Melee Weapon Attack: +8 to hit, reach 5 ft., one target. Hit: 12 (2d6 + 5) slashing damage.' },
    ],
    multiattack: 'The dragon makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious']
  },
  {
    id: 'young-copper-dragon', name: 'Young Copper Dragon',
    type: 'dragon', size: 'Large',
    cr: 7, xp: 2900, ac: 17, hp: 119, hitDice: '14d10', speed: 40,
    str: 19, dex: 12, con: 17, int: 16, wis: 13, cha: 15,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '2d10+4', damageType: 'Piercing', description: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage.' },
      { name: 'Claw', toHit: 7, damage: '2d6+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.' },
    ],
    multiattack: 'The dragon makes three attacks: one with its bite and two with its claws.'
  },
  {
    id: 'young-gold-dragon', name: 'Young Gold Dragon',
    type: 'dragon', size: 'Large',
    cr: 10, xp: 5900, ac: 18, hp: 178, hitDice: '17d10', speed: 40,
    str: 23, dex: 14, con: 21, int: 16, wis: 13, cha: 20,
    attacks: [
      { name: 'Bite', toHit: 10, damage: '2d10+6', damageType: 'Piercing', description: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage.' },
      { name: 'Claw', toHit: 10, damage: '2d6+6', damageType: 'Slashing', description: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.' },
    ],
    multiattack: 'The dragon makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious']
  },
  {
    id: 'young-green-dragon', name: 'Young Green Dragon',
    type: 'dragon', size: 'Large',
    cr: 8, xp: 3900, ac: 18, hp: 136, hitDice: '16d10', speed: 40,
    str: 19, dex: 12, con: 17, int: 16, wis: 13, cha: 15,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '2d10+4', damageType: 'Piercing', extraDamage: '2d6', extraDamageType: 'Poison', description: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 7 (2d6) poison damage.' },
      { name: 'Claw', toHit: 7, damage: '2d6+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.' },
    ],
    multiattack: 'The dragon makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Amphibious']
  },
  {
    id: 'young-red-dragon', name: 'Young Red Dragon',
    type: 'dragon', size: 'Large',
    cr: 10, xp: 5900, ac: 18, hp: 178, hitDice: '17d10', speed: 40,
    str: 23, dex: 10, con: 21, int: 14, wis: 11, cha: 19,
    attacks: [
      { name: 'Bite', toHit: 10, damage: '2d10+6', damageType: 'Piercing', extraDamage: '1d6', extraDamageType: 'Fire', description: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage plus 3 (1d6) fire damage.' },
      { name: 'Claw', toHit: 10, damage: '2d6+6', damageType: 'Slashing', description: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.' },
    ],
    multiattack: 'The dragon makes three attacks: one with its bite and two with its claws.'
  },
  {
    id: 'young-silver-dragon', name: 'Young Silver Dragon',
    type: 'dragon', size: 'Large',
    cr: 9, xp: 5000, ac: 18, hp: 168, hitDice: '16d10', speed: 40,
    str: 23, dex: 10, con: 21, int: 14, wis: 11, cha: 19,
    attacks: [
      { name: 'Bite', toHit: 10, damage: '2d10+6', damageType: 'Piercing', description: 'Melee Weapon Attack: +10 to hit, reach 10 ft., one target. Hit: 17 (2d10 + 6) piercing damage.' },
      { name: 'Claw', toHit: 10, damage: '2d6+6', damageType: 'Slashing', description: 'Melee Weapon Attack: +10 to hit, reach 5 ft., one target. Hit: 13 (2d6 + 6) slashing damage.' },
    ],
    multiattack: 'The dragon makes three attacks: one with its bite and two with its claws.'
  },
  {
    id: 'young-white-dragon', name: 'Young White Dragon',
    type: 'dragon', size: 'Large',
    cr: 6, xp: 2300, ac: 17, hp: 133, hitDice: '14d10', speed: 40,
    str: 18, dex: 10, con: 18, int: 6, wis: 11, cha: 12,
    attacks: [
      { name: 'Bite', toHit: 7, damage: '2d10+4', damageType: 'Piercing', extraDamage: '1d8', extraDamageType: 'Cold', description: 'Melee Weapon Attack: +7 to hit, reach 10 ft., one target. Hit: 15 (2d10 + 4) piercing damage plus 4 (1d8) cold damage.' },
      { name: 'Claw', toHit: 7, damage: '2d6+4', damageType: 'Slashing', description: 'Melee Weapon Attack: +7 to hit, reach 5 ft., one target. Hit: 11 (2d6 + 4) slashing damage.' },
    ],
    multiattack: 'The dragon makes three attacks: one with its bite and two with its claws.',
    specialAbilities: ['Ice Walk']
  },
  {
    id: 'zombie', name: 'Zombie',
    type: 'undead', size: 'Medium',
    cr: 0.25, xp: 50, ac: 8, hp: 22, hitDice: '3d8', speed: 20,
    str: 13, dex: 6, con: 16, int: 3, wis: 6, cha: 5,
    attacks: [
      { name: 'Slam', toHit: 3, damage: '1d6+1', damageType: 'Bludgeoning', description: 'Melee Weapon Attack: +3 to hit, reach 5 ft., one target. Hit: 4 (1d6 + 1) bludgeoning damage.' },
    ],
    specialAbilities: ['Undead Fortitude']
  },
];

// ─── Lookup Helpers ─────────────────────────────────────────────────────────
const _byId = new Map<string, CreatureDefinition>();
const _byName = new Map<string, CreatureDefinition>();
SRD_CREATURES.forEach(c => {
  _byId.set(c.id, c);
  _byName.set(c.name.toLowerCase(), c);
});

/** Find a creature by its exact SRD id (e.g. 'wolf', 'goblin'). */
export function getCreatureById(id: string): CreatureDefinition | undefined {
  return _byId.get(id);
}

/** Find a creature by name (case-insensitive). */
export function getCreatureByName(name: string): CreatureDefinition | undefined {
  return _byName.get(name.toLowerCase());
}

/**
 * Fuzzy-match a creature name. Tries exact match first, then partial match.
 * Useful when the AI uses slightly different names (e.g. "Lobo Terrible" vs "Dire Wolf").
 */
export function findCreature(name: string): CreatureDefinition | undefined {
  const lower = name.toLowerCase().trim();
  
  // 1. Exact match
  const exact = _byName.get(lower);
  if (exact) return exact;
  
  // 2. Partial match (creature name contains or is contained in search)
  for (const [key, creature] of _byName) {
    if (key.includes(lower) || lower.includes(key)) {
      return creature;
    }
  }
  
  return undefined;
}
