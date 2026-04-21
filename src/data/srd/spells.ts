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

export type SpellType = 
  | 'Daño' 
  | 'Curación' 
  | 'Soporte' 
  | 'Control' 
  | 'Utilidad' 
  | 'Defensa' 
  | 'Especial'
  | 'Daño Sostenido';

export interface SpellDefinition {
  id: string;
  name: string;
  level: number;               // 0 = truco/cantrip
  school: SpellSchool;
  type: SpellType;             // Categoría para iconos y lógica
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
    school: 'Conjuración', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Lanzas una burbuja de ácido. Elige una criatura a 60 pies o dos criaturas adyacentes. El objetivo debe superar una salvación de Destreza o recibir 1d6 de daño por ácido. A nivel 5: 2d6. A nivel 11: 3d6. A nivel 17: 4d6.'
  },
  {
    id: 'blade_ward', name: 'Guardia de Hoja', level: 0,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '1 asalto', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Extiendes tu mano y trazas un signo de protección. Hasta el final de tu próximo turno, tienes resistencia al daño de armas contundentes, perforantes y cortantes infligido por ataques de arma.'
  },
  {
    id: 'booming_blade', name: 'Hoja Atronadora', level: 0,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '5 pies',
    components: 'V, M (un arma)', duration: '1 asalto', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Como parte de la acción, realizas un ataque con arma cuerpo a cuerpo. Si el ataque acierta, el objetivo sufre daño normal y queda envuelto en energía atronadora. Si el objetivo se mueve voluntariamente antes del inicio de tu siguiente turno, recibe 1d8 de daño de trueno. A nivel 5: +1d8 al golpe y 2d8 si se mueve. A nivel 11: +2d8/3d8. A nivel 17: +3d8/4d8.'
  },
  {
    id: 'chill_touch', name: 'Toque Gélido', level: 0,
    school: 'Nigromancia', type: 'Daño', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: '1 asalto', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Creas una mano espectral y esquelética en el espacio de la criatura objetivo. Realiza un ataque de conjuro a distancia. Si acierta, inflige 1d8 de daño necrótico e impide que el objetivo recupere PG hasta el inicio de tu siguiente turno. Si el objetivo es un no-muerto, también tiene desventaja en tiradas de ataque contra ti hasta el final de tu siguiente turno. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'control_flames', name: 'Controlar Llamas', level: 0,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '60 pies',
    components: 'S', duration: 'Instantáneo o 1 hora', concentration: false,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Eliges fuego no mágico en un cubo de 5 pies. Puedes expandirlo, apagarlo, darle una nueva forma, o hacer que emita luz diferente. El fuego expandido dura 1 hora.'
  },
  {
    id: 'create_bonfire', name: 'Crear Hoguera', level: 0,
    school: 'Conjuración', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Invocas una hoguera mágica en un espacio de 5 pies. Las criaturas en el espacio deben superar una salvación de Destreza o recibir 1d8 de daño por fuego. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'dancing_lights', name: 'Luces Danzantes', level: 0,
    school: 'Evocación', type: 'Utilidad', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un trozo de fósforo o una luciérnaga)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Creas hasta cuatro luces del tamaño de una antorcha dentro del alcance. Se mueven hasta 60 pies por asalto como acción adicional. Pueden combinarse en una figura vaga de criatura mediana.'
  },
  {
    id: 'druidcraft', name: 'Arte Druídico', level: 0,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['druid'],
    description: 'Susurras a los espíritus de la naturaleza para producir uno de estos efectos: predices el tiempo para 24 horas, haces florecer una planta, creas un efecto sensorial menor, o enciendes o apaga una vela pequeña.'
  },
  {
    id: 'eldritch_blast', name: 'Descarga Sobrenatural', level: 0,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['warlock'],
    description: 'Un rayo de energía crujiente y chirriante choca contra una criatura dentro del alcance. Realiza un ataque de conjuro a distancia. Si acierta, el objetivo recibe 1d10 de daño de fuerza. A nivel 5 lanzas 2 rayos, a nivel 11 tres rayos, y a nivel 17 cuatro rayos. Puedes dirigir los rayos a la misma criatura o a diferentes criaturas.'
  },
  {
    id: 'fire_bolt', name: 'Descarga de Fuego', level: 0,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Lanzas une mota de fuego a una criatura o un objeto dentro del alcance. Realiza un ataque de conjuro a distancia. Si acierta inflige 1d10 de daño por fuego. Los objetos inflamables que no se lleven encima se incendian. A nivel 5: 2d10. A nivel 11: 3d10. A nivel 17: 4d10.'
  },
  {
    id: 'friends', name: 'Amigos', level: 0,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: 'Personal',
    components: 'S, M (una pequeña cantidad de maquillaje)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Durante su duración, tienes ventaja en todas las pruebas de Carisma dirigidas contra una criatura no hostil. Cuando el hechizo termina, la criatura se da cuenta de que usaste magia para influir en su humor y puede volverse hostil.'
  },
  {
    id: 'frostbite', name: 'Mordedura del Frío', level: 0,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Causas que el frío entumezca a un objetivo. La criatura debe superar una salvación de Constitución o recibir 1d6 de daño frío y tiene desventaja en el siguiente ataque de arma que haga antes del final de su siguiente turno. Escala: 2d6 (nv5), 3d6 (nv11), 4d6 (nv17).'
  },
  {
    id: 'guidance', name: 'Orientación', level: 0,
    school: 'Adivinación', type: 'Soporte', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric', 'druid'],
    description: 'Tocas a una criatura voluntaria. Una vez antes de que el hechizo termine, el objetivo puede tirar un d4 y añadir el número tirado a una prueba de habilidad a su elección. Puede tirar el dado antes o después de hacer la prueba.'
  },
  {
    id: 'light', name: 'Luz', level: 0,
    school: 'Evocación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, M (un fragmento de fósforo o una luciérnaga)', duration: '1 hora', concentration: false,
    classes: ['bard', 'cleric', 'sorcerer', 'wizard'],
    description: 'Tocas un objeto de 10 pies o menor. Hasta que el hechizo termine, emite luz brillante en un radio de 20 pies y luz tenue 20 pies adicionales. La luz puede ser de cualquier color. Cubrir el objeto bloquea la luz. Si alcanzas a un ser hostil, debe superar una salvación de Destreza para evitar el efecto.'
  },
  {
    id: 'mage_hand', name: 'Mano de Mago', level: 0,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V, S', duration: '1 minuto', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Creas una mano espectral y flotante dentro del alcance. La mano desaparece cuando el hechizo termina o si la alejas más de 30 pies de ti. Puede manipular objetos, abrir contenedores no bloqueados, guardar o recuperar objetos de contenedores abiertos, o verter el contenido de un frasco. No puede atacar, activar objetos mágicos o transportar más de 10 libras.'
  },
  {
    id: 'mending', name: 'Reparar', level: 0,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 minuto', range: 'Toque',
    components: 'V, S, M (dos imanes)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'sorcerer', 'wizard'],
    description: 'Este hechizo repara una sola rotura o corte en un objeto que toques. Mientras la rotura o corte no sea mayor de 1 pie en cualquier dimensión, lo remiendas, no dejando rastro alguno de la anterior avería. Este hechizo no puede rehacer artículos mágicos.'
  },
  {
    id: 'message', name: 'Mensaje', level: 0,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un pedazo corto de cobre de alambre)', duration: '1 asalto', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Apuntas con el dedo hacia una criatura y susurras un mensaje. El objetivo (y solo el objetivo) lo escucha y puede responder susurrando al final de su turno. Puedes usarlo para conversar secretamente en distancia.'
  },
  {
    id: 'minor_illusion', name: 'Ilusión Menor', level: 0,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'S, M (un trozo de lana de oveja)', duration: '1 minuto', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Creas un sonido o una imagen de un objeto en el alcance. Un sonido puede ser tan suave como un susurro o tan alto como un grito. Saber que es ilusión requiere una prueba de Investigación contra CD de tu conjuro.'
  },
  {
    id: 'poison_spray', name: 'Pulverizador de Veneno', level: 0,
    school: 'Conjuración', type: 'Daño', castingTime: '1 acción', range: '10 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Extiendes tu mano hacia una criatura y lanzas una nube de gas venenoso. La criatura debe superar una salvación de Constitución o recibir 1d12 de daño de veneno. Escala: 2d12 (nv5), 3d12 (nv11), 4d12 (nv17).'
  },
  {
    id: 'prestidigitation', name: 'Prestidigitación', level: 0,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '10 pies',
    components: 'V, S', duration: 'Hasta 1 hora', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Este hechizo permite pequeños efectos mágicos: crear chispas, limpiar o ensuciar, enfriar/calentar/dar sabor a un cubo de masa nonmágica, hacer un emblema, crear un objeto inofensivo temporal, etc. Hasta tres efectos a la vez.'
  },
  {
    id: 'produce_flame', name: 'Producir Llama', level: 0,
    school: 'Conjuración', type: 'Daño', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '10 minutos', concentration: false,
    classes: ['druid'],
    description: 'Una llama chisporroteante aparece en tu mano. Ilumina 10 pies de luz brillante y 10 pies más de luz tenue. Puedes lanzarla como acción bonus: ataque de conjuro a distancia 30 pies. Si acierta: 1d8 fuego. Se apaga al lanzar. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'ray_of_frost', name: 'Rayo de Escarcha', level: 0,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Un rayo frío de color azul-blanco se proyecta hacia una criatura dentro del alcance. Realiza un ataque de conjuro a distancia. Si acierta, inflige 1d8 de daño por frío y la velocidad del objetivo se reduce 10 pies hasta el comienzo de tu siguiente turno. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'resistance', name: 'Resistencia', level: 0,
    school: 'Abjuración', type: 'Soporte', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una capa de tela diminuta)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric', 'druid'],
    description: 'Tocas a una criatura voluntaria. Una vez, antes de que el hechizo termine, el objetivo puede tirar un d4 y sumar el resultado a una tirada de salvación a su elección.'
  },
  {
    id: 'sacred_flame', name: 'Llama Sagrada', level: 0,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'La radiación de tipo llama desciende sobre una criatura que puedas ver dentro del alcance. El objetivo debe superar una tirada de salvación de Destreza o recibir 1d8 de daño radiante. El objetivo no se beneficia de cobertura en esta tirada de salvación. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'shillelagh', name: 'Shillelagh', level: 0,
    school: 'Transmutación', type: 'Daño', castingTime: '1 acción adicional', range: 'Toque',
    components: 'V, S, M (muérdago, un trébol de cuatro hojas y una maza o bastón)', duration: '1 minuto', concentration: false,
    classes: ['druid'],
    description: 'La madera de una maza o bastón que estés sosteniendo se imbue con la fuerza de la naturaleza. Por la duración del hechizo, puedes usar el modificador de tu habilidad mágica en lugar del de Fuerza para los ataques y daño. El daño es 1d6+mod.'
  },
  {
    id: 'shocking_grasp', name: 'Agarre Descargante', level: 0,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'El rayo salta de tu mano a una criatura que intentes tocar. Realiza un ataque de conjuro cuerpo a cuerpo contra el objetivo. Tienes ventaja si el objetivo lleva armadura de metal. Si aciertas, inflige 1d8 de daño de relámpago y el objetivo no puede usar reacciones hasta el comienzo de su siguiente turno. Escala: 2d8 (nv5), 3d8 (nv11), 4d8 (nv17).'
  },
  {
    id: 'spare_the_dying', name: 'Salvar al Moribundo', level: 0,
    school: 'Nigromancia', type: 'Curación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Tocas a una criatura viva con 0 Puntos de Golpe. La criatura queda estable. Este hechizo no tiene efecto en muertos vivientes ni constructos.'
  },
  {
    id: 'thaumaturgy', name: 'Taumaturgia', level: 0,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V', duration: 'Hasta 1 minuto', concentration: false,
    classes: ['cleric'],
    description: 'Manifiestas una pequeña maravilla: tus ojos brillan, tu voz retumba, llamas vacilan, la tierra tiembla levemente. Puedes hasta tener tres efectos activos; crear un nuevo efecto más cancela el más antiguo.'
  },
  {
    id: 'thunderclap', name: 'Trueno', level: 0,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '5 pies',
    components: 'S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Creas un estampido de sonido atronador que puede oírse a 100 pies. Cada criatura en un radio de 5 pies —excepto tú— debe superar una salvación de Constitución o recibir 1d6 de daño de trueno. Escala: 2d6 (nv5), 3d6 (nv11), 4d6 (nv17).'
  },
  {
    id: 'toll_the_dead', name: 'Doblar por los Muertos', level: 0,
    school: 'Nigromancia', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'warlock', 'wizard'],
    description: 'El sonido de una campana funesta llena el aire de un objetivo visible. El objetivo debe superar una salvación de Sabiduría o recibir 1d8 de daño necrótico. Si el objetivo tiene menos PG que su máximo, recibe 1d12 en su lugar. Escala: 2dx (nv5), 3dx (nv11), 4dx (nv17).'
  },
  {
    id: 'true_strike', name: 'Golpe Certero', level: 0,
    school: 'Adivinación', type: 'Soporte', castingTime: '1 acción', range: '30 pies',
    components: 'S', duration: 'Concentración, hasta 1 asalto', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Extiendes tu mano y apuntas con el dedo hacia el objetivo en el alcance. Tu magia te otorga una visión breve de las defensas del objetivo. En tu próximo turno, tienes ventaja en tu primer ataque contra el objetivo, siempre que el hechizo no haya terminado.'
  },
  {
    id: 'vicious_mockery', name: 'Burla Mordaz', level: 0,
    school: 'Encantamiento', type: 'Soporte', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['bard'],
    description: 'Lanzas un insulto imbuido de magia a una criatura que puedas ver, hiriéndola con tus palabras. El objetivo debe superar una tirada de salvación de Sabiduría o recibir 1d4 de daño psíquico y tiene desventaja en el próximo ataque que haga antes del fin de su siguiente turno. Escala: 2d4 (nv5), 3d4 (nv11), 4d4 (nv17).'
  },
  {
    id: 'word_of_radiance', name: 'Palabra de Resplandor', level: 0,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '5 pies',
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
    school: 'Abjuración', type: 'Utilidad', castingTime: '1 minuto', range: '30 pies',
    components: 'V, S, M (un campanilla y un trozo de alambre de plata fino)', duration: '8 horas', concentration: false,
    classes: ['ranger', 'wizard'],
    description: 'Estableces una alarma mágica contra intrusos. Elige una puerta, ventana u área de 20 pies de diámetro. La alarma suena durante 1 minuto si una criatura Diminuta o mayor toca el área sin pronunciar la contraseña.'
  },
  {
    id: 'animal_friendship', name: 'Amistad con los Animales', level: 1,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (un bocado de comida)', duration: '24 horas', concentration: false,
    classes: ['bard', 'druid', 'ranger'],
    description: 'Convences a un animal de que no eres una amenaza. El animal debe superar una salvación de Sabiduría (CD de tu conjuro) o quedar encantado. Un animal con inteligencia de 4 o mayor no puede ser hechizado así.'
  },
  {
    id: 'armor_of_agathys', name: 'Armadura de Agathys', level: 1,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (una copa de agua)', duration: '1 hora', concentration: false,
    classes: ['warlock'],
    description: 'Una fuerza mágica protectora te rodea, manifestándose como hielo espectal. Ganas 5 PG temporales. Mientras tengas esos PG, cualquier criatura que te golpee cuerpo a cuerpo recibe 5 de daño frío. A niveles superiores: +5 PG temporales y +5 daño por nivel de hechizo.'
  },
  {
    id: 'arms_of_hadar', name: 'Brazos de Hadar', level: 1,
    school: 'Conjuración', type: 'Daño', castingTime: '1 acción', range: 'Personal (10 pies)',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['warlock'],
    description: 'Invocas el poder del Hadar, el Hambre Oscura. Tentáculos brotan de ti. Cada criatura en 10 pies debe superar salvación de Fuerza o recibir 2d6 necrótico y no puede usar reacciones hasta su siguiente turno. Éxito: la mitad de daño. A niveles superiores: +2d6 por nivel extra.'
  },
  {
    id: 'bane', name: 'Maldecir', level: 1,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (una gota de sangre)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'cleric'],
    description: 'Hasta tres criaturas de tu elección que puedas ver deben superar una salvación de Carisma. Cada objetivo que falle restará 1d4 de sus tiradas de ataque y salvaciones hasta que el hechizo termine. A niveles superiores: afecta una criatura más por nivel sobre el 1.'
  },
  {
    id: 'bless', name: 'Bendición', level: 1,
    school: 'Encantamiento', type: 'Soporte', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (unas gotas de agua bendita)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric', 'paladin'],
    description: 'Bendices hasta tres criaturas de tu elección que puedas ver. Siempre que un objetivo haga una tirada de ataque o salvación antes de que el hechizo termine, puede tirar un d4 y añadir el resultado. A niveles superiores: una criatura más por nivel sobre el 1.'
  },
  {
    id: 'burning_hands', name: 'Manos Ardientes', level: 1,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: 'Personal (cono de 15 pies)',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Cuando lanzas este hechizo, un delgado manto de llamas chisporrotea. Cada criatura en un cono de 15 pies debe hacer una salvación de Destreza. Falla: 3d6 de daño por fuego. Éxito: la mitad. Los objetos inflamables que no se lleven encima se incendian. A niveles superiores: +1d6 por nivel extra.'
  },
  {
    id: 'cause_fear', name: 'Causar Terror', level: 1,
    school: 'Nigromancia', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['warlock', 'wizard'],
    description: 'Despiertas el sentido de mortalidad en una criatura que puedas ver. El objetivo debe superar una salvación de Sabiduría o quedar asustado de ti hasta el final del hechizo. Al final de cada uno de sus turnos, puede volver a intentar la salvación.'
  },
  {
    id: 'charm_person', name: 'Hechizar Persona', level: 1,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '30 pies',
    components: 'V, S', duration: '1 hora', concentration: false,
    classes: ['bard', 'druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Intentas hechizar a un humanoide que puedas ver. El objetivo debe superar una salvación de Sabiduría (con ventaja si estás en combate) o quedará hechizado. Mientras está hechizado, es tu amigo. Cuando el hechizo termina, sabe que fue hechizado. A niveles superiores: afecta una criatura más por nivel sobre el 1.'
  },
  {
    id: 'chromatic_orb', name: 'Orbe Cromático', level: 1,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '90 pies',
    components: 'V, S, M (un diamante de al menos 50 po de valor)', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Lanzas una esfera de energía de 4 pulgadas de diámetro. Elige el tipo: ácido, frío, fuego, relámpago, veneno o trueno. Haz un ataque de conjuro a distancia. Si acierta, el objetivo recibe 3d8 del tipo elegido. A niveles superiores: +1d8 por nivel extra.'
  },
  {
    id: 'color_spray', name: 'Rociar Color', level: 1,
    school: 'Ilusión', type: 'Control', castingTime: '1 acción', range: 'Personal (cono de 15 pies)',
    components: 'V, S, M (un pellizco de polvo o arena de color rojo, amarillo y azul)', duration: '1 asalto', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Un rayo deslumbrante de luz colorida parpadea desde tu mano. Tira 6d10; el total es cuántos PG de criaturas puedes afectar en cono de 15 pies. Las criaturas quedan cegadas hasta el final de tu siguiente turno. A niveles superiores: +2d10 por nivel extra.'
  },
  {
    id: 'command', name: 'Orden', level: 1,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: '1 asalto', concentration: false,
    classes: ['cleric', 'paladin'],
    description: 'Le das una orden de una sola palabra a una criatura que puedas ver. El objetivo debe superar una salvación de Sabiduría o seguir la orden en su siguiente turno. Las órdenes comunes incluyen: "acércate", "huye", "cae", "para". A niveles superiores: una criatura adicional por nivel.'
  },
  {
    id: 'comprehend_languages', name: 'Comprende Idiomas', level: 1, ritual: true,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (un pellizco de hollín y sal)', duration: '1 hora', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Por la duración del hechizo, entiendes el significado literal de cualquier lengua hablada. También puedes entender cualquier lengua escrita que veas, pero debes estar en contacto con la superficie en que se escribe.'
  },
  {
    id: 'create_or_destroy_water', name: 'Crear o Destruir Agua', level: 1,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (un goteo de agua o unos granos de arena)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'druid'],
    description: 'Creas hasta 10 galones de agua limpia o destruyes un volumen idéntico de agua. Como alternativa, puedes crear lluvia en un cubo de 30 pies (apagando fuegos no mágicos) o destruir niebla. A niveles superiores: +10 galones por nivel.'
  },
  {
    id: 'cure_wounds', name: 'Curar Heridas', level: 1,
    school: 'Evocación', type: 'Curación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger'],
    description: 'Una criatura que toques recupera 1d8 + tu modificador de habilidad mágica en Puntos de Golpe. Este hechizo no tiene efecto en los muertos vivientes ni en los constructos. A niveles superiores: +1d8 por nivel de espacio.'
  },
  {
    id: 'detect_evil_and_good', name: 'Detectar el Bien y el Mal', level: 1,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['cleric', 'paladin'],
    description: 'Durante su duración, sabes si hay aberraciones, celestiales, elementales, etéreos, demonios, no-muertos o si hay lugares consagrados/mancillados a 30 pies de ti. Conoces el tipo general, pero no identidad específica.'
  },
  {
    id: 'detect_magic', name: 'Detectar Magia', level: 1, ritual: true,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'sorcerer', 'wizard'],
    description: 'Durante su duración, puedes sentir la presencia de magia en 30 pies. Si percibes magia, puedes usar tu acción para ver un aura tenue alrededor de cualquier criatura u objeto visible con magia activa, y conocer la escuela de esa magia.'
  },
  {
    id: 'detect_poison_and_disease', name: 'Detectar Veneno y Enfermedad', level: 1, ritual: true,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (hoja de acebo)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['cleric', 'druid', 'paladin', 'ranger'],
    description: 'Durante el tiempo de lanzamiento puedes detectar la presencia y lugar de venenos, criaturas venenosas y enfermedades en 30 pies. También identificas el tipo de veneno, criatura venenosa o enfermedad.'
  },
  {
    id: 'disguise_self', name: 'Disfrazarse', level: 1,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '1 hora', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Te hace aparecer diferente hasta que el hechizo termine o uses tu acción para terminarlo. Puedes parecer 1 pie más bajo o alto y mucho más delgado o gordo. Tu equipo también parece diferente. El efecto no logra engañar al tacto.'
  },
  {
    id: 'dissonant_whispers', name: 'Susurros Disonantes', level: 1,
    school: 'Encantamiento', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['bard'],
    description: 'Susurras una melodía discordante en la mente de una criatura de tu elección. El objetivo debe superar una salvación de Sabiduría o sufrir 3d6 de daño psíquico y debe usar su reacción para alejarse de ti. A niveles superiores: +1d6 por nivel.'
  },
  {
    id: 'divine_favor', name: 'Gracia Divina', level: 1,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción adicional', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['paladin'],
    description: 'Tu oración te infunde con poder divino. Hasta que el hechizo termine, tus ataques con armas hacen 1d4 extra de daño radiante en cada impacto.'
  },
  {
    id: 'earth_tremor', name: 'Temblor de Tierra', level: 1,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: 'Personal (10 pies)',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'druid', 'sorcerer', 'wizard'],
    description: 'Causas temblores en el suelo en un radio de 10 pies. Cada criatura (excepto tú) en el área debe superar una salvación de Destreza o sufrir 1d6 contundente y caer derribada. Si el suelo es tierra suelta, se vuelve terrano difícil. A niveles superiores: +1d6 por nivel.'
  },
  {
    id: 'entangle', name: 'Enredar', level: 1,
    school: 'Conjuración', type: 'Control', castingTime: '1 acción', range: '90 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid'],
    description: 'Hierba entrelazada, maleza y enredaderas brotan en un cuadrado de 20 pies. Las criaturas que entren o empiecen en el área debe superar una salvación de Fuerza o quedar restringidas mientras el hechizo siga activo. Se puede hacer una nueva tirada al final de cada turno.'
  },
  {
    id: 'expeditious_retreat', name: 'Retirada Expedita', level: 1,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción adicional', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Este hechizo te permite moverte a velocidad increíble. Cuando lanzas el hechizo y como acción adicional en cada uno de tus turnos hasta que termine, puedes llevar a cabo la acción Correr.'
  },
  {
    id: 'faerie_fire', name: 'Fuego de las Hadas', level: 1,
    school: 'Evocación', type: 'Soporte', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'druid'],
    description: 'Cada objeto en un cubo de 20 pies dentro del alcance es delineado en luz azul, verde o violeta (tú decides). Las criaturas en el área que fallen una salvación de Destreza también quedan delineadas. Los blancos afectados emiten luz tenue y no pueden beneficiarse de la invisibilidad. Los ataques contra ellos tienen ventaja.'
  },
  {
    id: 'false_life', name: 'Vida Falsa', level: 1,
    school: 'Nigromancia', type: 'Defensa', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (una pequeña cantidad de alcohol o licor destilado)', duration: '1 hora', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Aprovechando una imitación de la energía de la no-muerte, ganas 1d4+4 PG temporales. A niveles superiores: +5 PG temporales por nivel sobre el 1.'
  },
  {
    id: 'feather_fall', name: 'Caída de Pluma', level: 1,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 reacción', range: '60 pies',
    components: 'V, M (una pequeña pluma o trozo de pelusa)', duration: '1 minuto', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Eliges hasta cinco criaturas en caída libre dentro del alcance. La velocidad de descenso se reduce a 60 pies por asalto para la duración. Si la criatura aterriza antes de que el hechizo termine, no sufre daño por caída.'
  },
  {
    id: 'find_familiar', name: 'Encontrar un Familiar', level: 1, ritual: true,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 hora', range: '10 pies',
    components: 'V, S, M (10 po en carbón, incienso y hierbas que se consumen en la llama)', duration: 'Instantáneo', concentration: false,
    classes: ['wizard'],
    description: 'Obtienes los servicios de un familiar, un espíritu que toma una forma animal (búho, gato, cuervo, sapo, hurón, etc.). Es independiente y actúa en su propio turno en iniciativa. Cuando el familiar cae a 0 PG, desaparece y puede ser recontocado.'
  },
  {
    id: 'fog_cloud', name: 'Nube de Niebla', level: 1,
    school: 'Conjuración', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Creas una esfera de niebla de 20 pies de radio alrededor de un punto dentro del alcance centrada en el punto. La esfera se expande a la vuelta de las esquinas, y su área está fuertemente oscurecida. A niveles superiores: el radio aumenta en 20 pies por nivel.'
  },
  {
    id: 'goodberry', name: 'Buenas Bayas', level: 1,
    school: 'Transmutación', type: 'Curación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una ramita de muérdago)', duration: 'Instantáneo', concentration: false,
    classes: ['druid', 'ranger'],
    description: 'Hasta diez bayas son infundidas con magia si las tocas. Una criatura puede usar su acción para comer una baya, recuperando 1 PG. La baya también proporciona suficiente nutrición para sostener a la criatura por un día. Las bayas pierden su potencia si no se usan dentro de 24 horas.'
  },
  {
    id: 'grease', name: 'Grasa', level: 1,
    school: 'Conjuración', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un trozo de mantequilla de cerdo o grasa de cerdo)', duration: '1 minuto', concentration: false,
    classes: ['wizard'],
    description: 'Grasa espesa cubre el suelo en un cuadrado de 10 pies centrado en un punto dentro del alcance, convirtiéndola en terreno difícil durante la duración. Cuando aparece, cada criatura de pie en el área debe tener éxito en una salvación de Destreza o caer derribada.'
  },
  {
    id: 'guiding_bolt', name: 'Rayo Guía', level: 1,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: '1 asalto', concentration: false,
    classes: ['cleric'],
    description: 'Un fogonazo de luz chisporrotea hacia una criatura de tu elección dentro del alcance. Realiza un ataque de conjuro a distancia. Si acierta, el objetivo recibe 4d6 de daño radiante y el próximo ataque hecho contra el objetivo antes del comienzo de tu siguiente turno tiene ventaja. A niveles superiores: +1d6 por nivel.'
  },
  {
    id: 'healing_word', name: 'Palabra Curativa', level: 1,
    school: 'Evocación', type: 'Curación', castingTime: '1 acción adicional', range: '60 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'druid'],
    description: 'Una criatura de tu elección dentro del alcance recupera PG iguales a 1d4 + tu modificador de habilidad mágica. Este hechizo no tiene efecto en los muertos vivientes ni constructos. A niveles superiores: +1d4 por nivel.'
  },
  {
    id: 'hellish_rebuke', name: 'Represalia Infernal', level: 1,
    school: 'Evocación', type: 'Daño', castingTime: '1 reacción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['warlock'],
    description: 'Apuntas con tu dedo y la criatura que te acaba de dañar está brevemente envuelta en llamas infernales. La criatura debe hacer una salvación de Destreza. Falla: 2d10 de daño por fuego. Éxito: la mitad. A niveles superiores: +1d10 por nivel.'
  },
  {
    id: 'heroism', name: 'Heroísmo', level: 1,
    school: 'Encantamiento', type: 'Soporte', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'paladin'],
    description: 'Una criatura dispuesta que toques se impregna de valentía. Mientras el hechizo esté activo, la criatura es inmune a ser asustada y gana un número de PG temporales igual a tu modificador de habilidad mágica al comienzo de cada uno de sus turnos. A niveles superiores: una criatura más por nivel.'
  },
  {
    id: 'hex', name: 'Maleficio', level: 1,
    school: 'Encantamiento', type: 'Daño Sostenido', castingTime: '1 acción adicional', range: '90 pies',
    components: 'V, S, M (el ojo petrificado de un tritón)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['warlock'],
    description: 'Maldices a una criatura dentro del alcance. Hasta que el hechizo termine, infliges 1d6 adicional de daño necrótico cuando la golpeas. Además, elige una habilidad cuando lances el hechizo: el objetivo tiene desventaja en pruebas de esa habilidad. Si el objetivo cae a 0 PG, puedes mover la maldición a otro. A niveles superiores: duración más larga.'
  },
  {
    id: 'hideous_laughter', name: 'Risa Horrorosa de Tasha', level: 1,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (pequeñas tartas y una pluma)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'wizard'],
    description: 'Una criatura de tu elección que puedas ver dentro del alcance percibe todo como tremendamente cómico y cae en carcajadas si falla una salvación de Sabiduría. El objetivo queda derribado y en estado incapacitado e incapaz de levantarse. Puede intentar la salvación al final de cada turno.'
  },
  {
    id: 'hunters_mark', name: 'Marca del Cazador', level: 1,
    school: 'Adivinación', type: 'Daño Sostenido', castingTime: '1 acción adicional', range: '90 pies',
    components: 'V', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['ranger'],
    description: 'Eliges una criatura que puedas ver dentro del alcance y la marcas místicamente como tu presa. Hasta que el hechizo termine, infliges 1d6 de daño adicional cuando la golpeas y tienes ventaja en pruebas de Sabiduría (Percepción) y (Supervivencia) para encontrarla. A niveles superiores: duración más larga.'
  },
  {
    id: 'ice_knife', name: 'Cuchillo de Hielo', level: 1,
    school: 'Conjuración', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, M (una gota de agua o un pedazo de hielo)', duration: 'Instantáneo', concentration: false,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Creas un fragmento puntiagudo de hielo que lanzas a una criatura dentro del alcance. Ataque a distancia: 1d10 perforante en impacto. Luego explota en un radio de 5 pies: cada criatura en el área hace salvación de Destreza o recibe 2d6 frío. A niveles superiores: +1d6 frío por nivel.'
  },
  {
    id: 'identify', name: 'Identificar', level: 1, ritual: true,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 minuto', range: 'Toque',
    components: 'V, S, M (una perla de al menos 100 po y un búho)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'wizard'],
    description: 'Eliges un objeto que debes tocar durante el lanzamiento. Si el objeto es un objeto mágico u otro objeto mágico imbuido, aprendes sus propiedades y cómo usarlos, si requieren sintonía y cuántos cargas. También aprendes si los conjuros que afectan el objeto están activos.'
  },
  {
    id: 'illusory_script', name: 'Escritura Ilusoria', level: 1, ritual: true,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 minuto', range: 'Toque',
    components: 'S, M (tinta imbuida de magia de al menos 10 po)', duration: '10 días', concentration: false,
    classes: ['bard', 'warlock', 'wizard'],
    description: 'Escribes en papel u otro material. Solo las criaturas designadas pueden leer y comprender el texto verdadero. Todos los demás ven el texto como un texto diferente o garabatos sin sentido o glifos de un idioma diferente.'
  },
  {
    id: 'inflict_wounds', name: 'Causar Heridas', level: 1,
    school: 'Nigromancia', type: 'Daño', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Haz un ataque de conjuro cuerpo a cuerpo contra una criatura que puedas alcanzar. Si aciertas, el objetivo recibe 3d10 de daño necrótico. A niveles superiores: +1d10 por nivel.'
  },
  {
    id: 'jump', name: 'Saltar', level: 1,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una pata de saltamontes)', duration: '1 minuto', concentration: false,
    classes: ['druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Tocas a una criatura. La distancia de salto de la criatura se triplica hasta que el hechizo termine.'
  },
  {
    id: 'longstrider', name: 'Zancada', level: 1,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una pizca de tierra)', duration: '1 hora', concentration: false,
    classes: ['bard', 'druid', 'ranger', 'wizard'],
    description: 'Tocas a una criatura. Hasta que el hechizo termine, la velocidad objetivo de la criatura aumenta en 10 pies. A niveles superiores: una criatura adicional por nivel.'
  },
  {
    id: 'mage_armor', name: 'Armadura de Mago', level: 1,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (un trozo de cuero curtido)', duration: '8 horas', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Tocas a una criatura dispuesta que no lleva armadura. Hasta que el hechizo termine, la CA del objetivo es 13 + su modificador de Destreza. El hechizo termina si el objetivo se pone una armadura.'
  },
  {
    id: 'magic_missile', name: 'Proyectil Mágico', level: 1,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Creas tres dardos brillantes de fuerza mágica. Cada dardo impacta a una criatura de tu elección que puedas ver dentro del alcance. Un dardo hace 1d4 + 1 de daño por fuerza. Los tres dardos golpean simultáneamente, y puedes apuntarlos a la misma criatura o a diferentes criaturas. A niveles superiores: un dardo más por nivel.'
  },
  {
    id: 'protection_from_evil_and_good', name: 'Protección del Bien y el Mal', level: 1,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (agua bendita o polvo de plata e hierro, que el hechizo consume)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['cleric', 'paladin', 'warlock', 'wizard'],
    description: 'Hasta que el hechizo termine, una criatura voluntaria que toques está protegida contra aberraciones, celestiales, elementales, feéricos, demonios y no-muertos. Los ataques de esas criaturas tienen desventaja contra el objetivo, y esas criaturas no pueden encantar, asustar o poseer al objetivo.'
  },
  {
    id: 'purify_food_and_drink', name: 'Purificar Comida y Bebida', level: 1, ritual: true,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '10 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'druid', 'paladin'],
    description: 'Toda la comida y bebida no mágica en una esfera de 5 pies de radio centrada en un punto que elijas dentro del alcance es purificada y queda libre de veneno y enfermedad.'
  },
  {
    id: 'ray_of_sickness', name: 'Rayo de Enfermedad', level: 1,
    school: 'Nigromancia', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Un rayo de energía enfermiza se proyecta hacia una criatura dentro del alcance. Haz un ataque de conjuro a distancia. Con un impacto, el objetivo recibe 2d8 de daño por veneno y debe hacer una salvación de Constitución o estar envenenado hasta el final de tu siguiente turno. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'sanctuary', name: 'Santuario', level: 1,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción adicional', range: '30 pies',
    components: 'V, S, M (un pequeño espejo de plata)', duration: '1 minuto', concentration: false,
    classes: ['cleric'],
    description: 'Guardas a una criatura dentro del alcance contra los ataques. Hasta que el hechizo termine, cualquier criatura que intente atacar al objetivo o use el objetivo como blanco de un hechizo dañino debe antes tener éxito en una salvación de Sabiduría. Si falla, tiene que elegir otro objetivo (o perder su acción).'
  },
  {
    id: 'shield', name: 'Escudo', level: 1,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 reacción', range: 'Personal',
    components: 'V, S', duration: '1 asalto', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Una barrera invisible de fuerza mágica aparece te protege. Hasta el comienzo de tu siguiente turno, tienes un bonificador de +5 a la CA, incluyendo contra el ataque desencadenante, y no recibes daño de proyectil mágico.'
  },
  {
    id: 'shield_of_faith', name: 'Escudo de la Fe', level: 1,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción adicional', range: '60 pies',
    components: 'V, S, M (un pequeño pergamino de texto sagrado)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['cleric', 'paladin'],
    description: 'Una barrera de energía protectora brillante parece rodear a la criatura de tu elección dentro del alcance, otorgando +2 a la CA durante la duración.'
  },
  {
    id: 'silent_image', name: 'Imagen Silenciosa', level: 1,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un trozo de lana de oveja)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Creas la imagen de un objeto, una criatura o algún otro fenómeno visible que quepa en un cubo de 15 pies. No produce ningún sonido, ni luz real, ni olor, ni ningún otro efecto sensorial. Cualquier inspección física verá que es ilusión con una prueba de Investigación (CD conjuros).'
  },
  {
    id: 'sleep', name: 'Dormir', level: 1,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '90 pies',
    components: 'V, S, M (un pellizco de arena fina, pétalos de rosa o un grillo)', duration: '1 minuto', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'El hechizo envía criaturas en un sueño mágico. Tira 5d8; el total es cuántos PG de criaturas puedes afectar. Las criaturas en radio de 20 pies alrededor de un punto que elijas se ven afectadas, comenzando por el que tiene menos PG. Las criaturas se despiertan si reciben daño. A niveles superiores: +2d8 por nivel.'
  },
  {
    id: 'snare', name: 'Trampa', level: 1,
    school: 'Abjuración', type: 'Control', castingTime: '1 minuto', range: 'Toque',
    components: 'S, M (25 pies de cuerda, que el hechizo consume)', duration: '8 horas', concentration: false,
    classes: ['druid', 'ranger', 'wizard'],
    description: 'Mientras lanzas este hechizo, usas la cuerda para crear un círculo con un diámetro de 5 pies en el suelo o piso. Cuando una criatura Diminuta o mayor entra en el área, la trampa se activa. La criatura debe superar una salvación de Destreza o quedar restringida.'
  },
  {
    id: 'speak_with_animals', name: 'Hablar con los Animales', level: 1, ritual: true,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '10 minutos', concentration: false,
    classes: ['bard', 'druid', 'ranger'],
    description: 'Obtienes la capacidad de comprender y comunicarte verbalmente con bestias durante la duración. El conocimiento y la conciencia de muchas bestias son limitados por su inteligencia, pero pueden al menos identificar criaturas cercanas y lugares de interés.'
  },
  {
    id: 'tasha_hideous_laughter', name: 'Risa Aterradora de Tasha', level: 1,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (pequeñas tartas y una pluma que se agita en el aire)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'wizard'],
    description: 'Una criatura de tu elección que puedas ver dentro del alcance percibe todo como tremendamente cómico y cae en carcajadas si falla una salvación de Sabiduría. Está incapacitada y derribada durante la duración. Al final de cada turno el objetivo puede repetir la salvación.'
  },
  {
    id: 'thunderwave', name: 'Ola de Trueno', level: 1,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: 'Personal (cubo de 15 pies)',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'druid', 'sorcerer', 'wizard'],
    description: 'Una ola de fuerza truena de ti. Cada criatura en un cubo de 15 pies que surge de ti debe superar una salvación de Constitución. Falla: 2d8 de daño de trueno y es empujada 10 pies. Éxito: la mitad de daño y no es empujada. Los objetos no sostenidos son también empujados. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'unseen_servant', name: 'Sirviente Invisible', level: 1, ritual: true,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (una pizca de cuerda de nudos y madera)', duration: '1 hora', concentration: false,
    classes: ['bard', 'warlock', 'wizard'],
    description: 'Este hechizo crea a una fuerza invisible y sin mente a tu mando. El sirviente aparece en un punto no ocupado en el suelo dentro del alcance. Realiza tareas simples que le des, como coger, subir, bajar, limpiar, cuidar, abrir o cerrar. No puede luchar ni hacer más de 10 libras de trabajo.'
  },
  {
    id: 'witch_bolt', name: 'Rayo de Bruja', level: 1,
    school: 'Evocación', type: 'Daño Sostenido', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (una ramita de un árbol alcanzado por un rayo)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Un rayo de energía de rayo crujiente forma un arco continuo entre tú y un objetivo dentro del alcance. Haz un ataque de conjuro a distancia. Con un impacto, el objetivo recibe 1d12 de daño de relámpago, y en cada uno de tus turnos que dure el hechizo, puedes usar tu acción para infligir 1d12 de relámpago automáticamente. A niveles superiores: +1d12 por nivel.'
  },
  {
    id: 'wrathful_smite', name: 'Golpe Furioso', level: 1,
    school: 'Evocación', type: 'Control', castingTime: '1 acción adicional', range: 'Personal',
    components: 'V', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['paladin'],
    description: 'La próxima vez que golpees con un ataque de arma, el ataque inflige 1d6 de daño síquico adicional. Además, el objetivo debe superar una salvación de Sabiduría o quedar asustado de ti hasta que el hechizo termine.'
  },
];

