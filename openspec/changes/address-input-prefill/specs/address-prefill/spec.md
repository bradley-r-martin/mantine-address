# address-prefill Specification

## Purpose

Define the `prefill` prop on `AddressInput` so that the manual-entry form can be prefilled with optional use of `Country` and `Region` constants (e.g. `prefill={{ country: COUNTRIES.AU, state: REGIONS.NEW_SOUTH_WALES }}`), with all manual fields supported and with clear precedence when used alongside `defaultAddress`.

## Requirements

### Requirement: AddressInput accepts an optional prefill prop

The component SHALL accept an optional prop `prefill` that provides initial values for the manual-entry form when the user opens the manual-entry modal. The type SHALL allow partial address fields as in `Address`, with the following differences: `country` SHALL accept `string | Country`, and `state` SHALL accept `string | Region`. All other fields (e.g. building_name, level, unit, street_number, street_name, suburb, postcode) SHALL accept `string` as in `Address`. When a value is a `Country` object, the component SHALL use its `code` for the form’s country field; when a value is a `Region` object, the component SHALL use its `abbreviation` for the form’s state field. Only fields present in `prefill` (and, when applicable, in `defaultAddress` per precedence below) SHALL be pre-filled; others SHALL remain empty unless provided by `defaultAddress`.

#### Scenario: Prefill with Country and Region constants

- **WHEN** a consumer passes `prefill={{ country: COUNTRIES.AU, state: REGIONS.NEW_SOUTH_WALES }}` and the user opens the manual-entry modal
- **THEN** the Country field SHALL display the value corresponding to Australia (code AU) and the State field SHALL display the value corresponding to NSW (abbreviation from REGIONS.NEW_SOUTH_WALES)
- **THEN** other fields not provided in `prefill` (or `defaultAddress`) SHALL be empty

#### Scenario: Prefill with string country and state

- **WHEN** a consumer passes `prefill={{ country: 'AU', state: 'NSW' }}` and the user opens the manual-entry modal
- **THEN** the Country and State fields SHALL display AU and NSW (or their display equivalents) as with string-only defaults
- **THEN** behavior SHALL be consistent with providing the same codes via `defaultAddress`

#### Scenario: Prefill does not set component value

- **WHEN** the component is uncontrolled and the consumer passes `prefill={{ country: COUNTRIES.AU }}` without selecting or entering an address
- **THEN** the displayed input value (before the user opens the modal or selects an address) SHALL NOT show the prefill; the component value remains null until the user selects or enters an address
- **THEN** when the user opens the manual-entry modal, the form SHALL show the prefilled country

#### Scenario: All manual fields can be prefilled

- **WHEN** the consumer passes `prefill` with one or more of: building_name, level, unit, lot_no, street_number, street_name, street_type, street_suffix, suburb, state, postcode, country
- **THEN** each provided field SHALL be used as the initial value for the corresponding form control when the modal opens (with Country/Region resolved to codes as above)
- **THEN** fields not included in `prefill` (and not in `defaultAddress`) SHALL have empty initial values

### Requirement: Prefill takes precedence over defaultAddress for overlapping fields

When both `prefill` and `defaultAddress` are provided, the component SHALL compute initial form values per field: if a field is present in `prefill`, use the value from `prefill` (resolving Country/Region to code/abbreviation); otherwise use the value from `defaultAddress` if present. Fields in neither SHALL remain empty.

#### Scenario: Prefill overrides defaultAddress for same field

- **WHEN** the consumer passes `defaultAddress={{ country: 'US' }}` and `prefill={{ country: COUNTRIES.AU }}` and the user opens the manual-entry modal
- **THEN** the Country field SHALL display Australia (AU), not US

#### Scenario: defaultAddress fills fields not in prefill

- **WHEN** the consumer passes `defaultAddress={{ street_name: 'Main St' }}` and `prefill={{ country: COUNTRIES.AU }}` and the user opens the manual-entry modal
- **THEN** the Country field SHALL display Australia and the Street name field SHALL display "Main St"

### Requirement: Storybook Prefill group documents prefill with constants

The Storybook story group **Prefill** under AddressInput SHALL document the `prefill` prop. Stories SHALL prefer and demonstrate constant-based usage (e.g. `prefill={{ country: COUNTRIES.AU, state: REGIONS.NEW_SOUTH_WALES }}`) over string-only usage. At least one story SHALL show prefill with country and region constants; additional stories MAY show partial prefill (e.g. country only) or prefill together with other props.

#### Scenario: Prefill story group exists under AddressInput

- **WHEN** a developer runs or builds Storybook
- **THEN** a navigable **Prefill** group SHALL appear under AddressInput (e.g. `AddressInput/Prefill` or `AddressInput/Prefill/...`)
- **THEN** at least one story SHALL use `prefill` with `Country` and/or `Region` constants (e.g. from `COUNTRIES`, `REGIONS`, or equivalent imports)
