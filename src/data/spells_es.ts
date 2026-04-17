export const STARTER_SPELLS = {
  cantrips: [
    { id: "fire_bolt", name: "Descarga de Fuego", type: "Daño", desc: "Lanzas una mota de fuego. Si aciertas causas 1d10 daño fuego." },
    { id: "ray_of_frost", name: "Rayo de Escarcha", type: "Daño", desc: "Rayo helado; 1d8 daño frío y reduce la velocidad enemiga 10 pies." },
    { id: "eldritch_blast", name: "Descarga Sobrenatural", type: "Daño", desc: "El mejor truco (Brujos). Rayo de energía pura, 1d10 daño de fuerza." },
    { id: "sacred_flame", name: "Llama Sagrada", type: "Daño", desc: "Radiante desde el cielo; el enemigo debe salvar Destreza o comer 1d8 radiante." },
    { id: "mage_hand", name: "Mano de Mago", type: "Utilidad", desc: "Creas una mano invisible e incorpórea para interactuar con objetos ligeros a distancia." },
    { id: "light", name: "Luz", type: "Utilidad", desc: "Tocas un objeto y empieza a brillar mágicamente como una antorcha." },
    { id: "guidance", name: "Orientación", type: "Soporte", desc: "Otorgas +1d4 a la próxima prueba de habilidad de un aliado. Muy útil en narración." },
    { id: "minor_illusion", name: "Ilusión Menor", type: "Utilidad", desc: "Creas un sonido o imagen irreal estacionaria para distraer enemigos." },
    { id: "vicious_mockery", name: "Burla Mordaz", type: "Soporte", desc: "(Bardos). Insultas al enemigo; salva Sabiduría o sufre 1d4 psíquico y desventaja en su ataque." }
  ],
  level_1: [
    { id: "magic_missile", name: "Proyectil Mágico", type: "Daño", desc: "Lanzas 3 dardos mágicos brillantes. Nunca fallan y cada uno hace 1d4+1 daño de fuerza." },
    { id: "cure_wounds", name: "Curar Heridas", type: "Curación", desc: "Al tocar a un aliado, curas instantáneamente 1d8 + tu modificador de magia." },
    { id: "healing_word", name: "Palabra Curativa", type: "Curación", desc: "Curas a distancia con una palabra rápida, 1d4 + mod. Ideal para salvar aliados derribados." },
    { id: "shield", name: "Escudo", type: "Defensa", desc: "Una reacción instantánea que aumenta temporalmente tu Armadura en +5, repeliendo hasta Proyectil Mágico." },
    { id: "mage_armor", name: "Armadura de Mago", type: "Defensa", desc: "Protección elemental para hechiceros y magos; AC base a 13 + tu mod de Destreza al no usar armadura normal." },
    { id: "guiding_bolt", name: "Rayo Guía", type: "Daño", desc: "Haz de luz dorada celestial (Clérigos); 4d6 daño radiante y otorga ventaja contra ese monstruo." },
    { id: "inflict_wounds", name: "Causar Heridas", type: "Daño", desc: "Toque corrompido mortal; genera unos impresionantes 3d10 daño necrótico." },
    { id: "thunderwave", name: "Onda Truenadora", type: "Daño/Control", desc: "Un estallido ensordecedor que empuja 10 pies hacia atrás y castiga con 2d8 daño relámpago." },
    { id: "sleep", name: "Dormir", type: "Control", desc: "Sumes en un sueño mágico e ineludible a varios enemigos débiles con vida baja combinada sin tiradas previas." },
    { id: "hex", name: "Maleficio", type: "Daño Sotenido", desc: "(Brujos). Maledices a uno. Causa 1d6 extra necrótico cada vez que le pegues un ataque de cualquier tipo." },
    { id: "bless", name: "Bendición", type: "Soporte", desc: "A bendecir hasta 3 aliados. Tendrán +1d4 extra permanente en todos sus ataques y salvaciones." },
    { id: "charm_person", name: "Hechizar Persona", type: "Control", desc: "El humanoide ve al conjurador como un amigo amistoso hasta que reciba un ataque." }
  ]
};

// Determina por clase cuánta magia conocen inicialmente a nivel 1
export const GET_CLASS_MAGIC_CAPACITY = (classId: string) => {
  switch(classId) {
    case 'wizard': return { cantrips: 3, spells: 2, magicType: "Grimorio Arcano" }; // Simplified slots
    case 'sorcerer': return { cantrips: 4, spells: 2, magicType: "Magia Innata" };
    case 'bard': return { cantrips: 2, spells: 4, magicType: "Repertorio Musical" };
    case 'cleric': return { cantrips: 3, spells: 2, magicType: "Dominio Divino" };
    case 'druid': return { cantrips: 2, spells: 2, magicType: "Magia de la Naturaleza" };
    case 'warlock': return { cantrips: 2, spells: 2, magicType: "Pacto Mágico" };
    default: return null; // No magic or Paladins/Rangers get it later (Lvl 2+)
  }
};