// ============================================================
// NIVEL 2 — CONJUROS
// ============================================================
export const SPELLS_LEVEL_2: SpellDefinition[] = [
  {
    id: 'acid_arrow', name: 'Flecha de Ácido de Melf', level: 2,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '90 pies',
    components: 'V, S, M (polvo de ruibarbo y hígado de víbora)', duration: 'Instantáneo', concentration: false,
    classes: ['wizard'],
    description: 'Un destello deslumbrante de color verde chisporrotea hacia un objetivo dentro del alcance y estalla en una explosión de ácido. Haz un ataque de conjuro a distancia. Con un impacto, el objetivo recibe 4d4 de daño por ácido inmediatamente y 2d4 de daño por ácido al final de su siguiente turno. Con un fallo, la flecha salpica al objetivo con ácido por la mitad del daño, sin el daño posterior. A niveles superiores: +1d4 inmediato y +1d4 posterior por nivel.'
  },
  {
    id: 'aid', name: 'Auxilio', level: 2,
    school: 'Abjuración', type: 'Soporte', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (una curita de tela y agua bendita)', duration: '8 horas', concentration: false,
    classes: ['cleric', 'paladin'],
    description: 'Tu hechizo fortalece y anima a tus aliados con firmeza y determinación. Elige hasta tres criaturas dentro del alcance. El máximo de PG de cada objetivo aumenta en 5 durante la duración. A niveles superiores: +5 PG por nivel sobre el 2.'
  },
  {
    id: 'alter_self', name: 'Alterar el Yo', level: 2,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Asumir una forma diferente. Cuando lanzas el hechizo, elige una de las opciones: Adaptación acuática (respiras agua), Cambio de apariencia (parecerte a otro), o Armas naturales (añades 1d6 de daño en ataques desarmados).'
  },
  {
    id: 'animal_messenger', name: 'Mensajero Animal', level: 2, ritual: true,
    school: 'Encantamiento', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (un bocado de comida)', duration: '24 horas', concentration: false,
    classes: ['bard', 'druid', 'ranger'],
    description: 'Con este hechizo, usas a un animal para entregar un mensaje. Elige una bestia Diminuta no hostil en tu alcance y da un descripcón de tu destino. El animal viajará e intentará entregar el mensaje. A niveles superiores: la duración se duplica por nivel.'
  },
  {
    id: 'arcane_lock', name: 'Cerradura Arcana', level: 2,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (oro en polvo de al menos 25 po)', duration: 'Hasta que se elimine', concentration: false,
    classes: ['wizard'],
    description: 'Tocas una superficie cerrada (puerta, ventana, cofre, libro). La cerradura se asegura mágicamente. La CD para abrirla con fuerza o desactivar trampas aumenta en 10. Aquellos que elijas pueden abrirla sin problema. Puedes establecer una contraseña que suprima el hechizo temporalmente.'
  },
  {
    id: 'augury', name: 'Agüero', level: 2, ritual: true,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 minuto', range: 'Personal',
    components: 'V, S, M (herramientas especiales de adivinación: huesos, varillas, cartas, etc.)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Al tirar talismanes, recibes un presagio de si el plan que contemplas en los próximos 30 minutos resultará en bien (Weal), daño (Woe), bien y daño (Weal y Woe) o ninguno. El hechizo no predice las acciones de otros personajes.'
  },
  {
    id: 'barkskin', name: 'Corteza de Árbol', level: 2,
    school: 'Transmutación', type: 'Defensa', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (un puñado de corteza de árbol)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['druid', 'ranger'],
    description: 'Tocas a una criatura voluntaria. La CA del objetivo no puede ser inferior a 16, independientemente de lo que lleven puesto, durante la duración.'
  },
  {
    id: 'blindness_deafness', name: 'Ceguera/Sordera', level: 2,
    school: 'Nigromancia', type: 'Control', castingTime: '1 acción', range: '30 pies',
    components: 'V', duration: '1 minuto', concentration: false,
    classes: ['bard', 'cleric', 'sorcerer', 'wizard'],
    description: 'Puedes cegar o ensordecer a un enemigo. Elige una criatura dentro del alcance. Debe superar una salvación de Constitución o estar ciega o sorda (tú eliges). Al final de cada uno de los turnos del objetivo, puede repetir la salvación. A niveles superiores: una criatura más por nivel.'
  },
  {
    id: 'blur', name: 'Desenfoque', level: 2,
    school: 'Ilusión', type: 'Defensa', castingTime: '1 acción', range: 'Personal',
    components: 'V', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Tu cuerpo se vuelve borroso, cambiando y ondeando para todos los que te ven. Durante la duración, cualquier criatura tiene desventaja en las tiradas de ataque contra ti. Una criatura que no dependa de la vista (visión ciega o vidente) goza de inmunidad a este efecto.'
  },
  {
    id: 'branding_smite', name: 'Golpe Ardiente', level: 2,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción adicional', range: 'Personal',
    components: 'V', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['paladin'],
    description: 'La próxima vez que impactes a una criatura con un ataque de arma durante la duración del hechizo, el arma brilla con un fuego astral y el ataque hace 2d6 de daño radiante adicional y la criatura se vuelve visible si era invisible, y brillará durante la duración. A niveles superiores: +1d6 por nivel.'
  },
  {
    id: 'calm_emotions', name: 'Calmar las Emociones', level: 2,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'cleric'],
    description: 'Intentas suprimir fuertes emociones en un grupo de personas. Cada humanoide en una esfera de 20 pies centrada en un punto que elijas dentro del alcance debe superar una salvación de Carisma. El objetivo se vuelve indiferente a los efectos de estar asustado o encantado, o a las hostilidades.'
  },
  {
    id: 'cloud_of_daggers', name: 'Nube de Dagas', level: 2,
    school: 'Conjuración', type: 'Daño Sostenido', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un trozo de hierro)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Llenas un cubo de 5 pies vacío con un torbellino de dagas. Una criatura que entre en el área o empiece su turno ahí recibe 4d4 de daño cortante. A niveles superiores: +2d4 por nivel.'
  },
  {
    id: 'continual_flame', name: 'Llama Continua', level: 2,
    school: 'Evocación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (rubí en polvo de 50 po)', duration: 'Hasta que se elimine', concentration: false,
    classes: ['cleric', 'wizard'],
    description: 'Una llama aparece en un objeto que tocas. La llama parece normal pero no produce calor, no requiere oxígeno, e ilumina 20 pies de luz brillante y 20 más de luz tenue. No se puede apagar con agua u otros métodos mundanos.'
  },
  {
    id: 'crown_of_madness', name: 'Corona de la Locura', level: 2,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Un humanoide de tu elección que puedas ver dentro del alcance debe superar una salvación de Sabiduría, o está encantado por ti durante la duración. La criatura encantada tiene que atacar a la criatura de tu elección al comienzo de cada uno de sus turnos (excepto tú). Requiere tu acción en cada turno para mantenerla bajo control.'
  },
  {
    id: 'darkness', name: 'Oscuridad', level: 2,
    school: 'Evocación', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, M (pelo de un murciélago y una gota de brea)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'La oscuridad mágica se extiende de un punto que elijas dentro del alcance, llenando una esfera de 15 pies de radio. La oscuridad se extiende a la vuelta de las esquinas. Una criatura con visión en la oscuridad no puede ver a través de esta oscuridad mágica. Puedes adjuntarlo a un objeto.'
  },
  {
    id: 'darkvision', name: 'Visión en la Oscuridad', level: 2,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una zanahoria seca o una piedra de ágata)', duration: '8 horas', concentration: false,
    classes: ['druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Tocas a una criatura voluntaria para otorgarle visión en la oscuridad. Durante la duración, esa criatura tiene visión en la oscuridad en un radio de 60 pies.'
  },
  {
    id: 'detect_thoughts', name: 'Detectar Pensamientos', level: 2,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (una moneda de cobre)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Durante la duración, puedes leer los pensamientos de ciertas criaturas. Cuando lanzas el hechizo, y como acción en cada turno hasta que el hechizo termine, puedes centrar tu mente en cualquier criatura que puedas ver a 30 pies para leer sus pensamientos superficiales.'
  },
  {
    id: 'dust_devil', name: 'Torbellino de Polvo', level: 2,
    school: 'Conjuración', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un pellizco de polvo)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Evocas un pequeño elemento del plano elemental aire que llena un cubo de 5 pies vacío en el alcance. El diablo de polvo dura mientras el hechizo esté activo. Cualquier criatura que termine su turno en el espacio del diablo de polvo debe realizar una salvación de Fuerza o recibir 1d8 de daño contundente. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'enhance_ability', name: 'Mejorar la Habilidad', level: 2,
    school: 'Transmutación', type: 'Soporte', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (pelo o plumas de un animal)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'cleric', 'druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Tocas a una criatura y le otorgas mejora. Elige uno: Fuerza del Oso (+2d6 PG temp y ventaja en pruebas de Fuerza), Gracia del Gato (ventaja en Destreza), Resistencia del Búfalo (ventaja en Con), Agudeza del Zorro (ventaja en Int), Sabiduría del Búho (ventaja en Sab), Carisma del Aguila (ventaja en Car).'
  },
  {
    id: 'enlarge_reduce', name: 'Agrandar/Reducir', level: 2,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (un pellizco de polvo de hierro)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Agrandar: El objetivo y equipo se duplican. Sus ataques de arma hacen 1d4 extra de daño. Reducir: El objetivo se reduce a la mitad. Sus ataques de arma hacen 1d4 menos de daño (mínimo 1). Afecta ventajas/desventajas en ciertos ataques.'
  },
  {
    id: 'enthrall', name: 'Fascinar', level: 2,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: '1 minuto', concentration: false,
    classes: ['bard', 'warlock'],
    description: 'Pronuncias una diatriba fascinante hasta que el conjuro asalte. Las criaturas que puedas ver y que puedan oírte (hasta 60 pies) deben superar una salvación de Sabiduría o quedar fascinadas. El efecto termina si dejan de oírte o si reciben daño.'
  },
  {
    id: 'find_steed', name: 'Encontrar un Corcel', level: 2,
    school: 'Conjuración', type: 'Utilidad', castingTime: '10 minutos', range: '30 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['paladin'],
    description: 'Convocas un espíritu que asume la forma de un corcel inusualmente inteligente, fuerte y leal, creando un vínculo duradero contigo. Puede aparecer como un caballo de guerra, pony, camello, alce o mastín.'
  },
  {
    id: 'flaming_sphere', name: 'Esfera de Fuego', level: 2,
    school: 'Conjuración', type: 'Daño Sostenido', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un poco de sebo, un trozo de azufre e incienso en polvo)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'wizard'],
    description: 'Una esfera de fuego de 5 pies de diámetro aparece en un espacio vacío de tu elección. Cualquier criatura que termine su turno dentro de 5 pies de la esfera debe superar una salvación de Destreza o recibir 2d6 de daño de fuego. Puedes moverla hasta 30 pies como acción adicional. A niveles superiores: +1d6 por nivel.'
  },
  {
    id: 'gentle_repose', name: 'Reposo Apacible', level: 2, ritual: true,
    school: 'Nigromancia', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una pizca de sal y una moneda de cobre colocada en cada ojo del cadáver)', duration: '10 días', concentration: false,
    classes: ['cleric', 'wizard'],
    description: 'Tocas un cadáver para protegerlo de la descomposición y evitar que se convierta en no-muerto durante la duración. El cadáver está preservado durante la duración del conjuro.'
  },
  {
    id: 'gust_of_wind', name: 'Ráfaga de Viento', level: 2,
    school: 'Evocación', type: 'Control', castingTime: '1 acción', range: 'Personal (línea de 60 pies)',
    components: 'V, S, M (una legumbre)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Una línea de fuerte viento de 60 pies de largo y 10 pies de ancho sopla desde ti en la dirección de tu elección. Las criaturas en la línea deben superar una salvación de Fuerza o ser empujadas 15 pies. El viento se dispersa gases y vapores, apaga velas y objetos sin llama.'
  },
  {
    id: 'heat_metal', name: 'Calentar Metal', level: 2,
    school: 'Transmutación', type: 'Daño Sostenido', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un trozo de hierro y una llama)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'druid'],
    description: 'Elige un objeto de metal manufacturado dentro del alcance. Haces el objeto brillantemente caliente. Cualquier criatura en contacto físico debe superar una salvación de Constitución o recibir 2d8 de daño por fuego. Puedes infligirlo de nuevo por acción adicional. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'hold_person', name: 'Paralizar Persona', level: 2,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un pequeño trozo de hierro recto)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'cleric', 'druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Elige a un humanoide que puedas ver dentro del alcance. El objetivo debe superar una salvación de Sabiduría o quedar paralizado. Al final de cada uno de sus turnos puede intentar la salvación de nuevo. A niveles superiores: una criatura más por nivel.'
  },
  {
    id: 'invisibility', name: 'Invisibilidad', level: 2,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una pestaña envuelta en goma arábiga)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Una criatura que toques se vuelve invisible hasta que el hechizo termine. Todo lo que el objetivo esté vistiendo o llevando es invisible siempre y cuando esté en su persona. El hechizo termina para un objetivo que ataque o lance un hechizo. A niveles superiores: una criatura más por nivel.'
  },
  {
    id: 'knock', name: 'Abrir', level: 2,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Eliges un objeto dentro del alcance. Un candado mundano, un candado cerrado o bloqueado, o unos grilletes se abren. Cuando lances el conjuro, un ruido fuerte y resonante puede oírse hasta 300 pies de distancia.'
  },
  {
    id: 'lesser_restoration', name: 'Restauración Menor', level: 2,
    school: 'Abjuración', type: 'Curación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger'],
    description: 'Tocas a una criatura y terminas una enfermedad o una condición que la afecte. La condición puede ser cegada, ensordecida, paralizada o envenenada.'
  },
  {
    id: 'levitate', name: 'Levitar', level: 2,
    school: 'Transmutación', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un pequeño lazo de cuero o un fragmento de hueso)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Una criatura o un objeto de tu elección que puedas ver asciende verticalmente hasta 20 pies y permanece allí. El objetivo puede moverse solo de forma horizontal. Tú o el objetivo pueden realizar una salvación de Constitución para terminar el efecto.'
  },
  {
    id: 'locate_animals_or_plants', name: 'Localizar Animales o Plantas', level: 2, ritual: true,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (pelo de un sabueso)', duration: '(Instantáneo)', concentration: false,
    classes: ['bard', 'druid', 'ranger'],
    description: 'Describes o nombras un tipo específico de bestia o planta y sintonizas con el sentido de la naturaleza. Si ese tipo está dentro de 5 millas, aprendes la dirección y distancia del espécimen más cercano.'
  },
  {
    id: 'locate_object', name: 'Localizar Objeto', level: 2,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (una horquilla bifurcada)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['bard', 'cleric', 'druid', 'paladin', 'ranger', 'wizard'],
    description: 'Describes o nombra un objeto y sientes su dirección mientras esté en 1000 pies de distancia. Si el objeto está en movimiento, conoces la dirección en la que se mueve. Puedes buscar un objeto específico si puedes recordarlo o un tipo de objeto.'
  },
  {
    id: 'magic_mouth', name: 'Boca Mágica', level: 2, ritual: true,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 minuto', range: '30 pies',
    components: 'V, S, M (un pedazo de panal de miel y polvo de jade de 10 po)', duration: 'Hasta que se elimine', concentration: false,
    classes: ['bard', 'wizard'],
    description: 'Implanta un mensaje en un objeto dentro del alcance. El mensaje es dicho cuando una condición designada por ti se cumple. La condición puede ser tan específica como quieras. El mensaje puede durar hasta 25 palabras y se pronuncia durante 10 minutos.'
  },
  {
    id: 'magic_weapon', name: 'Arma Mágica', level: 2,
    school: 'Transmutación', type: 'Soporte', castingTime: '1 acción adicional', range: 'Toque',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['paladin', 'wizard'],
    description: 'Tocas un arma no mágica. Esta arma se convierte en un arma mágica y tiene un bonificador de +1 a las tiradas de ataque y daño. A niveles superiores: +2 (4-5), +3 (6+).'
  },
  {
    id: 'melfs_acid_arrow', name: 'Flecha de Ácido de Melf', level: 2,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '90 pies',
    components: 'V, S, M (polvo de ruibarbo y hígado de víbora)', duration: 'Instantáneo', concentration: false,
    classes: ['wizard'],
    description: 'Un destello verde chisporrotea hacia un objetivo. Ataque de conjuro a distancia: 4d4 ácido en impacto más 2d4 al principio de su siguiente turno. Si falla, mitad de daño sin efecto posterior. A niveles superiores: +1d4 (impacto) y +1d4 (posterior) por nivel.'
  },
  {
    id: 'mirror_image', name: 'Imagen Espejo', level: 2,
    school: 'Ilusión', type: 'Defensa', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '1 minuto', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Tres duplicados ilusorios de ti mismo aparecen en tu espacio. Hasta que el hechizo termine, los duplicados se mueven contigo y copian tus acciones. Cuando una criatura te apunta, tira un d20 para ver si apunta al original o a un duplicado.'
  },
  {
    id: 'misty_step', name: 'Paso Brumoso', level: 2,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 acción adicional', range: 'Personal',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Brevemente envuelto en niebla plateada, te tele transportas hasta 30 pies a un espacio desocupado que puedas ver.'
  },
  {
    id: 'moonbeam', name: 'Rayo de Luna', level: 2,
    school: 'Evocación', type: 'Daño Sostenido', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (varias semillas de helecho y un trozo de opalita)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid'],
    description: 'Un rayo de luz pálida y pulsante brilla hacia abajo en un cilindro de 5 pies de radio y 40 pies de altura centrado en un punto dentro del alcance. Las formas cambiantes son repelidas; cada criatura en el área al comienzo de su turno debe superar una salvación de Constitución o recibir 2d10 radiante. A niveles superiores: +1d10 por nivel.'
  },
  {
    id: 'nystuls_magic_aura', name: 'Aura Mágica de Nystul', level: 2,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (un pedazo pequeño de tela de seda)', duration: '24 horas', concentration: false,
    classes: ['wizard'],
    description: 'Pones una ilusión en una criatura u objeto que toques para que los hechizos de adivinación revelen falsa información. Hasta que el hechizo termine, puedes hacer que aparezca como mágico, no mágico o de tipo diferente.'
  },
  {
    id: 'pass_without_trace', name: 'Pasar Sin Dejar Rastro', level: 2,
    school: 'Abjuración', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (ceniza de madera quemada de ébano)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['druid', 'ranger'],
    description: 'Una cubierta de sombra y silencio irradia de ti, enmascarando a ti y tus compañeros de la detección. Durante la duración, cada criatura que elijas a 30 pies tiene un bonificador de +10 a las pruebas de Sigilo (Destreza) y no puede ser rastreado por medios no mágicos.'
  },
  {
    id: 'prayer_of_healing', name: 'Oración de Curación', level: 2,
    school: 'Evocación', type: 'Curación', castingTime: '10 minutos', range: '30 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Hasta seis criaturas de tu elección que puedas ver dentro del alcance recuperan cada una PG iguales a 2d8 + tu modificador de habilidad mágica. Este hechizo no tiene efecto en los muertos vivientes o los constructos. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'protection_from_poison', name: 'Protección contra el Veneno', level: 2,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: '1 hora', concentration: false,
    classes: ['cleric', 'druid', 'paladin', 'ranger'],
    description: 'Tocas a una criatura. Si está envenenada, neutralizas el veneno. Si más de un veneno la afecta, neutralizas uno que sabías que estaba ahí. Durante la duración, el objetivo tiene ventaja en las tiradas de salvación contra veneno y tiene resistencia al daño por veneno.'
  },
  {
    id: 'ray_of_enfeeblement', name: 'Rayo de Debilitamiento', level: 2,
    school: 'Nigromancia', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['warlock', 'wizard'],
    description: 'Un rayo de energía negra debilitante salta de tu dedo hacia una criatura dentro del alcance. Haz un ataque de conjuro a distancia. Con un impacto, el objetivo inflige solo la mitad de daño con ataques de arma usando su Fuerza. Al final de cada turno, puede hacer una salvación de Constitución para terminar el efecto.'
  },
  {
    id: 'rope_trick', name: 'Truco de la Cuerda', level: 2,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (polvo en polvo de maíz y algo de torcer)', duration: '1 hora', concentration: false,
    classes: ['wizard'],
    description: 'Tocas una cuerda de hasta 60 pies. Un extremo asciende en el aire. Al final, hasta ocho criaturas pueden subir a un espacio extradimensional que no puede ser detectado desde el exterior.'
  },
  {
    id: 'scorching_ray', name: 'Rayo Ardiente', level: 2,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Creas tres rayos de fuego y los lanzas a objetivos dentro del alcance. Puedes dirigirlos al mismo objetivo o a diferentes. Haz un ataque de conjuro a distancia por cada rayo. Con un impacto, el objetivo recibe 2d6 de daño de fuego. A niveles superiores: un rayo más por nivel.'
  },
  {
    id: 'see_invisibility', name: 'Ver la Invisibilidad', level: 2,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (un pellizco de talco y una pequeña cantidad de pólvora de plata)', duration: '1 hora', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Durante la duración, ves las criaturas y objetos invisibles como si fueran visibles, y puedes ver el Plano Etéreo, ambas hasta 60 pies de distancia.'
  },
  {
    id: 'shatter', name: 'Destrozar', level: 2,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un fragmento de mica)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Un ruido repentino atronador chirría dolorosamente desde un punto de tu elección dentro del alcance. Cada criatura en una esfera de 10 pies centrada en ese punto debe superar una salvación de Constitución o sufrir 3d8 de daño sónico. Los objetos inorgánicos siempre fallan y las criaturas hechas de roca, metal u otros materiales inorgánicos tienen desventaja. A niveles superiores: +1d8 por nivel.'
  },
  {
    id: 'silence', name: 'Silencio', level: 2, ritual: true,
    school: 'Ilusión', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['bard', 'cleric', 'ranger'],
    description: 'Por la duración del hechizo, ningún sonido puede ser creado dentro o pasar a través de una esfera de 20 pies de radio centrada en un punto que elijas dentro del alcance. Cualquier criatura o objeto en la esfera es inmune al daño de trueno y ensorderada mientras esté en ella. Lanzar un hechizo con componente verbal es imposible dentro.'
  },
  {
    id: 'skywrite', name: 'Escribir en el Cielo', level: 2, ritual: true,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'druid', 'wizard'],
    description: 'Causas que hasta diez palabras se formen en nubes de escritura visible en el cielo. Las palabras deberían estar en una lengua que sepas. Las palabras se forman como caracteres de 10 pies de alto.'
  },
  {
    id: 'spider_climb', name: 'Trepar por las Paredes', level: 2,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una gota de betún de Judea y una araña)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Hasta que el hechizo termine, una criatura voluntaria que toques gana la capacidad de moverse hacia arriba, hacia abajo y a lo largo de superficies verticales y de cabeza abajo sobre el techo, mientras que dejas sus manos libres. La velocidad de escalar del objetivo es igual a su velocidad normal.'
  },
  {
    id: 'spiritual_weapon', name: 'Arma Espiritual', level: 2,
    school: 'Evocación', type: 'Daño Sostenido', castingTime: '1 acción adicional', range: '60 pies',
    components: 'V, S', duration: '1 minuto', concentration: false,
    classes: ['cleric'],
    description: 'Creas un arma espectral en el alcance que perdura. Como acción adicional en tu turno, puedes mover el arma hasta 20 pies y ataques con ella (ataque de conjuro): 1d8 + tu mod mágico en daño radiante. El tipo de arma es tu elección. A niveles superiores: +1d8 por 2 niveles sobre el 2.'
  },
  {
    id: 'suggestion', name: 'Sugestión', level: 2,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '30 pies',
    components: 'V, M (la lengua de una serpiente y ya sea chochín del campo o media manzana envuelto en pergamino)', duration: 'Concentración, hasta 8 horas', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Sugieres una actividad a un ser que puedas ver dentro del alcance. La criatura debe poder entenderte. La sugestión debe sonar razonable. El objetivo debe superar una salvación de Sabiduría o seguir la sugestión. El hechizo termina cuando la sugestión se completa o cuando la criatura sufre daño.'
  },
  {
    id: 'warding_bond', name: 'Vínculo Protector', level: 2,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (un par de anillos de platino de 50 po cada uno, ambos que deben llevar el lanzador y el objetivo)', duration: '1 hora', concentration: false,
    classes: ['cleric'],
    description: 'Este hechizo protege a una criatura voluntaria que toques. El objetivo gana +1 a la CA y tiradas de salvación, y tiene resistencia al daño. Además, cada vez que el objetivo recibe daño, recibes la misma cantidad de daño. El hechizo termina si el lanzador cae a 0 PG.'
  },
  {
    id: 'web', name: 'Tela de Araña', level: 2,
    school: 'Conjuración', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un trozo de tela de araña)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Lanzas hebras gruesas de tela de araña pegajosa desde tu mano, llenando un cubo de 20 pies vacío dentro del alcance. Las criaturas que comiencen su turno en el área o entren en el área durante su turno deben superar una salvación de Destreza o quedar restringidas. Las criaturas restringidas pueden repetir al final de su turno.'
  },
  {
    id: 'zone_of_truth', name: 'Zona de la Verdad', level: 2,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: '10 minutos', concentration: false,
    classes: ['bard', 'cleric', 'paladin'],
    description: 'Creas una zona mágica que protege contra el engaño en una esfera de 15 pies de radio centrada en un punto de tu elección dentro del alcance. Las criaturas que fallan una salvación de Carisma cuando entran no pueden mentir deliberadamente mientras estén en el área. Saben si pueden o no mentir.'
  }
];

