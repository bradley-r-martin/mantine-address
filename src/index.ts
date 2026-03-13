export { AddressInput } from './AddressInput';
export type { AddressInputProps } from './AddressInput';

export { AddressAutocomplete } from './AddressAutocomplete';
export type {
  AddressAutocompleteProps,
  AddressAutocompleteRef,
} from './AddressAutocomplete';

export { GooglePlacesAdapter } from './adapters/GooglePlacesAdapter';

export {
  addressToString,
  addressToStreetString,
  addressToEnvelopeString,
  formatAddressForRegion,
} from './formatAddress';
export type { AddressToEnvelopeOptions, AddressRegion } from './formatAddress';

export type {
  Address,
  AddressSuggestion,
  AddressDetails,
  AddressLookupAdapter,
} from './types';

export {
  AU_STREET_TYPES,
  AU_STREET_SUFFIXES,
  AU_STATE_CODES,
  AU_STATE_NAMES_TO_CODES,
  AU_POSTCODE_REGEX,
  validateAustralianPostcode,
  isAustralianAddress,
  formatAustralianState,
  validateAustralianState,
  validateAustralianAddress,
} from './regions/australian-address';
export type {
  AuStreetSuffix,
  AuStateCode,
  AustralianAddressValidation,
} from './regions/australian-address';
