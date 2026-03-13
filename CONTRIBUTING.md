# Contributing

## Branch strategy

- **`next`** is the integration branch. Set it as the repository **default branch** in GitHub (Settings → General → Default branch) so that all pull requests target `next`.
- **`main`** holds the current released code. It is updated only by the release workflow when a maintainer creates a GitHub Release. Do not open PRs against `main`.
- **Do not change the `version` field in `package.json` in a PR.** Version bumps happen only when creating a GitHub Release; CI will fail if a PR changes `package.json` version.

## Branch naming

**The name of your PR branch must match an OpenSpec change.** For example, use branch `setup-library` when working on the change in `openspec/changes/setup-library/`. Both **CI** and **Husky** (pre-commit) check this: CI will fail the PR, and Husky will block the commit locally, if the branch name is not the name of a directory under `openspec/changes/`. Create the change with `openspec new change <name>` first, then create a branch with that same name (e.g. `git checkout -b setup-library`).

## How to contribute

1. Create an OpenSpec change if needed (`openspec new change <name>`), then create a branch with that **exact** name (e.g. `setup-library`).
2. Open a pull request against **`next`** (not `main`). The branch name must match an OpenSpec change; see [Branch naming](#branch-naming) above.
3. Ensure your commits follow [Conventional Commits](#commits) and that pre-commit hooks pass (format, lint, commit message).
4. CI must pass (tests, format check, lint, commitlint, build, no-version-bump, branch-name check, OpenSpec check when `openspec/changes/` is touched).
5. For changes that add or modify OpenSpec artifacts, ensure the change has a complete `tasks.md` (and other required artifacts); see [OpenSpec](#openspec) below.

## Commits

We use [Conventional Commits](https://www.conventionalcommits.org/). Format:

```
<type>[optional scope]: <description>
```

- **Types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `build`, `ci`, `perf`, `revert`
- **Scope** is optional but preferred (e.g. `feat(AddressInput): add clear button`).
- Subject: imperative, lowercase after the colon, no period, ~72 chars max.

Commit messages are checked locally (Husky + commitlint) and in CI. Invalid messages will block the commit or the PR.

## Pre-commit hooks

Husky runs before each commit:

- **format:check** – code must be formatted with Prettier.
- **lint** – ESLint must pass.
- **branch-name check** – current branch must match an OpenSpec change (e.g. `openspec/changes/<branch>/` must exist).
- **commit-msg** – commit message must match Conventional Commits.

Run `npm run format:check` and `npm run lint` yourself before committing to avoid failed hooks. Ensure you’re on a branch whose name matches an OpenSpec change (e.g. `setup-library`) or the commit will be blocked.

## Repo layout

The repo includes a root **`.gitignore`** that excludes common library paths (e.g. `node_modules`, `dist`, `coverage`, `storybook-static`, `.env*`, OS/IDE files). Don’t commit these. **Lockfiles** (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`) are not committed so contributors can use npm, yarn, or pnpm; CI runs `npm install`.

## OpenSpec

When your PR touches files under `openspec/changes/`, CI checks that each change directory has a `tasks.md` (and that required artifacts are present). Follow the project’s OpenSpec workflow for feature and fix work so that proposal, design, specs, and tasks stay in sync.

## Releases

Releases are made by creating a **GitHub Release** (e.g. with tag `v1.2.3`). The release workflow then merges `next` into `main`, sets the package version, publishes to npm, and deploys Storybook to GitHub Pages. Do not bump `package.json` version in a PR.