// ============================================================
// NIVEL 3 (PLAYER'S HANDBOOK)
// ============================================================
export const SPELLS_LEVEL_3: SpellDefinition[] = [
  {
    id: 'animate_dead', name: 'Animar Muertos', level: 3,
    school: 'Nigromancia', type: 'Control', castingTime: '1 minuto', range: '10 pies',
    components: 'V, S, M (un hueso o un trozo de carne)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'wizard'],
    description: 'Este hechizo crea un sirviente no-muerto. Eliges un túmulo de huesos o un cadáver de un humanoide de tamaño Pequeño o Mediano dentro del alcance. Tu hechizo imbuye el objetivo con una mímica de vida, convirtiéndolo en una criatura no-muerta: un esqueleto si eliges huesos o un zombi si eliges un cadáver. El no-muerto está bajo tu control durante 24 horas, tras las cuales debes relanzar el hechizo para mantener el control. Como acción adicional, puedes ordenar mentalmente a cualquier criatura que hayas creado con este hechizo. A niveles superiores: +2 no-muertos por cada nivel por encima de 3.'
  },
  {
    id: 'bestow_curse', name: 'Imponer Maldición', level: 3,
    school: 'Nigromancia', type: 'Control', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric', 'wizard'],
    description: 'Tocas a una criatura, la cual debe realizar una salvación de Sabiduría. Si falla, queda maldita por la duración del hechizo. Al lanzarlo, elige la naturaleza de la maldición: desventaja en las tiradas de característica y salvaciones de una característica elegida; desventaja en las tiradas de ataque contra ti; la criatura debe realizar una salvación de Sabiduría al comienzo de cada uno de sus turnos o desperdiciar su acción; o tus ataques y hechizos contra la criatura infligen 1d8 de daño necrótico adicional. A niveles superiores: la duración aumenta (10 min a nivel 4, 8 horas a nivel 5, 24 horas a nivel 7) y no requiere concentración a nivel 5 o superior.'
  },
  {
    id: 'blink', name: 'Parpadeo', level: 3,
    school: 'Transmutación', type: 'Defensa', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '1 minuto', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Lanzas un dado de 20 al final de cada uno de tus turnos mientras dure el hechizo. Con un resultado de 11 o más, te desvaneces del plano actual y apareces en el Plano Etéreo. Al comienzo de tu próximo turno, regresas a un espacio desocupado que elijas a menos de 10 pies del lugar donde desapareciste. Mientras estás en el Plano Etéreo, puedes ver y oír el plano del que viniste, pero todo parece gris y no puedes ver más allá de 60 pies. Solo otras criaturas en el Plano Etéreo pueden interactuar contigo.'
  },
  {
    id: 'clairvoyance', name: 'Clarividencia', level: 3,
    school: 'Adivinación', type: 'Utilidad', castingTime: '10 minutos', range: '1 milla',
    components: 'V, S, M (un foco que cuesta 100 po: un cuerno de cristal para oír o un ojo de cristal para ver)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['bard', 'cleric', 'sorcerer', 'wizard'],
    description: 'Creas un sensor invisible en un lugar familiar para ti o en un lugar obvio que elijas dentro del alcance. Al lanzar el hechizo, eliges si el sensor permite ver u oír. Como acción, puedes cambiar entre ver y oír. Una criatura que pueda ver lo invisible ve el sensor como una esfera luminosa del tamaño de un puño.'
  },
  {
    id: 'counterspell', name: 'Contraconjuro', level: 3,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 reacción', range: '60 pies',
    components: 'S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Intentas interrumpir a una criatura que está lanzando un conjuro. Si el conjuro es de nivel 3 o inferior, falla y no tiene efecto. Si es de nivel 4 o superior, realiza una tirada de tu característica mágica contra una CD de 10 + el nivel del conjuro. Si tienes éxito, el conjuro falla. A niveles superiores: el conjuro interrumpido falla automáticamente si su nivel es menor o igual al nivel en el que lanzas este hechizo.'
  },
  {
    id: 'daylight', name: 'Luz del Día', level: 3,
    school: 'Evocación', type: 'Utilidad', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: '1 hora', concentration: false,
    classes: ['cleric', 'druid', 'paladin', 'ranger', 'sorcerer'],
    description: 'Una esfera de 60 pies de radio de luz brillante emana de un punto que elijas dentro del alcance, y luz tenue se extiende por otros 60 pies. Si eliges un objeto que estás sosteniendo o que no está siendo llevado por nadie, la luz emana del objeto y se mueve con él. Si el área del hechizo se solapa con un área de oscuridad creada por un conjuro de nivel 3 o inferior, el conjuro de oscuridad queda disipado.'
  },
  {
    id: 'dispel_magic', name: 'Disipar Magia', level: 3,
    school: 'Abjuración', type: 'Utilidad', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'paladin', 'sorcerer', 'warlock', 'wizard'],
    description: 'Eliges una criatura, objeto o efecto mágico dentro del alcance. Cualquier conjuro de nivel 3 o inferior sobre el objetivo termina. Para cada conjuro de nivel 4 o superior, realiza una tirada de tu característica mágica contra una CD de 10 + el nivel del conjuro. Con éxito, el conjuro termina. A niveles superiores: los efectos de conjuros terminan automáticamente si su nivel es menor o igual al nivel del espacio de conjuro que uses.'
  },
  {
    id: 'fear', name: 'Miedo', level: 3,
    school: 'Ilusión', type: 'Control', castingTime: '1 acción', range: 'Cono de 30 pies',
    components: 'V, S, M (una pluma blanca o el corazón de una gallina)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Proyectas una imagen fantasmal de los peores miedos de las criaturas. Cada criatura en un cono de 30 pies debe superar una salvación de Sabiduría o quedar aterrada. Mientras esté aterrada, la criatura debe realizar la acción de Correr y alejarse de ti por la ruta más corta posible. Si la criatura termina su turno en un lugar donde no tiene línea de visión contigo, puede realizar otra salvación de Sabiduría para terminar el efecto.'
  },
  {
    id: 'feign_death', name: 'Fingir Muerte', level: 3,
    school: 'Nigromancia', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (un poco de tierra de cementerio)', duration: '1 hora', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'wizard'],
    description: 'Tocas a una criatura voluntaria y la sumerges en un estado cataléptico indistinguible de la muerte. Mientras dure el hechizo, el objetivo parece muerto para toda inspección externa y hechizos que detecten vida. El objetivo está cegado e incapacitado, su velocidad es 0 y tiene resistencia a todo el daño excepto el psíquico. Si el objetivo está envenenado o enfermo al lanzar el hechizo, o queda así durante el mismo, el veneno o la enfermedad no tienen efecto hasta que el hechizo termine.'
  },
  {
    id: 'fireball', name: 'Bola de Fuego', level: 3,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '150 pies',
    components: 'V, S, M (una bolita de guano de murciélago y azufre)', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Un rayo brillante sale de tu dedo hacia un punto que elijas dentro del alcance y estalla con un estruendo bajo en una explosión de llamas. Cada criatura en una esfera de 20 pies de radio centrada en ese punto debe realizar una salvación de Destreza. Una criatura recibe 8d6 de daño de fuego si falla la salvación, o la mitad si tiene éxito. El fuego se propaga por las esquinas y prende fuego a los objetos inflamables que no se estén llevando ni vistiendo. A niveles superiores: el daño aumenta en 1d6 por cada nivel por encima de 3.'
  },
  {
    id: 'fly', name: 'Volar', level: 3,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una pluma de ala de cualquier pájaro)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Tocas a una criatura voluntaria. El objetivo gana una velocidad de vuelo de 60 pies mientras dure el hechizo. Cuando el hechizo termina, el objetivo cae si todavía está en el aire, a menos que tenga otra forma de mantenerse. A niveles superiores: puedes afectar a una criatura adicional por cada nivel por encima de 3.'
  },
  {
    id: 'gaseous_form', name: 'Forma Gaseosa', level: 3,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una gasa y una gota de humo)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Transformas a una criatura voluntaria que toques, junto con todo lo que lleva puesto y transporta, en una nube brumosa mientras dure el hechizo. El objetivo gana resistencia al daño no mágico y ventaja en las tiradas de salvación de Fuerza, Destreza y Constitución. El objetivo puede pasar a través de pequeños agujeros y rendijas, pero es incapaz de atacar, lanzar hechizos o interactuar con objetos. Su velocidad de vuelo es de 10 pies y puede flotar.'
  },
  {
    id: 'glyph_of_warding', name: 'Glifo Custodio', level: 3,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 hora', range: 'Toque',
    components: 'V, S, M (diamante en polvo que vale al menos 200 po, que el hechizo consume)', duration: 'Hasta que sea disipado o activado', concentration: false,
    classes: ['bard', 'cleric', 'wizard'],
    description: 'Inscribes un glifo en una superficie o dentro de un objeto cerrable para guardar un área. Eliges un desencadenante (como abrir un cofre o leer un texto) y un efecto: Runa Explosiva (5d8 de daño ácido, frío, fuego, relámpago o trueno en una esfera de 20 pies, salvación de Destreza para la mitad) o Glifo de Hechizo (puedes almacenar un hechizo de nivel igual o inferior que se activará sobre el intruso). A niveles superiores: el daño aumenta en 1d8, o el nivel del hechizo almacenado aumenta.'
  },
  {
    id: 'haste', name: 'Acelerar', level: 3,
    school: 'Transmutación', type: 'Soporte', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (una viruta de raíz de regaliz)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Eliges una criatura voluntaria dentro del alcance. Hasta que el hechizo termine, la velocidad del objetivo se duplica, gana un bonificador de +2 a la CA, tiene ventaja en las tiradas de salvación de Destreza y gana una acción adicional en cada uno de sus turnos. Esta acción solo puede usarse para Atacar (un solo ataque de arma), Correr, Retirarse, Esconderse o Usar un objeto. Cuando el hechizo termina, el objetivo no puede moverse ni realizar acciones hasta después de su próximo turno.'
  },
  {
    id: 'hypnotic_pattern', name: 'Patrón Hipnótico', level: 3,
    school: 'Ilusión', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'S, M (una vara de incienso encendida o un vial de cristal lleno con material fosforescente)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Creas un patrón de colores que giran y vibran en el aire dentro de un cubo de 30 pies. Cada criatura en el área que lo vea debe superar una salvación de Sabiduría o quedar incapacitada y con velocidad 0 mientras dura el hechizo. El efecto termina para una criatura si recibe daño o si alguien usa su acción para sacudirla y despertarla.'
  },
  {
    id: 'leomunds_tiny_hut', name: 'Cúpula de Leomund', level: 3,
    school: 'Evocación', type: 'Utilidad', castingTime: '1 minuto', range: 'Personal (esfera de 10 pies de radio)',
    components: 'V, S, M (una pequeña cuenta de cristal)', duration: '8 horas', concentration: false,
    classes: ['bard', 'wizard'],
    description: 'Aparece una cúpula de fuerza de 10 pies de radio alrededor y por encima de ti. El hechizo falla si el área incluye una criatura de tamaño Grande o mayor, o más de nueve criaturas. La cúpula es inmóvil y la magia no puede pasar a través de ella. Las criaturas y objetos que estaban dentro al lanzarlo pueden pasar libremente, pero otros no. La atmósfera interior es cómoda y seca, sin importar el clima exterior. El hechizo termina si sales del área.'
  },
  {
    id: 'lightning_bolt', name: 'Relámpago', level: 3,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '100 pies',
    components: 'V, S, M (un trozo de piel y una vara de cristal)', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Un rayo de 100 pies de largo y 5 de ancho emana de ti. Cada criatura en la línea debe realizar una salvación de Destreza. Una criatura recibe 8d6 de daño de relámpago si falla, o la mitad si tiene éxito. El relámpago prende fuego a los objetos inflamables que no se estén llevando ni vistiendo. A niveles superiores: el daño aumenta en 1d6 por nivel sobre el 3.'
  },
  {
    id: 'magic_circle', name: 'Círculo Mágico', level: 3,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 minuto', range: '10 pies',
    components: 'V, S, M (agua bendita o incienso y plata en polvo de 100 po de valor, que el hechizo consume)', duration: '1 hora', concentration: false,
    classes: ['cleric', 'paladin', 'wizard'],
    description: 'Creas un cilindro de energía mágica de 10 pies de radio y 20 de alto centrado en un punto en el suelo. Eliges uno o más tipos de criaturas: celestiales, elementales, feéricos, infernales o no-muertos. Las criaturas del tipo elegido no pueden entrar voluntariamente en el cilindro, tienen desventaja en las tiradas de ataque contra criaturas dentro de él, y las criaturas en él no pueden ser hechizadas, asustadas o poseídas por ellas. A niveles superiores: la duración aumenta en 1 hora por cada nivel superior al 3.'
  },
  {
    id: 'major_image', name: 'Imagen Mayor', level: 3,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un poco de lana)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Creas la imagen visual de un objeto, una criatura o algún otro fenómeno visible que no sea mayor que un cubo de 20 pies. También incluye sonido, olor y temperatura. Como acción, puedes mover la imagen a cualquier lugar dentro del alcance. Una criatura puede discernir que es una ilusión con una tirada de Inteligencia (Investigación) contra tu CD de salvación de conjuros. A niveles superiores: si se lanza con un espacio de nivel 6 o superior, el hechizo dura hasta que sea disipado y no requiere concentración.'
  },
  {
    id: 'mass_healing_word', name: 'Palabra Sanadora Masiva', level: 3,
    school: 'Evocación', type: 'Curación', castingTime: '1 acción adicional', range: '60 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric'],
    description: 'Dices palabras de consuelo y hasta seis criaturas que puedas ver dentro del alcance recuperan una cantidad de puntos de golpe igual a 1d4 + tu modificador de característica mágica. Este hechizo no tiene efecto sobre no-muertos ni autómatas. A niveles superiores: la curación aumenta en 1d4 por cada nivel por encima de 3.'
  },
  {
    id: 'meld_into_stone', name: 'Fundirse con la Piedra', level: 3,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: '8 horas', concentration: false,
    classes: ['cleric', 'druid'],
    description: 'Te fundes con un objeto o superficie de piedra lo suficientemente grande para contener tu cuerpo. Mientras estás fundido con la piedra, no puedes ver lo que sucede fuera de ella y las tiradas de Sabiduría (Percepción) que realices para escuchar tienen desventaja. Tienes resistencia a todo el daño no mágico mientras estés en la piedra. Si el objeto de piedra es destruido, eres expulsado y recibes 6d6 de daño de fuerza.'
  },
  {
    id: 'nondetection', name: 'Indetección', level: 3,
    school: 'Abjuración', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (diamante en polvo de 25 po que el hechizo consume)', duration: '8 horas', concentration: false,
    classes: ['bard', 'ranger', 'wizard'],
    description: 'Ocultas a una criatura o un objeto que toques de la adivinación mágica. Por la duración, el objetivo no puede ser detectado por sensores de adivinación ni afectado por conjuros de adivinación como vaticinio.'
  },
  {
    id: 'phantom_steed', name: 'Corcel Fantasmal', level: 3,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 minuto', range: '30 pies',
    components: 'V, S', duration: '1 hora', concentration: false,
    classes: ['wizard'],
    description: 'Invocas a una criatura cuasi-real que toma la forma de un caballo. El corcel tiene CA 10, 1 punto de golpe y una velocidad de 100 pies. Puede transportar hasta 450 libras. Cuando el hechizo termina, el corcel tarda 1 minuto en desvanecerse. El hechizo termina prematuramente si el corcel recibe cualquier daño.'
  },
  {
    id: 'plant_growth', name: 'Crecimiento Vegetal', level: 3,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción o 8 horas', range: '150 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'druid', 'ranger'],
    description: 'Si lo lanzas en una acción, las plantas en un radio de 100 pies se vuelven densas y sobrecrecidas; el movimiento a través de ellas cuesta 4 pies por cada pie. Si lo lanzas durante 8 horas, enriqueces la tierra en un radio de 1 milla; las plantas producen el doble de comida normal al ser cosechadas durante un año.'
  },
  {
    id: 'protection_from_energy', name: 'Protección contra Energía', level: 3,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['cleric', 'druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Tocas a una criatura voluntaria. Por la duración, el objetivo tiene resistencia a un tipo de daño de tu elección: ácido, frío, fuego, relámpago o trueno.'
  },
  {
    id: 'remove_curse', name: 'Quitar Maldición', level: 3,
    school: 'Abjuración', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'paladin', 'warlock', 'wizard'],
    description: 'Al tocar una criatura u objeto, todas las maldiciones que le afecten terminan. Si el objeto es un objeto mágico maldito, su maldición permanece, pero el hechizo permite que su portador se desvincule de él y se deshaga de él.'
  },
  {
    id: 'revivify', name: 'Revivir', level: 3,
    school: 'Nigromancia', type: 'Curación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (diamantes por valor de 300 po, que el hechizo consume)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'paladin'],
    description: 'Tocas a una criatura que ha muerto en el último minuto. Esa criatura vuelve a la vida con 1 punto de golpe. Este hechizo no puede devolver a la vida a una criatura que haya muerto de vejez ni puede restaurar partes del cuerpo perdidas.'
  },
  {
    id: 'sending', name: 'Mensaje', level: 3,
    school: 'Evocación', type: 'Utilidad', castingTime: '1 acción', range: 'Ilimitado',
    components: 'V, S, M (un trozo de alambre de cobre fino)', duration: '1 ronda', concentration: false,
    classes: ['bard', 'cleric', 'wizard'],
    description: 'Envías un mensaje de 25 palabras o menos a una criatura que conozcas. La criatura escucha el mensaje en su mente y puede responder de inmediato. El hechizo permite enviar mensajes a través de cualquier distancia e incluso a otros planos de existencia, aunque hay una probabilidad del 5% de que el mensaje no llegue si el objetivo está en un plano diferente.'
  },
  {
    id: 'sleet_storm', name: 'Tormenta de Aguanieve', level: 3,
    school: 'Conjuración', type: 'Control', castingTime: '1 acción', range: '150 pies',
    components: 'V, S, M (un pellizco de polvo y unas gotas de agua)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Crea una tormenta de lluvia helada y granizo en un cilindro de 40 pies de radio y 20 de alto. El área es terreno difícil y está fuertemente oscurecida. Cuando una criatura entra en el área o comienza su turno allí, debe superar una salvación de Destreza o caer derribada. Si una criatura se está concentrando, debe superar una salvación de Constitución contra tu CD de salvación de conjuros o perder la concentración.'
  },
  {
    id: 'slow', name: 'Lentitud', level: 3,
    school: 'Transmutación', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (una gota de melaza)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Alteras el tiempo para hasta seis criaturas de tu elección en un cubo de 40 pies. Cada objetivo debe superar una salvación de Sabiduría o verse afectado. Su velocidad se reduce a la mitad, tienen un penalizador de -2 a la CA y a las salvaciones de Destreza, y no pueden realizar reacciones. En su turno, solo pueden realizar una acción o una acción adicional, no ambas. Además, el objetivo no puede realizar más de un ataque cuerpo a cuerpo o a distancia. Si intenta lanzar un conjuro, lanza un d20: con un 11 o más, el conjuro no entra en efecto hasta el próximo turno de la criatura.'
  },
  {
    id: 'speak_with_dead', name: 'Hablar con los Muertos', level: 3,
    school: 'Nigromancia', type: 'Utilidad', castingTime: '1 acción', range: '10 pies',
    components: 'V, S, M (incienso encendido)', duration: '10 minutos', concentration: false,
    classes: ['bard', 'cleric'],
    description: 'Otorgas un semblante de vida e inteligencia a un cadáver de tu elección dentro del alcance, permitiéndole responder a tus preguntas. El cadáver debe tener todavía boca y no puede ser un no-muerto. Puedes hacerle hasta cinco preguntas. El cadáver sabe solo lo que sabía en vida y no está obligado a responder con la verdad si eres un enemigo.'
  },
  {
    id: 'speak_with_plants', name: 'Hablar con Plantas', level: 3,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal (radio de 30 pies)',
    components: 'V, S', duration: '10 minutos', concentration: false,
    classes: ['bard', 'druid', 'ranger'],
    description: 'Imbuyes a las plantas en un radio de 30 pies con conciencia e inteligencia limitadas. Puedes cuestionarlas sobre eventos ocurridos en el área en el último día. También puedes pedirles que realicen tareas sencillas, como despejar un camino sobrecrecido (haciendo que el terreno difícil se vuelva normal) o atrapar a un intruso.'
  },
  {
    id: 'spirit_guardians', name: 'Guardianes Espirituales', level: 3,
    school: 'Conjuración', type: 'Daño Sostenido', castingTime: '1 acción', range: 'Personal (radio de 15 pies)',
    components: 'V, S, M (un relicario o símbolo sagrado)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['cleric'],
    description: 'Invocas espíritus para que te protejan. Rebolotean a tu alrededor en un radio de 15 pies. Cuando una criatura entra en el área por primera vez en un turno o comienza su turno allí, debe realizar una salvación de Sabiduría. Si falla, recibe 3d8 de daño radiante (si eres bueno o neutral) o necrótico (si eres malvado). Con éxito, recibe la mitad. Además, la velocidad de las criaturas afectadas se reduce a la mitad en el área. A niveles superiores: el daño aumenta en 1d8 por cada nivel por encima de 3.'
  },
  {
    id: 'stinking_cloud', name: 'Nube Apestosa', level: 3,
    school: 'Conjuración', type: 'Control', castingTime: '1 acción', range: '90 pies',
    components: 'V, S, M (un huevo podrido o un trozo de repollo mofeta)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Creas una esfera de 20 pies de radio de gas amarillo y nauseabundo centrado en un punto dentro del alcance. La nube se propaga por las esquinas y su área es de oscuridad total. Cualquier criatura que comience su turno dentro de la nube debe superar una salvación de Constitución o perder su acción ese turno debido a las náuseas. Las criaturas que no necesitan respirar o son inmunes al veneno tienen éxito automáticamente.'
  },
  {
    id: 'tongues', name: 'Lenguas', level: 3,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, M (un pequeño modelo de arcilla de un zigurat)', duration: '1 hora', concentration: false,
    classes: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'],
    description: 'Este hechizo otorga a la criatura que tocas la capacidad de entender cualquier idioma hablado que escuche. Además, cuando la criatura habla, cualquier criatura que sepa al menos un idioma puede entender lo que dice.'
  },
  {
    id: 'vampiric_touch', name: 'Toque Vampírico', level: 3,
    school: 'Nigromancia', type: 'Daño', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['warlock', 'wizard'],
    description: 'El toque de tu mano envuelta en sombras puede succionar la fuerza vital de otros. Realiza un ataque de conjuro cuerpo a cuerpo contra una criatura dentro de tu alcance. Si tienes éxito, el objetivo recibe 3d6 de daño necrótico y recuperas puntos de golpe iguales a la mitad de ese daño. Hasta que el hechizo termine, puedes realizar el ataque de nuevo en cada uno de tus turnos como una acción. A niveles superiores: el daño aumenta en 1d6 por nivel encima de 3.'
  },
  {
    id: 'water_breathing', name: 'Respirar Bajo el Agua', level: 3,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (una caña corta o una pieza de paja)', duration: '24 horas', concentration: false,
    classes: ['druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Este hechizo otorga la capacidad de respirar bajo el agua a hasta diez criaturas voluntarias que puedas ver dentro del alcance durante la duración. Las criaturas afectadas retienen su forma normal de respirar.'
  },
  {
    id: 'water_walk', name: 'Caminar sobre el Agua', level: 3,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (un trozo de corcho)', duration: '1 hora', concentration: false,
    classes: ['cleric', 'druid', 'ranger', 'sorcerer'],
    description: 'Este hechizo otorga la capacidad de moverse a través de cualquier superficie líquida (agua, barro, nieve, arena movediza, lava) como si fuera tierra firme a hasta diez criaturas voluntarias. Si el objetivo está sumergido al lanzarlo, es llevado a la superficie a una velocidad de 60 pies por ronda.'
  },
  {
    id: 'wind_wall', name: 'Muro de Viento', level: 3,
    school: 'Evocación', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un abanico diminuto y una pluma de ave exótica)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Un muro de viento fuerte aparece en un punto que elijas. Puede tener hasta 50 pies de largo, 15 de alto y 1 de ancho. Cuando aparece, cada criatura en su área debe realizar una salvación de Fuerza; si falla, recibe 3d8 de daño de fuerza. El muro bloquea gases, niebla y proyectiles pequeños (como flechas o virotes), los cuales son desviados hacia arriba y fallan automáticamente.'
  }
];

