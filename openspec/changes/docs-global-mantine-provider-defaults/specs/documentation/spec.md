## ADDED Requirements

### Requirement: Documentation explains global AddressInput defaults via MantineProvider

The canonical Storybook documentation page for the library SHALL include a dedicated content section that explains how to configure a shared autocomplete `provider` and other `AddressInput` defaults once at the application root using `MantineProvider` and Mantine theme `components.AddressInput.defaultProps` (for example via `createTheme`). The section SHALL state that per-instance props override theme defaults when both are set.

#### Scenario: Global provider configuration is documented with example code

- **WHEN** a developer reads the canonical documentation page section for global defaults
- **THEN** the page includes a copy-paste-oriented code example that sets `theme.components.AddressInput.defaultProps` (or equivalent) with a `provider` instance
- **THEN** the example shows `AddressInput` usage without requiring `provider` on each instance when defaults are applied

#### Scenario: Additional global props are documented

- **WHEN** a developer reads the same documentation section
- **THEN** the documentation explains that other `AddressInput` props may be set globally via the same `defaultProps` mechanism, with at least one concrete example beyond `provider` (such as `debounce`, `nothingFoundMessage`, `format`, or common Autocomplete passthrough props)

#### Scenario: Live preview optional but consistent with docs examples

- **WHEN** the documentation section includes an interactive example
- **THEN** the preview demonstrates `AddressInput` functioning with `provider` supplied only through theme default props (e.g. via a nested `MantineProvider` in the story), consistent with the accompanying snippet
