export interface AddressSuggestion {
  id: string;
  label: string;
  /** Byte-offset ranges within `label` that matched the user's input. Optional — omit if the adapter does not provide this data. */
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

export interface AddressLookupAdapter {
  getSuggestions(input: string): Promise<AddressSuggestion[]>;
  getDetails(id: string): Promise<Address>;
}