// ============================================================
// NIVEL 4 (PLAYER'S HANDBOOK)
// ============================================================
export const SPELLS_LEVEL_4: SpellDefinition[] = [
  {
    id: 'arcane_eye', name: 'Ojo Arcano', level: 4,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (un poco de pelo de murciélago)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['wizard'],
    description: 'Creas un ojo invisible y flotante que se mueve a tu orden. Puedes ver a través del ojo como si estuvieras en su espacio. El ojo tiene visión normal y visión en la oscuridad hasta 60 pies. Puedes mover el ojo hasta 30 pies en cualquier dirección como una acción.'
  },
  {
    id: 'banishment', name: 'Destierro', level: 4,
    school: 'Abjuración', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un objeto que sea desagradable para el objetivo)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric', 'paladin', 'sorcerer', 'warlock', 'wizard'],
    description: 'Intentas enviar a una criatura a otro plano de existencia. El objetivo debe superar una salvación de Carisma o ser desterrado. Si el objetivo es nativo del plano en el que estás, es enviado a un semiplano inofensivo; si es nativo de un plano diferente, regresa a su plano de origen. A niveles superiores: puedes afectar a una criatura adicional por cada nivel por encima de 4.'
  },
  {
    id: 'blight', name: 'Marchitar', level: 4,
    school: 'Nigromancia', type: 'Daño', castingTime: '1 acción', range: '30 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Inundamos a una criatura de energía nigromántica. El objetivo debe realizar una salvación de Constitución. Recibe 8d8 de daño necrótico si falla, o la mitad si tiene éxito. Este hechizo tiene un efecto especial sobre plantas: las criaturas planta tienen desventaja en la salvación y reciben el daño máximo. A niveles superiores: el daño aumenta en 1d8 por cada nivel por encima de 4.'
  },
  {
    id: 'confusion', name: 'Confusión', level: 4,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '90 pies',
    components: 'V, S, M (tres cáscaras de nuez)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'druid', 'sorcerer', 'wizard'],
    description: 'Este hechizo asalta las mentes de las criaturas en una esfera de 10 pies de radio. Cada criatura en el área debe superar una salvación de Sabiduría o quedar confundida. Una criatura confundida debe lanzar 1d10 al comienzo de cada uno de sus turnos para determinar su comportamiento (vagar, no actuar, atacar a una criatura cercana al azar). A niveles superiores: el radio de la esfera aumenta en 5 pies por cada nivel por encima de 4.'
  },
  {
    id: 'conjure_minor_elementals', name: 'Conjurar Elementales Menores', level: 4,
    school: 'Conjuración', type: 'Control', castingTime: '1 minuto', range: '90 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['druid', 'wizard'],
    description: 'Invocas espíritus elementales que aparecen en espacios desocupados dentro del alcance. Eliges una de las siguientes opciones: un elemental de VD 2 o inferior, dos elementales de VD 1 o inferior, cuatro elementales de VD 1/2 o inferior, u ocho elementales de VD 1/4 o inferior. Los elementales son amistosos contigo y tus compañeros, y obedecen tus órdenes verbales.'
  },
  {
    id: 'conjure_woodland_beings', name: 'Conjurar Seres del Bosque', level: 4,
    school: 'Conjuración', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (una baya de acebo por cada criatura invocada)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['druid', 'ranger'],
    description: 'Invocas criaturas feéricas que aparecen en espacios desocupados dentro del alcance. Eliges una opción similar a Conjurar Elementales Menores (VD 2, 1, 1/2 o 1/4). Las criaturas son amistosas y obedecen tus órdenes.'
  },
  {
    id: 'control_water', name: 'Controlar Agua', level: 4,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '300 pies',
    components: 'V, S, M (una gota de agua y un pellizco de polvo)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['cleric', 'druid', 'wizard'],
    description: 'Controlas cualquier masa de agua estancada o corriente en un área de 100 pies de lado. Puedes elegir uno de los siguientes efectos: Inundación (el nivel del agua sube), Desviar el Curso (cambias la dirección de una corriente), Remolino (creas un vórtice peligroso) o Partir las Aguas (creas un camino seco entre dos muros de agua).'
  },
  {
    id: 'death_ward', name: 'Protección contra la Muerte', level: 4,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: '8 horas', concentration: false,
    classes: ['cleric', 'paladin'],
    description: 'Tocas a una criatura y le otorgas una protección contra la muerte. La primera vez que el objetivo fuera a caer a 0 puntos de golpe como resultado de recibir daño, cae a 1 punto de golpe en su lugar. Si el objetivo es afectado por un efecto que lo mataría instantáneamente sin causar daño, ese efecto se anula sobre el objetivo.'
  },
  {
    id: 'dimension_door', name: 'Puerta Dimensional', level: 4,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 acción', range: '500 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Te teletransportas instantáneamente a cualquier lugar dentro del alcance que visualices o describas. Puedes traer contigo objetos (mientras no excedas tu capacidad de carga) y a una criatura voluntaria de tu tamaño o menor. Si llegas a un espacio ocupado, tú y la criatura reciben 4d6 de daño de fuerza y el teletransporte falla.'
  },
  {
    id: 'divination', name: 'Adivinación', level: 4,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (incienso y una ofrenda sacrificial apropiada de al menos 25 po, que el hechizo consume)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Tu ruego y sacrificio te ponen en contacto con un dios o un sirviente divino. Puedes hacer una única pregunta sobre una meta, evento o actividad específica que ocurrirá dentro de los próximos 7 días. El DJ ofrece una respuesta veraz, que puede ser una frase corta, un poema críptico o un presagio.'
  },
  {
    id: 'dominate_beast', name: 'Dominar Bestia', level: 4,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Intentas tomar el control de una bestia que puedas ver. El objetivo debe superar una salvación de Sabiduría o ser hechizado por ti. Tienes un vínculo telepático con ella y puedes usar tu acción para tomar el control total de sus acciones. Cada vez que la bestia reciba daño, realiza una nueva salvación de Sabiduría. A niveles superiores: la duración aumenta (10 min nivel 5, 1 hora nivel 6, 8 horas nivel 7).'
  },
  {
    id: 'fabricate', name: 'Fabricar', level: 4,
    school: 'Transmutación', type: 'Utilidad', castingTime: '10 minutos', range: '120 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['wizard'],
    description: 'Transformas materias primas en un objeto terminado de la misma materia. Puedes fabricar un objeto de tamaño Grande (o ocho objetos Medianos o menores) a partir de madera, piedra, metal u otros materiales. No puedes crear objetos mágicos o que requieran un alto grado de artesanía (como joyas o armas) a menos que tengas competencia con las herramientas correspondientes.'
  },
  {
    id: 'fire_shield', name: 'Escudo de Fuego', level: 4,
    school: 'Evocación', type: 'Defensa', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (fósforo o una luciérnaga)', duration: '10 minutos', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Llamas finas envuelven tu cuerpo, otorgándote resistencia al daño de frío o de fuego (a tu elección). Además, cuando una criatura a menos de 5 pies te golpea con un ataque cuerpo a cuerpo, el escudo estalla y el atacante recibe 2d8 de daño de fuego (si elegiste escudo cálido) o de frío (si elegiste escudo frío).'
  },
  {
    id: 'freedom_of_movement', name: 'Libertad de Movimiento', level: 4,
    school: 'Abjuración', type: 'Soporte', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una tira de cuero unida a un brazo o pierna)', duration: '1 hora', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'ranger'],
    description: 'Tocas a una criatura voluntaria. Por la duración, el movimiento del objetivo no se ve afectado por terreno difícil, y los hechizos y otros efectos mágicos no pueden reducir su velocidad ni causar que el objetivo quede paralizado o restringido. El objetivo también puede gastar 5 pies de movimiento para escapar automáticamente de restricciones no mágicas como esposas o el agarre de una criatura.'
  },
  {
    id: 'hallucinatory_terrain', name: 'Terreno Alucinatorio', level: 4,
    school: 'Ilusión', type: 'Utilidad', castingTime: '10 minutos', range: '300 pies',
    components: 'V, S, M (una piedra, una ramita y un poco de tierra)', duration: '24 horas', concentration: false,
    classes: ['bard', 'druid', 'warlock', 'wizard'],
    description: 'Haces que el terreno natural en un cubo de 150 pies parezca, suene y huela como otro tipo de terreno natural. Las estructuras hechas por el hombre, las criaturas y el equipo no cambian de apariencia. Las criaturas que examinen el terreno pueden discernir la ilusión con una prueba de Inteligencia (Investigación) exitosa.'
  },
  {
    id: 'ice_storm', name: 'Tormenta de Hielo', level: 4,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '300 pies',
    components: 'V, S, M (un pellizco de polvo y unas gotas de agua)', duration: 'Instantáneo', concentration: false,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Granizo cae en un cilindro de 20 pies de radio y 40 de alto. Cada criatura en el área debe realizar una salvación de Destreza. Recibe 2d8 de daño por golpe y 4d6 de daño de frío si falla, o la mitad si tiene éxito. El granizo convierte el área en terreno difícil hasta el final de tu próximo turno. A niveles superiores: el daño por golpe aumenta en 1d8 por nivel sobre el 4.'
  },
  {
    id: 'locate_creature', name: 'Localizar Criatura', level: 4,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal (radio de 1000 pies)',
    components: 'V, S, M (un trozo de pelo de sabueso)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'cleric', 'druid', 'ranger', 'paladin', 'wizard'],
    description: 'Describes o nombras una criatura que te sea familiar. Sientes la dirección de la ubicación de la criatura mientras esté a menos de 1000 pies de ti. Si la criatura está en movimiento, sabes en qué dirección se mueve. El hechizo puede localizar a una criatura específica o a la especie más cercana de un tipo determinado.'
  },
  {
    id: 'polymorph', name: 'Polimorfia', level: 4,
    school: 'Transmutación', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (una oruga)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'druid', 'sorcerer', 'wizard'],
    description: 'Transformas a una criatura que puedas ver en una nueva forma. Un objetivo no voluntario puede realizar una salvación de Sabiduría para evitar el efecto. La nueva forma debe ser una bestia cuyo valor de desafío sea menor o igual al del objetivo. Las estadísticas del objetivo son reemplazadas por las de la nueva forma. El objetivo asume los puntos de golpe de su nueva forma y regresa a sus puntos de golpe normales cuando vuelve a su forma original o esta cae a 0.'
  },
  {
    id: 'stone_shape', name: 'Moldear Piedra', level: 4,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (arcilla blanda)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'druid', 'wizard'],
    description: 'Moldeas un objeto de piedra de tamaño Mediano o menor en una nueva forma que elijas. Por ejemplo, puedes moldear una roca grande en un arma, crear un pasaje a través de un muro de piedra o formar un cofre de piedra. Aunque el resultado puede tener partes móviles, el detalle fino no es posible.'
  },
  {
    id: 'stoneskin', name: 'Piel de Piedra', level: 4,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (diamante en polvo que vale al menos 100 po, que el hechizo consume)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['druid', 'ranger', 'sorcerer', 'wizard'],
    description: 'Este hechizo convierte la carne de una criatura voluntaria que toques en algo tan duro como la piedra. Hasta que el hechizo termine, el objetivo tiene resistencia al daño físico (contundente, perforante y cortante) no mágico.'
  },
  {
    id: 'wall_of_fire', name: 'Muro de Fuego', level: 4,
    school: 'Evocación', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un trozo de fósforo)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Creas un muro de fuego en una superficie sólida. El muro puede tener hasta 60 pies de largo y 20 de alto, o ser un anillo de 20 pies de diámetro. Cuando el muro aparece, cada criatura en su área debe realizar una salvación de Destreza; recibe 5d8 de daño de fuego si falla, o la mitad si tiene éxito. El lado que elijas del muro inflige 5d8 de daño de fuego a las criaturas que terminen su turno a 10 pies de ese lado. A niveles superiores: el daño aumenta en 1d8 por nivel.'
  }
];

