import { describe, it, expectTypeOf } from 'vitest';
import type {
  AddressLookupAdapter,
  AddressSuggestion,
  AddressDetails,
} from './types';

describe('AddressLookupAdapter type', () => {
  it('accepts a plain object implementing the interface', () => {
    const mockAdapter = {
      getSuggestions: (): Promise<AddressSuggestion[]> =>
        Promise.resolve([{ id: 'id1', label: 'label1' }]),
      getDetails: (): Promise<AddressDetails> =>
        Promise.resolve({
          streetAddress: '123 Main St',
          city: 'Springfield',
          state: 'IL',
          postalCode: '62701',
          country: 'US',
        }),
    };

    expectTypeOf(mockAdapter).toMatchTypeOf<AddressLookupAdapter>();
  });

  it('AddressSuggestion has id and label', () => {
    expectTypeOf<AddressSuggestion>().toHaveProperty('id');
    expectTypeOf<AddressSuggestion>().toHaveProperty('label');
  });

  it('AddressSuggestion is valid with matchedSubstrings', () => {
    const withMatches: AddressSuggestion = {
      id: 'id1',
      label: '123 Main St',
      matchedSubstrings: [{ offset: 0, length: 3 }],
    };
    expectTypeOf(withMatches).toMatchTypeOf<AddressSuggestion>();
  });

  it('AddressSuggestion is valid without matchedSubstrings', () => {
    const withoutMatches: AddressSuggestion = {
      id: 'id1',
      label: '123 Main St',
    };
    expectTypeOf(withoutMatches).toMatchTypeOf<AddressSuggestion>();
  });

  it('AddressDetails has required fields', () => {
    expectTypeOf<AddressDetails>().toHaveProperty('streetAddress');
    expectTypeOf<AddressDetails>().toHaveProperty('city');
    expectTypeOf<AddressDetails>().toHaveProperty('state');
    expectTypeOf<AddressDetails>().toHaveProperty('postalCode');
    expectTypeOf<AddressDetails>().toHaveProperty('country');
  });
});
