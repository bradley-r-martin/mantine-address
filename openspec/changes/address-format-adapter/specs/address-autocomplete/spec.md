## ADDED Requirements

### Requirement: Component accepts an optional formatter for address display

The `AddressInput` component SHALL accept an optional `formatter` prop of type `AddressFormatAdapter`. When provided, the component SHALL use `formatter.format(address)` to produce the display string for the selected address. When omitted, the component SHALL use the built-in international formatter so that display always goes through a formatter.

#### Scenario: Formatter prop is provided

- **WHEN** a consumer renders `<AddressInput adapter={a} formatter={australianAddressFormat} />` and the user selects an address
- **THEN** the input displays the address by calling `formatter.format(address)` with the selected address

#### Scenario: Formatter prop is omitted

- **WHEN** a consumer renders `<AddressInput adapter={a} />` with no `formatter` prop and the user selects an address
- **THEN** the input displays the address using the default international formatter (same display as current behaviour when no region was set)

#### Scenario: Display after selection uses formatter

- **WHEN** the user selects a suggestion and `adapter.getDetails` resolves with an `Address`
- **THEN** the value shown in the input is the result of the active formatter's `format(address)` (either the provided formatter or the default international formatter)

---

## REMOVED Requirements

### Requirement: Component accepts a region prop for address display

**Reason:** Replaced by the formatter adapter pattern. Display convention is now controlled by an optional `formatter` prop (`AddressFormatAdapter`); the `region` string prop and `AddressRegion` type are removed from the component API.

**Migration:** Use `formatter={australianAddressFormat}` (or the appropriate built-in formatter) instead of `region="AU"`. Import `australianAddressFormat` from the package. For international/default display, omit the `formatter` prop.
