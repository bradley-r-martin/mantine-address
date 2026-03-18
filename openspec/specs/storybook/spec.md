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
