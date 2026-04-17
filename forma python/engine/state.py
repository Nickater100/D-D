import json
import os

SAVE_FILE = "data/savegame.json"

class GameState:
    def __init__(self):
        # Default state structure
        self.data = {
            "player": {
                "name": "Aventurero",
                "race": "Desconocido",
                "class": "Fighter", # Default
                "level": 1,
                "hp": 10,
                "max_hp": 10,
                "stats": {"str": 10, "dex": 10, "con": 10, "int": 10, "wis": 10, "cha": 10},
                "inventory": [],
                "spells": [],
                "xp": 0,
                "current_slots": [0] * 9,
                "max_slots": [0] * 9,
                "proficiency_bonus": 2
            },
            "world": {
                "current_location": "Desconocido",
                "known_npcs": {}, 
                "active_quests": [],
                "narrative_summary": "Inicio de la aventura.",
                "permadeath_triggered": False
            },
            "meta": {
                "turn_count": 0,
                "session_id": None
            }
        }
        self.load()

    def save(self):
        """Saves current state to local JSON."""
        try:
            os.makedirs(os.path.dirname(SAVE_FILE), exist_ok=True)
            with open(SAVE_FILE, 'w', encoding='utf-8') as f:
                json.dump(self.data, f, indent=4)
        except Exception as e:
            print(f"Error saving game state: {e}")

    def load(self):
        """Loads state from local JSON if exists."""
        if os.path.exists(SAVE_FILE):
            try:
                with open(SAVE_FILE, 'r', encoding='utf-8') as f:
                    # Update local state carefully
                    saved_data = json.load(f)
                    self.data["player"].update(saved_data.get("player", {}))
                    self.data["world"].update(saved_data.get("world", {}))
                    self.data["meta"].update(saved_data.get("meta", {}))
            except Exception as e:
                print(f"Error loading game state: {e}")

    def update_player(self, **kwargs):
        """Updates player attributes."""
        for key, value in kwargs.items():
            if key in self.data["player"]:
                self.data["player"][key] = value
        self.save()

    def add_xp(self, amount):
        from engine.progression import progression_engine
        from engine.magic import magic_engine
        
        self.data["player"]["xp"] += amount
        new_level = progression_engine.get_level_from_xp(self.data["player"]["xp"])
        
        if new_level > self.data["player"]["level"]:
            # Level Up!
            self.data["player"]["level"] = new_level
            con_mod = (self.data["player"]["stats"]["con"] - 10) // 2
            self.data["player"]["max_hp"] = progression_engine.calculate_max_hp(
                self.data["player"]["class"], new_level, con_mod
            )
            self.data["player"]["hp"] = self.data["player"]["max_hp"] # Heal on level up
            self.data["player"]["proficiency_bonus"] = progression_engine.get_proficiency_bonus(new_level)
            self.data["player"]["max_slots"] = magic_engine.get_max_slots(
                self.data["player"]["class"], new_level
            )
            self.data["player"]["current_slots"] = list(self.data["player"]["max_slots"])
            return True # Signal level up
        return False

    def add_npc(self, npc_id, name, relation="Neutral", status="Alive"):
        """Registers a known NPC."""
        self.data["world"]["known_npcs"][npc_id] = {
            "name": name,
            "relation": relation,
            "status": status
        }
        self.save()

    def set_location(self, location_name):
        self.data["world"]["current_location"] = location_name
        self.save()

    def reset_game(self):
        """Total reset for permadeath."""
        if os.path.exists(SAVE_FILE):
            os.remove(SAVE_FILE)
        self.__init__()

# Singleton instance
game_state = GameState()
