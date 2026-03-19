## Why

Storybook is already the primary “docs surface” for this library, but the current stories read like demos rather than cohesive documentation. Converting them into documentation-style pages will make it easier for consumers to understand the component’s props and recommended usage patterns without losing the existing interactive examples.

## What Changes

- Restructure existing Storybook entries into documentation-like pages (overview/usage/props), while keeping the current sample/demo components as the runnable examples.
- Add clear, copy/paste-ready code snippets alongside each example that show the recommended patterns for key props (e.g. `accept`, `prefill`, providers).
- Improve visual layout and navigation (grouping, titles, and page sections) so the Storybook reads like a component docs site, not just a set of isolated stories.
- No runtime/library API changes to `AddressInput` are required for this change.

## Capabilities

### New Capabilities

- (none)

### Modified Capabilities

- `storybook`: expand the “documents the library component” requirement to explicitly include documentation-page layout and inline code snippets while preserving the existing demo coverage.
- `documentation`: refine the “Stories are documentation-quality examples” requirement to specify full-page documentation structure (sections, snippet expectations) instead of only general story quality guidance.

## Impact

- **Affected areas**: `stories/**` (new/updated stories and doc pages), Storybook configuration if needed for docs/MDX addons, and any shared story utilities/components used to render consistent documentation layouts.
- **Public API**: no changes expected to library exports or `AddressInput` props (documentation-only change).
- **Compatibility**: should remain compatible with existing Mantine + Storybook setup; any new Storybook addons/config must be additive and not require consumer app changes.

## Non-goals

- Changing `AddressInput` behavior, props, or exported types.
- Rewriting or removing the existing demo logic/components; the same examples should remain, just presented as documentation.
- Adding new providers or changing provider integrations beyond improving their documentation presentation.
- Overhauling the README beyond optionally linking to the improved Storybook docs if necessary.
