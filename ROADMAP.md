# Roadmap del Proyecto & Backlog

Lista de características, mecánicas y requerimientos que la aplicación tiene pendientes de implementar en futuras iteraciones para cumplir el 100% del Player's Handbook (D&D 5e).

---

## ✅ Implementado (Capítulos Completados)

### Capítulo 1 — Paso a Paso del Personaje
- ✅ Flujo de creación de personaje de 6 pasos
- ✅ Sistema de Compra por Puntos (Point Buy, 27 puntos)
- ✅ Equipo inicial automático por clase y trasfondo

### Capítulo 2 — Razas
- ✅ 9 razas con bonificadores raciales, rasgos y competencias
- ✅ Subrazas (Dracónido: 10 ascendencias)
- ✅ Elecciones raciales flexibles (atributos, idiomas, habilidades, herramientas)

### Capítulo 3 — Clases
- ✅ 12 clases con dados de vida, tiradas de salvación y competencias
- ✅ Subclases de Nivel 1 obligatorias: 7 Dominios del Clérigo, 3 Patrones del Brujo, 2 Orígenes del Hechicero
- ✅ Estilos de Combate del Guerrero y el Paladín
- ✅ Pericia doble del Pícaro

### Capítulo 4 — Personalidad y Trasfondo (Mecánica)
- ✅ 13 Trasfondos implementados con habilidades, herramientas, idiomas, equipo y rasgo especial

### Capítulo 11 — Conjuros
- ✅ Gran Grimorio SRD: 124 hechizos (Trucos + Nivel 1 + Nivel 2) con tipado completo
- ✅ Filtro dinámico de conjuros por clase en el Paso 4 del Creador

---

## ⏳ Backlog: Reglas Opcionales Apartadas

### Capítulo 4 — Personalidad Narrativa
- [ ] **Rasgos de Personalidad, Ideales, Vínculos y Defectos:** Poblar `backgrounds.ts` con las tablas d6/d8 del PHB por trasfondo (3-4 opciones de cada uno). Añadir UI de selección en el Paso 3 del Creador y mostrarlos en la ficha de aventura. Son opcionales y no bloquean la creación.

### Capítulo 2 — Variantes y Extras
- [ ] **Humano Variante:** Requiere construir la UI de selección de Dotes (Feats) a Nivel 1.
- [ ] **Idiomas Exóticos:** Separar lista de idiomas en Estándar y Exóticos. Limitar los exóticos según raza y trasfondos específicos.

### Capítulo 1/5 — Economía
- [ ] **Compra de Equipo por Oro:** En lugar del paquete automático, permitir al jugador tirar los dados de oro inicial de su clase y comprar a la carta en una tienda con el inventario de la página 145.

---

## 🗓️ Próximos Capítulos a Implementar

- [ ] **Capítulo 5 — Equipo:** Armas, armaduras y propiedades completas. Impacto en CA y daño calculado desde la ficha.
- [ ] **Capítulo 7 — Utilizar las Características:** Profundizar chequeos activos (Pericia en combate, Tiradas de Salvación, Ventaja/Desventaja) integrados en la pantalla de aventura.
- [ ] **Capítulo 9 — Combate:** Motor de combate con iniciativa, acciones, ataques y resolución de daño usando los datos de la ficha del personaje.
- [ ] **Capítulo 10 — Lanzar Conjuros:** Gestión de espacios de conjuro, lista de hechizos preparados, componentes y duración activos en combate.
- [ ] **Hechizos de Nivel 3-9:** Poblar el Grimorio SRD con los hechizos de mayor nivel a medida que los personajes suban de nivel.
