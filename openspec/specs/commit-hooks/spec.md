# commit-hooks Specification

## Purpose

TBD - created by archiving change setup-library. Update Purpose after archive.

## Requirements

### Requirement: Husky runs pre-commit hooks

The project SHALL use Husky to run git hooks. A pre-commit hook SHALL be configured and SHALL run before each commit is finalized so that failing checks prevent the commit.

#### Scenario: Pre-commit hook installed

- **WHEN** a developer runs the project’s install or postinstall script (e.g. `npm install` with Husky prepare)
- **THEN** Husky is configured and the pre-commit hook is present (e.g. under `.husky/pre-commit`)

#### Scenario: Pre-commit runs format and lint checks

- **WHEN** a developer attempts to commit (e.g. `git commit`)
- **THEN** the pre-commit hook runs the project’s format check and lint (e.g. `npm run format:check` and `npm run lint` or a single script that runs both), and the commit is aborted if any of these checks fail

#### Scenario: Successful commit when checks pass

- **WHEN** the pre-commit hook runs and both format check and lint pass
- **THEN** the commit is allowed to complete

### Requirement: Pre-commit enforces branch name matches OpenSpec change

The project SHALL run a check before each commit that the current Git branch name is the name of a directory under `openspec/changes/` (e.g. branch `setup-library` implies `openspec/changes/setup-library/` exists). If not, the commit SHALL be aborted so that developers get immediate feedback when committing from a branch that would fail the CI branch-name check.

#### Scenario: Branch name check runs on commit

- **WHEN** a developer attempts to commit (e.g. `git commit`)
- **THEN** the pre-commit hook runs a branch-name check (in addition to format and lint), and the commit is aborted if the current branch name does not match any `openspec/changes/<name>/` directory

#### Scenario: Commit allowed when branch matches OpenSpec change

- **WHEN** the current branch is `setup-library` and `openspec/changes/setup-library/` exists and format/lint pass
- **THEN** the commit is allowed to complete

### Requirement: Pre-commit recognizes and validates archive branches

When a branch name ends with `-archive` (e.g. `setup-library-archive`), the pre-commit hook SHALL treat it as an archive branch. It SHALL strip the `-archive` suffix to derive the change name, verify that a matching entry exists under `openspec/changes/archive/`, and abort the commit if no such archived change is found.

#### Scenario: Archive branch name check runs on commit

- **WHEN** a developer attempts to commit on a branch ending with `-archive` (e.g. `setup-library-archive`)
- **THEN** the pre-commit hook strips the suffix, checks for a matching directory under `openspec/changes/archive/` (e.g. a directory whose name contains `setup-library`), and aborts the commit if no such archived change is found

#### Scenario: Commit allowed when archive branch matches archived change

- **WHEN** the current branch is `setup-library-archive` and an entry matching `setup-library` exists under `openspec/changes/archive/` (e.g. `openspec/changes/archive/2026-03-13-setup-library/`)
- **THEN** the branch-name portion of the pre-commit check passes

### Requirement: Archive branch commits must only contain OpenSpec files

On an archive branch (branch name ending with `-archive`), the pre-commit hook SHALL inspect all staged files and abort the commit if any staged file is outside the `openspec/` directory. Only changes to OpenSpec documentation files are permitted on archive branches.

#### Scenario: Non-OpenSpec file staged on archive branch is rejected

- **WHEN** a developer on branch `setup-library-archive` attempts to commit with one or more staged files outside `openspec/` (e.g. `src/foo.ts` or `package.json`)
- **THEN** the pre-commit hook aborts the commit and reports that archive branches may only contain changes to `openspec/` files

#### Scenario: OpenSpec-only commit on archive branch is allowed

- **WHEN** a developer on branch `setup-library-archive` attempts to commit and all staged files are under `openspec/` (e.g. `openspec/changes/archive/2026-03-13-setup-library/tasks.md`)
- **THEN** the staged-file check passes and the commit proceeds (subject to other checks passing)
