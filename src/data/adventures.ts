export interface AdventureModule {
  id: string;
  title: string;
  description: string;
  author: string;
  startingMessage?: string; // If present, it's a pre-written opening
  systemContext?: string; // Context for the AI
  type: 'classic' | 'random';
}

export const ADVENTURE_MODULES: AdventureModule[] = [
  {
    id: 'phandelver',
    title: 'La Mina Perdida de Phandelver',
    author: 'Wizards of the Coast',
    description: 'La aventura clásica para héroes novatos. Escolta un carromato hacia el pueblo de Phandalin y descubre los secretos que aguardan en las colinas.',
    type: 'classic',
    startingMessage: 'Te encuentras sentado en la parte trasera de un carromato crujiente que se dirige hacia el este, por el Camino de Phandalin. El sol comienza a descender sobre las colinas cercanas, bañando el paisaje con un tono ámbar. Gundren Buscapiedra, un enano de barba poblada y mirada entusiasta, conduce el vehículo mientras tararea una melodía antigua. "¡Casi estamos, amigo mío!", exclama señalando hacia adelante. "Phandalin nos espera, y con ella, una fortuna que cambiará nuestras vidas". Los sacos de provisiones se sacuden con cada bache del camino, y el olor a pino y tierra húmeda llena el aire. ¿Qué vas haciendo mientras el viaje continúa?',
    systemContext: 'Esta historia sigue el módulo "La Mina Perdida de Phandelver". El jugador está escoltando provisiones para Gundren Buscapiedra hacia Phandalin. El ambiente es de inicio de aventura, con peligros acechando en los bosques (trasgos, emboscadas).'
  },
  {
    id: 'random',
    title: 'Aventura Aleatoria',
    author: 'IA Narradora',
    description: 'Deja que el destino decida. El Narrador creará una historia única basada en el trasfondo y las habilidades de tu personaje.',
    type: 'random'
  }
];