// ============================================================
// NIVEL 5 (PLAYER'S HANDBOOK)
// ============================================================
export const SPELLS_LEVEL_5: SpellDefinition[] = [
  {
    id: 'animate_objects', name: 'Animar Objetos', level: 5,
    school: 'Transmutación', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Objetos cobran vida y atacan bajo tu control. Puedes animar hasta diez objetos pequeños o menos de tamaños mayores (Mediano cuenta como 2, Grande como 4, Enorme como 8). Como acción adicional, puedes dirigir mentalmente a los objetos para que se muevan y ataquen. Los objetos tienen estadísticas de combate (Fuerza, CA, PG, daño) basadas en su tamaño.'
  },
  {
    id: 'awaken', name: 'Despertar', level: 5,
    school: 'Transmutación', type: 'Utilidad', castingTime: '8 horas', range: 'Toque',
    components: 'V, S, M (una ágata que vale al menos 1,000 po, que el hechizo consume)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'druid'],
    description: 'Pasas 8 horas trazando diagramas mágicos sobre una bestia o planta de tamaño Grande o menor que no tenga inteligencia. Al finalizar, el objetivo gana Inteligencia 10 y la capacidad de hablar un idioma que tú conozcas. El objetivo queda hechizado por ti durante 30 días o hasta que lo dañes.'
  },
  {
    id: 'banishing_smite', name: 'Castigo Desterrador', level: 5,
    school: 'Abjuración', type: 'Daño', castingTime: '1 acción adicional', range: 'Personal',
    components: 'V', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['paladin'],
    description: 'La próxima vez que golpees a una criatura con un ataque de arma antes de que termine el hechizo, el arma brilla con poder divino e inflige 5d10 de daño de fuerza adicionales. Si el ataque reduce al objetivo a 50 puntos de golpe o menos, debe superar una salvación de Carisma o ser desterrado a su plano de origen o a un semiplano inofensivo.'
  },
  {
    id: 'circle_of_power', name: 'Círculo de Poder', level: 5,
    school: 'Abjuración', type: 'Soporte', castingTime: '1 acción', range: 'Personal (radio de 30 pies)',
    components: 'V', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['paladin'],
    description: 'Energía divina emana de ti en un radio de 30 pies. Mientras el hechizo dure, tú y tus aliados en el área tienen ventaja en las tiradas de salvación contra hechizos y otros efectos mágicos. Además, si una criatura en el área tiene éxito en una salvación contra un efecto que normalmente le permitiría recibir solo la mitad del daño, en su lugar no recibe ningún daño.'
  },
  {
    id: 'cloudkill', name: 'Nube Mortal', level: 5,
    school: 'Conjuración', type: 'Daño', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Creas una esfera de 20 pies de radio de vapor venenoso y amarillo verdoso. La nube se aleja de ti 10 pies al comienzo de cada uno de tus turnos. Una criatura que entre en el área o comience su turno allí debe realizar una salvación de Constitución; recibe 5d8 de daño de veneno si falla, o la mitad si tiene éxito. A niveles superiores: el daño aumenta en 1d8 por cada nivel por encima de 5.'
  },
  {
    id: 'commune', name: 'Comunión', level: 5,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 minuto', range: 'Personal',
    components: 'V, S, M (incienso y agua bendita o profana)', duration: '1 minuto', concentration: false,
    classes: ['cleric'],
    description: 'Entras en un estado de trance y contactas con tu deidad o un representante divino. Puedes hacer hasta tres preguntas que puedan ser respondidas con un "sí" o "no". Recibes respuestas veraces, aunque la entidad divina puede no conocer la respuesta si esta está fuera de su conocimiento.'
  },
  {
    id: 'commune_with_nature', name: 'Comunión con la Naturaleza', level: 5,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 minuto', range: 'Personal',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['druid', 'ranger'],
    description: 'Te vuelves uno con la naturaleza y obtienes conocimiento del territorio circundante. En áreas exteriores, el hechizo te da conocimiento de la tierra en un radio de 3 millas; en cuevas o entornos cerrados, el radio es de 300 pies. Puedes obtener información sobre: terreno y masas de agua, plantas, animales, pueblos, edificios o la presencia de criaturas poderosas de otros planos.'
  },
  {
    id: 'cone_of_cold', name: 'Cono de Frío', level: 5,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: 'Cono de 60 pies',
    components: 'V, S, M (una pequeña esfera de cristal o vidrio)', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Una ráfaga de aire gélido emana de tus manos en un cono de 60 pies. Cada criatura en el cono debe realizar una salvación de Constitución. Recibe 8d8 de daño de frío si falla, o la mitad si tiene éxito. Una criatura muerta por este hechizo se convierte en una estatua de hielo. A niveles superiores: el daño aumenta en 1d8 por nivel sobre el 5.'
  },
  {
    id: 'conjure_elemental', name: 'Conjurar Elemental', level: 5,
    school: 'Conjuración', type: 'Control', castingTime: '1 minuto', range: '90 pies',
    components: 'V, S, M (incienso, azufre o agua según el tipo)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['druid', 'wizard'],
    description: 'Invocas a un elemental de VD 5 o inferior (aire, tierra, fuego o agua) que aparece en un espacio desocupado. El elemental es amistoso contigo y tus compañeros mientras mantengas la concentración. Si tu concentración se rompe, el elemental no desaparece, sino que se vuelve hostil y te atacará si puede. A niveles superiores: el valor de desafío aumenta en 1 por cada nivel por encima de 5.'
  },
  {
    id: 'conjure_volley', name: 'Descarga Conjurada', level: 5,
    school: 'Conjuración', type: 'Daño', castingTime: '1 acción', range: '150 pies',
    components: 'V, S, M (una munición o un arma arrojadiza)', duration: 'Instantáneo', concentration: false,
    classes: ['ranger'],
    description: 'Lanzas una pieza de munición o un arma arrojadiza al aire. Cientos de copias del proyectil caen en un cono de 60 pies. Cada criatura en el área debe realizar una salvación de Destreza. Recibe 8d8 de daño en un fallo, o la mitad en un éxito. El tipo de daño es el mismo que el de la munición o arma original utilizada.'
  },
  {
    id: 'contact_other_plane', name: 'Contacto con Otro Plano', level: 5,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 minuto', range: 'Personal',
    components: 'V', duration: '1 minuto', concentration: false,
    classes: ['warlock', 'wizard'],
    description: 'Envías mentalmente tu mente a una entidad de otro plano. Debes superar una salvación de Inteligencia CD 15. Si fallas, recibes 6d6 de daño psíquico y te vuelves loco (sin acciones, sin hablar) hasta que finalices un descanso largo. Si tienes éxito, puedes hacer 5 preguntas a la entidad que puedan ser respondidas con una palabra.'
  },
  {
    id: 'contagion', name: 'Contagio', level: 5,
    school: 'Nigromancia', type: 'Control', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: '7 días', concentration: false,
    classes: ['cleric', 'druid', 'wizard'],
    description: 'Realizas un ataque de hechizo cuerpo a cuerpo contra una criatura. Si golpeas, el objetivo experimenta síntomas de una enfermedad mágica y tiene desventaja en todas sus tiradas de ataque y pruebas de característica. Al final de cada uno de sus turnos, la criatura debe realizar una salvación de Constitución. Si supera tres, sana; si falla tres, la enfermedad se asienta y dura 7 días.'
  },
  {
    id: 'creation', name: 'Creación', level: 5,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 minuto', range: '30 pies',
    components: 'V, S, M (un trozo de materia del mismo tipo)', duration: 'Especial', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Extraes materia de la Selva Sombría para crear un objeto inanimado (vegetal o mineral). El objeto puede ocupar hasta un cubo de 5 pies. La duración depende de la materia: materia vegetal (1 día), piedra o cristal (12 horas), metales preciosos (1 hora), gemas (10 minutos), adamantina o mitril (1 minuto).'
  },
  {
    id: 'destructive_wave', name: 'Ola Destructiva', level: 5,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: 'Personal (radio de 30 pies)',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['paladin'],
    description: 'Golpeas el suelo, creando una onda de fuerza atronadora. Cada criatura a tu elección a menos de 30 pies de ti debe realizar una salvación de Constitución. Recibe 5d6 de daño atronador y 5d6 de daño radiante (si eres bueno/neutral) o necrótico (si eres malvado) y cae derribada si falla. Con éxito, recibe la mitad del daño y no cae.'
  },
  {
    id: 'dispel_evil_and_good', name: 'Disipar el Bien y el Mal', level: 5,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (agua bendita o polvo de plata y hierro)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric', 'paladin'],
    description: 'Te rodeas de energía protectora. Criaturas celestiales, elementales, feéricas, infernales y muertos vivientes tienen desventaja en las tiradas de ataque contra ti. Puedes usar tu acción para romper el hechizo y realizar uno de estos efectos: Expulsión (intentar enviar a una criatura a su plano de origen) o Romper el Hechizo (terminar un efecto de posesión o encantamiento sobre una criatura).'
  },
  {
    id: 'dominate_person', name: 'Dominar Persona', level: 5,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Intentas tomar el control de un humanoide. El objetivo debe superar una salvación de Sabiduría (con ventaja si estás peleando contra él). Mientras esté hechizado, tienes un vínculo telepático con él y puedes usar tu acción para tomar el control total de sus acciones. Cada vez que reciba daño, realiza una nueva salvación de Sabiduría. A niveles superiores: la duración aumenta (10 min nivel 6, 1 hora nivel 7, 8 horas nivel 8).'
  },
  {
    id: 'dream', name: 'Sueño', level: 5,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 minuto', range: 'Especial',
    components: 'V, S, M (un puñado de arena, perlas pequeñas o plumas)', duration: '8 horas', concentration: false,
    classes: ['bard', 'warlock', 'wizard'],
    description: 'Envías un mensaje a través de los sueños a una criatura que conozcas. Puedes aparecer en el sueño del objetivo y hablar con él. Como alternativa, puedes enviar una pesadilla que inflige 3d6 de daño psíquico y evita que el objetivo obtenga beneficios de un descanso largo si falla una salvación de Sabiduría.'
  },
  {
    id: 'flame_strike', name: 'Golpe Flamígero', level: 5,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un poco de azufre)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Una columna vertical de fuego divino desciende del cielo. Cada criatura en un cilindro de 10 pies de radio y 40 de alto debe realizar una salvación de Destreza. Recibe 4d6 de daño de fuego y 4d6 de daño radiante si falla, o la mitad si tiene éxito. A niveles superiores: el daño (fuego o radiante a tu elección) aumenta en 1d6 por nivel sobre el 5.'
  },
  {
    id: 'geas', name: 'Geas', level: 5,
    school: 'Encantamiento', type: 'Control', castingTime: '1 minuto', range: '60 pies',
    components: 'V', duration: '30 días', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'paladin', 'wizard'],
    description: 'Impones una orden mágica a una criatura que pueda entenderte. Si el objetivo es hostil, debe superar una salvación de Sabiduría. Mientras esté bajo el Geas, el objetivo recibe 5d10 de daño psíquico cada vez que actúe de manera opuesta a tus instrucciones (máximo una vez al día). A niveles superiores: la duración aumenta (un año a nivel 7-8, permanente a nivel 9).'
  },
  {
    id: 'greater_restoration', name: 'Restauración Mayor', level: 5,
    school: 'Abjuración', type: 'Curación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (diamante en polvo por valor de 100 po, que el hechizo consume)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'ranger'],
    description: 'Tocas a una criatura para eliminar un efecto debilitante. Puedes reducir un nivel de agotamiento, terminar un hechizo de encanto o petrificación, restaurar una reducción de puntuación de característica, o eliminar un efecto que reduzca los puntos de golpe máximos de la criatura.'
  },
  {
    id: 'hallow', name: 'Santificar', level: 5,
    school: 'Evocación', type: 'Utilidad', castingTime: '24 horas', range: 'Toque',
    components: 'V, S, M (hierbas, aceites e incienso por valor de 1,000 po, que el hechizo consume)', duration: 'Hasta que sea disipado', concentration: false,
    classes: ['cleric'],
    description: 'Consagras un área en un radio de 60 pies. Celestiales, elementales, feéricos, infernales y muertos vivientes son repelidos y no pueden entrar. Puedes añadir un efecto adicional al área, como: Coraje (inmunidad al miedo), Oscuridad, Libertad de Movimiento, Resistencia a la Energía (un tipo de daño) o Silencio.'
  },
  {
    id: 'hold_monster', name: 'Inmovilizar Monstruo', level: 5,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '90 pies',
    components: 'V, S, M (un trozo pequeño de hierro)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Intentas paralizar a una criatura que puedas ver. El objetivo debe superar una salvación de Sabiduría o quedar paralizado. Al final de cada uno de sus turnos, la criatura puede repetir la salvación. A niveles superiores: puedes afectar a una criatura adicional por cada nivel por encima de 5.'
  },
  {
    id: 'insect_plague', name: 'Plaga de Insectos', level: 5,
    school: 'Conjuración', type: 'Daño Sostenido', castingTime: '1 acción', range: '300 pies',
    components: 'V, S, M (unas pocas langostas muertas)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['cleric', 'druid', 'sorcerer'],
    description: 'Un enjambre de langostas muerde en una esfera de 20 pies de radio. El área se vuelve terreno difícil y está ligeramente oscurecida. Cada criatura que entre en el área o comience su turno allí debe realizar una salvación de Constitución; recibe 4d10 de daño perforante si falla, o la mitad si tiene éxito. A niveles superiores: el daño aumenta en 1d10 por cada nivel sobre el 5.'
  },
  {
    id: 'legend_lore', name: 'Conocimiento de Leyendas', level: 5,
    school: 'Adivinación', type: 'Utilidad', castingTime: '10 minutos', range: 'Personal',
    components: 'V, S, M (incienso por valor de 250 po y marfil por valor de 200 po)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'wizard'],
    description: 'Nombras o describes a una persona, lugar u objeto legendario. El hechizo te otorga un resumen de las leyendas e historias relacionadas con ese tema. Si el tema no es de importancia legendaria, no obtienes ninguna información.'
  },
  {
    id: 'mass_cure_wounds', name: 'Curar Heridas en Masa', level: 5,
    school: 'Evocación', type: 'Curación', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'druid'],
    description: 'Una ola de energía curativa emana de ti. Elige hasta seis criaturas en una esfera de 30 pies de radio. Cada objetivo recupera 3d8 + tu modificador de característica para el lanzamiento de hechizos. A niveles superiores: la curación aumenta en 1d8 por cada nivel por encima de 5.'
  },
  {
    id: 'mislead', name: 'Engaño', level: 5,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'wizard'],
    description: 'Te vuelves invisible al mismo tiempo que una copia ilusoria de ti mismo aparece en tu espacio. El duplicado puede moverse hasta el doble de tu velocidad y hablar. Puedes usar tu acción para ver y oír a través de la ilusión en lugar de tus propios sentidos.'
  },
  {
    id: 'modify_memory', name: 'Modificar Memoria', level: 5,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '30 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'wizard'],
    description: 'Intentas remodelar los recuerdos de otra criatura. El objetivo debe superar una salvación de Sabiduría. Si falla, queda hechizado y puedes alterar sus recuerdos de un evento que ocurrió en las últimas 24 horas y que duró no más de 10 minutos. Puedes borrar el evento, cambiar los detalles o crear un recuerdo de uno nuevo.'
  },
  {
    id: 'planar_binding', name: 'Vínculo Planar', level: 5,
    school: 'Abjuración', type: 'Control', castingTime: '1 hora', range: '60 pies',
    components: 'V, S, M (un joya que vale al menos 1,000 po, que el hechizo consume)', duration: '24 horas', concentration: false,
    classes: ['bard', 'cleric', 'druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Intentas atar a una criatura celestial, elemental, feérica o infernal a tu servicio. El objetivo debe realizar una salvación de Carisma. Si falla, debe servirte durante 24 horas. Si la criatura fue invocada con otro hechizo, la duración de ese hechizo se extiende hasta que termine el vínculo planar. A niveles superiores: la duración aumenta (10 días nivel 6, 30 días nivel 7, 180 días nivel 8, 1 año y 1 día nivel 9).'
  },
  {
    id: 'raise_dead', name: 'Revivir a los Muertos', level: 5,
    school: 'Nigromancia', type: 'Curación', castingTime: '1 hora', range: 'Toque',
    components: 'V, S, M (un diamante por valor de 500 po, que el hechizo consume)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric', 'paladin'],
    description: 'Devuelves la vida a una criatura que ha estado muerta no más de 10 días. Si el alma es voluntaria y libre de regresar, la criatura revive con 1 punto de golpe. No puede revivir a una criatura muerta de vejez ni restaurar partes del cuerpo que falten. El objetivo tiene una penalización de -4 en todas sus tiradas, que se reduce en 1 cada vez que finaliza un descanso largo.'
  },
  {
    id: 'rarys_telepathic_bond', name: 'Vínculo Telepático de Rary', level: 5,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (trozos de cáscara de huevo de dos especies diferentes)', duration: '1 hora', concentration: false,
    classes: ['wizard'],
    description: 'Creas un vínculo telepático entre hasta ocho criaturas voluntarias de tu elección. Las criaturas pueden comunicarse telepáticamente a través del vínculo a cualquier distancia, siempre que estén en el mismo plano de existencia.'
  },
  {
    id: 'reincarnate', name: 'Reencarnar', level: 5,
    school: 'Transmutación', type: 'Curación', castingTime: '1 hora', range: 'Toque',
    components: 'V, S, M (aceites y ungüentos que valen 1,000 po, que el hechizo consume)', duration: 'Instantáneo', concentration: false,
    classes: ['druid'],
    description: 'Tocas a un humanoide muerto que haya fallecido hace no más de 10 días. Si su alma es libre, creas un nuevo cuerpo adulto y el alma entra en él. El nuevo cuerpo es seleccionado lanzando un 1d100 en una tabla de razas: el objetivo puede terminar siendo un elfo, enano, humano, orco, etc. La criatura mantiene sus recuerdos pero gana las habilidades raciales del nuevo cuerpo.'
  },
  {
    id: 'scrying', name: 'Adivinación Remota', level: 5,
    school: 'Adivinación', type: 'Utilidad', castingTime: '10 minutos', range: 'Personal',
    components: 'V, S, M (un foco especial que vale al menos 1,000 po, como una bola de cristal)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['bard', 'cleric', 'druid', 'warlock', 'wizard'],
    description: 'Puedes ver y oír a una criatura específica a cualquier distancia. El objetivo debe superar una salvación de Sabiduría modificada por tu familiaridad con él. Si falla, el hechizo crea un sensor invisible que sigue al objetivo. También puedes observar una ubicación que hayas visitado anteriormente.'
  },
  {
    id: 'seeming', name: 'Apariencia', level: 5,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V, S', duration: '8 horas', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Este hechizo te permite cambiar la apariencia física de cualquier número de criaturas que puedas ver dentro del alcance. Puedes hacer que parezcan más altas, bajas, delgadas, gordas o incluso de otra raza. Cada objetivo no voluntario puede superar una salvación de Carisma para no ser afectado.'
  },
  {
    id: 'telekinesis', name: 'Telequinesis', level: 5,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Ganas la habilidad de mover objetos o criaturas con tu mente. Puedes usar tu acción para mover un objeto de hasta 1,000 libras o intentar restringir a una criatura (una prueba de tu característica de lanzamiento contra la Fuerza del objetivo). Puedes mover lo que estés controlando hasta 30 pies en cualquier dirección cada turno.'
  },
  {
    id: 'teleportation_circle', name: 'Círculo de Teletransporte', level: 5,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 minuto', range: '10 pies',
    components: 'V, M (tizas raras y tintas por valor de 50 po, que el hechizo consume)', duration: '1 ronda', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Trazas un círculo de 10 pies de diámetro en el suelo que se conecta con otro círculo de teletransporte permanente que conozcas en el mismo plano de existencia. Un portal se abre y permanece hasta el final de tu siguiente turno, permitiendo el paso instantáneo.'
  },
  {
    id: 'tree_stride', name: 'Paso Arbóreo', level: 5,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'ranger'],
    description: 'Ganas la habilidad de entrar en un árbol y salir por otro árbol del mismo tipo que esté a menos de 500 pies de distancia. Debes usar 5 pies de movimiento para entrar. Sabes la ubicación de todos los demás árboles del mismo tipo en el rango y puedes realizar este paso una vez por turno.'
  },
  {
    id: 'wall_of_force', name: 'Muro de Fuerza', level: 5,
    school: 'Evocación', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un trozo de polvo de diamante)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['wizard'],
    description: 'Creas una barrera invisible de fuerza física en un punto que elijas. El muro puede ser una superficie plana de diez paneles de 10x10 pies o una cúpula de hasta 10 pies de radio. Nada puede atravesarlo físicamente, y se extiende incluso al Plano Etéreo, bloqueando el viaje etéreo.'
  },
  {
    id: 'wall_of_stone', name: 'Muro de Piedra', level: 5,
    school: 'Evocación', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un trozo pequeño de granito)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['wizard'],
    description: 'Crea un muro de granito sólido. El muro tiene 6 pulgadas de grosor y puede estar compuesto por hasta diez paneles de 10x10 pies. Si mantienes la concentración por la duración completa de 10 minutos, el muro se vuelve permanente y no puede ser disipado mágicamente; de lo contrario, desaparece al final del hechizo.'
  }
];

