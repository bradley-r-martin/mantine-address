## MODIFIED Requirements

### Requirement: Storybook documents the library component

The project SHALL provide Storybook stories that document the primary library component so that Storybook acts as both a dev and documentation environment.

#### Scenario: Primary component has canonical documentation stories

- **WHEN** Storybook is run or built
- **THEN** a navigable set of canonical stories exists for the primary exported component (e.g. `AddressInput`) covering the common developer intents (overview, usage, manual entry, restrictions)

#### Scenario: Provider-specific stories are grouped separately

- **WHEN** Storybook is run or built
- **THEN** provider integration stories (e.g. Google Places) appear under a dedicated provider group (e.g. `Providers/…`) rather than being mixed into the primary component’s core documentation

#### Scenario: Formatting stories are grouped separately

- **WHEN** Storybook is run or built
- **THEN** formatting documentation appears under a dedicated formatting group (e.g. `Formatting/…`)
