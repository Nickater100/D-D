import type { AbilityKey } from './skills';

export interface ClassFeatureDefinition {
  name: string;
  description: string;
  level: number;
}

export interface StartingEquipmentChoice {
  options: string[][];
}

export interface CombatStyle {
  id: string;
  name: string;
  description: string;
}

export interface SubclassDefinition {
  id: string;
  name: string;
  description: string;
  requiredAtLevel: number;           // 1 = obligatoria en creación (Clérigo, Brujo, Hechicero)
  bonusSpells?: string[];            // IDs de conjuros que se agregan automáticamente
  bonusArmorProficiencies?: string[];
  bonusWeaponProficiencies?: string[];
  features: ClassFeatureDefinition[];
}

export interface ClassDefinition {
  id: string;
  name: string;
  description: string;
  hitDie: number;
  primaryAttributes: AbilityKey[];
  savingThrows: AbilityKey[];
  proficiencies: {
    armor: string[];
    weapons: string[];
    tools?: string[];
  };
  startingProficiencies: {
    skills: {
      choose: number;
      from: string[];
    };
  };
  startingEquipment: {
    default: string[];
    choices: StartingEquipmentChoice[];
  };
  features: ClassFeatureDefinition[];
  subclasses?: SubclassDefinition[];
  combatStyles?: CombatStyle[];
  expertiseCount?: number;           // Pícaro: número de habilidades con Pericia doble
}

// ============================================================
// ESTILOS DE COMBATE COMPARTIDOS
// ============================================================
const FIGHTER_COMBAT_STYLES: CombatStyle[] = [
  { id: 'archery', name: 'Arquería', description: 'Obtienes un bonificador de +2 a las tiradas de ataque que hagas con armas a distancia.' },
  { id: 'defense', name: 'Defensa', description: 'Mientras lleves una armadura, obtienes un bonificador de +1 a la CA.' },
  { id: 'dueling', name: 'Duelo', description: 'Cuando blandes un arma a cuerpo a cuerpo en una mano y no lleves ninguna otra arma, obtienes un bonificador de +2 a las tiradas de daño con esa arma.' },
  { id: 'great_weapon_fighting', name: 'Combate con Armas a dos manos', description: 'Cuando saques un 1 o un 2 en un dado de daño de un ataque con un arma a dos manos o versátil, puedes volver a tirar el dado.' },
  { id: 'protection', name: 'Protección', description: 'Cuando una criatura que puedas ver ataca a un objetivo que no seas tú dentro de 5 pies de ti, puedes usar tu reacción para imponer desventaja en la tirada de ataque. Debes estar usando un escudo.' },
  { id: 'two_weapon_fighting', name: 'Combate con Dos Armas', description: 'Cuando te involucras en el combate con dos armas, puedes añadir tu modificador de característica al daño del segundo ataque.' }
];

const PALADIN_COMBAT_STYLES: CombatStyle[] = [
  { id: 'defense', name: 'Defensa', description: 'Mientras lleves una armadura, obtienes un bonificador de +1 a la CA.' },
  { id: 'dueling', name: 'Duelo', description: 'Cuando blandes un arma a cuerpo a cuerpo en una mano y no lleves ninguna otra arma, obtienes un bonificador de +2 a las tiradas de daño con esa arma.' },
  { id: 'great_weapon_fighting', name: 'Combate con Armas a dos manos', description: 'Cuando saques un 1 o un 2 en un dado de daño de un ataque con un arma a dos manos o versátil, puedes volver a tirar el dado.' },
  { id: 'protection', name: 'Protección', description: 'Cuando una criatura que puedas ver ataca a un objetivo que no seas tú dentro de 5 pies de ti, puedes usar tu reacción para imponer desventaja en la tirada de ataque. Debes estar usando un escudo.' }
];

