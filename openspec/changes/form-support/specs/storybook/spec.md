# storybook — Delta (form-support)

## ADDED Requirements

### Requirement: Stories demonstrate controlled and uncontrolled address usage

Storybook SHALL include at least one story that demonstrates the address component in controlled mode (parent holds state, `value` and `onChange` used, with a way to clear) and at least one story that demonstrates uncontrolled mode (`defaultValue` only, no `value` or `onChange`).

#### Scenario: Controlled mode story

- **WHEN** a developer runs Storybook and navigates to the address component stories
- **THEN** a story is present (e.g. "Controlled" or "Form / Controlled") that shows the component with state managed by the parent and a clear or reset control

#### Scenario: Uncontrolled mode story

- **WHEN** a developer runs Storybook and navigates to the address component stories
- **THEN** a story is present (e.g. "Uncontrolled" or "Form / Uncontrolled") that shows the component with only `defaultValue` and no `value`/`onChange`

---

### Requirement: Story demonstrates Mantine form with address and reset

Storybook SHALL include a story that uses `@mantine/form` with the address component as a field and includes a Reset (and/or Clear) button. When the user resets the form, the address field SHALL be cleared (empty) so that the story demonstrates correct Mantine form integration.

#### Scenario: Mantine form story includes address and reset

- **WHEN** a developer runs Storybook and opens the Mantine form story for the address component
- **THEN** the story shows a form containing the address field and a Reset or Clear button

#### Scenario: Resetting the form clears the address field

- **WHEN** the user has selected an address in the Mantine form story and then clicks Reset (or Clear)
- **THEN** the address field is visually empty and the form state reflects no selected address

---

### Requirement: Story demonstrates native form with hidden inputs

Storybook SHALL include a story that uses a native HTML `<form>` with the address component given a `name` prop. The story SHALL demonstrate that on form submit (or by inspecting form data), the submitted data includes the address fields in bracket notation (e.g. `address[suburb]`, `address[postcode]`).

#### Scenario: Native form story with name prop

- **WHEN** a developer runs Storybook and opens the native form story
- **THEN** the story shows a form that includes the address component with a `name` prop (e.g. `name="address"`) and a submit button or way to read form data

#### Scenario: Submitted form data includes address fields

- **WHEN** the user selects an address in the native form story and submits or inspects the form (e.g. via submit handler or FormData)
- **THEN** the form data contains keys such as `address[suburb]`, `address[postcode]` (and other set address fields) with the correct values
