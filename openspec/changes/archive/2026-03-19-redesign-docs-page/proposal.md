## Why

The current Docs.mdx page is a functional but visually plain documentation surface that relies on basic Storybook blocks (`<Story>`, `<Controls>`) wrapped in minimal Mantine Paper/Stack/Divider primitives. It does not match the caliber of documentation that developers expect from modern libraries like Mantine, Tailwind CSS, or Laravel. A beautifully designed, bespoke docs page — with clear visual hierarchy, interactive examples, syntax-highlighted code blocks, smooth transitions, and a polished layout — will elevate the library's perceived quality, improve developer onboarding, and make the Storybook deployment feel like a first-class documentation site rather than a component playground.

## What Changes

- **Replace the existing docs component system** (`DocsPage`, `DocsSection`, `ExampleBlock`) with a redesigned, visually rich set of docs components that provide a modern documentation experience.
- **Add Tailwind CSS v4 as a dev dependency** scoped to the Storybook/stories build for utility-based styling alongside Mantine primitives. This gives us fine-grained typographic control, spacing utilities, and decorative styling without fighting Mantine's component system.
- **Redesign the page layout** with a hero/header section featuring the package name, tagline, install command (copy-to-clipboard), and a quick-nav sidebar or anchor links for section jumping.
- **Introduce a new `CodeBlock` component** with proper syntax highlighting (using a lightweight highlighter like `shiki` or Storybook's built-in `Source`), a tabbed interface for showing variants (e.g. npm/yarn/pnpm for install commands), and a polished copy button.
- **Redesign `ExampleBlock`** to show a live interactive preview in a bordered sandbox area with a collapsible/expandable code panel below it (inspired by Mantine docs' example cards and Tailwind's interactive demos).
- **Add a table-of-contents / section navigation** component that lists all doc sections with anchor links, providing quick navigation similar to Tailwind and Laravel docs sidebars.
- **Add a Props/API reference section** with a styled table or card-based layout replacing the raw Storybook `<Controls>` block.
- **Redesign section headers** with clear visual separators, optional badges/icons, and descriptive subtitles.
- **Rewrite `Docs.mdx`** to use the new components and expand content with richer descriptions, more context per example, and a logical documentation flow.

## Non-goals

- This change does not modify the library's public API surface (no changes to `AddressInput` props, types, or exports).
- This change does not affect the individual `.stories.tsx` files — the existing stories continue to work; the docs page simply references them.
- This change does not add or modify tests — it is purely a documentation/presentation concern.
- Tailwind CSS is added as a **dev dependency only**, scoped to Storybook. It does not ship with the library package.

## Capabilities

### New Capabilities

- `docs-page-design`: The visual design system for the documentation page — layout, hero, section navigation, typography, and overall page structure.
- `docs-code-block`: A syntax-highlighted, copy-enabled, optionally tabbed code block component for documentation pages.
- `docs-example-block`: A redesigned interactive example block with live preview area and collapsible code panel.

### Modified Capabilities

- `documentation`: The documentation spec's requirement for "documentation-style pages with clearly labeled sections" is being enhanced with richer visual design, but the core requirements (sections, snippets, copy-paste-ready code) remain satisfied.

## Impact

- **Files changed**: `stories/docs/DocsPage.tsx`, `stories/docs/DocsSection.tsx`, `stories/docs/ExampleBlock.tsx`, `stories/Docs.mdx`, and new component files under `stories/docs/`.
- **Dependencies added**: `tailwindcss` (v4, dev), possibly `@tailwindcss/vite` for Vite integration, and optionally a syntax highlighter if Storybook's `Source` block proves insufficient.
- **Storybook config**: `.storybook/main.ts` and/or `.storybook/preview.tsx` may need minor updates to load Tailwind's CSS and configure the Vite plugin.
- **No public API changes**: The library's `src/` directory, exports, types, and package.json `main`/`module`/`types` fields are untouched.
- **Mantine compatibility**: All docs components continue to use Mantine primitives where appropriate (Paper, Text, Title, ThemeIcon, etc.) and respect MantineProvider theming.
