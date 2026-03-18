## Context

Storybook is used as both a development harness and developer-facing documentation for this library. Today, stories are split across:

- `stories/AddressInput.stories.tsx` (mixed “kitchen sink” examples)
- `stories/AddressInput/*` (more focused)
- `stories/GooglePlacesProvider.stories.tsx` (provider-specific live demo)
- `stories/formatters/*` (documentation-style formatter demos)

This produces overlap, inconsistent navigation, and duplicated logic (notably Google Maps script loading, implemented in multiple places). The refactor should improve discoverability and reduce maintenance without changing runtime component behavior.

## Goals / Non-Goals

**Goals:**

- Make Storybook read like documentation: small set of canonical examples with clear grouping.
- Define a simple sidebar taxonomy that matches how developers look for examples.
- Minimize story complexity: prefer `args`-only stories; use `render` only for controlled/form patterns.
- Centralize live provider concerns under provider-specific stories; keep `AddressInput/*` provider-agnostic.
- Reduce duplication: shared helpers only where they genuinely simplify (avoid abstraction for its own sake).

**Non-Goals:**

- Any runtime changes to `AddressInput`, providers, or formatter behavior.
- Reworking Storybook theming or MDX docs beyond story file organization and descriptions.
- Building a “playground app” inside Storybook as the primary documentation surface.

## Decisions

### Sidebar taxonomy (primary navigation)

Use titles that group by developer intent:

- `AddressInput/Overview`
- `AddressInput/Usage`
- `AddressInput/Manual entry`
- `AddressInput/Restrictions`
- `Providers/Google Places`
- `Formatting/International`
- `Formatting/Australian`

Rationale: “AddressInput” stories should teach core component usage without requiring external setup. Provider stories should be clearly separated as optional integrations. Formatting is its own domain and already has good documentation-style stories.

### Story selection: canonical set over exhaustive variants

Keep a small number of high-signal stories per group (generally 4–8 per file). Prefer removing “minor variations” unless they teach a non-obvious behavior.

Examples:

- Debounce: one story demonstrating the prop is enough (or omit entirely if it is obvious).
- Loading/no-results: keep only if it clarifies UX states or integration expectations.
- Highlighting matched substrings: keep only if it is a documented feature developers should rely on.

### Provider boundaries and duplication removal

- All Google Maps script loading lives under `Providers/Google Places`.
- `AddressInput/Restrictions` uses mock/manual-only patterns and does not load external scripts.

Rationale: avoids duplicated loaders and makes offline/local development reliable.

### File layout: simple, predictable, minimal abstraction

- Prefer a small number of story files with clear names over many micro-files.
- Avoid “interactive playground” stories unless explicitly labeled as such (e.g., `Playground: country + region controls`) and kept out of the primary learning path.

If any helper is introduced (e.g., a shared Google script loader), it should be in `stories/_helpers/*` and used in one place; avoid multi-layer abstractions.

## Risks / Trade-offs

- **Risk**: Breaking deep links to old story IDs/titles → **Mitigation**: keep stable story `name` values where possible and avoid unnecessary renames.
- **Risk**: Removing “useful but niche” stories → **Mitigation**: keep a small “Recipes” subset only when it teaches a real integration pattern (forms, controlled, restrictions).
- **Trade-off**: Some duplication vs helpers → **Mitigation**: accept small duplication if it keeps stories readable; only factor out when it noticeably reduces cognitive load.
