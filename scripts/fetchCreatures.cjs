/**
 * fetchCreatures.js
 * Downloads all SRD 5.1 monsters from dnd5eapi.co and generates creatures.ts
 * 
 * Usage: node scripts/fetchCreatures.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const API_BASE = 'https://www.dnd5eapi.co';
const OUTPUT_PATH = path.join(__dirname, '..', 'src', 'data', 'srd', 'creatures.ts');

async function fetchJSON(url) {
  const response = await fetch(url, {
    headers: { 
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status} at ${url}`);
  }
  return await response.json();
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/**
 * Parse damage dice string like "2d4+2" from the API damage array.
 */
function parseDamage(damageArr) {
  if (!damageArr || damageArr.length === 0) return null;
  
  const primary = damageArr[0];
  const result = {
    dice: primary.damage_dice || '1d4',
    type: primary.damage_type?.name || 'bludgeoning'
  };

  // Check for extra damage (index 1+)
  if (damageArr.length > 1) {
    const extra = damageArr[1];
    result.extraDice = extra.damage_dice || '';
    result.extraType = extra.damage_type?.name || '';
  }

  return result;
}

/**
 * Extract attack data from monster actions.
 */
function extractAttacks(actions) {
  if (!actions) return [];
  
  return actions
    .filter(a => a.attack_bonus !== undefined && a.attack_bonus !== null)
    .map(a => {
      const dmg = parseDamage(a.damage);
      return {
        name: a.name,
        toHit: a.attack_bonus,
        damage: dmg?.dice || '1d4',
        damageType: dmg?.type || 'bludgeoning',
        extraDamage: dmg?.extraDice || undefined,
        extraDamageType: dmg?.extraType || undefined,
        description: a.desc
      };
    })
    .filter(a => a.damage); // Only keep attacks with valid damage
}

/**
 * Extract multiattack description if present.
 */
function extractMultiattack(actions) {
  if (!actions) return undefined;
  const ma = actions.find(a => a.name === 'Multiattack');
  return ma?.desc || undefined;
}

/**
 * Extract special abilities as simple name strings.
 */
function extractSpecialAbilities(abilities) {
  if (!abilities) return undefined;
  return abilities.map(a => a.name);
}

/**
 * Get walk speed from the speed object.
 */
function getWalkSpeed(speed) {
  if (!speed?.walk) return 30;
  if (typeof speed.walk === 'number') return speed.walk;
  // Format: "40 ft."
  const match = String(speed.walk).match(/(\d+)/);
  return match ? parseInt(match[1]) : 30;
}

/**
 * Transform API monster data to our CreatureDefinition format.
 */
function transformCreature(m) {
  const attacks = extractAttacks(m.actions);
  const multiattack = extractMultiattack(m.actions);
  const specialAbilities = extractSpecialAbilities(m.special_abilities);

  return {
    id: m.index,
    name: m.name,
    type: m.type || 'unknown',
    size: m.size || 'Medium',
    cr: m.challenge_rating ?? 0,
    xp: m.xp ?? 0,
    ac: Array.isArray(m.armor_class) ? m.armor_class[0]?.value ?? 10 : (m.armor_class ?? 10),
    hp: m.hit_points ?? 1,
    hitDice: m.hit_dice || '1d8',
    speed: getWalkSpeed(m.speed),
    str: m.strength ?? 10,
    dex: m.dexterity ?? 10,
    con: m.constitution ?? 10,
    int: m.intelligence ?? 10,
    wis: m.wisdom ?? 10,
    cha: m.charisma ?? 10,
    attacks,
    multiattack: multiattack || undefined,
    specialAbilities: specialAbilities?.length > 0 ? specialAbilities : undefined
  };
}

function escapeStr(s) {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '');
}

/**
 * Generate the TypeScript file content.
 */
function generateTS(creatures) {
  let ts = `// ═══════════════════════════════════════════════════════════════════════════════
// AUTO-GENERATED — Do not edit manually!
// Source: dnd5eapi.co (SRD 5.1, CC-BY 4.0)
// Generated: ${new Date().toISOString().split('T')[0]}
// Total creatures: ${creatures.length}
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

export const SRD_CREATURES: CreatureDefinition[] = [\n`;

  for (const c of creatures) {
    ts += `  {\n`;
    ts += `    id: '${escapeStr(c.id)}', name: '${escapeStr(c.name)}',\n`;
    ts += `    type: '${escapeStr(c.type)}', size: '${escapeStr(c.size)}',\n`;
    ts += `    cr: ${c.cr}, xp: ${c.xp}, ac: ${c.ac}, hp: ${c.hp}, hitDice: '${escapeStr(c.hitDice)}', speed: ${c.speed},\n`;
    ts += `    str: ${c.str}, dex: ${c.dex}, con: ${c.con}, int: ${c.int}, wis: ${c.wis}, cha: ${c.cha},\n`;
    
    // Attacks
    if (c.attacks.length === 0) {
      ts += `    attacks: [],\n`;
    } else {
      ts += `    attacks: [\n`;
      for (const a of c.attacks) {
        ts += `      { name: '${escapeStr(a.name)}', toHit: ${a.toHit}, damage: '${escapeStr(a.damage)}', damageType: '${escapeStr(a.damageType)}'`;
        if (a.extraDamage) {
          ts += `, extraDamage: '${escapeStr(a.extraDamage)}', extraDamageType: '${escapeStr(a.extraDamageType)}'`;
        }
        if (a.description) {
          ts += `, description: '${escapeStr(a.description)}'`;
        }
        ts += ` },\n`;
      }
      ts += `    ],\n`;
    }

    // Multiattack
    if (c.multiattack) {
      ts += `    multiattack: '${escapeStr(c.multiattack)}'`;
      if (c.specialAbilities) ts += `,`;
      ts += `\n`;
    }

    // Special Abilities
    if (c.specialAbilities) {
      ts += `    specialAbilities: [${c.specialAbilities.map(s => `'${escapeStr(s)}'`).join(', ')}]\n`;
    }

    ts += `  },\n`;
  }

  ts += `];\n\n`;

  // Add lookup helpers
  ts += `// ─── Lookup Helpers ─────────────────────────────────────────────────────────
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
`;

  return ts;
}

async function main() {
  console.log('🔍 Fetching monster list from dnd5eapi.co...');
  const list = await fetchJSON(`${API_BASE}/api/monsters`);
  console.log(`📋 Found ${list.count} monsters. Fetching details...`);

  const creatures = [];
  let fetched = 0;

  for (const entry of list.results) {
    try {
      const monster = await fetchJSON(`${API_BASE}${entry.url}`);
      const creature = transformCreature(monster);
      creatures.push(creature);
      fetched++;
      
      if (fetched % 20 === 0) {
        console.log(`  ... ${fetched}/${list.count}`);
      }
      
      // Small delay to be respectful to the API
      await sleep(50);
    } catch (err) {
      console.error(`  ⚠️ Failed to fetch ${entry.name}: ${err.message}`);
    }
  }

  console.log(`\n✅ Fetched ${creatures.length} creatures successfully.`);
  console.log(`📝 Generating TypeScript file...`);

  const tsContent = generateTS(creatures);
  fs.writeFileSync(OUTPUT_PATH, tsContent, 'utf8');

  const sizeKB = (Buffer.byteLength(tsContent, 'utf8') / 1024).toFixed(1);
  console.log(`✨ Written to ${OUTPUT_PATH} (${sizeKB} KB)`);
  console.log(`   ${creatures.length} creatures with ${creatures.reduce((acc, c) => acc + c.attacks.length, 0)} total attacks`);
}

main().catch(err => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
