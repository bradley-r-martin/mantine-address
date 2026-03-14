## 1. Form state and reset

- [x] 1.1 Add React state for manual form fields: building_name, level, unit, lot_no, street_number, street_name, street_type, street_suffix (suburb, state, postcode, country already exist; remove or replace single manualFormStreet with street_name)
- [x] 1.2 Update openManualModal to reset all manual form fields and set street_name from optional initial value when opened from "Enter manually"
- [x] 1.3 Update handleManualSubmit to build Address from all 12 fields (building_name, level, unit, lot_no, street_number, street_name, street_type, street_suffix, suburb, state, postcode, country), including only non-empty trimmed values

## 2. Modal UI

- [x] 2.1 Add one form control per Address field in the manual modal in order: building_name, level, unit, lot_no, street_number, street_name, street_type, street_suffix, suburb, state, postcode, country (use Mantine TextInput with appropriate labels/placeholders)
- [x] 2.2 Ensure modal content scrolls on small viewports (e.g. ScrollArea or modal scroll) so all fields remain accessible

## 3. Tests and Storybook

- [x] 3.1 Add or update tests for manual entry: modal form includes all 12 fields; submit with filled values produces Address with those fields; no place_id, latitude, or longitude
- [x] 3.2 Update Storybook manual-entry story to demonstrate and exercise the full set of address fields
