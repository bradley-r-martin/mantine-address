# Design: Storybook restrictions country/region select

## Context

- **Current state**: `AddressInput/Restrictions` stories each hardcode `accept` (e.g. `accept={{ country: COUNTRIES.AU }}` or `accept={{ country: COUNTRIES.AU, region: REGIONS.NEW_SOUTH_WALES }}`). To try another country or region, a developer must edit the story file.
- **Constraints**: Stories live under `stories/`; we use Mantine components and existing region data (`COUNTRIES`, `REGIONS`, `REGIONS_US`, `getStatesForCountry`) from `@/regions`. No new library exports or public API changes.
- **Stakeholders**: Developers and maintainers who use Storybook to verify restriction behavior.

## Goals / Non-Goals

**Goals:**

- Provide a single place in Storybook (restriction stories) where users can pick country and optional region and see `AddressInput` behave with that `accept` value.
- Reuse existing region data and Mantine Select (or equivalent) for consistency.
- Keep stories provider-agnostic where they are today (manual-only or mock provider).

**Non-Goals:**

- Changing `AddressInput` API or the address-restrictions spec; changing provider or formatting stories; adding new automated tests beyond existing coverage.

## Decisions

### 1. Wrapper component vs. Storybook args/controls

- **Choice**: Introduce a small **wrapper component** (e.g. `RestrictionsDemo`) that renders country select + region select + `AddressInput`, and use it in one or more stories.
- **Rationale**: `accept` is an object (`{ country?, region? }`); Storybook controls for nested objects are clunky. A dedicated wrapper keeps the UI clear (two dropdowns, one input) and passes values directly. Alternatives: use Storybook args with a custom control (more setup, same end result); or multiple stories per combo (too many stories, hard to maintain).

### 2. Where the wrapper lives

- **Choice**: Define the wrapper in the same file as the restrictions stories (`Restrictions.stories.tsx`) or in a sibling file under `stories/AddressInput/` (e.g. `RestrictionsDemo.tsx`) used only by these stories.
- **Rationale**: Co-locating in the story file is simpler and keeps the demo scoped to documentation. If the component grows (e.g. more controls), extract to `RestrictionsDemo.tsx` for readability. No need to put it in `src/` since it is not part of the library API.

### 3. Country and region options

- **Choice**: Country select options: “Any” (no restriction), plus countries the library supports with state lists (e.g. AU, US) so region select is meaningful. Region select: when a country with states is selected, options from `getStatesForCountry` (e.g. AU → NSW, VIC…; US → CA, NY…); when “Any” or a country without a state list is selected, region select is hidden or disabled and `accept.region` is omitted.
- **Rationale**: Matches existing `accept` semantics and `getStatesForCountry`; “Any” makes it easy to compare restricted vs unrestricted behavior in the same story.

### 4. How existing stories are refactored

- **Choice**: Replace or consolidate the current restriction stories (e.g. “Australia only”, “accept with region (NSW)”, “Autocomplete with accept”) with one or two stories that use the wrapper. For example: one story “Manual entry with country/region select” (provider null) and one “Autocomplete with country/region select” (mock provider), both using the same wrapper so country/region are always selectable.
- **Rationale**: Avoids duplication and keeps a single source of truth for the country/region UI; all restriction examples become explorable from the same controls.

## Risks / Trade-offs

- **Risk**: Wrapper and region data might get out of sync if new countries/regions are added to the library.  
  **Mitigation**: Use the same `COUNTRIES`, `REGIONS`, `REGIONS_US`, and `getStatesForCountry` from `@/regions`; no separate list.

- **Trade-off**: Fewer individual “named” stories (e.g. “Australia only”) in favor of one or two stories with selects.  
  **Mitigation**: Story descriptions and docs can still call out “Australia only” and “NSW only” as examples to try via the dropdowns.
