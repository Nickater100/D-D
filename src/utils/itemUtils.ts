import type { Item } from '../types/dnd';

/**
 * Parsers [ITEM: Name | Category | Description] from AI text
 * Expected categories: equipamiento, consumible, otro
 */
export function extractItemsFromText(text: string): Item[] {
  const items: Item[] = [];
  // Format: [ITEM: Name | Category | Subtype | Properties | Description]
  const regex = /\[ITEM:\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^|]+)\|\s*([^\]]+)\]/gi;
  
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
  return text
    .replace(/\[ITEM:\s*[^\]]+\]/gi, '')
    .replace(/\[XP:\s*[^\]]+\]/gi, '')
    .replace(/\[RASGO:\s*[^\]]+\]/gi, '')
    .replace(/\[COMBATE:\s*[^\]]+\]/gi, '')
    .trim();
}

/**
 * Extracts XP from text [XP: X]
 */
export function extractXpFromText(text: string): number {
  const regex = /\[XP:\s*(\d+)\]/gi;
  let totalXp = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    totalXp += parseInt(match[1], 10);
  }
  return totalXp;
}

/**
 * Extracts Features from text [RASGO: Name | Description]
 */
export function extractFeaturesFromText(text: string): any[] {
  const features: any[] = [];
  const regex = /\[RASGO:\s*([^|]+)\|\s*([^\]]+)\]/gi;
  let match;
  while ((match = regex.exec(text)) !== null) {
    features.push({
      name: match[1].trim(),
      description: match[2].trim(),
      source: 'otro'
    });
  }
  return features;
}
