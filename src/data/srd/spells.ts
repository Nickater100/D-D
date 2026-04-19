// ============================================================
// GRAN GRIMORIO SRD - Player's Handbook 5e (2014)
// Capítulo 11: Conjuros — Niveles 0, 1 y 2
// ============================================================

export type SpellSchool =
  | 'Abjuración'
  | 'Adivinación'
  | 'Conjuración'
  | 'Encantamiento'
  | 'Evocación'
  | 'Ilusión'
  | 'Nigromancia'
  | 'Transmutación';

export type SpellClass =
  | 'bard'
  | 'cleric'
  | 'druid'
  | 'paladin'
  | 'ranger'
  | 'sorcerer'
  | 'warlock'
  | 'wizard';

export interface SpellDefinition {
  id: string;
  name: string;
  level: number;               // 0 = truco/cantrip
  school: SpellSchool;
  castingTime: string;
  range: string;
  components: string;          // 'V', 'V, S', 'V, S, M (...)' etc.
  duration: string;
  concentration: boolean;
  classes: SpellClass[];
  description: string;
  higherLevel?: string;        // Efecto al lanzar con espacio superior
  ritual?: boolean;
}

// ============================================================
// NIVEL 0 — TRUCOS (Cantrips)
// ============================================================
export const SPELLS_LEVEL_0: SpellDefinition[] = [
  {
    id: 'acid_splash', name: 'Salpicadura de Ácido', level: 0,
    school: 'Conjuración', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Lanzas una burbuja de ácido. Elige una criatura a 60 pies o dos criaturas adyacentes. El objetivo debe superar una salvación de Destreza o recibir 1d6 de daño por ácido. A nivel 5: 2d6. A nivel 11: 3d6. A nivel 17: 4d6.'
  },
  {
    id: 'blade_ward', name: 'Guardia de Hoja', level: 0,
    school: 'Abjuración', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '1 asalto', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Extiendes tu mano y trazas un signo de protección. Hasta el final de tu próximo turno, tienes resistencia al daño de armas contundentes, perforantes y cortantes infligido por ataques de arma.'
  },
  {
    id: 'booming_blade', name: 'Hoja Atronadora', level: 0,
    school: 'Evocación', castingTime: '1 acción', range: '5 pies',
    components: 'V, M (un arma)', duration: '1 asalto', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Como parte de la acción, realizas un ataque con arma cuerpo a cuerpo. Si el ataque acierta, el objetivo sufre daño normal y queda envuelto en energía atronadora. Si el objetivo se mueve voluntariamente antes del inicio de tu siguiente turno, recibe 1d8 de daño de trueno. A nivel 5: +1d8 al golpe y 2d8 si se mueve. A nivel 11: +2d8/3d8. A nivel 17: +3d8/4d8.'
  },
  {
    id: 'chill_touch', name: 'Toque Gélido', level: 0,
    school: 'Nigromancia', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: '1 asalto', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Creas una mano espectral y esquelética en el espacio de la criatura objetivo. Realiza un ataque de conjuro a distancia. Si acierta, inflige 1d8 de daño necrótico e impide que el objetivo recupere PG hasta el inicio de tu siguiente turno. Si el objetivo es un no-muerto, también tiene desventaja en tiradas de ataque contra ti hasta el final de tu siguiente turno. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'control_flames', name: 'Controlar Llamas', level: 0,
    school: 'Transmutación', castingTime: '1 acción', range: '60 pies',
    components: 'S', duration: 'Instantáneo o 1 hora', concentration: false,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Eliges fuego no mágico en un cubo de 5 pies. Puedes expandirlo, apagarlo, darle una nueva forma, o hacer que emita luz diferente. El fuego expandido dura 1 hora.'
  },
  {
    id: 'create_bonfire', name: 'Crear Hoguera', level: 0,
    school: 'Conjuración', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Invocas una hoguera mágica en un espacio de 5 pies. Las criaturas en el espacio deben superar una salvación de Destreza o recibir 1d8 de daño por fuego. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'dancing_lights', name: 'Luces Danzantes', level: 0,
    school: 'Evocación', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un trozo de fósforo o una luciérnaga)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Creas hasta cuatro luces del tamaño de una antorcha dentro del alcance. Se mueven hasta 60 pies por asalto como acción adicional. Pueden combinarse en una figura vaga de criatura mediana.'
  },
  {
    id: 'druidcraft', name: 'Arte Druídico', level: 0,
    school: 'Transmutación', castingTime: '1 acción', range: '30 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['druid'],
    description: 'Susurras a los espíritus de la naturaleza para producir uno de estos efectos: predices el tiempo para 24 horas, haces florecer una planta, creas un efecto sensorial menor, o enciendes o apaga una vela pequeña.'
  },
  {
    id: 'eldritch_blast', name: 'Descarga Sobrenatural', level: 0,
    school: 'Evocación', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['warlock'],
    description: 'Un rayo de energía crujiente y chirriante choca contra una criatura dentro del alcance. Realiza un ataque de conjuro a distancia. Si acierta, el objetivo recibe 1d10 de daño de fuerza. A nivel 5 lanzas 2 rayos, a nivel 11 tres rayos, y a nivel 17 cuatro rayos. Puedes dirigir los rayos a la misma criatura o a diferentes criaturas.'
  },
  {
    id: 'fire_bolt', name: 'Descarga de Fuego', level: 0,
    school: 'Evocación', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Lanzas une mota de fuego a una criatura o un objeto dentro del alcance. Realiza un ataque de conjuro a distancia. Si acierta inflige 1d10 de daño por fuego. Los objetos inflamables que no se lleven encima se incendian. A nivel 5: 2d10. A nivel 11: 3d10. A nivel 17: 4d10.'
  },
  {
    id: 'friends', name: 'Amigos', level: 0,
    school: 'Encantamiento', castingTime: '1 acción', range: 'Personal',
    components: 'S, M (una pequeña cantidad de maquillaje)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Durante su duración, tienes ventaja en todas las pruebas de Carisma dirigidas contra una criatura no hostil. Cuando el hechizo termina, la criatura se da cuenta de que usaste magia para influir en su humor y puede volverse hostil.'
  },
  {
    id: 'frostbite', name: 'Mordedura del Frío', level: 0,
    school: 'Evocación', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Causas que el frío entumezca a un objetivo. La criatura debe superar una salvación de Constitución o recibir 1d6 de daño frío y tiene desventaja en el siguiente ataque de arma que haga antes del final de su siguiente turno. Escala: 2d6 (nv5), 3d6 (nv11), 4d6 (nv17).'
  },
  {
    id: 'guidance', name: 'Orientación', level: 0,
    school: 'Adivinación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric', 'druid'],
    description: 'Tocas a una criatura voluntaria. Una vez antes de que el hechizo termine, el objetivo puede tirar un d4 y añadir el número tirado a una prueba de habilidad a su elección. Puede tirar el dado antes o después de hacer la prueba.'
  },
  {
    id: 'light', name: 'Luz', level: 0,
    school: 'Evocación', castingTime: '1 acción', range: 'Toque',
    components: 'V, M (un fragmento de fósforo o una luciérnaga)', duration: '1 hora', concentration: false,
    classes: ['bard', 'cleric', 'sorcerer', 'wizard'],
    description: 'Tocas un objeto de 10 pies o menor. Hasta que el hechizo termine, emite luz brillante en un radio de 20 pies y luz tenue 20 pies adicionales. La luz puede ser de cualquier color. Cubrir el objeto bloquea la luz. Si alcanzas a un ser hostil, debe superar una salvación de Destreza para evitar el efecto.'
  },
  {
    id: 'mage_hand', name: 'Mano de Mago', level: 0,
    school: 'Conjuración', castingTime: '1 acción', range: '30 pies',
    components: 'V, S', duration: '1 minuto', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Creas una mano espectral y flotante dentro del alcance. La mano desaparece cuando el hechizo termina o si la alejas más de 30 pies de ti. Puede manipular objetos, abrir contenedores no bloqueados, guardar o recuperar objetos de contenedores abiertos, o verter el contenido de un frasco. No puede atacar, activar objetos mágicos o transportar más de 10 libras.'
  },
  {
    id: 'mending', name: 'Reparar', level: 0,
    school: 'Transmutación', castingTime: '1 minuto', range: 'Toque',
    components: 'V, S, M (dos imanes)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'sorcerer', 'wizard'],
    description: 'Este hechizo repara una sola rotura o corte en un objeto que toques. Mientras la rotura o corte no sea mayor de 1 pie en cualquier dimensión, lo remiendas, no dejando rastro alguno de la anterior avería. Este hechizo no puede rehacer artículos mágicos.'
  },
  {
    id: 'message', name: 'Mensaje', level: 0,
    school: 'Transmutación', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un pedazo corto de cobre de alambre)', duration: '1 asalto', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Apuntas con el dedo hacia una criatura y susurras un mensaje. El objetivo (y solo el objetivo) lo escucha y puede responder susurrando al final de su turno. Puedes usarlo para conversar secretamente en distancia.'
  },
  {
    id: 'minor_illusion', name: 'Ilusión Menor', level: 0,
    school: 'Ilusión', castingTime: '1 acción', range: '30 pies',
    components: 'S, M (un trozo de lana de oveja)', duration: '1 minuto', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Creas un sonido o una imagen de un objeto en el alcance. Un sonido puede ser tan suave como un susurro o tan alto como un grito. Saber que es ilusión requiere una prueba de Investigación contra CD de tu conjuro.'
  },
  {
    id: 'poison_spray', name: 'Pulverizador de Veneno', level: 0,
    school: 'Conjuración', castingTime: '1 acción', range: '10 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Extiendes tu mano hacia una criatura y lanzas una nube de gas venenoso. La criatura debe superar una salvación de Constitución o recibir 1d12 de daño de veneno. Escala: 2d12 (nv5), 3d12 (nv11), 4d12 (nv17).'
  },
  {
    id: 'prestidigitation', name: 'Prestidigitación', level: 0,
    school: 'Transmutación', castingTime: '1 acción', range: '10 pies',
    components: 'V, S', duration: 'Hasta 1 hora', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Este hechizo permite pequeños efectos mágicos: crear chispas, limpiar o ensuciar, enfriar/calentar/dar sabor a un cubo de masa nonmágica, hacer un emblema, crear un objeto inofensivo temporal, etc. Hasta tres efectos a la vez.'
  },
  {
    id: 'produce_flame', name: 'Producir Llama', level: 0,
    school: 'Conjuración', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '10 minutos', concentration: false,
    classes: ['druid'],
    description: 'Una llama chisporroteante aparece en tu mano. Ilumina 10 pies de luz brillante y 10 pies más de luz tenue. Puedes lanzarla como acción bonus: ataque de conjuro a distancia 30 pies. Si acierta: 1d8 fuego. Se apaga al lanzar. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'ray_of_frost', name: 'Rayo de Escarcha', level: 0,
    school: 'Evocación', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Un rayo frío de color azul-blanco se proyecta hacia una criatura dentro del alcance. Realiza un ataque de conjuro a distancia. Si acierta, inflige 1d8 de daño por frío y la velocidad del objetivo se reduce 10 pies hasta el comienzo de tu siguiente turno. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'resistance', name: 'Resistencia', level: 0,
    school: 'Abjuración', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una capa de tela diminuta)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric', 'druid'],
    description: 'Tocas a una criatura voluntaria. Una vez, antes de que el hechizo termine, el objetivo puede tirar un d4 y sumar el resultado a una tirada de salvación a su elección.'
  },
  {
    id: 'sacred_flame', name: 'Llama Sagrada', level: 0,
    school: 'Evocación', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'La radiación de tipo llama desciende sobre una criatura que puedas ver dentro del alcance. El objetivo debe superar una tirada de salvación de Destreza o recibir 1d8 de daño radiante. El objetivo no se beneficia de cobertura en esta tirada de salvación. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'shillelagh', name: 'Shillelagh', level: 0,
    school: 'Transmutación', castingTime: '1 acción adicional', range: 'Toque',
    components: 'V, S, M (muérdago, un trébol de cuatro hojas y una maza o bastón)', duration: '1 minuto', concentration: false,
    classes: ['druid'],
    description: 'La madera de una maza o bastón que estés sosteniendo se imbue con la fuerza de la naturaleza. Por la duración del hechizo, puedes usar el modificador de tu habilidad mágica en lugar del de Fuerza para los ataques y daño. El daño es 1d6+mod.'
  },
  {
    id: 'shocking_grasp', name: 'Agarre Descargante', level: 0,
    school: 'Evocación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'El rayo salta de tu mano a una criatura que intentes tocar. Realiza un ataque de conjuro cuerpo a cuerpo contra el objetivo. Tienes ventaja si el objetivo lleva armadura de metal. Si aciertas, inflige 1d8 de daño de relámpago y el objetivo no puede usar reacciones hasta el comienzo de su siguiente turno. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'spare_the_dying', name: 'Salvar al Moribundo', level: 0,
    school: 'Nigromancia', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Tocas a una criatura viva con 0 Puntos de Golpe. La criatura queda estable. Este hechizo no tiene efecto en muertos vivientes ni constructos.'
  },
  {
    id: 'thaumaturgy', name: 'Taumaturgia', level: 0,
    school: 'Transmutación', castingTime: '1 acción', range: '30 pies',
    components: 'V', duration: 'Hasta 1 minuto', concentration: false,
    classes: ['cleric'],
    description: 'Manifiestas una pequeña maravilla: tus ojos brillan, tu voz retumba, llamas vacilan, la tierra tiembla levemente. Puedes hasta tener tres efectos activos; crear un nuevo efecto más cancela el más antiguo.'
  },
  {
    id: 'thunderclap', name: 'Trueno', level: 0,
    school: 'Evocación', castingTime: '1 acción', range: '5 pies',
    components: 'S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Creas un estampido de sonido atronador que puede oírse a 100 pies. Cada criatura en un radio de 5 pies —excepto tú— debe superar una salvación de Constitución o recibir 1d6 de daño de trueno. Escala: 2d6 (nv5), 3d6 (nv11), 4d6 (nv17).'
  },
  {
    id: 'toll_the_dead', name: 'Doblar por los Muertos', level: 0,
    school: 'Nigromancia', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'warlock', 'wizard'],
    description: 'El sonido de una campana funesta llena el aire de un objetivo visible. El objetivo debe superar una salvación de Sabiduría o recibir 1d8 de daño necrótico. Si el objetivo tiene menos PG que su máximo, recibe 1d12 en su lugar. Escala: 2dx (nv5), 3dx (nv11), 4dx (nv17).'
  },
  {
    id: 'true_strike', name: 'Golpe Certero', level: 0,
    school: 'Adivinación', castingTime: '1 acción', range: '30 pies',
    components: 'S', duration: 'Concentración, hasta 1 asalto', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Extiendes tu mano y apuntas con el dedo hacia el objetivo en el alcance. Tu magia te otorga una visión breve de las defensas del objetivo. En tu próximo turno, tienes ventaja en tu primer ataque contra el objetivo, siempre que el hechizo no haya terminado.'
  },
  {
    id: 'vicious_mockery', name: 'Burla Mordaz', level: 0,
    school: 'Encantamiento', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['bard'],
    description: 'Lanzas un insulto imbuido de magia a una criatura que puedas ver, hiriéndola con tus palabras. El objetivo debe superar una tirada de salvación de Sabiduría o recibir 1d4 de daño psíquico y tiene desventaja en el próximo ataque que haga antes del fin de su siguiente turno. Escala: 2d4 (nv5), 3d4 (nv11), 4d4 (nv17).'
  },
  {
    id: 'word_of_radiance', name: 'Palabra de Radiance', level: 0,
    school: 'Evocación', castingTime: '1 acción', range: '5 pies',
    components: 'V, M (un símbolo sagrado)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Pronuncias una palabra divina y la energía radiante brilla de ti. Cada criatura de tu elección que puedas ver en un radio de 5 pies debe superar una salvación de Constitución o recibir 1d6 de daño radiante. Escala: 2d6 (nv5), 3d6 (nv11), 4d6 (nv17).'
  }
];

