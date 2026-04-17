import sys
import time
import flet as ft
from ui.dice_roller import show_dice_modal

def main(page: ft.Page):
    print("UI SHOW_DICE_MODAL")
    show_dice_modal(page)
    
    # Give it a moment to render
    time.sleep(0.5)
    
    print("CALLING PERFORM ROLL")
    try:
        page.dialog.content.perform_roll(None)
        print("Roll result:", page.dialog.content.result_text.value)
    except Exception as e:
        import traceback
        traceback.print_exc(file=sys.stdout)
    
    print("DONE PERFORM ROLL")
    # Tell Flet to close session and exit
    page.window_prevent_close = False
    page.window_close()

print("STARTING FLET")
# Run on an ephemeral port to avoid GUI popups if possible, though window will still flash.
# We can't avoid GUI popup without view=ft.AppView.NONE which is available in some versions.
try:
    ft.app(target=main)
except AssertionError:
    pass # Catch AssertionError that Flet may throw when closing
print("EXITING FLET")
