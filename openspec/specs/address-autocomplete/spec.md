## ADDED Requirements

### Requirement: Component accepts a lookup provider

The address autocomplete component SHALL accept an optional `provider` prop that implements the `AddressLookupProvider` interface. When `provider` is supplied, the component SHALL use it for suggestions and details and MUST NOT contain any hardcoded reference to a specific lookup service. When `provider` is not supplied (undefined or null), the component SHALL operate in manual-only mode: the input SHALL be enabled, and the component SHALL NOT perform any lookup; focus or click on the input SHALL open the manual-entry modal (see manual-address-entry spec).

#### Scenario: Provider prop is provided

- **WHEN** a consumer renders the component with `provider={myProvider}`
- **THEN** the component renders a Mantine `Autocomplete` input without errors and uses the provider for suggestions and details

#### Scenario: No provider prop

- **WHEN** a consumer renders the component without a `provider` (e.g. `provider={undefined}` or `provider={null}`)
- **THEN** the component does not call any lookup methods
- **THEN** the input is enabled and clicking or focusing it opens the manual-entry modal

#### Scenario: TypeScript accepts optional provider

- **WHEN** TypeScript compilation runs with the component and no `provider` prop is passed
- **THEN** the TypeScript compiler does not report a type error (provider is optional)

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

When `getSuggestions` resolves with an empty array for a non-empty input, the component SHALL display a "no results" message in the dropdown. When a provider is set and `preventManualEntry` is `false` or omitted (the default), the component SHALL also offer a selectable option (e.g. "Enter manually") that, when selected, opens the manual-entry modal. When `preventManualEntry` is `true`, the component SHALL display only the no-results message and SHALL NOT show an "Enter manually" option. This requirement applies only when a provider is supplied; when no provider is supplied, the component does not show a suggestions dropdown (manual-only mode).

#### Scenario: Provider returns empty array and preventManualEntry is false or omitted

- **WHEN** the user has typed a non-empty query, a provider is set, `provider.getSuggestions` resolves with `[]`, and `preventManualEntry` is `false` or omitted
- **THEN** the dropdown displays a "no results" message (default: e.g. "No results found")
- **THEN** an "enter manually" (or equivalent) option is also shown and selecting it opens the manual-entry modal

#### Scenario: No-results message is not shown while loading

- **WHEN** `provider.getSuggestions` has been called and has not yet resolved
- **THEN** the "no results" message is NOT visible (loading indicator is shown instead)

#### Scenario: No-results message is not shown on empty input

- **WHEN** the input value is empty
- **THEN** the "no results" message is NOT visible

#### Scenario: Consumer overrides no-results message

- **WHEN** a consumer passes a custom nothing-found message (e.g. `nothingFoundMessage="No addresses found"`)
- **THEN** the dropdown displays that text instead of the default

#### Scenario: preventManualEntry true and no results

- **WHEN** a provider is set, `preventManualEntry` is `true`, and the provider returns an empty array for a non-empty query
- **THEN** the dropdown displays only the no-results message and no "enter manually" option

## Requirements

### Requirement: Autocomplete selection is validated against restrictions

When the component has a `restrictions` prop set and the user selects a suggestion from the autocomplete dropdown, the component SHALL resolve the address via `provider.getDetails(suggestion.id)` and SHALL then evaluate that address against the restrictions. If the address does not satisfy the restrictions, the component SHALL NOT set it as the selected address, SHALL NOT call `onChange` with it, and SHALL display a validation error (e.g. on the input). If the address satisfies the restrictions, the component SHALL behave as today: set the selection, call `onChange`, and update the display.

#### Scenario: Selected suggestion fails restrictions

- **WHEN** restrictions are set (e.g. `allowedCountries: ['AU']`), the user selects a suggestion that resolves to an address in the United States
- **THEN** the component SHALL NOT update the selected address
- **THEN** the component SHALL NOT call `onChange`
- **THEN** the component SHALL display a validation error so the user knows the selection was rejected

#### Scenario: Selected suggestion passes restrictions

- **WHEN** restrictions are set and the user selects a suggestion that resolves to an address that satisfies all restrictions
- **THEN** the component SHALL set the selected address and call `onChange` with that address
- **THEN** the input SHALL display the address via the format provider and no restriction error SHALL be shown
