import type { AcceptAddress, Address, Country, Region } from './types';
import { COUNTRIES } from './regions';

/** Canonical list of countries (ISO 3166-1 alpha-2 code + name), sorted by name. */
export function getCountriesSorted(): readonly Country[] {
  return Object.values(COUNTRIES).sort((a, b) =>
    a.name.localeCompare(b.name, 'en')
  );
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

/**
 * Returns the list of states/territories for a country when configured (e.g. AU, US).
 * Returns undefined for countries that have no state list, so the UI can show a text input instead.
 */
export function getStatesForCountry(
  code: string
): { code: string; name: string }[] | undefined {
  const upper = code.toUpperCase();
  const country = COUNTRIES[upper];
  return country ? getStateOptionsFromCountry(country) : undefined;
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
