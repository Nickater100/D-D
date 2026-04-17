import { type Background2024 } from '../types/dnd';

export const SRD_RACES = [
  {
    id: "dragonborn", name: "Dracónido", speed: 30, image: "/assets/warrior.png",
    description: "Nacidos de los dragones, como su nombre indica, los dracónidos caminan orgullosos por un mundo que los recibe con incomprensión y temor. Forjados por un linaje antiguo que les otorga escamas relucientes y un aliento letal, mantienen un fuerte sentido del honor arraigado en la tradición familiar.",
    alignment: "Los dracónidos tienden hacia los extremos, haciendo una elección consciente de un lado u otro. La mayoría son buenos.",
    size: "Mediano (Aprox. 250 libras y más de 6 pies).",
    bonuses: { str: 0, cha: 0, dex: 0, con: 0, int: 0, wis: 0 },
    features: [
      { name: "Aliento Dracónico", description: "Puedes exhalar una ráfaga de energía elemental en un cono de 15 pies.", source: "raza" },
      { name: "Resistencia Dracónica", description: "Tienes resistencia al tipo de daño asociado a tu ancestro dragón.", source: "raza" }
    ]
  },
  {
    id: "dwarf", name: "Enano", speed: 25, image: "/assets/warrior.png",
    description: "Audaces y robustos, los enanos son conocidos como guerreros hábiles, mineros y trabajadores de la piedra y el metal. Sus reinos cavados en lo profundo de las montañas resuenan con el choque de los martillos y el clamor del combate contra las amenazas del inframundo.",
    alignment: "La mayoría de los enanos son legales, creyendo firmemente en los beneficios de una sociedad bien ordenada.",
    size: "Mediano.",
    bonuses: { con: 0, str: 0, dex: 0, int: 0, wis: 0, cha: 0 },
    features: [
      { name: "Resiliencia Enana", description: "Ventaja en tiradas de salvación contra veneno y resistencia al daño de veneno.", source: "raza" },
      { name: "Visión en la Oscuridad", description: "Puedes ver en la penumbra como si fuera luz brillante a 60 pies.", source: "raza" },
      { name: "Sentido de la Piedra", description: "Tienes ventaja en pruebas de historia relacionadas con el origen de trabajos en piedra.", source: "raza" }
    ]
  },
  {
    id: "elf", name: "Elfo", speed: 30, image: "/assets/mage.png",
    description: "Un pueblo mágico de gracia sobrenatural, los elfos viven en lugares de belleza etérea. Poseen una afinidad natural con la magia, las estrellas y la naturaleza libre. Suelen ser distantes y perciben el mundo a través del velo de su inmensa longevidad.",
    alignment: "Aman la libertad y la variedad, inclinándose hacia los aspectos más amables del caos.",
    size: "Mediano, constitución delgada.",
    bonuses: { dex: 0, str: 0, con: 0, int: 0, wis: 0, cha: 0 },
    features: [
      { name: "Linaje Feérico", description: "Ventaja en salvaciones contra ser Hechizado y la magia no puede dormirte.", source: "raza" },
      { name: "Trance", description: "No necesitas dormir. Meditas profundamente durante 4 horas para obtener el descanso.", source: "raza" },
      { name: "Visión en la Oscuridad", description: "Puedes ver en la penumbra como si fuera luz brillante a 60 pies.", source: "raza" }
    ]
  },
  {
    id: "gnome", name: "Gnomo", speed: 25, image: "/assets/rogue.png",
    description: "Trozos vivos de energía e inventiva, los gnomos disfrutan de la vida como ningún otro. Creadores de ilusiones, artesanos ingeniosos e incansables investigadores, ven cada día como un regalo repleto de maravillas por descubrir.",
    alignment: "Tienden hacia naturalezas buenas y caóticas y son de buen corazón.",
    size: "Pequeño (Entre 3 y 4 pies de altura).",
    bonuses: { int: 0, str: 0, dex: 0, con: 0, wis: 0, cha: 0 },
    features: [
      { name: "Astucia de Gnomo", description: "Ventaja en todas las salvaciones de Inteligencia, Sabiduría y Carisma contra magia.", source: "raza" },
      { name: "Visión en la Oscuridad", description: "Puedes ver en la penumbra como si fuera luz brillante a 60 pies.", source: "raza" }
    ]
  },
  {
    id: "half-elf", name: "Semielfo", speed: 30, image: "/assets/mage.png",
    description: "Atrapados entre dos mundos, los semielfos poseen tanto la curiosidad incesante de la humanidad como la gracia reservada de su linaje feérico. No suelen encajar del todo en ninguna sociedad, deambulando como diplomáticos, aventureros o solitarios exiliados.",
    alignment: "Comparten la vena caótica y amante de la libertad de su herencia élfica.",
    size: "Mediano.",
    bonuses: { cha: 0, con: 0, dex: 0, str: 0, int: 0, wis: 0 },
    features: [
      { name: "Linaje Feérico", description: "Ventaja en salvaciones contra ser hechizado y la magia no puede dormirte.", source: "raza" },
      { name: "Versatilidad", description: "Obtienes competencia en dos habilidades a tu elección.", source: "raza" },
      { name: "Visión en la Oscuridad", description: "Puedes ver en la penumbra como si fuera luz brillante a 60 pies.", source: "raza" }
    ]
  },
  {
    id: "half-orc", name: "Semiorco", speed: 30, image: "/assets/warrior.png",
    description: "Ferozmente leales e imparables en la batalla, los semiorcos cargan con la fuerza bruta de las tribus pero poseen corazones que sienten intensamente. Suelen sobrevivir en los márgenes del mundo impulsados por su resistencia legendaria.",
    alignment: "Heredan la tendencia hacia el caos y la supervivencia brutal, rara vez son legales o puramente buenos.",
    size: "Mediano (Volumen enorme).",
    bonuses: { str: 0, con: 0, dex: 0, int: 0, wis: 0, cha: 0 },
    features: [
      { name: "Resistencia Incansable", description: "Cuando caes a 0 HP y no mueres, puedes quedarte a 1 HP (1 vez por descanso largo).", source: "raza" },
      { name: "Ataques Salvajes", description: "Al sacar un crítico, puedes tirar uno de los dados de daño una vez más y sumarlo.", source: "raza" },
      { name: "Visión en la Oscuridad", description: "Puedes ver en la penumbra como si fuera luz brillante a 60 pies.", source: "raza" }
    ]
  },
  {
    id: "halfling", name: "Mediano", speed: 25, image: "/assets/rogue.png",
    description: "Pequeños, intrépidos y sorprendentemente ágiles, los medianos sobreviven gracias a la suerte, la audacia y su férreo amor por las alegrías sencillas del hogar y una buena comida... antes de embarcarse en aventuras increíbles.",
    alignment: "Legales buenos, amables, bondadosos y compasivos.",
    size: "Pequeño.",
    bonuses: { dex: 0, str: 0, con: 0, int: 0, wis: 0, cha: 0 },
    features: [
      { name: "Suertudo", description: "Al sacar un 1 natural en un ataque o salvación, puedes volver a tirar el dado.", source: "raza" },
      { name: "Valiente", description: "Ventaja en salvaciones contra ser asustado.", source: "raza" },
      { name: "Agilidad Mediana", description: "Puedes moverte a través del espacio de cualquier criatura de tamaño superior al tuyo.", source: "raza" }
    ]
  },
  {
    id: "human", name: "Humano", speed: 30, image: "/assets/warrior.png",
    description: "La raza más adaptable, ambiciosa y variable del mundo. Con vidas cortas en comparación con otros, los humanos arden llenos de propósitos y son capaces de fundar grandes imperios, forjándose caminos estelares y dominando cualquier disciplina.",
    alignment: "Sin tendencia marcada; pueden ser virtuosos protectores o crueles tiranos.",
    size: "Mediano.",
    bonuses: { str: 0, dex: 0, con: 0, int: 0, wis: 0, cha: 0 },
    features: [
      { name: "Recurso Humano", description: "Cuentas con ventaja en una prueba de habilidad en la que tengas competencia (1 vez por descanso largo).", source: "raza" },
      { name: "Dote de Origen Extra", description: "Obtienes una dote de origen adicional de tu elección.", source: "raza" }
    ]
  },
  {
    id: "tiefling", name: "Tiflin", speed: 30, image: "/assets/mage.png",
    description: "Marcados por un linaje infernal y portadores de cuernos u ojos ígneos oscuros, los tiflin nunca escapan a la sospecha del resto. Sin embargo, su origen no dicta su alma, permitiéndoles emplear su magia sombría y encanto innato para bien o para mal.",
    alignment: "Su aislamiento les empuja hacia el caos, pero forjan su propio destino moral.",
    size: "Mediano.",
    bonuses: { cha: 0, int: 0, str: 0, dex: 0, con: 0, wis: 0 },
    features: [
      { name: "Resistencia Infernal", description: "Tienes resistencia al daño de fuego.", source: "raza" },
      { name: "Legado Infernal", description: "Conoces el truco Taumaturgia. A niveles superiores obtienes Reprensión Infernal y Oscuridad.", source: "raza" },
      { name: "Visión en la Oscuridad", description: "Puedes ver en la penumbra como si fuera luz brillante a 60 pies.", source: "raza" }
    ]
  }
];

