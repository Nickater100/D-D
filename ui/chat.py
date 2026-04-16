import flet as ft
from flet import Icons as icons, alignment, margin, CrossAxisAlignment, ListView, TextField, Row, Column, Container, IconButton, ElevatedButton, Text
import ui.styles as styles
from ai.orchestrator import ai_orchestrator
from ui.dice_roller import show_dice_modal

class ChatMessage(Column):
    def __init__(self, role, text):
        super().__init__()
        self.role = role
        self.text = text
        is_dm = role == "dm"
        self.controls = [
            Container(
                content=Text(text, color=styles.TEXT_COLOR if is_dm else styles.BACKGROUND_COLOR, size=15),
                bgcolor=styles.SURFACE_COLOR if is_dm else styles.GOLD_COLOR,
                padding=15,
                border_radius=10,
                alignment=alignment.center_left if is_dm else alignment.center_right,
                margin=margin.only(right=40 if is_dm else 0, left=0 if is_dm else 40),
            )
        ]
        self.horizontal_alignment = CrossAxisAlignment.START if is_dm else CrossAxisAlignment.END

class ChatView(Container):
    def __init__(self, page):
        super().__init__()
        self.page = page
        self.chat_list = ListView(expand=True, spacing=15, padding=20, auto_scroll=True)
        self.input_field = TextField(
            hint_text="Describe tu acción...",
            bgcolor=styles.SURFACE_COLOR,
            expand=True,
            on_submit=self.send_message,
            border_radius=10
        )

        # Quick Actions for the Player
        self.actions = Row([
            ElevatedButton("Atacar", on_click=lambda _: self.quick_action("Ataco al enemigo más cercano")),
            ElevatedButton("Dados", icon=icons.CASINO, on_click=lambda _: show_dice_modal(self.page)),
            ElevatedButton("Descanso", on_click=lambda _: self.quick_action("Intento tomar un descanso corto")),
        ], scroll=ft.ScrollMode.AUTO)

        self.content = Column([
            Container(content=self.chat_list, expand=True),
            Container(
                content=Column([
                    self.actions,
                    Row([
                        self.input_field,
                        IconButton(icon=icons.SEND_ROUNDED, icon_color=styles.ACCENT_COLOR, on_click=self.send_message)
                    ])
                ]),
                padding=10,
                bgcolor=styles.BACKGROUND_COLOR
            )
        ], expand=True)

    def quick_action(self, text):
        self.input_field.value = text
        self.send_message(None)

    def send_message(self, e):
        user_text = self.input_field.value
        if not user_text: return
        self.input_field.value = ""
        self.chat_list.controls.append(ChatMessage("player", user_text))
        self.page.update()
        
        # IA narrating based on the referee state
        response = ai_orchestrator.get_response(user_text)
        self.chat_list.controls.append(ChatMessage("dm", response))
        self.page.update()

def get_chat_page(page):
    return ChatView(page)
