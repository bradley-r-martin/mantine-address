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

The component SHALL provide a modal that contains a form for entering address fields. The form SHALL collect data that can be represented as an `Address`. The form SHALL include one form control for each of the following `Address` fields: `building_name`, `level`, `unit`, `lot_no`, `street_number`, `street_name`, `street_type`, `street_suffix`, `suburb`, `state`, `postcode`, `country`. The form SHALL NOT include controls for `place_id`, `latitude`, or `longitude`. The **Country** field SHALL be implemented as a **select** control populated from the library's canonical list of countries. The **State** field SHALL be implemented as a **select** control when the selected country has a configured list of states/territories (e.g. Australia, United States), and SHALL be implemented as a **plain text input** when the selected country has no configured state list, so that users can still enter a state/province/region for any country. All other listed fields SHALL use text inputs as before. The form SHALL be laid out in a responsive grid with fields in the following order and structure: Row 1 (3 columns): Unit, Lot no, Level; Row 2 (full width): Building name; Row 3 (2 columns): Street number, Street name; Row 4 (2 columns): Street type, Street suffix; Row 5 (2 columns): Suburb, Postcode; Row 6 (2 columns): State, Country. Multi-column rows SHALL distribute space evenly; Building name SHALL span the full width of the form. On submit (e.g. "Save" or "Apply"), the component SHALL build an `Address` from the entered values (including only non-empty trimmed values for each field), SHALL set the selected address to that value, SHALL invoke the selection callback (`onChange`) with that address, SHALL close the modal, and SHALL update the input display using the active format provider. The modal SHALL be dismissible (e.g. Escape or cancel button) without committing; in that case the address and input value SHALL NOT change.

#### Scenario: User submits the manual form

- **WHEN** the user fills the manual-entry form and submits (e.g. clicks "Save")
- **THEN** the component sets the current address to the entered `Address` (all collected fields with non-empty values)
- **THEN** `onChange` is called with that address
- **THEN** the modal closes
- **THEN** the input displays the address via the active format provider

#### Scenario: User cancels or dismisses the modal

- **WHEN** the user closes the modal without submitting (e.g. Escape, overlay click, or "Cancel")
- **THEN** the current address and input value are unchanged
- **THEN** `onChange` is not called for the manual form

#### Scenario: Modal is accessible

- **WHEN** the manual-entry modal is open
- **THEN** focus is contained within the modal (e.g. focus trap) and the modal can be closed with Escape or an explicit cancel action

#### Scenario: Form includes all Address fields except place_id and coordinates

- **WHEN** the manual-entry modal is open
- **THEN** the form SHALL display inputs for: building_name, level, unit, lot_no, street_number, street_name, street_type, street_suffix, suburb, state, postcode, country
- **THEN** the form SHALL NOT display inputs for place_id, latitude, or longitude

#### Scenario: Form uses grid layout with specified field order

- **WHEN** the manual-entry modal is open
- **THEN** the form SHALL display fields in a grid with Row 1: Unit, Lot no, Level (3 columns); Row 2: Building name (full width); Row 3: Street number, Street name (2 columns); Row 4: Street type, Street suffix (2 columns); Row 5: Suburb, Postcode (2 columns); Row 6: State, Country (2 columns)
- **THEN** Building name SHALL span the full width of the form
- **THEN** multi-column rows SHALL distribute space evenly

#### Scenario: Country is a select

- **WHEN** the manual-entry modal is open
- **THEN** the Country field SHALL be rendered as a select (dropdown) control
- **THEN** the select SHALL be populated from the library's canonical list of countries (e.g. code and/or name)
- **THEN** the user SHALL be able to choose one country from the list

#### Scenario: State is a select when country has state list

- **WHEN** the manual-entry modal is open and the user has selected a country that has a configured list of states (e.g. Australia or United States)
- **THEN** the State field SHALL be rendered as a select (dropdown) control
- **THEN** the select SHALL be populated with the states/territories for that country
- **THEN** the user SHALL be able to choose one state from the list or leave it unset

#### Scenario: State is a text input when country has no state list

- **WHEN** the manual-entry modal is open and the user has selected a country that has no configured list of states (e.g. any country other than Australia and United States in the initial implementation)
- **THEN** the State field SHALL be rendered as a plain text input (not a select)
- **THEN** the user SHALL be able to type any state, province, or region name
- **THEN** the value SHALL be stored in `Address.state` as entered (trimmed)

## Requirements

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
