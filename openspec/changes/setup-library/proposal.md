## Why

The library needs a consistent development and release workflow: local quality checks (format, lint, tests), enforced commit standards, and CI that validates PRs and automates releases. Without this, contributions can introduce style drift, broken builds, or non-compliant commits, and releases remain manual and error-prone. Setting this up now establishes the baseline before adding more component or API work.

## What Changes

- **Storybook**: Add Storybook for component development and documentation.
- **GitHub Actions**: PR workflows on `next` (tests, format, lint, commit message check, build, OpenSpec usage check; PRs must not change `package.json` version). Release workflow triggered by creating a GitHub Release: version is set in the release (e.g. v1.2.3), workflow merges `next` into `main`, bumps `package.json` to that version, publishes to npm, and publishes Storybook to GitHub Pages.
- **Prettier**: Add and configure Prettier for consistent formatting.
- **ESLint**: Add and configure ESLint for linting.
- **Husky**: Add Husky and pre-commit hooks to enforce formatting, lint, and that the current branch name matches an OpenSpec change (e.g. branch `setup-library` → `openspec/changes/setup-library/` exists) before commits.
- **.gitignore**: Add a `.gitignore` for commonly ignored files in a TypeScript/React library (e.g. `node_modules`, `dist`, `coverage`, `storybook-static`, IDE/OS files).
- **README and contribution docs**: Add or update README with project overview, install, usage, and scripts; add contribution documentation (e.g. CONTRIBUTING.md) describing how to contribute, commit format, and OpenSpec/CI expectations.

Public API surface and Mantine compatibility are unchanged; this change is tooling, CI, and documentation only.

## Capabilities

### New Capabilities

- `storybook`: Storybook setup for the library (dev server and docs).
- `github-actions`: CI for PRs targeting `next` (tests, format, lint, commit message, build, OpenSpec usage, no version bump in package.json); release triggered by GitHub Release creation (version from release → merge next into main, bump version, npm publish, Storybook to GitHub Pages).
- `code-quality`: Prettier and ESLint configuration and scripts.
- `commit-hooks`: Husky pre-commit hooks to enforce format/lint (and related checks) before commit.
- `documentation`: README and contribution documentation (e.g. CONTRIBUTING.md) for the repo.

### Modified Capabilities

- None (no existing specs; this is net-new tooling).

## Impact

- **Dependencies**: New dev dependencies (Storybook, Prettier, ESLint, Husky, and related plugins/configs).
- **Scripts**: New or updated `package.json` scripts for format, lint, test, build, and Storybook.
- **Repo**: New config files (e.g. `.gitignore`, `.prettierrc`, `.eslintrc.*`, `.husky/*`), GitHub Actions workflows (`.github/workflows/*`), and Storybook config.
- **Process**: Two branches: `next` (integration; PRs merge here, default for development) and `main` (released code). **PR branch names must match an OpenSpec change name** (e.g. branch `setup-library` for the change in `openspec/changes/setup-library/`); CI checks this. PRs must pass CI and must not change `package.json` version. Releases are created by opening a GitHub Release with the desired version; CI then merges `next` into `main`, bumps version, publishes to npm, and deploys Storybook. Commits must follow Conventional Commits (enforced by CI and Husky).
- **Docs**: README and CONTRIBUTING.md (or equivalent) added or updated to describe the project and how to contribute.

## Non-goals

- Changing the library’s public API, props, or exports.
- Defining specific test or Storybook coverage targets beyond “PRs run tests” and “Storybook exists and is published”; detailed coverage and story scope can be refined later.
