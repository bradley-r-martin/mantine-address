# Form support — Proposal

## Why

Developers need to use the address input inside both Mantine forms and native HTML forms. Today the component supports controlled and uncontrolled usage via `value`/`defaultValue` and `onChange`, but there is no documented storybook coverage of these modes, no integration with Mantine's form utilities (clear/reset), and no way for native form submit to include the address fields (e.g. for server-rendered or non-React forms). Adding form support makes the component a drop-in choice for real-world forms.

## What Changes

- **Controlled vs uncontrolled**: Keep existing behavior; add Storybook stories that explicitly demonstrate both modes so the contract is visible and documented.
- **Mantine form integration**: Add stories that use `@mantine/form` with the address field, including form reset/clear so the address field responds correctly when the form is cleared or reset.
- **Standard (native) form support**: When used inside a `<form>`, the component SHALL render hidden `<input>` elements for the address object so that form submit (or `FormData`) includes structured fields such as `{name}[suburb]`, `{name}[postcode]`, etc. This allows the address to participate in native form submission and serialization without extra wiring.
- **Clear/reset events**: The component SHALL respond to form clear or reset (e.g. Mantine form `reset()` or native `form.reset()`) by clearing the selected address and input state so the field is visually and semantically reset.
- **Public API**: Add an optional `name` prop used as the base name for hidden inputs (e.g. `name="address"` → `address[suburb]`, `address[postcode]`). No breaking change to existing props.

## Capabilities

### New Capabilities

- **form-support**: Form integration for AddressAutocomplete: optional `name` prop and rendering of hidden inputs for the address object; behavior that respects form clear/reset; documentation and storybook coverage for controlled, uncontrolled, Mantine form, and native form usage.

### Modified Capabilities

- **address-autocomplete**: Add optional `name` prop and requirement to render hidden inputs when `name` is set; ensure component state is cleared when the field is reset (e.g. via form reset or ref-based clear).
- **storybook**: Add stories that demonstrate controlled vs uncontrolled usage, Mantine form (with reset/clear), and native form with hidden inputs so that form-support is discoverable and testable in the UI.

## Impact

- **Component**: `AddressAutocomplete` gains optional `name` prop; internal rendering of hidden inputs for Address fields when `name` is set; handling of reset/clear so the displayed value and internal state align.
- **API surface**: New optional prop only; no breaking changes. Exports remain the same.
- **Storybook**: New or updated stories under the AddressAutocomplete (or Form) category.
- **Tests**: New or updated tests for hidden input rendering, name-based field names, and reset/clear behavior.
- **Dependencies**: No new runtime dependencies; `@mantine/form` is already a peer or used in Storybook for demos.

## Non-goals

- This change does not add a dedicated "form wrapper" component; the existing component is extended to work with forms.
- E2E tests for Storybook form stories are out of scope unless already part of the project; unit/integration tests for the new behavior are in scope.
- Changing Mantine or React version compatibility; form support must work within the existing supported versions.
