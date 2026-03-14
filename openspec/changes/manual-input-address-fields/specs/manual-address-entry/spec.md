## MODIFIED Requirements

### Requirement: Manual-entry modal presents a form and commits an Address

The component SHALL provide a modal that contains a form for entering address fields. The form SHALL collect data that can be represented as an `Address`. The form SHALL include one form control for each of the following `Address` fields: `building_name`, `level`, `unit`, `lot_no`, `street_number`, `street_name`, `street_type`, `street_suffix`, `suburb`, `state`, `postcode`, `country`. The form SHALL NOT include controls for `place_id`, `latitude`, or `longitude`. On submit (e.g. "Save" or "Apply"), the component SHALL build an `Address` from the entered values (including only non-empty trimmed values for each field), SHALL set the selected address to that value, SHALL invoke the selection callback (`onChange`) with that address, SHALL close the modal, and SHALL update the input display using the active format provider. The modal SHALL be dismissible (e.g. Escape or cancel button) without committing; in that case the address and input value SHALL NOT change.

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
