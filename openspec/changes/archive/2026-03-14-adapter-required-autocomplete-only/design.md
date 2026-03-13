## Context

The library currently exposes two components: `AddressInput` (a thin TextInput wrapper) and `AddressAutocomplete` (adapter-backed autocomplete). Only autocomplete is valid for this package; the plain TextInput wrapper is redundant and confusing. The library should expose a single component named **AddressInput** (the current autocomplete implementation renamed), because the package is about address input. The `adapter` prop is already required in TypeScript, but runtime can still receive `undefined` or `null`. Documentation does not uniformly state that an adapter is required and that only autocomplete is supported, and the component does not explicitly handle the missing-adapter case with a clear UX (disabled + error + message).

## Goals / Non-Goals

**Goals:**

- **Single component**: Remove the current `AddressInput` (TextInput wrapper). Rename `AddressAutocomplete` to **AddressInput** everywhere (file name, component name, props/ref types, exports, theme key `AddressInput`, stories, tests, README). The public API is one component: `AddressInput`, with `AddressInputProps` and `AddressInputRef`.
- When `adapter` is missing or invalid at runtime, render the input **disabled**, in **error** state, with a clear message that the adapter must be configured; no lookup or selection behavior.
- Update README and any related docs to state that the component supports **autocomplete only** and that **using an adapter is required**; refer to the component as `AddressInput`; remove or reword text that implies operation without an adapter or non-autocomplete modes.
- Remove any remaining code or docs that suggest the component can work without an adapter or offer non-autocomplete usage.

**Non-Goals:**

- Changing the adapter interface, the `Address` type, or adding new input modes.
- Supporting optional adapter or fallback behavior when adapter is missing.

## Decisions

1. **Treat "missing adapter" as invalid at runtime**  
   Even though TypeScript marks `adapter` as required, we treat `undefined` and `null` as invalid. If in the future the type were made optional (e.g. `adapter?: AddressLookupAdapter`), the same runtime guard would apply.  
   _Alternative considered:_ Rely only on TypeScript and let the app crash or behave oddly when adapter is missing. Rejected so that misconfiguration fails fast with a clear, disabled state instead of on first interaction.

2. **Single message for missing adapter**  
   Use one user-facing message (e.g. "Address autocomplete requires an adapter to be configured") shown as the input's error. No need for multiple messages or i18n in this change; the message can be overridable later via a prop or theme if needed.  
   _Alternative considered:_ Different messages for `undefined` vs invalid object. Rejected to keep the contract simple: "adapter must be configured."

3. **Implement via early return in the component**  
   At the top of the component render (in the renamed `AddressInput`), if `adapter == null` (or equivalent invalid check), render the same Mantine `Autocomplete` (or a thin wrapper) with `disabled={true}`, `error={message}`, and no `data` / no handlers that call the adapter. No separate "placeholder" component.  
   _Alternative considered:_ A dedicated "AddressInputNotConfigured" component. Rejected to avoid extra exports and to keep a single component with a single contract.

4. **Rename AddressAutocomplete to AddressInput**  
   The single public component shall be named `AddressInput` (file `AddressInput.tsx`, component `AddressInput`, types `AddressInputProps` and `AddressInputRef`, theme key `AddressInput`, displayName `'AddressInput'`). The current `AddressInput.tsx` (TextInput wrapper) is deleted. This aligns the package name and primary export with user expectation: "address input" is this component.  
   _Alternative considered:_ Keep the name `AddressAutocomplete`. Rejected because the package is "mantine-address-input" and the single valid UI is address input via autocomplete; naming the component `AddressInput` is clearer.

5. **Documentation wording**  
   README intro and usage sections will refer to the single component as **AddressInput** and explicitly say: it provides address **autocomplete only**; **an adapter must be configured**; without an adapter the field is disabled and shows an error. Remove or reword any phrase that could imply the field works without an adapter or that there is a non-autocomplete mode.

## Risks / Trade-offs

- **Runtime check cost**: A single `adapter == null` check per render is negligible.
- **Type vs runtime**: TypeScript still has `adapter` as required, so well-typed code will not pass `undefined`. The guard protects dynamic/config-driven or incorrectly typed usage.
- **Message string**: Hardcoded English message may need to be made configurable or themeable in a future change if the library gains i18n or theme overrides for this state.
