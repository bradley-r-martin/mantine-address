## Why

The library should have a single, clear contract: address input is **autocomplete-only** and **requires an adapter**. There should be only one component—not both a plain `AddressInput` (TextInput wrapper) and `AddressAutocomplete`. Only autocomplete is valid; the package is about address input, so the single component should be named **AddressInput**. This reduces confusion, avoids partial/broken states when an adapter is omitted at runtime, and sets the right expectation that there is no freeform or manual address entry mode—only adapter-backed autocomplete.

## What Changes

- **Single component, rename**: Remove the current `AddressInput` (thin TextInput wrapper). Rename `AddressAutocomplete` to **AddressInput** everywhere (file, component, props/ref types, exports, theme key, stories, tests, README). The package will export one component: `AddressInput`, which is the adapter-required autocomplete implementation.
- **Runtime behavior**: When `AddressInput` (the renamed component) is rendered without a valid adapter (e.g. `adapter` is `undefined` or `null`), the component SHALL render in a **disabled** state, show an **error** state, and display a clear message that the adapter must be configured. No lookup or user input for address selection SHALL occur.
- **Documentation**: README and any other docs SHALL state that the component supports **autocomplete only** and that **using an adapter is required**. Remove or reword any text that implies the field can work without an adapter or that suggests alternative input modes. Docs SHALL refer to the single component as `AddressInput`.
- **Remove other instances**: Remove the old `AddressInput` component and any code paths, examples, or documentation that suggest the component can operate without an adapter or that offer non-autocomplete usage. Ensure a single, consistent story: one component named AddressInput, adapter required, autocomplete only.

**BREAKING**: The current `AddressInput` (TextInput wrapper) is removed. `AddressAutocomplete` is renamed to `AddressInput`; consumers using `AddressAutocomplete` must switch to `AddressInput` (same props/behavior). Type names change (e.g. `AddressAutocompleteProps` → `AddressInputProps`, `AddressAutocompleteRef` → `AddressInputRef`). Runtime behavior when adapter is missing becomes explicit (disabled + error + message).

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- **address-autocomplete** (becomes **AddressInput**): Single component only. Remove current `AddressInput` (TextInput wrapper). Rename `AddressAutocomplete` to `AddressInput` (file, component, types, exports, theme, stories, tests). Add requirement that when adapter is missing or invalid at runtime, the component renders disabled, in error state, with a message that the adapter must be configured; affirm that only autocomplete is supported and adapter is required.
- **documentation**: Require that README (and any related docs) state that the component supports autocomplete only and that an adapter must be configured; refer to the single component as `AddressInput`; remove or adjust any wording that implies operation without an adapter or non-autocomplete modes.

## Impact

- **Components**: Remove `AddressInput.tsx` (current thin wrapper). Rename `AddressAutocomplete.tsx` to `AddressInput.tsx` and rename the component, props (`AddressInputProps`), ref (`AddressInputRef`), factory, displayName, and `useProps` key to `AddressInput`; add guard for missing/invalid adapter (disabled + error + message).
- **Exports**: `src/index.ts` exports only `AddressInput` and its types (no `AddressAutocomplete` or old `AddressInput`).
- **Tests**: Rename test file and references to `AddressInput`; add or update tests for the no-adapter case; ensure theme key and displayName are `AddressInput`.
- **Storybook**: Rename stories to `AddressInput`; ensure stories pass an adapter; add a story for error/disabled state when adapter is not configured.
- **README / docs**: Use `AddressInput` everywhere; say autocomplete-only and adapter required; remove ambiguous or alternative-mode wording.
- **Public API**: Single export `AddressInput` (and `AddressInputProps`, `AddressInputRef`). `adapter` remains required; runtime behavior when it is missing is specified and implemented.

## Non-goals

- Adding new adapter implementations or new input modes.
- Changing the adapter interface or the canonical `Address` type.
- Scope of this change is component behavior, docs, and tests only; testing and Storybook updates are limited to the adapter-required and autocomplete-only messaging and the new error/disabled state.
