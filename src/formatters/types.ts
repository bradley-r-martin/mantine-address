import type { Address } from '../types';

/** Options for envelope-style (multi-line) formatting. */
export interface AddressToEnvelopeOptions {
  /** Apply uppercase to lines (e.g. for postal envelope conventions). Default false. */
  uppercase?: boolean;
}

/**
 * Adapter for converting an Address into text. AddressInput uses toString() for display.
 * Display-only: does not restrict which addresses can be selected.
 */
export interface AddressFormatAdapter {
  /** Single-line full address string. Used by AddressInput for display. */
  toString(address: Address): string;
  /** Multi-line envelope format (street line, locality line, country). */
  toEnvelope(address: Address, options?: AddressToEnvelopeOptions): string;
}