// ============================================================
// SUBCLASES: CLÉRIGO — 7 Dominios Divinos (PHB)
// ============================================================
const CLERIC_SUBCLASSES: SubclassDefinition[] = [
  {
    id: 'life_domain', name: 'Dominio de la Vida', requiredAtLevel: 1,
    description: 'El dominio de la Vida se centra en la energía vibrante y positiva que sostiene toda vida.',
    bonusArmorProficiencies: ['Armadura Pesada'],
    bonusSpells: ['bless', 'cure_wounds', 'lesser_restoration', 'spiritual_weapon', 'beacon_of_hope', 'revivify', 'death_ward', 'guardian_of_faith'],
    features: [
      { level: 1, name: 'Competencia Adicional', description: 'Ganas competencia con las armaduras pesadas.' },
      { level: 1, name: 'Discípulo de la Vida', description: 'Cuando usas un conjuro de nivel 1 o superior para restaurar PG, la criatura recupera PG adicionales iguales a 2 + el nivel del conjuro.' }
    ]
  },
  {
    id: 'light_domain', name: 'Dominio de la Luz', requiredAtLevel: 1,
    description: 'Los dioses de la Luz promueven los ideales del renacimiento, la verdad, la vigilancia y la belleza.',
    bonusSpells: ['burning_hands', 'faerie_fire', 'flaming_sphere', 'scorching_ray', 'daylight', 'fireball'],
    features: [
      { level: 1, name: 'Truco Adicional', description: 'Conoces el truco Luz (si aún no lo sabes). No cuenta en el límite de trucos.' },
      { level: 1, name: 'Destello Protector', description: 'Cuando una criatura que puedas ver dentro de 30 pies va a atacar a alguien que no seas tú, puedes interponer tu luz divina. El atacante tira con desventaja (hasta tu modificador de Sabiduría veces por descanso largo).' }
    ]
  },
  {
    id: 'war_domain', name: 'Dominio de la Guerra', requiredAtLevel: 1,
    description: 'La guerra tiene muchas manifestaciones. Puede hacer que los héroes sean legendarios y destruir civilizaciones.',
    bonusArmorProficiencies: ['Armadura Pesada'],
    bonusWeaponProficiencies: ['Armas Marciales'],
    bonusSpells: ['divine_favor', 'shield_of_faith', 'magic_weapon', 'spiritual_weapon', 'crusaders_mantle', 'spirit_guardians'],
    features: [
      { level: 1, name: 'Sacerdote Guerrero', description: 'Tu dios te ofrece inspiración para el combate. Puedes atacar dos veces cuando usas la acción de Ataque (hasta tu modificador de Sabiduría veces por descanso largo).' },
      { level: 1, name: 'Competencias Adicionales', description: 'Ganas competencia con las armaduras pesadas y las armas marciales.' }
    ]
  },
  {
    id: 'knowledge_domain', name: 'Dominio del Conocimiento', requiredAtLevel: 1,
    description: 'Los dioses del conocimiento valoran el aprendizaje y la comprensión.',
    bonusSpells: ['command', 'identify', 'augury', 'suggestion', 'nondetection', 'speak_with_dead'],
    features: [
      { level: 1, name: 'Bendiciones del Conocimiento', description: 'Aprendes dos idiomas a tu elección. También ganas competencia en dos de las siguientes habilidades: Arcanos, Historia, Naturaleza o Religión. Tu competencia en esas habilidades se dobla.' }
    ]
  },
  {
    id: 'nature_domain', name: 'Dominio de la Naturaleza', requiredAtLevel: 1,
    description: 'Los dioses de la naturaleza son tan variados como el mundo natural.',
    bonusArmorProficiencies: ['Armadura Pesada'],
    bonusSpells: ['animal_friendship', 'speak_with_animals', 'barkskin', 'spike_growth', 'plant_growth', 'wind_wall'],
    features: [
      { level: 1, name: 'Acólito de la Naturaleza', description: 'Aprendes un truco de la lista del druida. También ganas competencia en una de las siguientes habilidades: Adiestramiento de animales, Naturaleza o Supervivencia.' },
      { level: 1, name: 'Competencia Adicional', description: 'Ganas competencia con las armaduras pesadas.' }
    ]
  },
  {
    id: 'tempest_domain', name: 'Dominio de las Tempestades', requiredAtLevel: 1,
    description: 'Los dioses de las tempestades incluyen dioses mares, tormentas y cielos.',
    bonusArmorProficiencies: ['Armadura Pesada'],
    bonusWeaponProficiencies: ['Armas Marciales'],
    bonusSpells: ['fog_cloud', 'thunderwave', 'gust_of_wind', 'shatter', 'call_lightning', 'sleet_storm'],
    features: [
      { level: 1, name: 'Competencias Adicionales', description: 'Ganas competencia con las armas marciales y las armaduras pesadas.' },
      { level: 1, name: 'Ira de la Tormenta', description: 'Puedes reprender a los atacantes con un trueno divino. Cuando una criatura dentro de 5 pies te golpea, puedes usar tu reacción para causar que la criatura haga una salvación de Destreza. Si falla, recibe daño de relámpago o de trueno.' }
    ]
  },
  {
    id: 'trickery_domain', name: 'Dominio de la Treta', requiredAtLevel: 1,
    description: 'Los dioses de la treta son embaucadores y personajes traviesos.',
    bonusSpells: ['charm_person', 'disguise_self', 'mirror_image', 'pass_without_trace', 'blink', 'dispel_magic'],
    features: [
      { level: 1, name: 'Bendición del Embaucador', description: 'Puedes usar tu acción para tocar a una criatura voluntaria y le otorgas ventaja en pruebas de Destreza (Sigilo) hasta que el hechizo termine.' }
    ]
  }
];

