export const SRD_RACES = [
  {
    id: "dragonborn", name: "Dracónido", speed: 30, image: "/assets/warrior.png",
    alignment: "Los dracónidos tienden hacia los extremos, haciendo una elección consciente de un lado u otro de la guerra cósmica entre el bien y el mal. La mayoría son buenos, pero los que eligen el mal suelen ser terribles.",
    size: "Los dracónidos miden bastante más de 6 pies de altura y pesan en promedio casi 250 libras. Tu tamaño es Mediano.",
    bonuses: { str: 2, cha: 1, dex: 0, con: 0, int: 0, wis: 0 }
  },
  {
    id: "dwarf", name: "Enano", speed: 25, image: "/assets/warrior.png",
    alignment: "La mayoría de los enanos son legales, creyendo firmemente en los beneficios de una sociedad bien ordenada.",
    size: "Los enanos miden entre 4 y 5 pies de altura y pesan alrededor de 150 libras. Tu tamaño es Mediano.",
    bonuses: { con: 2, str: 0, dex: 0, int: 0, wis: 0, cha: 0 }
  },
  {
    id: "elf", name: "Elfo", speed: 30, image: "/assets/mage.png",
    alignment: "Los elfos aman la libertad, la variedad y la autoexpresión, por lo que se inclinan fuertemente hacia los aspectos más amables del caos. Valoran y protegen la libertad de los demás, por lo que la mayoría son buenos.",
    size: "Los elfos miden entre 5 y más de 6 pies y tienen constituciones delgadas. Tu tamaño es Mediano.",
    bonuses: { dex: 2, str: 0, con: 0, int: 0, wis: 0, cha: 0 }
  },
  {
    id: "gnome", name: "Gnomo", speed: 25, image: "/assets/rogue.png",
    alignment: "A los gnomos les encanta aprender, experimentar y la diversión por lo que tienden hacia las naturalezas buenas y caóticas y son de buen corazón.",
    size: "Los gnomos miden entre 3 y 4 pies y pesan alrededor de 40 libras. Tu tamaño es Pequeño.",
    bonuses: { int: 2, str: 0, dex: 0, con: 0, wis: 0, cha: 0 }
  },
  {
    id: "half-elf", name: "Semielfo", speed: 30, image: "/assets/mage.png",
    alignment: "Los semielfos comparten la vena caótica de su herencia élfica. Algunos valoran la libertad personal y la expresión creativa.",
    size: "Los semielfos miden más o menos lo mismo que los humanos. Tu tamaño es Mediano.",
    bonuses: { cha: 2, con: 1, dex: 1, str: 0, int: 0, wis: 0 }
  },
  {
    id: "half-orc", name: "Semiorco", speed: 30, image: "/assets/warrior.png",
    alignment: "Los semiorcos heredan la tendencia hacia el caos de sus ancestros, y no suelen ser buenos.",
    size: "Los semiorcos son de un volumen mayor a los humanos. Tu tamaño es Mediano.",
    bonuses: { str: 2, con: 1, dex: 0, int: 0, wis: 0, cha: 0 }
  },
  {
    id: "halfling", name: "Mediano", speed: 25, image: "/assets/rogue.png",
    alignment: "La mayoría de los medianos son legales buenos, amables, bondadosos y compasivos. Odian ver a los demás sufrir y jamás toleran la opresión.",
    size: "Los medianos miden unos 3 pies y pesan 40 libras. Tu tamaño es Pequeño.",
    bonuses: { dex: 2, str: 0, con: 0, int: 0, wis: 0, cha: 0 }
  },
  {
    id: "human", name: "Humano", speed: 30, image: "/assets/warrior.png",
    alignment: "Los humanos no tienden hacia ningún alineamiento particular. Caben tanto los mejores guardianes como los peores villanos.",
    size: "Los humanos varían ampliamente en altura y peso. Tu tamaño es Mediano.",
    bonuses: { str: 1, dex: 1, con: 1, int: 1, wis: 1, cha: 1 }
  },
  {
    id: "tiefling", name: "Tiflin", speed: 30, image: "/assets/mage.png",
    alignment: "Puede que los tiflin no tengan un destino marcado, pero su herencia a menudo los aísla, dándoles una tendencia al caos.",
    size: "Los tiflin tienen la misma complexión que los humanos. Tu tamaño es Mediano.",
    bonuses: { cha: 2, int: 1, str: 0, dex: 0, con: 0, wis: 0 }
  }
];

export const SRD_CLASSES = [
  { id: "barbarian", name: "Bárbaro", hit_die: 12, group: "warrior", saves: ["Fuerza", "Constitución"] },
  { id: "bard", name: "Bardo", hit_die: 8, group: "rogue", saves: ["Destreza", "Carisma"] },
  { id: "cleric", name: "Clérigo", hit_die: 8, group: "mage", saves: ["Sabiduría", "Carisma"] },
  { id: "druid", name: "Druida", hit_die: 8, group: "mage", saves: ["Inteligencia", "Sabiduría"] },
  { id: "fighter", name: "Guerrero", hit_die: 10, group: "warrior", saves: ["Fuerza", "Constitución"] },
  { id: "monk", name: "Monje", hit_die: 8, group: "warrior", saves: ["Fuerza", "Destreza"] },
  { id: "paladin", name: "Paladín", hit_die: 10, group: "warrior", saves: ["Sabiduría", "Carisma"] },
  { id: "ranger", name: "Explorador", hit_die: 10, group: "warrior", saves: ["Fuerza", "Destreza"] },
  { id: "rogue", name: "Pícaro", hit_die: 8, group: "rogue", saves: ["Destreza", "Inteligencia"] },
  { id: "sorcerer", name: "Hechicero", hit_die: 6, group: "mage", saves: ["Constitución", "Carisma"] },
  { id: "warlock", name: "Brujo", hit_die: 8, group: "mage", saves: ["Sabiduría", "Carisma"] },
  { id: "wizard", name: "Mago", hit_die: 6, group: "mage", saves: ["Inteligencia", "Sabiduría"] }
];
