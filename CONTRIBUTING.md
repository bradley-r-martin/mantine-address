# Contributing

## Branch strategy

- **`next`** is the integration branch. Set it as the repository **default branch** in GitHub (Settings → General → Default branch) so that all pull requests target `next`.
- **`main`** holds the current released code. It is updated only by the release workflow when a maintainer creates a GitHub Release. Do not open PRs against `main`.
- **Do not change the `version` field in `package.json` in a PR.** Version bumps happen only when creating a GitHub Release; CI will fail if a PR changes `package.json` version.

## Branch naming

**Active change branches:** The name of your PR branch must match an OpenSpec change. For example, use branch `setup-library` when working on the change in `openspec/changes/setup-library/`. Both **CI** and **Husky** (pre-commit) enforce this: CI will fail the PR, and Husky will block the commit locally, if the branch name is not the name of a directory under `openspec/changes/`. Create the change with `openspec new change <name>` first, then create a branch with that same name (e.g. `git checkout -b setup-library`).

**Archive branches:** Once a change has been archived (moved under `openspec/changes/archive/`), commit the archived files on a branch named `<change-name>-archive` — for example `setup-library-archive`. Both **CI** and **Husky** recognise the `-archive` suffix and apply different rules:

- The derived change name (everything before `-archive`) must correspond to an existing entry under `openspec/changes/archive/` (e.g. `openspec/changes/archive/2026-03-13-setup-library/`). If no matching archived change is found, the commit or PR is blocked.
- **Only files under `openspec/` may be changed** on an archive branch. Husky will abort the commit if any staged file is outside `openspec/`, and CI will fail the PR if any changed file is outside `openspec/`. This ensures the archive commit is a clean, documentation-only operation with no accidental code changes.

Typical archive workflow:

```
openspec archive setup-library           # archive the change
git checkout -b setup-library-archive    # create the archive branch
git add openspec/                        # stage only openspec/ files
git commit -m "docs(openspec): archive setup-library change"
# open a PR -- CI enforces branch name, archive entry, and file scope
```

## How to contribute

1. Create an OpenSpec change if needed (`openspec new change <name>`), then create a branch with that **exact** name (e.g. `setup-library`).
2. Open a pull request against **`next`** (not `main`). The branch name must match an OpenSpec change; see [Branch naming](#branch-naming) above.
3. Ensure your commits follow [Conventional Commits](#commits) and that pre-commit hooks pass (format, lint, commit message).
4. CI must pass (tests, format check, lint, commitlint, build, no-version-bump, branch-name check, archive-scope check, OpenSpec check when `openspec/changes/` is touched).
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

- **format:check** -- code must be formatted with Prettier.
- **lint** -- ESLint must pass.
- **branch-name check** -- current branch must match an OpenSpec change (e.g. `openspec/changes/<branch>/` must exist) or be a valid archive branch (e.g. `setup-library-archive` with a matching entry under `openspec/changes/archive/`).
- **archive scope check** -- on `-archive` branches, all staged files must be under `openspec/`; any staged file outside `openspec/` aborts the commit.
- **commit-msg** -- commit message must match Conventional Commits.

Run `npm run format:check` and `npm run lint` yourself before committing to avoid failed hooks. Ensure you are on a branch whose name matches an OpenSpec change (e.g. `setup-library`) or a valid archive branch (e.g. `setup-library-archive`) or the commit will be blocked.

## Repo layout

The repo includes a root **`.gitignore`** that excludes common library paths (e.g. `node_modules`, `dist`, `coverage`, `storybook-static`, `.env*`, OS/IDE files). Don't commit these. **Lockfiles** (`package-lock.json`, `yarn.lock`, `pnpm-lock.yaml`) are not committed so contributors can use npm, yarn, or pnpm; CI runs `npm install`.

## OpenSpec

When your PR touches files under `openspec/changes/`, CI checks that each active change directory (excluding `archive/`) has a `tasks.md` (and that required artifacts are present). Follow the project's OpenSpec workflow for feature and fix work so that proposal, design, specs, and tasks stay in sync.

## Releases

Releases are made by creating a **GitHub Release** (e.g. with tag `v1.2.3`). The release workflow then merges `next` into `main`, sets the package version, publishes to npm, and deploys Storybook to GitHub Pages. Do not bump `package.json` version in a PR.
