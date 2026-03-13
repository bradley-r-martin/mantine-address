import { describe, it, expect } from 'vitest';
import {
  AU_STREET_TYPES,
  AU_STREET_SUFFIXES,
  AU_STATE_CODES,
  AU_STATE_NAMES_TO_CODES,
  AU_POSTCODE_REGEX,
  validateAustralianPostcode,
  isAustralianAddress,
  formatAustralianState,
  validateAustralianState,
  validateAustralianAddress,
} from './australian-address';
import type { Address } from '../types';

describe('AU_STREET_TYPES', () => {
  it('maps common street types to abbreviations', () => {
    expect(AU_STREET_TYPES['Street']).toBe('St');
    expect(AU_STREET_TYPES['Avenue']).toBe('Ave');
    expect(AU_STREET_TYPES['Road']).toBe('Rd');
  });
});

describe('AU_STREET_SUFFIXES', () => {
  it('includes cardinal and ordinal directions', () => {
    expect(AU_STREET_SUFFIXES).toContain('N');
    expect(AU_STREET_SUFFIXES).toContain('SW');
  });
});

describe('AU_STATE_CODES', () => {
  it('includes all Australian states and territories', () => {
    expect(AU_STATE_CODES).toContain('NSW');
    expect(AU_STATE_CODES).toContain('VIC');
    expect(AU_STATE_CODES).toContain('ACT');
  });
});

describe('AU_STATE_NAMES_TO_CODES', () => {
  it('maps full names to codes', () => {
    expect(AU_STATE_NAMES_TO_CODES['New South Wales']).toBe('NSW');
    expect(AU_STATE_NAMES_TO_CODES['Victoria']).toBe('VIC');
  });
});

describe('AU_POSTCODE_REGEX', () => {
  it('matches 4-digit postcodes', () => {
    expect(AU_POSTCODE_REGEX.test('2000')).toBe(true);
    expect(AU_POSTCODE_REGEX.test('0810')).toBe(true);
  });
  it('rejects non-4-digit', () => {
    expect(AU_POSTCODE_REGEX.test('200')).toBe(false);
    expect(AU_POSTCODE_REGEX.test('20000')).toBe(false);
    expect(AU_POSTCODE_REGEX.test('ABCD')).toBe(false);
  });
});

describe('validateAustralianPostcode', () => {
  it('returns true for valid 4-digit postcode on Address', () => {
    expect(validateAustralianPostcode({ postcode: '2000' })).toBe(true);
    expect(validateAustralianPostcode({ postcode: ' 3000 ' })).toBe(true);
  });
  it('returns false for missing or invalid postcode', () => {
    expect(validateAustralianPostcode({})).toBe(false);
    expect(validateAustralianPostcode({ postcode: '' })).toBe(false);
    expect(validateAustralianPostcode({ postcode: '123' })).toBe(false);
  });
});

describe('isAustralianAddress', () => {
  it('returns true for country AU or Australia', () => {
    expect(isAustralianAddress({ country: 'AU' })).toBe(true);
    expect(isAustralianAddress({ country: 'Australia' })).toBe(true);
  });
  it('returns false for other countries', () => {
    expect(isAustralianAddress({ country: 'US' })).toBe(false);
    expect(isAustralianAddress({})).toBe(false);
  });
});

describe('formatAustralianState', () => {
  it('returns code when given code', () => {
    expect(formatAustralianState({ state: 'NSW' })).toBe('NSW');
  });
  it('returns code when given full name', () => {
    expect(formatAustralianState({ state: 'New South Wales' })).toBe('NSW');
  });
  it('returns undefined when state empty', () => {
    expect(formatAustralianState({})).toBeUndefined();
  });
});

describe('validateAustralianState', () => {
  it('returns true for valid state code or name', () => {
    expect(validateAustralianState({ state: 'NSW' })).toBe(true);
    expect(validateAustralianState({ state: 'Victoria' })).toBe(true);
  });
  it('returns true when state is absent', () => {
    expect(validateAustralianState({})).toBe(true);
  });
  it('returns false for unknown state', () => {
    expect(validateAustralianState({ state: 'XX' })).toBe(false);
  });
});

describe('validateAustralianAddress', () => {
  it('returns valid: true for non-AU address', () => {
    const addr: Address = { country: 'US', postcode: '12345' };
    expect(validateAustralianAddress(addr).valid).toBe(true);
  });
  it('returns valid when AU postcode and state are valid', () => {
    const addr: Address = {
      country: 'AU',
      postcode: '2000',
      state: 'NSW',
    };
    const result = validateAustralianAddress(addr);
    expect(result.valid).toBe(true);
    expect(result.postcodeValid).toBe(true);
    expect(result.stateValid).toBe(true);
  });
  it('returns valid: false when AU postcode invalid', () => {
    const addr: Address = { country: 'AU', postcode: '123' };
    const result = validateAustralianAddress(addr);
    expect(result.valid).toBe(false);
    expect(result.postcodeValid).toBe(false);
  });
});
