## 1. Types and lookup provider interface

- [x] 1.1 Rename `AddressLookupAdapter` to `AddressLookupProvider` in `src/types.ts`; update JSDoc that mentions "adapter" to "provider"
- [x] 1.2 In `src/formatters/types.ts` rename `AddressFormatAdapter` to `AddressFormatProvider` and update JSDoc
- [x] 1.3 In `src/formatters/international.ts` and `src/formatters/australian.ts` use type `AddressFormatProvider` and ensure exports remain (international, australian)
- [x] 1.4 In `src/formatters/index.ts` export `AddressFormatProvider` (and related types) instead of `AddressFormatAdapter`

## 2. Google provider (move and rename)

- [x] 2.1 Create `src/providers/` and add `GooglePlacesProvider.ts`: rename class and options from `GooglePlacesAdapter` / `GooglePlacesAdapterOptions` to `GooglePlacesProvider` / `GooglePlacesProviderOptions`, implement `AddressLookupProvider`; update error messages to say "GooglePlacesProvider" and "provider"
- [x] 2.2 Move/copy implementation from `src/adapters/GooglePlacesAdapter.ts` into `src/providers/GooglePlacesProvider.ts`, then remove `src/adapters/GooglePlacesAdapter.ts` and delete empty `src/adapters/` if applicable
- [x] 2.3 Update `src/providers/GooglePlacesProvider.test.ts` (from adapters): rename class and types to Provider; run tests and fix any failures

## 3. AddressInput component

- [x] 3.1 In `src/AddressInput.tsx` rename prop `adapter` to `provider` (type `AddressLookupProvider`); rename `format` prop type to `AddressFormatProvider`; update error message to "provider must be configured" (or equivalent)
- [x] 3.2 In `src/AddressInput.tsx` replace all usages of `adapter` (variable and prop) with `provider`; keep `format` prop name, only type changes
- [x] 3.3 Update JSDoc and inline comments in `AddressInput.tsx` that mention "adapter" to "provider"

## 4. Package exports

- [x] 4.1 In `src/index.ts` export `GooglePlacesProvider` from `./providers/GooglePlacesProvider`; export `AddressLookupProvider` and `AddressFormatProvider` (replace adapter type names); remove exports of `GooglePlacesAdapter` and adapter type names

## 5. Tests

- [x] 5.1 In `src/AddressInput.test.tsx` rename `createMockAdapter` to `createMockProvider`, use type `AddressLookupProvider`; replace all `adapter` prop and variable names with `provider`; update error message expectation to provider-required text
- [x] 5.2 In `src/types.test.ts` rename `AddressLookupAdapter` to `AddressLookupProvider` and update mock variable names
- [x] 5.3 In `src/mantine-factory-default-props.test.tsx` replace `adapter` prop and type with `provider` and `AddressLookupProvider`
- [x] 5.4 Run full test suite and fix any remaining adapter references or failures

## 6. Storybook

- [x] 6.1 In `src/AddressInput.stories.tsx` rename `mockAdapter` to `mockProvider`, type `AddressLookupProvider`; rename `adapterRef` to `providerRef` and use `GooglePlacesProvider`; replace all `adapter` prop usages with `provider`
- [x] 6.2 Update Storybook story names and descriptions that say "adapter" to "provider" (e.g. "No adapter loaded" → "No provider loaded", "With Google Places Adapter" → "With Google Places Provider")
- [x] 6.3 Update component docs in Storybook (argTypes, description) to describe "provider" instead of "adapter"
- [x] 6.4 Run Storybook and confirm stories render and docs are consistent

## 7. Documentation and copy

- [x] 7.1 In README (if present) replace "adapter" with "provider" where it describes the component (autocomplete only, provider required)
- [x] 7.2 Grep the repo for "adapter" and "Adapter" (excluding `openspec/` and `node_modules`) and fix any remaining references in source, tests, or config

## 8. Verification

- [x] 8.1 Run `npm run build` (or equivalent) and ensure no TypeScript errors
- [x] 8.2 Run lint and tests; fix any issues introduced by the rename
