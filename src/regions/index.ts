export type { Country, Region } from './types';
export { countries, COUNTRIES } from './countries';
export { REGIONS } from './states-au';
export { REGIONS as REGIONS_US } from './states-us';

import { REGIONS as REGIONS_AU } from './states-au';
import { REGIONS as REGIONS_US } from './states-us';

function regionsToStateOptions(
  regions: Record<string, { name: string; abbreviation: string }>
): { code: string; name: string }[] {
  return Object.values(regions)
    .map((r) => ({ code: r.abbreviation, name: r.name }))
    .sort((a, b) => a.name.localeCompare(b.name, 'en'));
}

/**
 * Returns the list of states/territories for a country when configured (e.g. AU, US).
 * Returns undefined for countries that have no state list, so the UI can show a text input instead.
 */
export function getStatesForCountry(
  code: string
): { code: string; name: string }[] | undefined {
  const upper = code.toUpperCase();
  if (upper === 'AU') return regionsToStateOptions(REGIONS_AU);
  if (upper === 'US') return regionsToStateOptions(REGIONS_US);
  return undefined;
}
