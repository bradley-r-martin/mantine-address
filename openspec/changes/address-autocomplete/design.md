## Context

The library currently exports a basic address text field. Consumers building real forms need real-time address suggestions backed by a geocoding/places API. Rather than coupling the component to a single provider, we model lookup as an adapter — the component stays provider-agnostic and ships with a first-party Google Places adapter.

The library is TypeScript-strict, React + Mantine, published as an npm package. It must tree-shake cleanly and follow Mantine prop/theming conventions.

Three UX gaps remain in the initial design: there is no loading feedback during async suggestion fetches, no visual cue when a search returns zero results, and no way to highlight the portion of a suggestion that matched the user's input.

## Goals / Non-Goals

**Goals:**

- A `AddressAutocomplete` component that wires a lookup adapter to Mantine's `Autocomplete` and returns structured address data on selection.
- A typed `AddressLookupAdapter` interface that can be implemented by any lookup service.
- A `GooglePlacesAdapter` class implementing `AddressLookupAdapter` against the Google Places Autocomplete + Place Details APIs.
- Full TypeScript types exported from the package root.
- Unit/integration tests using a mock adapter (no live API calls in CI).
- Storybook stories for development and documentation.
- Loading indicator displayed in the input while `getSuggestions` is in flight.
- Matched substring highlighting in dropdown suggestions when the adapter supplies offset data.
- A "no results" message displayed in the dropdown when the adapter returns an empty array for a non-empty query.

**Non-Goals:**

- Additional adapters beyond Google Places in this change.
- SSR / Next.js App Router support for the Google SDK (browser-only).
- Geocoding or reverse-geocoding endpoints.
- Caching or deduplication of adapter calls (left to consumers or future enhancement).
- Virtualized or paginated suggestion lists.

## Decisions

### 1. Adapter interface: `getSuggestions` + `getDetails` split

**Decision**: The `AddressLookupAdapter` exposes two async methods:

- `getSuggestions(input: string): Promise<AddressSuggestion[]>` — returns lightweight autocomplete items (label + opaque `id`).
- `getDetails(id: string): Promise<AddressDetails>` — fetches full structured address for the selected suggestion.

**Alternatives considered**:

- _Single `lookup(input)` returning full details per keystroke_ — too expensive (Places Details API charges per call vs free Autocomplete); rejected.
- _Returning full details inside `getSuggestions`_ — impossible for most APIs that separate the two calls; rejected.

**Rationale**: Matches how virtually every geocoding API (Google, Mapbox, HERE) is designed. Keeps adapter costs low during typing.

---

### 2. Component API: adapter as required prop, Mantine `Autocomplete` under the hood

**Decision**: `AddressAutocomplete` accepts an `adapter` prop (`AddressLookupAdapter`) and an `onAddressSelect` callback (`(address: AddressDetails) => void`), plus all standard Mantine `Autocomplete` props via spread/omit.

```ts
interface AddressAutocompleteProps extends Omit<
  AutocompleteProps,
  'data' | 'onChange'
> {
  adapter: AddressLookupAdapter;
  onAddressSelect?: (address: AddressDetails) => void;
  onChange?: (value: string) => void;
}
```

**Alternatives considered**:

- _Embedding the adapter via React Context_ — less explicit, makes unit testing harder; rejected.
- _Exposing raw `data` prop from outside_ — defeats the purpose of the component; rejected.

**Rationale**: Explicit prop injection is idiomatic, easy to test, and keeps consumers in control of adapter instantiation (e.g. memoizing with `useMemo`).

---

### 3. Google Places Adapter: plain class, no React dependency

**Decision**: `GooglePlacesAdapter` is a plain TypeScript class (not a hook/component) that reads `window.google.maps` at call time. The consumer is responsible for loading the Google Maps script.

**Alternatives considered**:

- _Bundling `@googlemaps/js-api-loader`_ — adds a runtime dependency and bundle weight; rejected in favor of keeping the adapter thin.
- _React hook wrapping the adapter_ — unnecessary coupling; consumers can wrap it themselves.

**Rationale**: Minimizes bundle impact. The Google Maps script is almost always loaded globally in consuming apps.

---

### 4. Debouncing: consumer-controlled, component provides a `debounce` prop

**Decision**: The component accepts an optional `debounce` prop (ms, default `300`) and handles debouncing internally via `useRef` + `setTimeout` before calling `adapter.getSuggestions`.

**Rationale**: Prevents every keystroke from triggering a network request without forcing consumers to wire up their own debounce logic.

---

### 5. Loading indicator: internal `isLoading` state + Mantine `Loader` in `rightSection`

**Decision**: The component tracks an `isLoading: boolean` state that is set to `true` immediately before calling `adapter.getSuggestions` and back to `false` when the promise settles (resolves or rejects). A Mantine `<Loader size="xs" />` is rendered in the `rightSection` of the `Autocomplete` when `isLoading` is `true`. The consumer's `rightSection` prop takes precedence when explicitly provided.

**Alternatives considered**:

- _`disabled` input while loading_ — blocks typing mid-flight; poor UX for fast connections; rejected.
- _Overlay spinner_ — disproportionate for a single input field; rejected.
- _Custom `rightSectionLoading` prop_ — unnecessary API surface; Mantine's existing `rightSection` + internal state covers the need.

