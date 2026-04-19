// Definición de Tipos
export type AbilityKey = 'str' | 'dex' | 'con' | 'int' | 'wis' | 'cha';

export interface SkillDefinition {
  id: string;
  name: string;
  ability: AbilityKey;
  description: string;
}

// Las 18 Habilidades del Manual del Jugador 5e
export const SRD_SKILLS: Record<string, SkillDefinition> = {
  acrobatics: { id: 'acrobatics', name: 'Acrobacias', ability: 'dex', description: 'Tu capacidad para mantener el equilibrio en situaciones difíciles, realizar acrobacias, saltos y evitar ser derribado.' },
  animal_handling: { id: 'animal_handling', name: 'Trato con Animales', ability: 'wis', description: 'Tu habilidad para tranquilizar animales domésticos o salvajes, intuir sus intenciones o controlar monturas.' },
  arcana: { id: 'arcana', name: 'Conocimiento Arcano', ability: 'int', description: 'Recuerda información sobre hechizos, objetos mágicos, símbolos esotéricos, tradiciones mágicas y los planos de existencia.' },
  athletics: { id: 'athletics', name: 'Atletismo', ability: 'str', description: 'Tu capacidad para trepar, saltar, nadar o lidiar con esfuerzos físicos crudos.' },
  deception: { id: 'deception', name: 'Engaño', ability: 'cha', description: 'Determina si puedes ocultar la verdad, ya sea mediante palabras, acciones u omisiones.' },
  history: { id: 'history', name: 'Historia', ability: 'int', description: 'Mide tu capacidad de recordar información histórica, eventos pasados, imperios y familias nobles.' },
  insight: { id: 'insight', name: 'Perspicacia', ability: 'wis', description: 'Decide si puedes deducir las verdaderas intenciones de una criatura o notar si alguien miente.' },
  intimidation: { id: 'intimidation', name: 'Intimidación', ability: 'cha', description: 'Mide si puedes influenciar a alguien mediante amenazas o lenguaje hostil.' },
  investigation: { id: 'investigation', name: 'Investigación', ability: 'int', description: 'Buscas pistas y haces deducciones basadas en ellas, buscando trampas, puertas ocultas o documentos.' },
  medicine: { id: 'medicine', name: 'Medicina', ability: 'wis', description: 'Te permite estabilizar a un compañero moribundo o diagnosticar enfermedades.' },
  nature: { id: 'nature', name: 'Naturaleza', ability: 'int', description: 'Conocimientos referentes al clima, plantas, animales, el terreno y los ciclos de la naturaleza.' },
  perception: { id: 'perception', name: 'Percepción', ability: 'wis', description: 'Tu consciencia general del entorno. Escuchar orcos emboscados, ver un hilo trampa u oler veneno.' },
  performance: { id: 'performance', name: 'Interpretación', ability: 'cha', description: 'Determina lo bien que puedes entretener a una audiencia mediante música, baile, actuación o discursos.' },
  persuasion: { id: 'persuasion', name: 'Persuasión', ability: 'cha', description: 'Influir en alguien o en un grupo con tacto, gracia, buenos modales o labia para que hagan lo que deseas pacíficamente.' },
  religion: { id: 'religion', name: 'Religión', ability: 'int', description: 'Recuerda información sobre deidades, ritos, oraciones, jerarquías eclesiásticas y sectas heréticas.' },
  sleight_of_hand: { id: 'sleight_of_hand', name: 'Juego de Manos', ability: 'dex', description: 'Plantas algo en otra persona, o escondes o sacas algo sin ser notado (ej. robar una bolsa).' },
  stealth: { id: 'stealth', name: 'Sigilo', ability: 'dex', description: 'Qué tan bien te ocultas de los enemigos, te mueves sin hacer ruido o sigues a alguien sin ser detectado.' },
  survival: { id: 'survival', name: 'Supervivencia', ability: 'wis', description: 'Seguir rastros, cazar, guiar a grupos en zonas salvajes, evitar peligros naturales y predecir el clima.' }
};
