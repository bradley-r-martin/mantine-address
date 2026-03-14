## ADDED Requirements

### Requirement: AddressLookupProvider interface is defined

The library SHALL export a TypeScript interface `AddressLookupProvider` with two required async methods: `getSuggestions` and `getDetails`.

#### Scenario: Interface is importable

- **WHEN** a consumer writes `import type { AddressLookupProvider } from 'mantine-address-input'`
- **THEN** TypeScript resolves the interface without error

---

### Requirement: getSuggestions returns a list of lightweight suggestions

`getSuggestions(input: string): Promise<AddressSuggestion[]>` SHALL accept a partial address string and return a promise resolving to an array of `AddressSuggestion` objects. Each `AddressSuggestion` MUST contain at minimum an opaque `id: string` and a human-readable `label: string`. It MAY include an optional `matchedSubstrings` field supplying highlight ranges.

#### Scenario: Successful suggestion fetch

- **WHEN** `getSuggestions("100 Broad")` is called on a valid provider implementation
- **THEN** the returned promise resolves with an array of objects each having `id` and `label` fields

#### Scenario: No matches found

- **WHEN** `getSuggestions("zzzznonexistent")` is called
- **THEN** the returned promise resolves with an empty array (not a rejection)

---

### Requirement: AddressSuggestion supports optional matched substring data

`AddressSuggestion` SHALL include an optional `matchedSubstrings` field of type `Array<{ offset: number; length: number }>`. When present, each entry describes a byte-offset range within `label` that corresponds to a portion matched by the user's input. Providers that do not have this information SHALL omit the field.

#### Scenario: Provider supplies matchedSubstrings

- **WHEN** a suggestion is returned with `matchedSubstrings: [{ offset: 0, length: 3 }]`
- **THEN** TypeScript accepts the object as a valid `AddressSuggestion`

#### Scenario: Provider omits matchedSubstrings

- **WHEN** a suggestion is returned without a `matchedSubstrings` field
- **THEN** TypeScript accepts the object as a valid `AddressSuggestion`

---

### Requirement: getDetails returns structured address data

`getDetails(id: string): Promise<AddressDetails>` SHALL accept the opaque `id` from an `AddressSuggestion` and return a promise resolving to an `AddressDetails` object containing structured address fields.

#### Scenario: Successful detail fetch

- **WHEN** `getDetails("place_id_abc")` is called with a valid suggestion id
- **THEN** the returned promise resolves with an `AddressDetails` object containing at minimum `streetAddress`, `city`, `state`, `postalCode`, and `country` fields

#### Scenario: Invalid id

- **WHEN** `getDetails("invalid_id")` is called
- **THEN** the returned promise rejects with an error

---

### Requirement: AddressDetails type is defined and exported

The library SHALL export an `AddressDetails` interface that includes structured postal address fields. All fields MUST be typed as `string` or `string | undefined` to accommodate APIs with varying completeness.

#### Scenario: AddressDetails shape

- **WHEN** a consumer implements `AddressLookupProvider` and returns an `AddressDetails` from `getDetails`
- **THEN** TypeScript enforces the presence of `streetAddress`, `city`, `state`, `postalCode`, and `country` fields

---

### Requirement: Custom providers can be implemented by consumers

Any object satisfying the `AddressLookupProvider` interface SHALL work with the address autocomplete component regardless of the underlying service.

#### Scenario: Mock provider in tests

- **WHEN** a test creates an object with `getSuggestions` and `getDetails` returning controlled data
- **THEN** the object satisfies `AddressLookupProvider` and can be passed to the address component without TypeScript errors