// ============================================================
// SUBCLASES: HECHICERO — Orígenes Hechiceros (PHB)
// ============================================================
const SORCERER_SUBCLASSES: SubclassDefinition[] = [
  {
    id: 'draconic_bloodline', name: 'Linaje Dracónico', requiredAtLevel: 1,
    description: 'Tu magia innata proviene de la magia dracónica que se mezcló con tu sangre.',
    features: [
      { level: 1, name: 'Ancestro Dracónico', description: 'Eliges un tipo de dragón como tu ancestro. El tipo de daño asociado al dragón es usado por algunas de tus capacidades. Conoces el idioma Dracónico.' },
      { level: 1, name: 'Resistencia Dracónica', description: 'A medida que la magia fluye a través de tu cuerpo, te causa rasgos físicos. Tu PG máximo aumenta en 1 y aumenta en 1 más cada vez que ganas un nivel en esta clase. Además, partes de tu piel están cubiertas por una delgada magia parecida a escamas. Cuando no llevas armadura, tu CA=13+tu modificador de Des.' }
    ]
  },
  {
    id: 'wild_magic', name: 'Magia Salvaje', requiredAtLevel: 1,
    description: 'Tu poder mágico proviene de fuerzas salvajes del caos.',
    features: [
      { level: 1, name: 'Oleada de Magia Salvaje', description: 'Cuando lanzas un hechizo de nivel 1 o superior, el DM puede pedirte que tires un d20. Con un 1, tiras en la tabla de Oleada de Magia Salvaje para determinar un efecto extraño y aleatorio.' },
      { level: 1, name: 'Impulso de Magia Tidal', description: 'A partir del nivel 1, puedes canalizar el caos de la magia salvaje para transformarte en un punto del poder del caos.' }
    ]
  }
];

