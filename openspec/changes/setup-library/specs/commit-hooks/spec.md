## ADDED Requirements

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
