import { isValidSriLankanPhone } from '../phone';
import { PasswordStrengthResult, PasswordStrengthLevel, PasswordRuleResult } from './types';

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  // RFC 5322 standard compliant basic check
  const re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return re.test(email.trim());
}

export function isValidIdentifier(identifier: string): boolean {
  const val = identifier.trim();
  if (!val) return false;
  return isValidEmail(val) || isValidSriLankanPhone(val);
}

export function validateFullName(name: string): { isValid: boolean; error?: string } {
  const val = name.trim();
  if (!val) {
    return { isValid: false, error: 'Full name is required.' };
  }
  if (val.length < 2) {
    return { isValid: false, error: 'Name must be at least 2 characters.' };
  }
  if (val.length > 60) {
    return { isValid: false, error: 'Name cannot exceed 60 characters.' };
  }
  // Supports Latin, Sinhala (\u0D80-\u0DFF), Tamil (\u0B80-\u0BFF), spaces, hyphens, apostrophes, dots
  const validChars = /^[\p{L}\s\-\.'’]+$/u;
  if (!validChars.test(val)) {
    return { isValid: false, error: 'Name contains invalid characters.' };
  }
  return { isValid: true };
}

export function evaluatePasswordStrength(password: string): PasswordStrengthResult {
  const rules: PasswordRuleResult[] = [
    { id: 'min_length', label: 'At least 8 characters', met: password.length >= 8 },
    { id: 'case_mix', label: 'Upper and lower case letters', met: /[a-z]/.test(password) && /[A-Z]/.test(password) },
    { id: 'has_number', label: 'At least one number', met: /\d/.test(password) },
    { id: 'has_symbol', label: 'At least one symbol (e.g. !@#$%)', met: /[^A-Za-z0-9]/.test(password) },
  ];

  const metCount = rules.filter(r => r.met).length;

  let score = 0;
  let level: PasswordStrengthLevel = 'weak';
  let label = 'Weak';

  if (password.length === 0) {
    score = 0;
    level = 'weak';
    label = 'Too short';
  } else if (metCount <= 1 || password.length < 8) {
    score = 1;
    level = 'weak';
    label = 'Weak';
  } else if (metCount === 2) {
    score = 2;
    level = 'fair';
    label = 'Fair';
  } else if (metCount === 3) {
    score = 3;
    level = 'good';
    label = 'Good';
  } else {
    score = 4;
    level = 'strong';
    label = 'Strong';
  }

  return {
    score,
    level,
    label,
    rules,
  };
}
