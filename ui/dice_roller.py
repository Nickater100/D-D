import flet as ft
from flet import icons, Colors as colors, Animation, AnimationCurve, Column, Container, Text, Icon, ElevatedButton, AlertDialog, TextButton, MainAxisAlignment, FontWeight, CrossAxisAlignment
import ui.styles as styles
from engine.rules import rules_engine
import time

class DiceRoller(Container):
    def __init__(self, page, dice_type=20):
        super().__init__()
        self.page = page
        self.dice_type = dice_type
        
        self.result_text = Text(
            "?",
            size=40,
            weight=FontWeight.BOLD,
            color=styles.GOLD_COLOR
        )
        
        self.animation_placeholder = Icon(
            icons.CASINO, 
            size=60, 
            color=styles.GOLD_COLOR,
            animate_rotation=Animation(500, AnimationCurve.BOUNCE_OUT)
        )
        
        self.bgcolor = styles.SURFACE_COLOR
        self.padding = 30
        self.border_radius = 20
        self.content = Column([
            Text(f"D{dice_type}", size=14, color=styles.SUBTEXT_COLOR),
            self.animation_placeholder,
            self.result_text,
            ElevatedButton(
                "TIRAR DADO",
                bgcolor=styles.ACCENT_COLOR,
                color=colors.WHITE,
                on_click=self.perform_roll
            )
        ], horizontal_alignment=CrossAxisAlignment.CENTER)

    def perform_roll(self, e):
        # Visual animation "ficticia" (giro de icono)
        self.animation_placeholder.rotate = 3.14 * 2 # 360 degrees
        self.result_text.value = "..."
        self.page.update()
        
        time.sleep(0.5) # Simulate rolling time
        
        # Actual engine roll
        result = rules_engine.roll_dice(self.dice_type)
        self.result_text.value = str(result["total"])
        self.animation_placeholder.rotate = 0
        self.page.update()

def show_dice_modal(page, dice_type=20):
    roller = DiceRoller(page, dice_type)
    
    def close_modal(e):
        page.dialog.open = False
        page.update()

    page.dialog = AlertDialog(
        content=roller,
        actions=[
            TextButton("CERRAR", on_click=close_modal)
        ],
        actions_alignment=MainAxisAlignment.END,
        bgcolor=styles.BACKGROUND_COLOR,
    )
    page.dialog.open = True
    page.update()
