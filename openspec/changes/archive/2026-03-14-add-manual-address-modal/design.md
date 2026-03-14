## Context

AddressInput is a Mantine-based autocomplete that requires an `AddressLookupProvider` and only allows setting an address by selecting a suggestion. When the provider returns no results, it shows a static "no results" message. When no provider is supplied, it renders disabled with an error. There is no way to set an address manually. The change adds an optional manual-entry path: a modal with a form that produces an `Address`, gated by a new `allowsManualEntry` prop (default `true`).

## Goals / Non-Goals

**Goals:**

- Add a manual-entry modal that collects address fields and commits a single `Address`, then closes and updates the input value.
- Add `allowsManualEntry` (default `true`) so that: (1) when the provider returns no results, the dropdown offers an "enter manually" option that opens the modal; (2) when there is no provider, focusing/clicking the input opens the modal instead of showing a disabled error.
- Keep the existing autocomplete flow unchanged when `allowsManualEntry` is `false` and when a provider is present and returns results.
- Use Mantine primitives (e.g. Modal, TextInput, etc.) and stay consistent with existing component patterns.

**Non-Goals:**

- Exposing the manual form as a separate public component or customizing its fields per region.
- Changing the `Address` type or provider interface.

## Decisions

### Modal and form placement

- **Decision**: Implement the manual-entry form inside a Mantine `Modal`, rendered as part of `AddressInput` (or a small internal sub-component), not as a separate exported component.
- **Rationale**: Keeps the API surface minimal and avoids committing to a reusable form API. Consumers only need `AddressInput` and the new prop.
- **Alternative**: A separate `<ManualAddressForm />` export would allow reuse but expands the public API and was deferred.

### When to open the modal (no provider)

- **Decision**: When there is no provider and `allowsManualEntry` is true, opening the input (e.g. click or focus) opens the manual-entry modal. The input remains focusable/clickable and does not show the "provider required" error in this case.
- **Rationale**: Matches the requested behavior ("when you click on the addressInput it should show the modal") and gives a single, clear entry point when autocomplete is not available.
- **Alternative**: Showing a button next to a disabled input would add UI complexity and was not chosen.

### "Enter manually" in the no-results dropdown

- **Decision**: When the provider returns no results for a non-empty query and `allowsManualEntry` is true, show a selectable dropdown option (e.g. "Enter manually") that opens the manual-entry modal. Optionally pre-fill the modal with the current query as a single line (e.g. street) if useful.
- **Rationale**: Keeps the flow inside the same component and gives users a direct path when autocomplete fails.
- **Alternative**: A separate button outside the dropdown would be less discoverable.

### Form fields in the modal

- **Decision**: The modal form collects a canonical set of fields that map to `Address` (e.g. street number/name, suburb, state, postcode, country). Exact field list and layout (single line vs multiple inputs) are implementation details; the spec does not mandate a specific layout.
- **Rationale**: Balances usability with scope; we can start with a simple layout and refine without changing the proposal.

### TypeScript: provider optional when allowsManualEntry

- **Decision**: When `allowsManualEntry` is true, treat `provider` as optional in the component’s runtime behavior (allow null/undefined and open modal on interaction). TypeScript typing can remain `provider: AddressLookupProvider` with an explicit allowlist for "no provider" (e.g. `provider?: AddressLookupProvider | null`) so that both "provider required" and "provider optional when manual entry" are expressible.
- **Rationale**: Making `provider` optional in the type when manual entry is allowed avoids forcing consumers to pass a dummy provider and matches the described behavior.
- **Alternative**: Keeping `provider` required in the type and only changing runtime behavior would force `provider={undefined!}` or similar when using manual-only mode.

## Risks / Trade-offs

- **Modal accessibility**: Modal MUST be focus-trapped and dismissible (Escape, overlay click if desired). Use Mantine Modal’s built-in behavior to avoid focus escaping to the page. [Risk: keyboard/screen-reader issues] → Rely on Mantine Modal a11y and test with keyboard and a screen reader where possible.

- **Form validation**: The manual form can allow partial addresses (all fields optional in `Address`). We may accept and commit partial addresses and let consumers validate. [Risk: invalid or incomplete addresses stored] → Document that the component does not enforce completeness; consumers can validate in `onChange` if needed.

- **Double trigger (no provider)**: Clicking the input could both open the dropdown (empty) and the modal. Decide whether focus/click opens the modal immediately when there is no provider, or only after the user explicitly chooses "Enter manually" from an empty dropdown. Per proposal, "when you click on the addressInput it should show the modal" → prefer opening the modal on click/focus when there is no provider, without requiring a dropdown step.

## Migration Plan

- No breaking changes. New prop `allowsManualEntry` defaults to `true`, so existing usages gain the new behavior (no-results "enter manually" and no-provider modal). Consumers who want the old strict behavior (no manual entry, disabled when no provider) can set `allowsManualEntry={false}`.
- Rollback: revert the change and release a patch; no data or config migration.

## Open Questions

- None blocking. Optional follow-up: whether to pre-fill the manual form with the current autocomplete query when opened from the no-results state.
