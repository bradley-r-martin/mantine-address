## ADDED Requirements

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