// ============================================================
// SUBCLASES: BRUJO — Patronos Extradimensionales (PHB)
// ============================================================
const WARLOCK_SUBCLASSES: SubclassDefinition[] = [
  {
    id: 'the_fiend', name: 'El Infernal', requiredAtLevel: 1,
    description: 'Has hecho un pacto con un demonio de los planos inferiores. Los infernales más poderosos, como el archidiablo Asmodeo.',
    bonusSpells: ['burning_hands', 'command', 'blindness_deafness', 'scorching_ray', 'fireball', 'stinking_cloud'],
    features: [
      { level: 1, name: 'Bendición del Oscuro', description: 'Cuando reduzca a 0 PG a una criatura hostil, que sea de CR 1/2 o superior, ganas PG temporales igual a tu modificador de Carisma + tu nivel de brujo (mínimo 1).' }
    ]
  },
  {
    id: 'the_archfey', name: 'El Archi-Hada', requiredAtLevel: 1,
    description: 'Tu pacto es con una entidad feérica poderosa de los Reinos Feéricos.',
    bonusSpells: ['faerie_fire', 'sleep', 'calm_emotions', 'phantasmal_force', 'blink', 'plant_growth'],
    features: [
      { level: 1, name: 'Presencia del Faerie', description: 'A partir del nivel 1, puedes causar que el corazón de otros se llene de terror o encanto etéreo. Como acción, cada criatura dentro de un cubo de 10 pies de ti debe superar una tirada de salvación de Sabiduría o quede hechizada o asustada de ti hasta el final de tu siguiente turno.' }
    ]
  },
  {
    id: 'the_great_old_one', name: 'El Gran Antiguo', requiredAtLevel: 1,
    description: 'Tu patrón es una entidad misteriosa cuyos objetivos son incomprensibles para los mortales y cuya naturaleza es difícil catalogar.',
    bonusSpells: ['dissonant_whispers', 'hideous_laughter', 'detect_thoughts', 'phantasmal_force', 'clairvoyance', 'sending'],
    features: [
      { level: 1, name: 'Mente Despertada', description: 'Desde el nivel 1, tu conocimiento alienígena te lleva a tocar la mente de otros. Puedes telépatamente hablar con cualquier criatura que veas dentro de 30 pies que conozca al menos un idioma.' }
    ]
  }
];

