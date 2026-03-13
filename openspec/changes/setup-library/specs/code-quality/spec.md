## ADDED Requirements

### Requirement: Prettier is configured and used for formatting

The project SHALL use Prettier as the canonical formatter, with configuration committed in the repository, and SHALL provide scripts to check and apply formatting.

#### Scenario: Prettier config present

- **WHEN** the repository is cloned
- **THEN** a Prettier configuration file (e.g. `.prettierrc`, `.prettierrc.js`, or key in `package.json`) exists and defines formatting rules for the project

#### Scenario: Format check script

- **WHEN** a developer runs the designated format-check script (e.g. `npm run format:check`)
- **THEN** the command reports success if all configured files are formatted according to Prettier, or reports failure and lists files that need formatting

#### Scenario: Format write script

- **WHEN** a developer runs the designated format-write script (e.g. `npm run format` or `npm run format:write`)
- **THEN** the command applies Prettier formatting to all configured files

### Requirement: ESLint is configured and used for linting

The project SHALL use ESLint for linting, with configuration committed in the repository, and SHALL provide a script to run the linter. ESLint configuration SHALL be consistent with Prettier (e.g. using `eslint-config-prettier`) to avoid conflicting rules.

#### Scenario: ESLint config present

- **WHEN** the repository is cloned
- **THEN** an ESLint configuration file (e.g. `.eslintrc.*` or `eslint.config.*`) exists and extends or configures rules appropriate for the TypeScript/React project

#### Scenario: Lint script

- **WHEN** a developer runs the designated lint script (e.g. `npm run lint`)
- **THEN** the command runs ESLint on the configured files and exits with a non-zero code if there are lint errors

#### Scenario: No conflict with Prettier

- **WHEN** ESLint runs
- **THEN** formatting rules that conflict with Prettier are disabled or aligned (e.g. via `eslint-config-prettier`) so that Prettier remains the single source of truth for formatting
