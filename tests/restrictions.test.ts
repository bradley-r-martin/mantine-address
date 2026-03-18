import { describe, it, expect } from 'vitest';
import { addressSatisfiesRestrictions } from '@/restrictions';
import type { AcceptAddress } from '@/types';
import { COUNTRIES, REGIONS } from '@/regions';

describe('addressSatisfiesRestrictions', () => {
  it('returns true when accept is undefined', () => {
    expect(
      addressSatisfiesRestrictions({ country: 'AU', state: 'NSW' }, undefined)
    ).toBe(true);
  });

  it('returns true when accept is empty', () => {
    const accept: AcceptAddress = {};
    expect(
      addressSatisfiesRestrictions({ country: 'AU', state: 'NSW' }, accept)
    ).toBe(true);
  });

  describe('accept.country only', () => {
    const accept: AcceptAddress = { country: COUNTRIES.AU };

    it('passes when address country matches', () => {
      expect(addressSatisfiesRestrictions({ country: 'AU' }, accept)).toBe(
        true
      );
      expect(addressSatisfiesRestrictions({ country: 'au' }, accept)).toBe(
        true
      );
      expect(addressSatisfiesRestrictions({ country: '  AU  ' }, accept)).toBe(
        true
      );
      expect(
        addressSatisfiesRestrictions({ country: 'AU' }, { country: 'AU' })
      ).toBe(true);
    });

    it('fails when address country does not match', () => {
      expect(addressSatisfiesRestrictions({ country: 'US' }, accept)).toBe(
        false
      );
      expect(addressSatisfiesRestrictions({ country: 'NZ' }, accept)).toBe(
        false
      );
    });

    it('fails when address has no country', () => {
      expect(addressSatisfiesRestrictions({}, accept)).toBe(false);
      expect(addressSatisfiesRestrictions({ country: '' }, accept)).toBe(false);
    });
  });

  describe('accept.country + accept.region (AND semantics)', () => {
    const accept: AcceptAddress = {
      country: COUNTRIES.AU,
      region: REGIONS.NEW_SOUTH_WALES,
    };

    it('passes when both country and state match', () => {
      expect(
        addressSatisfiesRestrictions({ country: 'AU', state: 'NSW' }, accept)
      ).toBe(true);
      expect(
        addressSatisfiesRestrictions({ country: 'au', state: 'nsw' }, accept)
      ).toBe(true);
    });

    it('fails when state does not match', () => {
      expect(
        addressSatisfiesRestrictions({ country: 'AU', state: 'VIC' }, accept)
      ).toBe(false);
      expect(
        addressSatisfiesRestrictions({ country: 'AU', state: 'QLD' }, accept)
      ).toBe(false);
    });

    it('fails when country does not match', () => {
      expect(
        addressSatisfiesRestrictions({ country: 'US', state: 'NSW' }, accept)
      ).toBe(false);
    });

    it('fails when address has no state', () => {
      expect(addressSatisfiesRestrictions({ country: 'AU' }, accept)).toBe(
        false
      );
      expect(
        addressSatisfiesRestrictions({ country: 'AU', state: '' }, accept)
      ).toBe(false);
    });
  });

  describe('accept.region as string abbreviation', () => {
    const accept: AcceptAddress = {
      country: 'AU',
      region: 'NSW',
    };

    it('passes when address state matches abbreviation', () => {
      expect(
        addressSatisfiesRestrictions({ country: 'AU', state: 'NSW' }, accept)
      ).toBe(true);
    });

    it('fails when address state does not match', () => {
      expect(
        addressSatisfiesRestrictions({ country: 'AU', state: 'VIC' }, accept)
      ).toBe(false);
    });
  });
});
