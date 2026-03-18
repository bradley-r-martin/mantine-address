## Context

The AddressInput component supports manual entry (modal form) and optional provider-based autocomplete. It already has `value`/`defaultValue` for the selected address and uses `countries`/`getStatesForCountry` for the manual form. There is no way to pre-fill the manual form when it opens or to restrict which addresses (by country, state, postcode, suburb) are acceptable. This design adds defaults for the manual form and a restrictions layer that applies to both autocomplete selection and manual submit.

## Goals / Non-Goals

**Goals:**

- Allow consumers to pass default values so the manual-entry form opens with certain fields pre-filled (e.g. default country Australia).
- Allow consumers to restrict addresses by allowed countries, states, postcodes, and/or suburbs; restrictions apply to both provider selection and manual entry.
- Keep the public API additive (optional props only), Mantine-friendly, and TypeScript-strict.

**Non-Goals:**

- Geo-fencing, distance-based rules, or server-side restriction APIs.
- Custom i18n or overridable validation messages (default messages only for this change).
- Changing the `AddressLookupProvider` interface (e.g. passing restrictions into `getSuggestions`); client-side filtering/validation is sufficient.

## Decisions

### 1. Defaults: single partial `defaultAddress` vs per-field props

**Decision:** Use a single optional prop `defaultAddress?: Partial<Address>` (or similar name) so the manual form merges it into initial field values when the modal opens. Only fields present in `defaultAddress` are pre-filled; others stay empty.

**Rationale:** Keeps the prop surface small, aligns with the existing `Address` type, and makes it easy to add more fields later without new props. Per-field props (`defaultCountry`, etc.) would scale poorly.

**Alternative considered:** Per-field props (`defaultCountry`, `defaultState`, …). Rejected to avoid prop bloat and to stay consistent with `Address`.

### 2. Restrictions: shape and application

**Decision:** Introduce an optional `restrictions` prop (e.g. `AddressRestrictions` type) with optional arrays: `allowedCountries?: string[]`, `allowedStates?: string[]`, `allowedPostcodes?: string[]`, `allowedSuburbs?: string[]`. All comparisons use normalised values (e.g. country/state codes, trimmed strings). An address is allowed only if it satisfies every non-empty restriction (AND semantics). Empty/undefined restriction means “no restriction” for that dimension.

**Rationale:** Arrays are easy to pass (e.g. `allowedCountries={['AU']}`) and to combine with existing `countries`/`getStatesForCountry`. AND semantics avoid ambiguity (e.g. “AU” + “NSW” means must be in AU and in NSW).

**Alternatives:** Predicate `(address: Address) => boolean` — flexible but harder to express in UI (e.g. which countries are allowed?). Single-country/state — too limited for multi-region apps.

### 3. Where to enforce restrictions

**Decision:** Enforce in the component only: (1) When the user selects an autocomplete suggestion, resolve details then check restrictions; if invalid, do not call `onChange`, show validation error. (2) When the user submits the manual form, check restrictions before building the address and calling `onChange`; if invalid, show validation on the form (e.g. on the relevant field or a summary). (3) Optionally filter autocomplete suggestions client-side after `getDetails` (e.g. only show suggestions that pass restrictions once resolved); if filtering is too costly (e.g. many suggestions), validate-on-select is the minimum.

**Rationale:** Keeps provider API unchanged; works with any provider. Client-side validation is sufficient for “Australia only” or “these postcodes” use cases.

### 4. Manual form: country/state options when restrictions are set

**Decision:** When `restrictions.allowedCountries` is set, the manual form’s Country select SHALL list only those countries (intersection with the canonical list). When `restrictions.allowedStates` is set, the State control (select or text) SHALL only allow those states (e.g. state select options filtered to allowed list; if state is text input, validate on submit). Same idea for postcode/suburb: validate on submit against `allowedPostcodes`/`allowedSuburbs` if provided.

**Rationale:** Reduces user error and makes allowed options clear in the UI.

### 5. Validation state and messaging

**Decision:** Use Mantine’s standard validation pattern: set `error` on the component (or on the modal/form) when an address fails restrictions. Provide a default message (e.g. “Address must be within the allowed region”); do not add custom message props in this change. Clearing the selection or correcting the address clears the error.

**Rationale:** Fits Mantine forms and keeps the first version simple; message customization can be added later.

## Risks / Trade-offs

- **Performance**: Validating every autocomplete suggestion after `getDetails` could mean many calls; we may only validate on user select and show error if that address fails. Filtering suggestions client-side would require getDetails for each, which is not feasible; so we validate on select and on manual submit.
- **Normalisation**: Postcode/suburb comparison (e.g. case, spacing) must be defined; use trimmed and optionally case-insensitive comparison so “NSW” vs “nsw” and “2000” vs “ 2000 ” behave predictably.
- **Restrictions + defaults**: If both `defaultAddress` and `restrictions` are set, `defaultAddress` should ideally satisfy restrictions; the spec can require that invalid defaults are ignored or that the form still opens with defaults but submit is validated. Design choice: allow invalid defaults (e.g. default country AU but user changes to US); validation on submit catches it.

## Migration Plan

- No breaking changes. Add new optional props and types; existing usage is unchanged.
- Deploy: release as minor (or patch per semver policy). Document new props and types in README/Storybook.
- Rollback: remove new props from usage; no data migration.

## Open Questions

- None for initial implementation. Optional follow-ups: custom restriction error message prop, or extending the provider interface to accept restrictions for server-side filtering.
