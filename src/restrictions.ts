import type { AcceptAddress, Address } from './types';

function normaliseCode(s: string): string {
  return s.trim().toUpperCase();
}

function acceptCountryCode(accept: AcceptAddress): string | undefined {
  const c = accept.country;
  if (c == null || c === '') return undefined;
  return normaliseCode(typeof c === 'string' ? c : c.code);
}

function acceptRegionAbbreviation(accept: AcceptAddress): string | undefined {
  const r = accept.region;
  if (r == null || r === '') return undefined;
  return normaliseCode(typeof r === 'string' ? r : r.abbreviation);
}

/**
 * Returns whether the address satisfies the accept filter (single country, optional single region).
 * Uses normalised comparison: trim, case-insensitive for country/state codes.
 */
export function addressSatisfiesRestrictions(
  address: Address,
  accept: AcceptAddress | undefined
): boolean {
  if (!accept) return true;

  const countryCode = acceptCountryCode(accept);
  if (countryCode) {
    const addressCountry = address.country?.trim();
    if (!addressCountry || normaliseCode(addressCountry) !== countryCode)
      return false;
  }

  const regionAbbr = acceptRegionAbbreviation(accept);
  if (regionAbbr) {
    const addressState = address.state?.trim();
    if (!addressState || normaliseCode(addressState) !== regionAbbr)
      return false;
  }

  return true;
}
