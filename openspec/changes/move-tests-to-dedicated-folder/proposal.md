## Why

Tests currently live alongside source under `src/`, which mixes production and test code and makes it harder to configure tools (e.g. exclude tests from builds) and to reason about the project layout. Moving tests into a dedicated root-level `tests/` folder, with subfolders mirroring `src/`, improves separation of concerns and aligns with common conventions for test layout.

## What Changes

- Add a root-level `tests/` directory.
- Move all test files from `src/` into `tests/`, organizing subfolders to mirror `src/` (e.g. `src/providers/GooglePlacesProvider.test.ts` → `tests/providers/GooglePlacesProvider.test.ts`).
- Update test file imports so they resolve correctly to `src/` (e.g. path aliases or relative paths from `tests/` to `src/`).
- Update test runner and tooling config (e.g. Vitest, TypeScript, ESLint) so tests in `tests/` are discovered and run, and so they can import from `src/` without breaking.
- Remove test files from `src/`.

No public API or Mantine compatibility changes. This is a repo-structure and tooling change only.

## Capabilities

### New Capabilities

- `test-layout`: Tests live in a dedicated root `tests/` folder; subfolders mirror `src/` (e.g. `tests/providers/GooglePlacesProvider.test.ts`). Tooling is configured to run and type-check tests in `tests/` and to resolve imports to `src/`.

### Modified Capabilities

- None. Existing specs describe behavior and quality; none define where test files must live.

## Impact

- **Code**: All current `*.test.ts` / `*.test.tsx` files under `src/` are moved; no production code logic changes.
- **APIs**: No change to public API surface or exports.
- **Dependencies**: No new dependencies; existing test stack (e.g. Vitest, RTL) unchanged.
- **Tooling**: Vitest config, tsconfig (or path aliases), and optionally ESLint/ignore patterns must be updated so `tests/` is included and imports from `src/` work.

## Non-goals

- Changing test framework, coverage targets, or how tests are run in CI (only where they live).
- Adding or changing Storybook stories; Storybook scope is unchanged.
