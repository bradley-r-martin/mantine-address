## 1. Component: name prop and hidden inputs

- [x] 1.1 Add optional `name` prop to `AddressAutocompleteProps` (string, optional)
- [x] 1.2 When `name` is set and address has values, render hidden `<input type="hidden">` for each defined scalar field of `Address` with `name="{name}[{field}]"` (e.g. `address[suburb]`, `address[postcode]`); omit undefined/null fields; serialize numbers as strings for `latitude`/`longitude`
- [x] 1.3 Ensure hidden inputs are rendered in a stable order (e.g. by field name) and placed in the same form context as the visible input (e.g. fragment or wrapper that does not affect layout)

## 2. Component: ref and reset behavior

- [x] 2.1 Extend ref type to expose an imperative method (e.g. `reset()`) that clears internal address state and typed input when uncontrolled
- [x] 2.2 Implement the ref method so that after calling it the visible input is empty and any hidden inputs no longer include the previous address
- [x] 2.3 Verify controlled mode: when parent sets `value` to `null`, component clears display and typed state (add or adjust test if needed)

## 3. Storybook: controlled and uncontrolled

- [x] 3.1 Add a Storybook story that demonstrates controlled usage (parent state, `value`/`onChange`, and a Clear button)
- [x] 3.2 Add a Storybook story that demonstrates uncontrolled usage (`defaultValue` only, no `value`/`onChange`)

## 4. Storybook: form integration

- [x] 4.1 Add a Storybook story that uses `@mantine/form` with the address component and a Reset (and/or Clear) button; confirm the address field clears when the form is reset
- [x] 4.2 Add a Storybook story that uses a native `<form>` with the address component given a `name` prop and shows that submitted/form data includes keys like `address[suburb]`, `address[postcode]` (e.g. display FormData or submit payload in the story)

## 5. Tests

- [x] 5.1 Add tests that when `name` is provided and address is set, hidden inputs with correct `name` and value exist in the DOM for defined Address fields
- [x] 5.2 Add tests that when `name` is omitted or `value` is null, no (or no stale) hidden inputs for address fields are present
- [x] 5.3 Add tests that the ref `reset()` (or equivalent) clears the uncontrolled address and typed state when called

## 6. Documentation

- [x] 6.1 Update README (or docs) to describe form usage: `name` prop, hidden inputs, and Mantine form / native form integration; link to Storybook stories for controlled, uncontrolled, and form examples
