import type {
  Address,
  AddressLookupProvider,
  AddressSuggestion,
} from '@/types';

export const STUB_SUGGESTIONS: AddressSuggestion[] = [
  { id: 'id1', label: '123 Main St, Springfield, IL 62701, USA' },
  { id: 'id2', label: '123 Main Ave, Chicago, IL 60601, USA' },
  { id: 'id3', label: '123 Main Blvd, Peoria, IL 61602, USA' },
];

export const STUB_ADDRESS: Address = {
  street_number: '123',
  street_name: 'Main St',
  suburb: 'Springfield',
  state: 'IL',
  postcode: '62701',
  country: 'US',
};

export const mockProvider: AddressLookupProvider = {
  getSuggestions: async (input: string) => {
    if (!input) return [];
    await new Promise((r) => setTimeout(r, 200));
    return STUB_SUGGESTIONS.filter((s) =>
      s.label.toLowerCase().includes(input.toLowerCase())
    );
  },
  getDetails: async () => {
    await new Promise((r) => setTimeout(r, 100));
    return STUB_ADDRESS;
  },
};

export const emptyProvider: AddressLookupProvider = {
  getSuggestions: async () => {
    await new Promise((r) => setTimeout(r, 200));
    return [];
  },
  getDetails: async () => ({}),
};
