## ADDED Requirements

### Requirement: Library provides a canonical list of countries

The library SHALL provide a list of countries suitable for use in a Country select (e.g. manual-entry form). Each entry SHALL include a stable code (e.g. ISO 3166-1 alpha-2) and a display name. The list SHALL be exposed so that the manual-entry form and optionally consumers can use it. The list SHALL be ordered in a consistent way (e.g. by display name) for display in a select.

#### Scenario: Countries list is available

- **WHEN** the library is used (e.g. via package exports)
- **THEN** a list of countries (code + name) SHALL be available for the manual-entry form
- **THEN** the list SHALL include at least Australia and United States

#### Scenario: Countries list can be used to populate a select

- **WHEN** the manual-entry form renders the Country control
- **THEN** the control SHALL be a select populated from the canonical countries list
- **THEN** each option SHALL be selectable and SHALL provide a value that can be stored in `Address.country` (e.g. code or name as defined by implementation)

### Requirement: Library provides optional states per country

The library SHALL provide a way to obtain a list of states/territories for a given country when such a list is configured. For countries that have no configured state list, the lookup SHALL return a value that indicates “no state list” (e.g. `undefined` or empty), so the UI can show a plain text input for state instead of a select. Initially, the library SHALL provide state lists for Australia and the United States only. The data SHALL be organized in files or modules (e.g. one per country or region) so that adding more countries in the future does not require changing the component structure.

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
- **THEN** the library SHALL return a value that indicates “no state list” (e.g. `undefined` or a documented sentinel)
- **THEN** the manual-entry form SHALL use this to render a plain text input for State instead of a select

#### Scenario: State data is extensible

- **WHEN** a maintainer adds state data for a new country (e.g. Canada)
- **THEN** the data SHALL be addable via a dedicated file or module (e.g. similar to formatters layout) without changing the component’s structure
- **THEN** the existing API for “states for country” SHALL support the new country once registered
