export type AlignmentId = 
  | 'lg' | 'ng' | 'cg' 
  | 'ln' | 'n'  | 'cn' 
  | 'le' | 'ne' | 'ce';

export interface AlignmentDefinition {
  id: AlignmentId;
  name: string;
  abbreviation: string;
  description: string;
}

export const SRD_ALIGNMENTS: Record<AlignmentId, AlignmentDefinition> = {
  lg: {
    id: 'lg',
    name: 'Legal Bueno',
    abbreviation: 'LB',
    description: 'Se espera que las criaturas de este alineamiento actúen haciendo lo correcto respecto a lo que la sociedad dicta. (Ej: Paladines, enanos, dragones dorados).'
  },
  ng: {
    id: 'ng',
    name: 'Neutral Bueno',
    abbreviation: 'NB',
    description: 'Aquellos que hacen el máximo esfuerzo por ayudar a los demás según sus necesidades. (Ej: Celestes primarios, algunos humanos).'
  },
  cg: {
    id: 'cg',
    name: 'Caótico Bueno',
    abbreviation: 'CB',
    description: 'Actúan según les dicta su conciencia, sin preocuparse por lo que esperan los demás. (Ej: Elfos de cobre, dragones de cobre).'
  },
  ln: {
    id: 'ln',
    name: 'Legal Neutral',
    abbreviation: 'LN',
    description: 'Creencia firme en el honor, el orden y las reglas o tradiciones personales. (Ej: Monjes asertivos, algunos clérigos).'
  },
  n: {
    id: 'n',
    name: 'Neutral',
    abbreviation: 'N',
    description: 'Prefieren mantenerse al margen de dilemas morales y no toman partido. Siguen el instinto. (Ej: Druidas de la naturaleza, animales, humanos comunes).'
  },
  cn: {
    id: 'cn',
    name: 'Caótico Neutral',
    abbreviation: 'CN',
    description: 'Siguen sus impulsos y valoran la libertad individual sobre todas las cosas, sin intención maliciosa. (Ej: Bardos pícaros).'
  },
  le: {
    id: 'le',
    name: 'Legal Malvado',
    abbreviation: 'LM',
    description: 'Toman lo que quieren dentro de los límites de un código moral estricto de honor, jerarquía o tradición. (Ej: Diablos, tiranos).'
  },
  ne: {
    id: 'ne',
    name: 'Neutral Malvado',
    abbreviation: 'NM',
    description: 'Dispuestos a hacer lo que sea necesario sin compasión, piedad ni honor. Solos por sí mismos. (Ej: Muchos drow, mercenarios oscuros).'
  },
  ce: {
    id: 'ce',
    name: 'Caótico Malvado',
    abbreviation: 'CM',
    description: 'Actúan con violencia arbitraria, motivados por su sed de sangre y codicia pura. Disfrutan el sufrimiento ajeno. (Ej: Demonios, orcos, dragones rojos).'
  }
};
