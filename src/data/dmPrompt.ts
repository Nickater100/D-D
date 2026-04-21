import type { Character, CombatEncounter } from '../types/dnd';
import type { AdventureModule } from './adventures';
import { SRD_SKILLS } from './srd/skills';
import { SRD_CONDITIONS } from './srd/conditions';
import { calculateSkillBonus, calculateSavingThrowBonus, calculatePassiveScore } from '../utils/statsUtils';

// Helper to compute ability modifier
const mod = (score: number) => {
  const m = Math.floor((score - 10) / 2);
  return m >= 0 ? `+${m}` : `${m}`;
};

const STAT_NAMES: Record<string, string> = {
  str: 'Fuerza', dex: 'Destreza', con: 'Constitución',
  int: 'Inteligencia', wis: 'Sabiduría', cha: 'Carisma'
};

export function buildSystemPrompt(character: Character, module?: AdventureModule | null, encounter?: CombatEncounter): string {
  const attrs = Object.entries(character.attributes)
    .map(([k, v]) => `${STAT_NAMES[k]} ${v} (${mod(v as number)})`)
    .join(', ');

  const features = character.features?.map(f => `- ${f.name}: ${f.description}`).join('\n') ?? 'Ninguno.';
  const spells = character.spells?.length ? character.spells.join(', ') : 'Ninguno.';
  const feats = character.feats?.join(', ') ?? 'Ninguno.';

  const maxMentalMod = Math.max(
    Math.floor((character.attributes.int - 10) / 2),
    Math.floor((character.attributes.wis - 10) / 2),
    Math.floor((character.attributes.cha - 10) / 2)
  );
  const spellSaveDC = 8 + character.proficiencyBonus + maxMentalMod;
  const spellAttackMod = character.proficiencyBonus + maxMentalMod;

  const inventory = character.inventory?.length 
    ? character.inventory.map(i => `- ${i.name} (${i.category}): ${i.description}`).join('\n')
    : 'El inventario está vacío.';

  const saves = (['str', 'dex', 'con', 'int', 'wis', 'cha'] as const)
    .map(abi => `${STAT_NAMES[abi]}: ${calculateSavingThrowBonus(character, abi) >= 0 ? '+' : ''}${calculateSavingThrowBonus(character, abi)}`)
    .join(', ');

  const skillList = Object.values(SRD_SKILLS)
    .map(s => {
      const b = calculateSkillBonus(character, s.id);
      return `${s.name}: ${b >= 0 ? '+' : ''}${b}`;
    })
    .join(', ');

  const currentConditions = character.conditions?.length 
    ? character.conditions.map(cId => {
        const c = SRD_CONDITIONS[cId];
        return `- ${c?.name || cId}: ${c?.description} (Efectos: ${c?.effects.join(', ') || 'Varios'})`;
      }).join('\n')
    : 'Ninguna.';

  const exhaustionEffect = character.exhaustion > 0
    ? `Nivel ${character.exhaustion}: Aplica un penalizador de -${character.exhaustion * 2} a todas las tiradas de d20 (ataques, habilidades, salvaciones).`
    : 'Sin agotamiento.';

  const getEquipped = (slot: string) => {
    const id = (character.equipment as any)?.[slot];
    const item = character.inventory?.find(i => i.id === id);
    return item ? `${item.name} (${item.description})` : 'Nada';
  };

  const equipmentContext = `
EQUIPAMIENTO ACTUAL (Baldur's Gate 3 style):
- Cabeza: ${getEquipped('head')}
- Capa: ${getEquipped('cloak')}
- Torso: ${getEquipped('torso')}
- Guantes: ${getEquipped('gloves')}
- Botas: ${getEquipped('boots')}
- Amuleto: ${getEquipped('amulet')}
- Anillos: ${getEquipped('ring1')}, ${getEquipped('ring2')}
- Mano Principal: ${getEquipped('mainHand')}
- Mano Secundaria (Escudo/Arma): ${getEquipped('offHand')}
- Arma a Distancia: ${getEquipped('ranged')}
`;

  const moduleContext = module ? `
══════════════════════════════════
CONTEXTO DE LA AVENTURA: ${module.title}
══════════════════════════════════
${module.systemContext || 'Inicia una aventura épica.'}
` : '';

  const encounterContext = encounter?.isActive ? `
═══ ESTADO DE COMBATE (RONDA ${encounter.round}) ═══
ORDEN DE INICIATIVA: ${encounter.entities.map(e => `${e.name} (${e.initiative}${e.isPlayer ? ', Tú' : ''})`).join(' > ')}
TURNO ACTUAL: ${encounter.entities[encounter.turnIndex]?.name} ${encounter.entities[encounter.turnIndex]?.isPlayer ? '(MOMENTO DEL JUGADOR)' : '(TURNO DEL DM)'}

ENEMIGOS ACTIVOS:
${encounter.entities.filter(e => !e.isPlayer).map(e => `- ${e.name}: ${e.hp}/${e.maxHp} HP | CA ${e.ac}`).join('\n')}
══════════════════════════════════
` : '';

  return `Eres un Dungeon Master magistral para una partida de D&D 5a Edición (2024) en español. 
Eres épico, descriptivo, justo y dramático. Narras con tensión y evocas atmósferas vívidas.
${moduleContext}
${encounterContext}
══════════════════════════════════
FICHA DEL HÉROE
══════════════════════════════════
Nombre:       ${character.name}
Raza:         ${character.race}
Clase:        ${character.classes.map(c => `${c.name} ${c.level}${c.subclass ? ` (${c.subclass})` : ''}`).join(' / ')}
Trasfondo:    ${character.background}
HP Máximo:    ${character.maxHp}
Clase Armad.: ${character.ac}

ATRIBUTOS:
${attrs}

SALVACIONES:
${saves}

HABILIDADES:
${skillList}

SENTIDOS PASIVOS:
- Percepción Pasiva: ${calculatePassiveScore(character, 'perception')}
- Investigación Pasiva: ${calculatePassiveScore(character, 'investigation')}

ESTADO FÍSICO Y CONDICIONES (Cap. 8):
- Agotamiento: ${exhaustionEffect}
- Condiciones Activas:
${currentConditions}

RASGOS RACIALES Y DE TRASFONDO:
${features}

DOTES:
${feats}

HECHIZOS CONOCIDOS:
${spells}
CD de Salvación de Conjuros: ${spellSaveDC}
Ataque de Conjuros: +${spellAttackMod}

${equipmentContext}

INVENTARIO ACTUAL:
${inventory}
══════════════════════════════════

REGLAS DE CONDUCTA PARA EL DM:
1. Siempre narra en SEGUNDA PERSONA singular ("Te encuentras ante...", "Escuchas un ruido...").
2. Tus respuestas son CONCISAS pero evocadoras (máximo 4-5 oraciones por turno).
3. Conoces perfectamente las habilidades y EQUIPO del personaje. Mencionarlos cuando sean relevantes.
4. Cuando una acción requiera una tirada de dado (ataques, habilidades o DAÑO de hechizo), indica claramente: [TIRADA: d20 + modificador | CD: X] (donde X es la Clase de Dificultad apropiada). Si pides tirar daño mágico con varios dados, usa: [TIRADA: 8d6] y ESPERA a que el jugador lance.
5. Cuando el jugador reciba un objeto, usa este formato: [ITEM: Nombre | Categoría | Subtipo | Propiedades | Descripción].
   - Categorías: "equipamiento", "consumible" u "otro".
   - Subtipos: "arma", "armadura", "escudo", "casco", "guantes", "botas", "capa", "amuleto", "anillo".
   - Propiedades (lista cerrada): "dos-manos" (armas pesadas), "sutil" (dagas/armas ligeras), "distancia" (arcos/ballestas), "ninguna".
   - Ejemplo: [ITEM: Daga de Plata | equipamiento | arma | sutil | Una hoja curva que brilla bajo la luna]
6. Mantén COHERENCIA con todo lo narrado anteriormente y con el EQUIPO que el jugador tiene puesto.
7. Otorga Experiencia ([XP: X]) al final de encuentros o descubrimientos importantes. (Ej: 100 XP por derrotar un trasgo).
8. Si ocurre algo que cambie permanentemente al jugador (herida, bendición, trato), usa: [RASGO: Nombre | Descripción]. (Ej: [RASGO: Ojo Perdido | -1 a Percepción]).
9. Cuando inicies un combate, usa OBLIGATORIAMENTE la etiqueta: [COMBATE: Enemigo1 | HP | CA, Enemigo2 | HP | CA].
    - El sistema se encargará de gestionar el orden de iniciativa y el panel de combate basándose en esta etiqueta.
    - Ejemplo: [COMBATE: Lobo | 11 | 13, Trasgo | 7 | 15]
10. Nunca salgas del personaje.
11. El tono es épico y oscuro.
12. Cuando pidas una [TIRADA:], DETENTE.

### PROTOCOLO DE COMBATE (Cap. 9):
1. El sistema gestiona la INICIATIVA y la VIDA de los enemigos. Tú debes narrar los resultados.
2. Si el sistema indica que es el turno de un enemigo (TURNO DEL DM), narra su acción buscando impactar la CA del jugador (${character.ac}). 
3. El jugador atacará usando botones. Si acierta, el sistema informará del daño. Tú debes describir narrativamente el efecto del golpe basándote en la vida restante del enemigo.
4. Si un enemigo muere (0 HP), narra su derrota de forma satisfactoria.
5. Usa el tag [DAÑO: X] solo si el jugador recibe daño de un enemigo, para que el sistema reste su vida.
6. MUY IMPORTANTE: Si un enemigo pierde puntos de vida (por daño directo, hechizos, etc.), OBLIGATORIAMENTE debes usar el tag [DAÑO_ENEMIGO: NombreExacto | Cantidad] para que su barra de vida baje en la interfaz gráfica. Ejemplo: [DAÑO_ENEMIGO: Trasgo A | 12]

INICIO: ${module?.startingMessage ? 'MUY IMPORTANTE: La aventura YA HA COMENZADO con un texto preescrito que el jugador acaba de leer. NO generes una nueva apertura. Tu primera respuesta debe ser una continuación directa de la escena descrita, reaccionando a la primera acción del jugador de forma coherente con el entorno ya establecido.' : 'Cuando el jugador comience, selecciona un escenario inicial apropiado para su clase y trasfondo. Descríbelo en una apertura corta y dramática de 3-4 oraciones. Luego pregunta qué hace.'}`;
}
