## ADDED Requirements

### Requirement: Docs page has a hero header with title, description, and install command

The documentation page SHALL render a hero section at the top containing the package name, a short tagline describing the library, and a copy-to-clipboard install command (e.g. `npm install mantine-address`). The hero SHALL be visually prominent with gradient or accent styling to establish the page identity.

#### Scenario: Hero renders with package identity

- **WHEN** a developer opens the documentation page
- **THEN** a hero section is visible at the top of the page containing the package name "mantine-address", a descriptive tagline, and an install command
- **THEN** the install command has a copy-to-clipboard button that copies the command text when clicked

#### Scenario: Hero is visually distinct from content sections

- **WHEN** a developer views the documentation page
- **THEN** the hero section is visually differentiated from the content sections below it through distinct background styling, typography scale, or accent colors

### Requirement: Docs page provides section-based navigation

The documentation page SHALL include a navigation component that lists all content sections with anchor links. On desktop viewports, the navigation SHALL appear as a sticky sidebar. On mobile viewports, the navigation SHALL either collapse or reposition to remain accessible without obstructing content.

#### Scenario: Navigation lists all sections with anchor links

- **WHEN** a developer views the documentation page on a desktop viewport
- **THEN** a navigation sidebar is visible listing all content sections as clickable anchor links
- **THEN** clicking a navigation link scrolls the page to the corresponding section

#### Scenario: Navigation highlights the active section

- **WHEN** a developer scrolls through the documentation page
- **THEN** the navigation component visually highlights the link corresponding to the currently visible section

#### Scenario: Navigation is accessible on mobile viewports

- **WHEN** a developer views the documentation page on a mobile viewport (< 768px)
- **THEN** the navigation is either collapsed into a toggleable menu or repositioned above the content so that it does not obstruct the main content area

### Requirement: Docs layout uses a responsive two-column grid

The documentation page SHALL use a two-column layout on desktop viewports: a narrow navigation column and a wider content column. On mobile viewports, the layout SHALL collapse to a single column with navigation above content.

#### Scenario: Desktop layout shows nav and content side by side

- **WHEN** a developer views the documentation page on a viewport wider than 768px
- **THEN** the navigation sidebar and the main content area are displayed side by side in a two-column grid

#### Scenario: Mobile layout stacks nav above content

- **WHEN** a developer views the documentation page on a viewport narrower than 768px
- **THEN** the layout collapses to a single column with the navigation above the content

### Requirement: Docs sections have anchored headings

Each documentation section SHALL render a heading element with a stable `id` attribute derived from the section title. The heading SHALL serve as a scroll target for navigation anchor links.

#### Scenario: Section headings have id attributes

- **WHEN** the documentation page renders a section with a title
- **THEN** the section heading element has an `id` attribute that is a URL-safe, kebab-case derivation of the title text

#### Scenario: Anchor links scroll to section headings

- **WHEN** a user clicks a navigation anchor link or navigates to a URL with a hash fragment matching a section ID
- **THEN** the page scrolls to the corresponding section heading

### Requirement: Docs page renders inside Storybook without external dependencies at runtime

The documentation page SHALL render within the existing Storybook setup (MantineProvider, Storybook blocks). All visual enhancements SHALL use dev-time CSS utilities (Tailwind) and Mantine primitives. No additional runtime JavaScript libraries SHALL be required beyond React, Mantine, and Storybook.

#### Scenario: Page renders in Storybook dev server

- **WHEN** a developer runs `npm run storybook`
- **THEN** the documentation page renders correctly with all visual enhancements, examples, and navigation functional

#### Scenario: Page renders in static Storybook build

- **WHEN** a developer runs `npm run build:storybook`
- **THEN** the static build includes the documentation page with all styles and interactivity intact
