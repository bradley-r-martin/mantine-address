export type { Country, StateOption } from './types';
export { countries } from './countries';
export { statesAU } from './states-au';
export { statesUS } from './states-us';

import type { StateOption } from './types';
import { statesAU } from './states-au';
import { statesUS } from './states-us';

/**
 * Returns the list of states/territories for a country when configured (e.g. AU, US).
 * Returns undefined for countries that have no state list, so the UI can show a text input instead.
 */
export function getStatesForCountry(code: string): StateOption[] | undefined {
  const upper = code.toUpperCase();
  if (upper === 'AU') return statesAU;
  if (upper === 'US') return statesUS;
  return undefined;
}
