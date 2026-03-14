## RENAMED Requirements

- **FROM:** Prop name `adapter` (type `AddressLookupAdapter`)
- **TO:** Prop name `provider` (type `AddressLookupProvider`)

- **FROM:** Optional formatter type `AddressFormatAdapter`
- **TO:** `AddressFormatProvider`

- **FROM:** User-facing and spec text "adapter" (e.g. "adapter must be configured")
- **TO:** "provider"

## MODIFIED Requirements

### Requirement: Component accepts a lookup provider

The address autocomplete component SHALL accept a required `provider` prop that implements the `AddressLookupProvider` interface. The component MUST NOT contain any hardcoded reference to a specific lookup service.

#### Scenario: Provider prop is provided

- **WHEN** a consumer renders the component with `provider={myProvider}`
- **THEN** the component renders a Mantine `Autocomplete` input without errors

#### Scenario: No provider prop

- **WHEN** TypeScript compilation runs without a `provider` prop
- **THEN** the TypeScript compiler reports a type error

---

### Requirement: Suggestions are fetched on input change

The component SHALL call `provider.getSuggestions(value)` when the user types into the input, after the configured debounce delay.

#### Scenario: User types a query

- **WHEN** the user types "123 Main" into the input
- **THEN** `provider.getSuggestions("123 Main")` is called after the debounce interval (default 300 ms)

#### Scenario: Input is cleared

- **WHEN** the user clears the input to an empty string
- **THEN** the suggestions list is cleared and `getSuggestions` is NOT called

---

### Requirement: Debounce is configurable

The component SHALL accept an optional `debounce` prop (number, milliseconds). When omitted, the default debounce SHALL be 300 ms.

#### Scenario: Custom debounce

- **WHEN** a consumer renders the component with `provider={p} debounce={500}`
- **THEN** `provider.getSuggestions` is not called until 500 ms after the last keystroke

---

### Requirement: Selected suggestion triggers detail fetch and callback

When a user selects a suggestion, the component SHALL call `provider.getDetails(suggestion.id)` and invoke the selection callback with the resolved address.

#### Scenario: User selects a suggestion

- **WHEN** the user clicks a suggestion from the dropdown
- **THEN** `provider.getDetails(suggestion.id)` is called
- **THEN** the selection callback is called with the full address object

#### Scenario: Callback is not provided

- **WHEN** no selection callback prop is given and the user selects a suggestion
- **THEN** `provider.getDetails` is still called and no runtime error is thrown

---

### Requirement: Mantine Autocomplete props are forwarded

The component SHALL accept and forward all valid Mantine `Autocomplete` props (excluding `data` and the internal `onChange`), allowing consumers to use standard Mantine customization (label, placeholder, error, size, etc.).

#### Scenario: Standard Mantine props applied

- **WHEN** a consumer passes `label="Shipping address"` and `placeholder="Start typing..."`
- **THEN** the rendered input displays those values via the underlying Mantine `Autocomplete`

---

### Requirement: Component accepts an optional formatter for address display

The address component SHALL accept an optional `format` prop of type `AddressFormatProvider`. When provided, the component SHALL use the provider (e.g. `format.toString(address)` or equivalent) to produce the display string for the selected address. When omitted, the component SHALL use the built-in international formatter.

#### Scenario: Format prop is provided

- **WHEN** a consumer renders with `provider={p} format={australian}` and the user selects an address
- **THEN** the input displays the address by calling the format provider with the selected address

#### Scenario: Format prop is omitted

- **WHEN** a consumer renders with `provider={p}` and no `format` prop and the user selects an address
- **THEN** the input displays the address using the default international formatter

#### Scenario: Display after selection uses formatter

- **WHEN** the user selects a suggestion and `provider.getDetails` resolves with an address
- **THEN** the value shown in the input is the result of the active format provider (either the provided one or the default international)

---

### Requirement: Component and types are exported from package root

The address component, `AddressLookupProvider` type, `AddressSuggestion` type, and address/details types SHALL be exported from the package's main entry point. `AddressFormatProvider` SHALL also be exported.

#### Scenario: Named import works

- **WHEN** a consumer writes `import { AddressInput, AddressLookupProvider } from 'mantine-address-input'` (or equivalent)
- **THEN** TypeScript resolves the types and component without error

