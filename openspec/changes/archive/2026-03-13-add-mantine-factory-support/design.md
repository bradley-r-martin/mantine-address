## Context

The library exposes `AddressInput` and `AddressAutocomplete` as plain function components. Defaults (e.g. `label`, `placeholder`, `debounce`, `nothingFoundMessage`) are applied inline in the component. This prevents consumers from setting defaults or theme overrides via `MantineProvider` and `createTheme({ components: { ... } })`, which is the standard Mantine 7 pattern. The goal is to make both components participate in that system using `factory` and `useProps` without changing public API or behavior.

## Goals / Non-Goals

**Goals:**

- Refactor `AddressInput` and `AddressAutocomplete` to use Mantine’s `factory()` and `useProps()` so they respect `theme.components` and default props.
- Preserve existing public props and behavior; only default-resolution and construction change.
- Expose `.extend()` and `.withProps()` on both components so consumers can configure defaults in theme or create presets.

**Non-Goals:**

- Adding Styles API, CSS modules, or new visual variants for these components.
- Supporting Mantine versions that do not provide `factory` / `useProps` (pre–v7 behavior).
- Changing `AddressAutocomplete`’s adapter/value/onChange contract or `AddressInput`’s prop surface.

## Decisions

### 1. Use `factory` + `useProps` (no full Styles API)

- **Choice:** Use `factory()` to wrap the component and `useProps(componentName, defaultProps, props)` inside it. Do not introduce `useStyles`, `createVarsResolver`, or CSS modules unless we need them for styling.
- **Rationale:** Default props and theme integration only require `useProps`. The custom components guide’s full example includes Styles API for components that need classNames/styles/variants; our components delegate to `TextInput` and `Autocomplete`, which already handle styling.
- **Alternative:** Full factory + useStyles + CSS modules would allow future theme-based styling of our wrappers but adds scope and complexity; we can add later if needed.

### 2. Component names for theme registration

- **Choice:** Use stable string names for `useProps` (e.g. `'AddressInput'` and `'AddressAutocomplete'`) so consumers can register them in `theme.components` as `AddressInput` and `AddressAutocomplete`.
- **Rationale:** Mantine resolves theme defaults by component name; the string in `useProps` must match the key used in `theme.components`.
- **Alternative:** Using different names would break theme lookup; we keep names aligned with the exported component names.

### 3. Factory type shape (minimal)

- **Choice:** Define a minimal `Factory` type for each component: `props` and `ref` (and `ref` only where we actually forward refs). Omit `stylesNames`, `vars`, `variant` unless we add Styles API later.
- **Rationale:** Matches Mantine’s “component has no styles or does not expose Styles API” example; keeps types simple and avoids unused style infrastructure.
- **Alternative:** Full Factory with stylesNames/vars would be needed if we add Styles API in a future change.

### 4. Ref forwarding

- **Choice:** Decide ref behavior per component: `AddressInput` wraps `TextInput` and should forward ref to the input; `AddressAutocomplete` wraps `Autocomplete` and should forward ref to the combobox input. Use the same ref semantics as the underlying Mantine component.
- **Rationale:** Form libraries and parent components often attach refs to inputs; preserving ref forwarding avoids breaking existing usage.
- **Alternative:** Not forwarding refs would simplify the factory type but harm compatibility.

### 5. Default props typing

- **Choice:** Define default props objects with `satisfies Partial<...Props>` so `useProps` infers types correctly (per Mantine custom components guide).
- **Rationale:** Using `Partial<...>` alone can widen inferred types (e.g. optionality); `satisfies` keeps defaults correctly typed for `useProps`.

## Risks / Trade-offs

- **Risk:** Typings for `factory`/`useProps` may differ slightly between Mantine 7.x minors; we depend on the public API documented for v7.
  **Mitigation:** Peer dependency is already `@mantine/core` >= 7; we do not lock to a specific minor. If a future Mantine release changes the factory API, we can adjust in a new release.

- **Risk:** Consumers who pass `defaultProps` on the component (React defaultProps) might expect different precedence than theme.
  **Mitigation:** We do not use React’s `defaultProps`; we use only `useProps`. Documentation and Storybook will state that theme defaults override component-level defaults, and props override both.

- **Trade-off:** We do not add Styles API now, so theme-based overrides are limited to default props (and any props the underlying TextInput/Autocomplete accept). Custom styling of the wrapper itself would require a follow-up.

## Migration Plan

- **Code:** In-place refactor of `AddressInput.tsx` and `AddressAutocomplete.tsx`; no new files required unless we split types. Export the same symbols from `index.ts`; the exported components will be factory-created and have `.extend()` / `.withProps()`.
- **Consumers:** No breaking changes. Existing usage continues to work. New usage: consumers can add `AddressInput` and `AddressAutocomplete` to `theme.components` with `defaultProps` and/or `.extend({ defaultProps: { ... } })`.
- **Rollback:** Revert the refactor; no data or config migration.

## Open Questions

- None. Ref forwarding behavior (Decision 4) will be confirmed during implementation (whether both components already forward refs or need to be updated).
