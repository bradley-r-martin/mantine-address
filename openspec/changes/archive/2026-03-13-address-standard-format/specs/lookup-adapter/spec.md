## MODIFIED Requirements

### Requirement: getDetails returns structured address data

`getDetails(id: string): Promise<Address>` SHALL accept the opaque `id` from an `AddressSuggestion` and return a promise resolving to the canonical `Address` object. Adapters MUST map provider-specific responses into the `Address` type only; they MUST NOT leak provider-specific types or fields into the application.

#### Scenario: Successful detail fetch

- **WHEN** `getDetails("place_id_abc")` is called with a valid suggestion id
- **THEN** the returned promise resolves with an `Address` object (with optional fields as defined by the address-model spec)

#### Scenario: Invalid id

- **WHEN** `getDetails("invalid_id")` is called
- **THEN** the returned promise rejects with an error

---

### Requirement: Canonical Address type is used by adapters

The library SHALL export the `Address` type as the single canonical address representation. `AddressLookupAdapter.getDetails` SHALL return `Promise<Address>`. All adapter implementations MUST transform their provider response into `Address` and MUST NOT return provider-specific shapes.

#### Scenario: Adapter returns Address shape

- **WHEN** a consumer implements `AddressLookupAdapter` and returns a value from `getDetails`
- **THEN** TypeScript enforces that the resolved value conforms to the `Address` interface

#### Scenario: No provider types in public API

- **WHEN** a consumer uses only types exported from the package (e.g. `Address`, `AddressLookupAdapter`)
- **THEN** they do not need to depend on any provider-specific types (e.g. Google Place types)

---

### Requirement: AddressDetails type is defined and exported

**Replaced by canonical Address.** The library SHALL export the canonical `Address` interface. The previous `AddressDetails` type (streetAddress, city, state, postalCode, country) is replaced by `Address`; the library MAY export a temporary type alias `AddressDetails = Address` for migration, to be removed in a later major.

#### Scenario: Address shape used by getDetails

- **WHEN** a consumer implements `AddressLookupAdapter` and returns an object from `getDetails`
- **THEN** TypeScript enforces that the object conforms to the `Address` interface (with fields such as place_id, unit, street_number, street_name, street_type, suburb, state, postcode, country, etc., all optional as per address-model)
