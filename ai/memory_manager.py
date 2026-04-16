import json
import os

MEMORY_FILE = "data/memory.json"

class MemoryManager:
    def __init__(self, max_rolling_turns=10):
        self.max_rolling_turns = max_rolling_turns
        self.rolling_context = [] # List of {role, content}
        self.summaries = [] # List of past summaries
        self.load()

    def add_interaction(self, role, content):
        """Adds a turn to the rolling context."""
        self.rolling_context.append({"role": role, "content": content})
        if len(self.rolling_context) > self.max_rolling_turns * 2: # pairs of player/AI
            # This triggers a summarization event in the orchestrator
            pass
        self.save()

    def get_context_for_prompt(self):
        """Returns the current context formatted for the model."""
        return self.rolling_context

    def add_summary(self, summary_text):
        """Adds a new summary and clears the rolling context."""
        self.summaries.append(summary_text)
        self.rolling_context = [] # Reset after summarization
        self.save()

    def get_all_summaries(self):
        """Returns the full narrative recap."""
        return "\n".join(self.summaries)

    def save(self):
        try:
            with open(MEMORY_FILE, 'w', encoding='utf-8') as f:
                json.dump({
                    "rolling_context": self.rolling_context,
                    "summaries": self.summaries
                }, f, indent=4)
        except Exception as e:
            print(f"Error saving memory: {e}")

    def load(self):
        if os.path.exists(MEMORY_FILE):
            try:
                with open(MEMORY_FILE, 'r', encoding='utf-8') as f:
                    data = json.load(f)
                    self.rolling_context = data.get("rolling_context", [])
                    self.summaries = data.get("summaries", [])
            except Exception as e:
                print(f"Error loading memory: {e}")

# Singleton instance
memory_manager = MemoryManager()
