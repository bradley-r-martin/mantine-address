## Context

`AddressInput` already supports optional default values for the manual-entry form via `defaultAddress?: Partial<Address>`. When the user opens the manual modal, `openManualModal` reads `defaultAddress` and sets each form state (e.g. `manualFormCountry`, `manualFormState`) from the corresponding string values. The `Address` type and thus `Partial<Address>` use `country?: string` and `state?: string` only. The `accept` prop, by contrast, accepts `AcceptAddress` with `country?: string | Country` and `region?: string | Region`, so providers and consumers can use shared constants. This change adds a `prefill` prop with a similar shape for manual-form defaults, so that prefilling can use `Country` and `Region` objects without breaking existing `defaultAddress` usage.

## Goals / Non-Goals

**Goals:**

- Add an optional `prefill` prop that allows all manual fields to be prefilled, with `country` and `state` accepting `string | Country` and `string | Region` respectively.
- Resolve `Country`/`Region` to the codes (and optionally display) used by the manual form when opening the modal, so that e.g. `prefill={{ state: REGIONS.NEW_SOUTH_WALES }}` results in the State field showing NSW.
- Define clear precedence when both `prefill` and `defaultAddress` are provided (prefill overrides for overlapping keys).
- Add a Storybook story group **Prefill** under AddressInput that demonstrates the prop using constants.

**Non-Goals:**

- Removing or deprecating `defaultAddress`; both props remain supported.
- Changing the `Address` type or the shape of data passed to `onChange` (still `Address` with string fields).
- Adding new dependencies or changing Mantine version support.

## Decisions

### 1. New prop name: `prefill`

- **Choice:** Add a new prop `prefill` rather than overloading `defaultAddress` with a union type.
- **Rationale:** Keeps `defaultAddress` as a simple `Partial<Address>` for consumers who only need strings; avoids a breaking or confusing union on an existing prop. The name `prefill` signals “fill the form in advance” and aligns with the preference for constant-based usage in docs and stories.

### 2. Type shape for `prefill`

- **Choice:** A type equivalent to `Partial<Address>` but with `country?: string | Country` and `state?: string | Region` (other fields remain `string` as in `Address`). No new exported type is required unless we want reuse; the prop can be inlined as `prefill?: PrefillAddress` where `PrefillAddress` is an internal or exported type with the above shape.
- **Rationale:** Matches the `accept` pattern and allows `prefill={{ country: COUNTRIES.AU, state: REGIONS.NEW_SOUTH_WALES }}`. Strings remain valid for backward compatibility and simple cases.
- **Alternative considered:** Extend `Partial<Address>` with optional `countryCode`/`regionCode` or a separate “hint” object; rejected to keep a single, flat prefill object.

### 3. Resolution of `Country` and `Region` when opening the modal

- **Choice:** When opening the manual modal, compute effective defaults by merging `defaultAddress` and `prefill` (with `prefill` winning for overlapping keys). For each key, if the value is a `Country` object use `country.code`; if it is a `Region` object use `region.abbreviation`; otherwise use the string as today. Use the resolved values to set the existing manual form state (e.g. `manualFormCountry`, `manualFormState`).
- **Rationale:** The form already works with country code and state abbreviation; resolving once at modal open keeps the rest of the component unchanged and avoids storing objects in form state.

### 4. Precedence when both `prefill` and `defaultAddress` are set

- **Choice:** For each field, use the value from `prefill` if present, otherwise use the value from `defaultAddress`. So `prefill` overrides `defaultAddress` on a per-field basis.
- **Rationale:** Predictable and allows layering (e.g. `defaultAddress` for street, `prefill` for country/region) or full override with `prefill`.

### 5. Storybook: Prefill group under AddressInput

- **Choice:** Add a new story file (e.g. `AddressInput/Prefill.stories.tsx`) and a **Prefill** group under AddressInput. Stories SHALL use constant-based examples (e.g. `prefill={{ country: COUNTRIES.AU, state: REGIONS.NEW_SOUTH_WALES }}`) and document partial prefill (e.g. only country, or only region when country is fixed).
- **Rationale:** Matches the existing structure (Overview, ManualEntry, Restrictions, Form) and makes the preferred API (constants) visible in the docs.

## Risks / Trade-offs

- **Duplicate semantics with defaultAddress:** Two props that both prefill the form can confuse. Mitigation: Document clearly that `prefill` is preferred for new code when using constants; `defaultAddress` remains for string-only or legacy usage; precedence is defined so behavior is deterministic when both are set.
- **No runtime validation of Region/Country:** Passing an invalid or mismatched object (e.g. region from one country with another country code) is not validated. Mitigation: Same as `accept` today; document that consumers should use the library’s exported constants or ensure consistency.

## Migration Plan

- Additive only: no migration for existing consumers. New prop is optional. No rollback beyond reverting the change.

## Open Questions

- None. Optional: whether to export a `PrefillAddress` type for consumers who want to build prefill objects in code; can be done in this change or a follow-up.