// ============================================================
// NIVEL 6 (PLAYER'S HANDBOOK)
// ============================================================
export const SPELLS_LEVEL_6: SpellDefinition[] = [
  {
    id: 'disintegrate', name: 'Desintegrar', level: 6,
    school: 'Transmutación', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un imán y una pizca de polvo)', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Un rayo verde sale de tu dedo hacia un objetivo. El objetivo debe realizar una salvación de Destreza. Si falla, recibe 10d6 + 40 de daño de fuerza. Si este daño reduce los puntos de golpe del objetivo a 0, el objetivo y todo lo que lleva (excepto objetos mágicos) se desintegran en un montón de polvo fino. A niveles superiores: el daño aumenta en 3d6 por cada nivel sobre el 6.'
  },
  {
    id: 'druid_grove', name: 'Arboleda Druídica', level: 6,
    school: 'Abjuración', type: 'Utilidad', castingTime: '10 minutos', range: 'Toque',
    components: 'V, S, M (muérdago recolectado con una hoz de oro)', duration: '24 horas', concentration: false,
    classes: ['druid'],
    description: 'Proteges un área de hasta 90 pies de lado. El área se llena de niebla sólida (visión reducida), enredaderas que agarran a los intrusos, y guardianes arbóreos que atacan a los enemigos. Puedes designar criaturas que no se verán afectadas por estos efectos.'
  },
  {
    id: 'find_the_path', name: 'Encontrar el Camino', level: 6,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 minuto', range: 'Personal',
    components: 'V, S, M (un conjunto de herramientas de adivinación valoradas en 100 po)', duration: 'Concentración, hasta 1 día', concentration: true,
    classes: ['bard', 'cleric', 'druid'],
    description: 'Este hechizo te permite encontrar la ruta más corta y directa hacia una ubicación específica que conozcas en el mismo plano de existencia. Mientras dure el hechizo, siempre sabes en qué dirección está el destino y qué camino seguir para llegar a él.'
  },
  {
    id: 'flesh_to_stone', name: 'Carne a Piedra', level: 6,
    school: 'Transmutación', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (una pizca de cal, agua y tierra)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Intentas convertir a una criatura en piedra. El objetivo debe realizar una salvación de Constitución. Si falla, queda restringido mientras su carne comienza a endurecerse. Debe realizar una salvación al final de cada uno de sus turnos. Si acumula tres fallos, se convierte en piedra permanentemente (petrificado); si acumula tres éxitos, el hechizo termina.'
  },
  {
    id: 'forbiddance', name: 'Prohibición', level: 6,
    school: 'Abjuración', type: 'Utilidad', castingTime: '10 minutos', range: 'Toque',
    components: 'V, S, M (agua bendita e incienso por valor de 1,000 po)', duration: '1 día', concentration: false,
    classes: ['cleric'],
    description: 'Proteges un área de hasta 40,000 pies cuadrados. Celestiales, elementales, feéricos e infernales que entren en el área reciben 5d10 de daño radiante o necrótico (a tu elección). Además, el área bloquea cualquier tipo de teletransporte o viaje entre planos hacia su interior.'
  },
  {
    id: 'globe_of_invulnerability', name: 'Globo de Invulnerabilidad', level: 6,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Personal (radio de 10 pies)',
    components: 'V, S, M (una esfera de cristal o vidrio)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['wizard'],
    description: 'Una esfera de energía brillante de 10 pies de radio te rodea. Cualquier hechizo de nivel 5 o inferior lanzado desde fuera de la esfera no tiene efecto sobre las criaturas u objetos que se encuentren dentro de ella, incluso si el hechizo se lanza con un espacio de nivel superior.'
  },
  {
    id: 'harm', name: 'Herir', level: 6,
    school: 'Nigromancia', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Drenas la fuerza vital de una criatura. El objetivo debe realizar una salvación de Constitución. Recibe 14d6 de daño necrótico si falla, o la mitad si tiene éxito. Los puntos de golpe máximos del objetivo se reducen en la misma cantidad que el daño recibido durante 1 hora.'
  },
  {
    id: 'heal', name: 'Sanar', level: 6,
    school: 'Evocación', type: 'Curación', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'druid'],
    description: 'Una ola de energía restauradora sana 70 puntos de golpe al objetivo. El hechizo también cura la ceguera, la sordera y todas las enfermedades. No tiene efecto sobre constructos ni muertos vivientes. A niveles superiores: la curación aumenta en 10 puntos por cada nivel sobre el 6.'
  },
  {
    id: 'heroes_feast', name: 'Festín Heroico', level: 6,
    school: 'Conjuración', type: 'Soporte', castingTime: '10 minutos', range: '30 pies',
    components: 'V, S, M (un cuenco incrustado de gemas por valor de 1,000 po, que el hechizo consume)', duration: '24 horas', concentration: false,
    classes: ['cleric', 'druid'],
    description: 'Invocas un festín magnífico para ti y hasta doce criaturas. El festín dura 1 hora. Las criaturas que participan ganan inmunidad al veneno y a ser asustadas, ventaja en todas las salvaciones de Sabiduría, y sus puntos de golpe máximos aumentan en 2d10 durante las próximas 24 horas.'
  },
  {
    id: 'magic_jar', name: 'Recipiente Mágico', level: 6,
    school: 'Nigromancia', type: 'Utilidad', castingTime: '1 minuto', range: 'Personal',
    components: 'V, S, M (una gema, cristal o receptáculo similar de al menos 500 po)', duration: 'Hasta que sea disipado', concentration: false,
    classes: ['wizard'],
    description: 'Tu cuerpo entra en un estado catatónico mientras tu alma se transfiere a un recipiente. Puedes intentar poseer a cualquier humanoide a menos de 100 pies. Si tienes éxito, tu alma pasa al cuerpo del objetivo y tomas el control. Si el recipiente se destruye mientras tu alma está fuera de tu cuerpo original, podrías morir permanentemente.'
  },
  {
    id: 'mass_suggestion', name: 'Sugerencia Masiva', level: 6,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, M (una lengua de serpiente y un poco de panal)', duration: '24 horas', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Sugieres una línea de acción razonable a hasta doce criaturas. Cada objetivo debe superar una salvación de Sabiduría o seguir la sugerencia durante 24 horas. Si la orden es autodestructiva, el hechizo termina para ese objetivo. A niveles superiores: la duración aumenta (10 días nivel 7, 30 días nivel 8, un año nivel 9).'
  },
  {
    id: 'move_earth', name: 'Mover Tierra', level: 6,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (una hoja de hierro y una bolsa de tierra)', duration: 'Concentración, hasta 2 horas', concentration: true,
    classes: ['druid', 'wizard'],
    description: 'Mueves y reconfiguras tierra, arena o arcilla en un área de 40 pies de lado. Puedes crear zanjas, elevar muros de tierra o nivelar terreno. El movimiento de la tierra es gradual y toma 10 minutos completarse por cada área de 40 pies. No puede afectar a la roca sólida.'
  },
  {
    id: 'planar_ally', name: 'Aliado Planar', level: 6,
    school: 'Conjuración', type: 'Control', castingTime: '10 minutos', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Suplicas a una entidad poderosa que envíe un servidor para ayudarte. La entidad envía a un celestial, elemental o infernal. Debes negociar con el sirviente un pago por sus servicios, que suele ser oro u ofrendas. El sirviente te ayudará en una tarea específica durante el tiempo acordado.'
  },
  {
    id: 'programmed_illusion', name: 'Ilusión Programada', level: 6,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un trozo de vellón y polvo de jade por valor de 25 po)', duration: 'Hasta que sea disipada', concentration: false,
    classes: ['bard', 'wizard'],
    description: 'Creas la ilusión de un objeto, una criatura o algún otro fenómeno visual que se activa bajo una condición específica que tú definas. La ilusión puede durar hasta 5 minutos y puede incluir sonidos puros y olores.'
  },
  {
    id: 'sunbeam', name: 'Rayo Solar', level: 6,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '60 pies (línea)',
    components: 'V, S, M (una lupa)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Un rayo de luz brillante emana de tu mano en una línea de 60 pies de largo y 5 de ancho. Cada criatura en la línea debe realizar una salvación de Constitución. Recibe 6d8 de daño radiante y queda cegada por un turno si falla. Puedes crear un nuevo rayo como una acción en cada uno de tus turnos durante la duración.'
  },
  {
    id: 'true_seeing', name: 'Visión Verdadera', level: 6,
    school: 'Adivinación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (un ungüento para los ojos por valor de 25 po)', duration: '1 hora', concentration: false,
    classes: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'],
    description: 'Tocas a una criatura para otorgarle la capacidad de ver las cosas como realmente son. El objetivo ve a través de la oscuridad normal y mágica, detecta puertas secretas ocultas por magia, ve criaturas invisibles, y percibe la forma original de criaturas polimorfadas o transformadas.'
  },
  {
    id: 'wall_of_ice', name: 'Muro de Hielo', level: 6,
    school: 'Evocación', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un trozo pequeño de cuarzo)', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['wizard'],
    description: 'Creas un muro de paneles de hielo. Al aparecer, cada criatura en su área debe realizar una salvación de Destreza; recibe 10d6 de daño de frío si falla. Si se destruye un panel, deja una neblina de aire gélido que inflige 5d6 de daño de frío a cualquiera que la atraviese.'
  },
  {
    id: 'wind_walk', name: 'Forma de Viento', level: 6,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 minuto', range: '30 pies',
    components: 'V, S, M (fuego y agua bendita sacada de una concha)', duration: '8 horas', concentration: false,
    classes: ['cleric', 'druid'],
    description: 'Tú y hasta diez criaturas voluntarias os convertís en nubes de vapor. Tenéis una velocidad de vuelo de 300 pies pero solo podéis usar vuestra acción para moveros o para volver a vuestra forma original (lo cual toma 1 minuto). Mientras estáis en forma de nube, sois resistentes al daño no mágico.'
  },
  {
    id: 'word_of_recall', name: 'Palabra de Retorno', level: 6,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 acción', range: '5 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Tú y hasta cinco criaturas voluntarias a menos de 5 pies de ti sois teletransportados instantáneamente a un santuario vinculado. Debes haber designado previamente el santuario lanzando este hechizo mientras estabas en él.'
  }
];

