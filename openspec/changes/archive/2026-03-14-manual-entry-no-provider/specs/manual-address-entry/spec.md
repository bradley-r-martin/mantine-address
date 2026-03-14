## MODIFIED Requirements

### Requirement: AddressInput accepts preventManualEntry prop

The component SHALL accept an optional boolean prop `preventManualEntry`. When omitted, it SHALL default to `false`. This prop SHALL only have effect when a provider is supplied. When a provider is set and `preventManualEntry` is `false` or omitted, the component SHALL allow the user to set an address via a manual-entry modal (e.g. by selecting "Enter manually" when the provider returns no results). When a provider is set and `preventManualEntry` is `true`, the component SHALL NOT show an "Enter manually" option in the dropdown and SHALL NOT allow opening the manual-entry modal from the dropdown. When no provider is supplied, the component SHALL always operate in manual-only mode: the input SHALL be enabled and focus or click SHALL open the manual-entry modal; the `preventManualEntry` prop SHALL have no effect in that case.

#### Scenario: preventManualEntry defaults to false

- **WHEN** a consumer renders the component without passing `preventManualEntry` and a provider is set
- **THEN** manual entry is allowed (e.g. "Enter manually" appears when the provider returns no results)

#### Scenario: preventManualEntry is true with provider

- **WHEN** a consumer renders the component with `preventManualEntry={true}` and a provider is supplied
- **THEN** no "enter manually" option is shown when the provider returns no results
- **THEN** the user cannot open the manual-entry modal from the no-results dropdown

#### Scenario: preventManualEntry false with provider and no results

- **WHEN** the consumer has set `preventManualEntry={false}` (or left it default), a provider is configured, and the provider returns an empty array for a non-empty query
- **THEN** the dropdown SHALL show an option that allows the user to enter an address manually (e.g. "Enter manually")
- **THEN** selecting that option SHALL open the manual-entry modal

#### Scenario: No provider — manual-only regardless of preventManualEntry

- **WHEN** no provider is supplied (e.g. `provider={null}` or `provider={undefined}`)
- **THEN** the input SHALL NOT be disabled and SHALL NOT show a provider-required error
- **THEN** when the user clicks or focuses the input, the manual-entry modal SHALL open
- **THEN** the value of `preventManualEntry` has no effect (manual entry is always the only path)
