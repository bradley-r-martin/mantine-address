import { describe, it, expectTypeOf } from 'vitest';
import type {
  Address,
  AddressLookupAdapter,
  AddressSuggestion,
  AddressDetails,
} from './types';

describe('Address type', () => {
  it('Address has optional canonical fields', () => {
    expectTypeOf<Address>().toHaveProperty('place_id');
    expectTypeOf<Address>().toHaveProperty('building_name');
    expectTypeOf<Address>().toHaveProperty('level');
    expectTypeOf<Address>().toHaveProperty('unit');
    expectTypeOf<Address>().toHaveProperty('lot_no');
    expectTypeOf<Address>().toHaveProperty('street_number');
    expectTypeOf<Address>().toHaveProperty('street_name');
    expectTypeOf<Address>().toHaveProperty('street_type');
    expectTypeOf<Address>().toHaveProperty('street_suffix');
    expectTypeOf<Address>().toHaveProperty('suburb');
    expectTypeOf<Address>().toHaveProperty('state');
    expectTypeOf<Address>().toHaveProperty('postcode');
    expectTypeOf<Address>().toHaveProperty('country');
    expectTypeOf<Address>().toHaveProperty('latitude');
    expectTypeOf<Address>().toHaveProperty('longitude');
  });

  it('AddressDetails is alias for Address', () => {
    const addr: Address = { suburb: 'Sydney', state: 'NSW', country: 'AU' };
    const asDetails: AddressDetails = addr;
    expectTypeOf(asDetails).toMatchTypeOf<Address>();
  });
});

describe('AddressLookupAdapter type', () => {
  it('accepts a plain object implementing the interface', () => {
    const mockAdapter = {
      getSuggestions: (): Promise<AddressSuggestion[]> =>
        Promise.resolve([{ id: 'id1', label: 'label1' }]),
      getDetails: (): Promise<Address> =>
        Promise.resolve({
          street_number: '123',
          street_name: 'Main',
          street_type: 'St',
          suburb: 'Springfield',
          state: 'IL',
          postcode: '62701',
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
});
