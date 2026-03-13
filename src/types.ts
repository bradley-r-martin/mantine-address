export interface AddressSuggestion {
  id: string;
  label: string;
  /** Byte-offset ranges within `label` that matched the user's input. Optional — omit if the adapter does not provide this data. */
  matchedSubstrings?: Array<{ offset: number; length: number }>;
}

export interface AddressDetails {
  streetAddress: string | undefined;
  city: string | undefined;
  state: string | undefined;
  postalCode: string | undefined;
  country: string | undefined;
}

export interface AddressLookupAdapter {
  getSuggestions(input: string): Promise<AddressSuggestion[]>;
  getDetails(id: string): Promise<AddressDetails>;
}
