# address-autocomplete — Delta (form-support)

## ADDED Requirements

### Requirement: Optional name prop for form participation

The `AddressAutocomplete` component SHALL accept an optional `name` prop of type `string`. When `name` is set, the component SHALL render hidden `<input type="hidden">` elements for each defined scalar field of the current `Address` value, using the attribute `name="{name}[{field}]"` (e.g. `address[suburb]`, `address[postcode]`). When `name` is omitted, the component SHALL NOT render any hidden inputs.

#### Scenario: Name prop provided and address has values

- **WHEN** a consumer renders `<AddressAutocomplete name="address" adapter={a} value={addr} />` and `addr` has `suburb` and `postcode` defined
- **THEN** the DOM includes hidden inputs with `name="address[suburb]"` and `name="address[postcode]"` with corresponding values

#### Scenario: Name prop omitted

- **WHEN** a consumer renders `<AddressAutocomplete adapter={a} />` without a `name` prop
- **THEN** no hidden inputs for the address are present in the DOM

#### Scenario: Name prop provided and value is null

- **WHEN** a consumer renders `<AddressAutocomplete name="address" adapter={a} value={null} />`
- **THEN** no hidden inputs for address fields are rendered (or all are omitted/cleared)

---

### Requirement: Component supports imperative reset when uncontrolled

When used in uncontrolled mode, the component SHALL expose an imperative method (e.g. via ref) that clears the selected address and the typed input so that after a form reset the parent can call this method to keep the address field in sync with the form. The method SHALL clear internal state so that the visible input is empty and any hidden inputs previously rendered for the address are removed or updated to reflect no address.

#### Scenario: Ref reset clears uncontrolled address

- **WHEN** the component is rendered uncontrolled (no `value` prop) with a ref and the user has selected an address
- **THEN** calling the ref’s reset/clear method (e.g. `ref.current.reset()`) clears the displayed value and internal address state so the field appears empty

#### Scenario: Ref reset when no address is set

- **WHEN** the component is uncontrolled and no address is selected
- **THEN** calling the ref’s reset method does not throw and leaves the field empty
