## MODIFIED Requirements

### Requirement: Manual-entry modal presents a form and commits an Address

The component SHALL provide a modal that contains a form for entering address fields. The form SHALL collect data that can be represented as an `Address`. The form SHALL include one form control for each of the following `Address` fields: `building_name`, `level`, `unit`, `lot_no`, `street_number`, `street_name`, `street_type`, `street_suffix`, `suburb`, `state`, `postcode`, `country`. The form SHALL NOT include controls for `place_id`, `latitude`, or `longitude`.

The **Country** field SHALL be implemented as a **select** control populated from the configured countries catalog (e.g. `data.countries`).

The **State** field SHALL be implemented as:

- a **select** control when the selected country has a configured list of states/territories available from the configured regions mechanism (e.g. `await data.regions(countryCode)` resolves to a dataset), and
- a **plain text input** when the selected country has no configured state list (e.g. `data.regions` is absent, or resolves to `undefined` for that country),

so that users can still enter a state/province/region for any country.

All other listed fields SHALL use text inputs as before.

On submit (e.g. "Save" or "Apply"), the component SHALL build an `Address` from the entered values (including only non-empty trimmed values for each field), SHALL set the selected address to that value, SHALL invoke the selection callback (`onChange`) with that address, SHALL close the modal, and SHALL update the input display using the active format provider. The modal SHALL be dismissible (e.g. Escape or cancel button) without committing; in that case the address and input value SHALL NOT change.

#### Scenario: Country is a select populated from configured countries catalog

- **WHEN** the manual-entry modal is open
- **THEN** the Country field SHALL be rendered as a select (dropdown) control
- **THEN** the select SHALL be populated from the configured countries catalog (e.g. `data.countries`)
- **THEN** the user SHALL be able to choose one country from the list

#### Scenario: State is a select when regions dataset resolves for selected country

- **WHEN** the manual-entry modal is open and the user has selected a country
- **AND** the configured regions mechanism resolves a non-undefined dataset for that country (e.g. `data.regions(code)` resolves to a dataset)
- **THEN** the State field SHALL be rendered as a select (dropdown) control
- **THEN** the select SHALL be populated with the states/territories for that country
- **THEN** the user SHALL be able to choose one state from the list or leave it unset

#### Scenario: State is a text input when regions dataset is not available

- **WHEN** the manual-entry modal is open and the user has selected a country
- **AND** the configured regions mechanism has no dataset for that country (e.g. `data.regions` is absent or resolves to `undefined`)
- **THEN** the State field SHALL be rendered as a plain text input (not a select)
- **THEN** the user SHALL be able to type any state, province, or region name
- **THEN** the value SHALL be stored in `Address.state` as entered (trimmed)

### Requirement: Manual-entry shows a loading state while resolving regions dataset

When the component needs to determine whether State should be a select and/or to populate State options for a selected country, and the regions dataset is resolved asynchronously (e.g. via `data.regions(countryCode)`), the manual-entry form SHALL present a loading state while resolution is pending.

#### Scenario: State control indicates loading during regions resolution

- **WHEN** the manual-entry modal is open
- **AND** the user selects a country
- **AND** the component begins resolving the regions dataset for that country via an async mechanism
- **THEN** the State control SHALL indicate a loading state until the resolution completes

#### Scenario: State control updates after regions resolution completes

- **WHEN** the regions dataset resolution completes for the selected country
- **THEN** the State control SHALL update to a select if a dataset was resolved, otherwise remain (or become) a text input
