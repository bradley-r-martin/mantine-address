# Tasks: Address standard format

## 1. Uniform canonical Address type and exports

- [x] 1.1 Define the **uniform** `Address` interface in `src/types.ts` (or a dedicated address module) with optional fields: place_id, building_name, level, unit, lot_no, street_number, street_name, street_type, street_suffix, suburb, state, postcode, country, latitude, longitude; ensure the type is region-agnostic (no region-specific fields)
- [x] 1.2 Export `Address` from the package entry point; add or update type tests (e.g. in `src/types.test.ts`) to assert `Address` shape and that adapters/formatters use it
- [x] 1.3 Decide migration path for `AddressDetails`: either remove and document migration, or add `export type AddressDetails = Address` and deprecation note in JSDoc/README

## 2. Region-specific transformers (Australian example)

- [x] 2.1 Create a region-specific module (e.g. `src/regions/australian-address.ts`) with AU street type mapping, street suffix mapping, state codes (NSW, VIC, etc.), and postcode validation—all for use by **transformers** that consume the uniform Address (display/validation only; do not change the Address type)
- [x] 2.2 Expose Australian constants and optional formatter/validator helpers that take `Address` and return region-specific strings or validation results
- [x] 2.3 Add tests for AU constants and region-specific validation/display helpers

## 3. Address formatting utilities (uniform Address)

- [x] 3.1 Implement `addressToString(address: Address): string` that operates on the uniform Address; defined field order and separators; omit undefined/empty fields
- [x] 3.2 Implement `addressToStreetString(address: Address): string` for street-only line (unit, building, level, lot, street number, name, type, suffix)
- [x] 3.3 Implement `addressToEnvelopeString(address: Address, options?: { uppercase?: boolean }): string` for multi-line envelope format with optional uppercase
- [x] 3.4 Add unit tests for all three formatters (full address, minimal address, optional fields, envelope lines)
- [x] 3.5 Export formatters from package entry point; document that they accept the uniform Address (region-specific display can layer on via optional region transformers)

## 4. Adapter contract and lookup adapter types

- [x] 4.1 Update `AddressLookupAdapter` so `getDetails(id)` returns `Promise<Address>`; update `AddressDetails` references in the interface to `Address`
- [x] 4.2 Update type tests and any adapter mock types to use `Address` instead of `AddressDetails`

## 5. AddressAutocomplete and callbacks

- [x] 5.1 Update `AddressAutocomplete` props so `onAddressSelect?(address: Address)` receives the canonical `Address` type
- [x] 5.2 Export `Address` (and formatters) from the main entry; update README or JSDoc for breaking change and migration
- [x] 5.3 Update AddressAutocomplete tests and Storybook stories to use `Address` and new formatters where address data is asserted or displayed

## 6. Google Places adapter

- [x] 6.1 Refactor `GooglePlacesAdapter.getDetails` to map Google Place result (address_components, geometry if needed) into the **uniform** canonical `Address` type only; do not embed region-specific normalisation in the object—keep Address uniform; use region-specific transformers only when producing display strings if needed
- [x] 6.2 Ensure no Google-specific types or fields are present on the returned object; add or update unit tests for the mapped `Address` shape
- [x] 6.3 Update GooglePlacesAdapter tests and any Storybook examples that use Google adapter to expect uniform `Address` and optionally use formatters (or region transformers) in stories

## 7. Documentation and final checks

- [x] 7.1 Update README (and any API docs) to describe the **uniform** canonical `Address` type, formatting utilities (operating on uniform Address), optional region-specific transformers for display/validation, and adapter contract; document migration from `AddressDetails` if applicable
- [x] 7.2 Run full test suite and fix any failing tests; add or update Storybook stories that demonstrate `Address` and formatting (e.g. display formatted address on select)
- [x] 7.3 Bump major version or document breaking change in CHANGELOG for the `AddressDetails` → `Address` and `getDetails` return type change
