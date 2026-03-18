# manual-address-entry Specification (Delta)

## MODIFIED Requirements

### Requirement: Manual-entry form uses default address when opening

When the component receives a `defaultAddress` prop (or equivalent partial address for defaults), the manual-entry form SHALL use it to set the initial values of the corresponding form fields when the modal is opened. Only fields present in the default SHALL be pre-filled; all other fields SHALL start empty. This SHALL apply regardless of whether a provider is set or manual-only mode is used.

#### Scenario: Modal opens with default country and state

- **WHEN** the consumer has set `defaultAddress={{ country: 'AU', state: 'NSW' }}` and the user opens the manual-entry modal
- **THEN** the Country field SHALL display Australia (or the display value for code AU) and the State field SHALL display NSW (or the display value for code NSW)
- **THEN** the user MAY change these values or leave them and fill other fields

#### Scenario: Manual form country and state options respect accept

- **WHEN** the consumer has set `accept` with `country` and/or `region` and the user opens the manual-entry modal
- **THEN** the Country select SHALL list only the accepted country (if `accept.country` is provided), and the State select SHALL list only the accepted region’s state (if `accept.region` is provided and the country has a state list)
- **THEN** on submit, the entered address SHALL be validated against `accept`; if invalid, the form SHALL show an error and SHALL NOT call `onChange`
