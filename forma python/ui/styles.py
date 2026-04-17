import flet as ft
from flet import Colors as colors, Theme, VisualDensity, ScrollbarTheme, Control

# Color Palette: Premium Dark Fantasy
BACKGROUND_COLOR = "#0F111A"  # Deep dark blue/black
SURFACE_COLOR = "#1A1D29"     # Lighter surface for cards
ACCENT_COLOR = "#E94560"      # Crimson red for actions/highlights
TEXT_COLOR = "#E0E0E0"        # Soft off-white
SUBTEXT_COLOR = "#94A3B8"     # Slate blue for descriptions
GOLD_COLOR = "#C5A059"        # Muted gold for lore/rewards

# Typography (Inspired by old manuscripts but readable)
FONT_FAMILY = "Georgia" # We will load a custom font later if needed

class ThemeColors:
    DARK_GLASS = colors.with_opacity(0.1, colors.BLACK)
    CRIMSON_GLOW = colors.with_opacity(0.2, "#E94560")

def apply_glass_style(control: Control):
    """Applies a glassmorphism effect to a control."""
    control.bgcolor = colors.with_opacity(0.15, colors.WHITE10)
    control.border_radius = 15
    control.padding = 20
    # Blur effect is handle by BackdropFilter in Flet
    return control

def get_page_theme():
    return Theme(
        color_scheme_seed=ACCENT_COLOR,
        visual_density=VisualDensity.COMFORTABLE,
        scrollbar_theme=ScrollbarTheme(
            track_color=colors.TRANSPARENT,
            thumb_color=colors.with_opacity(0.2, TEXT_COLOR),
            thickness=4,
            radius=10,
        )
    )
