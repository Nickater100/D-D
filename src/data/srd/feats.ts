export interface FeatDefinition {
  id: string;
  name: string;
  description: string;
  prerequisite?: string;
  benefits: string[];
  // Potential automated mechanical bonuses
  abilityBonus?: Partial<Record<string, number>>; // e.g. { str: 1 } for Athlete
  hpBonusPerLevel?: number; // e.g. 2 for Tough
  initiativeBonus?: number; // e.g. 5 for Alert
}

export const SRD_FEATS: Record<string, FeatDefinition> = {
  alert: {
    id: 'alert',
    name: 'Alerta',
    description: 'Siempre estás al tanto de las amenazas a tu alrededor.',
    benefits: [
      'Obtienes un bonificador de +5 a la iniciativa.',
      'No puedes ser sorprendido mientras estés consciente.',
      'Otras criaturas no obtienen ventaja en las tiradas de ataque contra ti por el hecho de estar ocultas.'
    ],
    initiativeBonus: 5
  },
  athlete: {
    id: 'athlete',
    name: 'Atleta',
    description: 'Has pasado por un intenso entrenamiento físico.',
    benefits: [
      'Aumentas tu puntuación de Fuerza o Destreza en 1, hasta un máximo de 20.',
      'Cuando estás derribado, levantarte solo te cuesta 5 pies de movimiento.',
      'Escalar no te cuesta movimiento adicional.',
      'Puedes hacer un salto de longitud o de altura con carrera tras moverte solo 5 pies.'
    ],
    abilityBonus: { str: 1 } // Default to STR, UI can allow choice later
  },
  great_weapon_master: {
    id: 'great_weapon_master',
    name: 'Maestro de Armas Grandes',
    description: 'Has aprendido a usar el peso de tu arma a tu favor.',
    benefits: [
      'En tu turno, cuando logras un golpe crítico con un arma cuerpo a cuerpo o reduces a una criatura a 0 PG, puedes realizar un ataque adicional como acción adicional.',
      'Antes de realizar un ataque cuerpo a cuerpo con un arma pesada, puedes elegir tener un penalizador de -5 a la tirada de ataque. Si el ataque impacta, sumas +10 al daño.'
    ]
  },
  lucky: {
    id: 'lucky',
    name: 'Afortunado',
    description: 'Tienes una suerte inexplicable que parece surgir en el momento justo.',
    benefits: [
      'Tienes 3 puntos de suerte por descanso largo.',
      'Puedes gastar un punto de suerte para tirar un d20 adicional en una tirada de ataque, prueba de característica o salvación, y elegir qué dado usar.',
      'Puedes gastar un punto de suerte para obligar a un atacante a volver a tirar su ataque contra ti.'
    ]
  },
  mobile: {
    id: 'mobile',
    name: 'Móvil',
    description: 'Eres excepcionalmente rápido y ágil.',
    benefits: [
      'Tu velocidad aumenta en 10 pies.',
      'Cuando usas la acción de Correr, el terreno difícil no te cuesta movimiento adicional.',
      'Cuando realizas un ataque cuerpo a cuerpo contra una criatura, no provocas ataques de oportunidad de esa criatura por el resto del turno, impactes o no.'
    ]
  },
  sentinel: {
    id: 'sentinel',
    name: 'Centinela',
    description: 'Eres un maestro en aprovechar cada oportunidad para castigar a tus enemigos.',
    benefits: [
      'Cuando impactas a una criatura con un ataque de oportunidad, su velocidad se reduce a 0 por el resto del turno.',
      'Las criaturas provocan ataques de oportunidad de tu parte incluso si usan la acción de Retirada.',
      'Cuando una criatura a menos de 5 pies de ti ataca a un objetivo que no eres tú, puedes usar tu reacción para realizar un ataque cuerpo a cuerpo contra el atacante.'
    ]
  },
  sharpshooter: {
    id: 'sharpshooter',
    name: 'Francotirador',
    description: 'Has dominado las armas a distancia.',
    benefits: [
      'Atacar a larga distancia no te impone desventaja con armas a distancia con las que seas competente.',
      'Tus ataques con armas a distancia ignoran cobertura media y tres cuartos.',
      'Antes de realizar un ataque con un arma a distancia, puedes elegir tener un penalizador de -5 a la tirada de ataque. Si impactas, sumas +10 al daño.'
    ]
  },
  tough: {
    id: 'tough',
    name: 'Duro de Pelar',
    description: 'Tu resistencia física es legendaria.',
    benefits: [
      'Tus puntos de golpe máximos aumentan en una cantidad igual al doble de tu nivel cuando obtienes esta dote.',
      'Cada vez que subas de nivel, tus puntos de golpe máximos aumentan en 2 puntos adicionales.'
    ],
    hpBonusPerLevel: 2
  },
  war_caster: {
    id: 'war_caster',
    name: 'Lanzador de Conjuros de Guerra',
    prerequisite: 'Capacidad de lanzar al menos un conjuro',
    description: 'Has entrenado para lanzar conjuros en el fragor de la batalla.',
    benefits: [
      'Tienes ventaja en las tiradas de salvación de Constitución para mantener la concentración cuando recibes daño.',
      'Puedes realizar los componentes somáticos de los conjuros incluso cuando tienes armas o un escudo en ambas manos.',
      'Cuando el movimiento de una criatura provoca un ataque de oportunidad de tu parte, puedes usar tu reacción para lanzar un conjuro a la criatura en lugar de realizar un ataque.'
    ]
  },
  magic_initiate: {
    id: 'magic_initiate',
    name: 'Iniciado en la Magia',
    description: 'Has aprendido un poco de magia de una clase específica.',
    benefits: [
      'Eliges una clase: bardo, clérigo, druida, hechicero, brujo o mago.',
      'Aprendes dos trucos de la lista de esa clase.',
      'Aprendes un conjuro de nivel 1 de esa misma lista. Puedes lanzarlo una vez por descanso largo sin gastar espacios de conjuro.'
    ]
  },
  skilled: {
    id: 'skilled',
    name: 'Habilidoso',
    description: 'Has practicado diversas habilidades.',
    benefits: [
      'Ganas competencia en cualquier combinación de tres habilidades o herramientas a tu elección.'
    ]
  },
  resilient: {
    id: 'resilient',
    name: 'Resiliente',
    description: 'Has desarrollado una resistencia superior.',
    benefits: [
      'Eliges una puntuación de característica y la aumentas en 1, hasta un máximo de 20.',
      'Ganas competencia en las tiradas de salvación usando la característica elegida.'
    ]
  }
};
