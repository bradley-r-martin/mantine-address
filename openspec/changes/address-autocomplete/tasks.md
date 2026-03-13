## 1. Types & Adapter Interface

- [x] 1.1 Define `AddressSuggestion`, `AddressDetails`, and `AddressLookupAdapter` types in `src/types.ts`
- [x] 1.2 Export all new types from the package entry point (`src/index.ts`)
- [x] 1.3 Write type-level tests (TypeScript compile checks) confirming a plain object implementing `AddressLookupAdapter` is accepted
- [x] 1.4 Add optional `matchedSubstrings?: Array<{ offset: number; length: number }>` field to `AddressSuggestion` type in `src/types.ts`
- [x] 1.5 Add type-level test confirming `AddressSuggestion` is valid both with and without `matchedSubstrings`

## 2. GooglePlacesAdapter

- [x] 2.1 Create `src/adapters/GooglePlacesAdapter.ts` with constructor accepting `{ apiKey: string }`
- [x] 2.2 Implement `getSuggestions(input)` using `window.google.maps.places.AutocompleteService`; map predictions to `AddressSuggestion[]`
- [x] 2.3 Implement `getDetails(id)` using `window.google.maps.places.PlacesService`; map address components to `AddressDetails`
- [x] 2.4 Add runtime guard — throw descriptive error if `window.google` is undefined in both methods
- [x] 2.5 Export `GooglePlacesAdapter` from the package entry point
- [x] 2.6 Write unit tests for `GooglePlacesAdapter` using a mocked `window.google.maps` (jsdom environment)
- [x] 2.7 Map `prediction.matched_substrings` from the Places API response to `AddressSuggestion.matchedSubstrings` in `getSuggestions`
- [x] 2.8 Update `GooglePlacesAdapter` unit tests to assert `matchedSubstrings` is correctly populated from mocked prediction data

## 3. AddressAutocomplete Component

- [x] 3.1 Create `src/AddressAutocomplete.tsx` with props interface `AddressAutocompleteProps` (adapter, onAddressSelect, debounce, forwarded Mantine props)
- [x] 3.2 Implement debounced `getSuggestions` call on input change (default 300 ms); populate Mantine `Autocomplete` `data` prop
- [x] 3.3 Implement `onOptionSubmit` handler — call `adapter.getDetails(id)` and invoke `onAddressSelect` with resolved `AddressDetails`
- [x] 3.4 Clear suggestions list when input is empty
- [x] 3.5 Export `AddressAutocomplete` from the package entry point
- [x] 3.6 Add `isLoading` state to `AddressAutocomplete`; set to `true` before calling `getSuggestions` and `false` when the promise settles (resolve or reject)
- [x] 3.7 Render a Mantine `<Loader size="xs" />` in the `rightSection` of the `Autocomplete` when `isLoading` is `true`; defer to consumer's `rightSection` prop when provided
- [x] 3.8 Add stale-request guard (sequence counter) so results from an outdated in-flight request are discarded when a newer request has been issued
- [x] 3.9 Implement `renderOption` in `AddressAutocomplete` that splits a suggestion label at `matchedSubstrings` offsets and wraps matched segments in a highlighted `<mark>` element; fall back to plain text when `matchedSubstrings` is absent
- [x] 3.10 Pass `nothingFoundMessage` prop to Mantine `Autocomplete` with default value `"No results found"`; only display it when `isLoading` is `false` and input is non-empty

## 4. Tests

- [x] 4.1 Write unit tests for `AddressAutocomplete` with a mock adapter: renders correctly, calls `getSuggestions` after debounce, calls `getDetails` on selection, invokes `onAddressSelect`
- [x] 4.2 Test that empty input clears suggestions and does not call `getSuggestions`
- [x] 4.3 Test that `onAddressSelect` omission does not throw on selection
- [x] 4.4 Test that Mantine forwarded props (label, placeholder, error) are applied to the underlying `Autocomplete`
- [x] 4.5 Test that a loading indicator is visible while `getSuggestions` is in flight and hidden after it resolves
- [x] 4.6 Test that the loading indicator is hidden when `getSuggestions` rejects
- [x] 4.7 Test that suggestions with `matchedSubstrings` render `<mark>` elements around the correct label segments
- [x] 4.8 Test that suggestions without `matchedSubstrings` render the label as plain text without `<mark>` elements
- [x] 4.9 Test that the no-results message appears when the adapter returns an empty array with a non-empty input and no in-flight request
- [x] 4.10 Test that the no-results message is NOT shown while a request is loading
- [x] 4.11 Test that the no-results message is NOT shown when the input is empty
- [x] 4.12 Test that a consumer-supplied `nothingFoundMessage` overrides the default

## 5. Storybook

- [x] 5.1 Create `src/AddressAutocomplete.stories.tsx` with a "With Mock Adapter" story using a stub adapter returning hardcoded suggestions
- [x] 5.2 Add a "With Google Places Adapter" story gated behind an `STORYBOOK_GOOGLE_MAPS_API_KEY` env variable (skips/disables if not set)
- [x] 5.3 Document `adapter` prop, `onAddressSelect` callback, and `debounce` prop in story argTypes
- [x] 5.4 Add a "Loading State" story where the mock adapter's `getSuggestions` returns a never-resolving promise so the loading indicator is always visible
- [x] 5.5 Add a "With Highlighted Matches" story where the mock adapter returns suggestions with `matchedSubstrings` populated, demonstrating the highlight rendering
- [x] 5.6 Add a "No Results" story where the mock adapter returns an empty array so the no-results message is visible in the dropdown

## 6. Documentation

- [x] 6.1 Update `README.md` with usage example showing `AddressAutocomplete` with `GooglePlacesAdapter`
- [x] 6.2 Document the custom adapter pattern with a minimal example in `README.md`
- [x] 6.3 Add a note about the Google Maps script loading requirement and API key restriction best practices
- [x] 6.4 Document `matchedSubstrings` in the adapter interface section of `README.md`, explaining how to populate it and that it is optional
- [x] 6.5 Document the `nothingFoundMessage` prop in the `AddressAutocomplete` API section of `README.md`
