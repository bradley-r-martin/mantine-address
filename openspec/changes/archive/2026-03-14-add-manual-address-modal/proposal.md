## Why

Users often need to enter addresses that do not appear in provider results (e.g. new developments, private locations, or regions with poor coverage). Today the component only allows selection from suggestions; when the provider returns no results or when no provider is configured, there is no way to set an address manually. Adding an optional manual-entry path via a modal keeps the primary autocomplete flow unchanged while supporting these cases.

## What Changes

- **Manual entry modal**: A modal containing a form to set address fields (e.g. street, suburb, state, postcode, country) that commits a single `Address` and closes. The modal is opened either from a dedicated "enter manually" action or by focusing/clicking the input when manual entry is allowed and no provider is available.
- **New prop `allowsManualEntry`**: Boolean prop on `AddressInput`, default `true`. When `true`:
  - If the provider returns no results for a non-empty query, the dropdown shows an "enter manually" option that opens the manual-entry modal.
  - If there is no provider (or provider is null/undefined), clicking/focusing the input opens the manual-entry modal instead of showing a disabled error state.
- **Provider optional when manual entry allowed**: When `allowsManualEntry` is `true`, the `provider` prop may be omitted or null; in that case the input remains usable and opens the manual-entry modal on interaction. When `allowsManualEntry` is `false`, existing behavior remains: provider is required and missing provider renders disabled with error.
- **Non-goals**: This change does not define which fields the manual form contains (e.g. single line vs structured); that is an implementation detail. Tests and Storybook stories will cover the new prop and modal trigger behavior; exhaustive manual-form field tests are in scope only for the implemented form layout.

## Capabilities

### New Capabilities

- `manual-address-entry`: Manual address entry via a modal form, the `allowsManualEntry` prop (default `true`), and the rules for when the modal is opened (no-results "enter manually" vs no-provider click/focus).

### Modified Capabilities

- `address-autocomplete`: Requirement "No-results message is shown when the provider returns an empty array" is extended so that when `allowsManualEntry` is true, the no-results state can show an "enter manually" option that opens the manual-entry modal. Requirement "Missing or invalid provider renders disabled with error" is relaxed when `allowsManualEntry` is true: with no provider, the input is not disabled and opening/focusing it opens the manual-entry modal instead of showing the error.

## Impact

- **Public API**: New prop `allowsManualEntry?: boolean` (default `true`) on `AddressInput`. No breaking changes to existing props or exports.
- **Component**: `AddressInput` will conditionally render or trigger a manual-entry modal (and possibly a small amount of internal state for modal open/close). May depend on Mantine `Modal` and form primitives if not already present.
- **Types**: Existing `Address` and `AddressLookupProvider` remain; no new public types required unless we expose a reusable manual-entry form.
- **Dependencies**: Mantine version compatibility unchanged; modal and form usage must align with the project’s current Mantine major.
- **Testing**: Vitest/React Testing Library tests for `allowsManualEntry` behavior (no-results option, no-provider click opens modal, `allowsManualEntry={false}` preserves current behavior).
- **Storybook**: Stories demonstrating manual entry when no results and when no provider, and `allowsManualEntry={false}`.

## Non-goals

- Customizing which fields appear in the manual form (e.g. region-specific fields) is out of scope for this change; the modal can use a single canonical set of fields derived from `Address`.
- This proposal does not require a separate export of the manual form; it can be internal to the component unless we later decide to expose it.
