import type { Address, AddressRestrictions } from './types';

function normaliseCode(s: string): string {
  return s.trim().toUpperCase();
}

function normaliseLabel(s: string): string {
  return s.trim().toLowerCase();
}

/**
 * Returns whether the address satisfies all non-empty restrictions.
 * Uses normalised comparison: trim, case-insensitive for country/state codes and for postcode/suburb labels.
 * When allowedRegions is set, state must match one region's abbreviation; use with allowedCountries.
 */
export function addressSatisfiesRestrictions(
  address: Address,
  restrictions: AddressRestrictions | undefined
): boolean {
  if (!restrictions) return true;

  const {
    allowedCountries,
    allowedStates,
    allowedRegions,
    allowedPostcodes,
    allowedSuburbs,
  } = restrictions;

  if (allowedCountries?.length) {
    const set = new Set(
      allowedCountries.map((c) =>
        normaliseCode(typeof c === 'string' ? c : c.code)
      )
    );
    const country = address.country?.trim();
    if (!country || !set.has(normaliseCode(country))) return false;
  }

  const stateSet = allowedRegions?.length
    ? new Set(allowedRegions.map((r) => normaliseCode(r.abbreviation)))
    : allowedStates?.length
      ? new Set(allowedStates.map((s) => normaliseCode(s)))
      : null;
  if (stateSet) {
    const state = address.state?.trim();
    if (!state || !stateSet.has(normaliseCode(state))) return false;
  }

  if (allowedPostcodes?.length) {
    const set = new Set(allowedPostcodes.map((p) => normaliseLabel(p)));
    const postcode = address.postcode?.trim();
    if (!postcode || !set.has(normaliseLabel(postcode))) return false;
  }

  if (allowedSuburbs?.length) {
    const set = new Set(allowedSuburbs.map((s) => normaliseLabel(s)));
    const suburb = address.suburb?.trim();
    if (!suburb || !set.has(normaliseLabel(suburb))) return false;
  }

  return true;
}
