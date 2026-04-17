from engine.rules import rules_engine
from engine.state import game_state

class CombatEngine:
    @staticmethod
    def resolve_attack(attacker_bonus, target_ac, advantage=False, disadvantage=False):
        """Resolves an attack roll vs Armor Class."""
        if advantage:
            roll_data = rules_engine.roll_with_advantage(20, attacker_bonus)
        elif disadvantage:
            roll_data = rules_engine.roll_with_disadvantage(20, attacker_bonus)
        else:
            roll_data = rules_engine.roll_dice(20, 1, attacker_bonus)
            
        is_hit = roll_data["total"] >= target_ac
        is_crit = any(r == 20 for r in roll_data["rolls"])
        is_fumble = any(r == 1 for r in roll_data["rolls"])
        
        return {
            "hit": is_hit,
            "critical": is_crit,
            "fumble": is_fumble,
            "roll": roll_data["total"],
            "rolls": roll_data["rolls"]
        }

    @staticmethod
    def parse_and_roll_damage(formula):
        """
        Parses a formula like '2d6+3' and returns the roll.
        Simple parser for standard notation.
        """
        try:
            # Basic splits for '1d8+2'
            if "+" in formula:
                dice_part, mod = formula.split("+")
                modifier = int(mod)
            elif "-" in formula:
                dice_part, mod = formula.split("-")
                modifier = -int(mod)
            else:
                dice_part = formula
                modifier = 0
                
            count, sides = map(int, dice_part.split("d"))
            return rules_engine.roll_dice(sides, count, modifier)
        except Exception as e:
            print(f"Error parsing damage formula {formula}: {e}")
            return {"total": 0, "rolls": [], "formula": formula}

    @staticmethod
    def handle_death_save():
        """Rolls a death saving throw for the player."""
        roll = rules_engine.roll_dice(20, 1, 0)["total"]
        if roll >= 20: return "crit_success" # 2 successes
        if roll >= 10: return "success"
        if roll == 1: return "crit_fail" # 2 failures
        return "fail"

# Singleton instance
combat_engine = CombatEngine()
