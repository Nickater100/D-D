# Full Caster Slot Table (Level 1-20)
FULL_CASTER_SLOTS = {
    1:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
    2:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
    3:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
    4:  [4, 3, 0, 0, 0, 0, 0, 0, 0],
    5:  [4, 3, 2, 0, 0, 0, 0, 0, 0],
    6:  [4, 3, 3, 0, 0, 0, 0, 0, 0],
    7:  [4, 3, 3, 1, 0, 0, 0, 0, 0],
    8:  [4, 3, 3, 2, 0, 0, 0, 0, 0],
    9:  [4, 3, 3, 3, 1, 0, 0, 0, 0],
    10: [4, 3, 3, 3, 2, 0, 0, 0, 0],
    11: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    12: [4, 3, 3, 3, 2, 1, 0, 0, 0],
    13: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    14: [4, 3, 3, 3, 2, 1, 1, 0, 0],
    15: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    16: [4, 3, 3, 3, 2, 1, 1, 1, 0],
    17: [4, 3, 3, 3, 2, 1, 1, 1, 1],
    18: [4, 3, 3, 3, 3, 1, 1, 1, 1],
    19: [4, 3, 3, 3, 3, 2, 1, 1, 1],
    20: [4, 3, 3, 3, 3, 2, 2, 1, 1],
}

# Half Caster Slot Table
HALF_CASTER_SLOTS = {
    1:  [0, 0, 0, 0, 0, 0, 0, 0, 0],
    2:  [2, 0, 0, 0, 0, 0, 0, 0, 0],
    3:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
    4:  [3, 0, 0, 0, 0, 0, 0, 0, 0],
    5:  [4, 2, 0, 0, 0, 0, 0, 0, 0],
    # ... Simplified for implementation, usually follows (Level/2) in Full Caster table
}

WARLOCK_PACT_SLOTS = {
    1: {"count": 1, "level": 1},
    2: {"count": 2, "level": 1},
    3: {"count": 2, "level": 2},
    4: {"count": 2, "level": 2},
    5: {"count": 2, "level": 3},
    11: {"count": 3, "level": 5},
    17: {"count": 4, "level": 5},
}

class MagicEngine:
    @staticmethod
    def get_max_slots(player_class, level):
        """Returns a list of max slots per level [L1, L2, ... L9]."""
        if player_class in ["Wizard", "Cleric", "Druid", "Sorcerer", "Bard"]:
            return FULL_CASTER_SLOTS.get(level, [0]*9)
        elif player_class in ["Paladin", "Ranger"]:
            # Effective level for Half-Caster is Level/2 (rounded up)
            effective_level = (level + 1) // 2 if level > 1 else 0
            if effective_level == 0: return [0]*9
            return FULL_CASTER_SLOTS.get(effective_level, [0]*9)
        elif player_class == "Warlock":
            # Pact magic is different, returning it in a standard 9-level list
            data = WARLOCK_PACT_SLOTS.get(level, WARLOCK_PACT_SLOTS.get(max(k for k in WARLOCK_PACT_SLOTS if k <= level)))
            slots = [0] * 9
            slots[data["level"] - 1] = data["count"]
            return slots
        return [0]*9

# Singleton instance
magic_engine = MagicEngine()
