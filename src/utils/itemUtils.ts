import type { Item } from '../types/dnd';

/**
 * Parsers [ITEM: Name | Category | Description] from AI text
 * Expected categories: equipamiento, consumible, otro
 */
export function extractItemsFromText(text: string): Item[] {
  const items: Item[] = [];
  const regex = /\[ITEM:\s*([^|]+)\|\s*([^|]+)\|\s*([^\]]+)\]/gi;
  
  let match;
  while ((match = regex.exec(text)) !== null) {
    const [, name, category, description] = match;
    
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
      description: description.trim(),
      rarity: 'común', // Default rarity, DM can specify in description if needed
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
