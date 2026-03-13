import { describe, it, expect } from 'vitest';
import {
  addressToString,
  addressToStreetString,
  addressToEnvelopeString,
} from './formatAddress';
import type { Address } from './types';

describe('addressToStreetString', () => {
  it('formats full street components in order', () => {
    const addr: Address = {
      unit: '5',
      building_name: 'Tower A',
      level: '2',
      lot_no: '12',
      street_number: '123',
      street_name: 'Main',
      street_type: 'St',
      street_suffix: 'N',
    };
    expect(addressToStreetString(addr)).toBe(
      '5 Tower A Level 2 Lot 12 123 Main St N'
    );
  });

  it('returns only street-level parts, no suburb/state', () => {
    const addr: Address = {
      street_number: '1',
      street_name: 'George',
      street_type: 'St',
      suburb: 'Sydney',
      state: 'NSW',
    };
    expect(addressToStreetString(addr)).toBe('1 George St');
  });

  it('returns empty string when no street fields set', () => {
    expect(addressToStreetString({ suburb: 'Sydney' })).toBe('');
  });
});

describe('addressToString', () => {
  it('formats full address to single line with comma separator', () => {
    const addr: Address = {
      street_number: '123',
      street_name: 'Main',
      street_type: 'St',
      suburb: 'Springfield',
      state: 'IL',
      postcode: '62701',
      country: 'US',
    };
    expect(addressToString(addr)).toBe('123 Main St, Springfield IL 62701 US');
  });

  it('omits undefined/empty fields without extra separators', () => {
    const addr: Address = {
      street_name: 'Only Street',
      suburb: 'Town',
    };
    expect(addressToString(addr)).toBe('Only Street, Town');
  });

  it('handles minimal address', () => {
    expect(addressToString({ street_name: 'Road' })).toBe('Road');
  });
});

describe('addressToEnvelopeString', () => {
  it('produces multiple lines: street, locality, country', () => {
    const addr: Address = {
      unit: '2',
      street_number: '10',
      street_name: 'Collins',
      street_type: 'St',
      suburb: 'Melbourne',
      state: 'VIC',
      postcode: '3000',
      country: 'Australia',
    };
    const result = addressToEnvelopeString(addr);
    expect(result).toContain('2 10 Collins St');
    expect(result).toContain('Melbourne VIC 3000');
    expect(result).toContain('Australia');
    expect(result.split('\n')).toHaveLength(3);
  });

  it('applies uppercase when option set', () => {
    const addr: Address = {
      street_name: 'Main St',
      suburb: 'Sydney',
      state: 'NSW',
      postcode: '2000',
      country: 'AU',
    };
    const result = addressToEnvelopeString(addr, { uppercase: true });
    expect(result).toBe('MAIN ST\nSYDNEY NSW 2000\nAU');
  });

  it('omits empty lines', () => {
    const addr: Address = { country: 'US' };
    expect(addressToEnvelopeString(addr)).toBe('US');
  });
});
