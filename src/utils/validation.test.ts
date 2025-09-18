import { describe, it, expect } from 'vitest';
import { validateResult, getResultValidationError } from './validation';

describe('validateResult', () => {
  // Test days only format
  it('should accept days only format', () => {
    expect(validateResult('98d')).toBe(true);
    expect(validateResult('1d')).toBe(true);
    expect(validateResult('365d')).toBe(true);
  });

  // Test time periods format
  it('should accept time periods format', () => {
    expect(validateResult('9d 20h 21m')).toBe(true);
    expect(validateResult('9d20h21m')).toBe(true); // without spaces
    expect(validateResult('1d 2h')).toBe(true);
    expect(validateResult('30m')).toBe(true);
    expect(validateResult('5h 30m')).toBe(true);
    expect(validateResult('1d 2h 3m 4s')).toBe(true);
  });

  // Test time format
  it('should accept time format', () => {
    expect(validateResult('10:30:12.123')).toBe(true);
    expect(validateResult('45:30')).toBe(true);
    expect(validateResult('1:23:45')).toBe(true);
    expect(validateResult('0:59')).toBe(true);
    expect(validateResult('12:34:56.789')).toBe(true);
  });

  // Test numbers only
  it('should accept numbers only', () => {
    expect(validateResult('501321')).toBe(true);
    expect(validateResult('0')).toBe(true);
    expect(validateResult('999999')).toBe(true);
  });

  // Test invalid formats
  it('should reject invalid formats', () => {
    expect(validateResult('')).toBe(false);
    expect(validateResult('   ')).toBe(false);
    expect(validateResult('invalid')).toBe(false);
    expect(validateResult('12:60')).toBe(false); // invalid minutes
    expect(validateResult('12:30:60')).toBe(false); // invalid seconds
    expect(validateResult('12:30:45.1234')).toBe(false); // too many decimal places
    expect(validateResult('abc123')).toBe(false);
    expect(validateResult('12.5')).toBe(false);
    expect(validateResult('12d 30x')).toBe(false); // invalid time unit
  });

  // Test edge cases
  it('should handle edge cases', () => {
    expect(validateResult(null as any)).toBe(false);
    expect(validateResult(undefined as any)).toBe(false);
    expect(validateResult(123 as any)).toBe(false);
    expect(validateResult(' 98d ')).toBe(true); // trimmed
  });
});

describe('getResultValidationError', () => {
  it('should return a helpful error message', () => {
    const error = getResultValidationError();
    expect(error).toContain('98d');
    expect(error).toContain('9d 20h 21m');
    expect(error).toContain('10:30:12.123');
    expect(error).toContain('501321');
  });
});