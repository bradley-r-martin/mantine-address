## Context

This repository enforces an OpenSpec-driven workflow for contribution hygiene. CI and Husky enforce branch naming and archive-branch file scope rules; PRs must target `next`, not `main`. When an AI agent is asked to “raise a PR”, generic Git conventions (e.g. `feat/<name>`) will fail CI in this repo.

Cursor rules are a low-friction way to ensure AI behavior aligns with these repo-specific constraints without changing the underlying CI/Husky enforcement.

Constraints:

- Branch naming is enforced by CI and Husky:
  - Active branch must match `openspec/changes/<branch>/`
  - Archive branch `<change>-archive` must match `openspec/changes/archive/*-<change>/`
- Archive branches may only change files under `openspec/`
- PRs must target `next`
- PRs must not bump `package.json` `version`

## Goals / Non-Goals

**Goals:**

- Provide a single Cursor rule that reliably prevents AI-created branches/PRs from violating the repo’s enforced constraints.
- Make the “invalid state” handling deterministic (what the AI should do when a required OpenSpec change or archive entry does not exist).
- Keep the rule narrowly scoped to branch + PR creation behavior.

**Non-Goals:**

- Changing the enforcement mechanisms (CI/Husky) or introducing new CI checks.
- Mandating PR title formats or templates.
- Defining a full contribution workflow beyond the parts that affect branch/PR creation.

## Decisions

### Decision: Encode constraints as a dedicated, repo-specific Cursor rule

**Choice:** Add `.cursor/rules/pr-and-branch-conventions.mdc` that applies broadly but only triggers when the user asks to create a branch or raise a PR.

**Rationale:** These constraints are unusual compared to typical Git workflows and are already enforced server-side. A Cursor rule reduces wasted cycles by preventing invalid actions upfront and creates consistent AI behavior.

**Alternatives considered:**

- Rely on CI failures to teach the AI: too slow and frustrating.
- Add more CI messaging only: helps humans, but doesn’t reliably steer AI planning.

### Decision: Treat “missing OpenSpec change” as an instruction to create it first

**Choice:** For active branches, when the intended branch name doesn’t exist under `openspec/changes/`, the AI should create the OpenSpec change first (via `openspec new change <name>`), then create the branch with that exact name.

**Rationale:** This matches the documented contributor workflow and preserves the invariant that every PR branch corresponds to an OpenSpec change directory.

### Decision: Treat “missing archive entry” as a hard stop for archive branches

**Choice:** For `<change>-archive` branches, if no matching entry exists under `openspec/changes/archive/*-<change>/`, the AI must not proceed with PR creation and must archive the change first.

**Rationale:** Archive PRs are documentation-only. Proceeding without an archived entry violates CI and signals a process mismatch.

### Decision: Enforce archive branch file-scope in the rule

**Choice:** On `-archive` branches, the AI must ensure only `openspec/` files are modified; otherwise it should stop and correct the diff (move code changes to an active change branch).

**Rationale:** This aligns with CI/Husky enforcement and avoids “mixed” archive PRs that will fail anyway.

## Risks / Trade-offs

- **Risk:** The rule becomes stale if the repo workflow changes.  
  **Mitigation:** Keep the rule narrowly scoped and derived from `CONTRIBUTING.md` and CI checks; update the rule whenever those docs/checks change.

- **Risk:** Over-application could constrain unrelated tasks.  
  **Mitigation:** Set `alwaysApply: false` and write the rule as conditional (“when asked to create branch/PR”).

## Migration Plan

- Add the Cursor rule file under `.cursor/rules/`.
- No other migration steps; existing CI/Husky enforcement remains the source of truth.

## Open Questions

- Should the rule also require that PRs use a specific branch base (e.g. branch off `next`) when creating a new branch, or is enforcing PR base `next` sufficient?