// ============================================================
// NIVEL 7 (PLAYER'S HANDBOOK)
// ============================================================
export const SPELLS_LEVEL_7: SpellDefinition[] = [
  {
    id: 'conjure_celestial', name: 'Conjurar Celestial', level: 7,
    school: 'Conjuración', type: 'Control', castingTime: '1 minuto', range: '90 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['cleric'],
    description: 'Invocas a una criatura celestial de valor de desafío 4 o inferior, que aparece en un espacio desocupado que puedas ver. El celestial desaparece cuando sus puntos de golpe llegan a 0 o cuando el hechizo termina. El celestial es amistoso contigo y tus compañeros; obedece tus órdenes verbales. A niveles superiores: el valor de desafío aumenta en 1 por cada nivel por encima de 7.'
  },
  {
    id: 'crown_of_stars', name: 'Corona de Estrellas', level: 7,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: '1 hora', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Siete orbes de luz similares a estrellas aparecen y orbitan tu cabeza. Mientras dure el hechizo, puedes usar una acción adicional para lanzar uno de los orbes a un objetivo a menos de 120 pies. Realiza un ataque de hechizo a distancia; si golpeas, el objetivo recibe 4d12 de daño radiante. A niveles superiores: ganas dos orbes adicionales por cada nivel sobre el 7.'
  },
  {
    id: 'delayed_blast_fireball', name: 'Bola de Fuego Retardada', level: 7,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '150 pies',
    components: 'V, S, M (una bola pequeña de cebo de murciélago y azufre)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Una pequeña perla de fuego amarillo sale de tu dedo y se detiene en un punto que elijas. Al final de cada uno de tus turnos, el daño de la explosión aumenta en 1d6. Cuando el hechizo termina (por pérdida de concentración o voluntad), la perla explota. Cada criatura debe realizar una salvación de Destreza; recibe 12d6 de daño de fuego (base) + el daño acumulado. A niveles superiores: el daño base aumenta en 1d6 por nivel.'
  },
  {
    id: 'divine_word', name: 'Palabra Divina', level: 7,
    school: 'Evocación', type: 'Control', castingTime: '1 acción adicional', range: '30 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Pronuncias una palabra de poder imbuida de magia divina. Cada criatura a tu elección en el rango debe realizar una salvación de Carisma. Dependiendo de sus puntos de golpe actuales, sufren: 50 PG o menos (ensordecido 1 min), 40 PG o menos (cegado y ensordecido 10 min), 30 PG o menos (cegado, ensordecido y aturdido 1 hora), 20 PG o menos (muere instantáneamente). Además, expulsa a celestiales, elementales, feéricos o infernales a su plano de origen.'
  },
  {
    id: 'etherealness', name: 'Etereidad', level: 7,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S', duration: 'Hasta 8 horas', concentration: false,
    classes: ['bard', 'cleric', 'sorcerer', 'warlock', 'wizard'],
    description: 'Entras en las regiones fronterizas del Plano Etéreo. Durante la duración, puedes moverte en cualquier dirección y atravesar objetos y criaturas en el Plano Material. Eres invisible e inaudible para los del Plano Material. A niveles superiores: puedes afectar a tres criaturas voluntarias adicionales por cada nivel por encima de 7.'
  },
  {
    id: 'finger_of_death', name: 'Dedo de la Muerte', level: 7,
    school: 'Nigromancia', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Envías energía negativa a través de tu dedo a una criatura. El objetivo debe realizar una salvación de Constitución. Recibe 7d8 + 30 de daño necrótico si falla, o la mitad si tiene éxito. Si el daño de este hechizo mata a un humanoide, este se levanta como un zombi permanentemente bajo tu mando al comienzo de tu siguiente turno.'
  },
  {
    id: 'fire_storm', name: 'Tormenta de Fuego', level: 7,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '150 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'druid'],
    description: 'Una tormenta de fuego compuesta por hasta diez cubos de 10 pies aparece en el área. Cada criatura en el área debe realizar una salvación de Destreza. Recibe 7d10 de daño de fuego si falla, o la mitad si tiene éxito. El fuego daña objetos y puede incendiar plantas inflamables, a menos que decidas lo contrario.'
  },
  {
    id: 'forcecage', name: 'Jaula de Fuerza', level: 7,
    school: 'Evocación', type: 'Control', castingTime: '1 acción', range: '100 pies',
    components: 'V, S, M (polvo de rubí por valor de 1,500 po)', duration: '1 hora', concentration: false,
    classes: ['wizard'],
    description: 'Creas una prisión invisible de fuerza pura en forma de jaula o caja. La prisión es indestructible y nada puede atravesarla físicamente. Una criatura dentro no puede salir por medios normales ni teletransporte, a menos que supere una salvación de Carisma. Los hechizos no pueden lanzarse a través del muro desde dentro o fuera.'
  },
  {
    id: 'mirage_arcane', name: 'Espejismo Arcano', level: 7,
    school: 'Ilusión', type: 'Utilidad', castingTime: '10 minutos', range: 'Vista',
    components: 'V, S', duration: '10 días', concentration: false,
    classes: ['bard', 'druid', 'wizard'],
    description: 'Transformas el terreno en un área de hasta 1 milla cuadrada. La ilusión es tan perfecta que incluye tacto, sonido y olor. El terreno adquiere propiedades físicas reales: puedes caminar sobre un río seco ilusorio, escalar una montaña ilusoria o comer fruta ilusoria (aunque no proporciona sustento).'
  },
  {
    id: 'mordenkainens_magnificent_mansion', name: 'Mansión Magnífica de Mordenkainen', level: 7,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 minuto', range: '300 pies',
    components: 'V, S, M (una miniatura de marfil de una mansión y un espécimen de plata)', duration: '24 horas', concentration: false,
    classes: ['wizard'],
    description: 'Crea una vivienda extradimensional de lujo. La mansión tiene espacio para 100 personas y cuenta con 100 sirvientes invisibles que proporcionan comida magnífica y servicios. Nadie puede entrar sin tu permiso, y la entrada es invisible para cualquier otra persona.'
  },
  {
    id: 'mordenkainens_sword', name: 'Espada de Mordenkainen', level: 7,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (una miniatura de platino de una espada valorada en 250 po)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['bard', 'wizard'],
    description: 'Creas una espada de fuerza que flota en un punto que elijas. Puedes usar tu acción para hacer un ataque de hechizo cuerpo a cuerpo contra una criatura cercana a la espada; si golpeas, inflige 3d10 de daño de fuerza. Puedes mover la espada hasta 20 pies cada turno como parte de la acción.'
  },
  {
    id: 'plane_shift', name: 'Cambio de Plano', level: 7,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (una vara de metal afinada al plano de destino valorada en 250 po)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'druid', 'sorcerer', 'warlock', 'wizard'],
    description: 'Transportas a hasta ocho criaturas voluntarias que estén tomadas de las manos a otro plano de existencia. Alternativamente, puedes realizar un ataque de hechizo contra una criatura no voluntaria para intentar desterrarla al plano que elijas (el objetivo tiene una salvación de Carisma).'
  },
  {
    id: 'prismatic_spray', name: 'Rociada Prismática', level: 7,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: 'Cono de 60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Ocho rayos de luz de colores salen de tu mano. Cada criatura en un cono de 60 pies es golpeada por uno o más rayos aleatorios: Rojo (10d6 fuego), Naranja (10d6 ácido), Amarillo (10d6 rayos), Verde (10d6 veneno), Azul (10d6 frío), Añil (restringido/petrificado), Violeta (cegado/desterrado).'
  },
  {
    id: 'project_image', name: 'Proyectar Imagen', level: 7,
    school: 'Ilusión', type: 'Utilidad', castingTime: '1 acción', range: '500 millas',
    components: 'V, S, M (una pequeña réplica de platino de ti mismo valorada en 5 po)', duration: 'Concentración, hasta 1 día', concentration: true,
    classes: ['bard', 'wizard'],
    description: 'Creas una copia ilusoria de ti mismo en un lugar que hayas visitado o que esté dentro del rango. Puedes ver y oír a través de la copia como si estuvieras en su espacio, y puedes hablar a través de ella. La imagen es puramente visual pero puede moverse y actuar como tú desees.'
  },
  {
    id: 'regenerate', name: 'Regenerar', level: 7,
    school: 'Transmutación', type: 'Curación', castingTime: '1 minuto', range: 'Toque',
    components: 'V, S, M (una rueda de oración y agua bendita)', duration: '1 hora', concentration: false,
    classes: ['bard', 'cleric', 'druid'],
    description: 'El objetivo recupera 4d8 + 15 puntos de golpe al instante. Durante la siguiente hora, recupera 1 punto de golpe al comienzo de cada uno de sus turnos. El hechizo también restaura cualquier miembro perdido o cercenado (dedos, piernas, cabeza si es aplicable) en el transcurso de 2 minutos.'
  },
  {
    id: 'resurrection', name: 'Resurrección', level: 7,
    school: 'Nigromancia', type: 'Curación', castingTime: '1 hora', range: 'Toque',
    components: 'V, S, M (un diamante por valor de 1,000 po, que el hechizo consume)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'cleric'],
    description: 'Devuelves la vida a una criatura que ha estado muerta no más de 100 años. Cura todas las heridas, restaura miembros perdidos y neutraliza venenos o enfermedades que afectaban al objetivo al morir. La criatura tiene una penalización de -4 en todas sus tiradas que se reduce en 1 por cada descanso largo.'
  },
  {
    id: 'reverse_gravity', name: 'Gravedad Inversa', level: 7,
    school: 'Transmutación', type: 'Control', castingTime: '1 acción', range: '100 pies',
    components: 'V, S, M (un imán y limaduras de hierro)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['druid', 'sorcerer', 'wizard'],
    description: 'Inviertes la gravedad en un cilindro de 50 pies de radio y 100 de alto. Criaturas y objetos en el área caen hacia arriba. Si encuentran un objeto sólido (como un techo), chocan contra él como si cayeran. Cuando el hechizo termina, todos caen de nuevo al suelo.'
  },
  {
    id: 'sequester', name: 'Secuestrar', level: 7,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Toque',
    components: 'V, S, M (polvo de diamante y gemas por valor de 5,000 po)', duration: 'Hasta que sea disipado', concentration: false,
    classes: ['wizard'],
    description: 'Ocultas una criatura u objeto de la vista y de la adivinación. El objetivo entra en animación suspendida: no envejece y se vuelve invisible. El hechizo dura hasta que sea disipado o hasta que ocurra un evento detonante que tú definas al lanzarlo.'
  },
  {
    id: 'simulacrum', name: 'Simulacro', level: 7,
    school: 'Ilusión', type: 'Utilidad', castingTime: '12 horas', range: 'Toque',
    components: 'V, S, M (nieve o hielo, junto con pelo o carne de la criatura duplicada)', duration: 'Hasta que sea disipado', concentration: false,
    classes: ['wizard'],
    description: 'Creas un duplicado ilusorio de un humanoide o bestia. El simulacro tiene la mitad de los puntos de golpe del original y obedece tus órdenes. No puede recuperar espacios de hechizo gastados ni subir de nivel, pero mantiene todas las facultades estadísticas del original al momento de la creación.'
  },
  {
    id: 'symbol', name: 'Símbolo', level: 7,
    school: 'Abjuración', type: 'Control', castingTime: '1 minuto', range: 'Toque',
    components: 'V, S, M (polvo de diamante y ópalo por valor de 1,000 po)', duration: 'Hasta que sea disipado', concentration: false,
    classes: ['bard', 'cleric', 'wizard'],
    description: 'Inscribes un glifo dañino en una superficie u objeto. Eliges un activador (leerlo, tocarlo, verlo). Efectos posibles: Muerte (10d10 daño necrótico), Desesperanza (miedo), Locura, Dolor (incapacitado), Sueño (20 min), Aturdimiento (1 min).'
  },
  {
    id: 'teleport', name: 'Teletransporte', level: 7,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 acción', range: '10 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Transportas instantáneamente a ti y a hasta ocho criaturas voluntarias a cualquier lugar en el mismo plano. La precisión depende de tu familiaridad: desde un círculo de teletransporte permanente (100% éxito) hasta "descripción" o "falso destino" que pueden causar percances peligrosos.'
  }
];

