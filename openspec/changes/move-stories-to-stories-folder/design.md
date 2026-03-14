## Context

The repo currently keeps Storybook story files next to source under `src/` (e.g. `src/AddressInput.stories.tsx`, `src/formatAddress.stories.tsx`). Tests have already been moved to a root-level `tests/` folder that mirrors `src/`. Moving stories to a dedicated root `stories/` folder that mirrors `src/` will give a consistent layout: code in `src/`, tests in `tests/`, stories in `stories/`. Storybook is configured in `.storybook/main.ts` with a stories glob pointing at `../src/**/*.stories.@(...)`. Story files use relative imports to `src/` (e.g. `./AddressInput`, `./formatters`). The project has a path alias `@` → `src/` in tsconfig and in Vitest for tests; Storybook uses Vite via `@storybook/react-vite` and may need the same alias so stories in `stories/` can import from `src/`.

## Goals / Non-Goals

**Goals:**

- All story files live under a single root `stories/` directory.
- Folder structure under `stories/` mirrors `src/` (e.g. `stories/AddressInput.stories.tsx`, `stories/formatters/formatAddress.stories.tsx`).
- Storybook discovers and loads stories from `stories/`.
- TypeScript and Storybook resolve imports from story files to `src/` correctly (path alias or relative paths).
- No change to what is documented in Storybook or how Storybook is run (e.g. `npm run storybook`).

**Non-Goals:**

- Changing Storybook version, addons, or CI beyond path/config updates.
- Changing test layout or test tooling.
- Introducing new path aliases for production code; only story-side resolution matters.

## Decisions

1. **Root folder name: `stories/`**  
   Use a single top-level `stories/` directory (sibling to `src/` and `tests/`) for clarity and to match the user’s request. Same pattern as `tests/`.

2. **Mirror structure under `stories/`**  
   Replicate `src/` subfolders under `stories/` so that each story file’s path reflects its subject (e.g. `src/AddressInput.tsx` → `stories/AddressInput.stories.tsx`; `src/formatters/formatAddress.ts` → `stories/formatters/formatAddress.stories.tsx`). Files that live at `src` root stay at the root of `stories/`; files in `src/formatters/` go under `stories/formatters/`. This keeps the mapping obvious and consistent with `tests/`.

3. **Imports from stories to source**  
   Use the same path alias `@` → `src/` that tests use, so story files can use `@/AddressInput`, `@/formatters`, `@/types`, etc. This avoids long relative paths (e.g. `../../src/AddressInput`) and keeps story imports consistent with test imports. Storybook runs on Vite; add `resolve.alias` in Storybook’s config (e.g. `viteFinal` in `.storybook/main.ts`) so that `@` resolves to `src/` when Storybook builds or serves.

4. **Storybook config**  
   In `.storybook/main.ts`, change the `stories` array from `../src/**/*.stories.@(...)` (and any `../src/**/*.mdx`) to `../stories/**/*.mdx`, `../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)`. Do not include `../src/**/*.stories.*` so that only files under `stories/` are loaded.

5. **TypeScript**  
   Ensure the tsconfig that applies to story files (e.g. base or the one Storybook uses) includes `stories/` and has the same `@` path mapping to `src/` so that IDE and type-checking resolve `@/` in story files. If the project already has `paths: { "@/*": ["src/*"] }` in tsconfig and `include` covers the repo or is broad, adding `stories/` to `include` (if needed) and keeping the existing path is sufficient.

6. **ESLint**  
   If ESLint is scoped to specific dirs (e.g. `src/`), extend it to include `stories/` so story files are linted. No new rules required unless we want story-specific overrides later (out of scope).

## Risks / Trade-offs

- **Risk**: Alias or path mismatches between Storybook’s Vite and TypeScript could cause “module not found” at runtime or in the IDE.  
  **Mitigation**: Use the same `@` → `src/` alias in Storybook’s `viteFinal` and in tsconfig; run `npm run storybook` and a type-check after the move.

- **Risk**: Forgotten references to old story paths (e.g. in docs or scripts).  
  **Mitigation**: Search for `src/.*\.stories\.` and any script that explicitly lists story paths; update as part of the change.

- **Trade-off**: Developers look in three trees (`src/`, `tests/`, `stories/`) instead of two.  
  **Mitigation**: Mirroring structure keeps the mapping obvious; README or contributing doc can state that stories live under `stories/` and mirror `src/`.

## Migration Plan

1. Add `stories/` and subfolders to mirror `src/` (e.g. `stories/formatters/` for `formatAddress.stories.tsx`).
2. Add or confirm path alias `@` → `src/` in Storybook’s Vite config (e.g. `viteFinal` in `.storybook/main.ts`).
3. Move each story file from `src/` to the corresponding path under `stories/`, and update imports to use `@/` (or correct relative path) to `src/`.
4. Update `.storybook/main.ts` `stories` glob to `../stories/**/*.mdx`, `../stories/**/*.stories.@(js|jsx|mjs|ts|tsx)`; remove `../src/**/*.stories.*`.
5. Update TypeScript and ESLint to include `stories/` where needed.
6. Run Storybook and type-check; fix any remaining path or config issues.
7. Delete original story files from `src/`.
8. Single PR/commit set; no rollback of behavior beyond reverting the change.

## Open Questions

- None. Alias `@` is already used for tests; reusing it for stories keeps the project consistent.
