class TraitManager:
    """
    Manages racial and class traits that provide passive bonuses.
    This acts as a data bridge for the AI to know exact modifiers.
    """
    TRAITS_DATA = {
        "Dwarf": {
            "features": ["Darkvision", "Dwarven Resilience"],
            "description": "Ventaja en salvaciones contra veneno y resistencia al daño de veneno."
        },
        "Elf": {
            "features": ["Darkvision", "Keen Senses", "Fey Ancestry"],
            "description": "Ventaja en salvaciones contra ser hechizado y la magia no puede dormirte."
        },
        "Halfling": {
            "features": ["Lucky", "Brave"],
            "description": "Cuando sacas un 1 en un dado de ataque o habilidad, puedes volver a tirarlo."
        },
        "Fighter": {
            "features": ["Fighting Style", "Second Wind"],
            "description": "Puedes usar una acción adicional para recuperar 1d10 + nivel de vida."
        },
        "Wizard": {
            "features": ["Arcane Recovery"],
            "description": "Una vez por día tras un descanso corto, recuperas espacios de conjuro."
        }
    }

    @staticmethod
    def get_traits_for_character(race, player_class):
        traits = []
        if race in TraitManager.TRAITS_DATA:
            traits.append(TraitManager.TRAITS_DATA[race])
        if player_class in TraitManager.TRAITS_DATA:
            traits.append(TraitManager.TRAITS_DATA[player_class])
        return traits

# Singleton instance
trait_manager = TraitManager()
