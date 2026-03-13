## 1. Code quality (Prettier and ESLint)

- [x] 1.1 Add Prettier and config (e.g. `.prettierrc` or `package.json`), add `format` and `format:check` scripts to `package.json`
- [x] 1.2 Add ESLint, TypeScript/React config, and `eslint-config-prettier`; add `.eslintrc.*` or `eslint.config.*` and `lint` script
- [x] 1.3 Run format and lint once; fix any issues and add a `.prettierignore` / `.eslintignore` if needed

## 2. Storybook

- [x] 2.1 Install and configure Storybook for React (Vite or existing bundler); add `storybook` and `build:storybook` scripts
- [x] 2.2 Add at least one story for the primary library component and verify dev server and static build work

## 3. Commit hooks (Husky)

- [x] 3.1 Install and configure Husky; add `prepare` script and `.husky/pre-commit` hook that runs `format:check` and `lint`
- [x] 3.2 Verify pre-commit blocks a commit when format or lint fails and allows commit when both pass

## 4. Branch strategy (next and main)

- [x] 4.1 Set default branch to `next` (integration); ensure `main` exists as release branch (create and protect if needed). Document in CONTRIBUTING that PRs target `next` and must not change `package.json` version

## 5. GitHub Actions – PR workflow

- [x] 5.1 Add PR workflow (e.g. `.github/workflows/ci.yml`) that runs on pull_request targeting `next`: test job (e.g. `npm test`)
- [x] 5.2 Add format-check and lint jobs to the PR workflow (e.g. `npm run format:check`, `npm run lint`)
- [x] 5.3 Add commit message validation job (e.g. commitlint) to the PR workflow
- [x] 5.4 Add build job to the PR workflow (e.g. `npm run build`)
- [x] 5.5 Add check that PR does not change `package.json` version (e.g. script or workflow step that fails if version diff in package.json)
- [x] 5.6 Add OpenSpec check job to the PR workflow (e.g. run `openspec` or project script when `openspec/changes/` is touched); document expected rules

## 6. GitHub Actions – release workflow

- [x] 6.1 Add release workflow (e.g. `.github/workflows/release.yml`) triggered by GitHub Release creation (e.g. `release:published`): read release version from tag/release
- [x] 6.2 In release workflow: merge `next` into `main`, set `package.json` version to release version, commit and push to `main`
- [x] 6.3 Add build step, npm publish step, and Storybook build + deploy to GitHub Pages in release workflow; configure GitHub Pages in repo settings if needed

## 7. README and contribution documentation

- [x] 7.1 Add or update README with project overview, install, basic usage, and development scripts (format, lint, test, build, Storybook)
- [x] 7.2 Add CONTRIBUTING.md (or equivalent) covering branch strategy (PRs target `next`, no version bump in PRs), how to contribute, Conventional Commits, pre-commit hooks, and that PRs must pass CI and use OpenSpec for changes; explain that releases are made by creating a GitHub Release; link from README if appropriate

## 8. Final checks

- [x] 8.1 Run full CI locally (test, format:check, lint, build, Storybook build) and fix any failures

## 9. Branch name checks (OpenSpec change name)

- [x] 9.1 Document in CONTRIBUTING that the PR branch name must match an OpenSpec change (e.g. branch `setup-library` for `openspec/changes/setup-library/`)
- [x] 9.2 Add CI job that fails if the PR head branch name is not the name of a directory under `openspec/changes/`

## 10. .gitignore and Husky branch check

- [x] 10.1 Add root `.gitignore` with common library ignores (e.g. node_modules, dist, coverage, storybook-static, .env\*, OS/IDE files)
- [x] 10.2 Add Husky pre-commit check that current branch name matches a directory under `openspec/changes/` (fail commit if not)
- [x] 10.3 Document in CONTRIBUTING: pre-commit branch-name check (and that CI also checks), and .gitignore / repo layout

## 11. Archive branch support — Husky

- [x] 11.1 Update the Husky pre-commit branch-name check to detect `-archive` suffix: if the branch ends with `-archive`, strip the suffix and verify the derived name exists under `openspec/changes/archive/` (fail if not found)
- [x] 11.2 Update the Husky pre-commit hook to enforce that all staged files are under `openspec/` when on an `-archive` branch (abort commit if any staged file is outside `openspec/`)
- [x] 11.3 Verify: committing non-OpenSpec files on an `-archive` branch is blocked; committing only `openspec/` files passes

## 12. Archive branch support — CI

- [x] 12.1 Update the CI branch-name check job to handle `-archive` branches: if the PR head branch ends with `-archive`, strip the suffix and check for a matching entry under `openspec/changes/archive/` (fail if not found); non-`-archive` branches continue to check `openspec/changes/` as before
- [x] 12.2 Add a CI job (or step) that runs only on `-archive` branches: get the PR diff and fail if any changed file is outside `openspec/`
- [x] 12.3 Verify: a PR from `setup-library-archive` with only `openspec/` changes passes all new checks; a PR with non-`openspec/` changes fails

## 13. Archive branch — documentation

- [x] 13.1 Update CONTRIBUTING.md to document the archive branch convention: once a change is archived, commit it on a `<change-name>-archive` branch; explain the Husky and CI checks that enforce this; clarify that only `openspec/` changes are permitted on archive branches
