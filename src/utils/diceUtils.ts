export interface RollResult {
  dice: number;
  modifier: number;
  total: number;
  formula: string;
}

/**
 * Parses a string like "d20 + 2" or "d20 - 1" or just "d20"
 */
export function parseRollFormula(formula: string): { dieType: number; modifier: number } {
  const clean = formula.toLowerCase().replace(/\s+/g, '');
  const match = clean.match(/d(\d+)([+-]\d+)?/);

  if (!match) return { dieType: 20, modifier: 0 };

  const dieType = parseInt(match[1], 10);
  const modifier = match[2] ? parseInt(match[2], 10) : 0;

  return { dieType, modifier };
}

export function rollDice(formula: string): RollResult {
  const { dieType, modifier } = parseRollFormula(formula);
  const dice = Math.floor(Math.random() * dieType) + 1;
  
  return {
    dice,
    modifier,
    total: dice + modifier,
    formula
  };
}

export function extractRollRequest(text: string): string | null {
  const match = text.match(/\[TIRADA:\s*([^\]]+)\]/i);
  return match ? match[1].trim() : null;
}
