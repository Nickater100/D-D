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

export function parseRollFormula(formula: string): { dieType: number; modifier: number } {
  const clean = formula.toLowerCase().replace(/\s+/g, '');
  const match = clean.match(/d(\d+)([+-]\d+)?/);

  if (!match) return { dieType: 20, modifier: 0 };

  const dieType = parseInt(match[1], 10);
  const modifier = match[2] ? parseInt(match[2], 10) : 0;

  return { dieType, modifier };
}

export function rollDice(request: RollRequest): RollResult {
  const { dieType, modifier } = parseRollFormula(request.formula);
  const dice = Math.floor(Math.random() * dieType) + 1;
  const total = dice + modifier;
  
  const isCritical = dieType === 20 && dice === 20;
  const isFumble = dieType === 20 && dice === 1;
  
  let isSuccess: boolean | undefined;
  if (request.dc !== undefined) {
    // D&D 5e: Critical success always succeeds, fumble always fails for attacks
    // But for simpler checks, we just compare total >= dc.
    isSuccess = isCritical ? true : (isFumble ? false : total >= request.dc);
  }

  return {
    dice,
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
  return parseRollRequest(match[1]);
}
