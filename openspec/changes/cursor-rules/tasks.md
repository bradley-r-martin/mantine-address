## 1. Define Cursor rule behavior

- [x] 1.1 Add `cursor-pr-and-branch-conventions` spec file under `openspec/changes/cursor-rules/specs/`
- [x] 1.2 Confirm spec scenarios cover PR base targeting, branch naming (active + archive), archive file scope, and no-version-bump behavior

## 2. Implement Cursor rule

- [x] 2.1 Add `.cursor/rules/pr-and-branch-conventions.mdc` encoding the required PR/branch constraints
- [x] 2.2 Ensure the rule is conditional (only applies when asked to create branches/PRs) and does not over-constrain unrelated tasks

## 3. Validate against repo enforcement

- [x] 3.1 Cross-check the Cursor rule content against `CONTRIBUTING.md` and CI branch checks to ensure alignment
- [x] 3.2 Verify the change is apply-ready via `openspec status --change cursor-rules`