---

### Requirement: Loading indicator is shown while suggestions are being fetched

The component SHALL display a loading indicator within the input while a `getSuggestions` call is in progress, and hide it once the call settles.

#### Scenario: Loading state starts on getSuggestions call

- **WHEN** the debounce interval elapses and `provider.getSuggestions` is invoked
- **THEN** a loading indicator becomes visible in the input

#### Scenario: Loading state clears on resolution

- **WHEN** `provider.getSuggestions` resolves (with results or an empty array)
- **THEN** the loading indicator is removed from the input

#### Scenario: Loading state clears on rejection

- **WHEN** `provider.getSuggestions` rejects with an error
- **THEN** the loading indicator is removed and the suggestion list remains empty

#### Scenario: No loading indicator when input is empty

- **WHEN** the input value is empty and no fetch is in progress
- **THEN** no loading indicator is visible

---

### Requirement: Matched substrings in suggestions are visually highlighted

When an `AddressSuggestion` includes a `matchedSubstrings` array, the component SHALL render the matched portions of the suggestion label in a visually distinct style. Suggestions without `matchedSubstrings` SHALL render as plain text.

#### Scenario: Provider returns suggestions with matchedSubstrings

- **WHEN** a suggestion has `label: "123 Main St"` and `matchedSubstrings: [{ offset: 0, length: 3 }]`
- **THEN** the characters `"123"` are rendered in a highlighted style in the dropdown item

#### Scenario: Provider returns suggestions without matchedSubstrings

- **WHEN** a suggestion has `label: "123 Main St"` and no `matchedSubstrings` field
- **THEN** the label is rendered as plain text with no highlight markup

#### Scenario: Multiple matched ranges

- **WHEN** a suggestion has `matchedSubstrings: [{ offset: 0, length: 3 }, { offset: 8, length: 2 }]`
- **THEN** both matched ranges are individually highlighted in the rendered label

---

### Requirement: No-results message is shown when the provider returns an empty array

When `getSuggestions` resolves with an empty array for a non-empty input, the component SHALL display a "no results" message in the dropdown.

#### Scenario: Provider returns empty array

- **WHEN** the user has typed a non-empty query and `provider.getSuggestions` resolves with `[]`
- **THEN** the dropdown displays a "no results" message (default: e.g. "No results found")

#### Scenario: No-results message is not shown while loading

- **WHEN** `provider.getSuggestions` has been called and has not yet resolved
- **THEN** the "no results" message is NOT visible (loading indicator is shown instead)

#### Scenario: No-results message is not shown on empty input

- **WHEN** the input value is empty
- **THEN** the "no results" message is NOT visible

#### Scenario: Consumer overrides no-results message

- **WHEN** a consumer passes a custom nothing-found message (e.g. `nothingFoundMessage="No addresses found"`)
- **THEN** the dropdown displays that text instead of the default

---

### Requirement: Missing or invalid provider renders disabled with error

The library SHALL expose a single address component (e.g. **AddressInput**) that supports **autocomplete only** and **requires a provider**. When the component is rendered with no provider or an invalid provider at runtime (e.g. `provider` is `undefined` or `null`), the component SHALL render the input **disabled**, SHALL display an **error** state, and SHALL show a clear message that the provider must be configured. The component MUST NOT perform any lookup or allow address selection in this state.

#### Scenario: Provider is undefined at runtime

- **WHEN** a consumer renders the component with `provider={undefined}` (e.g. via conditional or untyped integration)
- **THEN** the input is disabled
- **THEN** the input displays an error state with a message indicating the provider must be configured
- **THEN** `provider.getSuggestions` and `provider.getDetails` are never called

#### Scenario: Provider is null at runtime

- **WHEN** a consumer renders the component with `provider={null}`
- **THEN** the input is disabled
- **THEN** the input displays an error state with a message indicating the provider must be configured
- **THEN** no lookup or selection behavior occurs

#### Scenario: Valid provider provided

- **WHEN** a consumer renders the component with a valid `AddressLookupProvider`
- **THEN** the component behaves as specified for the normal autocomplete flow (no disabled or provider-error state)
