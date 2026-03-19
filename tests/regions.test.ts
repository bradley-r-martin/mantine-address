import { describe, it, expect } from 'vitest';
import { COUNTRIES, AUSTRALIA, UNITED_STATES, type Country } from '@/regions';
import { defaultAddressData } from '@/data';
import { getCountriesSorted, getRegionsFromCountry } from '@/utilities';
import { getStateOptionsFromRegions } from '@/utilities';

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

  describe('defaultAddressData.regions', () => {
    it('resolves non-empty list for AU', async () => {
      const regions = await defaultAddressData.regions?.('AU');
      expect(regions).toBeDefined();
      const list = regions ? getStateOptionsFromRegions(regions) : undefined;
      expect(list).toBeDefined();
      expect(Array.isArray(list)).toBe(true);
      expect(list!.length).toBeGreaterThan(0);
      expect(list!.some((s) => s.code === 'NSW')).toBe(true);
      expect(list!.some((s) => s.code === 'VIC')).toBe(true);
    });

    it('resolves non-empty list for US', async () => {
      const regions = await defaultAddressData.regions?.('US');
      expect(regions).toBeDefined();
      const list = regions ? getStateOptionsFromRegions(regions) : undefined;
      expect(list).toBeDefined();
      expect(Array.isArray(list)).toBe(true);
      expect(list!.length).toBeGreaterThan(0);
      expect(list!.some((s) => s.code === 'CA')).toBe(true);
      expect(list!.some((s) => s.code === 'NY')).toBe(true);
    });

    it('resolves undefined for unconfigured country code', async () => {
      await expect(defaultAddressData.regions?.('XX')).resolves.toBeUndefined();
      await expect(defaultAddressData.regions?.('GB')).resolves.toBeUndefined();
      await expect(defaultAddressData.regions?.('')).resolves.toBeUndefined();
    });

    it('is case-insensitive for AU and US', async () => {
      await expect(defaultAddressData.regions?.('au')).resolves.toBeDefined();
      await expect(defaultAddressData.regions?.('Au')).resolves.toBeDefined();
      await expect(defaultAddressData.regions?.('us')).resolves.toBeDefined();
      await expect(defaultAddressData.regions?.('US')).resolves.toBeDefined();
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

    it('COUNTRIES entries do not embed region datasets', () => {
      expect(COUNTRIES.AU).not.toBe(AUSTRALIA);
      expect(getRegionsFromCountry(COUNTRIES.AU)).toBeUndefined();
      expect(COUNTRIES.US).not.toBe(UNITED_STATES);
      expect(getRegionsFromCountry(COUNTRIES.US)).toBeUndefined();
    });
  });
});
