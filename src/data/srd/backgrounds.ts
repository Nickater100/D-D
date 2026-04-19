export interface BackgroundDefinition {
  id: string;
  name: string;
  description: string;
  skillProficiencies: string[];
  toolProficiencies?: string[];
  languagesCount?: number;
  startingEquipmentIds: string[];
  feature: {
    name: string;
    description: string;
  };
}

export const SRD_BACKGROUNDS: Record<string, BackgroundDefinition> = {
  acolyte: {
    id: 'acolyte',
    name: 'Acólito',
    description: 'Has pasado tu vida sirviendo a un tempo sagrado prestando servicio a un dios o panteón.',
    skillProficiencies: ['insight', 'religion'],
    languagesCount: 2,
    startingEquipmentIds: ['holy_symbol', 'prayer_book', 'incense_x5', 'vestments', 'common_clothes', 'gold_15'],
    feature: {
      name: 'Refugio de los Fieles',
      description: 'Gozas del respeto de los fieles a tu deidad. Puedes conseguir que curen tus heridas (pero no pagas materiales) y alojamiento para ti y tus compañeros.'
    }
  },
  charlatan: {
    id: 'charlatan',
    name: 'Charlatán',
    description: 'Siempre has tenido maña con las personas. Sabes lo que quieren y se lo entregas.',
    skillProficiencies: ['deception', 'sleight_of_hand'],
    toolProficiencies: ['disguise_kit', 'forgery_kit'],
    startingEquipmentIds: ['fine_clothes', 'disguise_kit', 'con_tools', 'gold_15'],
    feature: {
      name: 'Identidad Falsa',
      description: 'Has creado una segunda identidad que incluye documentación y conocidos falsos. Puedes falsificar documentos con fiabilidad.'
    }
  },
  criminal: {
    id: 'criminal',
    name: 'Criminal',
    description: 'Eres un infractor con un historial delictivo que sobrevive rompiendo las leyes.',
    skillProficiencies: ['deception', 'stealth'],
    toolProficiencies: ['gaming_set', 'thieves_tools'],
    startingEquipmentIds: ['crowbar', 'dark_common_clothes', 'gold_15'],
    feature: {
      name: 'Pícaro Entablando Contacto',
      description: 'Tienes un contacto de fiar en el mundo criminal que te pasa mensajes y te consigue misiones sumergidas.'
    }
  },
  entertainer: {
    id: 'entertainer',
    name: 'Animador',
    description: 'Te creces ante un grupo de mirones. Sabes cómo hipnotizarlos, captarlos y divertirlos.',
    skillProficiencies: ['acrobatics', 'performance'],
    toolProficiencies: ['disguise_kit', 'musical_instrument'],
    startingEquipmentIds: ['musical_instrument', 'favor_of_admirer', 'costume', 'gold_15'],
    feature: {
      name: 'A Demanda Popular',
      description: 'Siempre puedes encontrar un sitio para actuar, que te da alojamiento y comida gratis, a cambio de que actúes en la taberna o posada cada noche.'
    }
  },
  folk_hero: {
    id: 'folk_hero',
    name: 'Héroe del Pueblo',
    description: 'Vienes de la clase llana, pero estas destinado a cosas mucho más grandes.',
    skillProficiencies: ['animal_handling', 'survival'],
    toolProficiencies: ['artisans_tools', 'land_vehicles'],
    startingEquipmentIds: ['artisans_tools', 'shovel', 'iron_pot', 'common_clothes', 'gold_10'],
    feature: {
      name: 'Hospitalidad Rústica',
      description: 'Como vienes de la plebe te asimilas bien entre ellos. Te darán protección y posada con tal de no delatarte si corres peligro.'
    }
  },
  guild_artisan: {
    id: 'guild_artisan',
    name: 'Artesano Gremial',
    description: 'Eres miembro de un gremio artesano, excelente en tu campo laboral respaldado por tus compadres.',
    skillProficiencies: ['insight', 'persuasion'],
    toolProficiencies: ['artisans_tools'],
    languagesCount: 1,
    startingEquipmentIds: ['artisans_tools', 'letter_of_introduction', 'travelers_clothes', 'gold_15'],
    feature: {
      name: 'Membresía del Gremio',
      description: 'Tus compañeros artesanos te hospedarán y financiarán temporalmente si les pagas tus 5 po mensuales. Tienes enorme influencia mercantil.'
    }
  },
  hermit: {
    id: 'hermit',
    name: 'Ermitaño',
    description: 'Has vivido en el apartamiento por una larga temporada en una vida formativa de soledad fuera de las presencias civiles.',
    skillProficiencies: ['medicine', 'religion'],
    toolProficiencies: ['herbalism_kit'],
    languagesCount: 1,
    startingEquipmentIds: ['scroll_case_with_notes', 'winter_blanket', 'common_clothes', 'herbalism_kit', 'gold_5'],
    feature: {
      name: 'Descubrimiento',
      description: 'Tu aislamiento te ha dado acceso a una epifanía especial e invaluable sobre una gran verdad mágica, histórica o cósmica.'
    }
  },
  noble: {
    id: 'noble',
    name: 'Noble',
    description: 'Entiendes de bienes inmuebles, poder e influencias como parte importante de tu rica y noble familia.',
    skillProficiencies: ['history', 'persuasion'],
    toolProficiencies: ['gaming_set'],
    languagesCount: 1,
    startingEquipmentIds: ['fine_clothes', 'signet_ring', 'scroll_pedigree', 'gold_25'],
    feature: {
      name: 'Posición de Privilegio',
      description: 'Gracias a tu linaje siempre eres bien recibido. Podrás entablar audiencia urgente con cualquier noble de la zona o gobierno de ciudad.'
    }
  },
  outlander: {
    id: 'outlander',
    name: 'Forastero',
    description: 'Has crecido en la naturaleza lejos de la comodidad a la que se acoge la gente en las zonas pobladas de grandes ciudades.',
    skillProficiencies: ['athletics', 'survival'],
    toolProficiencies: ['musical_instrument'],
    languagesCount: 1,
    startingEquipmentIds: ['staff', 'hunting_trap', 'trophy_from_animal', 'travelers_clothes', 'gold_10'],
    feature: {
      name: 'Trotamundos',
      description: 'Tienes una memoria perfecta de cualquier mapa o geografía por la que recorras, e incluso puedes encontrar alimentos frescos asumiendo que la tierra ofrezca sustento.'
    }
  },
  sage: {
    id: 'sage',
    name: 'Erudito',
    description: 'Pasaste años formándote aprendiendo la sabiduría envuelta en numerosos tomos y el polvo de tu biblioteca local.',
    skillProficiencies: ['arcana', 'history'],
    languagesCount: 2,
    startingEquipmentIds: ['bottle_of_ink', 'quill', 'small_knife', 'letter_from_colleague', 'common_clothes', 'gold_10'],
    feature: {
      name: 'Investigador',
      description: 'Cuando intentas aprender u obtener conocimiento que no sabes la ubicación, siempre sabes intuitivamente dónde se oculta quien tiene esta información o lugar (general).'
    }
  },
  sailor: {
    id: 'sailor',
    name: 'Marinero',
    description: 'Llevas la brisa helada y el poder del inminente estruendo oscuro de los mares tempestuosos contigo.',
    skillProficiencies: ['athletics', 'perception'],
    toolProficiencies: ['navigators_tools', 'water_vehicles'],
    startingEquipmentIds: ['belaying_pin_club', 'silk_rope_50ft', 'lucky_charm', 'common_clothes', 'gold_10'],
    feature: {
      name: 'Pasaje en Barco',
      description: 'Cuando necesites puedes disponer de un pasaje naval propio gratis en casi todo barco si tú y tú equipo le otorgan la ayuda a su navegación mientras zarpa.'
    }
  },
  soldier: {
    id: 'soldier',
    name: 'Soldado',
    description: 'Combate en tu sangre. Estuviste alistado en un tiempo para lidiar batallas por lo que los horrores bélicos son normales en ti.',
    skillProficiencies: ['athletics', 'intimidation'],
    toolProficiencies: ['gaming_set', 'land_vehicles'],
    startingEquipmentIds: ['insignia_of_rank', 'trophy_from_fallen', 'bone_dice', 'common_clothes', 'gold_10'],
    feature: {
      name: 'Rango Militar',
      description: 'Tienes un importante estatus e influencia con fuerzas de combate aliado de tu facción anterior o cualquier grupo de milicia u oficiales leales, quienes acatarán e interactuarán contigo de acuerdo a tu grado.'
    }
  },
  urchin: {
    id: 'urchin',
    name: 'Huérfano',
    description: 'Creciste por las calles solo, hambriento, y abandonado a tu merced. Sabes robar, cuidar de los tuyos, e ingeniártelas día a día.',
    skillProficiencies: ['sleight_of_hand', 'stealth'],
    toolProficiencies: ['disguise_kit', 'thieves_tools'],
    startingEquipmentIds: ['small_knife', 'map_city_origin', 'pet_mouse', 'token_parents', 'common_clothes', 'gold_10'],
    feature: {
      name: 'Secretos de Ciudad',
      description: 'Estás muy bien adaptado a tu geografía de las urbes grandes y tienes pasajes que ningún local sabe. Puedes ir tú y tus amigos doble de rápido que a velocidad común atravesando ciudades.'
    }
  }
};
