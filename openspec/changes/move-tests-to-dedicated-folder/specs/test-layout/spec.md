## ADDED Requirements

### Requirement: Tests live in a dedicated root folder

The project SHALL keep all test files under a single root-level directory named `tests/`. Test files SHALL NOT live under `src/`.

#### Scenario: Tests directory exists at repository root

- **WHEN** the repository is inspected
- **THEN** a directory `tests/` exists at the root of the repository (sibling to `src/`)

#### Scenario: No test files under src

- **WHEN** the repository is inspected for test files (e.g. `*.test.ts`, `*.test.tsx`)
- **THEN** no such files exist under `src/`

### Requirement: Test folder structure mirrors source

The folder structure under `tests/` SHALL mirror the structure under `src/`. For each source file that has a corresponding test, the test file SHALL live at the same relative path under `tests/` as the source file under `src/`, with the test filename reflecting the source (e.g. `src/providers/GooglePlacesProvider.ts` → `tests/providers/GooglePlacesProvider.test.ts`).

#### Scenario: Tests for code in src subfolders

- **WHEN** source code lives under a subfolder of `src/` (e.g. `src/providers/`, `src/formatters/`)
- **THEN** its tests live under the same subfolder under `tests/` (e.g. `tests/providers/`, `tests/formatters/`)

#### Scenario: Tests for code at src root

- **WHEN** source code lives at the root of `src/` (e.g. `src/AddressInput.tsx`, `src/types.ts`)
- **THEN** its tests live at the root of `tests/` (e.g. `tests/AddressInput.test.tsx`, `tests/types.test.ts`)

### Requirement: Test runner discovers and runs tests in tests/

The configured test runner (e.g. Vitest) SHALL be configured to discover test files under `tests/` and SHALL run them when the designated test script is executed. The test script SHALL NOT depend on test files residing under `src/`.

#### Scenario: Test script runs tests under tests/

- **WHEN** the designated test script (e.g. `npm test` or `npm run test`) is run
- **THEN** the test runner discovers and executes test files under `tests/` and all configured tests run

#### Scenario: Test runner does not run tests under src/

- **WHEN** the test runner is configured
- **THEN** its include (or equivalent) configuration is limited to `tests/` (or explicitly excludes `src/`) so that no test files under `src/` are executed

### Requirement: Test files can import from source

Test files under `tests/` SHALL be able to import from `src/` (e.g. components, types, utilities). TypeScript and the test runner SHALL resolve these imports so that tests run and type-check without errors.

#### Scenario: Imports from src resolve at runtime

- **WHEN** a test file under `tests/` imports from `src/` (via path alias or valid relative path)
- **THEN** the test runner resolves the module and the test runs successfully

#### Scenario: Imports from src type-check

- **WHEN** the project’s TypeScript is run (e.g. `tsc --noEmit` or IDE type-check) with test files included
- **THEN** imports from `src/` in test files resolve and type-check without errors
