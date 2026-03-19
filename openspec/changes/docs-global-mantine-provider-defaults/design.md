## Context

`AddressInput` uses Mantine `factory` + `useProps('AddressInput', ...)`; theme defaults are already specified in `openspec/specs/mantine-factory-support/spec.md` and covered by `tests/mantine-factory-default-props.test.tsx`. The gap is **discoverability** on the canonical MDX docs page.

Storybook’s `.storybook/preview.tsx` already wraps stories in `MantineProvider`. A docs preview that demonstrates theme `defaultProps` SHOULD use a **nested** `MantineProvider` with a `createTheme` that only sets `components.AddressInput.defaultProps`, so the example is self-contained and does not rely on undocumented global preview theme.

## Goals / Non-Goals

**Goals:**

- Add a docs section with a **copy-paste** snippet showing `MantineProvider` + `createTheme` + `components.AddressInput.defaultProps` including `provider` and examples of other defaults (`debounce`, `nothingFoundMessage`, `format`, `label`, `placeholder`, etc.).
- Align wording with Mantine 7: instance props override theme defaults (same as `useProps` merge order).

**Non-Goals:**

- New requirements for factory behavior (already specified elsewhere).
- Changing `.storybook/preview.tsx` global theme for all stories.

## Decisions

1. **Section placement**: Insert a new `DocsSection` **after the “Providers” section** in `stories/Docs.mdx` so readers understand `GooglePlacesProvider` (or custom providers) before seeing “set it once on the provider.” Add a matching entry to the `sections` array and an icon (e.g. `IconSettings` or `IconWorldUpload` from Tabler — pick one already used or add import).

2. **Preview story**: Add a focused story file (e.g. `stories/AddressInput/GlobalDefaults.stories.tsx`) that renders:
   - Outer fragment or container
   - `MantineProvider` with `theme={createTheme({ components: { AddressInput: { defaultProps: { provider: mockOrGoogleStub, label: '...', ... } } } })}`
   - Child: `<AddressInput placeholder="..." />` **without** `provider` prop  
     Use the same mock/stub pattern as other AddressInput stories if a non-network provider exists; otherwise use `GooglePlacesProvider` with env key pattern consistent with existing Google stories.

3. **Snippet content**: The MDX `ExampleBlock` snippet should show the **app root** pattern (`createTheme`, `MantineProvider`, `provider` instance), then minimal `<AddressInput />` usage. Mention explicitly that **any prop** merged by `useProps` can be set in `defaultProps`, including Autocomplete passthrough props documented by Mantine.

## Risks / Trade-offs

- **Nested MantineProvider**: Could confuse readers if not labeled — **Mitigation**: Short prose line: “In Storybook this story wraps a nested MantineProvider; in your app, set this on your root provider.”
- **API keys in docs**: **Mitigation**: Keep placeholder key string in snippet; match existing docs style.

## Migration Plan

N/A (documentation only).

## Open Questions

- None; use existing provider demo patterns from `Overview` / `GooglePlaces` stories for the live preview.
