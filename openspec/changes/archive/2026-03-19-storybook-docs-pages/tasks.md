## 1. Baseline and docs tooling

- [x] 1.1 Audit current Storybook configuration and confirm Docs support (autodocs, MDX) works in dev and build
- [x] 1.2 Add any missing Storybook Docs dependencies/config required to render MDX docs pages (keep changes additive)
- [x] 1.3 Decide and document the canonical navigation entry points for docs pages (e.g. `AddressInput/Docs`, `Providers/Docs`, `Formatting/Docs`)

## 2. Shared documentation page primitives (Storybook-only)

- [x] 2.1 Create Storybook-only docs layout primitives using Mantine (e.g. `DocsPage`, `DocsSection`, `ExampleBlock`, `SnippetBlock`) to standardize spacing/typography
- [x] 2.2 Add a shared snippet rendering approach (e.g. curated `string` snippets rendered with Storybook code blocks) and document the snippet conventions
- [x] 2.3 Add a lightweight “props guidance” pattern (argTypes table and/or curated prop callouts) that can be reused across pages

## 3. AddressInput documentation pages (preserve existing demos)

- [x] 3.1 Create an `AddressInput` docs landing page (MDX) with sections: Overview, Installation/Provider prerequisite, Quick start, Props, Examples
- [x] 3.2 Integrate the existing `Overview` and `Form` stories into the docs landing page and add curated snippets for each example
- [x] 3.3 Convert `Manual entry` stories into a docs-style page (MDX) that embeds the existing examples and provides curated snippets for: manual modal usage, `preventManualEntry`, `defaultAddress`, and `data`
- [x] 3.4 Convert `Restrictions` stories into a docs-style page (MDX) that embeds the existing selector demo and provides curated snippets for `accept` patterns (country-only, country+region)
- [x] 3.5 Convert `Prefill` stories into a docs-style page (MDX) that embeds the existing examples and provides curated snippets using constants where available

## 4. Provider documentation pages

- [x] 4.1 Create a `Providers` docs landing page (MDX) describing provider responsibilities, required props, and where to place setup code
- [x] 4.2 Convert `Providers/Google Places` stories into a docs-style page (MDX) that embeds the existing examples and adds curated snippets for provider setup and usage
- [x] 4.3 Ensure provider setup complexity remains isolated to provider pages (no duplication across `AddressInput` docs pages)

## 5. Formatting documentation pages

- [x] 5.1 Create a `Formatting` docs landing page (MDX) explaining formatter responsibilities and common usage patterns
- [x] 5.2 Convert existing formatter stories into docs-style pages (MDX) with curated snippets for the recommended formatting flows

## 6. Cleanup, consistency, and acceptance checks

- [x] 6.1 Normalize story titles, naming, and group structure so docs pages are the primary entry points and demos remain discoverable
- [x] 6.2 Ensure every embedded example shown in docs pages includes an adjacent, copy/paste-ready curated snippet
- [x] 6.3 Run Storybook locally and ensure docs pages render correctly (layout, snippets, controls where applicable)
- [x] 6.4 Build static Storybook and confirm the docs pages and navigation render as expected
