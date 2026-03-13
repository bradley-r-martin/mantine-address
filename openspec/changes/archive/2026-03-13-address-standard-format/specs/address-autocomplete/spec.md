## MODIFIED Requirements

### Requirement: Selected suggestion triggers detail fetch and callback

When a user selects a suggestion, the component SHALL call `adapter.getDetails(suggestion.id)` and invoke the `onAddressSelect` callback with the resolved canonical `Address` object.

#### Scenario: User selects a suggestion

- **WHEN** the user clicks a suggestion from the dropdown
- **THEN** `adapter.getDetails(suggestion.id)` is called
- **THEN** `onAddressSelect` is called with the full `Address` object (canonical type)

#### Scenario: `onAddressSelect` is not provided

- **WHEN** no `onAddressSelect` prop is given and the user selects a suggestion
- **THEN** `adapter.getDetails` is still called and no runtime error is thrown

---

### Requirement: Component is exported from package root

The `AddressAutocomplete` component, `AddressLookupAdapter` type, `AddressSuggestion` type, and the canonical `Address` type SHALL all be exported from the package's main entry point. Address formatting utilities (e.g. `addressToString`, `addressToStreetString`, `addressToEnvelopeString`) SHALL also be exported as specified by the address-formatting spec.

#### Scenario: Named import works

- **WHEN** a consumer writes `import { AddressAutocomplete, Address } from 'mantine-address-input'`
- **THEN** TypeScript resolves the types without error

#### Scenario: onAddressSelect receives Address

- **WHEN** a consumer types the callback `onAddressSelect={(address) => ...}`
- **THEN** the `address` parameter is typed as `Address`
