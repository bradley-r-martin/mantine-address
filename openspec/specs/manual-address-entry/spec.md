# manual-address-entry Specification

## Purpose

Define manual address entry behavior: modal form, field controls, loading states for async region data, and defaults.

## Requirements

### Requirement: AddressInput accepts preventManualEntry prop

The component SHALL accept an optional boolean prop `preventManualEntry`. When omitted, it SHALL default to `false`. This prop SHALL only have effect when a provider is supplied. When a provider is set and `preventManualEntry` is `false` or omitted, the component SHALL allow the user to set an address via a manual-entry modal (e.g. by selecting "Enter manually" when the provider returns no results). When a provider is set and `preventManualEntry` is `true`, the component SHALL NOT show an "Enter manually" option in the dropdown and SHALL NOT allow opening the manual-entry modal from the dropdown. When no provider is supplied, the component SHALL always operate in manual-only mode: the input SHALL be enabled and focus or click SHALL open the manual-entry modal; the `preventManualEntry` prop SHALL have no effect in that case.

#### Scenario: preventManualEntry defaults to false

- **WHEN** a consumer renders the component without passing `preventManualEntry` and a provider is set
- **THEN** manual entry is allowed (e.g. "Enter manually" appears when the provider returns no results)

#### Scenario: preventManualEntry is true with provider

- **WHEN** a consumer renders the component with `preventManualEntry={true}` and a provider is supplied
- **THEN** no "enter manually" option is shown when the provider returns no results
- **THEN** the user cannot open the manual-entry modal from the no-results dropdown

#### Scenario: preventManualEntry false with provider and no results

- **WHEN** the consumer has set `preventManualEntry={false}` (or left it default), a provider is configured, and the provider returns an empty array for a non-empty query
- **THEN** the dropdown SHALL show an option that allows the user to enter an address manually (e.g. "Enter manually")
- **THEN** selecting that option SHALL open the manual-entry modal

#### Scenario: No provider — manual-only regardless of preventManualEntry

- **WHEN** no provider is supplied (e.g. `provider={null}` or `provider={undefined}`)
- **THEN** the input SHALL NOT be disabled and SHALL NOT show a provider-required error
- **THEN** when the user clicks or focuses the input, the manual-entry modal SHALL open
- **THEN** the value of `preventManualEntry` has no effect (manual entry is always the only path)

---

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

### Requirement: Manual-entry form uses default address when opening

When the component receives a `defaultAddress` prop (or equivalent partial address for defaults), the manual-entry form SHALL use it to set the initial values of the corresponding form fields when the modal is opened. Only fields present in the default SHALL be pre-filled; all other fields SHALL start empty. This SHALL apply regardless of whether a provider is set or manual-only mode is used.

#### Scenario: Modal opens with default country and state

- **WHEN** the consumer has set `defaultAddress={{ country: 'AU', state: 'NSW' }}` and the user opens the manual-entry modal
- **THEN** the Country field SHALL display Australia (or the display value for code AU) and the State field SHALL display NSW (or the display value for code NSW)
- **THEN** the user MAY change these values or leave them and fill other fields

#### Scenario: Manual form country and state options respect accept

- **WHEN** the consumer has set `accept` with `country` and/or `region` and the user opens the manual-entry modal
- **THEN** the Country select SHALL list only the accepted country (if `accept.country` is provided), and the State select SHALL list only the accepted region's state (if `accept.region` is provided and the country has a state list)
- **THEN** on submit, the entered address SHALL be validated against `accept`; if invalid, the form SHALL show an error and SHALL NOT call `onChange`
