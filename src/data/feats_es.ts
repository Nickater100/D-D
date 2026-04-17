import { type Feat } from '../types/dnd';

export const ORIGIN_FEATS: Feat[] = [
  {
    id: "alert",
    name: "Alerta",
    description: "Siempre estás atento al peligro. Ganas un bonificador a la Iniciativa igual a tu Bonificador por Competencia. Además, puedes intercambiar tu lugar en el orden de iniciativa con un aliado voluntario al inicio del combate."
  },
  {
    id: "crafter",
    name: "Artesano",
    description: "Eres experto en la creación de objetos. Obtienes competencia con tres herramientas de artesano de tu elección y recibes un 20% de descuento en la compra de equipo no mágico."
  },
  {
    id: "healer",
    name: "Curandero",
    description: "Eres un experto en medicina de campo. Puedes usar un Estuche de Curandero para estabilizar a una criatura y que esta recupere 1 HP. Además, al usar un dado de golpe para curar, puedes relanzar el dado una vez."
  },
  {
    id: "lucky",
    name: "Suertudo",
    description: "Tienes una suerte inexplicable. Tienes Puntos de Suerte igual a tu Bonificador por Competencia. Puedes usarlos para obtener Ventaja en una tirada de ataque, prueba de característica o salvación."
  },
  {
    id: "magic_initiate",
    name: "Iniciado en la Magia",
    description: "Has aprendido un poco de magia. Eliges una lista de conjuros (Clérigo, Druida o Mago). Aprendes dos trucos y un conjuro de nivel 1 de esa lista."
  },
  {
    id: "musician",
    name: "Músico",
    description: "Eres un maestro del entretenimiento. Tras un descanso, puedes tocar música para inspirar a tus aliados. Un número de aliados igual a tu Bonificador por Competencia recibe Inspiración Heroica."
  },
  {
    id: "savage_attacker",
    name: "Atacante Salvaje",
    description: "Tus ataques son brutales. Una vez por turno, cuando golpeas con un arma cuerpo a cuerpo, puedes tirar dos veces el dado de daño del arma y usar el resultado más alto."
  },
  {
    id: "skilled",
    name: "Habilidoso",
    description: "Eres experto en diversas áreas. Ganas competencia en tres habilidades o herramientas de tu elección."
  },
  {
    id: "tavern_brawler",
    name: "Luchador de Taberna",
    description: "Eres un experto en peleas improvisadas. El daño de tus golpes sin armas aumenta a 1d4 + mod de Fuerza. Además, cuando golpeas con un golpe sin armas, puedes empujar a la criatura 5 pies."
  },
  {
    id: "tough",
    name: "Robusto",
    description: "Tu vitalidad es legendaria. Tus HP máximos aumentan en 2 por cada nivel que tengas. Al obtener esta dote, tus HP máximos aumentan en un total de 2."
  }
];
