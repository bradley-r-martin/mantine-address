# documentation Specification

## Purpose

TBD - created by archiving change setup-library. Update Purpose after archive.

## Requirements

### Requirement: README describes the project and usage

The repository SHALL include a README (e.g. README.md) that describes the project, how to install it, basic usage, and the main development scripts (e.g. format, lint, test, build, Storybook) so that users and developers can onboard quickly. The README SHALL refer to the single address component as **AddressInput** and state that it supports **autocomplete only** and that **using an adapter is required**; it MUST NOT imply that the component can operate without an adapter or that there is a non-autocomplete (e.g. freeform manual entry) mode.

#### Scenario: README exists and is discoverable

- **WHEN** a user or contributor opens the repository root
- **THEN** a README file (e.g. README.md) exists and is the default view on the hosting platform (e.g. GitHub)

#### Scenario: README includes install and usage

- **WHEN** a user reads the README
- **THEN** it contains instructions or links for installing the package (e.g. npm install) and at least minimal usage or link to docs (e.g. Storybook)

#### Scenario: README includes development scripts

- **WHEN** a developer reads the README
- **THEN** it documents or references the main scripts (e.g. format, lint, test, build, Storybook) so they know how to run quality checks and build

#### Scenario: README states autocomplete only and adapter required

- **WHEN** a user reads the README
- **THEN** it explicitly states that the AddressInput component provides autocomplete only and that an adapter must be configured
- **THEN** it does not imply that the field can work without an adapter or that there is a non-autocomplete input mode

### Requirement: .gitignore excludes common library artifacts

The repository SHALL include a root `.gitignore` that excludes commonly ignored paths for a TypeScript/React library (e.g. `node_modules`, `dist`, `coverage`, `storybook-static`, `.env*`, and common OS/IDE files) so that build outputs, dependencies, and local files are not committed.

#### Scenario: .gitignore is present

- **WHEN** the repository is cloned
- **THEN** a `.gitignore` file exists at the repository root

#### Scenario: .gitignore excludes node_modules and dist

- **WHEN** a developer runs a build or install
- **THEN** paths such as `node_modules/` and `dist/` are ignored by Git (listed in `.gitignore` or equivalent)

### Requirement: Contribution documentation exists

The repository SHALL provide contribution documentation (e.g. CONTRIBUTING.md or an equivalent doc/section) that explains how to contribute, including branch strategy (PRs target `next`, must not change `package.json` version), **branch naming** (the PR branch name must match an OpenSpec change name, e.g. branch `setup-library` for `openspec/changes/setup-library/`), that releases are made by creating a GitHub Release (which triggers the release workflow), commit message format (e.g. Conventional Commits), pre-commit hooks, and that PRs must pass CI and use OpenSpec where applicable.

#### Scenario: Contribution doc is present

- **WHEN** a contributor looks for how to contribute
- **THEN** a contribution document (e.g. CONTRIBUTING.md) exists in the repo or is linked from the README

#### Scenario: Commit and PR expectations are documented

- **WHEN** a contributor reads the contribution documentation
- **THEN** it states that commits must follow the project’s commit format (e.g. Conventional Commits) and that PRs must pass CI (and use OpenSpec for changes when applicable)

#### Scenario: Pre-commit and local checks are documented

- **WHEN** a contributor reads the contribution documentation
- **THEN** it explains that pre-commit hooks run (e.g. format check, lint) and how to run these checks locally before pushing

#### Scenario: Branch strategy and release process are documented

- **WHEN** a contributor reads the contribution documentation
- **THEN** it explains that PRs target the integration branch (e.g. `next`), must not change `package.json` version, and that releases are created by opening a GitHub Release with the desired version (which triggers the release workflow to merge next into main, publish to npm, and deploy Storybook)

#### Scenario: Branch naming is documented

- **WHEN** a contributor reads the contribution documentation
- **THEN** it states that the name of the branch used for a PR must match an OpenSpec change (e.g. branch `setup-library` for the change in `openspec/changes/setup-library/`), and that CI will fail if the branch name does not match a directory under `openspec/changes/`

#### Scenario: Archive branch naming and restrictions are documented

- **WHEN** a contributor reads the contribution documentation
- **THEN** it explains that once a change has been archived, the archive commit must be made on a branch named `<change-name>-archive` (e.g. `setup-library-archive`), that both Husky and CI will verify the corresponding entry exists under `openspec/changes/archive/`, and that archive branch commits must contain only files under `openspec/` (no source code or configuration changes permitted)
