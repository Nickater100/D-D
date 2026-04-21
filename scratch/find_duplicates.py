import sys

with open('src/data/srd/spells.ts', 'r', encoding='utf-8') as f:
    text = f.read()

# I'll try to find obvious structural issues like double ids or missing closing braces
lines = text.split('\n')
in_object = False
properties = set()
for i, line in enumerate(lines):
    if '{' in line and 'id:' in line:
        in_object = True
        properties = set()
    if in_object:
        match = bytearray(line, 'utf-8').find(b':')
        if match != -1:
            prop = line[:match].strip()
            if prop in ['id', 'name', 'level', 'school', 'type', 'classes', 'description']:
                if prop in properties:
                    print(f"Duplicate property '{prop}' at line {i+1}")
                properties.add(prop)
    if '},' in line:
        in_object = False

# Also check for missing required fields
# SpellDefinition: id, name, level, school, type, castingTime, range, components, duration, concentration, classes, description
required = ['id', 'name', 'level', 'school', 'type', 'castingTime', 'range', 'components', 'duration', 'concentration', 'classes', 'description']

objects = text.split('{')
for obj in objects[1:]:
    # This is a bit naive but should work for this structure
    for req in required:
        if f"{req}:" not in obj and f" {req}:" not in obj:
            # Try to get the id if possible
            import re
            id_match = re.search(r"id:\s*'([^']+)'", obj)
            spell_id = id_match.group(1) if id_match else "unknown"
            # Some fields might be missing in valid ways if I didn't see the whole obj, 
            # but I'll check my view_file output too.
            # Actually, I'll just rely on tsc and my own inspection.
