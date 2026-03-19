## Context

The library currently ships a canonical `COUNTRIES` map that embeds country identity (code/name) and, for configured countries, region/state data on the same object (e.g. `AUSTRALIA.NEW_SOUTH_WALES`). The manual-entry UX uses this canonical map to populate the Country select and to switch the State control between a select (when a configured list exists) vs a text input (when it does not).

As the number of configured countries grows (and as we add additional datasets like postcodes and suburbs), the eager `COUNTRIES` aggregate becomes a bundle-size liability for consumers. We need a design that keeps a simple default experience but makes heavy datasets load on demand and keeps consumers in control.

Constraints / expectations:

- The component is a Mantine-first library component; consumer control should be preserved (bring-your-own data).
- The library is ESM; consumers may use Vite/Rollup/webpack/Next. Chunking behavior should be compatible with common bundlers.
- Existing restrictions/prefill ergonomics should continue to work with string codes (e.g. `accept={{ country: 'AU', region: 'NSW' }}`), without forcing async behavior for validation.

## Goals / Non-Goals

**Goals:**

- Provide an `AddressInput` `data` prop that supplies:
  - a small, synchronous `countries` catalog for the Country select
  - optional lazy dataset resolvers (`regions` now; extensible to `postcodes`/`suburbs` later)
- Ship a built-in default `data` implementation that loads per-country datasets via dynamic `import()` so unused datasets are not bundled and can be split into separate chunks.
- Preserve current UX:
  - Country remains a select populated from the canonical catalog.
  - State remains a select when a region list exists, else a text input.
  - When the region list is lazy, the UI shows a loading state while resolving it.
- Keep restrictions/prefill synchronous and stable (string codes remain the canonical input for `accept`/`prefill`).

**Non-Goals:**

- No attempt to guarantee chunking in every consumer environment; the design enables chunking, but the bundler ultimately decides output.
- No expansion of datasets (coverage) beyond existing AU/US regions as part of this change.
- No changes to lookup provider APIs.

## Decisions

### Decision: Introduce a noun-based `data` object (sync catalog + async resolvers)

We will model the data API as a single object with:

- `countries: readonly { code; name; … }[]` (synchronous; small)
- optional dataset resolvers as functions returning promises:
  - `regions?: (countryCode) => Promise<RegionsDataset | undefined>`
  - reserved for later: `postcodes?`, `suburbs?`

Rationale:

- Matches the desired “no get/load prefixes” style while still encoding sync vs async by shape (array vs promise-returning function).
- Encourages consumers to treat the country catalog as always-available UI data, while datasets are fetched only when needed.
- Keeps `accept`/`prefill` ergonomics independent from dataset availability.

Alternatives considered:

- **Put lazy import functions directly into `accept`/`prefill`**: makes restrictions validation async and complicates types; rejected.
- **Expose only subpath exports and rely on tree-shaking**: still encourages eager aggregate imports in default UX; does not address “load as user needs it” requirements as well as dynamic imports.

### Decision: Default built-in resolver uses per-country dynamic imports

We will ship a default `data` implementation (used when `data` prop is not provided) that:

- exposes the canonical `countries` list synchronously
- provides `regions(code)` implemented via a minimal registry of dynamic imports, e.g. `AU` and `US`
- returns `undefined` for countries without configured datasets

Rationale:

- Avoids importing all country datasets in the root module.
- Creates natural chunk boundaries per dataset module.
- Keeps consumer usage “batteries included” without extra setup.

### Decision: Evolve away from eager `COUNTRIES` aggregates in the core component path

The component and utilities that are used by the component should not import an eager `COUNTRIES` map that references every configured dataset. The countries catalog (code/name) may remain eager (it is relatively small), but heavy datasets must be behind dynamic imports or BYO resolvers.

Rationale:

- If the component imports a global `COUNTRIES` object that embeds region data, consumers effectively pay for all configured datasets whenever they use the component.

### Decision: Keep restrictions and prefill based on codes (not dataset objects)

Restrictions (`accept`) and prefill should continue to accept string codes (and may continue to accept existing object shapes for backwards compatibility), but the internal correctness checks should not require the region dataset to be present. Validation is based on normalised code comparisons.

Rationale:

- Prevents async from leaking into validation paths.
- Keeps server-side rendering and non-chunking environments functional.

## Risks / Trade-offs

- **[Async state list introduces UI loading state]** → Mitigation: show a loader/disabled control while resolving; cache resolved datasets per country code in-memory for the component session.
- **[Bundlers may inline dynamic imports]** → Mitigation: keep modules small and import-path stable; document that code-splitting depends on consumer bundler configuration.
- **[Breaking change risk for `COUNTRIES` consumers]** → Mitigation: provide a compatibility export or deprecation period; ensure `AddressInput` no longer requires `COUNTRIES`.
- **[Type complexity]** → Mitigation: keep `data` API minimal; reserve future dataset types behind `unknown` until their shapes are specified.
