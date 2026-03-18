## Why

The current restrictions API uses arrays (`allowedCountries`, `allowedRegions`, `allowedStates`, `allowedPostcodes`, `allowedSuburbs`) and supports multiple countries and regions. The Google Places API only supports a single country for `componentRestrictions` and uses at most one region for location bias. Supporting multiples adds complexity without real provider benefit and confuses the mental model. Simplifying to one country and one region/state, exposed via a single `accept` prop, aligns the public API with provider capabilities and makes the component easier to use and maintain.

## What Changes

- **New prop `accept`**: Optional `accept?: { country?: string | Country; region?: string | Region }`. When set, only addresses in that country (and optionally that region/state) are accepted. Replaces the existing `restrictions` prop for country and region/state filtering.
- **BREAKING**: Remove the `restrictions` prop and the `AddressRestrictions` type in its current form. Consumers must migrate to `accept`.
- **BREAKING**: Remove support for multiple allowed countries, multiple allowed regions/states, and for `allowedPostcodes` and `allowedSuburbs`. Use cases that need postcode or suburb filtering must be implemented by the consumer (e.g. validate after selection).
- Validation and provider behavior: one country (passed to Google as `componentRestrictions.country` with a single-element array), one region (used for location bias and state validation). Manual-entry form: Country select shows only the accepted country when `accept.country` is set; State select shows only the accepted region’s state when `accept.region` is set.
- Internal refactor: `addressSatisfiesRestrictions` (or equivalent) and `GetSuggestionsOptions` use the new single-country, single-region shape. GooglePlacesProvider and any other providers receive this shape.

## Capabilities

### New Capabilities

None. This change simplifies an existing capability.

### Modified Capabilities

- `address-restrictions`: Requirements change to a single optional `accept` prop with optional `country` and `region`; remove support for multiple countries/regions and for postcode/suburb restrictions.
- `manual-address-entry`: Manual form country and state options are driven by `accept.country` and `accept.region` (single values) instead of `restrictions.allowedCountries` / `allowedRegions` / `allowedStates`.

## Impact

- **Public API**: New `accept` prop on `AddressInput`; removal of `restrictions` and `AddressRestrictions`. Exported types: introduce `AcceptAddress` (or similar) and update or remove `AddressRestrictions` / `GetSuggestionsOptions.restrictions`. Breaking change for any consumer using `restrictions`.
- **Internal**: `src/types.ts`, `src/restrictions.ts`, `src/AddressInput.tsx`, `src/providers/GooglePlacesProvider.ts`; all tests and stories that pass `restrictions` or assert on postcode/suburb/multi-country/multi-region behavior.
- **Specs**: `openspec/specs/address-restrictions/spec.md` and `openspec/specs/manual-address-entry/spec.md` updated to describe `accept` and single country/region semantics.
- **Non-goals**: No change to Mantine version compatibility. Testing and Storybook scope limited to updated behavior for `accept`; no new unrelated features.

## Non-Goals

- Supporting multiple countries or regions in the same component instance.
- Built-in postcode or suburb filtering (consumers may validate externally).
- Backward compatibility layer for the old `restrictions` prop (clean break in a major version).
