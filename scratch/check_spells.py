import re

with open('src/data/srd/spells.ts', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    # Check for unclosed parentheses in strings
    if '(' in line and ')' not in line:
        if "'" in line or '"' in line or '`' in line:
             print(f"Potential error at line {i+1}: {line.strip()}")
