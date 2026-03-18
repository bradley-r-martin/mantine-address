## ADDED Requirements

### Requirement: Component accepts default values for manual entry

The component SHALL accept an optional prop that provides default values for the manual-entry form. When the user opens the manual-entry modal, the form fields SHALL be pre-filled with these defaults where provided. Defaults SHALL apply only to the initial state of the manual form; they SHALL NOT change the component's `value` or `defaultValue` (the selected address). When no default is provided for a field, that field SHALL remain empty when the modal opens.

#### Scenario: Default address prop is provided

- **WHEN** a consumer passes a partial address as the default (e.g. `defaultAddress={{ country: 'AU', state: 'NSW' }}`) and the user opens the manual-entry modal
- **THEN** the Country field SHALL display the default country and the State field SHALL display the default state
- **THEN** other fields not present in the default SHALL be empty

#### Scenario: No default address prop

- **WHEN** the consumer does not pass a default and the user opens the manual-entry modal
- **THEN** all form fields SHALL be empty (or their previous modal session values if re-opened within same mount, as per current behaviour)

#### Scenario: Defaults do not set component value

- **WHEN** the component is uncontrolled with `defaultValue={null}` and the consumer passes `defaultAddress={{ country: 'AU' }}`
- **THEN** the displayed input value (before the user opens the modal or selects an address) SHALL NOT show "Australia" or the default; the component value remains null until the user selects or enters an address
- **THEN** when the user opens the manual-entry modal, the form SHALL show the default country in the Country field

#### Scenario: Defaults can include any Address fields present in the form

- **WHEN** the consumer passes `defaultAddress` with one or more of: building_name, level, unit, lot_no, street_number, street_name, street_type, street_suffix, suburb, state, postcode, country
- **THEN** each provided field SHALL be used as the initial value for the corresponding form control when the modal opens
- **THEN** fields not included in `defaultAddress` SHALL have empty initial values
