import { describe, it, expect } from 'vitest';
import { addressSatisfiesRestrictions } from '@/restrictions';
import type { Address, AddressRestrictions } from '@/types';
import { COUNTRIES, REGIONS } from '@/regions';

describe('addressSatisfiesRestrictions', () => {
  it('returns true when restrictions is undefined', () => {
    expect(
      addressSatisfiesRestrictions({ country: 'AU', state: 'NSW' }, undefined)
    ).toBe(true);
  });

  it('returns true when all restriction arrays are empty or undefined', () => {
    const r: AddressRestrictions = {};
    expect(
      addressSatisfiesRestrictions(
        { country: 'AU', state: 'NSW', postcode: '2000', suburb: 'Sydney' },
        r
      )
    ).toBe(true);
    expect(
      addressSatisfiesRestrictions(
        { country: 'US' },
        { allowedCountries: [], allowedStates: [] }
      )
    ).toBe(true);
  });

  describe('allowedCountries only', () => {
    const restrictions: AddressRestrictions = {
      allowedCountries: [COUNTRIES.AU, COUNTRIES.NZ],
    };

    it('passes when address country is in the list', () => {
      expect(
        addressSatisfiesRestrictions({ country: 'AU' }, restrictions)
      ).toBe(true);
      expect(
        addressSatisfiesRestrictions({ country: 'NZ' }, restrictions)
      ).toBe(true);
      expect(
        addressSatisfiesRestrictions({ country: 'au' }, restrictions)
      ).toBe(true);
      expect(
        addressSatisfiesRestrictions({ country: '  AU  ' }, restrictions)
      ).toBe(true);
    });

    it('fails when address country is not in the list', () => {
      expect(
        addressSatisfiesRestrictions({ country: 'US' }, restrictions)
      ).toBe(false);
      expect(
        addressSatisfiesRestrictions({ country: 'GB' }, restrictions)
      ).toBe(false);
    });

    it('fails when address has no country', () => {
      expect(addressSatisfiesRestrictions({}, restrictions)).toBe(false);
      expect(addressSatisfiesRestrictions({ country: '' }, restrictions)).toBe(
        false
      );
    });
  });

  describe('country + state (AND semantics)', () => {
    const restrictions: AddressRestrictions = {
      allowedCountries: [COUNTRIES.AU],
      allowedStates: ['NSW', 'VIC'],
    };

    it('passes when both country and state are allowed', () => {
      expect(
        addressSatisfiesRestrictions(
          { country: 'AU', state: 'NSW' },
          restrictions
        )
      ).toBe(true);
      expect(
        addressSatisfiesRestrictions(
          { country: 'AU', state: 'VIC' },
          restrictions
        )
      ).toBe(true);
      expect(
        addressSatisfiesRestrictions(
          { country: 'au', state: 'nsw' },
          restrictions
        )
      ).toBe(true);
    });

    it('fails when state is not in allowed list', () => {
      expect(
        addressSatisfiesRestrictions(
          { country: 'AU', state: 'QLD' },
          restrictions
        )
      ).toBe(false);
    });

    it('fails when country is not in allowed list', () => {
      expect(
        addressSatisfiesRestrictions(
          { country: 'US', state: 'NSW' },
          restrictions
        )
      ).toBe(false);
    });

    it('fails when address has no state', () => {
      expect(
        addressSatisfiesRestrictions({ country: 'AU' }, restrictions)
      ).toBe(false);
      expect(
        addressSatisfiesRestrictions({ country: 'AU', state: '' }, restrictions)
      ).toBe(false);
    });
  });

  describe('allowedRegions', () => {
    const restrictions: AddressRestrictions = {
      allowedCountries: [COUNTRIES.AU],
      allowedRegions: [REGIONS.NEW_SOUTH_WALES],
    };

    it('passes when address country and state match a region', () => {
      expect(
        addressSatisfiesRestrictions(
          { country: 'AU', state: 'NSW' },
          restrictions
        )
      ).toBe(true);
      expect(
        addressSatisfiesRestrictions(
          { country: 'au', state: 'nsw' },
          restrictions
        )
      ).toBe(true);
    });

    it('fails when state does not match any region', () => {
      expect(
        addressSatisfiesRestrictions(
          { country: 'AU', state: 'VIC' },
          restrictions
        )
      ).toBe(false);
    });

    it('fails when country does not match', () => {
      expect(
        addressSatisfiesRestrictions(
          { country: 'US', state: 'NSW' },
          restrictions
        )
      ).toBe(false);
    });
  });

  describe('allowedPostcodes', () => {
    const restrictions: AddressRestrictions = {
      allowedPostcodes: ['2000', '2001'],
    };

    it('passes when postcode is in the list (case-insensitive, trim)', () => {
      expect(
        addressSatisfiesRestrictions({ postcode: '2000' }, restrictions)
      ).toBe(true);
      expect(
        addressSatisfiesRestrictions({ postcode: '  2001  ' }, restrictions)
      ).toBe(true);
    });

    it('fails when postcode is not in the list', () => {
      expect(
        addressSatisfiesRestrictions({ postcode: '3000' }, restrictions)
      ).toBe(false);
    });

    it('fails when address has no postcode', () => {
      expect(addressSatisfiesRestrictions({}, restrictions)).toBe(false);
      expect(addressSatisfiesRestrictions({ postcode: '' }, restrictions)).toBe(
        false
      );
    });
  });

  describe('allowedSuburbs', () => {
    const restrictions: AddressRestrictions = {
      allowedSuburbs: ['Sydney', 'Melbourne'],
    };

    it('passes when suburb is in the list (case-insensitive, trim)', () => {
      expect(
        addressSatisfiesRestrictions({ suburb: 'Sydney' }, restrictions)
      ).toBe(true);
      expect(
        addressSatisfiesRestrictions({ suburb: 'sydney' }, restrictions)
      ).toBe(true);
      expect(
        addressSatisfiesRestrictions({ suburb: '  Melbourne  ' }, restrictions)
      ).toBe(true);
    });

    it('fails when suburb is not in the list', () => {
      expect(
        addressSatisfiesRestrictions({ suburb: 'Brisbane' }, restrictions)
      ).toBe(false);
    });

    it('fails when address has no suburb', () => {
      expect(addressSatisfiesRestrictions({}, restrictions)).toBe(false);
    });
  });

  describe('all restrictions combined (AND semantics)', () => {
    const restrictions: AddressRestrictions = {
      allowedCountries: [COUNTRIES.AU],
      allowedStates: ['NSW'],
      allowedPostcodes: ['2000'],
      allowedSuburbs: ['Sydney'],
    };

    it('passes only when every non-empty restriction is satisfied', () => {
      const full: Address = {
        country: 'AU',
        state: 'NSW',
        postcode: '2000',
        suburb: 'Sydney',
      };
      expect(addressSatisfiesRestrictions(full, restrictions)).toBe(true);
    });

    it('fails if any dimension fails', () => {
      expect(
        addressSatisfiesRestrictions(
          {
            country: 'AU',
            state: 'NSW',
            postcode: '2000',
            suburb: 'Brisbane',
          },
          restrictions
        )
      ).toBe(false);
      expect(
        addressSatisfiesRestrictions(
          {
            country: 'AU',
            state: 'NSW',
            postcode: '3000',
            suburb: 'Sydney',
          },
          restrictions
        )
      ).toBe(false);
    });
  });
});
