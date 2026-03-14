## Context

The repo currently keeps test files next to source under `src/` (e.g. `src/AddressInput.test.tsx`, `src/providers/GooglePlacesProvider.test.ts`). Vitest and TypeScript are already configured for the project. Moving tests to a dedicated root `tests/` folder that mirrors `src/` requires updating config so tests are found, type-checked, and can import from `src/` without changing test behavior.

## Goals / Non-Goals

**Goals:**

- All test files live under a single root `tests/` directory.
- Folder structure under `tests/` mirrors `src/` (e.g. `tests/providers/`, `tests/formatters/`).
- Test runner (Vitest) discovers and runs tests in `tests/`.
- TypeScript and tooling resolve imports from test files to `src/` correctly.
- No change to what is tested or how tests are run from the command line (e.g. `npm test`).

**Non-Goals:**

- Changing test framework, coverage thresholds, or CI steps beyond path/config updates.
- Changing Storybook or documentation layout.
- Introducing new path aliases for production code; only test-side resolution matters.

## Decisions

1. **Root folder name: `tests/`**  
   Use a single top-level `tests/` directory (not `__tests__/` or `test/`) for clarity and to match the user’s request. No nesting under `src/`.

2. **Mirror structure under `tests/`**  
   Replicate `src/` subfolders under `tests/` so that each test file’s path reflects its subject (e.g. `src/providers/GooglePlacesProvider.ts` → `tests/providers/GooglePlacesProvider.test.ts`). Files that live at `src` root (e.g. `AddressInput.test.tsx`, `types.test.ts`) go under `tests/` at the root of the test tree. This keeps mapping obvious and scales with new modules.

3. **Imports from tests to source**  
   Prefer path aliases (e.g. `@/` or `#/` pointing at `src/`) so test files can use the same import style as production code and so moving files under `src/` doesn’t force wide import updates in tests. If the project already has a root alias for `src/`, reuse it for test runs; otherwise add a Vitest/TS alias that resolves to `src/` when running tests. Avoid long relative paths (e.g. `../../../src/...`) in test files.

4. **Vitest config**  
   Set `include` (or equivalent) so Vitest only looks for tests under `tests/` (e.g. `tests/**/*.test.{ts,tsx}`). Ensure `root` or `resolve.alias` allows imports from `src/`. No need to change `exclude` for `src/` if `include` is restricted to `tests/`.

5. **TypeScript**  
   Ensure `tsconfig` used for tests (Vitest’s or a referenced one) includes `tests/` and has the same alias as Vitest for `src/`, so IDE and `tsc` type-check test files and resolve `src/` imports correctly. Prefer a single config that covers both `src/` and `tests/` with the alias, or a small test-specific config that extends the base and adds `tests/`.

6. **ESLint**  
   If ESLint is configured with a path pattern (e.g. `src/`), extend it to include `tests/` so test files are linted. No new rules required unless we want test-specific overrides later (out of scope for this change).

## Risks / Trade-offs

- **Risk**: Alias or path mismatches between Vitest and TypeScript could cause “module not found” at runtime or in the IDE.  
  **Mitigation**: Use the same alias in Vitest config and in the tsconfig that covers tests; run `npm test` and a type-check (e.g. `tsc --noEmit`) after the move.

- **Risk**: Forgotten references to old test paths (e.g. in scripts or docs).  
  **Mitigation**: Search for `src/.*\.test\.` and any script that explicitly lists test paths; update once as part of the change.

- **Trade-off**: Developers must look in two trees (`src/` and `tests/`) instead of one.  
  **Mitigation**: Mirroring structure keeps the mapping obvious; README or contributing doc can state that tests live under `tests/` and mirror `src/`.

## Migration Plan

1. Add `tests/` and subfolders to mirror `src/` (e.g. `tests/providers/`, `tests/formatters/`).
2. Add or confirm path alias for `src/` in Vitest and TypeScript config.
3. Move each test file from `src/` to the corresponding path under `tests/`, and update imports to use the alias (or correct relative path) to `src/`.
4. Update Vitest `include` to `tests/**/*.test.{ts,tsx}` (or equivalent); remove or avoid including `src/**/*.test.*`.
5. Update TypeScript and ESLint to include `tests/` where needed.
6. Run full test suite and type-check; fix any remaining path or config issues.
7. Delete original test files from `src/`.
8. Single PR/commit set; no rollback of behavior beyond reverting the change (no DB or API changes).

## Open Questions

- None. Alias naming (e.g. `@/` vs `#/`) can follow existing project convention if present; otherwise pick one and use it consistently in config and test imports.
