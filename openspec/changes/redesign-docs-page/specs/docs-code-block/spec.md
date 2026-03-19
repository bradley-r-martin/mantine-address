## ADDED Requirements

### Requirement: CodeBlock renders syntax-highlighted code with a copy button

The `CodeBlock` component SHALL render a code snippet with syntax highlighting and a copy-to-clipboard button. The code SHALL be displayed in a styled container with a dark background theme regardless of the page's light/dark mode.

#### Scenario: Code is syntax-highlighted

- **WHEN** a `CodeBlock` is rendered with a code string and a language identifier
- **THEN** the code is displayed with syntax highlighting appropriate to the specified language (e.g. TSX, TypeScript, bash)

#### Scenario: Copy button copies code to clipboard

- **WHEN** a developer clicks the copy button on a `CodeBlock`
- **THEN** the code content is copied to the system clipboard
- **THEN** the button provides visual feedback indicating the copy succeeded (e.g. text changes to "Copied" or icon changes)

#### Scenario: Dark background for code blocks

- **WHEN** a `CodeBlock` is rendered
- **THEN** the code container uses a dark background color scheme regardless of whether the surrounding page uses a light or dark theme

### Requirement: CodeBlock supports tabbed variants

The `CodeBlock` component SHALL optionally accept multiple named code variants and render them as selectable tabs. Only the active tab's code SHALL be visible at a time.

#### Scenario: Tabbed code block renders multiple variants

- **WHEN** a `CodeBlock` is rendered with multiple named variants (e.g. "npm", "yarn", "pnpm")
- **THEN** tab buttons are displayed above the code area, one for each variant
- **THEN** clicking a tab shows the corresponding code variant and hides the others

#### Scenario: First tab is active by default

- **WHEN** a tabbed `CodeBlock` is rendered
- **THEN** the first tab is selected and its code is visible by default

### Requirement: CodeBlock renders cleanly without tabs for single snippets

The `CodeBlock` component SHALL render without tab UI when provided a single code snippet (no variants).

#### Scenario: Single snippet has no tab UI

- **WHEN** a `CodeBlock` is rendered with a single code string (not tabbed variants)
- **THEN** the code is displayed directly without any tab buttons or tab navigation
