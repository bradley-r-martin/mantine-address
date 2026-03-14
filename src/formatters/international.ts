import type { Address } from '../types';
import type { AddressFormatAdapter, AddressToEnvelopeOptions } from './types';
import { buildStreetLine, nonEmpty, joinParts } from './utilities';

function toString(address: Address): string {
  const streetLine = buildStreetLine(address);
  const localityParts: string[] = [];
  if (nonEmpty(address.suburb)) localityParts.push(address.suburb!.trim());
  if (nonEmpty(address.state)) localityParts.push(address.state!.trim());
  if (nonEmpty(address.postcode)) localityParts.push(address.postcode!.trim());
  if (nonEmpty(address.country)) localityParts.push(address.country!.trim());
  const localityLine = localityParts.join(' ').trim();
  return joinParts([streetLine, localityLine].filter(Boolean), ', ');
}

function toEnvelope(
  address: Address,
  options?: AddressToEnvelopeOptions
): string {
  const streetLine = buildStreetLine(address);
  const localityParts: string[] = [];
  if (nonEmpty(address.suburb)) localityParts.push(address.suburb!.trim());
  if (nonEmpty(address.state)) localityParts.push(address.state!.trim());
  if (nonEmpty(address.postcode)) localityParts.push(address.postcode!.trim());
  const localityLine = localityParts.join(' ').trim();
  const countryLine = nonEmpty(address.country) ? address.country!.trim() : '';
  const lines = [streetLine, localityLine, countryLine].filter(Boolean);
  const result = lines.join('\n');
  return options?.uppercase ? result.toUpperCase() : result;
}

/**
 * International formatter: single-line and envelope conventions (street, then locality
 * with suburb, state, postcode, country).
 */
export const international: AddressFormatAdapter = {
  toString,
  toEnvelope,
};
