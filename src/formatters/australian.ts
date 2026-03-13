import type { Address } from '../types';
import type { AddressFormatAdapter, AddressToEnvelopeOptions } from './types';
import { buildStreetLine, nonEmpty } from './utilities';

/** Australian state/territory codes for display. */
const AU_STATE_CODES = [
  'NSW',
  'VIC',
  'QLD',
  'SA',
  'WA',
  'TAS',
  'NT',
  'ACT',
] as const;

/** Full state name to code for display. */
const AU_STATE_NAMES_TO_CODES: Record<string, string> = {
  'New South Wales': 'NSW',
  Victoria: 'VIC',
  Queensland: 'QLD',
  'South Australia': 'SA',
  'Western Australia': 'WA',
  Tasmania: 'TAS',
  'Northern Territory': 'NT',
  'Australian Capital Territory': 'ACT',
};

function formatStateForDisplay(address: Address): string | undefined {
  const state = address.state?.trim();
  if (!state) return undefined;
  const upper = state.toUpperCase();
  if ((AU_STATE_CODES as readonly string[]).includes(upper)) return upper;
  return AU_STATE_NAMES_TO_CODES[state] ?? state;
}

function toString(address: Address): string {
  const streetLine = buildStreetLine(address);
  const stateFormatted = formatStateForDisplay(address);
  const localityParts: string[] = [];
  if (nonEmpty(address.suburb)) localityParts.push(address.suburb!.trim());
  if (stateFormatted) localityParts.push(stateFormatted);
  if (nonEmpty(address.postcode)) localityParts.push(address.postcode!.trim());
  const localityLine = localityParts.join(' ').trim();
  const countryLine = nonEmpty(address.country) ? address.country!.trim() : '';
  const parts = [streetLine, localityLine, countryLine].filter(Boolean);
  return parts.join(', ');
}

function toEnvelope(
  address: Address,
  options?: AddressToEnvelopeOptions
): string {
  const streetLine = buildStreetLine(address);
  const stateFormatted = formatStateForDisplay(address);
  const localityParts: string[] = [];
  if (nonEmpty(address.suburb)) localityParts.push(address.suburb!.trim());
  if (stateFormatted) localityParts.push(stateFormatted);
  if (nonEmpty(address.postcode)) localityParts.push(address.postcode!.trim());
  const localityLine = localityParts.join(' ').trim();
  const countryLine = nonEmpty(address.country) ? address.country!.trim() : '';
  const lines = [streetLine, localityLine, countryLine].filter(Boolean);
  const result = lines.join('\n');
  return options?.uppercase ? result.toUpperCase() : result;
}

/**
 * Australian formatter: state as code (e.g. VIC), comma-separated parts.
 * Accepts any Address; does not validate or restrict by country.
 */
export const australian: AddressFormatAdapter = {
  toString,
  toEnvelope,
};
