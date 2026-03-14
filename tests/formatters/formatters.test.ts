import { describe, it, expect } from 'vitest';
import { international, australian } from '@/formatters';
import type { Address } from '@/types';

const FULL_ADDRESS: Address = {
  street_number: '123',
  street_name: 'Main',
  street_type: 'St',
  suburb: 'Springfield',
  state: 'IL',
  postcode: '62701',
  country: 'US',
};

describe('international', () => {
  it('toString returns single-line string', () => {
    expect(international.toString(FULL_ADDRESS)).toBe(
      '123 Main St, Springfield IL 62701 US'
    );
  });

  it('formats minimal address', () => {
    expect(international.toString({ street_name: 'Road' })).toBe('Road');
  });

  it('omits empty/undefined fields', () => {
    const addr: Address = { street_name: 'Only Street', suburb: 'Town' };
    expect(international.toString(addr)).toBe('Only Street, Town');
  });

  it('toEnvelope returns multi-line format', () => {
    const result = international.toEnvelope(FULL_ADDRESS);
    expect(result).toContain('123 Main St');
    expect(result).toContain('Springfield IL 62701');
    expect(result).toContain('US');
    expect(result.split('\n')).toHaveLength(3);
  });

  it('toEnvelope applies uppercase when option set', () => {
    const result = international.toEnvelope(FULL_ADDRESS, { uppercase: true });
    expect(result).toBe('123 MAIN ST\nSPRINGFIELD IL 62701\nUS');
  });
});

describe('australian', () => {
  it('formats with state as code and comma-separated parts', () => {
    const addr: Address = {
      street_number: '10',
      street_name: 'Collins',
      street_type: 'St',
      suburb: 'Melbourne',
      state: 'Victoria',
      postcode: '3000',
      country: 'Australia',
    };
    expect(australian.toString(addr)).toBe(
      '10 Collins St, Melbourne VIC 3000, Australia'
    );
  });

  it('formats non-AU address using Australian display rules', () => {
    const addr: Address = {
      street_number: '123',
      street_name: 'Main',
      street_type: 'St',
      suburb: 'Springfield',
      state: 'IL',
      postcode: '62701',
      country: 'US',
    };
    const result = australian.toString(addr);
    expect(result).toContain('123 Main St');
    expect(result).toContain('Springfield');
    expect(result).toContain('IL');
    expect(result).toContain('62701');
    expect(result).toContain('US');
    expect(result).toBe('123 Main St, Springfield IL 62701, US');
  });

  it('handles minimal address', () => {
    expect(australian.toString({ street_name: 'Road' })).toBe('Road');
  });

  it('toEnvelope returns multi-line with Australian state format', () => {
    const addr: Address = {
      street_number: '10',
      street_name: 'Collins',
      street_type: 'St',
      suburb: 'Melbourne',
      state: 'Victoria',
      postcode: '3000',
      country: 'Australia',
    };
    const result = australian.toEnvelope(addr);
    expect(result).toContain('10 Collins St');
    expect(result).toContain('Melbourne VIC 3000');
    expect(result).toContain('Australia');
    expect(result.split('\n')).toHaveLength(3);
  });
});
