import type { Address } from '../types';

/**
 * Shared utilities for formatters. Use these to avoid duplication and keep formatter code consistent.
 */

/**
 * Type guard: true when the value is a non-empty string (after trim).
 */
export function nonEmpty(value: string | undefined): value is string {
  return value != null && String(value).trim() !== '';
}

/**
 * Joins parts with the given separator, omits empty entries, and collapses duplicate separators.
 * Useful for single-line address formatting (e.g. street line, locality line with ", ").
 */
export function joinParts(parts: string[], separator: string): string {
  return parts
    .filter(Boolean)
    .join(separator)
    .replace(/\s*,\s*,/g, ',')
    .trim();
}

/**
 * Builds the street-level line: unit, building, level, lot, street number, name, type, suffix.
 * Omits suburb, state, postcode, country. Shared by international and australian formatters.
 */
export function buildStreetLine(address: Address): string {
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
