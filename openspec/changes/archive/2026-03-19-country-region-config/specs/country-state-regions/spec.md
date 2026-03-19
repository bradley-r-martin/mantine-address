# country-state-regions — Delta (country-region-config)

## ADDED Requirements

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

The library SHALL export at least one constant per configured country that has a state list: `AUSTRALIA` and `UNITED_STATES`. Each SHALL be a single object with `code`, `name`, and region keys (e.g. `NEW_SOUTH_WALES`, `CALIFORNIA`) whose values are `Region` objects. The canonical countries list (`COUNTRIES`) SHALL expose the same object references for those countries (e.g. `COUNTRIES.AU === AUSTRALIA`). The library SHALL NOT export separate `REGIONS` or `REGIONS_US` records.

#### Scenario: Australia constant is a single object with regions

- **WHEN** the consumer imports the Australia constant (e.g. `AUSTRALIA`)
- **THEN** it SHALL have `code: 'AU'` and `name: 'Australia'`
- **THEN** it SHALL have region keys (e.g. `NEW_SOUTH_WALES`, `VICTORIA`) whose values are `Region` objects
- **THEN** the consumer SHALL be able to use `AUSTRALIA` as the country and `AUSTRALIA.NEW_SOUTH_WALES` (or other region key) as the region in prefill or accept

#### Scenario: COUNTRIES references same object as per-country export

- **WHEN** the consumer accesses `COUNTRIES.AU` or `COUNTRIES.US`
- **THEN** the value SHALL be the same object reference as the exported `AUSTRALIA` or `UNITED_STATES` constant respectively
- **THEN** that object SHALL include region properties as defined for the per-country export

## MODIFIED Requirements

### Requirement: Library provides a canonical list of countries

The library SHALL provide a list of countries suitable for use in a Country select (e.g. manual-entry form). Each entry SHALL include a stable code (e.g. ISO 3166-1 alpha-2) and a display name. The list SHALL be exposed so that the manual-entry form and optionally consumers can use it. The list SHALL be ordered in a consistent way (e.g. by display name) for display in a select. Entries for countries with configured regions (e.g. Australia, United States) MAY be the same object references as the exported per-country constants (e.g. `AUSTRALIA`, `UNITED_STATES`).

#### Scenario: Countries list is available

- **WHEN** the library is used (e.g. via package exports)
- **THEN** a list of countries (code + name) SHALL be available for the manual-entry form
- **THEN** the list SHALL include at least Australia and United States

#### Scenario: Countries list can be used to populate a select

- **WHEN** the manual-entry form renders the Country control
- **THEN** the control SHALL be a select populated from the canonical countries list
- **THEN** each option SHALL be selectable and SHALL provide a value that can be stored in `Address.country` (e.g. code or name as defined by implementation)

### Requirement: Library provides optional states per country

The library SHALL provide a way to obtain a list of states/territories for a given country when such a list is configured. State options SHALL be derived from the country object: when the canonical country entry (e.g. from `COUNTRIES[code]`) has keys other than `code` and `name`, those keys SHALL be treated as region entries and their values (of type `Region`) SHALL be used to build the list (e.g. abbreviation and name, sorted). For countries whose entry has no such keys, the lookup SHALL return a value that indicates "no state list" (e.g. `undefined` or empty), so the UI can show a plain text input for state instead of a select. Initially, the library SHALL provide state lists for Australia and the United States only. The data SHALL be organized in files or modules (e.g. one per country) as a single config object per country (country identity plus region keys) so that adding more countries in the future does not require changing the component structure.

#### Scenario: States are available for Australia

- **WHEN** the consumer or component requests states for Australia (e.g. by country code "AU")
- **THEN** the library SHALL return a list of state/territory options (e.g. code and/or name)
- **THEN** the list SHALL be non-empty and SHALL include the Australian states and territories (e.g. NSW, VIC, QLD, SA, WA, TAS, NT, ACT)

#### Scenario: States are available for United States

- **WHEN** the consumer or component requests states for United States (e.g. by country code "US")
- **THEN** the library SHALL return a list of state/territory options (e.g. code and/or name)
- **THEN** the list SHALL be non-empty and SHALL include the US states (and optionally territories) as defined by the implementation

#### Scenario: No state list for unconfigured country

- **WHEN** the consumer or component requests states for a country that has no configured state list (e.g. any country other than Australia and United States in the initial implementation)
- **THEN** the library SHALL return a value that indicates "no state list" (e.g. `undefined` or a documented sentinel)
- **THEN** the manual-entry form SHALL use this to render a plain text input for State instead of a select

#### Scenario: State data is extensible

- **WHEN** a maintainer adds state data for a new country (e.g. Canada)
- **THEN** the data SHALL be addable via a dedicated file or module (e.g. one config object per country) without changing the component's structure
- **THEN** the existing API for "states for country" (e.g. `getStatesForCountry(code)`) SHALL support the new country once that country's entry in the canonical list carries region keys
