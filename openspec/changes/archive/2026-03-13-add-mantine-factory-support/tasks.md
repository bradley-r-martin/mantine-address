## 1. AddressInput factory support

- [x] 1.1 Refactor AddressInput to use `factory` and `useProps`: define a minimal Factory type (props + ref), default props object with `satisfies Partial<AddressInputProps>`, and call `useProps('AddressInput', defaultProps, props)` at the start of the component
- [x] 1.2 Ensure AddressInput forwards ref to the underlying TextInput and set `AddressInput.displayName`; verify existing AddressInput tests and Storybook still pass

## 2. AddressAutocomplete factory support

- [x] 2.1 Refactor AddressAutocomplete to use `factory` and `useProps`: define a minimal Factory type (props + ref), default props object with `satisfies Partial<AddressAutocompleteProps>`, and call `useProps('AddressAutocomplete', defaultProps, props)` at the start of the component
- [x] 2.2 Ensure AddressAutocomplete forwards ref to the underlying Autocomplete and set `AddressAutocomplete.displayName`; verify existing AddressAutocomplete tests and Storybook still pass

## 3. Tests and documentation

- [x] 3.1 Add tests (or extend existing) that theme defaultProps override component-level defaults and that explicit props override theme (e.g. render within a MantineThemeProvider with `theme.components.AddressInput.defaultProps` / `AddressAutocomplete.defaultProps`)
- [x] 3.2 Add a Storybook story (or section) demonstrating default props and theming via MantineProvider/createTheme for AddressInput and AddressAutocomplete
