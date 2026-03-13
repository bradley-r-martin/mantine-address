# Design: Address standard format

## Context

The library provides a Mantine-based address autocomplete component. Today it uses a minimal `AddressDetails` type (streetAddress, city, state, postalCode, country) and a single adapter (Google Places) that maps Google address components into that flat shape. There is no shared address model for structured fields (unit, street number, street type, etc.), no standardised string formatters, and no clear separation between uniform data and region-specific display. To support multiple providers and consistent behaviour, we need a **uniform** canonical Address (region-agnostic), formatting that operates on that object, and an adapter contract so provider-specific parsing stays inside adapters. Region-specific rules (e.g. Australian) belong in optional transformers for display or validation, not in the Address type itself.

## Goals / Non-Goals

**Goals:**

- Single **uniform** canonical `Address` type used everywhere; region-agnostic; no provider-specific or region-specific fields in the type.
- Standardised address-to-string formatters that accept the uniform `Address` (order, optional fields, separators, envelope/postal formatting).
- Adapter contract: `getDetails(id)` returns `Address`; adapters map provider response → uniform `Address` only.
- Optional **region-specific transformers** for display and validation (e.g. Australian): helpers that consume the uniform Address and produce region-specific formatted strings or validation; the Address object stays uniform.

**Non-Goals:**

- Implementing new autocomplete providers (Mapbox, Loqate, etc.); only defining the contract and updating the existing Google adapter.
- Enforcing one geocoding service; the design is provider-agnostic.
- Full postal-authority validation or deliverability checks; focus is internal consistency and normalisation.

## Decisions

### 1. Canonical Address shape

**Decision:** Define an `Address` interface with optional string fields for: `place_id`, `building_name`, `level`, `unit`, `lot_no`, `street_number`, `street_name`, `street_type`, `street_suffix`, `suburb`, `state`, `postcode`, `country`, and optional `latitude`/`longitude` (number or undefined).

**Rationale:** One internal representation keeps UI, APIs, and storage aligned. Optional fields accommodate varying provider completeness. Coordinates support mapping/display without tying the model to a specific provider.

**Alternatives considered:** Keeping a flat `AddressDetails` and adding a separate “full” type was rejected to avoid two competing models. Making every field required was rejected because many providers omit unit, building name, etc.

### 2. AddressDetails vs Address

**Decision:** Replace `AddressDetails` with `Address` in the public API. Optionally export a type alias `AddressDetails = Address` for one release to ease migration, then remove it; or document migration and break cleanly.

**Rationale:** One canonical type reduces confusion. Alias gives consumers a short migration path; clean break keeps the API simple.

**Alternatives considered:** Keeping both and having adapters return “Address (extends AddressDetails)” was rejected to avoid duplicate concepts.

### 3. Formatting utilities location and signatures

**Decision:** Provide `addressToString(address)`, `addressToStreetString(address)`, and `addressToEnvelopeString(address)` as pure functions in a dedicated module (e.g. `formatAddress` or `addressFormatting`). Options (e.g. uppercase for envelope) can be passed as a second parameter or options object if needed.

**Rationale:** Single place for formatting rules; easy to test and reuse. Inline/single-line vs multi-line envelope are the main variants the proposal calls out.

**Alternatives considered:** Methods on an Address class would couple data and formatting; keeping formatting in each adapter would duplicate logic.

### 4. Adapter contract

**Decision:** `AddressLookupAdapter.getDetails(id)` returns `Promise<Address>`. Adapters receive provider-specific responses and return only the canonical `Address`. No export of Google/Mapbox/etc. types from the package; adapter implementations live in the package or in consumer code and depend on provider SDKs there.

**Rationale:** Application and UI code depend only on `Address`; provider changes or new providers don’t require changes outside adapters.

**Alternatives considered:** Returning a generic “address-like” object was rejected in favour of a single strong type.

### 5. Uniform Address vs region-specific transformers

**Decision:** The canonical `Address` type is **uniform and region-agnostic**. Region-specific logic (e.g. Australian street type abbreviations, state codes, postcode validation) lives in **optional transformers** that consume the uniform Address and produce region-specific display strings or validation results. Ship an Australian module as the first example: constants/mappings (street types, suffixes, state codes, postcode rules) and optional formatter/validator helpers that take an `Address` and return region-specific output. The Address object itself is never “Australian” or “US”—it is always the same shape; region applies only at display/validation time.

**Rationale:** Keeps one source of truth for address data; region-specific behaviour is a layer on top, so adding more regions (e.g. US, UK) does not change the core type.

**Alternatives considered:** Putting region-specific fields on Address was rejected so the object stays uniform. Putting AU logic only in the Google adapter was rejected so any adapter or formatter can use region transformers.

## Risks / Trade-offs

- **Risk:** Breaking change for existing consumers using `AddressDetails` and the current adapter return type.  
  **Mitigation:** Document migration (field mapping from old flat shape to `Address`); consider temporary `AddressDetails` alias and deprecation notice.

- **Risk:** Google adapter may not expose all canonical fields (e.g. unit, level) from Place Details.  
  **Mitigation:** Adapter sets only what the API provides; remaining fields stay undefined; formatters handle missing fields.

- **Risk:** Region-specific transformers (e.g. AU) may not be needed for all consumers.  
  **Mitigation:** Keep region logic in separate modules; document that they are optional layers that consume the uniform Address; tree-shake where possible.

- **Trade-off:** Rich `Address` type may be more than minimal UIs need.  
  **Mitigation:** Formatters and UI can use only the fields they need; optional fields default to undefined.

## Migration Plan

1. Introduce `Address` type and formatting utilities; add tests and Storybook examples using `Address`.
2. Update `AddressLookupAdapter` so `getDetails` returns `Promise<Address>`; update `AddressAutocomplete` so `onAddressSelect` receives `Address`.
3. Change `GooglePlacesAdapter` to map Google Place result → uniform `Address`. Use region-specific transformers only when producing display strings or validation, not when building the Address object.
4. Replace or alias `AddressDetails`: either remove and document migration, or export `AddressDetails = Address` and deprecate the name, then remove in a later major.
5. Update all internal tests and stories to use `Address` and new formatters; run full test suite and manual checks.

**Rollback:** Revert adapter and type changes; restore `AddressDetails` and previous adapter return type. Formatting and AU modules can remain as additive if not yet wired.

## Open Questions

- Whether to ship a temporary `AddressDetails` compatibility alias and for how long.
- Whether envelope formatter should accept options (e.g. line separator, uppercase on/off) in this change or add later.
- Exact list of AU state codes and postcode rules to ship (e.g. 4-digit only vs ranges) to be confirmed during implementation.
- Whether region-specific formatters are separate functions (e.g. `formatAddressForAustralia`) or options on the base formatters (e.g. `addressToEnvelopeString(address, { region: 'AU' })`).
