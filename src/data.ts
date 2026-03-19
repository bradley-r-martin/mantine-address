import type { Country, Region } from './types';
import { COUNTRIES } from './regions';

export type RegionsResolver = (
  countryCode: string
) => Promise<Record<string, Region> | undefined>;

export type PostcodesResolver = (
  countryCode: string
) => Promise<readonly string[] | undefined>;

export type SuburbsResolver = (
  countryCode: string
) => Promise<readonly string[] | undefined>;

export interface AddressData {
  /** Canonical list of countries for a Country select. */
  countries: readonly Country[];

  /** Optional resolver for regions/states for a given country code. */
  regions?: RegionsResolver;

  /** Optional resolver for postcodes for a given country code. */
  postcodes?: PostcodesResolver;

  /** Optional resolver for suburbs/localities for a given country code. */
  suburbs?: SuburbsResolver;
}

function byName(a: Country, b: Country): number {
  return a.name.localeCompare(b.name, 'en');
}

// NOTE: COUNTRIES currently contains code/name for all countries.
// We use it only for the lightweight catalog and keep region/state
// datasets behind the lazy resolver below.
const defaultCountries: readonly Country[] =
  Object.values(COUNTRIES).sort(byName);

function normaliseCountryCode(code: string): string {
  return code.trim().toUpperCase();
}

type LazyRegionsModule = { [key: string]: unknown };

function countryToRegions(
  country: Country
): Record<string, Region> | undefined {
  const out: Record<string, Region> = {};
  for (const key of Object.keys(country)) {
    if (key === 'code' || key === 'name') continue;
    const v = country[key];
    if (
      typeof v === 'object' &&
      v !== null &&
      'name' in v &&
      'abbreviation' in v &&
      'location' in v
    ) {
      out[key] = v as Region;
    }
  }
  return Object.keys(out).length > 0 ? out : undefined;
}

export const defaultAddressData: AddressData = (() => {
  const cache = new Map<string, Promise<Record<string, Region> | undefined>>();

  const regions: RegionsResolver = async (countryCode) => {
    const code = normaliseCountryCode(countryCode);
    const cached = cache.get(code);
    if (cached) return cached;

    const p = (async (): Promise<Record<string, Region> | undefined> => {
      if (code === 'AU') {
        const mod: LazyRegionsModule = await import('./regions/au');
        return countryToRegions(mod.AUSTRALIA as Country);
      }
      if (code === 'US') {
        const mod: LazyRegionsModule = await import('./regions/us');
        return countryToRegions(mod.UNITED_STATES as Country);
      }
      return undefined;
    })();

    cache.set(code, p);
    return p;
  };

  return {
    countries: defaultCountries,
    regions,
  };
})();
