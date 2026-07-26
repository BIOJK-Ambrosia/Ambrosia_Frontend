import { describe, expect, it } from 'vitest';
import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats a number as USD currency by default', () => {
    expect(formatCurrency(19.9)).toBe('$19.90');
  });

  it('formats using the provided currency code', () => {
    expect(formatCurrency(19.9, 'EUR')).toBe('€19.90');
  });
});
