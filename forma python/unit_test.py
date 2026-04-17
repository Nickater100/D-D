import sys
import flet as ft
from ui.dice_roller import DiceRoller

def test():
    try:
        from engine.rules import rules_engine
        result = rules_engine.roll_dice(20)
        print("Rules engine works:", result)
    except Exception as e:
        print("Rules engine err:", e)

    class FakePage:
        def update(self):
            print("Page updated")

    try:
        dr = DiceRoller(FakePage(), 20)
        dr.perform_roll(None)
        print("Roll performed. Result:", dr.result_text.value)
    except Exception as e:
        import traceback
        with open("error.txt", "w") as f:
            traceback.print_exc(file=f)

test()
