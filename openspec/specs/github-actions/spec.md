# github-actions Specification

## Purpose

TBD - created by archiving change setup-library. Update Purpose after archive.

## Requirements

### Requirement: PRs run tests

The CI system SHALL run the project's test suite on every pull request (or push to PR branches) and SHALL fail the workflow if tests fail.

#### Scenario: Tests run on PR

- **WHEN** a pull request is opened or updated
- **THEN** the test job runs (e.g. `npm test` or equivalent) and the workflow status reflects pass or fail based on test results

### Requirement: PRs check formatting

The CI system SHALL run a formatting check on every pull request and SHALL fail the workflow if the codebase does not match the configured format (e.g. Prettier).

#### Scenario: Format check on PR

- **WHEN** a pull request is opened or updated
- **THEN** a format check job runs (e.g. `npm run format:check` or equivalent) and the workflow fails if files are not formatted according to project rules

### Requirement: PRs check linting

The CI system SHALL run the project's linter on every pull request and SHALL fail the workflow if lint errors are reported.

#### Scenario: Lint check on PR

- **WHEN** a pull request is opened or updated
- **THEN** a lint job runs (e.g. `npm run lint` or equivalent) and the workflow fails if there are lint errors

### Requirement: PRs check commit message format

The CI system SHALL validate commit messages on pull requests (e.g. Conventional Commits) and SHALL fail the workflow if any commit does not meet the required format.

#### Scenario: Commit message check on PR

- **WHEN** a pull request is opened or updated
- **THEN** a job validates commit messages (e.g. commitlint) and the workflow fails if any commit message does not conform to the project's commit format

### Requirement: PRs build and check build success

The CI system SHALL run the project's build on every pull request and SHALL fail the workflow if the build fails.

#### Scenario: Build on PR

- **WHEN** a pull request is opened or updated
- **THEN** a build job runs (e.g. `npm run build` or equivalent) and the workflow fails if the build fails

### Requirement: PR branch name must match an OpenSpec change or be a valid archive branch

The CI system SHALL verify that the pull request's head branch name either (a) matches the name of a directory directly under `openspec/changes/` (e.g. branch `setup-library` must correspond to `openspec/changes/setup-library/`), or (b) ends with `-archive` and the derived change name matches an entry under `openspec/changes/archive/` (e.g. branch `setup-library-archive` is valid when a directory matching `setup-library` exists under `openspec/changes/archive/`). The workflow SHALL fail if the branch name satisfies neither condition.

#### Scenario: Branch name check on PR — active change

- **WHEN** a pull request is opened or updated and the head branch does NOT end with `-archive`
- **THEN** a job checks that the head branch name equals a directory name under `openspec/changes/` (e.g. branch `setup-library` and `openspec/changes/setup-library/` exists), and the workflow fails otherwise

#### Scenario: Valid active branch name passes

- **WHEN** the head branch is named `setup-library` and `openspec/changes/setup-library/` exists
- **THEN** the branch-name check passes

#### Scenario: Branch name check on PR — archive branch

- **WHEN** a pull request is opened or updated and the head branch ends with `-archive` (e.g. `setup-library-archive`)
- **THEN** a job strips the `-archive` suffix, checks that the derived name (`setup-library`) corresponds to an entry under `openspec/changes/archive/`, and the workflow fails if no such archived entry exists

#### Scenario: Valid archive branch name passes

- **WHEN** the head branch is named `setup-library-archive` and an entry matching `setup-library` exists under `openspec/changes/archive/` (e.g. `openspec/changes/archive/2026-03-13-setup-library/`)
- **THEN** the branch-name check passes

### Requirement: Archive branch PRs must only contain OpenSpec file changes

When a pull request's head branch ends with `-archive`, the CI system SHALL verify that the pull request diff contains only files under `openspec/`. The workflow SHALL fail if any changed file is outside the `openspec/` directory.

#### Scenario: Non-OpenSpec file changed on archive branch PR is rejected

- **WHEN** a pull request with a branch name ending in `-archive` is opened or updated and the diff includes a file outside `openspec/` (e.g. `src/index.ts` or `package.json`)
- **THEN** a CI job detects the violation and fails the workflow

#### Scenario: OpenSpec-only PR on archive branch passes file check

- **WHEN** a pull request with a branch name ending in `-archive` is opened or updated and all changed files are under `openspec/`
- **THEN** the archive file-scope check passes

### Requirement: PRs must not change package.json version

The CI system SHALL run on pull requests that target the integration branch (e.g. `next`). Pull requests SHALL NOT modify the `version` field in `package.json`; version bumps happen only in the release workflow. The CI system SHALL fail the workflow if a PR changes `package.json` version (or the project SHALL document and enforce this rule so that such PRs are rejected).

#### Scenario: Version unchanged check on PR

- **WHEN** a pull request is opened or updated and it modifies `package.json`
- **THEN** the workflow fails if the `version` field was changed (or the project's stated policy is that such changes are not allowed and are caught in review)

### Requirement: PRs must include OpenSpec usage

The CI system SHALL verify that pull requests that introduce or modify changes under the OpenSpec workflow include valid OpenSpec usage (e.g. required artifacts or change structure) and SHALL fail or warn when the check fails as defined by project rules.

#### Scenario: OpenSpec check on PR

- **WHEN** a pull request is opened or updated and it touches OpenSpec change artifacts (e.g. under `openspec/changes/`)
- **THEN** a job runs the OpenSpec check (e.g. `openspec status` or project-defined script) and the workflow result reflects the check outcome (fail or warn as configured)

### Requirement: Release workflow triggered by GitHub Release

The CI system SHALL run a release workflow when a GitHub Release is created (e.g. `release:published` or when a release tag is pushed). The release version SHALL be taken from the GitHub Release (e.g. tag or release name, e.g. v1.2.3). The workflow SHALL merge the integration branch (e.g. `next`) into the release branch (e.g. `main`), set `package.json` version to the release version, build the project, publish the package to npm, and publish the built Storybook to GitHub Pages. The integration branch (`next`) holds unreleased work; the release branch (`main`) holds the current released version and is updated only by this workflow.

#### Scenario: Release triggered by GitHub Release creation

- **WHEN** a maintainer creates a GitHub Release (e.g. with tag v1.2.3)
- **THEN** the release workflow is triggered and uses that version (e.g. 1.2.3) for the release

#### Scenario: Merge next into main and bump version

- **WHEN** the release workflow runs
- **THEN** it merges the integration branch (e.g. `next`) into the release branch (e.g. `main`), sets `package.json` version to the release version, and commits (and pushes) to the release branch

#### Scenario: Build on release

- **WHEN** the release workflow has updated the release branch with the new version
- **THEN** the workflow runs the project build and continues only if the build succeeds

#### Scenario: Publish to npm on release

- **WHEN** the release workflow has built successfully
- **THEN** the workflow publishes the package to npm (e.g. using `npm publish` or equivalent) with the release version

#### Scenario: Publish Storybook to GitHub Pages on release

- **WHEN** the release workflow runs
- **THEN** the workflow builds Storybook and deploys the static Storybook to GitHub Pages so that the published docs are publicly available
