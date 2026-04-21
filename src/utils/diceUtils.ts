export interface RollResult {
  dice: number;
  modifier: number;
  total: number;
  formula: string;
  dc?: number;
  isSuccess?: boolean;
  isCritical?: boolean;
  isFumble?: boolean;
}

export interface RollRequest {
  formula: string;
  dc?: number;
}

/**
 * Parses a string like "d20 + 2" or "d20 - 1" or "d20 + 2 | CD: 15"
 */
export function parseRollRequest(input: string): RollRequest {
  const parts = input.split('|');
  const formula = parts[0].trim();
  const dcPart = parts[1]?.trim();
  
  let dc: number | undefined;
  if (dcPart) {
    const dcMatch = dcPart.match(/CD:\s*(\d+)/i);
    if (dcMatch) dc = parseInt(dcMatch[1], 10);
  }

  return { formula, dc };
}

export function parseRollFormula(formula: string): { count: number; dieType: number; modifier: number } {
  const clean = formula.toLowerCase().replace(/\s+/g, '');
  
  // First try to match standard dice notation like "d20", "2d6", "8d6+4"
  const diceMatch = clean.match(/(\d*)d(\d+)([+-]\d+)?/);
  
  if (diceMatch) {
    const count = diceMatch[1] ? parseInt(diceMatch[1], 10) : 1;
    const dieType = parseInt(diceMatch[2], 10);
    const modifier = diceMatch[3] ? parseInt(diceMatch[3], 10) : 0;
    return { count, dieType, modifier };
  }

  // If no "d", try to match just a trailing modifier (e.g., "Percepción+3")
  const modMatch = clean.match(/([+-]\d+)$/);
  const modifier = modMatch ? parseInt(modMatch[1], 10) : 0;
  
  return { count: 1, dieType: 20, modifier };
}

export function rollDice(request: RollRequest): RollResult {
  const { count, dieType, modifier } = parseRollFormula(request.formula);
  
  let diceSum = 0;
  for (let i = 0; i < count; i++) {
    diceSum += Math.floor(Math.random() * dieType) + 1;
  }
  
  const total = diceSum + modifier;
  
  const isCritical = dieType === 20 && count === 1 && diceSum === 20;
  const isFumble = dieType === 20 && count === 1 && diceSum === 1;
  
  let isSuccess: boolean | undefined;
  if (request.dc !== undefined) {
    // D&D 5e: Critical success always succeeds, fumble always fails for attacks
    // But for simpler checks, we just compare total >= dc.
    isSuccess = isCritical ? true : (isFumble ? false : total >= request.dc);
  }

  return {
    dice: diceSum,
    modifier,
    total,
    formula: request.formula,
    dc: request.dc,
    isSuccess,
    isCritical,
    isFumble
  };
}

export function extractRollRequest(text: string): RollRequest | null {
  const match = text.match(/\[TIRADA:\s*([^\]]+)\]/i);
  if (!match) return null;
  
  const request = parseRollRequest(match[1]);
  
  // Only accept formulas that contain actual dice notation (must have the letter 'd')
  // Prevents bare numbers like [TIRADA: 7] from being treated as a d20 roll
  if (!request.formula.toLowerCase().includes('d')) return null;
  
  return request;
}