// ============================================================
// NIVEL 8 (PLAYER'S HANDBOOK)
// ============================================================
export const SPELLS_LEVEL_8: SpellDefinition[] = [
  {
    id: 'antimagic_field', name: 'Campo Antimagia', level: 8,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Personal (radio de 10 pies)',
    components: 'V, S, M (un puñado de limaduras de hierro o hierro en polvo)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['cleric', 'wizard'],
    description: 'Una esfera invisible de 10 pies de radio te rodea. Dentro de este área, los efectos mágicos son anulados: no se pueden lanzar hechizos, las criaturas invocadas desaparecen temporalmente y los objetos mágicos se vuelven mundanos. El área se desplaza contigo.'
  },
  {
    id: 'antipathy_sympathy', name: 'Antipatía / Simpatía', level: 8,
    school: 'Encantamiento', type: 'Control', castingTime: '1 hora', range: '60 pies',
    components: 'V, S, M (una gota de vinagre o un trozo de panal según el efecto)', duration: '10 días', concentration: false,
    classes: ['druid', 'wizard'],
    description: 'Encantas a una criatura u objeto para atraer o repeler a un tipo específico de seres. Antipatía: los seres designados sienten miedo y deben alejarse del objetivo. Simpatía: los seres designados sienten una atracción irresistible y deben acercarse y permanecer cerca del objetivo.'
  },
  {
    id: 'clone', name: 'Clon', level: 8,
    school: 'Nigromancia', type: 'Utilidad', castingTime: '1 hora', range: 'Toque',
    components: 'V, S, M (un diamante de 1,000 po y un recipiente de 2,000 po)', duration: 'Instantáneo', concentration: false,
    classes: ['wizard'],
    description: 'Creas un duplicado inerte de una criatura viva en un recipiente especial. Si la criatura original muere, su alma se transfiere inmediatamente al clon, permitiéndole despertar en el nuevo cuerpo con todos sus recuerdos y capacidades intactos.'
  },
  {
    id: 'control_weather', name: 'Controlar el Clima', level: 8,
    school: 'Transmutación', type: 'Utilidad', castingTime: '10 minutos', range: 'Personal (radio de 5 millas)',
    components: 'V, S, M (incienso y tierra sagrada)', duration: 'Concentración, hasta 8 horas', concentration: true,
    classes: ['cleric', 'druid', 'wizard'],
    description: 'Toman el control de las condiciones climáticas en un radio de 5 millas. Puedes cambiar gradualmente la temperatura, la precipitación y la fuerza del viento. Cada cambio tarda 1d4 x 10 minutos en hacerse efectivo.'
  },
  {
    id: 'demiplane', name: 'Semiplano', level: 8,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 acción', range: '60 pies',
    components: 'S', duration: '1 hora', concentration: false,
    classes: ['warlock', 'wizard'],
    description: 'Creas una puerta sombría en una superficie plana que conduce a un semiplano vacío de 30 pies de lado. Puedes elegir crear un semiplano nuevo o conectar la puerta a uno que ya hayas creado previamente si conoces su naturaleza única.'
  },
  {
    id: 'dominate_monster', name: 'Dominar Monstruo', level: 8,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Intentas tomar el control de cualquier criatura. El objetivo debe superar una salvación de Sabiduría (con ventaja si estás luchando contra él). Mientras esté hechizado, puedes usar tu acción para tomar el control total de sus movimientos y acciones a través de un vínculo telepático.'
  },
  {
    id: 'earthquake', name: 'Terremoto', level: 8,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '500 pies',
    components: 'V, S, M (un trozo de arcilla y una pizca de suciedad)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric', 'druid', 'sorcerer'],
    description: 'Provocas un temblor masivo en un radio de 100 pies. El suelo se vuelve terreno difícil, las estructuras reciben daño intenso, se abren fisuras en la tierra y las criaturas deben superar salvaciones de Destreza para no caer derribadas o quedar atrapadas en las grietas.'
  },
  {
    id: 'feeblemind', name: 'Debilidad Mental', level: 8,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '150 pies',
    components: 'V, S, M (puñados de arcilla, cristal o esferas minerales)', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'druid', 'warlock', 'wizard'],
    description: 'Lanzas una ráfaga de energía psíquica. El objetivo debe realizar una salvación de Inteligencia. Si falla, sus puntuaciones de Inteligencia y Carisma se reducen a 1. La criatura no puede lanzar hechizos, usar objetos mágicos ni comunicarse de ninguna forma coherente.'
  },
  {
    id: 'glibness', name: 'Elocuencia Sobrenatural', level: 8,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V', duration: '1 hora', concentration: false,
    classes: ['bard'],
    description: 'Tu magia hace que tus palabras fluyan con una convicción imposible de ignorar. Durante la duración del hechizo, cuando realices una prueba de Carisma (como Engaño o Persuasión), puedes sustituir el resultado del dado por un 15 si este fuera menor.'
  },
  {
    id: 'holy_aura', name: 'Aura Sagrada', level: 8,
    school: 'Abjuración', type: 'Soporte', castingTime: '1 acción', range: 'Personal (radio de 30 pies)',
    components: 'V, S, M (una reliquia sagrada valorada en 1,000 po)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric'],
    description: 'Energía divina emana de ti. Tus aliados en el área tienen ventaja en todas las tiradas de salvación y los enemigos tienen desventaja en sus tiradas de ataque contra ellos. Si un no muerto o un infernal golpea a una criatura protegida, puede quedar cegado por el brillo sagrado.'
  },
  {
    id: 'incendiary_cloud', name: 'Nube Incendiaria', level: 8,
    school: 'Conjuración', type: 'Daño', castingTime: '1 acción', range: '150 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Creas una nube de humo caliente con ascuas al rojo vivo en una esfera de 20 pies de radio. Las criaturas en el área reciben 10d8 de daño de fuego (salvación de Destreza para la mitad). La nube está muy oscurecida y se aleja de ti 10 pies al comienzo de cada uno de tus turnos.'
  },
  {
    id: 'maze', name: 'Laberinto', level: 8,
    school: 'Conjuración', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Concentración, hasta 10 minutos', concentration: true,
    classes: ['wizard'],
    description: 'Destierras a una criatura a un laberinto extradimensional. La criatura desaparece y queda atrapada allí. Puede intentar escapar en cada uno de sus turnos realizando una prueba de Inteligencia CD 20. Si tiene éxito, el hechizo termina y la criatura reaparece en su espacio original.'
  },
  {
    id: 'mind_blank', name: 'Mente en Blanco', level: 8,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: '24 horas', concentration: false,
    classes: ['bard', 'wizard'],
    description: 'Otorga una protección total contra influencias mentales. El objetivo es inmune al daño psíquico, al escudriñamiento mágico, a la lectura de pensamientos, a ser hechizado y a cualquier efecto que intente detectar sus emociones o ubicación mental.'
  },
  {
    id: 'power_word_stun', name: 'Palabra de Poder: Aturdir', level: 8,
    school: 'Encantamiento', type: 'Control', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['bard', 'sorcerer', 'warlock', 'wizard'],
    description: 'Pronuncias una palabra de poder que abruma la mente de una criatura. Si el objetivo tiene 150 puntos de golpe o menos, queda aturdido automáticamente. Al final de cada uno de sus turnos, la criatura puede realizar una salvación de Constitución para terminar el efecto.'
  },
  {
    id: 'sunburst', name: 'Explosión Solar', level: 8,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '150 pies',
    components: 'V, S, M (una lupa y una pizca de azufre)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'druid', 'sorcerer', 'wizard'],
    description: 'Una luz brillante estalla en una esfera de 60 pies de radio. Cada criatura debe realizar una salvación de Constitución; recibe 12d6 de daño radiante y queda cegada por 1 minuto si falla. Los no muertos y los limos tienen desventaja en esta salvación.'
  },
  {
    id: 'telepathy', name: 'Telepatía', level: 8,
    school: 'Evocación', type: 'Utilidad', castingTime: '1 acción', range: 'Ilimitado',
    components: 'V, S, M (un trozo de alambre de cobre)', duration: '24 horas', concentration: false,
    classes: ['wizard'],
    description: 'Creas un vínculo mental con una criatura que conozcas y que esté en el mismo plano de existencia. Podéis comunicaros telepáticamente de forma instantánea a cualquier distancia durante la duración del hechizo, siempre que el objetivo tenga una Inteligencia de al menos 1.'
  }
];

// ============================================================
// NIVEL 9 (PLAYER'S HANDBOOK)
// ============================================================
export const SPELLS_LEVEL_9: SpellDefinition[] = [
  {
    id: 'astral_projection', name: 'Proyección Astral', level: 9,
    school: 'Nigromancia', type: 'Utilidad', castingTime: '1 hora', range: '10 pies',
    components: 'V, S, M (un jacinto de 1,000 po y una barra de plata por cada persona)', duration: 'Especial', concentration: false,
    classes: ['cleric', 'warlock', 'wizard'],
    description: 'Tú y hasta ocho criaturas voluntarias proyectáis vuestras formas astrales en el Plano Astral. Vuestros cuerpos físicos quedan en un estado de animación suspendida. El viaje dura hasta que decidas regresar, la conexión se corte o tus puntos de golpe astrales lleguen a 0.'
  },
  {
    id: 'foresight', name: 'Presciencia', level: 9,
    school: 'Adivinación', type: 'Soporte', castingTime: '1 minuto', range: 'Toque',
    components: 'V, S, M (una pluma de colibrí)', duration: '8 horas', concentration: false,
    classes: ['bard', 'druid', 'warlock', 'wizard'],
    description: 'Otorgas a una criatura una visión limitada del futuro inmediato. El objetivo no puede ser sorprendido y tiene ventaja en todas las tiradas de ataque, pruebas de característica y salvaciones. Además, las demás criaturas tienen desventaja en las tiradas de ataque contra el objetivo.'
  },
  {
    id: 'gate', name: 'Portal', level: 9,
    school: 'Conjuración', type: 'Utilidad', castingTime: '1 acción', range: '60 pies',
    components: 'V, S, M (un diamante valorado en 5,000 po)', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['cleric', 'sorcerer', 'warlock', 'wizard'],
    description: 'Abres un portal que conecta un espacio desocupado que ves con una ubicación específica en un plano diferente. Si nombras a una criatura específica al lanzar el hechizo, el portal se abre cerca de ella y puede ser atraída a través de él a tu plano.'
  },
  {
    id: 'imprisonment', name: 'Encarcelamiento', level: 9,
    school: 'Abjuración', type: 'Control', castingTime: '1 minuto', range: '30 pies',
    components: 'V, S, M (un componente especial por valor de 500 po por cada dado de vida del objetivo)', duration: 'Hasta que sea disipado', concentration: false,
    classes: ['warlock', 'wizard'],
    description: 'Creas una prisión mágica inexpugnable para un ser. El objetivo debe superar una salvación de Sabiduría o quedar atrapado en una de varias formas: enterrado bajo tierra, encadenado, encerrado en una gema o en un semiplano. El hechizo solo puede terminarse mediante un activador que definas al lanzarlo.'
  },
  {
    id: 'mass_heal', name: 'Sanación Masiva', level: 9,
    school: 'Evocación', type: 'Curación', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['cleric'],
    description: 'Una inundación de energía curativa emana de ti. Distribuyes 700 puntos de golpe entre cualquier número de criaturas a tu elección que puedas ver en el rango. El hechizo también cura todas las enfermedades y termina los efectos de ceguera o sordera en los objetivos.'
  },
  {
    id: 'mass_polymorph', name: 'Polimorfia Masiva', level: 9,
    school: 'Transmutación', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S, M (un capullo de oruga)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'sorcerer', 'wizard'],
    description: 'Transformas a hasta diez criaturas que puedas ver. Cada criatura no voluntaria debe superar una salvación de Sabiduría para evitar el efecto. Puedes convertir a los aliados en bestias poderosas o a los enemigos en criaturas inofensivas como ranas. El efecto termina si un objetivo baja a 0 puntos de golpe.'
  },
  {
    id: 'meteor_swarm', name: 'Lluvia de Meteoritos', level: 9,
    school: 'Evocación', type: 'Daño', castingTime: '1 acción', range: '1 milla',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Invocas cuatro orbes de fuego que caen sobre puntos que elijas. Cada criatura en un radio de 40 pies de cada punto debe realizar una salvación de Destreza. Recibe 20d6 de daño de fuego y 20d6 de daño contundente si falla, o la mitad si tiene éxito. El daño total puede ser de hasta 40d6.'
  },
  {
    id: 'power_word_heal', name: 'Palabra de Poder: Curar', level: 9,
    school: 'Evocación', type: 'Curación', castingTime: '1 acción', range: 'Toque',
    components: 'V, S', duration: 'Instantáneo', concentration: false,
    classes: ['bard'],
    description: 'Pronuncias una palabra de poder que restaura la vitalidad. Una criatura que tocas recupera todos sus puntos de golpe y deja de estar hechizada, asustada, paralizada o aturdida. Si la criatura estaba derribada, puede levantarse inmediatamente usando su reacción.'
  },
  {
    id: 'power_word_kill', name: 'Palabra de Poder: Matar', level: 9,
    school: 'Encantamiento', type: 'Daño', castingTime: '1 acción', range: '60 pies',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'warlock', 'wizard'],
    description: 'Pronuncias una palabra de poder que obliga a una criatura a morir. Si el objetivo tiene 100 puntos de golpe o menos, muere instantáneamente. Si tiene más de 100 puntos de golpe, el hechizo no tiene ningún efecto.'
  },
  {
    id: 'prismatic_wall', name: 'Muro Prismático', level: 9,
    school: 'Abjuración', type: 'Defensa', castingTime: '1 acción', range: '60 pies',
    components: 'V, S', duration: '10 minutos', concentration: false,
    classes: ['wizard'],
    description: 'Creas un muro vertical u horizontal de siete capas de colores brillantes. Cada capa tiene un efecto defensivo y ofensivo único (daño elemental, condiciones o destierro). Las criaturas que intenten atravesarlo deben superar salvaciones para cada capa. El muro es inmune a ser disipado por medios convencionales.'
  },
  {
    id: 'shapechange', name: 'Cambio de Forma', level: 9,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V, S, M (una diadema de jade por valor de 1,500 po)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['druid', 'wizard'],
    description: 'Te transformas en cualquier criatura de valor de desafío igual o menor a tu nivel. Conservas tus puntuaciones mentales y tu propia personalidad. Mientras el hechizo dure, puedes usar tu acción para cambiar tu forma a otra criatura diferente sin gastar otro espacio de hechizo.'
  },
  {
    id: 'time_stop', name: 'Detener el Tiempo', level: 9,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: 'Personal',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'Detienes brevemente el flujo del tiempo para todos excepto para ti. Ganas 1d4 + 1 turnos consecutivos para actuar. El hechizo termina prematuramente si realizas cualquier acción que afecte a otra criatura o a un objeto que alguien más lleve o sostenga.'
  },
  {
    id: 'true_polymorph', name: 'Polimorfia Verdadera', level: 9,
    school: 'Transmutación', type: 'Utilidad', castingTime: '1 acción', range: '30 pies',
    components: 'V, S, M (una gota de mercurio y una pizca de hierro)', duration: 'Concentración, hasta 1 hora', concentration: true,
    classes: ['bard', 'warlock', 'wizard'],
    description: 'Transformas a una criatura u objeto en una criatura u objeto diferente. Si mantienes la concentración durante la hora completa, la transformación se vuelve permanente. Puedes convertir a un enemigo en un guijarro o a un objeto inanimado en un servidor leal.'
  },
  {
    id: 'true_resurrection', name: 'Resurrección Verdadera', level: 9,
    school: 'Nigromancia', type: 'Curación', castingTime: '1 hora', range: 'Toque',
    components: 'V, S, M (diamantes por valor de 25,000 po, que el hechizo consume)', duration: 'Instantáneo', concentration: false,
    classes: ['cleric', 'druid'],
    description: 'Devuelves la vida a una criatura que ha estado muerta hasta 200 años. El hechizo no requiere un cuerpo; si este no existe, el hechizo crea uno nuevo. Cura todas las heridas, restaura miembros perdidos y elimina cualquier maldición, enfermedad o veneno que afectara a la criatura.'
  },
  {
    id: 'weird', name: 'Pesadilla', level: 9,
    school: 'Ilusión', type: 'Control', castingTime: '1 acción', range: '120 pies',
    components: 'V, S', duration: 'Concentración, hasta 1 minuto', concentration: true,
    classes: ['sorcerer', 'wizard'],
    description: 'Invocas los miedos más profundos de múltiples criaturas en una esfera de 30 pies de radio. Cada objetivo debe superar una salvación de Sabiduría o quedar asustado. Al final de cada uno de sus turnos, los afectados deben repetir la salvación o recibir 4d10 de daño psíquico.'
  },
  {
    id: 'wish', name: 'Deseo', level: 9,
    school: 'Conjuración', type: 'Especial', castingTime: '1 acción', range: 'Personal',
    components: 'V', duration: 'Instantáneo', concentration: false,
    classes: ['sorcerer', 'wizard'],
    description: 'El hechizo más poderoso de todos. Puede replicar cualquier hechizo de nivel 8 o inferior instantáneamente sin coste ni componentes. Alternativamente, puedes pedir un efecto personalizado, aunque esto conlleva el riesgo de sufrir un estrés mágico que podría impedirte volver a lanzar Deseo para siempre.'
  }
];

// ============================================================
// GRIMORIO COMPLETO por Nivel
// ============================================================
export const SRD_SPELLS_BY_LEVEL: Record<number, SpellDefinition[]> = {
  0: SPELLS_LEVEL_0,
  1: SPELLS_LEVEL_1,
  2: SPELLS_LEVEL_2,
  3: SPELLS_LEVEL_3,
  4: SPELLS_LEVEL_4,
  5: SPELLS_LEVEL_5,
  6: SPELLS_LEVEL_6,
  7: SPELLS_LEVEL_7,
  8: SPELLS_LEVEL_8,
  9: SPELLS_LEVEL_9,
};

// Acceso directo a todos los conjuros en un solo array plano
export const ALL_SRD_SPELLS: SpellDefinition[] = [
  ...SPELLS_LEVEL_0,
  ...SPELLS_LEVEL_1,
  ...SPELLS_LEVEL_2,
  ...SPELLS_LEVEL_3,
  ...SPELLS_LEVEL_4,
  ...SPELLS_LEVEL_5,
  ...SPELLS_LEVEL_6,
  ...SPELLS_LEVEL_7,
  ...SPELLS_LEVEL_8,
  ...SPELLS_LEVEL_9,
];

// Helper para filtrar por clase y nivel
export const getSpellsByClassAndLevel = (classId: SpellClass, level: number): SpellDefinition[] => {
  return ALL_SRD_SPELLS.filter(s => s.level === level && s.classes.includes(classId));
};

// Helper para filtrar cantrips + nivel 1 por clase (para el creador de personajes)
export const getStarterSpellsForClass = (classId: string): { cantrips: SpellDefinition[], level1: SpellDefinition[], level2: SpellDefinition[], level3: SpellDefinition[], level4: SpellDefinition[], level5: SpellDefinition[], level6: SpellDefinition[], level7: SpellDefinition[], level8: SpellDefinition[], level9: SpellDefinition[] } => {
  const spellClass = classId as SpellClass;
  return {
    cantrips: getSpellsByClassAndLevel(spellClass, 0),
    level1: getSpellsByClassAndLevel(spellClass, 1),
    level2: getSpellsByClassAndLevel(spellClass, 2),
    level3: getSpellsByClassAndLevel(spellClass, 3),
    level4: getSpellsByClassAndLevel(spellClass, 4),
    level5: getSpellsByClassAndLevel(spellClass, 5),
    level6: getSpellsByClassAndLevel(spellClass, 6),
    level7: getSpellsByClassAndLevel(spellClass, 7),
    level8: getSpellsByClassAndLevel(spellClass, 8),
    level9: getSpellsByClassAndLevel(spellClass, 9),
  };
};

// Determina por clase cuánta magia conocen inicialmente a nivel 1
export const getMagicCapacity = (classId: string) => {
  switch(classId) {
    case 'wizard': return { cantrips: 3, spells: 2, magicType: "Grimorio Arcano" };
    case 'sorcerer': return { cantrips: 4, spells: 2, magicType: "Magia Innata" };
    case 'bard': return { cantrips: 2, spells: 4, magicType: "Repertorio Musical" };
    case 'cleric': return { cantrips: 3, spells: 2, magicType: "Dominio Divino" };
    case 'druid': return { cantrips: 2, spells: 2, magicType: "Magia de la Naturaleza" };
    case 'warlock': return { cantrips: 2, spells: 2, magicType: "Pacto Mágico" };
    default: return null;
  }
};
