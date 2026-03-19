import { describe, it, expect } from 'vitest';
import { COUNTRIES, AUSTRALIA, UNITED_STATES, type Country } from '@/regions';
import {
  getCountriesSorted,
  getStatesForCountry,
  getRegionsFromCountry,
} from '@/utilities';

describe('regions API', () => {
  describe('countries (sorted)', () => {
    const countries = getCountriesSorted();
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

  describe('getRegionsFromCountry', () => {
    it('returns region entries for country with regions (AU)', () => {
      const regions = getRegionsFromCountry(AUSTRALIA);
      expect(regions).toBeDefined();
      expect(regions!.NEW_SOUTH_WALES).toBeDefined();
      expect(regions!.NEW_SOUTH_WALES.abbreviation).toBe('NSW');
      expect(regions!.VICTORIA?.abbreviation).toBe('VIC');
    });

    it('returns region entries for UNITED_STATES', () => {
      const regions = getRegionsFromCountry(UNITED_STATES);
      expect(regions).toBeDefined();
      expect(regions!.CALIFORNIA?.abbreviation).toBe('CA');
    });

    it('returns undefined for country without region keys', () => {
      const plainCountry = COUNTRIES['GB'];
      expect(plainCountry).toBeDefined();
      expect(getRegionsFromCountry(plainCountry!)).toBeUndefined();
    });
  });

  describe('AUSTRALIA and UNITED_STATES', () => {
    it('AUSTRALIA has code, name, and region properties', () => {
      expect(AUSTRALIA.code).toBe('AU');
      expect(AUSTRALIA.name).toBe('Australia');
      expect(AUSTRALIA.NEW_SOUTH_WALES).toBeDefined();
      expect(AUSTRALIA.NEW_SOUTH_WALES.abbreviation).toBe('NSW');
    });

    it('COUNTRIES.AU is same reference as AUSTRALIA', () => {
      expect(COUNTRIES.AU).toBe(AUSTRALIA);
    });

    it('COUNTRIES.US is same reference as UNITED_STATES', () => {
      expect(COUNTRIES.US).toBe(UNITED_STATES);
    });
  });
});
