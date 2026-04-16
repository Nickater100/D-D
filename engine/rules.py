import random

class RulesEngine:
    @staticmethod
    def roll_dice(sides, count=1, modifier=0):
        """Rolls X dice with Y sides and adds a modifier."""
        rolls = [random.randint(1, sides) for _ in range(count)]
        total = sum(rolls) + modifier
        return {
            "rolls": rolls,
            "total": total,
            "modifier": modifier,
            "formula": f"{count}d{sides}+{modifier}" if modifier >= 0 else f"{count}d{sides}{modifier}"
        }

    @staticmethod
    def roll_with_advantage(sides=20, modifier=0):
        """Rolls two d20 and takes the higher."""
        roll1 = random.randint(1, sides)
        roll2 = random.randint(1, sides)
        total = max(roll1, roll2) + modifier
        return {
            "rolls": [roll1, roll2],
            "total": total,
            "modifier": modifier,
            "type": "advantage"
        }

    @staticmethod
    def roll_with_disadvantage(sides=20, modifier=0):
        """Rolls two d20 and takes the lower."""
        roll1 = random.randint(1, sides)
        roll2 = random.randint(1, sides)
        total = min(roll1, roll2) + modifier
        return {
            "rolls": [roll1, roll2],
            "total": total,
            "modifier": modifier,
            "type": "disadvantage"
        }

    @staticmethod
    def check_success(roll_total, dc):
        """Checks if a roll total meets or exceeds a Difficulty Class."""
        return roll_total >= dc

    @staticmethod
    def calculate_modifier(ability_score):
        """Standard D&D modifier calculation: (Score - 10) // 2."""
        return (ability_score - 10) // 2

# Singleton instance
rules_engine = RulesEngine()
