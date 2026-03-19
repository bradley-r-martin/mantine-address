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
 * Optional accept filter: at most one country and one region/state.
 * When set, only addresses matching the given country (and optionally region) are accepted.
 * Use with AddressInput and provider getSuggestions options.
 */
export interface AcceptAddress {
  /** Allowed country (ISO 3166-1 alpha-2 code or Country object). */
  country?: string | Country;
  /** Allowed region/state (abbreviation or Region object; Region provides location for provider bias). */
  region?: string | Region;
}

/**
 * Optional prefill for the manual-entry form. Same shape as partial Address except
 * country and state accept Country/Region objects so consumers can use constants
 * (e.g. prefill={{ country: COUNTRIES.AU, state: REGIONS.NEW_SOUTH_WALES }}).
 */
export interface PrefillAddress {
  building_name?: string;
  level?: string;
  unit?: string;
  lot_no?: string;
  street_number?: string;
  street_name?: string;
  street_type?: string;
  street_suffix?: string;
  suburb?: string;
  state?: string | Region;
  postcode?: string;
  country?: string | Country;
}

/** Options passed to getSuggestions so providers can filter server-side (e.g. by country). */
export interface GetSuggestionsOptions {
  accept?: AcceptAddress;
}

export interface AddressLookupProvider {
  /**
   * Fetch address suggestions for the given input.
   * When options.accept is provided, the provider may use it to filter results
   * (e.g. Google Places componentRestrictions by country). Client-side validation
   * still runs on selection; this allows providers to reduce irrelevant suggestions.
   */
  getSuggestions(
    input: string,
    options?: GetSuggestionsOptions
  ): Promise<AddressSuggestion[]>;
  getDetails(id: string): Promise<Address>;
}
