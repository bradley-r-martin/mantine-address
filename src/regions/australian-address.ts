import type { Address } from '../types';

/** Australian street type: full name to common abbreviation for display. */
export const AU_STREET_TYPES: Record<string, string> = {
  Street: 'St',
  Avenue: 'Ave',
  Road: 'Rd',
  Drive: 'Dr',
  Place: 'Pl',
  Court: 'Ct',
  Crescent: 'Cres',
  Lane: 'Ln',
  Way: 'Way',
  Parade: 'Pde',
  Highway: 'Hwy',
  Boulevard: 'Bvd',
  Terrace: 'Tce',
  Close: 'Cl',
  Circuit: 'Cct',
  Grove: 'Grv',
  Square: 'Sq',
  Circle: 'Cir',
  Esplanade: 'Esp',
  Rise: 'Rise',
  Lookout: 'Lkt',
  Mews: 'Mews',
  Walk: 'Walk',
  Link: 'Link',
  Trail: 'Trl',
  Path: 'Path',
  Row: 'Row',
  Alley: 'Aly',
  Arcade: 'Arc',
  Bend: 'Bend',
  Chase: 'Ch',
  Concourse: 'Con',
  Cove: 'Cove',
  Dale: 'Dale',
  Dell: 'Dell',
  Dip: 'Dip',
  End: 'End',
  Flat: 'Flat',
  Glade: 'Gld',
  Glen: 'Glen',
  Green: 'Grn',
  Hill: 'Hill',
  Hollow: 'Hollow',
  Junction: 'Jnc',
  Keys: 'Keys',
  Loop: 'Loop',
  Mall: 'Mall',
  Mount: 'Mt',
  Nook: 'Nook',
  Park: 'Park',
  Pass: 'Pass',
  Point: 'Pt',
  Quay: 'Qy',
  Ridge: 'Rdge',
  Ring: 'Ring',
  River: 'Riv',
  Run: 'Run',
  Slope: 'Slope',
  Spur: 'Spur',
  Strand: 'Strand',
  Strip: 'Strip',
  Track: 'Trak',
  View: 'Vw',
  Vista: 'Vsta',
  Wharf: 'Wharf',
  Wynd: 'Wynd',
};

/** Australian street suffix directions for display/validation. */
export const AU_STREET_SUFFIXES = [
  'N',
  'S',
  'E',
  'W',
  'NE',
  'NW',
  'SE',
  'SW',
] as const;

export type AuStreetSuffix = (typeof AU_STREET_SUFFIXES)[number];

/** Australian state/territory codes. */
export const AU_STATE_CODES = [
  'NSW', // New South Wales
  'VIC', // Victoria
  'QLD', // Queensland
  'SA', // South Australia
  'WA', // Western Australia
  'TAS', // Tasmania
  'NT', // Northern Territory
  'ACT', // Australian Capital Territory
] as const;

export type AuStateCode = (typeof AU_STATE_CODES)[number];

/** Full state name to code for display. */
export const AU_STATE_NAMES_TO_CODES: Record<string, AuStateCode> = {
  'New South Wales': 'NSW',
  Victoria: 'VIC',
  Queensland: 'QLD',
  'South Australia': 'SA',
  'Western Australia': 'WA',
  Tasmania: 'TAS',
  'Northern Territory': 'NT',
  'Australian Capital Territory': 'ACT',
};

/** Australian postcode: 4 digits (0000-9999). */
export const AU_POSTCODE_REGEX = /^\d{4}$/;

/**
 * Validates Australian postcode format (4 digits).
 * Operates on the uniform Address; does not change it.
 */
export function validateAustralianPostcode(address: Address): boolean {
  const postcode = address.postcode?.trim();
  if (postcode == null || postcode === '') return false;
  return AU_POSTCODE_REGEX.test(postcode);
}

/**
 * Returns whether the address appears to be Australian (country is AU or Australia).
 */
export function isAustralianAddress(address: Address): boolean {
  const c = (address.country ?? '').toUpperCase();
  return c === 'AU' || c === 'AUSTRALIA';
}

/**
 * Formats the state field for Australian display (e.g. full name → code).
 * Uses uniform Address; returns region-specific string only.
 */
export function formatAustralianState(address: Address): string | undefined {
  const state = address.state?.trim();
  if (!state) return undefined;
  const upper = state.toUpperCase();
  if (AU_STATE_CODES.includes(upper as AuStateCode)) return upper;
  return AU_STATE_NAMES_TO_CODES[state] ?? state;
}

/**
 * Validates that the address state (when present) is a known Australian state/territory code or name.
 */
export function validateAustralianState(address: Address): boolean {
  const state = address.state?.trim();
  if (!state) return true;
  const upper = state.toUpperCase();
  if (AU_STATE_CODES.includes(upper as AuStateCode)) return true;
  return state in AU_STATE_NAMES_TO_CODES;
}

/**
 * Region-specific validation result for Australian address.
 */
export interface AustralianAddressValidation {
  valid: boolean;
  postcodeValid?: boolean;
  stateValid?: boolean;
}

/**
 * Validates an address for Australian conventions (postcode format, state code).
 * Consumes the uniform Address only; does not mutate it.
 */
export function validateAustralianAddress(
  address: Address
): AustralianAddressValidation {
  if (!isAustralianAddress(address)) {
    return { valid: true };
  }
  const postcodeValid = validateAustralianPostcode(address);
  const stateValid = validateAustralianState(address);
  return {
    valid: postcodeValid && stateValid,
    postcodeValid,
    stateValid,
  };
}
