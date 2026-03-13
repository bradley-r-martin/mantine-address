## Why

Consumers using Mantine typically configure default props and theming via `MantineProvider` and `createTheme` (e.g. `theme.components`). The library’s `AddressInput` and `AddressAutocomplete` are plain function components with inline defaults, so they do not participate in that system. Adding Mantine factory and `useProps` support lets apps set default props and theme overrides for these components in one place, consistent with other Mantine components.

## What Changes

- **AddressInput** and **AddressAutocomplete** are refactored to use Mantine’s `factory` and `useProps` so they integrate with `theme.components` and default props.
- Component-level default props (e.g. `label`, `placeholder`, `nothingFoundMessage`, `debounce`) are defined in a single object and passed to `useProps`, so theme-level defaults from `MantineProvider` override them when set.
- Both components gain static `.extend()` and `.withProps()` (and any other factory static methods) so consumers can do e.g. `AddressInput.extend({ defaultProps: { label: 'Street' } })` in their theme or `AddressInput.withProps({ placeholder: '...' })` for one-off usage.
- Public props and behavior remain the same; only the internal construction and default-resolution order (theme → component defaults → props) change.
- No new peer dependencies; `@mantine/core` already provides `factory` and `useProps`.

**Non-goals:** This change does not add new visual variants, Styles API, or CSS modules for these components unless needed for the factory integration. Tests and Storybook should be updated only to assert the new default-resolution behavior and to document theme usage.

## Capabilities

### New Capabilities

- `mantine-factory-support`: AddressInput and AddressAutocomplete use Mantine `factory` and `useProps` so defaultProps and `theme.components` can be set on MantineProvider; components support `.extend()` and `.withProps()`.

### Modified Capabilities

- None. Existing specs (e.g. address-autocomplete) describe props and behavior; they are unchanged. Theme/defaultProps are an additive integration.

## Impact

- **Affected code:** `src/AddressInput.tsx`, `src/AddressAutocomplete.tsx` (and their types/exports). Possibly `src/index.ts` if export shape changes.
- **APIs:** Public props stay the same. New: components are factory-created and support `.extend()` / `.withProps()`; default prop resolution order is theme → component defaults → props.
- **Dependencies:** No new dependencies; requires `@mantine/core` (already peer, v7+).
- **Compatibility:** Mantine 7+ patterns only; no support for pre-factory Mantine versions.
