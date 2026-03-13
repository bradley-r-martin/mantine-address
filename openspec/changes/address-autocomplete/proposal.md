## Why

The `mantine-address-input` component currently renders a basic text field with no address intelligence. Consumers need a turnkey autocomplete experience that surfaces real address suggestions as the user types, without having to wire up a lookup service themselves.

The initial autocomplete implementation is functional but lacks polish: there is no feedback while suggestions are loading, no visual indication when a query returns no results, and no way for the dropdown to highlight which part of each suggestion matched what the user typed.

## What Changes

- Introduce an `AddressAutocomplete` component (or extend the existing component) that renders a Mantine `Autocomplete` input and displays address suggestions in real time.
- Implement a **lookup service adapter pattern** so any address API can be plugged in without coupling the component to a single provider.
- Ship a first-party `GooglePlacesAdapter` that wraps the Google Places Autocomplete API.
- Export the adapter interface (`AddressLookupAdapter`) and the `GooglePlacesAdapter` so consumers can build custom adapters.
- **Show a loading indicator** in the input while `getSuggestions` is in flight so users have feedback during network requests.
- **Highlight matched substrings** in dropdown suggestion labels when the adapter supplies match offset data, helping users visually confirm relevance.
- **Display a "no results" message** in the dropdown when the adapter returns an empty suggestions array for a non-empty query, so users know the search ran but found nothing.

## Capabilities

### New Capabilities

- `address-autocomplete`: Core autocomplete component that accepts a lookup adapter, renders address suggestions via Mantine `Autocomplete`, surfaces selected address data to the consumer, shows a loading indicator while fetching, highlights matched substrings in results, and displays a no-results message when the adapter returns an empty array.
- `lookup-adapter`: Adapter interface and contract for plugging in address lookup services (`AddressLookupAdapter` type + `getSuggestions` / `getDetails` methods). `AddressSuggestion` includes an optional `matchedSubstrings` field for highlight data.
- `google-places-adapter`: Concrete adapter implementing `AddressLookupAdapter` against the Google Places Autocomplete API (requires a Google API key passed by the consumer). Populates `matchedSubstrings` from the Places API prediction data.

### Modified Capabilities

_(none — no existing spec-level requirements are changing)_

## Impact

- **New exports**: `AddressAutocomplete` component, `AddressLookupAdapter` interface, `GooglePlacesAdapter` class.
- **`AddressSuggestion` type update**: Adds optional `matchedSubstrings?: Array<{ offset: number; length: number }>` field — backwards-compatible; adapters that don't supply it simply omit the field.
- **Mantine peer dependency**: Uses `Autocomplete` and `Loader` from `@mantine/core`; existing peer dep range covers this.
- **External dependency**: `GooglePlacesAdapter` relies on the Google Maps JavaScript SDK loaded on the page — no new npm dependency.
- **Tests**: Unit tests covering loading state, match highlighting render, and no-results message; mock adapter controls timing and return values.
- **Storybook**: Updated stories demonstrating loading state, highlighted suggestions, and empty-results state.

## Non-goals

- Supporting additional lookup services beyond Google Places in this change (adapter pattern makes future additions straightforward).
- Providing a geocoding or reverse-geocoding API.
- Server-side rendering support for the Google Places SDK (relies on browser globals).
- Testing against live Google APIs in CI.
- Virtualized or paginated suggestion lists.
