## ADDED Requirements

### Requirement: Stories are documentation-quality examples

Storybook stories SHALL prioritize clarity, simplicity, and structure so that they serve as developer documentation rather than an ad-hoc testing harness.

#### Scenario: Stories are concise and single-purpose

- **WHEN** a developer opens an `AddressInput` story
- **THEN** the story demonstrates one primary concept (e.g. controlled usage, manual-only mode, restrictions) without unrelated variations

#### Scenario: Args-first stories are preferred

- **WHEN** a story can be expressed using `args`
- **THEN** the story uses `args` without additional wrapper components

#### Scenario: Render stories are used only for real patterns

- **WHEN** a story requires state to demonstrate a real integration pattern (e.g. controlled usage, form reset)
- **THEN** the story uses `render` with minimal local state and avoids building a “mini app” inside the story

#### Scenario: Provider setup complexity is isolated

- **WHEN** a story requires external setup (e.g. loading Google Maps script)
- **THEN** that setup appears only in provider-specific story groups (e.g. `Providers/Google Places`) and is not duplicated across unrelated story files
