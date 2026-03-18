## Why

Storybook is currently split across overlapping “kitchen sink” stories and more focused story files, with duplicated demo plumbing (notably Google Places script loading) and mixed intent (docs vs playground). This makes it harder for developers to quickly find canonical examples and increases maintenance cost.

## What Changes

- Reorganize Storybook navigation into a small, predictable taxonomy aligned to developer expectations (Overview, Usage, Manual entry, Restrictions, Providers, Formatting).
- Reduce each story to a single purpose (“how do I…”) and remove redundant variants.
- Centralize Google Places live-demo concerns under `Providers/Google Places`; keep `AddressInput/*` stories provider-agnostic (mock/manual) to avoid duplicated script-loading logic.
- Ensure story files follow a consistent structure (meta description, minimal decorators, args-first stories, focused render stories only when needed).
- Rename story titles/files for clarity and consistent grouping (no breaking runtime API changes).

## Non-goals

- Changing `AddressInput` runtime behavior, props, or exports.
- Adding new providers or changing provider adapters (Google Places behavior stays the same).
- Large visual redesign of Storybook UI beyond story content and navigation organization.

## Capabilities

### New Capabilities

<!-- none -->

### Modified Capabilities

- `storybook`: Update requirements for Storybook organization and what constitutes “documentation-quality” stories.
- `story-layout`: Update conventions for story file structure, naming, and grouping in the sidebar.
- `documentation`: Clarify documentation expectations for stories as developer-facing examples.

## Impact

- Story files under `stories/**` will be renamed, moved, and simplified.
- Storybook docs/navigation will change (titles, grouping) but library runtime API remains unchanged.
- Reduced duplication of Google Places demo loading logic; easier maintenance for provider-related stories.
