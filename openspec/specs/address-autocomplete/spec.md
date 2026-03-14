## ADDED Requirements

### Requirement: Component accepts a lookup adapter

The `AddressAutocomplete` component SHALL accept a required `adapter` prop that implements the `AddressLookupAdapter` interface. The component MUST NOT contain any hardcoded reference to a specific lookup service.

#### Scenario: Adapter prop is provided

- **WHEN** a consumer renders `<AddressAutocomplete adapter={myAdapter} />`
- **THEN** the component renders a Mantine `Autocomplete` input without errors

#### Scenario: No adapter prop

- **WHEN** TypeScript compilation runs without an `adapter` prop
- **THEN** the TypeScript compiler reports a type error

---

### Requirement: Suggestions are fetched on input change

The component SHALL call `adapter.getSuggestions(value)` when the user types into the input, after the configured debounce delay.

#### Scenario: User types a query

- **WHEN** the user types "123 Main" into the input
- **THEN** `adapter.getSuggestions("123 Main")` is called after the debounce interval (default 300 ms)

#### Scenario: Input is cleared

- **WHEN** the user clears the input to an empty string
- **THEN** the suggestions list is cleared and `getSuggestions` is NOT called

---

### Requirement: Debounce is configurable

The component SHALL accept an optional `debounce` prop (number, milliseconds). When omitted, the default debounce SHALL be 300 ms.

#### Scenario: Custom debounce

- **WHEN** a consumer renders `<AddressAutocomplete adapter={a} debounce={500} />`
- **THEN** `adapter.getSuggestions` is not called until 500 ms after the last keystroke

---

### Requirement: Selected suggestion triggers detail fetch and callback

When a user selects a suggestion, the component SHALL call `adapter.getDetails(suggestion.id)` and invoke the `onAddressSelect` callback with the resolved `AddressDetails`.

#### Scenario: User selects a suggestion

- **WHEN** the user clicks a suggestion from the dropdown
- **THEN** `adapter.getDetails(suggestion.id)` is called
- **THEN** `onAddressSelect` is called with the full `AddressDetails` object

#### Scenario: `onAddressSelect` is not provided

- **WHEN** no `onAddressSelect` prop is given and the user selects a suggestion
- **THEN** `adapter.getDetails` is still called and no runtime error is thrown

---

### Requirement: Mantine Autocomplete props are forwarded

The component SHALL accept and forward all valid Mantine `Autocomplete` props (excluding `data` and the internal `onChange`), allowing consumers to use standard Mantine customization (label, placeholder, error, size, etc.).

#### Scenario: Standard Mantine props applied

- **WHEN** a consumer passes `label="Shipping address"` and `placeholder="Start typing..."`
- **THEN** the rendered input displays those values via the underlying Mantine `Autocomplete`

---

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

### Requirement: Component is exported from package root

The `AddressAutocomplete` component, `AddressLookupAdapter` type, `AddressSuggestion` type, and `AddressDetails` type SHALL all be exported from the package's main entry point.

#### Scenario: Named import works

- **WHEN** a consumer writes `import { AddressAutocomplete } from 'mantine-address-input'`
- **THEN** TypeScript resolves the type without error

---

### Requirement: Loading indicator is shown while suggestions are being fetched

The component SHALL display a loading indicator within the input while a `getSuggestions` call is in progress, and hide it once the call settles.

#### Scenario: Loading state starts on getSuggestions call

- **WHEN** the debounce interval elapses and `adapter.getSuggestions` is invoked
- **THEN** a loading indicator (e.g. a spinner in the `rightSection`) becomes visible in the input

#### Scenario: Loading state clears on resolution

- **WHEN** `adapter.getSuggestions` resolves (with results or an empty array)
- **THEN** the loading indicator is removed from the input

#### Scenario: Loading state clears on rejection

- **WHEN** `adapter.getSuggestions` rejects with an error
- **THEN** the loading indicator is removed and the suggestion list remains empty

#### Scenario: No loading indicator when input is empty

- **WHEN** the input value is empty and no fetch is in progress
- **THEN** no loading indicator is visible

---

### Requirement: Matched substrings in suggestions are visually highlighted

When an `AddressSuggestion` includes a `matchedSubstrings` array, the component SHALL render the matched portions of the suggestion label in a visually distinct style (e.g. bold or accented). Suggestions without `matchedSubstrings` SHALL render as plain text.

#### Scenario: Adapter returns suggestions with matchedSubstrings

- **WHEN** a suggestion has `label: "123 Main St"` and `matchedSubstrings: [{ offset: 0, length: 3 }]`
- **THEN** the characters `"123"` are rendered in a highlighted style in the dropdown item

#### Scenario: Adapter returns suggestions without matchedSubstrings

- **WHEN** a suggestion has `label: "123 Main St"` and no `matchedSubstrings` field
- **THEN** the label is rendered as plain text with no highlight markup

#### Scenario: Multiple matched ranges

- **WHEN** a suggestion has `matchedSubstrings: [{ offset: 0, length: 3 }, { offset: 8, length: 2 }]`
- **THEN** both matched ranges are individually highlighted in the rendered label

---

### Requirement: No-results message is shown when the adapter returns an empty array

When `getSuggestions` resolves with an empty array for a non-empty input, the component SHALL display a "no results" message in the dropdown to inform the user that no suggestions were found.

#### Scenario: Adapter returns empty array

- **WHEN** the user has typed a non-empty query and `adapter.getSuggestions` resolves with `[]`
- **THEN** the dropdown displays a "no results" message (default: `"No results found"`)

#### Scenario: No-results message is not shown while loading

- **WHEN** `adapter.getSuggestions` has been called and has not yet resolved
- **THEN** the "no results" message is NOT visible (loading indicator is shown instead)

#### Scenario: No-results message is not shown on empty input

- **WHEN** the input value is empty
- **THEN** the "no results" message is NOT visible

#### Scenario: Consumer overrides no-results message

- **WHEN** a consumer passes `nothingFoundMessage="No addresses found"`
- **THEN** the dropdown displays `"No addresses found"` instead of the default text

---

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