export const SRD_CLASSES: Record<string, ClassDefinition> = {
  barbarian: {
    id: 'barbarian',
    name: 'Bárbaro',
    description: 'Un fiero guerrero de trasfondo primitivo capaz de entrar en una furia de combate.',
    hitDie: 12,
    primaryAttributes: ['str'],
    savingThrows: ['str', 'con'],
    proficiencies: {
      armor: ['Armadura Ligera', 'Armadura Media', 'Escudos'],
      weapons: ['Armas Simples', 'Armas Marciales']
    },
    startingProficiencies: {
      skills: {
        choose: 2,
        from: ['animal_handling', 'athletics', 'intimidation', 'nature', 'perception', 'survival']
      }
    },
    startingEquipment: {
      default: ['explorers_pack', 'javelin_x4'],
      choices: [
        { options: [['greataxe'], ['any_martial_melee_weapon']] },
        { options: [['two_handaxes'], ['any_simple_weapon']] }
      ]
    },
    features: [
      { level: 1, name: 'Furia', description: 'En combate, puedes luchar con ferocidad primordial. En tu turno, puedes entrar en furia como acción adicional. Tienes ventaja en Fue, daño extra y resistencia física.' },
      { level: 1, name: 'Defensa Sin Armadura', description: 'Mientras no lleves armadura, tu CA es 10 + tu modificador de Destreza + tu modificador de Constitución. Puedes usar escudo.' }
    ]
  },
  bard: {
    id: 'bard',
    name: 'Bardo',
    description: 'Un mago inspirador cuyo poder hace eco en la música de la creación.',
    hitDie: 8,
    primaryAttributes: ['cha'],
    savingThrows: ['dex', 'cha'],
    proficiencies: {
      armor: ['Armadura Ligera'],
      weapons: ['Armas Simples', 'Ballesta de mano', 'Espada larga', 'Estoque', 'Espada corta'],
      tools: ['Tocar 3 instrumentos musicales de tu elección']
    },
    startingProficiencies: {
      skills: { choose: 3, from: ['acrobatics', 'animal_handling', 'arcana', 'athletics', 'deception', 'history', 'insight', 'intimidation', 'investigation', 'medicine', 'nature', 'perception', 'performance', 'persuasion', 'religion', 'sleight_of_hand', 'stealth', 'survival'] }
    },
    startingEquipment: {
      default: ['leather_armor', 'dagger'],
      choices: [
        { options: [['rapier'], ['longsword'], ['any_simple_weapon']] },
        { options: [['diplomats_pack'], ['entertainers_pack']] },
        { options: [['lute'], ['any_musical_instrument']] }
      ]
    },
    features: [
      { level: 1, name: 'Lanzamiento de Conjuros', description: 'Has aprendido a alterar la realidad para que concuerde con tus deseos a través de la música o la oratoria. Lanzador de conjuros con Carisma.' },
      { level: 1, name: 'Inspiración Bárdica', description: 'Puedes inspirar a otros con música o palabras. Como acción adicional da un d6 a una criatura para añadirlo a cualquier d20 tirado en los próximos 10 minutos.' }
    ]
  },
  cleric: {
    id: 'cleric',
    name: 'Clérigo',
    description: 'Un campeón sacerdotal que esgrime magia divina en servicio a un poder superior.',
    hitDie: 8,
    primaryAttributes: ['wis'],
    savingThrows: ['wis', 'cha'],
    proficiencies: {
      armor: ['Armadura Ligera', 'Armadura Media', 'Escudos'],
      weapons: ['Armas Simples']
    },
    startingProficiencies: {
      skills: { choose: 2, from: ['history', 'insight', 'medicine', 'persuasion', 'religion'] }
    },
    startingEquipment: {
      default: ['shield', 'holy_symbol'],
      choices: [
        { options: [['mace'], ['warhammer']] },
        { options: [['scale_mail'], ['leather_armor'], ['chain_mail']] },
        { options: [['light_crossbow', 'crossbow_bolts_20'], ['any_simple_weapon']] },
        { options: [['priests_pack'], ['explorers_pack']] }
      ]
    },
    features: [
      { level: 1, name: 'Lanzamiento de Conjuros', description: 'Como conducto del poder divino, puedes lanzar conjuros de clérigo con Sabiduría.' },
      { level: 1, name: 'Dominio Divino', description: 'Eliges un dominio divino relacionado con tu deidad que te otorga habilidades especiales desde el nivel 1.' }
    ],
    subclasses: CLERIC_SUBCLASSES
  },
  druid: {
    id: 'druid',
    name: 'Druida',
    description: 'Sacerdote conservador de la Vieja Fe, enarbola los poderes de la naturaleza.',
    hitDie: 8,
    primaryAttributes: ['wis'],
    savingThrows: ['int', 'wis'],
    proficiencies: {
      armor: ['Armadura Ligera', 'Armadura Media', 'Escudos (No pueden usar metal)'],
      weapons: ['Clava', 'Daga', 'Dardo', 'Jabalina', 'Maza', 'Bastón', 'Cimitarra', 'Hoz', 'Honda', 'Lanza'],
      tools: ['Kit de herboristería']
    },
    startingProficiencies: {
      skills: { choose: 2, from: ['arcana', 'animal_handling', 'insight', 'medicine', 'nature', 'perception', 'religion', 'survival'] }
    },
    startingEquipment: {
      default: ['leather_armor', 'explorers_pack', 'druidic_focus'],
      choices: [
        { options: [['wooden_shield'], ['any_simple_weapon']] },
        { options: [['scimitar'], ['any_simple_melee_weapon']] }
      ]
    },
    features: [
      { level: 1, name: 'Idioma Druídico', description: 'Conoces el Druídico, lengua secreta, y sus mensajes ocultos que otros no pueden notar sin magia.' },
      { level: 1, name: 'Lanzamiento de Conjuros', description: 'Basándote en la esencia divina de la naturaleza puedes lanzar magia con Sabiduría.' }
    ]
  },
  fighter: {
    id: 'fighter',
    name: 'Guerrero',
    description: 'Un adepto del combate sin rival capaz de usar con pericia un vasto surtido de armaduras y armas.',
    hitDie: 10,
    primaryAttributes: ['str', 'dex'],
    savingThrows: ['str', 'con'],
    proficiencies: {
      armor: ['Armadura Ligera', 'Armadura Media', 'Armadura Pesada', 'Escudos'],
      weapons: ['Armas Simples', 'Armas Marciales']
    },
    startingProficiencies: {
      skills: { choose: 2, from: ['acrobatics', 'animal_handling', 'athletics', 'history', 'insight', 'intimidation', 'perception', 'survival'] }
    },
    startingEquipment: {
      default: [],
      choices: [
        { options: [['chain_mail'], ['leather_armor', 'longbow', 'arrows_20']] },
        { options: [['martial_weapon', 'shield'], ['martial_weapon_1', 'martial_weapon_2']] },
        { options: [['light_crossbow', 'crossbow_bolts_20'], ['handaxe_x2']] },
        { options: [['dungeoneers_pack'], ['explorers_pack']] }
      ]
    },
    features: [
      { level: 1, name: 'Estilo de Combate', description: 'Adoptas un estilo particular de combate como especialidad. Elige uno de los estilos disponibles.' },
      { level: 1, name: 'Nuevas Energías', description: 'Una vez por descanso, en tu turno puedes usar una acción adicional para curarte 1d10 + tu nivel de guerrero en PG.' }
    ],
    combatStyles: FIGHTER_COMBAT_STYLES
  },
  monk: {
    id: 'monk',
    name: 'Monje',
    description: 'Un maestro de artes marciales que controla el poder en su cuerpo y se concentra en la perfección física y mística.',
    hitDie: 8,
    primaryAttributes: ['dex', 'wis'],
    savingThrows: ['str', 'dex'],
    proficiencies: {
      armor: ['Ninguna'],
      weapons: ['Armas Simples', 'Espadas cortas'],
      tools: ['Tocar 1 instrumento artesanal o musical']
    },
    startingProficiencies: {
      skills: { choose: 2, from: ['acrobatics', 'athletics', 'history', 'insight', 'religion', 'stealth'] }
    },
    startingEquipment: {
      default: ['dart_x10'],
      choices: [
        { options: [['shortsword'], ['any_simple_weapon']] },
        { options: [['dungeoneers_pack'], ['explorers_pack']] }
      ]
    },
    features: [
      { level: 1, name: 'Defensa Sin Armadura', description: 'Mientras no uses armadura ni escudo, tu CA es igual a 10 + tu modificador de Des + modificador de Sab.' },
      { level: 1, name: 'Artes Marciales', description: 'Tu práctica con artes marciales y armas de monje se refina. Puedes usar Des en vez de Fue para golpes desarmados y rodar d4.' }
    ]
  },
  paladin: {
    id: 'paladin',
    name: 'Paladín',
    description: 'Un guerrero sagrado sujeto a un juramento e invocado a luchar por todo lo puro y bueno.',
    hitDie: 10,
    primaryAttributes: ['str', 'cha'],
    savingThrows: ['wis', 'cha'],
    proficiencies: {
      armor: ['Armadura Ligera', 'Armadura Media', 'Armadura Pesada', 'Escudos'],
      weapons: ['Armas Simples', 'Armas Marciales']
    },
    startingProficiencies: {
      skills: { choose: 2, from: ['athletics', 'insight', 'intimidation', 'medicine', 'persuasion', 'religion'] }
    },
    startingEquipment: {
      default: ['chain_mail', 'holy_symbol'],
      choices: [
        { options: [['martial_weapon', 'shield'], ['martial_weapon_1', 'martial_weapon_2']] },
        { options: [['javelin_x5'], ['any_simple_melee_weapon']] },
        { options: [['priests_pack'], ['explorers_pack']] }
      ]
    },
    features: [
      { level: 1, name: 'Sentido Divino', description: 'Puedes gastar una acción para detectar celestiales, infernales o muertos vivientes en rango visual.' },
      { level: 1, name: 'Imposición de Manos', description: 'Tienes un pozo de curación bendito que puedes distribuir tocando, con total de tus niveles de Paladín x 5.' }
    ],
    combatStyles: PALADIN_COMBAT_STYLES
  },
  ranger: {
    id: 'ranger',
    name: 'Explorador',
    description: 'Un guerrero que usa destrezas marciales y magia de la naturaleza para combatir amenazas contra la espesura.',
    hitDie: 10,
    primaryAttributes: ['dex', 'wis'],
    savingThrows: ['str', 'dex'],
    proficiencies: {
      armor: ['Armadura Ligera', 'Armadura Media', 'Escudos'],
      weapons: ['Armas Simples', 'Armas Marciales']
    },
    startingProficiencies: {
      skills: { choose: 3, from: ['animal_handling', 'athletics', 'insight', 'investigation', 'nature', 'perception', 'stealth', 'survival'] }
    },
    startingEquipment: {
      default: ['longbow', 'arrows_20'],
      choices: [
        { options: [['scale_mail'], ['leather_armor']] },
        { options: [['shortsword_x2'], ['simple_melee_weapon_x2']] },
        { options: [['dungeoneers_pack'], ['explorers_pack']] }
      ]
    },
    features: [
      { level: 1, name: 'Enemigo Favorecido', description: 'Tienes gran experiencia persiguiendo un tipo de monstruo elegido. Tienes ventaja en Supervivencia para rastrearlo y conoces su idioma.' },
      { level: 1, name: 'Explorador Nato', description: 'Familiar en un tipo de terreno natural elegido. Tu bonificador de competencia se dobla en Naturaleza o Supervivencia.' }
    ]
  },
  rogue: {
    id: 'rogue',
    name: 'Pícaro',
    description: 'Un pillo que usa el sigilo y maquinaciones secretas para superar obstáculos e intervenir con los enemigos.',
    hitDie: 8,
    primaryAttributes: ['dex'],
    savingThrows: ['dex', 'int'],
    proficiencies: {
      armor: ['Armadura Ligera'],
      weapons: ['Armas Simples', 'Ballesta de mano', 'Espada larga', 'Estoque', 'Espada corta'],
      tools: ['Herramientas de ladrón']
    },
    startingProficiencies: {
      skills: { choose: 4, from: ['acrobatics', 'athletics', 'deception', 'insight', 'intimidation', 'investigation', 'perception', 'performance', 'persuasion', 'sleight_of_hand', 'stealth'] }
    },
    startingEquipment: {
      default: ['leather_armor', 'dagger_x2', 'thieves_tools'],
      choices: [
        { options: [['rapier'], ['shortsword']] },
        { options: [['shortbow', 'arrows_20'], ['shortsword']] },
        { options: [['burglars_pack'], ['dungeoneers_pack'], ['explorers_pack']] }
      ]
    },
    features: [
      { level: 1, name: 'Pericia', description: 'Elige dos de tus destrezas competentes: tu bonificador de competencia se dobla para las pruebas que hagas con ellas.' },
      { level: 1, name: 'Ataque Furtivo', description: 'Puedes golpear de manera perturbadoramente precisa. Una vez por turno, inflige 1d6 extra al dañar con un arma sutil si tienes ventaja, o si un aliado está adyacente al objetivo.' },
      { level: 1, name: 'Jerga de Ladrones', description: 'Durante tu entrenamiento aprendiste la jerga de ladrones, un lenguaje secreto.' }
    ],
    expertiseCount: 2
  },
  sorcerer: {
    id: 'sorcerer',
    name: 'Hechicero',
    description: 'Un usuario de magia con conjuros propios por un linaje mágico o un don prodigioso.',
    hitDie: 6,
    primaryAttributes: ['cha'],
    savingThrows: ['con', 'cha'],
    proficiencies: {
      armor: ['Ninguna'],
      weapons: ['Dagas', 'Dardos', 'Hondas', 'Bastones', 'Ballestas ligeras']
    },
    startingProficiencies: {
      skills: { choose: 2, from: ['arcana', 'deception', 'insight', 'intimidation', 'persuasion', 'religion'] }
    },
    startingEquipment: {
      default: ['dagger_x2'],
      choices: [
        { options: [['light_crossbow', 'crossbow_bolts_20'], ['any_simple_weapon']] },
        { options: [['component_pouch'], ['arcane_focus']] },
        { options: [['dungeoneers_pack'], ['explorers_pack']] }
      ]
    },
    features: [
      { level: 1, name: 'Lanzamiento de Conjuros', description: 'Puedes lanzar hechizos innatos a través de magia ardiente interior usando Carisma.' },
      { level: 1, name: 'Origen Hechicero', description: 'El origen de tu magia innata está definido por tu linaje. Elige tu Origen Hechicero, otorga ventajas de nivel 1.' }
    ],
    subclasses: SORCERER_SUBCLASSES
  },
  warlock: {
    id: 'warlock',
    name: 'Brujo',
    description: 'Atado por un pacto inusual con un mecenas extradimensional. Posee poca magia que recarga rápidamente.',
    hitDie: 8,
    primaryAttributes: ['cha'],
    savingThrows: ['wis', 'cha'],
    proficiencies: {
      armor: ['Armadura Ligera'],
      weapons: ['Armas Simples']
    },
    startingProficiencies: {
      skills: { choose: 2, from: ['arcana', 'deception', 'history', 'intimidation', 'investigation', 'nature', 'religion'] }
    },
    startingEquipment: {
      default: ['leather_armor', 'simple_weapon_1', 'dagger_x2'],
      choices: [
        { options: [['light_crossbow', 'crossbow_bolts_20'], ['any_simple_weapon']] },
        { options: [['component_pouch'], ['arcane_focus']] },
        { options: [['scholars_pack'], ['dungeoneers_pack']] }
      ]
    },
    features: [
      { level: 1, name: 'Patrón de Otro Mundo', description: 'Has hecho un trato con un ser de otro plano. El Patrón elegido te otorga conjuros y habilidades exclusivas desde el nivel 1.' },
      { level: 1, name: 'Magia de Pacto', description: 'Recibes espacios de conjuro que siempre se lanzan a tu mayor nivel, recuperables con descanso corto.' }
    ],
    subclasses: WARLOCK_SUBCLASSES
  },
  wizard: {
    id: 'wizard',
    name: 'Mago',
    description: 'Un usuario de magia académico superior con el mayor surtido de conjuros arcanos disponibles.',
    hitDie: 6,
    primaryAttributes: ['int'],
    savingThrows: ['int', 'wis'],
    proficiencies: {
      armor: ['Ninguna'],
      weapons: ['Dagas', 'Dardos', 'Hondas', 'Bastones', 'Ballestas ligeras']
    },
    startingProficiencies: {
      skills: { choose: 2, from: ['arcana', 'history', 'insight', 'investigation', 'medicine', 'religion'] }
    },
    startingEquipment: {
      default: ['spellbook'],
      choices: [
        { options: [['quarterstaff'], ['dagger']] },
        { options: [['component_pouch'], ['arcane_focus']] },
        { options: [['scholars_pack'], ['explorers_pack']] }
      ]
    },
    features: [
      { level: 1, name: 'Lanzamiento de Conjuros', description: 'Usas Inteligencia. Dependes de un grimorio como recipiente material arcano.' },
      { level: 1, name: 'Recuperación Arcana', description: 'Una vez por día tras descanso corto, restauras espacios mágicos gastados equivalentes a la mitad de tu nivel de clase.' }
    ]
  }
};
