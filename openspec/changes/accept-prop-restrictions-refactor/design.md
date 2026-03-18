## Context

The component currently accepts an optional `restrictions` prop of type `AddressRestrictions` with array fields: `allowedCountries`, `allowedStates`, `allowedRegions`, `allowedPostcodes`, `allowedSuburbs`. Providers (e.g. GooglePlacesProvider) receive this in `GetSuggestionsOptions.restrictions` and use only the first country list and the first region (for location bias). Validation is implemented in `addressSatisfiesRestrictions()` and used in AddressInput after selection or manual submit. The manual-entry form filters Country and State options using Sets built from those arrays. This refactor replaces that API with a single `accept` prop holding at most one country and one region, aligning the public API with provider capabilities and simplifying types and logic.

## Goals / Non-Goals

**Goals:**

- Introduce `accept?: { country?: string | Country; region?: string | Region }` as the only way to restrict accepted addresses to one country and optionally one region/state.
- Remove `restrictions` and `AddressRestrictions`; remove support for multiple countries, multiple regions/states, and for postcode/suburb filtering in the component.
- Update provider contract (`GetSuggestionsOptions`) to pass the new shape so providers can set `componentRestrictions.country` to a single-element array and use the single region for location bias.
- Keep validation semantics: address is accepted only if it matches the single country (when set) and the single region’s state (when set). Manual form: when `accept.country` is set, Country select shows only that country; when `accept.region` is set, State select shows only that region’s state (for countries with a state list).

**Non-Goals:**

- Backward compatibility with the old `restrictions` prop (breaking change; consumers migrate to `accept`).
- Supporting postcode or suburb filtering in the library (consumers can validate after selection if needed).
- Supporting multiple countries or multiple regions in one component instance.

## Decisions

**1. Prop name: `accept`**

- **Chosen:** New prop `accept` with shape `{ country?, region? }`.
- **Alternative:** Keep the name `restrictions` but change the type to the new single-value shape. We chose `accept` to signal a clean break and a clearer mental model (“what we accept” vs “what we restrict”).

**2. Type of `country` and `region`**

- **Chosen:** `country?: string | Country` (ISO 3166-1 alpha-2 code or `Country` object); `region?: string | Region` (state code or full `Region` for location bias).
- **Rationale:** Allows both simple usage (`accept={{ country: 'AU', region: 'NSW' }}`) and provider-friendly usage (`accept={{ country: COUNTRIES.AU, region: REGIONS.NEW_SOUTH_WALES }}`) so providers can use `Region.location` for Google bias when a full `Region` is provided.

**3. Internal validation and provider options**

- **Chosen:** Introduce an internal type (e.g. `AcceptAddress` or inline) used by `addressSatisfiesRestrictions` (or a renamed function) and by `GetSuggestionsOptions`. Provider receives a normalised view: one country code (string), optional one region (for state check and optional location). No separate `allowedStates`; state is derived from `accept.region` (abbreviation or string).
- **Alternative:** Keep a separate “restrictions” shape internally and map `accept` to it. Rejected to avoid maintaining two concepts; single source of truth is `accept`.

**4. Removal of postcode and suburb**

- **Chosen:** No `allowedPostcodes` or `allowedSuburbs` in the new API. Consumers that need postcode/suburb filtering must validate the address after selection (e.g. in `onChange`) or implement their own filter.
- **Rationale:** Aligns with “one country, one region” simplification and avoids rarely-used API surface that providers do not support.

## Risks / Trade-offs

- **Breaking change:** Any consumer using `restrictions` must migrate to `accept` and lose multi-country/multi-region/postcode/suburb. Mitigation: document migration in CHANGELOG and release as a major version.
- **Less flexibility:** Consumers who needed multiple countries (e.g. AU + NZ) in one field must use two components or drop restriction. Mitigation: accepted as intentional simplification; Google only supports one country list and we align to that.
- **Spec and test updates:** All scenarios that reference `restrictions`, multiple countries/regions, or postcode/suburb must be updated or removed. Mitigation: update specs in this change and adjust tests and stories as part of implementation tasks.

## Migration Plan

- Ship in a **major** release. CHANGELOG entry: describe removal of `restrictions` and `AddressRestrictions`, introduction of `accept`, and that postcode/suburb and multiple countries/regions are no longer supported; provide a short migration example (e.g. `restrictions={{ allowedCountries: [COUNTRIES.AU], allowedRegions: [REGIONS.NEW_SOUTH_WALES] }}` → `accept={{ country: COUNTRIES.AU, region: REGIONS.NEW_SOUTH_WALES }}`).
- No runtime compatibility layer: no support for reading `restrictions` and mapping to `accept`; clean break.

## Open Questions

None. Type names (`AcceptAddress` vs inline in props) can be decided at implementation time.
