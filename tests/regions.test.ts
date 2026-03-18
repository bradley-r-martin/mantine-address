import { describe, it, expect } from 'vitest';
import { countries, getStatesForCountry, type Country } from '@/regions';

describe('regions API', () => {
  describe('countries', () => {
    it('exports a non-empty list of countries', () => {
      expect(countries).toBeDefined();
      expect(Array.isArray(countries)).toBe(true);
      expect(countries.length).toBeGreaterThan(0);
    });

    it('includes Australia and United States', () => {
      const codes = countries.map((c: Country) => c.code);
      expect(codes).toContain('AU');
      expect(codes).toContain('US');
    });

    it('each entry has code and name', () => {
      for (const c of countries) {
        expect(typeof c.code).toBe('string');
        expect(c.code.length).toBe(2);
        expect(typeof c.name).toBe('string');
        expect(c.name.length).toBeGreaterThan(0);
      }
    });

    it('is sorted by name', () => {
      const names = [...countries].map((c) => c.name);
      const sorted = [...names].sort((a, b) => a.localeCompare(b, 'en'));
      expect(names).toEqual(sorted);
    });
  });

  describe('getStatesForCountry', () => {
    it('returns non-empty list for AU', () => {
      const list = getStatesForCountry('AU');
      expect(list).toBeDefined();
      expect(Array.isArray(list)).toBe(true);
      expect(list!.length).toBeGreaterThan(0);
      expect(list!.some((s) => s.code === 'NSW')).toBe(true);
      expect(list!.some((s) => s.code === 'VIC')).toBe(true);
    });

    it('returns non-empty list for US', () => {
      const list = getStatesForCountry('US');
      expect(list).toBeDefined();
      expect(Array.isArray(list)).toBe(true);
      expect(list!.length).toBeGreaterThan(0);
      expect(list!.some((s) => s.code === 'CA')).toBe(true);
      expect(list!.some((s) => s.code === 'NY')).toBe(true);
    });

    it('returns undefined for unconfigured country code', () => {
      expect(getStatesForCountry('XX')).toBeUndefined();
      expect(getStatesForCountry('GB')).toBeUndefined();
      expect(getStatesForCountry('')).toBeUndefined();
    });

    it('is case-insensitive for AU and US', () => {
      expect(getStatesForCountry('au')).toBeDefined();
      expect(getStatesForCountry('Au')).toBeDefined();
      expect(getStatesForCountry('us')).toBeDefined();
      expect(getStatesForCountry('US')).toBeDefined();
    });
  });
});
