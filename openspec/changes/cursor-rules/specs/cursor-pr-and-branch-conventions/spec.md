## ADDED Requirements

### Requirement: Cursor rule enforces PR base branch

When the AI is asked to raise or create a pull request for this repository, it SHALL target the integration branch `next` as the PR base branch, and it SHALL NOT target `main`.

#### Scenario: PR targets next

- **WHEN** the user asks the AI to raise or create a pull request
- **THEN** the AI targets `next` as the pull request base branch

#### Scenario: PR to main is rejected

- **WHEN** the user asks the AI to raise or create a pull request targeting `main`
- **THEN** the AI refuses and redirects the PR to target `next`

### Requirement: Cursor rule enforces OpenSpec-driven branch naming for PRs

When the AI is asked to create a branch or raise a pull request, it SHALL ensure the head branch name satisfies the repository's OpenSpec-driven branch naming rules:

- For an active change branch (a branch name that does not end with `-archive`), the branch name SHALL match a directory directly under `openspec/changes/` (i.e. `openspec/changes/<branch>/` exists).
- For an archive branch (a branch name ending with `-archive`), the derived change name (everything before `-archive`) SHALL match an entry under `openspec/changes/archive/` (i.e. `openspec/changes/archive/*-<change>/` exists).

#### Scenario: Active change branch name is valid

- **WHEN** the user asks the AI to create a branch named `<change>`
- **THEN** the AI uses `<change>` only if `openspec/changes/<change>/` exists

#### Scenario: Active change branch name missing change directory

- **WHEN** the user asks the AI to create a branch named `<change>` and `openspec/changes/<change>/` does not exist
- **THEN** the AI creates the OpenSpec change (so `openspec/changes/<change>/` exists) before creating the branch named `<change>`

#### Scenario: Archive branch name is valid

- **WHEN** the user asks the AI to create or use an archive branch named `<change>-archive`
- **THEN** the AI proceeds only if an archived entry exists under `openspec/changes/archive/` matching `*-<change>/`

#### Scenario: Archive branch name missing archived entry

- **WHEN** the user asks the AI to create or use an archive branch named `<change>-archive` and no matching entry exists under `openspec/changes/archive/`
- **THEN** the AI refuses to proceed and indicates that the change must be archived first

### Requirement: Cursor rule enforces archive-branch file scope

When the AI is asked to raise or create a pull request from a head branch ending with `-archive`, the AI SHALL ensure the pull request diff contains only changes to files under `openspec/`.

#### Scenario: Archive PR changes only openspec files

- **WHEN** the user asks the AI to raise or create a pull request from a branch ending with `-archive`
- **THEN** the AI includes only changes to files under `openspec/` in that pull request

#### Scenario: Archive PR includes non-openspec changes

- **WHEN** the user asks the AI to raise or create a pull request from a branch ending with `-archive` and the diff includes a file outside `openspec/`
- **THEN** the AI stops and removes or relocates the non-`openspec/` changes so the pull request contains only `openspec/` changes

### Requirement: Cursor rule avoids PR version bumps

When the AI is asked to raise or create a pull request, it SHALL NOT change the `version` field in `package.json`.

#### Scenario: Version is not modified in PR

- **WHEN** the user asks the AI to raise or create a pull request
- **THEN** the AI ensures `package.json` `version` is unchanged in the pull request
