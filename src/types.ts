import type { Country, Region } from './regions';

export interface AddressSuggestion {
  id: string;
  label: string;
  /** Byte-offset ranges within `label` that matched the user's input. Optional — omit if the provider does not provide this data. */
  matchedSubstrings?: Array<{ offset: number; length: number }>;
}

/**
 * Uniform canonical address type. Region-agnostic; same shape for all addresses.
 * All fields optional to accommodate varying provider completeness.
 */
export interface Address {
  place_id?: string;
  building_name?: string;
  level?: string;
  unit?: string;
  lot_no?: string;
  street_number?: string;
  street_name?: string;
  street_type?: string;
  street_suffix?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

/**
 * @deprecated Use `Address` instead. This alias is provided for migration and will be removed in a future major version.
 * @see Address
 */
export type AddressDetails = Address;

/**
 * Optional restrictions to limit which addresses are acceptable.
 * All comparisons use normalised values (trim, case-insensitive for codes/labels).
 * An address is allowed only if it satisfies every non-empty restriction (AND semantics).
 * When using allowedRegions (e.g. [REGIONS.NEW_SOUTH_WALES]), also set allowedCountries (e.g. [COUNTRIES.AU]).
 */
export interface AddressRestrictions {
  /** Allowed countries (e.g. [COUNTRIES.AU, COUNTRIES.NZ]). Required when using allowedRegions. */
  allowedCountries?: (string | Country)[];
  /** Allowed state/territory codes (e.g. ['NSW', 'VIC']). */
  allowedStates?: string[];
  /** Allowed regions (state/province with location bias). Use with allowedCountries. */
  allowedRegions?: Region[];
  /** Allowed postcode strings. */
  allowedPostcodes?: string[];
  /** Allowed suburb names. */
  allowedSuburbs?: string[];
}

/** Options passed to getSuggestions so providers can filter server-side (e.g. by country). */
export interface GetSuggestionsOptions {
  restrictions?: AddressRestrictions;
}

export interface AddressLookupProvider {
  /**
   * Fetch address suggestions for the given input.
   * When options.restrictions is provided, the provider may use it to filter results
   * (e.g. Google Places componentRestrictions by country). Client-side validation
   * still runs on selection; this allows providers to reduce irrelevant suggestions.
   */
  getSuggestions(
    input: string,
    options?: GetSuggestionsOptions
  ): Promise<AddressSuggestion[]>;
  getDetails(id: string): Promise<Address>;
}
