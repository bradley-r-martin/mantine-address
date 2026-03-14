# story-layout Specification

## Purpose

Stories live in a dedicated root-level `stories/` directory; folder structure mirrors `src/`. Storybook is configured to load stories from `stories/` and to resolve imports from story files to `src/`.

## Requirements

### Requirement: Stories live in a dedicated root folder

The project SHALL keep all Storybook story files under a single root-level directory named `stories/`. Story files SHALL NOT live under `src/`.

#### Scenario: Stories directory exists at repository root

- **WHEN** the repository is inspected
- **THEN** a directory `stories/` exists at the root of the repository (sibling to `src/` and `tests/`)

#### Scenario: No story files under src

- **WHEN** the repository is inspected for story files (e.g. `*.stories.ts`, `*.stories.tsx`)
- **THEN** no such files exist under `src/`

### Requirement: Story folder structure mirrors source

The folder structure under `stories/` SHALL mirror the structure under `src/`. For each source file (or logical component) that has a corresponding story, the story file SHALL live at the same relative path under `stories/` as the source file under `src/`, with the story filename reflecting the subject (e.g. `src/AddressInput.tsx` → `stories/AddressInput.stories.tsx`; `src/formatters/formatAddress.ts` → `stories/formatters/formatAddress.stories.tsx`).

#### Scenario: Stories for code in src subfolders

- **WHEN** source code lives under a subfolder of `src/` (e.g. `src/formatters/`)
- **THEN** its stories live under the same subfolder under `stories/` (e.g. `stories/formatters/`)

#### Scenario: Stories for code at src root

- **WHEN** source code lives at the root of `src/` (e.g. `src/AddressInput.tsx`)
- **THEN** its stories live at the root of `stories/` (e.g. `stories/AddressInput.stories.tsx`)

### Requirement: Storybook discovers and loads stories from stories/

The configured Storybook SHALL be configured to discover story files under `stories/` and SHALL load them when the Storybook dev or build script is run. The Storybook config SHALL NOT depend on story files residing under `src/`.

#### Scenario: Storybook loads stories under stories/

- **WHEN** the designated Storybook script (e.g. `npm run storybook` or `npm run build:storybook`) is run
- **THEN** Storybook discovers and loads story files under `stories/` and all configured stories appear in the Storybook UI

#### Scenario: Storybook does not load stories under src/

- **WHEN** Storybook is configured
- **THEN** its stories glob (or equivalent) is limited to `stories/` (or explicitly excludes `src/`) so that no story files under `src/` are loaded

### Requirement: Story files can import from source

Story files under `stories/` SHALL be able to import from `src/` (e.g. components, types, formatters). TypeScript and Storybook's bundler SHALL resolve these imports so that stories run and type-check without errors.

#### Scenario: Imports from src resolve at runtime

- **WHEN** a story file under `stories/` imports from `src/` (via path alias or valid relative path)
- **THEN** Storybook's bundler resolves the module and the story renders successfully

#### Scenario: Imports from src type-check

- **WHEN** the project's TypeScript is run (e.g. `tsc --noEmit` or IDE type-check) with story files included
- **THEN** imports from `src/` in story files resolve and type-check without errors
