## ADDED Requirements

### Requirement: Formatters operate on the uniform Address

All address formatters SHALL accept the uniform canonical `Address` type. They SHALL NOT require or produce a region-specific address shape. Region-specific display (e.g. Australian abbreviations or postal format) SHALL be implemented as optional transformers or options that consume the same uniform Address.

#### Scenario: Formatter input is uniform Address

- **WHEN** a consumer calls `addressToString(address)` or any other address formatter
- **THEN** the argument is the uniform `Address` type; the formatter does not depend on region

---

### Requirement: addressToString produces a single-line address string

The library SHALL export a function `addressToString(address: Address): string` that formats an `Address` into a single-line string. The function SHALL concatenate present fields in a defined order (e.g. unit/building/level, street components, suburb, state, postcode, country) with appropriate separators and SHALL omit undefined or empty fields.

#### Scenario: Full address formatted to single line

- **WHEN** `addressToString` is called with an address that has unit, street number, street name, street type, suburb, state, postcode, and country
- **THEN** the result is a single string with those components in standard order and no leading/trailing separator artifacts

#### Scenario: Minimal address

- **WHEN** `addressToString` is called with an address that has only street and suburb
- **THEN** the result includes only those present fields and no extra separators for missing fields

---

### Requirement: addressToStreetString produces street-only line

The library SHALL export a function `addressToStreetString(address: Address): string` that returns only the street-level components (e.g. unit, building, level, lot, street number, name, type, suffix) in a consistent format, omitting suburb, state, postcode, and country.

#### Scenario: Street line from full address

- **WHEN** `addressToStreetString` is called with an address containing unit, street number, street name, and street type
- **THEN** the result is a string containing only those street-level parts in standard order

#### Scenario: No street components

- **WHEN** `addressToStreetString` is called with an address that has no street fields set
- **THEN** the result is an empty string or equivalent (e.g. empty string)

---

### Requirement: addressToEnvelopeString produces multi-line postal format

The library SHALL export a function `addressToEnvelopeString(address: Address): string` (or equivalent name) that formats the address for envelope/postal use. The output SHALL use newlines between logical lines (e.g. street line, then suburb/state/postcode line, then country if present). The function SHALL support optional uppercase formatting for postal conventions when specified (e.g. via options parameter).

#### Scenario: Envelope with multiple lines

- **WHEN** `addressToEnvelopeString` is called with an address that has street, suburb, state, postcode, and country
- **THEN** the result contains at least two lines: street line and locality line, with country on its own line if present

#### Scenario: Envelope with optional uppercase

- **WHEN** the envelope formatter is invoked with an option to use uppercase for postal format
- **THEN** the output applies uppercase to the relevant lines according to the defined behaviour

---

### Requirement: Formatting uses consistent separators and field order

All address formatters SHALL use consistent rules for separators (e.g. comma, space) and field order. Optional fields SHALL be included only when present; formatters MUST NOT emit placeholder text for missing fields.

#### Scenario: No duplicate or stray separators

- **WHEN** an address has adjacent optional fields where one is missing
- **THEN** the formatted string has no double commas or leading/trailing separators

#### Scenario: Defined field order

- **WHEN** documentation or tests describe the order of components
- **THEN** the implementation follows that order (e.g. unit, building, level, lot, street number, street name, street type, street suffix, then suburb, state, postcode, country)