// ============================================================
// NIVEL 1
// ============================================================
export const SPELLS_LEVEL_1: SpellDefinition[] = [
  {
    id: 'alarm', name: 'Alarma', level: 1, ritual: true,
    school: 'Abjuración', castingTime: '1 minuto', range: '30 pies',
    components: 'V, S, M (un campanilla y un trozo de alambre de plata fino)', duration: '8 horas', concentration: false,
    classes: ['ranger', 'wizard'],
    description: 'Estableces una alarma mágica contra intrusos. Elige una puerta, ventana u área de 20 pies de diámetro. La alarma suena durante 1 minuto si una criatura Diminuta o mayor toca el área sin pronunciar la contraseña.'
  },
  {
    id: 'animal_friendship', name: 'Amistad con los Animales', level: 1,
    school: 'Encantamiento', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (un bocado de comida)', duration: '24 horas', concentration: false,
    classes: ['bard', 'druid', 'ranger'],
    description: 'Convences a un animal de que no eres una amenaza. El animal debe superar una salvación de Sabiduría (CD de tu conjuro) o quedar encantado. Un animal con inteligencia de 4 o mayor no puede ser hechizado así.'
  },
  {
    id: 'armor_of_agathys', name: 'Armadura de Agathys', level: 1,
    school: 'Abjuración', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (una copa de agua)', duration: '1 hora', concentration: false,
    classes: ['warlock'],
    description: 'Una fuerza mágica protectora te rodea, manifestándose como hielo espectal. Ganas 5 PG temporales. Mientras tengas esos PG, cualquier criatura que te golpee cuerpo a cuerpo recibe 5 de daño frío. A niveles superiores: +5 PG temporales y +5 daño por nivel de hechizo.'
  },
  {
    id: 'arms_of_hadar', name: 'Brazos de Hadar', level: 1,
    school: 'Conjuración', castingTime: '1 acción', range: 'Personal (10 pies)',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['warlock'],
    description: 'Invocas el poder del Hadar, el Hambre Oscura. Tentáculos brotan de ti. Cada criatura en 10 pies debe superar salvación de Fuerza o recibir 2d6 necrótico y no puede usar reacciones hasta su siguiente turno. Éxito: la mitad de daño. A niveles superiores: +2d6 por nivel extra.'
  },
  {
    id: 'bane', name: 'Maldecir', level: 1,
    school: 'Encantamiento', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (una gota de sangre)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'cleric'],
    description: 'Hasta tres criaturas de tu elección que puedas ver deben superar una salvación de Carisma. Cada objetivo que falle restará 1d4 de sus tiradas de ataque y salvaciones hasta que el hechizo termine. A niveles superiores: afecta una criatura más por nivel sobre el 1.'
  },
  {
    id: 'bless', name: 'Bendición', level: 1,
    school: 'Encantamiento', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (unas gotas de agua bendita)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric', 'paladin'],
    description: 'Bendices hasta tres criaturas de tu elección que puedas ver. Siempre que un objetivo haga una tirada de ataque o salvación antes de que el hechizo termine, puede tirar un d4 y añadir el resultado. A niveles superiores: una criatura más por nivel sobre el 1.'
  },
  {
    id: 'burning_hands', name: 'Manos Ardientes', level: 1,
    school: 'Evocación', castingTime: '1 acción', range: 'Personal (cono de 15 pies)',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Cuando lanzas este hechizo, un delgado manto de llamas chisporrotea. Cada criatura en un cono de 15 pies debe hacer una salvación de Destreza. Falla: 3d6 de daño por fuego. Éxito: la mitad. Los objetos inflamables que no se lleven encima se incendian. A niveles superiores: +1d6 por nivel extra.'
  },
  {
    id: 'cause_fear', name: 'Causar Terror', level: 1,
    school: 'Nigromancia', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['warlock', 'wizard'],
    description: 'Despiertas el sentido de mortalidad en una criatura que puedas ver. El objetivo debe superar una salvación de Sabiduría o quedar asustado de ti hasta el final del hechizo. Al final de cada uno de sus turnos, puede volver a intentar la salvación.'
  },
  {
    id: 'charm_person', name: 'Hechizar Persona', level: 1,
    school: 'Encantamiento', castingTime: '1 acción', range: '30 pies',
    components: 'V, S', duration: '1 hora', concentration: false,
    classes: ['bard', 'druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Intentas hechizar a un humanoide que puedas ver. El objetivo debe superar una salvación de Sabiduría (con ventaja si estás en combate) o quedará hechizado. Mientras está hechizado, es tu amigo. Cuando el hechizo termina, sabe que fue hechizado. A niveles superiores: afecta una criatura más por nivel sobre el 1.'
  },
  {
    id: 'chromatic_orb', name: 'Orbe Cromático', level: 1,
    school: 'Evocación', castingTime: '1 acción', range: '90 pies',
    components: 'V, S, M (un diamante de al menos 50 po de valor)', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Lanzas una esfera de energía de 4 pulgadas de diámetro. Elige el tipo: ácido, frío, fuego, relámpago, veneno o trueno. Haz un ataque de conjuro a distancia. Si acierta, el objetivo recibe 3d8 del tipo elegido. A niveles superiores: +1d8 por nivel extra.'
  },
  {
    id: 'color_spray', name: 'Rociar Color', level: 1,
    school: 'Ilusión', castingTime: '1 acción', range: 'Personal (cono de 15 pies)',
    components: 'V, S, M (un pellizco de polvo o arena de color rojo, amarillo y azul)', duration: '1 asalto', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Un rayo deslumbrante de luz colorida parpadea desde tu mano. Tira 6d10; el total es cuántos PG de criaturas puedes afectar en cono de 15 pies. Las criaturas quedan cegadas hasta el final de tu siguiente turno. A niveles superiores: +2d10 por nivel extra.'
  },
  {
    id: 'command', name: 'Orden', level: 1,
    school: 'Encantamiento', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: '1 asalto', concentration: false,
    classes: ['cleric', 'paladin'],
    description: 'Le das una orden de una sola palabra a una criatura que puedas ver. El objetivo debe superar una salvación de Sabiduría o seguir la orden en su siguiente turno. Las órdenes comunes incluyen: "acércate", "huye", "cae", "para". A niveles superiores: una criatura adicional por nivel.'
  },
  {
    id: 'comprehend_languages', name: 'Comprende Idiomas', level: 1, ritual: true,
    school: 'Adivinación', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (un pellizco de hollín y sal)', duration: '1 hora', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Por la duración del hechizo, entiendes el significado literal de cualquier lengua hablada. También puedes entender cualquier lengua escrita que veas, pero debes estar en contacto con la superficie en que se escribe.'
  },
  {
    id: 'create_or_destroy_water', name: 'Crear o Destruir Agua', level: 1,
    school: 'Transmutación', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (un goteo de agua o unos granos de arena)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'druid'],
    description: 'Creas hasta 10 galones de agua limpia o destruyes un volumen idéntico de agua. Como alternativa, puedes crear lluvia en un cubo de 30 pies (apagando fuegos no mágicos) o destruir niebla. A niveles superiores: +10 galones por nivel.'
  },
  {
    id: 'cure_wounds', name: 'Curar Heridas', level: 1,
    school: 'Evocación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger'],
    description: 'Una criatura que toques recupera 1d8 + tu modificador de habilidad mágica en Puntos de Golpe. Este hechizo no tiene efecto en los muertos vivientes ni en los constructos. A niveles superiores: +1d8 por nivel de espacio.'
  },
  {
    id: 'detect_evil_and_good', name: 'Detectar el Bien y el Mal', level: 1,
    school: 'Adivinación', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['cleric', 'paladin'],
    description: 'Durante su duración, sabes si hay aberraciones, celestiales, elementales, etéreos, demonios, no-muertos o si hay lugares consagrados/mancillados a 30 pies de ti. Conoces el tipo general, pero no identidad específica.'
  },
  {
    id: 'detect_magic', name: 'Detectar Magia', level: 1, ritual: true,
    school: 'Adivinación', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'wizard'],
    description: 'Durante su duración, puedes sentir la presencia de magia en 30 pies. Si percibes magia, puedes usar tu acción para ver un aura tenue alrededor de cualquier criatura u objeto visible con magia activa, y conocer la escuela de esa magia.'
  },
  {
    id: 'detect_poison_and_disease', name: 'Detectar Veneno y Enfermedad', level: 1, ritual: true,
    school: 'Adivinación', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (hoja de acebo)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['cleric', 'druid', 'paladin', 'ranger'],
    description: 'Durante el tiempo de lanzamiento puedes detectar la presencia y lugar de venenos, criaturas venenosas y enfermedades en 30 pies. También identificas el tipo de veneno, criatura venenosa o enfermedad.'
  },
  {
    id: 'disguise_self', name: 'Disfrazarse', level: 1,
    school: 'Ilusión', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '1 hora', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Te hace aparecer diferente hasta que el hechizo termine o uses tu acción para terminarlo. Puedes parecer 1 pie más bajo o alto y mucho más delgado o gordo. Tu equipo también parece diferente. El efecto no logra engañar al tacto.'
  },
  {
    id: 'dissonant_whispers', name: 'Susurros Disonantes', level: 1,
    school: 'Encantamiento', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['bard'],
    description: 'Susurras una melodía discordante en la mente de una criatura de tu elección. El objetivo debe superar una salvación de Sabiduría o sufrir 3d6 de daño psíquico y debe usar su reacción para alejarse de ti. A niveles superiores: +1d6 por nivel.'
  },
  {
    id: 'divine_favor', name: 'Gracia Divina', level: 1,
    school: 'Evocación', castingTime: '1 acción adicional', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['paladin'],
    description: 'Tu oración te infunde con poder divino. Hasta que el hechizo termine, tus ataques con armas hacen 1d4 extra de daño radiante en cada impacto.'
  },
  {
    id: 'earth_tremor', name: 'Temblor de Tierra', level: 1,
    school: 'Evocación', castingTime: '1 acción', range: 'Personal (10 pies)',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'druid', 'sorcerer', 'wizard'],
    description: 'Causas temblores en el suelo en un radio de 10 pies. Cada criatura (excepto tú) en el área debe superar una salvación de Destreza o sufrir 1d6 contundente y caer derribada. Si el suelo es tierra suelta, se vuelve terrano difícil. A niveles superiores: +1d6 por nivel.'
  },
  {
    id: 'entangle', name: 'Enredar', level: 1,
    school: 'Conjuración', castingTime: '1 acción', range: '90 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid'],
    description: 'Hierba entrelazada, maleza y enredaderas brotan en un cuadrado de 20 pies. Las criaturas que entren o empiecen en el área deben superar una salvación de Fuerza o quedar restringidas mientras el hechizo siga activo. Se puede hacer una nueva tirada al final de cada turno.'
  },
  {
    id: 'expeditious_retreat', name: 'Retirada Expedita', level: 1,
    school: 'Transmutación', castingTime: '1 acción adicional', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Este hechizo te permite moverte a velocidad increíble. Cuando lanzas el hechizo y como acción adicional en cada uno de tus turnos hasta que termine, puedes llevar a cabo la acción Correr.'
  },
  {
    id: 'faerie_fire', name: 'Fuego de las Hadas', level: 1,
    school: 'Evocación', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'druid'],
    description: 'Cada objeto en un cubo de 20 pies dentro del alcance es delineado en luz azul, verde o violeta (tú decides). Las criaturas en el área que fallen una salvación de Destreza también quedan delineadas. Los blancos afectados emiten luz tenue y no pueden beneficiarse de la invisibilidad. Los ataques contra ellos tienen ventaja.'
  },
  {
    id: 'false_life', name: 'Vida Falsa', level: 1,
    school: 'Nigromancia', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (una pequeña cantidad de alcohol o licor destilado)', duration: '1 hora', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Aprovechando una imitación de la energía de la no-muerte, ganas 1d4+4 PG temporales. A niveles superiores: +5 PG temporales por nivel sobre el 1.'
  },
  {
    id: 'feather_fall', name: 'Caída de Pluma', level: 1,
    school: 'Transmutación', castingTime: '1 reacción', range: '60 pies',
    components: 'V, M (una pequeña pluma o trozo de pelusa)', duration: '1 minuto', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Eliges hasta cinco criaturas en caída libre dentro del alcance. La velocidad de descenso se reduce a 60 pies por asalto para la duración. Si la criatura aterriza antes de que el hechizo termine, no sufre daño por caída.'
  },
  {
    id: 'find_familiar', name: 'Encontrar un Familiar', level: 1, ritual: true,
    school: 'Conjuración', castingTime: '1 hora', range: '10 pies',
    components: 'V, S, M (10 po en carbón, incienso y hierbas que se consumen en la llama)', duration: 'Instantáneo', concentration: false,
    classes: ['wizard'],
    description: 'Obtienes los servicios de un familiar, un espíritu que toma una forma animal (búho, gato, cuervo, sapo, hurón, etc.). Es independiente y actúa en su propio turno en iniciativa. Cuando el familiar cae a 0 PG, desaparece y puede ser recontocado.'
  },
  {
    id: 'fog_cloud', name: 'Nube de Niebla', level: 1,
    school: 'Conjuración', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Creas una esfera de niebla de 20 pies de radio alrededor de un punto dentro del alcance centrada en el punto. La esfera se expande a la vuelta de las esquinas, y su área está fuertemente oscurecida. A niveles superiores: el radio aumenta en 20 pies por nivel.'
  },
  {
    id: 'goodberry', name: 'Buenas Bayas', level: 1,
    school: 'Transmutación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una ramita de muérdago)', duration: 'Instantáneo', concentration: false,
    classes: ['druid', 'ranger'],
    description: 'Hasta diez bayas son infundidas con magia si las tocas. Una criatura puede usar su acción para comer una baya, recuperando 1 PG. La baya también proporciona suficiente nutrición para sostener a la criatura por un día. Las bayas pierden su potencia si no se usan dentro de 24 horas.'
  },
  {
    id: 'grease', name: 'Grasa', level: 1,
    school: 'Conjuración', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un trozo de mantequilla de cerdo o grasa de cerdo)', duration: '1 minuto', concentration: false,
    classes: ['wizard'],
    description: 'Grasa espesa cubre el suelo en un cuadrado de 10 pies centrado en un punto dentro del alcance, convirtiéndola en terreno difícil durante la duración. Cuando aparece, cada criatura de pie en el área debe tener éxito en una salvación de Destreza o caer derribada.'
  },
  {
    id: 'guiding_bolt', name: 'Rayo Guía', level: 1,
    school: 'Evocación', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: '1 asalto', concentration: false,
    classes: ['cleric'],
    description: 'Un fogonazo de luz chisporrotea hacia una criatura de tu elección dentro del alcance. Realiza un ataque de conjuro a distancia. Si acierta, el objetivo recibe 4d6 de daño radiante y el próximo ataque hecho contra el objetivo antes del comienzo de tu siguiente turno tiene ventaja. A niveles superiores: +1d6 por nivel.'
  },
  {
    id: 'healing_word', name: 'Palabra Curativa', level: 1,
    school: 'Evocación', castingTime: '1 acción adicional', range: '60 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'druid'],
    description: 'Una criatura de tu elección dentro del alcance recupera PG iguales a 1d4 + tu modificador de habilidad mágica. Este hechizo no tiene efecto en los muertos vivientes ni constructos. A niveles superiores: +1d4 por nivel.'
  },
  {
    id: 'hellish_rebuke', name: 'Represalia Infernal', level: 1,
    school: 'Evocación', castingTime: '1 reacción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['warlock'],
    description: 'Apuntas con tu dedo y la criatura que te acaba de dañar está brevemente envuelta en llamas infernales. La criatura debe hacer una salvación de Destreza. Falla: 2d10 de daño por fuego. Éxito: la mitad. A niveles superiores: +1d10 por nivel.'
  },
  {
    id: 'heroism', name: 'Heroísmo', level: 1,
    school: 'Encantamiento', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'paladin'],
    description: 'Una criatura dispuesta que toques se impregna de valentía. Mientras el hechizo esté activo, la criatura es inmune a ser asustada y gana un número de PG temporales igual a tu modificador de habilidad mágica al comienzo de cada uno de sus turnos. A niveles superiores: una criatura más por nivel.'
  },
  {
    id: 'hex', name: 'Maleficio', level: 1,
    school: 'Encantamiento', castingTime: '1 acción adicional', range: '90 pies',
    components: 'V, S, M (el ojo petrificado de un tritón)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['warlock'],
    description: 'Maldices a una criatura dentro del alcance. Hasta que el hechizo termine, infliges 1d6 adicional de daño necrótico cuando la golpeas. Además, elige una habilidad cuando lances el hechizo: el objetivo tiene desventaja en pruebas de esa habilidad. Si el objetivo cae a 0 PG, puedes mover la maldición a otro. A niveles superiores: duración más larga.'
  },
  {
    id: 'hideous_laughter', name: 'Risa Horrorosa de Tasha', level: 1,
    school: 'Encantamiento', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (pequeñas tartas y una pluma', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'wizard'],
    description: 'Una criatura de tu elección que puedas ver dentro del alcance percibe todo como tremendamente cómico y cae en carcajadas si falla una salvación de Sabiduría. El objetivo queda derribado y en estado incapacitado e incapaz de levantarse. Puede intentar la salvación al final de cada turno.'
  },
  {
    id: 'hunters_mark', name: 'Marca del Cazador', level: 1,
    school: 'Adivinación', castingTime: '1 acción adicional', range: '90 pies',
    components: 'V', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['ranger'],
    description: 'Eliges una criatura que puedas ver dentro del alcance y la marcas místicamente como tu presa. Hasta que el hechizo termine, infliges 1d6 de daño adicional cuando la golpeas y tienes ventaja en pruebas de Sabiduría (Percepción) y (Supervivencia) para encontrarla. A niveles superiores: duración más larga.'
  },
  {
    id: 'ice_knife', name: 'Cuchillo de Hielo', level: 1,
    school: 'Conjuración', castingTime: '1 acción', range: '60 pies',
    components: 'V, M (una gota de agua o un pedazo de hielo)', duration: 'Instantáneo', concentration: false,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Creas un fragmento puntiagudo de hielo que lanzas a una criatura dentro del alcance. Ataque a distancia: 1d10 perforante en impacto. Luego explota en un radio de 5 pies: cada criatura en el área hace salvación de Destreza o recibe 2d6 frío. A niveles superiores: +1d6 frío por nivel.'
  },
  {
    id: 'identify', name: 'Identificar', level: 1, ritual: true,
    school: 'Adivinación', castingTime: '1 minuto', range: 'Toque',
    components: 'V, S, M (una perla de al menos 100 po y un búho)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'wizard'],
    description: 'Eliges un objeto que debes tocar durante el lanzamiento. Si el objeto es un objeto mágico u otro objeto mágico imbuido, aprendes sus propiedades y cómo usarlos, si requieren sintonía y cuántos cargas. También aprendes si los conjuros que afectan el objeto están activos.'
  },
  {
    id: 'illusory_script', name: 'Escritura Ilusoria', level: 1, ritual: true,
    school: 'Ilusión', castingTime: '1 minuto', range: 'Toque',
    components: 'S, M (tinta imbuida de magia de al menos 10 po)', duration: '10 días', concentration: false,
    classes: ['bard', 'warlock', 'wizard'],
    description: 'Escribes en papel u otro material. Solo las criaturas designadas pueden leer y comprender el texto verdadero. Todos los demás ven el texto como un texto diferente o garabatos sin sentido o glifos de un idioma diferente.'
  },
  {
    id: 'inflict_wounds', name: 'Causar Heridas', level: 1,
    school: 'Nigromancia', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Haz un ataque de conjuro cuerpo a cuerpo contra una criatura que puedas alcanzar. Si aciertas, el objetivo recibe 3d10 de daño necrótico. A niveles superiores: +1d10 por nivel.'
  },
  {
    id: 'jump', name: 'Saltar', level: 1,
    school: 'Transmutación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una pata de saltamontes)', duration: '1 minuto', concentration: false,
    classes: ['druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Tocas a una criatura. La distancia de salto de la criatura se triplica hasta que el hechizo termine.'
  },
  {
    id: 'longstrider', name: 'Zancada', level: 1,
    school: 'Transmutación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una pizca de tierra)', duration: '1 hora', concentration: false,
    classes: ['bard', 'druid', 'ranger', 'wizard'],
    description: 'Tocas a una criatura. Hasta que el hechizo termine, la velocidad objetivo de la criatura aumenta en 10 pies. A niveles superiores: una criatura adicional por nivel.'
  },
  {
    id: 'mage_armor', name: 'Armadura de Mago', level: 1,
    school: 'Abjuración', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (un trozo de cuero curtido)', duration: '8 horas', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Tocas a una criatura dispuesta que no lleva armadura. Hasta que el hechizo termine, la CA del objetivo es 13 + su modificador de Destreza. El hechizo termina si el objetivo se pone una armadura.'
  },
  {
    id: 'magic_missile', name: 'Proyectil Mágico', level: 1,
    school: 'Evocación', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Creas tres dardos brillantes de fuerza mágica. Cada dardo impacta a una criatura de tu elección que puedas ver dentro del alcance. Un dardo hace 1d4 + 1 de daño por fuerza. Los tres dardos golpean simultáneamente, y puedes apuntarlos a la misma criatura o a diferentes criaturas. A niveles superiores: un dardo más por nivel.'
  },
  {
    id: 'protection_from_evil_and_good', name: 'Protección del Bien y el Mal', level: 1,
    school: 'Abjuración', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (agua bendita o polvo de plata e hierro, que el hechizo consume)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['cleric', 'paladin', 'warlock', 'wizard'],
    description: 'Hasta que el hechizo termine, una criatura voluntaria que toques está protegida contra aberraciones, celestiales, elementales, feéricos, demonios y no-muertos. Los ataques de esas criaturas tienen desventaja contra el objetivo, y esas criaturas no pueden encantar, asustar o poseer al objetivo.'
  },
  {
    id: 'purify_food_and_drink', name: 'Purificar Comida y Bebida', level: 1, ritual: true,
    school: 'Transmutación', castingTime: '1 acción', range: '10 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'druid', 'paladin'],
    description: 'Toda la comida y bebida no mágica en una esfera de 5 pies de radio centrada en un punto que elijas dentro del alcance es purificada y queda libre de veneno y enfermedad.'
  },
  {
    id: 'ray_of_sickness', name: 'Rayo de Enfermedad', level: 1,
    school: 'Nigromancia', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Un rayo de energía enfermiza se proyecta hacia una criatura dentro del alcance. Haz un ataque de conjuro a distancia. Con un impacto, el objetivo recibe 2d8 de daño por veneno y debe hacer una salvación de Constitución o estar envenenado hasta el final de tu siguiente turno. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'sanctuary', name: 'Santuario', level: 1,
    school: 'Abjuración', castingTime: '1 acción adicional', range: '30 pies',
    components: 'V, S, M (un pequeño espejo de plata)', duration: '1 minuto', concentration: false,
    classes: ['cleric'],
    description: 'Guardas a una criatura dentro del alcance contra los ataques. Hasta que el hechizo termine, cualquier criatura que intente atacar al objetivo o use el objetivo como blanco de un hechizo dañino debe antes tener éxito en una salvación de Sabiduría. Si falla, tiene que elegir otro objetivo (o perder su acción).'
  },
  {
    id: 'shield', name: 'Escudo', level: 1,
    school: 'Abjuración', castingTime: '1 reacción', range: 'Personal',
    components: 'V, S', duration: '1 asalto', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Una barrera invisible de fuerza mágica aparece te protege. Hasta el comienzo de tu siguiente turno, tienes un bonificador de +5 a la CA, incluyendo contra el ataque desencadenante, y no recibes daño de proyectil mágico.'
  },
  {
    id: 'shield_of_faith', name: 'Escudo de la Fe', level: 1,
    school: 'Abjuración', castingTime: '1 acción adicional', range: '60 pies',
    components: 'V, S, M (un pequeño pergamino de texto sagrado)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['cleric', 'paladin'],
    description: 'Una barrera de energía protectora brillante parece rodear a la criatura de tu elección dentro del alcance, otorgando +2 a la CA durante la duración.'
  },
  {
    id: 'silent_image', name: 'Imagen Silenciosa', level: 1,
    school: 'Ilusión', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un trozo de lana de oveja)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Creas la imagen de un objeto, una criatura o algún otro fenómeno visible que quepa en un cubo de 15 pies. No produce ningún sonido, ni luz real, ni olor, ni ningún otro efecto sensorial. Cualquier inspección física verá que es ilusión con una prueba de Investigación (CD conjuros).'
  },
  {
    id: 'sleep', name: 'Dormir', level: 1,
    school: 'Encantamiento', castingTime: '1 acción', range: '90 pies',
    components: 'V, S, M (un pellizco de arena fina, pétalos de rosa o un grillo)', duration: '1 minuto', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'El hechizo envía criaturas en un sueño mágico. Tira 5d8; el total es cuántos PG de criaturas puedes afectar. Las criaturas en radio de 20 pies alrededor de un punto que elijas se ven afectadas, comenzando por el que tiene menos PG. Las criaturas se despiertan si reciben daño. A niveles superiores: +2d8 por nivel.'
  },
  {
    id: 'snare', name: 'Trampa', level: 1,
    school: 'Abjuración', castingTime: '1 minuto', range: 'Toque',
    components: 'S, M (25 pies de cuerda, que el hechizo consume)', duration: '8 horas', concentration: false,
    classes: ['druid', 'ranger', 'wizard'],
    description: 'Mientras lanzas este hechizo, usas la cuerda para crear un círculo con un diámetro de 5 pies en el suelo o piso. Cuando una criatura Diminuta o mayor entra en el área, la trampa se activa. La criatura debe superar una salvación de Destreza o quedar restringida.'
  },
  {
    id: 'speak_with_animals', name: 'Hablar con los Animales', level: 1, ritual: true,
    school: 'Adivinación', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '10 minutos', concentration: false,
    classes: ['bard', 'druid', 'ranger'],
    description: 'Obtienes la capacidad de comprender y comunicarte verbalmente con bestias durante la duración. El conocimiento y la conciencia de muchas bestias son limitados por su inteligencia, pero pueden al menos identificar criaturas cercanas y lugares de interés.'
  },
  {
    id: 'tasha_hideous_laughter', name: 'Risa Aterradora de Tasha', level: 1,
    school: 'Encantamiento', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (pequeñas tartas y una pluma que se agita en el aire)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'wizard'],
    description: 'Una criatura de tu elección que puedas ver dentro del alcance percibe todo como tremendamente cómico y cae en carcajadas si falla una salvación de Sabiduría. Está incapacitada y derribada durante la duración. Al final de cada turno el objetivo puede repetir la salvación.'
  },
  {
    id: 'thunderwave', name: 'Ola de Trueno', level: 1,
    school: 'Evocación', castingTime: '1 acción', range: 'Personal (cubo de 15 pies)',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'druid', 'sorcerer', 'wizard'],
    description: 'Una ola de fuerza truena de ti. Cada criatura en un cubo de 15 pies que surge de ti debe superar una salvación de Constitución. Falla: 2d8 de daño de trueno y es empujada 10 pies. Éxito: la mitad de daño y no es empujada. Los objetos no sostenidos son también empujados. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'unseen_servant', name: 'Sirviente Invisible', level: 1, ritual: true,
    school: 'Conjuración', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (una pizca de cuerda de nudos y madera)', duration: '1 hora', concentration: false,
    classes: ['bard', 'warlock', 'wizard'],
    description: 'Este hechizo crea a una fuerza invisible y sin mente a tu mando. El sirviente aparece en un punto no ocupado en el suelo dentro del alcance. Realiza tareas simples que le des, como coger, subir, bajar, limpiar, cuidar, abrir o cerrar. No puede luchar ni hacer más de 10 libras de trabajo.'
  },
  {
    id: 'witch_bolt', name: 'Rayo de Bruja', level: 1,
    school: 'Evocación', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (una ramita de un árbol alcanzado por un rayo)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Un rayo de energía de rayo crujiente forma un arco continuo entre tú y un objetivo dentro del alcance. Haz un ataque de conjuro a distancia. Con un impacto, el objetivo recibe 1d12 de daño de relámpago, y en cada uno de tus turnos que dure el hechizo, puedes usar tu acción para infligir 1d12 de relámpago automáticamente. A niveles superiores: +1d12 por nivel.'
  },
  {
    id: 'wrathful_smite', name: 'Golpe Furioso', level: 1,
    school: 'Evocación', castingTime: '1 acción adicional', range: 'Personal',
    components: 'V', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['paladin'],
    description: 'La próxima vez que impactes a una criatura con un ataque de arma melee durante la duración del hechizo, el ataque inflige 1d6 extra de daño psíquico. Además, si el objetivo es una criatura, debe superar una tirada de salvación de Sabiduría o quedar asustado de ti.'
  }
];

