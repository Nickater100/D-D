import flet as ft
from flet import icons, Colors as colors, View, Container, Column, Text, Divider, ElevatedButton, AppBar, ListView, ListTile, Icon, NavigationBar, NavigationBarDestination, FloatingActionButton, IconButton
import ui.styles as styles
from ui.chat import get_chat_page
from ui.sheets import get_sheet_page
from ui.dice_roller import show_dice_modal

def main(page: ft.Page):
    page.title = "D&D AI Master"
    page.theme_mode = ft.ThemeMode.DARK
    page.theme = styles.get_page_theme()
    page.bgcolor = styles.BACKGROUND_COLOR
    
    # Responsiveness for mobile (APK)
    page.window_width = 400
    page.window_height = 800

    def route_change(e):
        print(f"DEBUG: route_change triggered! Route is: {page.route}")
        page.views.clear()
        
        # HOME / SPLASH
        if page.route == "/":
            print("DEBUG: Appending splash view")
            page.views.append(
                View(
                    "/",
                    [
                        Container(
                            content=Column([
                                Text("D&D", size=80, weight="bold", color=styles.GOLD_COLOR),
                                Text("AI MASTER", size=16, letter_spacing=5, color=styles.SUBTEXT_COLOR),
                                Divider(height=50, color=colors.TRANSPARENT),
                                ElevatedButton(
                                    "INICIAR AVENTURA", 
                                    bgcolor=styles.ACCENT_COLOR, 
                                    color="white",
                                    width=240, 
                                    height=50,
                                    on_click=lambda _: page.go("/campaign")
                                )
                            ], alignment="center", horizontal_alignment="center", expand=True),
                            expand=True,
                            bgcolor=styles.BACKGROUND_COLOR
                        )
                    ],
                    padding=0
                )
            )

        # CAMPAIGN SELECTION
        elif page.route == "/campaign":
            page.views.append(
                View(
                    "/campaign",
                    [
                        AppBar(title=Text("Historias Disponibles"), bgcolor=styles.SURFACE_COLOR),
                        ListView([
                            ListTile(
                                title=Text("La Mina Perdida de Phandelver", color="white"),
                                subtitle=Text("Módulo Oficial SRD", color=styles.SUBTEXT_COLOR),
                                leading=Icon(icons.MAP, color=styles.GOLD_COLOR),
                                on_click=lambda _: page.go("/game")
                            ),
                            ListTile(
                                title=Text("Campaña Generativa", color="white"),
                                subtitle=Text("IA crea la historia por ti", color=styles.SUBTEXT_COLOR),
                                leading=Icon(icons.AUTO_AWESOME, color=styles.ACCENT_COLOR),
                                on_click=lambda _: page.go("/game")
                            )
                        ], expand=True, padding=20)
                    ],
                    bgcolor=styles.BACKGROUND_COLOR
                )
            )

        # MAIN GAME (Chat & Sheet)
        elif page.route == "/game" or page.route == "/sheet":
            is_chat = page.route == "/game"
            
            nav_bar = NavigationBar(
                destinations=[
                    NavigationBarDestination(icon=icons.CHAT_BUBBLE, label="Relato"),
                    NavigationBarDestination(icon=icons.PERSON, label="Ficha"),
                ],
                selected_index=0 if is_chat else 1,
                on_change=lambda e: page.go("/game" if e.control.selected_index == 0 else "/sheet"),
                bgcolor=styles.SURFACE_COLOR,
            )

            content = get_chat_page(page) if is_chat else get_sheet_page(page)
            
            # Special FAB for rolling dice in chat
            fab = FloatingActionButton(
                icon=icons.CASINO,
                bgcolor=styles.GOLD_COLOR,
                on_click=lambda _: show_dice_modal(page)
            ) if is_chat else None

            page.views.append(
                View(
                    page.route,
                    [
                        AppBar(
                            title=Text("Dungeon Master AI", color=styles.TEXT_COLOR),
                            bgcolor=styles.SURFACE_COLOR,
                            actions=[
                                IconButton(icons.SETTINGS, icon_color=styles.SUBTEXT_COLOR)
                            ]
                        ),
                        content,
                    ],
                    navigation_bar=nav_bar,
                    floating_action_button=fab,
                    bgcolor=styles.BACKGROUND_COLOR
                )
            )
            
        page.update()

    page.on_route_change = route_change
    page.go(page.route if page.route else "/")

if __name__ == "__main__":
    ft.run(main)
