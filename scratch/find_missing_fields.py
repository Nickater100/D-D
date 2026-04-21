import re

with open('src/data/srd/spells.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# Naive parser for SpellDefinition objects in the file
objects = re.findall(r'(\{\s*id:\s*\'[^\']+\'(?:[^\}]|\}[^,])*?\},)', text, re.DOTALL)

for obj in objects:
    spell_id_match = re.search(r'id:\s*\'([^\']+)\'', obj)
    spell_id = spell_id_match.group(1) if spell_id_match else "unknown"
    
    if 'type:' not in obj:
        print(f"Missing 'type' in spell: {spell_id}")
    if 'classes:' not in obj:
        print(f"Missing 'classes' in spell: {spell_id}")
