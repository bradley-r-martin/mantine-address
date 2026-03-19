## 1. Public API and types

- [x] 1.1 Define `AddressData` types (countries catalog + optional async dataset resolvers) and export them from the package
- [x] 1.2 Add `data?: AddressData` to `AddressInputProps` with a default built-in implementation when omitted
- [x] 1.3 Update/introduce any helper types needed to keep `accept`/`prefill` working with string codes (no async required)

## 2. Built-in default data (lazy regions)

- [x] 2.1 Create a synchronous canonical `countries` catalog that does not import per-country datasets
- [x] 2.2 Implement default `regions(countryCode)` resolver using dynamic `import()` per supported country (AU/US)
- [x] 2.3 Add caching for resolved regions datasets (avoid repeated imports/resolution per country within a session)

## 3. Component integration (manual-entry + restrictions)

- [x] 3.1 Refactor manual-entry Country select to use `data.countries`
- [x] 3.2 Refactor State control to resolve options via `await data.regions?.(countryCode)` and show a loading state while pending
- [x] 3.3 Ensure State falls back to text input when no dataset exists (resolver absent or resolves `undefined`)
- [x] 3.4 Ensure `accept` filtering still limits country/state options appropriately without requiring regions dataset for validation

## 4. Utilities and exports migration

- [x] 4.1 Refactor utilities that currently import eager `COUNTRIES` so the `AddressInput` code path no longer depends on an eager countries-with-regions aggregate
- [x] 4.2 Decide and implement approach for `COUNTRIES` export (deprecate, reshape, or keep behind non-default import) consistent with the specs and bundle-size goals

## 5. Tests and Storybook

- [x] 5.1 Add/adjust tests for default behavior (countries list available; AU/US state select appears after lazy load; non-configured countries use text input)
- [x] 5.2 Add/adjust tests for bring-your-own `data` (custom countries list; custom regions resolver)
- [x] 5.3 Add/adjust Storybook stories demonstrating lazy regions loading and BYO data configuration
