# storybook Specification

## Purpose

TBD - created by archiving change setup-library. Update Purpose after archive.

## Requirements

### Requirement: Storybook is installed and runnable

The repository SHALL include Storybook configured for the library so that developers can run a local Storybook dev server and build a static Storybook for deployment.

#### Scenario: Run Storybook locally

- **WHEN** a developer runs the configured Storybook start script (e.g. `npm run storybook`)
- **THEN** a local Storybook dev server starts and serves the library’s stories

#### Scenario: Build static Storybook

- **WHEN** a developer or CI runs the configured Storybook build script (e.g. `npm run build:storybook`)
- **THEN** a static Storybook build is produced (e.g. in a defined output directory) suitable for deployment (e.g. GitHub Pages)

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

### Requirement: Restriction stories provide country and region selection

The Storybook stories that document address restrictions (e.g. `AddressInput/Restrictions`) SHALL provide a way to choose a country and, when the chosen country has a state/region list, a region from the Storybook UI, and SHALL pass the selected values to `AddressInput`'s `accept` prop so that users can test different country and region combinations without editing story source code.

#### Scenario: User selects country and region in restriction story

- **WHEN** a developer opens a restriction documentation story that uses the country/region selector
- **THEN** a country select (e.g. "Any", AU, US) and, when applicable, a region select (e.g. NSW, VIC for AU; CA, NY for US) are visible
- **THEN** changing the country or region updates the `accept` prop passed to `AddressInput` and the component reflects the new restriction (e.g. manual form or autocomplete validation)

#### Scenario: No restriction when "Any" or equivalent is selected

- **WHEN** the user selects "Any" (or equivalent) for country in the restriction story
- **THEN** `AddressInput` receives no country (or region) restriction and accepts any address as per the address-restrictions spec
