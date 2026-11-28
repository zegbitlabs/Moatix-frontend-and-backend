/**
 * Sri Lankan Phone Normalisation Utility (Read-only reusable module)
 */
export interface NormalizedPhone {
  raw: string;
  normalized: string;
  formatted: string;
  isValid: boolean;
  operator?: string;
}

const LK_MOBILE_PREFIXES: Record<string, string> = {
  "70": "Mobitel",
  "71": "Mobitel",
  "72": "Hutch",
  "74": "Dialog",
  "75": "Airtel",
  "76": "Dialog",
  "77": "Dialog",
  "78": "Hutch",
};

export function normalizePhone(input: string): NormalizedPhone {
  const cleaned = input.replace(/[\s\-\(\)\.]/g, "");
  let digits = cleaned;

  if (digits.startsWith("+94")) {
    digits = digits.slice(3);
  } else if (digits.startsWith("0094")) {
    digits = digits.slice(4);
  } else if (digits.startsWith("94") && digits.length === 11) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  const isValid = /^[1-9]\d{8}$/.test(digits);
  const prefix2 = digits.slice(0, 2);
  const operator = LK_MOBILE_PREFIXES[prefix2] || (isValid ? "Fixed/Other" : undefined);

  const formatted = isValid
    ? `+94 ${digits.slice(0, 2)} ${digits.slice(2, 5)} ${digits.slice(5)}`
    : input.trim();

  return {
    raw: input,
    normalized: isValid ? `+94${digits}` : digits,
    formatted,
    isValid,
    operator,
  };
}

export function isValidSriLankanPhone(input: string): boolean {
  return normalizePhone(input).isValid;
}
