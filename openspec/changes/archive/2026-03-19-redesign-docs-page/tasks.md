## 1. Tailwind CSS Setup

- [x] 1.1 Install `tailwindcss` and `@tailwindcss/vite` as dev dependencies
- [x] 1.2 Add the `@tailwindcss/vite` plugin to `.storybook/main.ts` Vite config
- [x] 1.3 Create a Tailwind CSS entry file (e.g. `stories/docs/tailwind.css` with `@import "tailwindcss"`) and import it in `.storybook/preview.tsx`
- [x] 1.4 Verify Tailwind utilities render correctly alongside Mantine styles in Storybook dev server

## 2. CodeBlock Component

- [x] 2.1 Create `stories/docs/CodeBlock.tsx` — a syntax-highlighted code block that wraps Storybook's `<Source>` in a dark-themed container with a copy-to-clipboard button using Mantine's `CopyButton`
- [x] 2.2 Add tabbed variant support to `CodeBlock` — accepts an array of `{ label, code, language }` variants and renders tab buttons to switch between them; first tab active by default
- [x] 2.3 Ensure `CodeBlock` renders cleanly without tabs when given a single snippet (no tab UI)

## 3. ExampleBlock Redesign

- [x] 3.1 Rewrite `stories/docs/ExampleBlock.tsx` — render live preview in a bordered sandbox container with light background, rounded corners, and padding
- [x] 3.2 Add collapsible code panel below the preview sandbox — defaults to collapsed with a "Show code" / "Hide code" toggle button; uses the new `CodeBlock` component for the code display
- [x] 3.3 Render title as a heading above the sandbox and optional description between title and preview

## 4. DocsNav Component

- [x] 4.1 Create `stories/docs/DocsNav.tsx` — a navigation component that accepts an array of section titles/IDs and renders anchor links
- [x] 4.2 Implement scroll-spy using `IntersectionObserver` to highlight the active section link as the user scrolls
- [x] 4.3 Make the nav sticky on desktop (position sticky in the sidebar column) and collapsible/hidden on mobile viewports

## 5. DocsHero Component

- [x] 5.1 Create `stories/docs/DocsHero.tsx` — a hero header component with package name, tagline, and a copy-to-clipboard install command
- [x] 5.2 Style the hero with gradient/accent background, prominent typography, and visual distinction from content sections using Tailwind utilities and Mantine primitives

## 6. DocsLayout and DocsSection Redesign

- [x] 6.1 Rewrite `stories/docs/DocsSection.tsx` — add an `id` prop (auto-derived from title as kebab-case) to the section heading for anchor linking; refresh visual styling with cleaner separators and spacing
- [x] 6.2 Create `stories/docs/DocsLayout.tsx` — a responsive two-column layout component: nav sidebar (narrow) + content column (wide) on desktop, single-column on mobile; orchestrates `DocsHero`, `DocsNav`, and children sections
- [x] 6.3 Remove the old `stories/docs/DocsPage.tsx` (replaced by `DocsLayout` + `DocsHero`)

## 7. PropsTable Component

- [x] 7.1 Create `stories/docs/PropsTable.tsx` — a styled API reference table or card layout for key props, replacing the raw `<Controls>` block with a visually consistent design

## 8. Docs.mdx Rewrite

- [x] 8.1 Rewrite `stories/Docs.mdx` to use the new component system (`DocsLayout`, `DocsHero`, `DocsNav`, `DocsSection`, `ExampleBlock`, `CodeBlock`, `PropsTable`)
- [x] 8.2 Expand content with richer section descriptions, contextual guidance for each example, and a logical documentation flow (Quick Start → Core Usage → Manual Entry → Restrictions → Prefill → Providers → Formatting → Props API)
- [x] 8.3 Add a tabbed install command in the hero section (npm / yarn / pnpm variants using `CodeBlock`)

## 9. Verification

- [x] 9.1 Run `npm run storybook` and verify all sections render correctly with navigation, interactive examples, collapsible code panels, and copy-to-clipboard functionality
- [x] 9.2 Run `npm run build:storybook` and verify the static build produces the documentation page with all styles and interactivity intact
- [x] 9.3 Test responsive layout — verify two-column grid on desktop and single-column on mobile viewports
