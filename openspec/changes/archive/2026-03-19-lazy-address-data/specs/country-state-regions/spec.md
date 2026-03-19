## MODIFIED Requirements

### Requirement: Library exports per-country constants with regions

The library SHALL export at least one constant per configured country that has a state list: `AUSTRALIA` and `UNITED_STATES`. Each SHALL be a single object with `code`, `name`, and region keys (e.g. `NEW_SOUTH_WALES`, `CALIFORNIA`) whose values are `Region` objects. The library SHALL NOT require consumers to import a single eager aggregate of all configured countries-with-regions in order to use `AddressInput`.

#### Scenario: Australia constant is a single object with regions

- **WHEN** the consumer imports the Australia constant (e.g. `AUSTRALIA`)
- **THEN** it SHALL have `code: 'AU'` and `name: 'Australia'`
- **THEN** it SHALL have region keys (e.g. `NEW_SOUTH_WALES`, `VICTORIA`) whose values are `Region` objects
- **THEN** the consumer SHALL be able to use `AUSTRALIA` as the country and `AUSTRALIA.NEW_SOUTH_WALES` (or other region key) as the region in prefill or accept

#### Scenario: AddressInput does not require eager countries-with-regions aggregation

- **WHEN** a consumer uses `AddressInput` without importing any per-country region constants
- **THEN** the component SHALL still render a Country select populated from a canonical countries list
- **THEN** the component SHALL obtain any state list via the configured data mechanism (e.g. `data.regions`) rather than requiring an eager `COUNTRIES` map that embeds all regions

### Requirement: Library provides a canonical list of countries

The library SHALL provide a list of countries suitable for use in a Country select (e.g. manual-entry form). Each entry SHALL include a stable code (e.g. ISO 3166-1 alpha-2) and a display name. The canonical list SHALL be exposed to `AddressInput` via the `data` mechanism (e.g. `data.countries`). The canonical list SHALL NOT require importing per-country regions datasets.

#### Scenario: Countries list is available without regions datasets

- **WHEN** the library is used (e.g. via package exports)
- **THEN** a list of countries (code + name) SHALL be available for the manual-entry form
- **THEN** the list SHALL include at least Australia and United States
- **THEN** providing the countries list SHALL NOT require importing region/state datasets for configured countries

### Requirement: Library provides optional states per country

The library SHALL provide a way to obtain a list of states/territories for a given country when such a list is configured. The primary mechanism used by `AddressInput` SHALL be the `data` mechanism (e.g. `data.regions(countryCode)`), which MAY resolve the dataset lazily. For countries whose dataset is not available, the lookup SHALL return a value that indicates "no state list" (e.g. `undefined`), so the UI can show a plain text input for state instead of a select.

#### Scenario: States are available for Australia

- **WHEN** the consumer or component requests states for Australia (e.g. by country code "AU") through the configured data mechanism
- **THEN** the library SHALL return (or resolve to) a list of state/territory options (e.g. code and/or name)
- **THEN** the list SHALL be non-empty and SHALL include the Australian states and territories (e.g. NSW, VIC, QLD, SA, WA, TAS, NT, ACT)

#### Scenario: No state list for unconfigured country

- **WHEN** the consumer or component requests states for a country that has no configured state list
- **THEN** the library SHALL return (or resolve to) a value that indicates "no state list" (e.g. `undefined`)
- **THEN** the manual-entry form SHALL use this to render a plain text input for State instead of a select
