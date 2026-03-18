## MODIFIED Requirements

### Requirement: Story folder structure mirrors source

The folder structure under `stories/` SHALL be organized for developer documentation and discoverability. Stories MAY mirror `src/` where that is the clearest mapping, but stories for a primary component MAY be grouped into documentation sections using Storybook titles (e.g. `AddressInput/Overview`, `AddressInput/Usage`) even when that does not strictly mirror the `src/` folder layout.

#### Scenario: Primary component stories are grouped by intent

- **WHEN** Storybook is run or built
- **THEN** the primary component’s stories appear under grouped titles that match common developer intents (overview, usage patterns, manual entry, restrictions) rather than only a flat single file

#### Scenario: Non-component domains can mirror src where helpful

- **WHEN** a domain maps cleanly to a source folder (e.g. `src/formatters/`)
- **THEN** stories MAY live under the corresponding `stories/` subfolder (e.g. `stories/formatters/`) and present as `Formatting/...` in the Storybook sidebar

## ADDED Requirements

### Requirement: Story titles follow a stable, predictable taxonomy

Storybook story titles SHALL follow a small set of stable top-level groups that optimize discoverability for developers reading documentation.

#### Scenario: AddressInput stories have consistent grouping

- **WHEN** a developer browses the Storybook sidebar
- **THEN** `AddressInput` stories are grouped under `AddressInput/Overview`, `AddressInput/Usage`, `AddressInput/Manual entry`, and `AddressInput/Restrictions`

#### Scenario: Provider and formatting stories are separated

- **WHEN** a developer browses the Storybook sidebar
- **THEN** provider integration stories appear under `Providers/...` and formatting docs appear under `Formatting/...`
