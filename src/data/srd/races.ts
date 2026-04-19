import type { AbilityKey } from './skills';

export interface RaceTrait {
  name: string;
  description: string;
}

export interface SubraceDefinition {
  id: string;
  name: string;
  description: string;
  abilityBonuses: Partial<Record<AbilityKey, number>>;
  traits: RaceTrait[];
  weaponProficiencies?: string[];
  armorProficiencies?: string[];
  extraCantrip?: boolean;
  flexibleAbilityCount?: number;
  flexibleSkillCount?: number;
  flexibleLanguageCount?: number;
  toolChoices?: string[];
}

export interface RaceDefinition {
  id: string;
  name: string;
  description: string;
  speed: number;
  size: 'Pequeño' | 'Mediano' | 'Grande';
  abilityBonuses: Partial<Record<AbilityKey, number>>;
  languages: string[];
  traits: RaceTrait[];
  subraces?: SubraceDefinition[];
  weaponProficiencies?: string[];
  flexibleAbilityCount?: number;
  flexibleSkillCount?: number;
  flexibleLanguageCount?: number;
  toolChoices?: string[];
}

export const SRD_RACES: Record<string, RaceDefinition> = {
  dwarf: {
    id: 'dwarf',
    name: 'Enano',
    description: 'Bravos y fuertes, los enanos son conocidos por su habilidad militar, su capacidad para soportar castigos físicos y tácticos, y su afición por la cerveza.',
    speed: 25,
    size: 'Mediano',
    abilityBonuses: { con: 2 },
    languages: ['Común', 'Enano'],
    toolChoices: ['Herramientas de herrero', 'Suministros de cervecero', 'Herramientas de albañil'],
    weaponProficiencies: ['Hacha de batalla', 'Hacha de mano', 'Martillo ligero', 'Martillo de guerra'],
    traits: [
      { name: 'Visión en la Oscuridad', description: 'Acostumbrado a la vida bajo tierra, tienes visión superior en condiciones de oscuridad y penumbra a menos de 60 pies.' },
      { name: 'Resistencia Enana', description: 'Tienes ventaja en tiradas de salvación contra veneno y resistencia al daño de veneno.' },
      { name: 'Entrenamiento en Combate Enano', description: 'Tienes competencia con el hacha de batalla, hacha de mano, martillo ligero y martillo de guerra.' }
    ],
    subraces: [
      {
        id: 'hill_dwarf',
        name: 'Enano de las Colinas',
        description: 'Tus sentidos son muy agudos y tu intuición profunda.',
        abilityBonuses: { wis: 1 },
        traits: [
          { name: 'Dureza Enana', description: 'Tus puntos de golpe máximos aumentan en 1, y aumentan en 1 más cada vez que subes de nivel.' }
        ]
      },
      {
        id: 'mountain_dwarf',
        name: 'Enano de las Montañas',
        description: 'Fuerte y resistente, acostumbrado a una vida ruda.',
        abilityBonuses: { str: 2 },
        armorProficiencies: ['Armadura Ligera', 'Armadura Media'],
        traits: [
          { name: 'Entrenamiento con Armaduras Enanas', description: 'Tienes competencia con las armaduras ligeras y medias.' }
        ]
      }
    ]
  },
  elf: {
    id: 'elf',
    name: 'Elfo',
    description: 'Un pueblo mágico de gracia sobrenatural, viviendo en el mundo sin pertenecer de todo a él.',
    speed: 30,
    size: 'Mediano',
    abilityBonuses: { dex: 2 },
    languages: ['Común', 'Élfico'],
    traits: [
      { name: 'Visión en la Oscuridad', description: 'Acostumbrado a los bosques en penumbra y el cielo nocturno, puedes ver en condiciones de oscuridad.' },
      { name: 'Sentidos Agudos', description: 'Tienes competencia en la habilidad Percepción.' },
      { name: 'Ancestros Feéricos', description: 'Tienes ventaja contra ser Hechizado, y la magia no puede ponerte a dormir.' },
      { name: 'Trance', description: 'No necesitas dormir. Meditas profundamente durante 4 horas y obtienes los beneficios de un descanso largo.' }
    ],
    subraces: [
      {
        id: 'high_elf',
        name: 'Alto Elfo',
        description: 'Tienes una mente afilada y dominio de al menos los principios básicos de la magia.',
        abilityBonuses: { int: 1 },
        weaponProficiencies: ['Espada larga', 'Espada corta', 'Arco corto', 'Arco largo'],
        extraCantrip: true,
        flexibleLanguageCount: 1,
        traits: [
          { name: 'Entrenamiento con Armas Élficas', description: 'Tienes competencia con la espada larga, espada corta, arco corto y arco largo.' },
          { name: 'Truco', description: 'Conoces un truco de tu elección de la lista del mago.' },
          { name: 'Idioma Adicional', description: 'Puedes hablar, leer y escribir un idioma adicional.' }
        ]
      },
      {
        id: 'wood_elf',
        name: 'Elfo de los Bosques',
        description: 'Tus sentidos e intuición son rápidos y tu paso furtivo es ligero.',
        abilityBonuses: { wis: 1 },
        weaponProficiencies: ['Espada larga', 'Espada corta', 'Arco corto', 'Arco largo'],
        traits: [
          { name: 'Pies Ligeros', description: 'Tu velocidad base al caminar aumenta a 35 pies.' },
          { name: 'Máscara de la Espesura', description: 'Puedes intentar esconderte aun cuando solamente estés ligeramente oscurecido por follaje u otros fenómenos naturales.' }
        ]
      },
      {
        id: 'drow',
        name: 'Elfo Oscuro (Drow)',
        description: 'Descendientes de una subraza exiliada al Underdark.',
        abilityBonuses: { cha: 1 },
        weaponProficiencies: ['Toke', 'Espada corta', 'Ballesta de mano'],
        traits: [
          { name: 'Visión en la Oscuridad Superior', description: 'Doble alcance de visión en la oscuridad (120 pies).' },
          { name: 'Sensibilidad a la Luz del Sol', description: 'Desventaja en ataque y percepción basados en vista si estás bajo luz solar directa.' },
          { name: 'Magia Drow', description: 'Conoces el truco Luces Danzantes (y luego Fuego Feérico a nivel 3).' }
        ]
      }
    ]
  },
  halfling: {
    id: 'halfling',
    name: 'Mediano',
    description: 'Los medianos sobreviven en un mundo lleno de criaturas más grandes evitando ser vistos, o pasando desapercibidos.',
    speed: 25,
    size: 'Pequeño',
    abilityBonuses: { dex: 2 },
    languages: ['Común', 'Mediano'],
    traits: [
      { name: 'Suerte', description: 'Cuando obtienes un 1 natural en el d20, puedes volver a tirar, pero debes usar la nueva tirada.' },
      { name: 'Bravura', description: 'Tienes ventaja en tiradas de salvación contra ser asustado.' },
      { name: 'Agilidad Halfling', description: 'Puedes moverte a través del espacio de cualquier criatura que sea de un tamaño superior al tuyo.' }
    ],
    subraces: [
      {
        id: 'lightfoot_halfling',
        name: 'Mediano Piesligeros',
        description: 'Fáciles de pasar desapercibidos, e inclinados al sigilo.',
        abilityBonuses: { cha: 1 },
        traits: [
          { name: 'Sigilo Natural', description: 'Puedes intentar esconderte incluso cuando estás oculto solo por una criatura un tamaño mayor que el tuyo.' }
        ]
      },
      {
        id: 'stout_halfling',
        name: 'Mediano Fornido',
        description: 'Son más duros de pelar. Algunos dicen que tienen sangre de enano.',
        abilityBonuses: { con: 1 },
        traits: [
          { name: 'Resistencia de los Fornidos', description: 'Tienes ventaja en salvaciones contra veneno y resistencia al daño por veneno.' }
        ]
      }
    ]
  },
  human: {
    id: 'human',
    name: 'Humano',
    description: 'Los humanos son la más joven de las razas comunes, de llegadas tardías al mundo y cortas vidas, pero también son los más innovadores y adaptables pioneros.',
    speed: 30,
    size: 'Mediano',
    abilityBonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 },
    languages: ['Común'],
    flexibleLanguageCount: 1,
    traits: []
  },
  dragonborn: {
    id: 'dragonborn',
    name: 'Dracónido',
    description: 'Venidos de dragones, estos imponentes humanoides vagan por el mundo como guerreros invencibles y sirvientes devotos.',
    speed: 30,
    size: 'Mediano',
    abilityBonuses: { str: 2, cha: 1 },
    languages: ['Común', 'Dracónico'],
    traits: [
      { name: 'Ancestros Dracónicos', description: 'Tienes un ancestro dracónico que otorga tus habilidades de aliento y resistencia elemental.' }
    ],
    subraces: [
      {
        id: 'dragonborn_black', name: 'Dracónido Negro', description: 'Aliento: Línea de Ácido (Salvación de Des). Resistencia: Ácido.', abilityBonuses: {},
        traits: [{ name: 'Afinidad Dracónica: Negro', description: 'Arma de Aliento de Ácido y Resistencia al Ácido.' }]
      },
      {
        id: 'dragonborn_blue', name: 'Dracónido Azul', description: 'Aliento: Línea de Relámpago (Salvación de Des). Resistencia: Relámpago.', abilityBonuses: {},
        traits: [{ name: 'Afinidad Dracónica: Azul', description: 'Arma de Aliento de Relámpago y Resistencia al Relámpago.' }]
      },
      {
        id: 'dragonborn_brass', name: 'Dracónido Oropel', description: 'Aliento: Línea de Fuego (Salvación de Des). Resistencia: Fuego.', abilityBonuses: {},
        traits: [{ name: 'Afinidad Dracónica: Oropel', description: 'Arma de Aliento de Fuego y Resistencia al Fuego.' }]
      },
      {
        id: 'dragonborn_bronze', name: 'Dracónido Bronce', description: 'Aliento: Línea de Relámpago (Salvación de Des). Resistencia: Relámpago.', abilityBonuses: {},
        traits: [{ name: 'Afinidad Dracónica: Bronce', description: 'Arma de Aliento de Relámpago y Resistencia al Relámpago.' }]
      },
      {
        id: 'dragonborn_copper', name: 'Dracónido Cobre', description: 'Aliento: Línea de Ácido (Salvación de Des). Resistencia: Ácido.', abilityBonuses: {},
        traits: [{ name: 'Afinidad Dracónica: Cobre', description: 'Arma de Aliento de Ácido y Resistencia al Ácido.' }]
      },
      {
        id: 'dragonborn_gold', name: 'Dracónido Oro', description: 'Aliento: Cono de Fuego (Salvación de Des). Resistencia: Fuego.', abilityBonuses: {},
        traits: [{ name: 'Afinidad Dracónica: Oro', description: 'Arma de Aliento de Fuego y Resistencia al Fuego.' }]
      },
      {
        id: 'dragonborn_green', name: 'Dracónido Verde', description: 'Aliento: Cono de Veneno (Salvación de Con). Resistencia: Veneno.', abilityBonuses: {},
        traits: [{ name: 'Afinidad Dracónica: Verde', description: 'Arma de Aliento de Veneno y Resistencia al Veneno.' }]
      },
      {
        id: 'dragonborn_red', name: 'Dracónido Rojo', description: 'Aliento: Cono de Fuego (Salvación de Des). Resistencia: Fuego.', abilityBonuses: {},
        traits: [{ name: 'Afinidad Dracónica: Rojo', description: 'Arma de Aliento de Fuego y Resistencia al Fuego.' }]
      },
      {
        id: 'dragonborn_silver', name: 'Dracónido Plata', description: 'Aliento: Cono de Frío (Salvación de Con). Resistencia: Frío.', abilityBonuses: {},
        traits: [{ name: 'Afinidad Dracónica: Plata', description: 'Arma de Aliento de Frío y Resistencia al Frío.' }]
      },
      {
        id: 'dragonborn_white', name: 'Dracónido Blanco', description: 'Aliento: Cono de Frío (Salvación de Con). Resistencia: Frío.', abilityBonuses: {},
        traits: [{ name: 'Afinidad Dracónica: Blanco', description: 'Arma de Aliento de Frío y Resistencia al Frío.' }]
      }
    ]
  },
  gnome: {
    id: 'gnome',
    name: 'Gnomo',
    description: 'La energía y el entusiasmo por la vida de los gnomos brilla a través de cada centímetro de su pequeño cuerpo.',
    speed: 25,
    size: 'Pequeño',
    abilityBonuses: { int: 2 },
    languages: ['Común', 'Gnómico'],
    traits: [
      { name: 'Visión en la Oscuridad', description: 'Tienes visión superior en condiciones de oscuridad y penumbra a 60 pies.' },
      { name: 'Astucia Gnómica', description: 'Tienes ventaja en tiradas de salvación de Inteligencia, Sabiduría y Carisma contra Magia.' }
    ],
    subraces: [
      {
        id: 'forest_gnome',
        name: 'Gnomo de los Bosques',
        description: 'Un don especial para mezclarse con el entorno y la ilusión.',
        abilityBonuses: { dex: 1 },
        traits: [
          { name: 'Ilusionista Nato', description: 'Conoces el truco Ilusión Menor.' },
          { name: 'Hablar con Bestias', description: 'Puedes comunicarte de manera básica con bestias pequeñas.' }
        ]
      },
      {
        id: 'rock_gnome',
        name: 'Gnomo de la Roca',
        description: 'Creativos y muy resilientes.',
        abilityBonuses: { con: 1 },
        traits: [
          { name: 'Saber del Artífice', description: 'Añades el doble de tu bonificador de competencia a pruebas de Historia relacionadas a artefactos.' },
          { name: 'Manitas', description: 'Tienes competencia con herramientas de artesano (herramientas de hojalatero). Puedes crear pequeños mecanismos.' }
        ]
      }
    ]
  },
  half_elf: {
    id: 'half_elf',
    name: 'Semielfo',
    description: 'Poseen la curiosidad de sus ancestros humanos y la magia de su legado élfico.',
    speed: 30,
    size: 'Mediano',
    abilityBonuses: { cha: 2 },
    flexibleAbilityCount: 2,
    languages: ['Común', 'Élfico'],
    flexibleLanguageCount: 1,
    flexibleSkillCount: 2,
    traits: [
      { name: 'Visión en la Oscuridad', description: '60 pies.' },
      { name: 'Ancestros Feéricos', description: 'Ventaja contra Encantamientos y no puedes ser dormido por magia.' },
      { name: 'Versatilidad con Habilidades', description: 'Ganas competencia en dos habilidades a tu elección.' }
    ]
  },
  half_orc: {
    id: 'half_orc',
    name: 'Semiorco',
    description: 'Criaturas de gran fuerza cuya ferocidad arde a través de sus cicatrices de guerra.',
    speed: 30,
    size: 'Mediano',
    abilityBonuses: { str: 2, con: 1 },
    languages: ['Común', 'Orco'],
    traits: [
      { name: 'Visión en la Oscuridad', description: '60 pies.' },
      { name: 'Amenazante', description: 'Ganas competencia en la habilidad Intimidación.' },
      { name: 'Resistencia Implacable', description: 'Cuando te reducen a 0 PG pero no mueres directamente, quedas a 1 PG en su lugar (1 vez por descanso largo).' },
      { name: 'Ataques Salvajes', description: 'Cuando sacas un crítico con arma cuerpo a cuerpo, puedes tirar un dado de daño de arma extra.' }
    ]
  },
  tiefling: {
    id: 'tiefling',
    name: 'Tiefling',
    description: 'Humanos que cargan con el legado y la apariencia maldita de linajes infernales en sus venas.',
    speed: 30,
    size: 'Mediano',
    abilityBonuses: { cha: 2, int: 1 },
    languages: ['Común', 'Infernal'],
    traits: [
      { name: 'Visión en la Oscuridad', description: '60 pies debido a tu legado infernal.' },
      { name: 'Resistencia Infernal', description: 'Tienes resistencia al daño por fuego.' },
      { name: 'Legado Infernal', description: 'Conoces el truco Taumaturgia.' }
    ]
  }
};
