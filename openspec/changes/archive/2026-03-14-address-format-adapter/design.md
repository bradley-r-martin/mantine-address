## Context

The library exposes `AddressInput`, which uses an `AddressLookupAdapter` for suggestions and details. Display of the selected address is currently controlled by an optional `region?: AddressRegion` prop (`AddressRegion = 'AU'`). Formatting is implemented in `formatAddress.ts` via `formatAddressForRegion(address, region)`, which switches on the region string; only `'AU'` has special handling; otherwise `addressToString(address)` is used. The uniform `Address` type is region-agnostic. The proposal replaces the `region` string with an optional **formatter** adapter (object with `format(address): string`), provides a default **international** formatter, and ships an **Australian** formatter so display convention is pluggable and display-only (no validation or restriction of address source).

## Goals / Non-Goals

**Goals:**

- Define an `AddressFormatAdapter` interface and use it as the single way the component turns `Address` into a display string.
- Default to a built-in international formatter when `formatter` is omitted, so the component always has an explicit formatter.
- Ship a built-in Australian formatter that preserves current AU display behaviour (state as code, commas, etc.).
- Remove the `region` prop and `AddressRegion` type from the component API; keep display semantics display-only (no filtering or validation by country).

**Non-Goals:**

- Adding more built-in formatters (e.g. UK, US) in this change.
- Changing `AddressLookupAdapter` or the canonical `Address` type.
- Validating or restricting addresses by country based on the formatter.

## Decisions

### 1. Interface name and shape: `AddressFormatAdapter` with `format(address: Address): string`

**Chosen:** A single method `format(address: Address): string`. Interface name `AddressFormatAdapter` to align with `AddressLookupAdapter` and make the adapter pattern obvious.

**Alternatives considered:** `AddressFormatter` (shorter but "Formatter" is often a class; we use "Adapter" for the lookup contract). Adding optional methods (e.g. `formatToLines`) was deferred; a single string is enough for the input display and keeps the contract minimal.

### 2. Prop name: `formatter`

**Chosen:** Optional prop `formatter?: AddressFormatAdapter`. When absent, the component uses the default international formatter internally (no need for consumers to pass it).

**Alternatives considered:** `format` (risk of clashing with other "format" meanings), `addressFormat` (verbose), `displayFormat` (explicit but long). `formatter` matches "the object that formats" and mirrors the role of `adapter` for lookup.

### 3. Where the default formatter lives

**Chosen:** A shared default instance (e.g. `internationalAddressFormat`) exported from the formatting module. The component resolves `formatter ?? internationalAddressFormat` once per render (or in defaultProps) and always calls `formatter.format(address)` for display. No branch for "no formatter."

**Alternatives considered:** Inline default implementation inside the component would duplicate logic and make the default harder to reuse or test in isolation.

### 4. International formatter behaviour

**Chosen:** Implement the default formatter to produce the same single-line output as current `addressToString(address)`: street line (unit, building, level, lot, street number, name, type, suffix), then locality (suburb, state, postcode, country), with `, ` between major parts and spaces within parts. Document this as the "international" convention. No code change to the output format for the default case beyond routing through the adapter.

**Alternatives considered:** Defining a new international standard (e.g. different order or separators) would change current behaviour for users who today rely on "no region"; reusing `addressToString` keeps behaviour and gives a clear default.

### 5. Australian formatter implementation

**Chosen:** Implement the Australian adapter by moving the current `region === 'AU'` branch from `formatAddressForRegion` into a dedicated adapter that uses existing helpers (e.g. `formatAustralianState` from `regions/australian-address.ts`). The adapter is a thin wrapper: same order and commas as today, state formatted via `formatAustralianState`. No change to the visible Australian output.

**Alternatives considered:** Rewriting AU formatting inside the adapter would duplicate logic; reusing existing helpers keeps one source of truth and avoids regressions.

### 6. Deprecation of `region` and `formatAddressForRegion`

**Chosen:** Remove `region` and `AddressRegion` from the component’s public API in this change. Optionally export `formatAddressForRegion` and `AddressRegion` as deprecated (e.g. JSDoc `@deprecated` and a comment pointing to the formatter) for one major version, then remove in a later major. Decision can be made during implementation based on semver and changelog.

**Alternatives considered:** Keeping `region` and mapping it internally to a formatter would preserve API but perpetuate the wrong mental model and two code paths; removing and optionally deprecating the old function is clearer.

### 7. Type and export layout

**Chosen:** Export from the main entry: `AddressFormatAdapter` type; `internationalAddressFormat` (default formatter instance); `australianAddressFormat` (or named constant for the Australian instance). Component imports the default from the same formatting module that defines the interface and implementations. No new package entry points.

## Risks / Trade-offs

- **Risk:** Consumers who relied on `region="AU"` must switch to `formatter={australianAddressFormat}`. **Mitigation:** Document in README and changelog; provide a short migration snippet; optional deprecation period for `formatAddressForRegion` if we keep it.
- **Risk:** Naming confusion between "formatter" (display) and "adapter" (lookup). **Mitigation:** README and JSDoc state clearly that the formatter only affects how the selected address is displayed, not which addresses can be selected.
- **Trade-off:** We do not add more built-in formatters (UK, US, etc.) in this change; the adapter pattern makes them easy to add later without further API churn.

## Migration Plan

1. Implement `AddressFormatAdapter`, `internationalAddressFormat`, and `australianAddressFormat`; refactor display path in `AddressInput` to use `formatter ?? internationalAddressFormat` and `formatter.format(address)`.
2. Remove `region` from `AddressInputProps` and all usages (stories, tests, README). Replace with `formatter={australianAddressFormat}` where AU formatting was used.
3. Deprecate or remove `formatAddressForRegion` and `AddressRegion` per decision above; update exports and docs.
4. Changelog: breaking change for `region` removal; migration note and example for `formatter`.
5. No rollback beyond reverting the change; no runtime feature flags.

## Open Questions

- None for implementation. Optional: whether to keep `formatAddressForRegion` / `AddressRegion` as deprecated exports for one major version (to be decided at implementation time).
