## ADDED Requirements

### Requirement: AddressInput uses factory and useProps

The `AddressInput` component SHALL be created with Mantine’s `factory` and SHALL call `useProps` with a stable component name, component-level default props, and incoming props so that default props and theme overrides from `MantineProvider` apply. Prop resolution order SHALL be: component-level defaults (lowest), then theme `components.AddressInput.defaultProps`, then props passed to the component (highest).

#### Scenario: Theme defaultProps apply when not overridden by props

- **WHEN** a consumer configures `createTheme({ components: { AddressInput: { defaultProps: { label: 'Street address' } } } })` and renders `<AddressInput />` without a `label` prop
- **THEN** the rendered input displays the label "Street address"

#### Scenario: Component-level defaults apply when theme does not set them

- **WHEN** a consumer renders `<AddressInput />` and does not set `theme.components.AddressInput`
- **THEN** the component uses its component-level defaults (e.g. label "Address", placeholder "Enter address...")

#### Scenario: AddressInput supports extend and withProps

- **WHEN** a consumer uses `AddressInput.extend({ defaultProps: { label: 'Shipping' } })` or `AddressInput.withProps({ placeholder: 'Type here' })`
- **THEN** TypeScript accepts the call and the resulting component behaves as documented by Mantine for `.extend()` and `.withProps()`

#### Scenario: Explicit props override theme and component defaults

- **WHEN** theme sets `defaultProps: { label: 'Street' }` and the consumer renders `<AddressInput label="Custom" />`
- **THEN** the rendered input displays "Custom"

---

### Requirement: AddressAutocomplete uses factory and useProps

The `AddressAutocomplete` component SHALL be created with Mantine’s `factory` and SHALL call `useProps` with a stable component name, component-level default props, and incoming props so that default props and theme overrides from `MantineProvider` apply. Prop resolution order SHALL be: component-level defaults (lowest), then theme `components.AddressAutocomplete.defaultProps`, then props passed to the component (highest).

#### Scenario: Theme defaultProps apply when not overridden by props

- **WHEN** a consumer configures `createTheme({ components: { AddressAutocomplete: { defaultProps: { nothingFoundMessage: 'No addresses' } } } })` and renders `<AddressAutocomplete adapter={a} />` without `nothingFoundMessage`
- **THEN** when the adapter returns no suggestions, the dropdown shows "No addresses"

#### Scenario: Component-level defaults apply when theme does not set them

- **WHEN** a consumer renders `<AddressAutocomplete adapter={a} />` and does not set `theme.components.AddressAutocomplete`
- **THEN** the component uses its component-level defaults (e.g. `debounce` 300, `nothingFoundMessage` "No results found")

#### Scenario: AddressAutocomplete supports extend and withProps

- **WHEN** a consumer uses `AddressAutocomplete.extend({ defaultProps: { debounce: 500 } })` or `AddressAutocomplete.withProps({ nothingFoundMessage: 'None' })`
- **THEN** TypeScript accepts the call and the resulting component behaves as documented by Mantine for `.extend()` and `.withProps()`

#### Scenario: Explicit props override theme and component defaults

- **WHEN** theme sets `defaultProps: { debounce: 500 }` and the consumer renders `<AddressAutocomplete adapter={a} debounce={200} />`
- **THEN** suggestions are requested after 200 ms debounce
