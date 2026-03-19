## Why

Developers need to pre-fill the manual-entry form (e.g. country and region) using shared constants (e.g. `REGIONS.NEW_SOUTH_WALES`, `COUNTRIES.AU`) for type safety and consistency with the rest of the API. The existing `defaultAddress` prop only accepts `Partial<Address>` (strings), so consumers must use string codes and lose the benefit of imported constants. Adding a dedicated `prefill` prop that accepts `Country` and `Region` for country/state makes the manual form prefill API consistent with `accept` and encourages constant-based usage.

## What Changes

- **New `prefill` prop** on `AddressInput`: optional partial prefill for the manual-entry form. When the user opens the manual modal, form fields are initialized from `prefill` (and optionally from existing `defaultAddress` when `prefill` does not override). The type SHALL allow `country?: string | Country` and `state?: string | Region` (in addition to other `Address` string fields) so that consumers can pass e.g. `prefill={{ country: COUNTRIES.AU, state: REGIONS.NEW_SOUTH_WALES }}` instead of string-only values.
- **Prefer constants**: Documentation and Storybook SHALL demonstrate and prefer `prefill={{ region: NEW_SOUTH_WALES }}` (or `REGIONS.NEW_SOUTH_WALES`) over `prefill={{ region: 'NSW' }}`. String values remain supported for backward compatibility and simple use cases.
- **Storybook**: Add a **Prefill** story group under `AddressInput` that documents the `prefill` prop with examples using constants (e.g. country + region, partial fields).
- **Public API**: New prop only; no breaking changes. `defaultAddress` remains supported; when both `prefill` and `defaultAddress` are provided, behavior is defined in design (e.g. prefill takes precedence for overlapping fields).

## Capabilities

### New Capabilities

- `address-prefill`: Defines the `prefill` prop: type (including `string | Country` for country and `string | Region` for state), resolution of Region/Country to form values when opening the manual modal, and that all manual fields can be prefilled. Covers Storybook Prefill group under AddressInput.

### Modified Capabilities

- `storybook`: Add requirement for a **Prefill** story group under AddressInput that documents the prefill prop with constant-based examples.

## Impact

- **Code**: `AddressInput` props interface, manual-form initialization in `openManualModal`, and a small type/helper to resolve `Country`/`Region` to codes for the form.
- **Exports**: Optional export of a `PrefillAddress` (or equivalent) type if useful for consumers; otherwise the prop type is inlined in `AddressInputProps`.
- **Storybook**: New `AddressInput/Prefill` story file(s) and group.
- **Compatibility**: Additive only; Mantine version compatibility unchanged.

## Non-goals

- Changing or removing `defaultAddress` in this change; both props can coexist with clear precedence.
- Testing scope: existing manual-entry and default-address tests will be extended for prefill; no new test framework.
- Storybook scope: only the new Prefill group and necessary stories; no broader Storybook restructure.
