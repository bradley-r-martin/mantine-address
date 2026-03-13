## ADDED Requirements

### Requirement: Canonical Address interface is defined and exported

The library SHALL export a TypeScript interface `Address` that represents the single internal address representation. The Address type SHALL be **uniform and region-agnostic**: the same shape for all addresses regardless of country or region; no region-specific or provider-specific fields. All address fields SHALL be optional (`string | undefined` or `number | undefined` for coordinates) to accommodate varying provider completeness.

#### Scenario: Address type is importable

- **WHEN** a consumer writes `import type { Address } from 'mantine-address-input'`
- **THEN** TypeScript resolves the interface without error

---

### Requirement: Address includes place and building identifiers

The `Address` interface SHALL include optional fields: `place_id` (string), `building_name` (string), `level` (string), `unit` (string), and `lot_no` (string).

#### Scenario: Address with building details

- **WHEN** an adapter returns an address with `unit: "5"` and `building_name: "Tower A"`
- **THEN** the object conforms to the `Address` type and those fields are present

#### Scenario: Address without building details

- **WHEN** an adapter returns an address with only street and locality fields
- **THEN** `unit`, `level`, `building_name`, and `lot_no` may be undefined and the object still conforms to `Address`

---

### Requirement: Address includes street components

The `Address` interface SHALL include optional street fields: `street_number`, `street_name`, `street_type`, and `street_suffix` (all string).

#### Scenario: Address with full street components

- **WHEN** an address has `street_number: "123"`, `street_name: "Main"`, `street_type: "St"`
- **THEN** the object conforms to `Address` and formatters may use these for structured display

#### Scenario: Address with minimal street data

- **WHEN** only a combined street line is available from the provider
- **THEN** `street_number`, `street_name`, `street_type`, and `street_suffix` may be undefined

---

### Requirement: Address includes locality and country

The `Address` interface SHALL include optional fields: `suburb` (string), `state` (string), `postcode` (string), and `country` (string).

#### Scenario: Address with locality

- **WHEN** an address has `suburb`, `state`, `postcode`, and `country` set
- **THEN** the object conforms to `Address` and formatters may output suburb/state/postcode grouping

---

### Requirement: Address may include coordinates

The `Address` interface SHALL include optional `latitude` and `longitude` fields (number or undefined) for mapping or display purposes.

#### Scenario: Address with coordinates

- **WHEN** an adapter provides `latitude` and `longitude` from the provider response
- **THEN** the object conforms to `Address` and consumers may use them for maps or validation

#### Scenario: Address without coordinates

- **WHEN** coordinates are not available
- **THEN** `latitude` and `longitude` may be undefined and the object still conforms to `Address`

---

### Requirement: Address is the single uniform canonical type for address data

All adapters SHALL produce and all formatting utilities SHALL accept the same `Address` type. The Address object SHALL always be uniform; region-specific behaviour (e.g. Australian display or validation) SHALL be implemented as transformers or helpers that consume the uniform Address, not as part of the Address type. The library MUST NOT expose provider-specific address shapes from the public API.

#### Scenario: Adapter returns Address

- **WHEN** any `AddressLookupAdapter.getDetails` implementation resolves
- **THEN** the resolved value is typed as `Address`

#### Scenario: Formatter accepts Address

- **WHEN** a consumer calls `addressToString(address)` or other address formatters
- **THEN** the argument is typed as `Address`
