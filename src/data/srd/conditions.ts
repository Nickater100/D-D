export interface ConditionDefinition {
  id: string;
  name: string;
  description: string[];
}

// Condiciones oficiales del Player's Handbook (Apéndice A)
export const SRD_CONDITIONS: Record<string, ConditionDefinition> = {
  blinded: {
    id: 'blinded',
    name: 'Cegado',
    description: [
      'Una criatura cegada falla automáticamente cualquier tirada de característica que requiera la vista.',
      'Las tiradas de ataque contra la criatura tienen ventaja, y las tiradas de ataque de la criatura tienen desventaja.'
    ]
  },
  charmed: {
    id: 'charmed',
    name: 'Hechizado',
    description: [
      'Una criatura hechizada no puede atacar al hechizador ni usar habilidades dañosas o efectos mágicos contra él.',
      'El hechizador tiene ventaja en tiradas de característica para interactuar socialmente con la criatura.'
    ]
  },
  deafened: {
    id: 'deafened',
    name: 'Ensordecido',
    description: [
      'Una criatura ensordecida falla automáticamente cualquier tirada de característica que requiera oír.'
    ]
  },
  frightened: {
    id: 'frightened',
    name: 'Asustado',
    description: [
      'Una criatura asustada tiene desventaja en tiradas de característica y tiradas de ataque mientras la fuente de su miedo esté a la vista.',
      'La criatura no puede moverse voluntariamente para acercarse a la fuente del miedo.'
    ]
  },
  grappled: {
    id: 'grappled',
    name: 'Agarrado',
    description: [
      'La velocidad de una criatura agarrada se convierte en 0, y no puede beneficiarse de bonificaciones a la velocidad.',
      'La condición termina si quien agarra está incapacitado, o si un efecto desplaza a la criatura agarrada fuera del alcance de la fuente del agarre.'
    ]
  },
  incapacitated: {
    id: 'incapacitated',
    name: 'Incapacitado',
    description: [
      'Una criatura incapacitada no puede realizar acciones ni reacciones.'
    ]
  },
  invisible: {
    id: 'invisible',
    name: 'Invisible',
    description: [
      'Una criatura invisible es imposible de ver sin magia o visión especial. A efectos mecánicos, se considera intensamente oscurecida.',
      'Las tiradas de ataque contra la criatura tienen desventaja, y las tiradas de ataque de la criatura tienen ventaja.'
    ]
  },
  paralyzed: {
    id: 'paralyzed',
    name: 'Paralizado',
    description: [
      'Una criatura paralizada está incapacitada (ver condición) y no puede moverse ni hablar.',
      'Pasa automáticamente cualquier tirada de salvación de Fue y Des.',
      'Las tiradas de ataque contra ella tienen ventaja.',
      'Cualquier ataque que acierte es un golpe crítico si el atacante está a 5 pies de la criatura.'
    ]
  },
  petrified: {
    id: 'petrified',
    name: 'Petrificado',
    description: [
      'La criatura y todos los objetos no mágicos que viste o transporta se transforman en una sustancia inanimada sólida (usualmente roca).',
      'El peso de la criatura se multiplica por diez, y envejece.',
      'Está incapacitada, no puede moverse, ni hablar, y no es consciente de su entorno.',
      'Tiene resistencia a todo daño e inmunidad al veneno y enfermedades.',
      'Pasa automáticamente las tiradas de salvación de Fue y Des.'
    ]
  },
  poisoned: {
    id: 'poisoned',
    name: 'Envenenado',
    description: [
      'Una criatura envenenada tiene desventaja en tiradas de ataque y tiradas de característica.'
    ]
  },
  prone: {
    id: 'prone',
    name: 'Derribado (Tumbado)',
    description: [
      'La única opción de movimiento de la criatura es arrastrarse, a menos que se levante y termine la condición.',
      'La criatura tiene desventaja en tiradas de ataque.',
      'Una tirada de ataque contra la criatura tiene ventaja si el atacante está a 5 pies, y desventaja si está más lejos.'
    ]
  },
  restrained: {
    id: 'restrained',
    name: 'Apresado',
    description: [
      'La velocidad de una criatura apresada es 0.',
      'Tiradas de ataque contra la criatura tienen ventaja, y las tiradas de la criatura tienen desventaja.',
      'La criatura tiene desventaja en tiradas de salvación de Destreza.'
    ]
  },
  stunned: {
    id: 'stunned',
    name: 'Aturdido',
    description: [
      'Una criatura aturdida está incapacitada, no puede moverse, y solo balbucea.',
      'Falla automáticamente salvaciones de Fue y Des.',
      'Tiradas de ataque contra la criatura tienen ventaja.'
    ]
  },
  unconscious: {
    id: 'unconscious',
    name: 'Inconsciente',
    description: [
      'Una criatura inconsciente está incapacitada, paralizada, tira todo lo que sostiene y cae derribada.',
      'Falla automáticamente salvaciones de Fue y Des.',
      'Tiradas de ataque contra ella tienen ventaja y los ataques que impacten desde 5 pies o menos son críticos.'
    ]
  }
};
