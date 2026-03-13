# address-autocomplete — Delta (adapter-required-autocomplete-only)

## ADDED Requirements

### Requirement: Missing or invalid adapter renders disabled with error

The library SHALL expose a single address component named **AddressInput** (the adapter-required autocomplete implementation). The component supports **autocomplete only** and **requires an adapter**. When `AddressInput` is rendered with no adapter or an invalid adapter at runtime (e.g. `adapter` is `undefined` or `null`), the component SHALL render the input in a **disabled** state, SHALL display an **error** state, and SHALL show a clear message that the adapter must be configured. The component MUST NOT perform any lookup or allow address selection in this state.

#### Scenario: Adapter is undefined at runtime

- **WHEN** a consumer renders `<AddressInput adapter={undefined} />` (e.g. via conditional or untyped integration)
- **THEN** the input is disabled
- **THEN** the input displays an error state with a message indicating the adapter must be configured
- **THEN** `adapter.getSuggestions` and `adapter.getDetails` are never called

#### Scenario: Adapter is null at runtime

- **WHEN** a consumer renders `<AddressInput adapter={null} />`
- **THEN** the input is disabled
- **THEN** the input displays an error state with a message indicating the adapter must be configured
- **THEN** no lookup or selection behavior occurs

#### Scenario: Valid adapter provided

- **WHEN** a consumer renders `<AddressInput adapter={myAdapter} />` with a valid `AddressLookupAdapter`
- **THEN** the component behaves as specified for the normal autocomplete flow (no disabled or adapter-error state)
