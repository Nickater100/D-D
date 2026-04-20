export interface Condition {
  id: string;
  name: string;
  description: string;
  effects: string[];
}

export const SRD_CONDITIONS: Record<string, Condition> = {
  blinded: {
    id: 'blinded',
    name: 'Cegado',
    description: 'Una criatura cegada no puede ver y falla automáticamente cualquier prueba de característica que requiera la vista.',
    effects: ['Las tiradas de ataque contra la criatura tienen ventaja.', 'Las tiradas de ataque de la criatura tienen desventaja.']
  },
  charmed: {
    id: 'charmed',
    name: 'Hechizado',
    description: 'Una criatura hechizada no puede atacar al hechizador ni afectarlo con capacidades u objetos mágicos dañinos.',
    effects: ['El hechizador tiene ventaja en cualquier prueba de característica para interactuar socialmente con la criatura.']
  },
  deafened: {
    id: 'deafened',
    name: 'Ensordecido',
    description: 'Una criatura ensordecida no puede oír y falla automáticamente cualquier prueba de característica que requiera el oído.',
    effects: []
  },
  frightened: {
    id: 'frightened',
    name: 'Asustado',
    description: 'Una criatura asustada tiene desventaja en las pruebas de característica y tiradas de ataque mientras la fuente de su miedo esté a la vista.',
    effects: ['La criatura no puede acercarse voluntariamente a la fuente de su miedo.']
  },
  grappled: {
    id: 'grappled',
    name: 'Agarrado',
    description: 'La velocidad de una criatura agarrada pasa a ser 0 y no puede beneficiarse de ningún bonificador a su velocidad.',
    effects: ['La condición termina si el agarrador queda incapacitado o si un efecto saca a la criatura del alcance del agarrador.']
  },
  incapacitated: {
    id: 'incapacitated',
    name: 'Incapacitado',
    description: 'Una criatura incapacitada no puede realizar acciones ni reacciones.',
    effects: []
  },
  invisible: {
    id: 'invisible',
    name: 'Invisible',
    description: 'Una criatura invisible es imposible de ver sin la ayuda de la magia o un sentido especial.',
    effects: ['Las tiradas de ataque contra la criatura tienen desventaja.', 'Las tiradas de ataque de la criatura tienen ventaja.']
  },
  paralyzed: {
    id: 'paralyzed',
    name: 'Paralizado',
    description: 'Una criatura paralizada está incapacitada y no puede moverse ni hablar.',
    effects: ['La criatura falla automáticamente las tiradas de salvación de Fuerza y Destreza.', 'Las tiradas de ataque contra la criatura tienen ventaja.', 'Cualquier ataque que golpee a la criatura es un impacto crítico si el atacante está a 5 pies.']
  },
  petrified: {
    id: 'petrified',
    name: 'Petrificado',
    description: 'Una criatura petrificada se transforma, junto con cualquier objeto no mágico que lleve, en una sustancia sólida e inanimada.',
    effects: ['La criatura está incapacitada y no puede moverse ni hablar.', 'Las tiradas de ataque contra la criatura tienen ventaja.', 'La criatura falla automáticamente las tiradas de salvación de Fue y Des.', 'La criatura tiene resistencia a todo el daño.']
  },
  poisoned: {
    id: 'poisoned',
    name: 'Envenenado',
    description: 'Una criatura envenenada tiene desventaja en las tiradas de ataque y pruebas de característica.',
    effects: []
  },
  prone: {
    id: 'prone',
    name: 'Derribado',
    description: 'La única opción de movimiento que tiene una criatura derribada es gatear, a menos que se levante.',
    effects: ['La criatura tiene desventaja en las tiradas de ataque.', 'Las tiradas de ataque contra la criatura tienen ventaja si el atacante está a 5 pies. De lo contrario, tienen desventaja.']
  },
  restrained: {
    id: 'restrained',
    name: 'Apresado',
    description: 'La velocidad de una criatura apresada pasa a ser 0.',
    effects: ['Las tiradas de ataque contra la criatura tienen ventaja.', 'Las tiradas de ataque de la criatura tienen desventaja.', 'La criatura tiene desventaja en las tiradas de salvación de Destreza.']
  },
  stunned: {
    id: 'stunned',
    name: 'Aturdido',
    description: 'Una criatura aturdida está incapacitada, no puede moverse y solo puede balbucear de forma incoherente.',
    effects: ['La criatura falla automáticamente las tiradas de salvación de Fuerza y Destreza.', 'Las tiradas de ataque contra la criatura tienen ventaja.']
  },
  unconscious: {
    id: 'unconscious',
    name: 'Inconsciente',
    description: 'Una criatura inconsciente está incapacitada, no puede moverse ni hablar, y no es consciente de su entorno.',
    effects: ['La criatura suelta lo que esté sujetando y cae derribada.', 'La criatura falla automáticamente las tiradas de salvación de Fue y Des.', 'Las tiradas de ataque contra la criatura tienen ventaja.', 'Cualquier ataque que golpee es un impacto crítico si el atacante está a 5 pies.']
  }
};
