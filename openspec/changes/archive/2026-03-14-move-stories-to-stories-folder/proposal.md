## Why

Storybook stories currently live alongside source under `src/` (e.g. `AddressInput.stories.tsx`, `formatAddress.stories.tsx`), which mixes production code and documentation. Moving stories into a dedicated root-level `stories/` folder, with subfolders mirroring `src/` (matching how tests are organized under `tests/`), improves separation of concerns: code in `src/`, tests in `tests/`, stories in `stories/`.

## What Changes

- Add a root-level `stories/` directory.
- Move all story files from `src/` into `stories/`, organizing subfolders to mirror `src/` (e.g. `src/AddressInput.stories.tsx` → `stories/AddressInput.stories.tsx`; any future `src/formatters/foo.stories.tsx` → `stories/formatters/foo.stories.tsx`).
- Update story file imports so they resolve correctly to `src/` (path aliases or relative paths from `stories/` to `src/`).
- Update Storybook and tooling config so stories in `stories/` are discovered and can import from `src/` without breaking.
- Remove story files from `src/`.

No public API or Mantine compatibility changes. This is a repo-structure and tooling change only.

## Capabilities

### New Capabilities

- `story-layout`: Stories live in a dedicated root `stories/` folder; subfolders mirror `src/` (e.g. `stories/AddressInput.stories.tsx`, `stories/formatters/formatAddress.stories.tsx`). Storybook is configured to load stories from `stories/` and to resolve imports to `src/`.

### Modified Capabilities

- None. The existing `storybook` spec describes that Storybook is installed and documents the component; it does not define where story files must live. Behavior and requirements remain the same; only file location changes.

## Impact

- **Code**: All current `*.stories.tsx` (and any `*.stories.ts`) under `src/` are moved; no production code logic changes.
- **APIs**: No change to public API surface or exports.
- **Dependencies**: No new dependencies; Storybook and existing stack unchanged.
- **Tooling**: Storybook config (e.g. `stories` glob) and optionally TypeScript/ESLint must be updated so `stories/` is included and imports from `src/` work.

## Non-goals

- Changing Storybook version, addons, or how Storybook is run in CI (only where story files live).
- Changing test layout or test tooling; tests remain in `tests/` as per existing test-layout spec.
