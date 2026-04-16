import math

# XP thresholds for each level (1-20)
XP_TABLE = {
    1: 0,
    2: 300,
    3: 900,
    4: 2700,
    5: 6500,
    6: 14000,
    7: 23000,
    8: 34000,
    9: 48000,
    10: 64000,
    11: 85000,
    12: 100000,
    13: 120000,
    14: 140000,
    15: 165000,
    16: 195000,
    17: 225000,
    18: 265000,
    19: 305000,
    20: 355000
}

# Hit Dice (die size) by class
HIT_DICE_COLLECTION = {
    "Barbarian": 12,
    "Fighter": 10,
    "Paladin": 10,
    "Ranger": 10,
    "Artificer": 8,
    "Bard": 8,
    "Cleric": 8,
    "Druid": 8,
    "Monk": 8,
    "Rogue": 8,
    "Warlock": 8,
    "Sorcerer": 6,
    "Wizard": 6
}

class ProgressionEngine:
    @staticmethod
    def get_level_from_xp(xp):
        """Returns the character level based on current XP."""
        current_level = 1
        for level, threshold in sorted(XP_TABLE.items()):
            if xp >= threshold:
                current_level = level
            else:
                break
        return current_level

    @staticmethod
    def get_proficiency_bonus(level):
        """Returns proficiency bonus for a given level: 1-4: +2, 5-8: +3, etc."""
        return 2 + math.floor((level - 1) / 4)

    @staticmethod
    def calculate_max_hp(player_class, level, constitution_mod):
        """
        Calculates max HP:
        Level 1: Max Die + Con
        Subsequent: (Average Die + 1) + Con per level.
        """
        die_size = HIT_DICE_COLLECTION.get(player_class, 8)
        
        # Level 1 HP
        total_hp = die_size + constitution_mod
        
        # Subsequent levels (using average as per SRD standard)
        if level > 1:
            avg_gain = (die_size // 2) + 1
            total_hp += (avg_gain + constitution_mod) * (level - 1)
            
        return max(total_hp, level) # Minimum 1 HP per level

# Singleton instance
progression_engine = ProgressionEngine()
