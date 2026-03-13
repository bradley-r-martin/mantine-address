## 0. Single component: remove old AddressInput, rename AddressAutocomplete → AddressInput

- [x] 0.1 Delete `src/AddressInput.tsx` (the current thin TextInput wrapper)
- [x] 0.2 Rename `src/AddressAutocomplete.tsx` to `src/AddressInput.tsx`; inside the file rename the component to `AddressInput`, types to `AddressInputProps` and `AddressInputRef`, factory to `AddressInputFactory`, `useProps` key to `'AddressInput'`, and `displayName` to `'AddressInput'`
- [x] 0.3 Update `src/index.ts`: export only `AddressInput` and types `AddressInputProps`, `AddressInputRef` from `./AddressInput`; remove exports of the old `AddressInput` and of `AddressAutocomplete` / `AddressAutocompleteProps` / `AddressAutocompleteRef`
- [x] 0.4 Rename `src/AddressAutocomplete.test.tsx` to `src/AddressInput.test.tsx` and update all imports and references to use `AddressInput`, `AddressInputProps`, `AddressInputRef`
- [x] 0.5 Rename `src/AddressAutocomplete.stories.tsx` to `src/AddressInput.stories.tsx`; update meta, title, and all story references to `AddressInput` and theme key `AddressInput` (e.g. `theme.components.AddressInput`)

## 1. Component: missing-adapter guard and UX

- [x] 1.1 In `AddressInput.tsx` (the renamed file), add an early-render guard: when `adapter == null` (undefined or null), render the underlying input (e.g. Mantine `Autocomplete`) with `disabled={true}`, `error` set to a clear message that the adapter must be configured (e.g. "Address autocomplete requires an adapter to be configured"), and no `data` or handlers that call the adapter so that no lookup or selection occurs
- [x] 1.2 Ensure the component does not call `adapter.getSuggestions` or `adapter.getDetails` when the guard is active

## 2. Tests for missing or invalid adapter

- [x] 2.1 Add tests in `AddressInput.test.tsx` for the missing-adapter case: when `adapter` is `undefined` or `null`, assert the input is disabled, displays an error with the adapter-must-be-configured message, and that `getSuggestions`/`getDetails` are never called
- [x] 2.2 Add or update a test that with a valid adapter the component behaves as before (no disabled/error state for adapter)

## 3. Storybook: missing-adapter state

- [x] 3.1 Add a Storybook story (or documented example) that shows the component in the error/disabled state when no adapter is provided (e.g. `adapter={undefined}` or a story that conditionally omits the adapter), so the UX is visible in docs
- [x] 3.2 Confirm all other stories pass a valid adapter and that there are no examples implying the component works without one

## 4. Documentation: AddressInput, autocomplete only, adapter required

- [x] 4.1 Update README intro and usage sections to refer to the component as **AddressInput** and state explicitly that it supports **autocomplete only** and that **using an adapter is required**
- [x] 4.2 Add or adjust a short note that without an adapter the field is disabled and shows an error message
- [x] 4.3 Remove or reword any README (or related doc) text that implies the field can work without an adapter or that there is a non-autocomplete (e.g. freeform manual) input mode; remove references to the old separate AddressInput or AddressAutocomplete naming where inconsistent with single AddressInput

## 5. Remove other instances

- [x] 5.1 Search codebase and docs for any remaining examples, comments, or copy that suggest the component can operate without an adapter or offer non-autocomplete usage; remove or update them so the only supported contract is adapter-required, autocomplete-only. Ensure no remaining references to `AddressAutocomplete` in public API or user-facing docs (internal/spec references may remain where describing the change).
