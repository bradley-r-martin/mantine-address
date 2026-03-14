## MODIFIED Requirements

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

---

## REMOVED Requirements

### Requirement: Missing or invalid provider renders disabled with error

**Reason:** No provider now always means manual-only mode; the component never renders disabled or shows a provider-required error when no provider is supplied.

**Migration:** If you previously relied on rendering with no provider and `allowsManualEntry={false}` to show a disabled input with error, that behavior is removed. Use a provider when you need autocomplete; when you do not supply a provider, the component is always manual-only (enabled input, modal on focus/click). To disable manual entry when the user gets no results, set `preventManualEntry={true}` and ensure a provider is supplied.
