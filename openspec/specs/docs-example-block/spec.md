## ADDED Requirements

### Requirement: ExampleBlock shows a live preview in a bordered sandbox

The `ExampleBlock` component SHALL render the live interactive preview inside a visually distinct bordered container (the "sandbox"). The sandbox SHALL have a light background, rounded corners, and sufficient padding to frame the preview content.

#### Scenario: Preview renders inside a bordered sandbox

- **WHEN** an `ExampleBlock` is rendered with a preview element
- **THEN** the preview is displayed inside a bordered, rounded container with padding
- **THEN** the preview is interactive (the embedded Storybook story responds to user input)

### Requirement: ExampleBlock has a collapsible code panel

The `ExampleBlock` component SHALL render a code panel below the preview that can be expanded or collapsed via a toggle control. The code panel SHALL default to collapsed so the page remains scannable.

#### Scenario: Code panel defaults to collapsed

- **WHEN** an `ExampleBlock` is rendered with a code snippet
- **THEN** the code panel is collapsed (hidden) by default
- **THEN** a toggle control (e.g. "Show code" button) is visible below the preview

#### Scenario: Toggle expands and collapses the code panel

- **WHEN** a developer clicks the "Show code" toggle
- **THEN** the code panel expands to reveal the syntax-highlighted code snippet with a copy button
- **WHEN** the developer clicks the toggle again
- **THEN** the code panel collapses back to its hidden state

### Requirement: ExampleBlock displays a title and optional description

The `ExampleBlock` component SHALL display a title above the preview sandbox. An optional description MAY be provided and SHALL render between the title and the preview.

#### Scenario: Title is rendered above the preview

- **WHEN** an `ExampleBlock` is rendered with a title
- **THEN** the title text is displayed above the preview sandbox as a heading

#### Scenario: Description renders between title and preview

- **WHEN** an `ExampleBlock` is rendered with a title and a description
- **THEN** the description text is displayed between the title and the preview sandbox

### Requirement: ExampleBlock works without a code snippet

The `ExampleBlock` component SHALL render correctly when no code snippet is provided. In this case, the toggle control and code panel SHALL not be rendered.

#### Scenario: No code panel when snippet is absent

- **WHEN** an `ExampleBlock` is rendered without a code snippet
- **THEN** no toggle control or code panel is rendered
- **THEN** the preview sandbox is displayed with the title and optional description only
