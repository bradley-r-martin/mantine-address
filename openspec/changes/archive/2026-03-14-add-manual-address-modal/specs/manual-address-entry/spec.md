## ADDED Requirements

### Requirement: AddressInput accepts allowsManualEntry prop

The component SHALL accept an optional boolean prop `allowsManualEntry`. When omitted, it SHALL default to `true`. When `true`, the component SHALL allow the user to set an address via a manual-entry modal in addition to (or instead of) provider suggestions. When `false`, the component SHALL NOT show any manual-entry option or open the manual-entry modal.

#### Scenario: allowsManualEntry defaults to true

- **WHEN** a consumer renders the component without passing `allowsManualEntry`
- **THEN** manual entry is enabled (e.g. "enter manually" appears when there are no results, and with no provider the input opens the modal on interaction)

#### Scenario: allowsManualEntry is false

- **WHEN** a consumer renders the component with `allowsManualEntry={false}`
- **THEN** no "enter manually" option is shown when the provider returns no results
- **THEN** when no provider is supplied, the input is disabled with error as in the existing requirement (missing provider)

#### Scenario: allowsManualEntry is true with provider and no results

- **WHEN** the consumer has set `allowsManualEntry={true}` (or left it default), a provider is configured, and the provider returns an empty array for a non-empty query
- **THEN** the dropdown SHALL show an option that allows the user to enter an address manually (e.g. "Enter manually")
- **THEN** selecting that option SHALL open the manual-entry modal

#### Scenario: allowsManualEntry is true with no provider

- **WHEN** the consumer has set `allowsManualEntry={true}` (or left it default) and no provider is supplied (e.g. `provider={null}` or `provider={undefined}`)
- **THEN** the input SHALL NOT be disabled
- **THEN** when the user clicks or focuses the input, the manual-entry modal SHALL open

---

### Requirement: Manual-entry modal presents a form and commits an Address

The component SHALL provide a modal that contains a form for entering address fields. The form SHALL collect data that can be represented as an `Address`. On submit (e.g. "Save" or "Apply"), the component SHALL set the selected address to the entered value, SHALL invoke the selection callback (`onChange`) with that address, SHALL close the modal, and SHALL update the input display using the active format provider. The modal SHALL be dismissible (e.g. Escape or cancel button) without committing; in that case the address and input value SHALL NOT change.

#### Scenario: User submits the manual form

- **WHEN** the user fills the manual-entry form and submits (e.g. clicks "Save")
- **THEN** the component sets the current address to the entered `Address`
- **THEN** `onChange` is called with that address
- **THEN** the modal closes
- **THEN** the input displays the address via the active format provider

#### Scenario: User cancels or dismisses the modal

- **WHEN** the user closes the modal without submitting (e.g. Escape, overlay click, or "Cancel")
- **THEN** the current address and input value are unchanged
- **THEN** `onChange` is not called for the manual form

#### Scenario: Modal is accessible

- **WHEN** the manual-entry modal is open
- **THEN** focus is contained within the modal (e.g. focus trap) and the modal can be closed with Escape or an explicit cancel action