export const SRD_BACKGROUNDS_2024: Background2024[] = [
  { id: "acolyte", name: "Acólito", description: "Has pasado tu vida al servicio de un templo.", abilityOptions: ["int", "wis", "cha"], featId: "magic_initiate", skills: ["Perspicacia", "Religión"] },
  { id: "artisan", name: "Artesano", description: "Eres experto en la creación de objetos.", abilityOptions: ["str", "dex", "int"], featId: "crafter", skills: ["Perspicacia", "Persuasión"] },
  { id: "charlatan", name: "Charlatán", description: "Engañas a otros para tu beneficio.", abilityOptions: ["dex", "int", "cha"], featId: "skilled", skills: ["Engaño", "Juego de Manos"] },
  { id: "criminal", name: "Criminal", description: "Vives al margen de la ley.", abilityOptions: ["dex", "int", "cha"], featId: "alert", skills: ["Engaño", "Sigilo"] },
  { id: "entertainer", name: "Artista", description: "Vives para el aplauso del público.", abilityOptions: ["str", "dex", "cha"], featId: "musician", skills: ["Acrobacias", "Interpretación"] },
  { id: "farmer", name: "Granjero", description: "Has trabajado la tierra con tus propias manos.", abilityOptions: ["str", "con", "wis"], featId: "tough", skills: ["Naturaleza", "Trato con Animales"] },
  { id: "guard", name: "Guardia", description: "Proteges a los demás del peligro.", abilityOptions: ["str", "dex", "wis"], featId: "alert", skills: ["Atletismo", "Percepción"] },
  { id: "guide", name: "Guía", description: "Conoces los caminos salvajes.", abilityOptions: ["dex", "con", "wis"], featId: "magic_initiate", skills: ["Sigilo", "Supervivencia"] },
  { id: "hermit", name: "Ermitaño", description: "Buscas el conocimiento en la soledad.", abilityOptions: ["con", "wis", "cha"], featId: "healer", skills: ["Medicina", "Religión"] },
  { id: "merchant", name: "Mercader", description: "Conoces el valor de cada moneda.", abilityOptions: ["con", "int", "cha"], featId: "lucky", skills: ["Perspicacia", "Persuasión"] },
  { id: "noble", name: "Noble", description: "Naciste en el poder y el privilegio.", abilityOptions: ["str", "int", "cha"], featId: "skilled", skills: ["Historia", "Persuasión"] },
  { id: "sage", name: "Sabio", description: "Buscas la verdad en los libros antiguos.", abilityOptions: ["con", "int", "wis"], featId: "magic_initiate", skills: ["Arcanos", "Historia"] },
  { id: "sailor", name: "Marinero", description: "El mar es tu verdadero hogar.", abilityOptions: ["str", "dex", "wis"], featId: "tavern_brawler", skills: ["Atletismo", "Percepción"] },
  { id: "scribe", name: "Escriba", description: "Documentas la historia que otros viven.", abilityOptions: ["dex", "int", "wis"], featId: "skilled", skills: ["Investigación", "Percepción"] },
  { id: "soldier", name: "Soldado", description: "La guerra es lo único que conoces.", abilityOptions: ["str", "dex", "con"], featId: "savage_attacker", skills: ["Atletismo", "Intimidación"] },
  { id: "wayfarer", name: "Vagabundo", description: "Creciste en las calles de la gran ciudad.", abilityOptions: ["dex", "int", "wis"], featId: "lucky", skills: ["Investigación", "Sigilo"] }
];

