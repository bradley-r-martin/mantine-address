## MODIFIED Requirements

### Requirement: Documentation pages provide a consistent structure

Documentation-style pages SHALL present content using a visually rich, hierarchical layout that includes: a hero header section with package identity; section-based navigation with anchor links; clearly titled content sections with interactive examples and code snippets; and a props/API reference section. The layout SHALL use a responsive two-column grid (navigation sidebar + content) on desktop and a single-column layout on mobile. The visual design SHALL be distinctive and polished, using Mantine primitives for structure and Tailwind CSS utilities for decorative styling.

#### Scenario: Documentation page has hero, navigation, and content sections

- **WHEN** a developer opens a canonical Storybook documentation entry for the library component
- **THEN** the page displays a hero header with the package name, tagline, and install command
- **THEN** a navigation sidebar (desktop) or navigation menu (mobile) lists all content sections
- **THEN** content sections are clearly titled with interactive examples and code snippets

#### Scenario: Documentation page uses responsive layout

- **WHEN** a developer views the documentation page on a desktop viewport
- **THEN** the page uses a two-column layout with navigation sidebar and content area
- **WHEN** a developer views the documentation page on a mobile viewport
- **THEN** the layout collapses to a single column

### Requirement: Examples include curated code snippets

Documentation examples SHALL display a live interactive preview in a visually distinct sandbox area with a collapsible code panel below. The code panel SHALL contain a syntax-highlighted, copy-to-clipboard-enabled code snippet that demonstrates the recommended usage pattern. The code panel SHALL default to collapsed to keep the page scannable.

#### Scenario: Example shows live preview with collapsible code

- **WHEN** a developer views an example within a documentation-style page
- **THEN** a live interactive preview is displayed in a bordered sandbox area
- **THEN** a "Show code" toggle is visible below the preview
- **THEN** clicking the toggle reveals a syntax-highlighted code snippet with a copy button

#### Scenario: Code snippets are copy-paste-ready

- **WHEN** a developer expands the code panel of an example
- **THEN** the code snippet focuses on the recommended pattern for the prop(s) or integration being documented
- **THEN** the snippet can be copied to clipboard via a copy button
