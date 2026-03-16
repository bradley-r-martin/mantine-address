## Context

The library provides `AddressInput`, a Mantine-based component with an optional lookup provider and a manual-entry modal. The manual form currently uses `TextInput` for every field, including Country and State/Province (Row 6). Formatters live under `src/formatters/` with a clear pattern: one module per format (e.g. `australian.ts`, `international.ts`), shared types in `types.ts`, and an `index.ts` that re-exports. The `Address` type already has optional `country` and `state`; no type change is required. We need a structured list of countries and, for a subset of countries (AU, US initially), a list of states so the manual form can render a select for Country and conditionally a select or text input for State.

## Goals / Non-Goals

**Goals:**

- Add a single source of truth for “all countries” and “states for a given country” inside the library, with a file layout that mirrors the formatters pattern so adding more countries is straightforward.
- In the manual-entry modal: Country is always a select; State is a select when the selected country has a configured state list, otherwise a plain text input.
- Expose region data (and a small API like `getStatesForCountry`) so consumers can reuse or extend without depending on internal paths.
- Keep bundle impact reasonable (static data; tree-shaking for region modules if possible).

**Non-Goals:**

- No new required or optional props on `AddressInput` to configure countries/states in this change.
- No i18n of country/state labels (English-only for now).
- No persistence or server-side validation of country/state; this is UI and data shape only.

## Decisions

1. **Where to put region data (countries + states)**  
   **Decision:** Introduce a top-level `src/regions/` directory (sibling to `formatters/`), with one file per “region dataset” and a thin index that composes them.  
   **Rationale:** Formatters are about _formatting_ an address for display; regions are about _choices_ for the manual form. Keeping them separate avoids overloading formatters and keeps “list of countries” and “states for country X” discoverable.  
   **Alternatives:** Putting regions under `src/formatters/` was considered but would mix “how to format” with “what options to show”; a single `regions.ts` with everything would grow large and make adding countries harder.

2. **Shape of country and state data**  
   **Decision:**
   - **Countries:** One module (e.g. `src/regions/countries.ts`) exporting a list of `{ code: string, name: string }` (e.g. ISO 3166-1 alpha-2 and display name). Sorted by name for the select.
   - **States:** One file per country that has states, e.g. `src/regions/states-au.ts`, `src/regions/states-us.ts`, each exporting an array of `{ code: string, name: string }` (or equivalent). A small registry or `getStatesForCountry(code: string): Array<{ code, name }> | undefined` in `src/regions/index.ts` that returns the list for AU/US and `undefined` for others.  
     **Rationale:** Matches the “files similar to formatters” ask; adding Canada (e.g. `states-ca.ts`) later is a single file + one line in the registry.  
     **Alternatives:** Single JSON file for all regions would work but is harder to tree-shake and to extend in TypeScript; inline objects in the component would bloat the component and not be reusable.

3. **How the manual form chooses “select vs text” for State**  
   **Decision:** When the user selects a country (by code or by value we can map to code), call `getStatesForCountry(countryCode)`. If the result is an array (length ≥ 0), render a `Select` with those options (and optionally an empty option for “not specified”). If the result is `undefined`, render a `TextInput` for state.  
   **Rationale:** Keeps the component logic simple and leaves room for “no states” vs “states not configured” (both can map to text input).  
   **Alternatives:** A separate “hasStates(countryCode): boolean” would duplicate knowledge; returning an empty array for “no states” vs `undefined` for “use text input” is a clear contract.

4. **What to store in Address.country and Address.state**  
   **Decision:** No change: both remain optional strings. For the select case we can store either the display name or the code (e.g. store country code and state code for AU/US so formatters and consumers get consistent values). Prefer storing codes where we have them (country code, state code for AU/US) so downstream formatting (e.g. australian formatter) can rely on them; display names can be derived for display.  
   **Rationale:** Existing formatters (e.g. Australian) already expect state codes; keeping `Address` as-is avoids breaking changes.  
   **Alternatives:** Adding optional `countryCode` / `stateCode` would duplicate; using the same field for both code and name is ambiguous; codes are the better canonical value.

5. **Public API surface**  
   **Decision:** Export from the package main entry (e.g. `src/index.ts`): `countries` (or `getCountries()`), `getStatesForCountry(countryCode: string)`, and TypeScript types for country/state entries (e.g. `Country`, `StateOption` or similar).  
   **Rationale:** Enables consumers to build their own UIs or validate against the same lists; tree-shaking can drop state data for countries they don’t need if we split modules.  
   **Alternatives:** Not exporting would simplify the API but would force consumers to duplicate lists if they need them.

## Risks / Trade-offs

- **Bundle size:** A full country list is on the order of a few hundred entries; AU + US states add a small amount. Risk of noticeable size increase in apps that don’t tree-shake. Mitigation: Keep region modules as separate files so bundlers can tree-shake; document that importing only `AddressInput` doesn’t require importing all region data if we ever split the default list.
- **Stale data:** Country/state lists can change (e.g. ISO updates). Risk of outdated names or codes. Mitigation: Use a well-known source (e.g. ISO 3166-1 for countries) and document the source and update policy; consider a minor version bump when updating lists.
- **Accessibility and i18n:** Labels and options are English-only. Risk: poor UX for non-English apps. Mitigation: Document as a known limitation; i18n can be a follow-up (e.g. optional label maps or locale).

## Migration Plan

- No breaking changes: existing `Address` and manual form behavior (aside from Country/State becoming select/text) remain. No prop or type changes required for consumers.
- Deploy: ship as a feature release; no migration steps.
- Rollback: revert the change; manual form returns to two text inputs for Country and State.

## Open Questions

- None at this time. Source for the canonical country list (e.g. ISO 3166-1 alpha-2 + English short name) can be fixed during implementation (e.g. use a maintained npm dataset or hand-curate a minimal list).
