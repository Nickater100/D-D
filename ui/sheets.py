import flet as ft
from flet import Colors as colors, Row, Column, Text, Container, CircleAvatar, ProgressBar, Divider, ResponsiveRow, ListTile, TextAlign, FontWeight, CrossAxisAlignment
import ui.styles as styles
from engine.state import game_state
from engine.traits import trait_manager

class StatCard(Container):
    def __init__(self, label, value):
        super().__init__()
        self.bgcolor = colors.with_opacity(0.1, colors.WHITE)
        self.border_radius = 10
        self.padding = 10
        self.width = 100
        mod = (value - 10) // 2
        self.content = Column([
            Text(label.upper(), size=10, color=styles.SUBTEXT_COLOR, text_align=TextAlign.CENTER),
            Text(str(value), size=24, weight=FontWeight.BOLD, color=styles.GOLD_COLOR, text_align=TextAlign.CENTER),
            Text(f"{'+' if mod >= 0 else ''}{mod}", size=12, color=styles.TEXT_COLOR, text_align=TextAlign.CENTER)
        ], horizontal_alignment=CrossAxisAlignment.CENTER)

class CharacterSheet(Container):
    def __init__(self, page):
        super().__init__()
        self.page = page
        self.state = game_state.data["player"]
        
        # XP Progress
        xp_next_level = 300 # Simplified
        xp_percent = self.state["xp"] / 355000 # Overall progress
        
        header = Row([
            CircleAvatar(content=Text(self.state["name"][0]), bgcolor=styles.ACCENT_COLOR, radius=30),
            Column([
                Row([
                    Text(self.state["name"], size=24, weight=FontWeight.BOLD, color=styles.TEXT_COLOR),
                    Container(
                        content=Text(f"BP +{self.state['proficiency_bonus']}", size=12, weight="bold"),
                        bgcolor=styles.GOLD_COLOR, padding=5, border_radius=5
                    )
                ]),
                Text(f"{self.state['race']} {self.state['class']} - Nivel {self.state['level']}", color=styles.SUBTEXT_COLOR),
            ])
        ], spacing=20)
        
        # Health & XP
        bars = Column([
            Text("VIDA", size=10, color=styles.SUBTEXT_COLOR, weight="bold"),
            ProgressBar(value=self.state["hp"]/self.state["max_hp"], color=styles.ACCENT_COLOR, height=8),
            Text(f"{self.state['hp']} / {self.state['max_hp']} HP", size=12, color=styles.TEXT_COLOR),
            Divider(height=10, color=colors.TRANSPARENT),
            Text("EXPERIENCIA (XP)", size=10, color=styles.SUBTEXT_COLOR, weight="bold"),
            ProgressBar(value=xp_percent, color=styles.GOLD_COLOR, height=8),
            Text(f"{self.state['xp']} XP", size=12, color=styles.TEXT_COLOR),
        ])
        
        # Spell Slots
        slots_row = Row([
            Column([
                Text(f"N{i+1}", size=10, color=styles.SUBTEXT_COLOR),
                Text(f"{self.state['current_slots'][i]}/{self.state['max_slots'][i]}", size=14, color=styles.TEXT_COLOR)
            ], horizontal_alignment="center") for i in range(5) # Show first 5 levels
        ], spacing=15)
        
        traits = trait_manager.get_traits_for_character(self.state["race"], self.state["class"])
        traits_list = Column([
            ListTile(
                title=Text(f, color=styles.GOLD_COLOR, size=14),
                subtitle=Text(t["description"], color=styles.SUBTEXT_COLOR, size=12)
            ) for t in traits for f in t["features"]
        ])

        self.content = Column([
            header,
            Divider(height=30, color=colors.WHITE10),
            bars,
            Divider(height=30, color=colors.TRANSPARENT),
            Text("ATRIBUTOS", size=12, weight="bold", color=styles.GOLD_COLOR),
            ResponsiveRow([
                ft.Column([StatCard("STR", self.state["stats"]["str"])], col={"xs": 4}),
                ft.Column([StatCard("DEX", self.state["stats"]["dex"])], col={"xs": 4}),
                ft.Column([StatCard("CON", self.state["stats"]["con"])], col={"xs": 4}),
            ]),
            Divider(height=30, color=colors.TRANSPARENT),
            Text("ESPACIOS DE CONJURO", size=12, weight="bold", color=styles.GOLD_COLOR),
            slots_row,
            Divider(height=30, color=colors.TRANSPARENT),
            Text("RASGOS Y HABILIDADES", size=12, weight="bold", color=styles.GOLD_COLOR),
            traits_list
        ], scroll=ft.ScrollMode.AUTO, expand=True, padding=20)

def get_sheet_page(page):
    return CharacterSheet(page)

def get_sheet_page(page):
    return CharacterSheet(page)
