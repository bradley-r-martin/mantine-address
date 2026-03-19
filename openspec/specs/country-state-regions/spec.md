### Requirement: Country type allows region properties

The library SHALL define the `Country` type such that each country has required `code` and `name` (strings) and MAY have additional keys whose values are `Region` objects. The type SHALL use an index signature (e.g. `[key: string]: string | Region`) so that a single type covers both countries without regions (only `code` and `name`) and countries with regions (e.g. `AUSTRALIA` with `NEW_SOUTH_WALES`, `VICTORIA`, etc.). The library SHALL NOT introduce a separate type or union for "country with regions."

#### Scenario: Country type includes code and name

- **WHEN** the consumer uses the `Country` type or a value typed as `Country`
- **THEN** the value SHALL have `code` and `name` of type string
- **THEN** the value MAY have additional string keys whose values are of type `Region`

#### Scenario: Regions are accessed as properties of the country object

- **WHEN** the consumer uses a country constant that has regions (e.g. Australia, United States)
- **THEN** each region SHALL be accessible as a named property on that country object (e.g. `AUSTRALIA.NEW_SOUTH_WALES`)
- **THEN** the same object SHALL be usable as both the country (e.g. for `prefill.country` or `accept.country`) and the source of regions (e.g. `prefill.region = AUSTRALIA.NEW_SOUTH_WALES`)

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

#### Scenario: Countries list is available

- **WHEN** the library is used (e.g. via package exports)
- **THEN** a list of countries (code + name) SHALL be available for the manual-entry form
- **THEN** the list SHALL include at least Australia and United States
- **THEN** providing the countries list SHALL NOT require importing region/state datasets for configured countries

#### Scenario: Countries list can be used to populate a select

- **WHEN** the manual-entry form renders the Country control
- **THEN** the control SHALL be a select populated from the canonical countries list
- **THEN** each option SHALL be selectable and SHALL provide a value that can be stored in `Address.country` (e.g. code or name as defined by implementation)

### Requirement: Library provides optional states per country

The library SHALL provide a way to obtain a list of states/territories for a given country when such a list is configured. The primary mechanism used by `AddressInput` SHALL be the `data` mechanism (e.g. `data.regions(countryCode)`), which MAY resolve the dataset lazily. For countries whose dataset is not available, the lookup SHALL return a value that indicates "no state list" (e.g. `undefined`), so the UI can show a plain text input for state instead of a select. Initially, the library SHALL provide state lists for Australia and the United States only. The data SHALL be organized in files or modules (e.g. one per country) as a single config object per country (country identity plus region keys) so that adding more countries in the future does not require changing the component structure.

#### Scenario: States are available for Australia

- **WHEN** the consumer or component requests states for Australia (e.g. by country code "AU") through the configured data mechanism
- **THEN** the library SHALL return a list of state/territory options (e.g. code and/or name)
- **THEN** the list SHALL be non-empty and SHALL include the Australian states and territories (e.g. NSW, VIC, QLD, SA, WA, TAS, NT, ACT)

#### Scenario: States are available for United States

- **WHEN** the consumer or component requests states for United States (e.g. by country code "US")
- **THEN** the library SHALL return a list of state/territory options (e.g. code and/or name)
- **THEN** the list SHALL be non-empty and SHALL include the US states (and optionally territories) as defined by the implementation

#### Scenario: No state list for unconfigured country

- **WHEN** the consumer or component requests states for a country that has no configured state list (e.g. any country other than Australia and United States in the initial implementation)
- **THEN** the library SHALL return a value that indicates "no state list" (e.g. `undefined`)
- **THEN** the manual-entry form SHALL use this to render a plain text input for State instead of a select

#### Scenario: State data is extensible

- **WHEN** a maintainer adds state data for a new country (e.g. Canada)
- **THEN** the data SHALL be addable via a dedicated file or module (e.g. one config object per country) without changing the component's structure
- **THEN** the existing API for "states for country" (e.g. `getStatesForCountry(code)`) SHALL support the new country once that country's entry in the canonical list carries region keys
