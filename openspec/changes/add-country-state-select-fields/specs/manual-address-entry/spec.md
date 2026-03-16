## MODIFIED Requirements

### Requirement: Manual-entry modal presents a form and commits an Address

The component SHALL provide a modal that contains a form for entering address fields. The form SHALL collect data that can be represented as an `Address`. The form SHALL include one form control for each of the following `Address` fields: `building_name`, `level`, `unit`, `lot_no`, `street_number`, `street_name`, `street_type`, `street_suffix`, `suburb`, `state`, `postcode`, `country`. The form SHALL NOT include controls for `place_id`, `latitude`, or `longitude`. The **Country** field SHALL be implemented as a **select** control populated from the library’s canonical list of countries. The **State** field SHALL be implemented as a **select** control when the selected country has a configured list of states/territories (e.g. Australia, United States), and SHALL be implemented as a **plain text input** when the selected country has no configured state list, so that users can still enter a state/province/region for any country. All other listed fields SHALL use text inputs as before. The form SHALL be laid out in a responsive grid with fields in the following order and structure: Row 1 (3 columns): Unit, Lot no, Level; Row 2 (full width): Building name; Row 3 (2 columns): Street number, Street name; Row 4 (2 columns): Street type, Street suffix; Row 5 (2 columns): Suburb, Postcode; Row 6 (2 columns): State, Country. Multi-column rows SHALL distribute space evenly; Building name SHALL span the full width of the form. On submit (e.g. "Save" or "Apply"), the component SHALL build an `Address` from the entered values (including only non-empty trimmed values for each field), SHALL set the selected address to that value, SHALL invoke the selection callback (`onChange`) with that address, SHALL close the modal, and SHALL update the input display using the active format provider. The modal SHALL be dismissible (e.g. Escape or cancel button) without committing; in that case the address and input value SHALL NOT change.

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
- **THEN** the select SHALL be populated from the library’s canonical list of countries (e.g. code and/or name)
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
