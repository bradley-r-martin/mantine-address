## ADDED Requirements

### Requirement: Region-specific logic consumes the uniform Address only

Australian (and any future region-specific) behaviour SHALL operate on the uniform canonical `Address` type. The Address object itself SHALL NOT be region-specific; region logic SHALL be implemented as transformers or validation helpers that take an `Address` and return region-specific display strings or validation results. This capability provides the first region example (Australian); other regions may be added later using the same pattern.

#### Scenario: Australian helpers accept Address

- **WHEN** code calls an Australian formatting or validation helper
- **THEN** the input is the uniform `Address` type; the helper does not require or produce a different address shape

#### Scenario: Address object has no region field

- **WHEN** an adapter or consumer constructs an `Address`
- **THEN** the object has no region or country-specific variant; it is the same uniform type everywhere

---

### Requirement: Australian street type mapping is available for display/validation

The library SHALL provide a shared mapping or set of Australian street types (e.g. St, Ave, Rd, Dr, Pl, Ct) that can be used by **region-specific transformers** for display or validation. This SHALL be exposed as constants or a module (e.g. `AU_STREET_TYPES` or similar) so formatters or validators can produce Australian-style output when given the uniform Address.

#### Scenario: Street type constant is usable by transformers

- **WHEN** a region-specific formatter or validator needs to format or validate street type for Australian display
- **THEN** it can use the shared street type mapping (e.g. "Street" → "St") without changing the Address object

#### Scenario: Mapping used for display only

- **WHEN** an adapter or formatter produces output targeted at Australian conventions
- **THEN** it may use the shared street type mapping to format the uniform Address for display; the stored/returned Address remains uniform

---

### Requirement: Australian street suffix mapping is available for display/validation

The library SHALL provide a shared mapping or set of Australian street suffixes (e.g. N, S, E, W, NE, NW, SE, SW) for use by region-specific transformers. This SHALL be exposed as constants or a module so formatters or validators can produce consistent Australian-style output when given the uniform Address.

#### Scenario: Street suffix constant is usable

- **WHEN** code needs to format or validate street suffix for Australian display
- **THEN** it can use the shared suffix mapping without modifying the Address object

---

### Requirement: Australian state codes are defined for display/validation

The library SHALL provide Australian state/territory codes (e.g. NSW, VIC, QLD, SA, WA, TAS, NT, ACT) as a shared constant or list. This SHALL support region-specific validation or display formatting of the `state` field when targeting Australian addresses (the Address object still holds the uniform `state` value).

#### Scenario: State code used by region transformer

- **WHEN** a region-specific validator or formatter needs to validate or format state for Australian conventions
- **THEN** it can use the shared state codes (e.g. to map "New South Wales" to "NSW" for display or to validate "NSW") while the Address remains uniform

---

### Requirement: Australian postcode validation is available for region-specific validation

The library SHALL provide a way to validate Australian postcodes (e.g. 4-digit numeric) for use by region-specific validators. This MAY be a regex, a validation function, or a constant pattern. Validation SHALL consume the uniform Address (or its `postcode` field) and return a region-specific result; it SHALL NOT change the Address type.

#### Scenario: Postcode validation for AU

- **WHEN** code validates an address for Australian delivery
- **THEN** it uses the shared postcode rule (e.g. 4 digits) on the uniform Address; the Address object is unchanged

---

### Requirement: Australian address regex or validation helper is available

The library SHALL provide a shared regex or validation helper for Australian address lines (e.g. for street line format) so that region-specific validation or display can be applied consistently. These helpers SHALL consume the uniform Address (or its fields) and SHALL NOT require a region-specific address type.

#### Scenario: AU address regex used by validator

- **WHEN** a region-specific validator or formatter needs to validate an Australian address component
- **THEN** it can use the shared regex or validation helper from the Australian address module, operating on the uniform Address
