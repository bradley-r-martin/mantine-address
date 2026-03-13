import type { Address } from './types';
import { formatAustralianState } from './regions/australian-address';

function nonEmpty(value: string | undefined): value is string {
  return value != null && String(value).trim() !== '';
}

function joinParts(parts: string[], separator: string): string {
  return parts
    .filter(Boolean)
    .join(separator)
    .replace(/\s*,\s*,/g, ',')
    .trim();
}

/**
 * Formats the street-level line: unit, building, level, lot, street number, name, type, suffix.
 * Omits suburb, state, postcode, country.
 */
export function addressToStreetString(address: Address): string {
  const parts: string[] = [];
  if (nonEmpty(address.unit)) parts.push(address.unit!.trim());
  if (nonEmpty(address.building_name))
    parts.push(address.building_name!.trim());
  if (nonEmpty(address.level)) parts.push(`Level ${address.level!.trim()}`);
  if (nonEmpty(address.lot_no)) parts.push(`Lot ${address.lot_no!.trim()}`);
  if (nonEmpty(address.street_number))
    parts.push(address.street_number!.trim());
  if (nonEmpty(address.street_name)) parts.push(address.street_name!.trim());
  if (nonEmpty(address.street_type)) parts.push(address.street_type!.trim());
  if (nonEmpty(address.street_suffix))
    parts.push(address.street_suffix!.trim());
  return parts.filter(Boolean).join(' ').trim();
}

/**
 * Formats the full address as a single line.
 * Order: street line components, then suburb, state, postcode, country.
 * Undefined/empty fields are omitted; no duplicate or stray separators.
 */
export function addressToString(address: Address): string {
  const streetLine = addressToStreetString(address);
  const localityParts: string[] = [];
  if (nonEmpty(address.suburb)) localityParts.push(address.suburb!.trim());
  if (nonEmpty(address.state)) localityParts.push(address.state!.trim());
  if (nonEmpty(address.postcode)) localityParts.push(address.postcode!.trim());
  if (nonEmpty(address.country)) localityParts.push(address.country!.trim());
  const localityLine = localityParts.join(' ').trim();
  return joinParts([streetLine, localityLine].filter(Boolean), ', ');
}

export interface AddressToEnvelopeOptions {
  /** Apply uppercase to lines (e.g. for postal envelope conventions). Default false. */
  uppercase?: boolean;
}

/**
 * Formats the address for envelope/postal use: multiple lines (street line, locality line, country).
 * Optionally applies uppercase to lines.
 */
export function addressToEnvelopeString(
  address: Address,
  options?: AddressToEnvelopeOptions
): string {
  const streetLine = addressToStreetString(address);
  const localityParts: string[] = [];
  if (nonEmpty(address.suburb)) localityParts.push(address.suburb!.trim());
  if (nonEmpty(address.state)) localityParts.push(address.state!.trim());
  if (nonEmpty(address.postcode)) localityParts.push(address.postcode!.trim());
  const localityLine = localityParts.join(' ').trim();
  const countryLine = nonEmpty(address.country) ? address.country!.trim() : '';

  const lines: string[] = [];
  if (streetLine) lines.push(streetLine);
  if (localityLine) lines.push(localityLine);
  if (countryLine) lines.push(countryLine);

  const uppercase = options?.uppercase === true;
  const result = lines.join('\n');
  return uppercase ? result.toUpperCase() : result;
}

/** Supported region codes for region-specific address display. */
export type AddressRegion = 'AU';

/**
 * Formats an address for display in a given region (e.g. Australian state codes, conventions).
 * Falls back to addressToString for unknown regions.
 */
export function formatAddressForRegion(
  address: Address,
  region: AddressRegion
): string {
  if (region === 'AU') {
    const streetLine = addressToStreetString(address);
    const stateFormatted = formatAustralianState(address);
    const localityParts: string[] = [];
    if (nonEmpty(address.suburb)) localityParts.push(address.suburb!.trim());
    if (stateFormatted) localityParts.push(stateFormatted);
    if (nonEmpty(address.postcode))
      localityParts.push(address.postcode!.trim());
    const localityLine = localityParts.join(' ').trim();
    const countryLine = nonEmpty(address.country)
      ? address.country!.trim()
      : '';
    const parts = [streetLine, localityLine, countryLine].filter(Boolean);
    return parts.join(', ');
  }
  return addressToString(address);
}
