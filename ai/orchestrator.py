import google.generativeai as genai
import os
from engine.state import game_state
from ai.memory_manager import memory_manager
from engine.traits import trait_manager

class AIOrchestrator:
    def __init__(self, api_key=None):
        self.api_key = api_key or os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-1.5-pro')
        else:
            self.model = None

    def _construct_system_prompt(self):
        state = game_state.data
        player = state["player"]
        recap = memory_manager.get_all_summaries()
        traits = trait_manager.get_traits_for_character(player["race"], player["class"])
        
        prompt = f"""
Eres un ÁRBITRO y DUNGEON MASTER de D&D 5ta Edición. Tu palabra es ley, pero tu ley es el MOTOR DE REGLAS.

ESTADO DEL JUGADOR:
- Nombre: {player['name']} ({player['race']} {player['class']})
- Nivel: {player['level']} (XP: {player['xp']})
- Vida: {player['hp']}/{player['max_hp']}
- Stats: {player['stats']}
- Bonificador de Competencia: +{player['proficiency_bonus']}
- Slots: {player['current_slots']} (de {player['max_slots']})
- Rasgos Activos: {traits}

RESUMEN DE HISTORIA:
{recap}

REGLAS DE ACTUACIÓN (ESTRICTAS):
1. NO inventes resultados de dados. Si el jugador ataca, pídela tirada: "Tira un d20 de Ataque". 
2. Si el jugador lanza un hechizo, comprueba si tiene espacios (slots) en el JSON. Si no tiene, dile que está agotado.
3. El motor de Python validará los aciertos/fallos. Tu labor es NARRAR el resultado que el motor o el jugador te devuelvan.
4. Mantén el tono de Fantasía Oscura.
5. Usa los rasgos ({traits}) para dar profundidad a la narración (ej: Visión en la oscuridad).

IMPORTANTE: Si el jugador llega a 0 HP, inicia inmediatamente el protocolo de Salvaciones de Muerte.
"""
        return prompt

    def get_response(self, user_input):
        if not self.model:
            return "Error: API Key de Gemini no configurada."

        system_prompt = self._construct_system_prompt()
        chat_context = memory_manager.get_context_for_prompt()
        
        history = []
        for msg in chat_context:
            history.append({"role": "user" if msg["role"] == "player" else "model", "parts": [msg["content"]]})

        try:
            chat = self.model.start_chat(history=history)
            # We send the system prompt as a 'context' in every turn to ensure rule adherence
            response = chat.send_message(f"CONTEXTO REGLAS:\n{system_prompt}\n\nJUGADOR: {user_input}")
            
            memory_manager.add_interaction("player", user_input)
            memory_manager.add_interaction("dm", response.text)
            
            return response.text
        except Exception as e:
            return f"Error en la comunicación con la IA: {str(e)}"

# Singleton
ai_orchestrator = AIOrchestrator()
