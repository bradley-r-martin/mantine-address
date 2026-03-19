import type { AcceptAddress, Address, Country, Region } from './types';
import type { AddressData } from './data';
import { defaultAddressData } from './data';

/** Canonical list of countries (ISO 3166-1 alpha-2 code + name), sorted by name. */
export function getCountriesSorted(
  data: AddressData = defaultAddressData
): readonly Country[] {
  // AddressData is the canonical source; keep this helper for compatibility.
  return [...data.countries].sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

function isRegion(value: string | Region): value is Region {
  return (
    typeof value === 'object' &&
    value !== null &&
    'name' in value &&
    'abbreviation' in value &&
    'location' in value
  );
}

/** Returns region entries from a country object (all keys except code and name whose values are Region-shaped). */
export function getRegionsFromCountry(
  country: Country
): Record<string, Region> | undefined {
  const out: Record<string, Region> = {};
  for (const key of Object.keys(country)) {
    if (key === 'code' || key === 'name') continue;
    const val = country[key];
    if (isRegion(val)) out[key] = val;
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

function regionsToStateOptions(
  regions: Record<string, { name: string; abbreviation: string }>
): { code: string; name: string }[] {
  return Object.values(regions)
    .map((r) => ({ code: r.abbreviation, name: r.name }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

/** Returns state/region options (code + name) for a country that has region data, or undefined. */
export function getStateOptionsFromCountry(
  country: Country
): { code: string; name: string }[] | undefined {
  const regions = getRegionsFromCountry(country);
  return regions ? regionsToStateOptions(regions) : undefined;
}

/** Returns state options (code + name) from regions record. */
export function getStateOptionsFromRegions(
  regions: Record<string, { name: string; abbreviation: string }>
): { code: string; name: string }[] {
  return regionsToStateOptions(regions);
}

// --- Accept/restrictions helpers ---

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