**Rationale**: `rightSection` is the Mantine-idiomatic location for input affordances. Using `Loader` from `@mantine/core` keeps the visual language consistent with the consuming app's Mantine theme.

---

### 6. Matched substring highlighting: optional field on `AddressSuggestion`, custom `renderOption`

**Decision**: `AddressSuggestion` gains an optional field:

```ts
interface AddressSuggestion {
  id: string;
  label: string;
  matchedSubstrings?: Array<{ offset: number; length: number }>;
}
```

When `matchedSubstrings` is present, the component uses a `renderOption` function that splits the label string at the provided offsets, wraps matched segments in a `<mark>` element (bold, transparent background, inherited color), and wraps the entire result in a `<span>`. When `matchedSubstrings` is absent the label is returned as a plain string, preserving backwards compatibility.

**Implementation note — `<span>` wrapper is required**: Mantine's `Combobox.Option` uses a flex container internally. Returning a bare React Fragment from `renderOption` causes each text node and `<mark>` element to become a separate flex item, producing visible gaps between segments. Wrapping all parts in a single `<span>` makes the label a single flex item so text and marks flow as natural inline content.

`GooglePlacesAdapter.getSuggestions` maps `prediction.matched_substrings` from the Places API response to the `matchedSubstrings` field.

**Alternatives considered**:

- _Mantine `<Highlight>` component_ — takes a `highlight` string, not byte offsets; would require reconstructing the query string and risks mismatches with multi-word queries; rejected.
- _Fuzzy-highlight on the client_ — duplicates what the API already provides; introduces risk of diverging from the server-authoritative match; rejected.
- _Always-on custom `renderOption`_ — acceptable, but splitting on an empty array wastes cycles; the component short-circuits to a plain string render when `matchedSubstrings` is absent.

**Rationale**: APIs like Google Places already return precise match offsets. Using them directly is reliable and zero-cost at the adapter layer.

---

### 7. No-results message: disabled sentinel item in `data`

**Decision**: Mantine v7's `Autocomplete` does NOT expose a `nothingFoundMessage` prop (it is only available on `Select`/`MultiSelect`). Additionally, `OptionsDropdown` is rendered with `hiddenWhenEmpty: true` hardcoded, so the dropdown collapses when `data` is empty — making it impossible to inject a message inside the dropdown that way.

The implemented approach: when `suggestions` is empty AND `isLoading` is `false` AND the input is non-empty, a single disabled sentinel item `{ value: '__mantine-address-no-results__', disabled: true }` is added to `data`. This keeps the dropdown open (one item present → `hiddenWhenEmpty` does not hide it). The `renderOption` function detects the sentinel value and renders the `nothingFoundMessage` text styled as a dimmed, non-interactive label. `disabled: true` ensures Mantine suppresses hover highlighting, pointer cursor, and keyboard navigation through the item. `handleOptionSubmit` also guards against the sentinel value as a secondary safety measure.

The message is not rendered at all when `isLoading` is `true` or when the input is empty — in both cases `data` is the raw suggestions array (or empty), so no sentinel is injected.

**Alternatives considered**:

- _Mantine `nothingFoundMessage` prop on `Autocomplete`_ — investigated; not supported in this component in Mantine v7 (the prop is passed through as an HTML attribute to the underlying `<input>`); rejected.
- _Separate DOM element below the input_ — would render outside the dropdown and require absolute positioning to mimic dropdown appearance; rejected for being visually inconsistent.
- _Rebuilding the dropdown with `Combobox` primitives_ — would give full control but re-implements what `Autocomplete` already provides; rejected for complexity.

**Rationale**: The sentinel item approach requires no extra DOM outside the component, renders consistently inside the existing dropdown, and is testable in jsdom because it adds a real DOM node (not CSS-only visibility).

## Risks / Trade-offs

- **Google Maps script not loaded** → `GooglePlacesAdapter` will throw at runtime if `window.google` is absent. Mitigation: adapter validates on first call and throws a clear error message; documented in README and Storybook.
- **API key exposure** → The Google API key is passed to the adapter by the consumer; key restriction (HTTP referrers) is the consumer's responsibility. Mitigation: documented in README.
- **Mantine `Autocomplete` API drift** → Future Mantine major versions may change `AutocompleteProps`. Mitigation: peer dependency range is pinned to a major version; component wraps `Autocomplete` in a single file for easy updates.
- **`onItemSubmit` vs `onOptionSubmit`** → Mantine v7 renamed the selection callback. Mitigation: target Mantine v7+ in peer deps and use `onOptionSubmit`.
- **Race conditions on fast typing** → Debounce reduces frequency but does not cancel in-flight requests. A response from a stale query could overwrite newer suggestions. Mitigation: track a request sequence counter; only apply results if the counter still matches at resolution time.
- **`matchedSubstrings` offset encoding** → Google Places returns byte offsets in the UTF-16 encoded label string. For non-ASCII labels this could produce incorrect splits if handled naively. Mitigation: use array index slicing (`label.slice`) on the JavaScript string directly, which matches UTF-16 offsets as returned by the API.
