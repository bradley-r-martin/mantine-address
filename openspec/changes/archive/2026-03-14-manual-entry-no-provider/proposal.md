# Manual entry when no provider / preventManualEntry prop

## Why

The current API treats "no provider" as a special case that depends on `allowsManualEntry`: when `allowsManualEntry` is false and there is no provider, the input is disabled with an error. This is confusing. We want a simpler rule: **no provider means manual input only**. When a provider is set, we then allow an opt-out of manual entry via a single prop that is only relevant in that case.

## What Changes

- **No provider → manual-only mode**: When `provider` is not set (undefined or null), the component SHALL always behave as manual-entry only: the input is enabled, and focus/click opens the manual-entry modal. There is no "provider required" error or disabled state. The component does not perform any lookup.
- **Rename prop**: Replace `allowsManualEntry` with `preventManualEntry`.
  - **BREAKING**: `allowsManualEntry` is removed. Consumers using `allowsManualEntry={false}` must switch to `preventManualEntry={true}`.
- **Semantics of `preventManualEntry`**: When `true`, the component does not show an "Enter manually" option when the provider returns no results and does not allow opening the manual-entry modal from the dropdown. When `false` or omitted, manual entry is allowed when a provider is set (no-results + "Enter manually" option). This prop is **only meaningful when a provider is set**; when there is no provider, manual entry is always the only path and this prop has no effect (and should not be documented as applying in that case).
- **Public API**: `AddressInput` props: `provider` remains optional; add `preventManualEntry?: boolean` (default `false`); remove `allowsManualEntry`. Types and exports remain compatible aside from the prop rename.

## Capabilities

### New Capabilities

_None._

### Modified Capabilities

- **address-autocomplete**: Require that when no provider is supplied the component always uses manual-only mode (no disabled/error state). When provider is supplied, no-results behavior is gated by `preventManualEntry` (show/hide "Enter manually"). Remove requirements that reference `allowsManualEntry` or a "provider required" state when manual entry is disabled.
- **manual-address-entry**: Change requirement from `allowsManualEntry` to `preventManualEntry`; specify that `preventManualEntry` applies only when a provider is set, and that with no provider the component always allows (and only allows) manual entry.

## Impact

- **Affected code**: `src/AddressInput.tsx` (props, default props, branch when `provider == null`, dropdown data when no results, JSDoc). `src/index.ts` and types only if re-exporting prop types.
- **API**: Breaking change for any consumer passing `allowsManualEntry`. Documentation and Storybook stories that reference `allowsManualEntry` must be updated.
- **Dependencies**: No new dependencies. Mantine version compatibility unchanged.

## Non-goals

- Changing behavior of the manual-entry modal itself, form fields, or format provider usage.
- Adding new provider types or lookup behavior.
- Scope: unit tests and Storybook stories will be updated to reflect the new prop and no-provider behavior; no separate "migration guide" doc is in scope for this change.
