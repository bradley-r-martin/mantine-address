# form-support Specification

## Purpose

Define form integration for AddressAutocomplete: optional `name` prop, hidden inputs for native form submission, and correct behavior with form reset/clear (Mantine form and native). Document controlled vs uncontrolled usage and provide storybook coverage for all form scenarios.

## ADDED Requirements

### Requirement: Optional name prop for form participation

The component SHALL accept an optional `name` prop (string). When `name` is provided, the component SHALL render hidden form inputs so that the current address is submitted with the form under bracket notation (e.g. `name[suburb]`, `name[postcode]`). When `name` is omitted, the component SHALL NOT render any hidden inputs and behavior SHALL remain unchanged from the current implementation.

#### Scenario: Name prop is provided and address is set

- **WHEN** a consumer renders `<AddressAutocomplete name="address" adapter={a} value={someAddress} />` and `someAddress` has at least one defined field (e.g. `suburb`, `postcode`)
- **THEN** the component renders one or more hidden `<input type="hidden">` elements with `name` attributes of the form `address[field]` for each defined scalar field in the address (e.g. `address[suburb]`, `address[postcode]`)

#### Scenario: Name prop is omitted

- **WHEN** a consumer renders `<AddressAutocomplete adapter={a} />` without a `name` prop
- **THEN** no hidden inputs are rendered and the component behaves as before (no form-support change)

#### Scenario: Name prop is provided but address is null

- **WHEN** a consumer renders `<AddressAutocomplete name="address" adapter={a} value={null} />`
- **THEN** no hidden inputs are rendered for the address object (or only inputs that represent "no value" per implementation choice, e.g. omit all)

---

### Requirement: Hidden inputs use canonical Address field names

Hidden inputs SHALL use the same field names as the canonical `Address` type for scalar fields (e.g. `place_id`, `building_name`, `level`, `unit`, `lot_no`, `street_number`, `street_name`, `street_type`, `street_suffix`, `suburb`, `state`, `postcode`, `country`, `latitude`, `longitude`). Each hidden input SHALL have a `name` of the form `{name}[{field}]` where `name` is the component’s `name` prop and `field` is the Address key. Numeric fields SHALL be serialized as strings (e.g. `latitude`, `longitude`).

#### Scenario: Address with string and number fields

- **WHEN** the current address has `suburb: "Springfield"`, `postcode: "62701"`, and `latitude: 39.78`
- **THEN** there exist hidden inputs with names `address[suburb]`, `address[postcode]`, and `address[latitude]` with values `Springfield`, `62701`, and a string representation of `39.78` respectively

#### Scenario: Undefined or null fields are omitted

- **WHEN** the current address has only `suburb` and `postcode` set and all other fields undefined or null
- **THEN** only hidden inputs for `suburb` and `postcode` are rendered; no hidden input is rendered for empty fields

---

### Requirement: Form reset and clear clear the address field

The component SHALL respond to form reset or clear so that the displayed value and internal state (selected address, typed input) are cleared when the parent form is reset or cleared. When the component is controlled, the parent is responsible for setting `value` to `null` (e.g. via Mantine form `reset()`); the component SHALL then display an empty input and clear typed state. When the component is uncontrolled, the component SHALL provide a way (e.g. an imperative ref method such as `reset()`) so that the parent can clear the address after a form reset.

#### Scenario: Controlled component and parent sets value to null

- **WHEN** the component is controlled and the parent sets `value` to `null` (e.g. after Mantine form `reset()`)
- **THEN** the visible input displays an empty value and the component’s internal typed state is cleared so the field appears reset

#### Scenario: Uncontrolled component and ref reset is called

- **WHEN** the component is uncontrolled and the consumer calls a ref method (e.g. `ref.current.reset()`) after a form reset
- **THEN** the component clears the selected address and typed input so the visible field is empty and hidden inputs (if any) no longer include previous address data

---

### Requirement: Controlled and uncontrolled usage is documented and demonstrated

The library SHALL document controlled vs uncontrolled usage (e.g. in README and/or Storybook), and Storybook SHALL include at least one story that demonstrates controlled usage (state in parent, clear button) and one that demonstrates uncontrolled usage (`defaultValue` only, no `value`/`onChange`).

#### Scenario: Controlled story exists

- **WHEN** a developer opens Storybook for the address component
- **THEN** a story is available that shows the component used in controlled mode (e.g. parent state, display of current value, and a way to clear)

#### Scenario: Uncontrolled story exists

- **WHEN** a developer opens Storybook for the address component
- **THEN** a story is available that shows the component used in uncontrolled mode (e.g. `defaultValue` only, no `value` or `onChange`)

---

### Requirement: Mantine form and native form stories exist

Storybook SHALL include a story that uses `@mantine/form` with the address field and demonstrates form reset (and optionally clear) so that the address field is cleared when the form is reset. Storybook SHALL also include a story that uses a native HTML form with the `name` prop and demonstrates that submitted form data (e.g. via `FormData` or submit handler) includes the address fields under the bracket notation (e.g. `address[suburb]`, `address[postcode]`).

#### Scenario: Mantine form story with reset

- **WHEN** a developer runs Storybook and opens the Mantine form story
- **THEN** the story shows a form that includes the address component and a Reset (and/or Clear) button, and after reset the address field is empty

#### Scenario: Native form story with hidden inputs

- **WHEN** a developer runs Storybook and opens the native form story
- **THEN** the story shows a form with the address component given a `name` prop, and on submit (or inspection) the form data includes keys such as `address[suburb]`, `address[postcode]` when an address is selected