export const SRD_CLASSES = [
  { 
    id: "barbarian", name: "Bárbaro", hit_die: 12, group: "warrior", saves: ["Fuerza", "Constitución"],
    description: "Guerreros formidables impulsados por una Furia visceral que les permite soportar e infligir daño masivo. Su conexión con sus instintos animales los hace casi imparables.",
    subclasses: [
      { id: "berserker", name: "Senda del Berserker", desc: "Te entregas a la furia ciega, convirtiéndote en una máquina de matar que ignora el dolor." },
      { id: "totem", name: "Guerrero Totémico", desc: "Aceptas un espíritu animal (Oso, Águila, Lobo) que te otorga proezas sobrenaturales en combate." }
    ]
  },
  { 
    id: "bard", name: "Bardo", hit_die: 8, group: "rogue", saves: ["Destreza", "Carisma"],
    description: "Magos inspiradores cuya seducción y oratoria son capaces de tejer la magia de la mismísima creación. Maestros del encanto, la música y poseedores de miles de secretos.",
    subclasses: [
      { id: "lore", name: "Colegio del Conocimiento", desc: "Coleccionistas de hechizos e historias de todas las disciplinas. Desenfocan a los enemigos con palabras cortantes." },
      { id: "valor", name: "Colegio del Valor", desc: "Trovadores guerreros que inspiran a sus aliados en el frente recitando viejas epopeyas heroicas." }
    ]
  },
  { 
    id: "cleric", name: "Clérigo", hit_die: 8, group: "mage", saves: ["Sabiduría", "Carisma"],
    description: "Sacerdotes bendecidos con magia divina de sus dioses. En combate son curanderos excelentes, defensores armados acérrimos e invocadores de milagros.",
    subclasses: [
      { id: "life", name: "Dominio de la Vida", desc: "Excelentes curanderos que devuelven la vitalidad y reviven a sus aliados caídos al borde de la muerte." },
      { id: "light", name: "Dominio de la Luz", desc: "Conductos de destrucción divina que incineran la oscuridad y asedian con fuego purificador." },
      { id: "trickery", name: "Dominio del Engaño", desc: "Otorgan invisibilidad, ilusiones y evasión táctica favorecidos por deidades caóticas." }
    ]
  },
  { 
    id: "druid", name: "Druida", hit_die: 8, group: "mage", saves: ["Inteligencia", "Sabiduría"],
    description: "Guardianes nómadas del equilibrio con aptitud para emplear hechizos primitivos o transformar su propia carne en la de las bestias salvajes.",
    subclasses: [
      { id: "moon", name: "Círculo de la Luna", desc: "Maestros en la metamorfosis, cambian a formas de bestias formidables (Osos, Lobos) para destrozar al enemigo." },
      { id: "land", name: "Círculo de la Tierra", desc: "Místicos conservadores de la naturaleza que canalizan poderosa magia del clima y terrenos controlados." }
    ]
  },
  { 
    id: "fighter", name: "Guerrero", hit_die: 10, group: "warrior", saves: ["Fuerza", "Constitución"],
    description: "Especialistas incontestables en el uso de todo tipo de armamento y armaduras pesadas. Ninguna otra clase rivaliza con su versatilidad bruta militar cuerpo a cuerpo.",
    subclasses: [
      { id: "champion", name: "Campeón", desc: "Fuerza militar perfeccionada. Sus golpes son devastadores y consiguen impactos críticos con mayor brutalidad." },
      { id: "battlemaster", name: "Maestro de Batalla", desc: "Tácticos que usan maniobras de superioridad para desarmar, distraer y desangrar a sus atacantes." },
      { id: "eldritch_knight", name: "Caballero Arcano", desc: "Complementan el acero con abjuraciones mágicas para volverse bastiones inquebrantables impregnados de fuego." }
    ]
  },
  { 
    id: "monk", name: "Monje", hit_die: 8, group: "warrior", saves: ["Fuerza", "Destreza"],
    description: "Maestros del Ki y las artes marciales impecables. Combaten mayormente desarmados, moviéndose con una velocidad antinatural por el campo de batalla.",
    subclasses: [
      { id: "open_hand", name: "Mano Abierta", desc: "Artistas marciales definitivos. Pueden empujar y noquear a sus víctimas usando solo sus palmas." },
      { id: "shadow", name: "Camino de la Sombra", desc: "Asesinos místicos que se teletransportan entre las sombras, cegando y aturdiendo en sigilo." }
    ]
  },
  { 
    id: "paladin", name: "Paladín", hit_die: 10, group: "warrior", saves: ["Sabiduría", "Carisma"],
    description: "Caballeros sacros obligados por juramentos sagrados para castigar el mal. Combinan las mejores armaduras y ataques mágicos devastadores con dones para aliviar las heridas.",
    subclasses: [
      { id: "devotion", name: "Juramento de Devoción", desc: "Caballeros honorables de luz pura, la encarnación de la justicia divina. Inmunes a encantos." },
      { id: "vengeance", name: "Juramento de Venganza", desc: "Castigadores brutales que cazan al mayor de los males sin importar la pureza puritana de matar." },
      { id: "ancients", name: "Juramento de los Antiguos", desc: "Guardianes de la vida feérica y la luz natural. Su aura rechaza atrozmente la magia enemiga." }
    ]
  },
  { 
    id: "ranger", name: "Explorador", hit_die: 10, group: "warrior", saves: ["Fuerza", "Destreza"],
    description: "Hábiles tiradores y rastreadores insuperables. Usan la naturaleza para cazar de forma letal a sus más fervientes enemigos o merodear invisiblemente por el bosque natural.",
    subclasses: [
      { id: "hunter", name: "Cazador", desc: "Protectores formidables que se especializan en aniquilar hordas o criaturas gargantuescas." },
      { id: "beastmaster", name: "Señor de las Bestias", desc: "Cuentan con un animal feroz mágicamente vinculado (Lobo, Oso, Cuervo) que pelea a su lado." }
    ]
  },
  { 
    id: "rogue", name: "Pícaro", hit_die: 8, group: "rogue", saves: ["Destreza", "Inteligencia"],
    description: "Oportunistas tácticos y letales atacantes furtivos. Nadie desarma trampas, roba información y apuñala bajo las sombras mejor que ellos.",
    subclasses: [
      { id: "thief", name: "Ladrón", desc: "Maestros del robo, la escalada rápida y el uso impredecible de objetos en pleno furor del combate." },
      { id: "assassin", name: "Asesino", desc: "Su primer golpe antes de ser detectados resulta regularmente letal con un daño crítico espeluznante." },
      { id: "arcane_trickster", name: "Embaucador Arcano", desc: "Suman trucos ilusorios para despistar a sus presas y carterear a distancia con manos invisibles." }
    ]
  },
  { 
    id: "sorcerer", name: "Hechicero", hit_die: 6, group: "mage", saves: ["Constitución", "Carisma"],
    description: "Lanzadores de voluntad férrea cuyo inmenso poder arcano emana de su propia línea de sangre. Manipulan y tuercen sus hechizos instintivamente, siendo un espectáculo aterrador en duelo.",
    subclasses: [
      { id: "draconic", name: "Linaje Dracónico", desc: "Su herencia repitiliana les otorga escamas rígidas y potentes beneficios hacia su respectivo elemento." },
      { id: "wild_magic", name: "Magia Salvaje", desc: "Desatan fuerzas inestables maravillosas (y a veces peligrosas) sin poder controlarlo del todo." }
    ]
  },
  { 
    id: "warlock", name: "Brujo", hit_die: 8, group: "mage", saves: ["Sabiduría", "Carisma"],
    description: "Buscadores de misterio mortal que obtienen potestad arcana a cambio de un peligroso pacto con entidades celestiales, infernales o arcanas de otro mundo.",
    subclasses: [
      { id: "fiend", name: "El Infernal", desc: "Pacto abrazado a las llamas del Averno; absorben salud vital de las cenizas de sus víctimas al asesinarlas." },
      { id: "great_old_one", name: "El Primigenio", desc: "Pacto con horrores arcanos o tentaculares, dotando al portador de capacidades psíquicas intrusivas." },
      { id: "archfey", name: "El Archihada", desc: "Pacto con señoríos del bosque oscuros. Encantan y asustan a multitudes robando sus mentes temporalmente." }
    ]
  },
  { 
    id: "wizard", name: "Mago", hit_die: 6, group: "mage", saves: ["Inteligencia", "Sabiduría"],
    description: "Académicos puros cuyas proezas matemáticas moldean al mismísimo cosmos a través de sus tomos arcanos. Vulnerables cuerpo a cuerpo, pero portadores de la mágia más destructiva existente.",
    subclasses: [
      { id: "evocation", name: "Evocación", desc: "Centrados en dañar horriblemente, sus bolas de fuego jamás lastiman a sus propios aliados por accidente." },
      { id: "abjuration", name: "Abjuración", desc: "Tejedores de muros arcanos y escudos mentales, una pared intocable para hechizos hostiles e impactos." },
      { id: "necromancy", name: "Nigromancia", desc: "Cosechan fuerza vital para curarse y profanan cadáveres convirtiéndolos en súbditos zombis." }
    ]
  }
];
