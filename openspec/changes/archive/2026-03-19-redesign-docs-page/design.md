## Context

The library currently ships a single `Docs.mdx` page rendered inside Storybook. The page is built from three custom components (`DocsPage`, `DocsSection`, `ExampleBlock`) that wrap Mantine primitives (`Paper`, `Stack`, `Title`, `Divider`, etc.) and Storybook blocks (`<Story>`, `<Source>`, `<Controls>`). The result is functional but visually flat — it looks like a slightly styled Storybook canvas rather than a polished documentation site.

The Storybook is deployed to GitHub Pages and serves as the library's primary public documentation. The visual quality of this page directly affects developer perception and adoption confidence.

Current tech stack for stories: React 18+, Mantine 7, Storybook 8 (React-Vite), TypeScript, Vite 6. No CSS framework beyond Mantine's built-in styles.

## Goals / Non-Goals

**Goals:**

- Create a visually distinctive, beautiful documentation page that feels like a standalone docs site (not a Storybook addon).
- Establish a component system for docs that is reusable across future documentation pages.
- Maintain Mantine primitives for structural layout while using Tailwind CSS for fine-grained visual polish (typography, gradients, subtle animations, spacing).
- Ensure every example has both a live interactive preview and a syntax-highlighted, copy-ready code block.
- Provide section-based navigation so developers can jump to specific topics.

**Non-Goals:**

- Not building a full docs framework (no MDX processing pipeline, no search, no versioning).
- Not changing the library's public API or source code.
- Not modifying existing `.stories.tsx` files — the docs page references them via `<Story of={...}>`.
- Not adding Tailwind to the library's production bundle — it's dev-only for Storybook.
- Not adding testing for docs components — this is a presentation-only change.

## Decisions

### 1. Tailwind CSS v4 via `@tailwindcss/vite`

**Decision**: Add Tailwind CSS v4 as a dev dependency with the `@tailwindcss/vite` plugin.

**Rationale**: Tailwind v4 is zero-config — no `tailwind.config.js` needed. The Vite plugin integrates cleanly with the existing Storybook-Vite setup. Tailwind gives us utility classes for gradients, backdrop effects, fine typography control, and responsive design that would be verbose to achieve with inline Mantine `style` props alone.

**Alternative considered**: Pure Mantine styling with CSS modules. Rejected because Mantine's styling API is optimized for component props, not for the kind of decorative/typographic control needed for a docs page (e.g., gradient text, animated borders, code block theming).

**Integration**: Add the plugin to `.storybook/main.ts`'s Vite config and import `tailwindcss` in `.storybook/preview.tsx`. Tailwind and Mantine can coexist — Mantine handles component structure, Tailwind handles decorative utilities.

### 2. Component architecture: Composition over configuration

**Decision**: Build a set of focused, composable docs components rather than a single monolithic `DocsPage` mega-component.

Components:

- `DocsHero` — page header with title, description, install command, badges
- `DocsNav` — sticky sidebar or top-anchored section navigation
- `DocsSection` — section wrapper with anchor ID, title, description
- `CodeBlock` — syntax-highlighted code with copy button, optional tabs
- `ExampleBlock` — live preview + collapsible code panel
- `PropsTable` — styled API reference table
- `DocsLayout` — orchestrates hero + nav + content in a responsive grid

**Rationale**: Small composable components are easier to maintain, test individually, and reuse if we add more documentation pages later. This follows Mantine's own component philosophy.

### 3. Syntax highlighting: Storybook's `Source` block with custom styling

**Decision**: Continue using Storybook's `<Source>` block for syntax highlighting but wrap it in a custom-styled container.

**Rationale**: Storybook's `Source` already handles syntax highlighting via Prism and integrates with the Storybook theming system. Adding a separate highlighter (shiki, highlight.js) would duplicate functionality and increase bundle size for no gain. We wrap `Source` in our `CodeBlock` component to control the visual chrome (background, border, padding, copy button, tabs).

**Alternative considered**: `shiki` for server-rendered highlighting. Rejected — overhead not justified for a Storybook docs page where `Source` already works well.

### 4. Section navigation: Anchor-based with scroll-spy

**Decision**: Implement section navigation using anchor IDs on each `DocsSection` with a sidebar `DocsNav` component that highlights the active section based on scroll position.

**Rationale**: This is the standard pattern used by Tailwind docs, Laravel docs, and Mantine docs. It provides instant orientation within a long single-page doc. Implementation uses `IntersectionObserver` for scroll-spy — no external dependency needed.

**Layout**: Two-column on desktop (nav sidebar + content), single-column on mobile (nav collapses to a sticky top bar or is hidden).

### 5. Example block design: Preview-above, code-below with toggle

**Decision**: Each `ExampleBlock` shows the live preview in a bordered sandbox area at the top, with a code panel below that can be expanded/collapsed via a toggle button.

**Rationale**: This matches the pattern used by Mantine's own docs and is familiar to developers. Showing the preview first emphasizes the visual result; the code is one click away. Code defaults to collapsed to keep the page scannable.

### 6. Color and visual design language

**Decision**: Use a design language that complements Mantine's default theme while adding distinctive touches:

- Subtle gradient accents on the hero section
- Muted background tones for code blocks (dark code theme regardless of page theme)
- Clean card-based sections with subtle shadows and rounded corners
- Consistent use of Mantine's color tokens for text and accent colors

**Rationale**: The docs should feel premium but not fight Mantine's design system. Using Mantine color tokens ensures the page adapts if a consumer ever customizes the theme.

## Risks / Trade-offs

**[Tailwind + Mantine class conflicts]** → Tailwind v4's default CSS reset could conflict with Mantine's baseline styles. **Mitigation**: Use Tailwind's `@layer` directives and ensure Mantine's CSS loads after Tailwind's preflight. Test thoroughly in the Storybook preview.

**[Storybook `Source` block styling limitations]** → The `Source` block's internal DOM may resist custom styling. **Mitigation**: Wrap in a container with `overflow: hidden` and use CSS to override internal padding/backgrounds. If truly unworkable, fall back to a raw `<pre><code>` with manual Prism highlighting.

**[Page load performance]** → A long single-page doc with many live `<Story>` embeds may be slow to render. **Mitigation**: Storybook already lazy-loads stories. If needed, add explicit lazy loading or intersection-observer-based rendering for off-screen examples.

**[Tailwind as dev dependency adds install size]** → Tailwind v4 is a dev-only build tool dependency. It does not affect the published npm package. The trade-off is a ~15MB heavier `node_modules` for contributors, which is acceptable for a dev tool.
