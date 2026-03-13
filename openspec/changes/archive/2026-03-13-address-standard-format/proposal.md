# Address standard format

## Why

Address data is currently ingested from external autocomplete/geocoding providers (starting with Google Places). The address shape and string formatting logic are not yet standardised; they risk being tied to a single provider. To support multiple adapters (Google, Mapbox, Loqate, internal datasets) and keep UI and services consistent, we need a single canonical Address model and shared formatting and normalisation utilities. This change establishes that standard so the rest of the application never depends on provider-specific schemas.

## What Changes

- Introduce a **uniform canonical Address domain object** (replacing/extending the current minimal `AddressDetails`) with structured fields: `place_id`, building/level/unit/lot, street components, suburb, state, postcode, country, and optional coordinates. The object is **region-agnostic**—the same shape everywhere; no region-specific fields in the type.
- Add **standardised address-to-string formatting** that operates on the uniform Address: `addressToString`, `addressToStreetString`, `addressToEnvelopeString` with defined rules for optional fields, order, separators, and uppercase handling.
- Define an **adapter contract**: autocomplete adapters must map provider responses into the canonical Address only; no provider-specific types leak into the app.
- Add **region-specific transformers for display and validation** (e.g. Australian): optional helpers that consume the uniform Address and produce region-specific formatting or validation (street type/suffix mappings, state codes, postcode rules). The Address object itself remains uniform; region logic is only in these transformers.
- **BREAKING**: `AddressLookupAdapter.getDetails` will return the new canonical `Address` type. `AddressDetails` will be replaced or become a compatibility alias. Public API will export `Address` and the new formatting utilities; component `onAddressSelect` will receive `Address`.

## Capabilities

### New Capabilities

- `address-model`: Uniform canonical Address interface (region-agnostic); single internal representation for all address data; exported from the package.
- `address-formatting`: Standard address-to-string formatters (`addressToString`, `addressToStreetString`, `addressToEnvelopeString`) that accept the uniform Address; rules for field order, optional fields, separators, and postal uppercase.
- `australian-address`: Region-specific transformers for display and validation (Australian as first example): street type/suffix mappings, state codes, postcode validation, and regex helpers that consume the uniform Address for region-specific output or validation—not part of the Address type itself.

### Modified Capabilities

- `lookup-adapter`: Contract updated so `getDetails` returns the canonical `Address` type; adapters must map provider responses to `Address` only.
- `address-autocomplete`: Component and types use `Address` (e.g. `onAddressSelect?(address: Address)`); exports aligned with canonical model.
- `google-places-adapter`: Implementation updated to map Google Place results into the canonical `Address` format.

## Impact

- **Public API**: New exports (`Address`, formatting functions, optional region-specific helpers); `AddressDetails` replaced or aliased; `onAddressSelect` and adapter return type change (breaking for consumers using `AddressDetails`).
- **Code**: New modules for uniform Address type, formatting (on uniform Address), and optional region-specific display/validation helpers; `GooglePlacesAdapter` and any tests/stories using address data updated to use `Address`.
- **Compatibility**: Mantine version compatibility unchanged; TypeScript strict mode and tree-shaking preserved. Consumers will need to migrate from `AddressDetails` to `Address` (migration path to be described in design/docs).

## Non-Goals

- This change does **not** implement a specific autocomplete provider beyond the existing Google adapter; it defines the contract and format so future adapters can be added.
- It does **not** enforce a single geocoding service or dictate which provider an application must use.
- It does **not** perform full address validation against postal authorities; the goal is internal consistency and normalisation, not certification of deliverability.
- Testing and Storybook scope: existing tests and stories will be updated to use `Address` and the new formatters; no new testing framework or Storybook add-ons are introduced.
