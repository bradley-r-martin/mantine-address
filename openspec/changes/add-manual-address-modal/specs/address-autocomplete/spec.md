## MODIFIED Requirements

### Requirement: No-results message is shown when the provider returns an empty array

When `getSuggestions` resolves with an empty array for a non-empty input, the component SHALL display a "no results" message in the dropdown. When `allowsManualEntry` is `true` (the default), the component SHALL also offer a selectable option (e.g. "Enter manually") that, when selected, opens the manual-entry modal so the user can set an address manually.

#### Scenario: Provider returns empty array

- **WHEN** the user has typed a non-empty query and `provider.getSuggestions` resolves with `[]`
- **THEN** the dropdown displays a "no results" message (default: e.g. "No results found")
- **THEN** when `allowsManualEntry` is true, an "enter manually" (or equivalent) option is also shown and selecting it opens the manual-entry modal

#### Scenario: No-results message is not shown while loading

- **WHEN** `provider.getSuggestions` has been called and has not yet resolved
- **THEN** the "no results" message is NOT visible (loading indicator is shown instead)

#### Scenario: No-results message is not shown on empty input

- **WHEN** the input value is empty
- **THEN** the "no results" message is NOT visible

#### Scenario: Consumer overrides no-results message

- **WHEN** a consumer passes a custom nothing-found message (e.g. `nothingFoundMessage="No addresses found"`)
- **THEN** the dropdown displays that text instead of the default

#### Scenario: allowsManualEntry false and no results

- **WHEN** `allowsManualEntry` is `false` and the provider returns an empty array for a non-empty query
- **THEN** the dropdown displays only the no-results message and no "enter manually" option

---

### Requirement: Missing or invalid provider renders disabled with error

The library SHALL expose a single address component (e.g. **AddressInput**) that supports autocomplete and, when manual entry is disabled, requires a provider. When the component is rendered with no provider or an invalid provider at runtime and `allowsManualEntry` is `false`, the component SHALL render the input **disabled**, SHALL display an **error** state, and SHALL show a clear message that the provider must be configured. When `allowsManualEntry` is `true` (the default) and no provider is supplied, the component SHALL NOT render the input disabled; instead, when the user clicks or focuses the input, the component SHALL open the manual-entry modal. The component MUST NOT perform any lookup when no provider is supplied.

#### Scenario: Provider is undefined at runtime and allowsManualEntry is false

- **WHEN** a consumer renders the component with `provider={undefined}` and `allowsManualEntry={false}`
- **THEN** the input is disabled
- **THEN** the input displays an error state with a message indicating the provider must be configured
- **THEN** `provider.getSuggestions` and `provider.getDetails` are never called

#### Scenario: Provider is null at runtime and allowsManualEntry is false

- **WHEN** a consumer renders the component with `provider={null}` and `allowsManualEntry={false}`
- **THEN** the input is disabled
- **THEN** the input displays an error state with a message indicating the provider must be configured
- **THEN** no lookup or selection behavior occurs

#### Scenario: No provider and allowsManualEntry is true

- **WHEN** a consumer renders the component with no provider (e.g. `provider={null}` or `provider={undefined}`) and `allowsManualEntry={true}` (or omitted, default)
- **THEN** the input is NOT disabled and does NOT show the provider-required error
- **THEN** when the user clicks or focuses the input, the manual-entry modal opens
- **THEN** no lookup or selection from a provider occurs

#### Scenario: Valid provider provided

- **WHEN** a consumer renders the component with a valid `AddressLookupProvider`
- **THEN** the component behaves as specified for the normal autocomplete flow (no disabled or provider-error state)
