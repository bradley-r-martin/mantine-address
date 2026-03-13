## Context

The repo is a TypeScript/React/Mantine library with no formal tooling yet: no Storybook, no shared format/lint config, no CI, and no commit enforcement. The proposal adds Storybook, Prettier, ESLint, Husky, and GitHub Actions to standardize development and release. Constraints: keep the existing tech stack (TypeScript, React, Mantine), support Conventional Commits, ensure PRs validate OpenSpec usage and do not bump version, and that releases are triggered by GitHub Release creation (merge next into main, bump version, publish to npm and Storybook to GitHub Pages).

## Goals / Non-Goals

**Goals:**

- Storybook for local dev and published docs (e.g. GitHub Pages).
- Single source of truth for format (Prettier) and lint (ESLint) with scripts and config in repo.
- Husky pre-commit hooks that run format/lint (and related checks) so broken style or lint never gets committed.
- GitHub Actions: PR workflow on `next` (tests, format, lint, commit message, build, OpenSpec check; PRs must not bump `package.json` version) and release workflow triggered by GitHub Release creation (version from release → merge next into main, bump version, publish to npm, publish Storybook to GitHub Pages).
- README and contribution documentation so users and contributors know how to use the library and how to contribute (scripts, commit format, OpenSpec, CI).

**Non-Goals:**

- Changing library public API or Mantine compatibility.
- Defining exact coverage or story-count targets; “tests run on PR” and “Storybook exists and is published” suffice for this change.

## Decisions

- **Storybook framework**: Use Storybook for React/Vite (or existing bundler). Aligns with typical TS/React libs and fast dev experience. Alternative: Webpack-based Storybook — rejected for heavier setup and slower dev.
- **CI layout**: One PR workflow (e.g. `ci.yml`) that runs on pull requests targeting `next`, with jobs for test, format, lint, commitlint, build, OpenSpec check, and (optionally) a check that `package.json` version is unchanged. One release workflow (e.g. `release.yml`) triggered by GitHub Release creation (e.g. `release:published` or tag push) that reads the release version, merges `next` into `main`, bumps `package.json` to that version, builds, publishes to npm, and deploys Storybook. Keeps PR vs release concerns separate; releases are explicit and version is never set in a PR.
- **OpenSpec in CI**: Run `openspec` (or equivalent) in a PR job to verify change artifacts (e.g. proposal/design/specs/tasks) are present and valid where required. Exact rule (e.g. “every change dir has tasks”) can be defined in workflow or a small script.
- **Prettier + ESLint**: Use Prettier for formatting and ESLint for lint; integrate with `eslint-config-prettier` (and optionally `eslint-plugin-prettier`) to avoid conflicts. Standard choice for TS/React.
- **Husky**: Use Husky for git hooks; pre-commit runs format check, lint, and a branch-name check with two modes: (1) **active change branch** — the branch name must match a directory directly under `openspec/changes/` (e.g. branch `setup-library` → `openspec/changes/setup-library/` exists); (2) **archive branch** — the branch name must end with `-archive` (e.g. `setup-library-archive`), the stripped name (`setup-library`) must correspond to an entry under `openspec/changes/archive/`, and the staged files must all be under `openspec/` (any staged file outside `openspec/` causes the commit to be aborted). commit-msg runs commitlint so Conventional Commits are enforced locally. CI runs the same commitlint and branch-name checks on PRs so both local and merge paths are covered.
- **.gitignore**: Add a root `.gitignore` with entries typical for a TypeScript/React library: `node_modules`, `dist`, `coverage`, `storybook-static`, `.env*`, OS/IDE files (e.g. `.DS_Store`, `*.log`), and lockfile or local overrides if desired. Keeps the repo clean and avoids committing build artifacts or secrets.
- **Branch strategy**: Use two long-lived branches. **`next`**: integration branch; default branch for the repo so that PRs target it. All feature/fix PRs merge here; `package.json` version MUST NOT be changed in PRs (CI can enforce). **`main`**: released code only; updated only by the release workflow. When a maintainer creates a GitHub Release (e.g. v1.2.3), the release workflow merges `next` into `main`, sets `package.json` version to the release version, commits (and pushes) to `main`, publishes to npm, and deploys Storybook. This avoids accidental publishes and keeps version bumps explicit and tied to the release UI. **Branch naming — active changes**: The name of the branch used for a PR (the head branch) MUST match the name of a directory under `openspec/changes/` (e.g. branch `setup-library` for change `openspec/changes/setup-library/`). CI fails if the branch name does not correspond to an existing, non-archived OpenSpec change. **Branch naming — archive branches**: Once a change is archived (moved under `openspec/changes/archive/`), the archive commit is made on a branch named `<change-name>-archive` (e.g. `setup-library-archive`). CI and Husky detect the `-archive` suffix, strip it to derive the change name, and verify the corresponding entry exists under `openspec/changes/archive/`. On archive branches, CI additionally enforces that the PR diff contains only files under `openspec/` — no code, config, or other non-OpenSpec changes are permitted. This ensures the archive commit is a clean, documentation-only change tied to the archived entry.
- **Documentation**: README covers project overview, install, basic usage, and available scripts (format, lint, test, build, Storybook). CONTRIBUTING.md (or a dedicated section) covers how to contribute, Conventional Commits, pre-commit hooks, and that PRs must pass CI and use OpenSpec for changes. Keeps README user-facing and CONTRIBUTING contributor-facing.

## Risks / Trade-offs

No residual risks are called out here; the decisions above (pre-commit scope, OpenSpec rule and docs, Husky + CI for commits) cover the main concerns. Add any new, unmitigated risks or accepted trade-offs below if they arise.
