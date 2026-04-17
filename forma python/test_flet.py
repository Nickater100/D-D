import flet as ft
from ui.dice_roller import show_dice_modal

def main(page: ft.Page):
    try:
        show_dice_modal(page)
        # Simulate click
        page.dialog.content.perform_roll(None)
    except Exception as e:
        import traceback
        traceback.print_exc()
        with open("error.txt", "w") as f:
            f.write(traceback.format_exc())
    finally:
        pass # we'll just kill it

ft.app(target=main)
