## Why

Consumers often use the same autocomplete provider (and other defaults such as debounce, formatter, or labels) across many `AddressInput` instances. Repeating `provider={...}` on every field is noisy and easy to drift. The component already integrates with Mantine’s `useProps` / theme `defaultProps` pattern, but the main docs page does not explain how to configure defaults once at the app root via `MantineProvider`.

## What Changes

- Add a new documentation section to `stories/Docs.mdx` that explains setting **`theme.components.AddressInput.defaultProps`** (or equivalent `MantineProvider` `theme` prop) to supply a shared **`provider`** instance.
- In the same section, document that **other `AddressInput` props** supported by Mantine’s default-props mechanism (e.g. `debounce`, `nothingFoundMessage`, `format`, `preventManualEntry`, `label`, `placeholder`, and other passthrough Autocomplete props) can be set globally the same way, with a short note that per-instance props still override theme defaults.
- Optionally add a Storybook story used as the live preview for that example (if the docs pattern requires a `<Story />` reference); otherwise use a code-only `ExampleBlock` if consistent with adjacent sections.
- **Non-goals**: No change to runtime component behavior or public API; no new npm exports unless needed for the doc example only.

## Capabilities

### New Capabilities

- _(none — documentation-only change scoped under existing documentation capability)_

### Modified Capabilities

- `documentation`: Add a normative requirement that the canonical docs page documents app-wide default `provider` and other `AddressInput` props via `MantineProvider` / theme `components.AddressInput.defaultProps`.

## Impact

- **Affected**: `stories/Docs.mdx` (new section, navigation entry in `sections` if we add a titled section), possibly a small story file under `stories/AddressInput/` or `stories/docs/` for preview.
- **Testing / Storybook**: Verify Storybook builds and the new section renders; add or extend a story only if a live preview is included.
- **API / dependencies**: None.