// ============================================================
// NIVEL 2
// ============================================================
export const SPELLS_LEVEL_2: SpellDefinition[] = [
  {
    id: 'acid_arrow', name: 'Flecha de Ácido de Melf', level: 2,
    school: 'Evocación', castingTime: '1 acción', range: '90 pies',
    components: 'V, S, M (polvo de ruibarbo y hígado de víbora)', duration: 'Instantáneo', concentration: false,
    classes: ['wizard'],
    description: 'Un destello deslumbrante de color verde chisporrotea hacia un objetivo dentro del alcance y estalla en una explosión de ácido. Haz un ataque de conjuro a distancia. Con un impacto, el objetivo recibe 4d4 de daño por ácido inmediatamente y 2d4 de daño por ácido al final de su siguiente turno. Con un fallo, la flecha salpica al objetivo con ácido por la mitad del daño, sin el daño posterior. A niveles superiores: +1d4 inmediato y +1d4 posterior por nivel.'
  },
  {
    id: 'aid', name: 'Auxilio', level: 2,
    school: 'Abjuración', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (una curita de tela y agua bendita)', duration: '8 horas', concentration: false,
    classes: ['cleric', 'paladin'],
    description: 'Tu hechizo fortalece y anima a tus aliados con firmeza y determinación. Elige hasta tres criaturas dentro del alcance. El máximo de PG de cada objetivo aumenta en 5 durante la duración. A niveles superiores: +5 PG por nivel sobre el 2.'
  },
  {
    id: 'alter_self', name: 'Alterar el Yo', level: 2,
    school: 'Transmutación', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Asumir una forma diferente. Cuando lanzas el hechizo, elige una de las opciones: Adaptación acuática (respiras agua), Cambio de apariencia (parecerte a otro), o Armas naturales (añades 1d6 de daño en ataques desarmados).'
  },
  {
    id: 'animal_messenger', name: 'Mensajero Animal', level: 2, ritual: true,
    school: 'Encantamiento', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (un bocado de comida)', duration: '24 horas', concentration: false,
    classes: ['bard', 'druid', 'ranger'],
    description: 'Con este hechizo, usas a un animal para entregar un mensaje. Elige una bestia Diminuta no hostil en tu alcance y da un descripcón de tu destino. El animal viajará e intentará entregar el mensaje. A niveles superiores: la duración se duplica por nivel.'
  },
  {
    id: 'arcane_lock', name: 'Cerradura Arcana', level: 2,
    school: 'Abjuración', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (oro en polvo de al menos 25 po)', duration: 'Hasta que se elimine', concentration: false,
    classes: ['wizard'],
    description: 'Tocas una superficie cerrada (puerta, ventana, cofre, libro). La cerradura se asegura mágicamente. La CD para abrirla con fuerza o desactivar trampas aumenta en 10. Aquellos que elijas pueden abrirla sin problema. Puedes establecer una contraseña que suprima el hechizo temporalmente.'
  },
  {
    id: 'augury', name: 'Agüero', level: 2, ritual: true,
    school: 'Adivinación', castingTime: '1 minuto', range: 'Personal',
    components: 'V, S, M (herramientas especiales de adivinación: huesos, varillas, cartas, etc.)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Al tirar talismanes, recibes un presagio de si el plan que contemplas en los próximos 30 minutos resultará en bien (Weal), daño (Woe), bien y daño (Weal y Woe) o ninguno. El hechizo no predice las acciones de otros personajes.'
  },
  {
    id: 'barkskin', name: 'Corteza de Árbol', level: 2,
    school: 'Transmutación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (un puñado de corteza de árbol)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['druid', 'ranger'],
    description: 'Tocas a una criatura voluntaria. La CA del objetivo no puede ser inferior a 16, independientemente de lo que lleven puesto, durante la duración.'
  },
  {
    id: 'blindness_deafness', name: 'Ceguera/Sordera', level: 2,
    school: 'Nigromancia', castingTime: '1 acción', range: '30 pies',
    components: 'V', duration: '1 minuto', concentration: false,
    classes: ['bard', 'cleric', 'sorcerer', 'wizard'],
    description: 'Puedes cegar o ensordecer a un enemigo. Elige una criatura dentro del alcance. Debe superar una salvación de Constitución o estar ciega o sorda (tú eliges). Al final de cada uno de los turnos del objetivo, puede repetir la salvación. A niveles superiores: una criatura más por nivel.'
  },
  {
    id: 'blur', name: 'Desenfoque', level: 2,
    school: 'Ilusión', castingTime: '1 acción', range: 'Personal',
    components: 'V', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Tu cuerpo se vuelve borroso, cambiando y ondeando para todos los que te ven. Durante la duración, cualquier criatura tiene desventaja en las tiradas de ataque contra ti. Una criatura que no dependa de la vista (visión ciega o vidente) goza de inmunidad a este efecto.'
  },
  {
    id: 'branding_smite', name: 'Golpe Ardiente', level: 2,
    school: 'Evocación', castingTime: '1 acción adicional', range: 'Personal',
    components: 'V', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['paladin'],
    description: 'La próxima vez que impactes a una criatura con un ataque de arma durante la duración del hechizo, el arma brilla con un fuego astral y el ataque hace 2d6 de daño radiante adicional y la criatura se vuelve visible si era invisible, y brillará durante la duración. A niveles superiores: +1d6 por nivel.'
  },
  {
    id: 'calm_emotions', name: 'Calmar las Emociones', level: 2,
    school: 'Encantamiento', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'cleric'],
    description: 'Intentas suprimir fuertes emociones en un grupo de personas. Cada humanoide en una esfera de 20 pies centrada en un punto que elijas dentro del alcance debe superar una salvación de Carisma. El objetivo se vuelve indiferente a los efectos de estar asustado o encantado, o a las hostilidades.'
  },
  {
    id: 'cloud_of_daggers', name: 'Nube de Dagas', level: 2,
    school: 'Conjuración', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un trozo de hierro)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Llenas un cubo de 5 pies vacío con un torbellino de dagas. Una criatura que entre en el área o empiece su turno ahí recibe 4d4 de daño cortante. A niveles superiores: +2d4 por nivel.'
  },
  {
    id: 'continual_flame', name: 'Llama Continua', level: 2,
    school: 'Evocación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (rubí en polvo de 50 po)', duration: 'Hasta que se elimine', concentration: false,
    classes: ['cleric', 'wizard'],
    description: 'Una llama aparece en un objeto que tocas. La llama parece normal pero no produce calor, no requiere oxígeno, e ilumina 20 pies de luz brillante y 20 más de luz tenue. No se puede apagar con agua u otros métodos mundanos.'
  },
  {
    id: 'crown_of_madness', name: 'Corona de la Locura', level: 2,
    school: 'Encantamiento', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Un humanoide de tu elección que puedas ver dentro del alcance debe superar una salvación de Sabiduría, o está encantado por ti durante la duración. La criatura encantada tiene que atacar a la criatura de tu elección al comienzo de cada uno de sus turnos (excepto tú). Requiere tu acción en cada turno para mantenerla bajo control.'
  },
  {
    id: 'darkness', name: 'Oscuridad', level: 2,
    school: 'Evocación', castingTime: '1 acción', range: '60 pies',
    components: 'V, M (pelo de un murciélago y una gota de brea)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'La oscuridad mágica se extiende de un punto que elijas dentro del alcance, llenando una esfera de 15 pies de radio. La oscuridad se extiende a la vuelta de las esquinas. Una criatura con visión en la oscuridad no puede ver a través de esta oscuridad mágica. Puedes adjuntarlo a un objeto.'
  },
  {
    id: 'darkvision', name: 'Visión en la Oscuridad', level: 2,
    school: 'Transmutación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una zanahoria seca o una piedra de ágata)', duration: '8 horas', concentration: false,
    classes: ['druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Tocas a una criatura voluntaria para otorgarle visión en la oscuridad. Durante la duración, esa criatura tiene visión en la oscuridad en un radio de 60 pies.'
  },
  {
    id: 'detect_thoughts', name: 'Detectar Pensamientos', level: 2,
    school: 'Adivinación', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (una moneda de cobre)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Durante la duración, puedes leer los pensamientos de ciertas criaturas. Cuando lanzas el hechizo, y como acción en cada turno hasta que el hechizo termine, puedes centrar tu mente en cualquier criatura que puedas ver a 30 pies para leer sus pensamientos superficiales.'
  },
  {
    id: 'dust_devil', name: 'Torbellino de Polvo', level: 2,
    school: 'Conjuración', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un pellizco de polvo)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Evocas un pequeño elemento del plano elemental aire que llena un cubo de 5 pies vacío en el alcance. El diablo de polvo dura mientras el hechizo esté activo. Cualquier criatura que termine su turno en el espacio del diablo de polvo debe realizar una salvación de Fuerza o recibir 1d8 de daño contundente. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'enhance_ability', name: 'Mejorar la Habilidad', level: 2,
    school: 'Transmutación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (pelo o plumas de un animal)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'cleric', 'druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Tocas a una criatura y le otorgas mejora. Elige uno: Fuerza del Oso (+2d6 PG temp y ventaja en pruebas de Fuerza), Gracia del Gato (ventaja en Destreza), Resistencia del Búfalo (ventaja en Con), Agudeza del Zorro (ventaja en Int), Sabiduría del Búho (ventaja en Sab), Carisma del Aguila (ventaja en Car).'
  },
  {
    id: 'enlarge_reduce', name: 'Agrandar/Reducir', level: 2,
    school: 'Transmutación', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (un pellizco de polvo de hierro)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Agrandar: El objetivo y equipo se duplican. Sus ataques de arma hacen 1d4 extra de daño. Reducir: El objetivo se reduce a la mitad. Sus ataques de arma hacen 1d4 menos de daño (mínimo 1). Afecta ventajas/desventajas en ciertos ataques.'
  },
  {
    id: 'enthrall', name: 'Fascinar', level: 2,
    school: 'Encantamiento', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: '1 minuto', concentration: false,
    classes: ['bard', 'warlock'],
    description: 'Pronuncias una diatriba fascinante hasta que el conjuro asalte. Las criaturas que puedas ver y que puedan oírte (hasta 60 pies) deben superar una salvación de Sabiduría o quedar fascinadas. El efecto termina si dejan de oírte o si reciben daño.'
  },
  {
    id: 'find_steed', name: 'Encontrar un Corcel', level: 2,
    school: 'Conjuración', castingTime: '10 minutos', range: '30 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['paladin'],
    description: 'Convocas un espíritu que asume la forma de un corcel inusualmente inteligente, fuerte y leal, creando un vínculo duradero contigo. Puede aparecer como un caballo de guerra, pony, camello, alce o mastín.'
  },
  {
    id: 'flaming_sphere', name: 'Esfera de Fuego', level: 2,
    school: 'Conjuración', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un poco de sebo, un trozo de azufre e incienso en polvo)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'wizard'],
    description: 'Una esfera de fuego de 5 pies de diámetro aparece en un espacio vacío de tu elección. Cualquier criatura que termine su turno dentro de 5 pies de la esfera debe superar una salvación de Destreza o recibir 2d6 de daño de fuego. Puedes moverla hasta 30 pies como acción adicional. A niveles superiores: +1d6 por nivel.'
  },
  {
    id: 'gentle_repose', name: 'Reposo Apacible', level: 2, ritual: true,
    school: 'Nigromancia', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una pizca de sal y una moneda de cobre colocada en cada ojo del cadáver)', duration: '10 días', concentration: false,
    classes: ['cleric', 'wizard'],
    description: 'Tocas un cadáver para protegerlo de la descomposición y evitar que se convierta en no-muerto durante la duración. El cadáver está preservado durante la duración del conjuro.'
  },
  {
    id: 'gust_of_wind', name: 'Ráfaga de Viento', level: 2,
    school: 'Evocación', castingTime: '1 acción', range: 'Personal (línea de 60 pies)',
    components: 'V, S, M (una legumbre)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Una línea de fuerte viento de 60 pies de largo y 10 pies de ancho sopla desde ti en la dirección de tu elección. Las criaturas en la línea deben superar una salvación de Fuerza o ser empujadas 15 pies. El viento se dispersa gases y vapores, apaga velas y objetos sin llama.'
  },
  {
    id: 'heat_metal', name: 'Calentar Metal', level: 2,
    school: 'Transmutación', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un trozo de hierro y una llama)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'druid'],
    description: 'Elige un objeto de metal manufacturado dentro del alcance. Haces el objeto brillantemente caliente. Cualquier criatura en contacto físico debe superar una salvación de Constitución o recibir 2d8 de daño por fuego. Puedes infligirlo de nuevo por acción adicional. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'hold_person', name: 'Paralizar Persona', level: 2,
    school: 'Encantamiento', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un pequeño trozo de hierro recto)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'cleric', 'druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Elige a un humanoide que puedas ver dentro del alcance. El objetivo debe superar una salvación de Sabiduría o quedar paralizado. Al final de cada uno de sus turnos puede intentar la salvación de nuevo. A niveles superiores: una criatura más por nivel.'
  },
  {
    id: 'invisibility', name: 'Invisibilidad', level: 2,
    school: 'Ilusión', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una pestaña envuelta en goma arábiga)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Una criatura que toques se vuelve invisible hasta que el hechizo termine. Todo lo que el objetivo esté vistiendo o llevando es invisible siempre y cuando esté en su persona. El hechizo termina para un objetivo que ataque o lance un hechizo. A niveles superiores: una criatura más por nivel.'
  },
  {
    id: 'knock', name: 'Abrir', level: 2,
    school: 'Transmutación', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Eliges un objeto dentro del alcance. Un candado mundano, un candado cerrado o bloqueado, o unos grilletes se abren. Cuando lances el conjuro, un ruido fuerte y resonante puede oírse hasta 300 pies de distancia.'
  },
  {
    id: 'lesser_restoration', name: 'Restauración Menor', level: 2,
    school: 'Abjuración', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger'],
    description: 'Tocas a una criatura y terminas una enfermedad o una condición que la afecte. La condición puede ser cegada, ensordecida, paralizada o envenenada.'
  },
  {
    id: 'levitate', name: 'Levitar', level: 2,
    school: 'Transmutación', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un pequeño lazo de cuero o un fragmento de hueso)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Una criatura o un objeto de tu elección que puedas ver asciende verticalmente hasta 20 pies y permanece allí. El objetivo puede moverse solo de forma horizontal. Tú o el objetivo pueden realizar una salvación de Constitución para terminar el efecto.'
  },
  {
    id: 'locate_animals_or_plants', name: 'Localizar Animales o Plantas', level: 2, ritual: true,
    school: 'Adivinación', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (pelo de un sabueso)', duration: '(Instantáneo)', concentration: false,
    classes: ['bard', 'druid', 'ranger'],
    description: 'Describes o nombras un tipo específico de bestia o planta y sintonizas con el sentido de la naturaleza. Si ese tipo está dentro de 5 millas, aprendes la dirección y distancia del espécimen más cercano.'
  },
  {
    id: 'locate_object', name: 'Localizar Objeto', level: 2,
    school: 'Adivinación', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (una horquilla bifurcada)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'wizard'],
    description: 'Describes o nombra un objeto y sientes su dirección mientras esté en 1000 pies de distancia. Si el objeto está en movimiento, conoces la dirección en la que se mueve. Puedes buscar un objeto específico si puedes recordarlo o un tipo de objeto.'
  },
  {
    id: 'magic_mouth', name: 'Boca Mágica', level: 2, ritual: true,
    school: 'Ilusión', castingTime: '1 minuto', range: '30 pies',
    components: 'V, S, M (un pedazo de panal de miel y polvo de jade de 10 po)', duration: 'Hasta que se elimine', concentration: false,
    classes: ['bard', 'wizard'],
    description: 'Implanta un mensaje en un objeto dentro del alcance. El mensaje es dicho cuando una condición designada por ti se cumple. La condición puede ser tan específica como quieras. El mensaje puede durar hasta 25 palabras y se pronuncia durante 10 minutos.'
  },
  {
    id: 'magic_weapon', name: 'Arma Mágica', level: 2,
    school: 'Transmutación', castingTime: '1 acción adicional', range: 'Toque',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['paladin', 'wizard'],
    description: 'Tocas un arma no mágica. Esta arma se convierte en un arma mágica y tiene un bonificador de +1 a las tiradas de ataque y daño. A niveles superiores: +2 (4-5), +3 (6+).'
  },
  {
    id: 'melfs_acid_arrow', name: 'Flecha de Ácido de Melf', level: 2,
    school: 'Evocación', castingTime: '1 acción', range: '90 pies',
    components: 'V, S, M (polvo de ruibarbo y hígado de víbora)', duration: 'Instantáneo', concentration: false,
    classes: ['wizard'],
    description: 'Un destello verde chisporrotea hacia un objetivo. Ataque de conjuro a distancia: 4d4 ácido en impacto más 2d4 al principio de su siguiente turno. Si falla, mitad de daño sin efecto posterior. A niveles superiores: +1d4 (impacto) y +1d4 (posterior) por nivel.'
  },
  {
    id: 'mirror_image', name: 'Imagen Espejo', level: 2,
    school: 'Ilusión', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '1 minuto', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Tres duplicados ilusorios de ti mismo aparecen en tu espacio. Hasta que el hechizo termine, los duplicados se mueven contigo y copian tus acciones. Cuando una criatura te apunta, tira un d20 para ver si apunta al original o a un duplicado.'
  },
  {
    id: 'misty_step', name: 'Paso Brumoso', level: 2,
    school: 'Conjuración', castingTime: '1 acción adicional', range: 'Personal',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Brevemente envuelto en niebla plateada, te tele transportas hasta 30 pies a un espacio desocupado que puedas ver.'
  },
  {
    id: 'moonbeam', name: 'Rayo de Luna', level: 2,
    school: 'Evocación', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (varias semillas de helecho y un trozo de opalita)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid'],
    description: 'Un rayo de luz pálida y pulsante brilla hacia abajo en un cilindro de 5 pies de radio y 40 pies de altura centrado en un punto dentro del alcance. Las formas cambiantes son repelidas; cada criatura en el área al comienzo de su turno debe superar una salvación de Constitución o recibir 2d10 radiante. A niveles superiores: +1d10 por nivel.'
  },
  {
    id: 'nystuls_magic_aura', name: 'Aura Mágica de Nystul', level: 2,
    school: 'Ilusión', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (un pedazo pequeño de tela de seda)', duration: '24 horas', concentration: false,
    classes: ['wizard'],
    description: 'Pones una ilusión en una criatura u objeto que toques para que los hechizos de adivinación revelen falsa información. Hasta que el hechizo termine, puedes hacer que aparezca como mágico, no mágico o de tipo diferente.'
  },
  {
    id: 'pass_without_trace', name: 'Pasar Sin Dejar Rastro', level: 2,
    school: 'Abjuración', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (ceniza de madera quemada de ébano)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['druid', 'ranger'],
    description: 'Una cubierta de sombra y silencio irradia de ti, enmascarando a ti y tus compañeros de la detección. Durante la duración, cada criatura que elijas a 30 pies tiene un bonificador de +10 a las pruebas de Sigilo (Destreza) y no puede ser rastreado por medios no mágicos.'
  },
  {
    id: 'prayer_of_healing', name: 'Oración de Curación', level: 2,
    school: 'Evocación', castingTime: '10 minutos', range: '30 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Hasta seis criaturas de tu elección que puedas ver dentro del alcance recuperan cada una PG iguales a 2d8 + tu modificador de habilidad mágica. Este hechizo no tiene efecto en los muertos vivientes o los constructos. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'protection_from_poison', name: 'Protección contra el Veneno', level: 2,
    school: 'Abjuración', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: '1 hora', concentration: false,
    classes: ['cleric', 'druid', 'paladin', 'ranger'],
    description: 'Tocas a una criatura. Si está envenenada, neutralizas el veneno. Si más de un veneno la afecta, neutralizas uno que sabías que estaba ahí. Durante la duración, el objetivo tiene ventaja en las tiradas de salvación contra veneno y tiene resistencia al daño por veneno.'
  },
  {
    id: 'ray_of_enfeeblement', name: 'Rayo de Debilitamiento', level: 2,
    school: 'Nigromancia', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['warlock', 'wizard'],
    description: 'Un rayo de energía negra debilitante salta de tu dedo hacia una criatura dentro del alcance. Haz un ataque de conjuro a distancia. Con un impacto, el objetivo inflige solo la mitad de daño con ataques de arma usando su Fuerza. Al final de cada turno, puede hacer una salvación de Constitución para terminar el efecto.'
  },
  {
    id: 'rope_trick', name: 'Truco de la Cuerda', level: 2,
    school: 'Transmutación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (polvo en polvo de maíz y algo de torcer)', duration: '1 hora', concentration: false,
    classes: ['wizard'],
    description: 'Tocas una cuerda de hasta 60 pies. Un extremo asciende en el aire. Al final, hasta ocho criaturas pueden subir a un espacio extradimensional que no puede ser detectado desde el exterior.'
  },
  {
    id: 'scorching_ray', name: 'Rayo Ardiente', level: 2,
    school: 'Evocación', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Creas tres rayos de fuego y los lanzas a objetivos dentro del alcance. Puedes dirigirlos al mismo objetivo o a diferentes. Haz un ataque de conjuro a distancia por cada rayo. Con un impacto, el objetivo recibe 2d6 de daño de fuego. A niveles superiores: un rayo más por nivel.'
  },
  {
    id: 'see_invisibility', name: 'Ver la Invisibilidad', level: 2,
    school: 'Adivinación', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (un pellizco de talco y una pequeña cantidad de pólvora de plata)', duration: '1 hora', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Durante la duración, ves las criaturas y objetos invisibles como si fueran visibles, y puedes ver el Plano Etéreo, ambas hasta 60 pies de distancia.'
  },
  {
    id: 'shatter', name: 'Destrozar', level: 2,
    school: 'Evocación', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un fragmento de mica)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Un ruido repentino atronador chirría dolorosamente desde un punto de tu elección dentro del alcance. Cada criatura en una esfera de 10 pies centrada en ese punto debe superar una salvación de Constitución o sufrir 3d8 de daño sónico. Los objetos inorgánicos siempre fallan y las criaturas hechas de roca, metal u otros materiales inorgánicos tienen desventaja. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'silence', name: 'Silencio', level: 2, ritual: true,
    school: 'Ilusión', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['bard', 'cleric', 'ranger'],
    description: 'Por la duración del hechizo, ningún sonido puede ser creado dentro o pasar a través de una esfera de 20 pies de radio centrada en un punto que elijas dentro del alcance. Cualquier criatura o objeto en la esfera es inmune al daño de trueno y ensorderada mientras esté en ella. Lanzar un hechizo con componente verbal es imposible dentro.'
  },
  {
    id: 'skywrite', name: 'Escribir en el Cielo', level: 2, ritual: true,
    school: 'Transmutación', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'druid', 'wizard'],
    description: 'Causas que hasta diez palabras se formen en nubes de escritura visible en el cielo. Las palabras deberían estar en una lengua que sepas. Las palabras se forman como caracteres de 10 pies de alto.'
  },
  {
    id: 'spider_climb', name: 'Trepar por las Paredes', level: 2,
    school: 'Transmutación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una gota de betún de Judea y una araña)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Hasta que el hechizo termine, una criatura voluntaria que toques gana la capacidad de moverse hacia arriba, hacia abajo y a lo largo de superficies verticales y de cabeza abajo sobre el techo, mientras que dejas sus manos libres. La velocidad de escalar del objetivo es igual a su velocidad normal.'
  },
  {
    id: 'spiritual_weapon', name: 'Arma Espiritual', level: 2,
    school: 'Evocación', castingTime: '1 acción adicional', range: '60 pies',
    components: 'V, S', duration: '1 minuto', concentration: false,
    classes: ['cleric'],
    description: 'Creas un arma espectral en el alcance que perdura. Como acción adicional en tu turno, puedes mover el arma hasta 20 pies y ataques con ella (ataque de conjuro): 1d8 + tu mod mágico en daño radiante. El tipo de arma es tu elección. A niveles superiores: +1d8 por 2 niveles sobre el 2.'
  },
  {
    id: 'suggestion', name: 'Sugestión', level: 2,
    school: 'Encantamiento', castingTime: '1 acción', range: '30 pies',
    components: 'V, M (la lengua de una serpiente y ya sea chochín del campo o media manzana envuelto en pergamino)', duration: 'Concentración, hasta 8 horas', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Sugieres una actividad a un ser que puedas ver dentro del alcance. La criatura debe poder entenderte. La sugestión debe sonar razonable. El objetivo debe superar una salvación de Sabiduría o seguir la sugestión. El hechizo termina cuando la sugestión se completa o cuando la criatura sufre daño.'
  },
  {
    id: 'warding_bond', name: 'Vínculo Protector', level: 2,
    school: 'Abjuración', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (un par de anillos de platino de 50 po cada uno, ambos que deben llevar el lanzador y el objetivo)', duration: '1 hora', concentration: false,
    classes: ['cleric'],
    description: 'Este hechizo protege a una criatura voluntaria que toques. El objetivo gana +1 a la CA y tiradas de salvación, y tiene resistencia al daño. Además, cada vez que el objetivo recibe daño, recibes la misma cantidad de daño. El hechizo termina si el lanzador cae a 0 PG.'
  },
  {
    id: 'web', name: 'Tela de Araña', level: 2,
    school: 'Conjuración', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un trozo de tela de araña)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Lanzas hebras gruesas de tela de araña pegajosa desde tu mano, llenando un cubo de 20 pies vacío dentro del alcance. Las criaturas que comiencen su turno en el área o entren en el área durante su turno deben superar una salvación de Destreza o quedar restringidas. Las criaturas restringidas pueden repetir al final de su turno.'
  },
  {
    id: 'zone_of_truth', name: 'Zona de la Verdad', level: 2,
    school: 'Encantamiento', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: '10 minutos', concentration: false,
    classes: ['bard', 'cleric', 'paladin'],
    description: 'Creas una zona mágica que protege contra el engaño en una esfera de 15 pies de radio centrada en un punto de tu elección dentro del alcance. Las criaturas que fallan una salvación de Carisma cuando entran no pueden mentir deliberadamente mientras estén en el área. Saben si pueden o no mentir.'
  }
];

