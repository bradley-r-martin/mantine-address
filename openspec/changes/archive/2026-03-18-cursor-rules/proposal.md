## Why

Contributors (including AI agents) can easily open pull requests that are rejected by CI and Husky due to this repo’s strict OpenSpec-driven branch naming and PR targeting rules. Capturing these constraints as Cursor rules reduces failed PRs and keeps automation aligned with the project workflow.

## What Changes

- Add a Cursor rule that, when the AI is asked to create branches and/or raise PRs, enforces:
  - PRs target `next` (never `main`)
  - branch names match an OpenSpec change directory under `openspec/changes/<branch>/`
  - archive branches use `<change-name>-archive` and only modify files under `openspec/`
  - PRs do not bump `package.json` `version`
- Document clear “what to do when invalid” behavior (create OpenSpec change first; refuse to proceed for invalid archive branches; refuse archive PRs with non-OpenSpec file changes).

## Capabilities

### New Capabilities

- `cursor-pr-and-branch-conventions`: Define and enforce the repo’s branch and PR conventions in Cursor rules when the AI is asked to create branches or raise PRs.

### Modified Capabilities

- (none)

## Impact

- Adds a new rule file under `.cursor/rules/` to guide AI behavior.
- No runtime library API changes.
- No new dependencies.
- No CI or Husky changes (the rule aligns with existing enforcement).

## Non-goals

- Changing CI/Husky enforcement logic (these already enforce branch naming and archive scope).
- Defining a required PR title format (none is currently enforced).
- Automating release or version bump behavior beyond “don’t bump version in PRs”.
