import type { Item } from '../types/dnd';

/**
 * Parsers [ITEM: Name | Category | Description] from AI text
 * Expected categories: equipamiento, consumible, otro
 */
export function extractItemsFromText(text: string): Item[] {
  const items: Item[] = [];
  // Format: [ITEM: Name | Category | Subtype | Properties | Description]
  const regex = /\[ITEM:\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^\]]+)\]/gi;
  
  // Fallback for old format if needed: [ITEM: Name | Category | Description]
  const legacyRegex = /\[ITEM:\s*([^|]+)\|\s*([^|]+)\|\s*([^\]]+)\]/gi;

  let match;
  while ((match = regex.exec(text)) !== null) {
    const [, name, category, subtype, properties, description] = match;
    
    // Normalize category
    let finalCategory: 'equipamiento' | 'consumible' | 'otro' = 'otro';
    const catLower = category.trim().toLowerCase();
    
    if (catLower.includes('equip') || catLower.includes('arma') || catLower.includes('armadura')) {
      finalCategory = 'equipamiento';
    } else if (catLower.includes('consum') || catLower.includes('pocion') || catLower.includes('pergamino')) {
      finalCategory = 'consumible';
    }

    items.push({
      id: crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11),
      name: name.trim(),
      category: finalCategory,
      subtype: subtype.trim().toLowerCase() as any,
      properties: properties.split(',').map(p => p.trim().toLowerCase()).filter(p => p !== 'ninguna'),
      description: description.trim(),
      rarity: 'común',
    });
  }
  
  return items;
}

/**
 * Removes tags from display text
 */
export function cleanItemTags(text: string): string {
  return text.replace(/\[ITEM:\s*[^\]]+\]/gi, '').trim();
}