// ============================================================
// GRIMORIO COMPLETO por Nivel
// ============================================================
export const SRD_SPELLS_BY_LEVEL: Record<number, SpellDefinition[]> = {
  0: SPELLS_LEVEL_0,
  1: SPELLS_LEVEL_1,
  2: SPELLS_LEVEL_2,
};

// Acceso directo a todos los conjuros en un solo array plano
export const ALL_SRD_SPELLS: SpellDefinition[] = [
  ...SPELLS_LEVEL_0,
  ...SPELLS_LEVEL_1,
  ...SPELLS_LEVEL_2,
];

// Helper para filtrar por clase y nivel
export const getSpellsByClassAndLevel = (classId: SpellClass, level: number): SpellDefinition[] => {
  return ALL_SRD_SPELLS.filter(s => s.level === level && s.classes.includes(classId));
};

// Helper para filtrar cantrips + nivel 1 por clase (para el creador de personajes)
export const getStarterSpellsForClass = (classId: string): { cantrips: SpellDefinition[], level1: SpellDefinition[], level2: SpellDefinition[] } => {
  const spellClass = classId as SpellClass;
  return {
    cantrips: getSpellsByClassAndLevel(spellClass, 0),
    level1: getSpellsByClassAndLevel(spellClass, 1),
    level2: getSpellsByClassAndLevel(spellClass, 2),
  };
};
