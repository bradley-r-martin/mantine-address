# Form support — Design

## Context

The library exposes `AddressAutocomplete`, which already supports controlled (`value`/`onChange`) and uncontrolled (`defaultValue`) usage. It does not currently participate in native form submission (no hidden inputs), and there is no documented storybook or pattern for Mantine form integration or form reset/clear. Consumers need to use the component inside `@mantine/form` and inside plain HTML forms without extra glue code.

Constraints: single primary component, no new runtime dependencies, Mantine patterns, TypeScript strict, tree-shaking. The canonical `Address` type has many optional string/number fields (e.g. `suburb`, `state`, `postcode`); hidden inputs must map this shape to a stable, predictable naming scheme for form serialization.

## Goals / Non-Goals

**Goals:**

- Support both controlled and uncontrolled usage with clear storybook coverage.
- Support Mantine form (`useForm`) with correct reset/clear behavior so the address field clears when the form is reset or cleared.
- Support native HTML forms by rendering hidden inputs so `FormData` / form submit includes `{name}[field]` for each address field (e.g. `address[suburb]`, `address[postcode]`).
- Add an optional `name` prop to drive hidden input names; when absent, no hidden inputs are rendered (backward compatible).

**Non-Goals:**

- A separate "AddressFormField" or wrapper component; extend the existing component only.
- Custom serialization format (e.g. JSON in one input); use standard bracket notation for compatibility with server frameworks.
- E2E tests for Storybook; unit/integration tests only for the new behavior.

## Decisions

### 1. Hidden inputs: when and what to render

- **Decision**: When `name` is set, render one hidden `<input type="hidden">` per defined `Address` field that has a value (string or number). Use the bracket form `name[field]` (e.g. `address[suburb]`, `address[postcode]`). Omit fields that are undefined or null.
- **Rationale**: Native forms and `FormData` expect flat key-value pairs; bracket notation is widely supported and maps naturally to nested objects on the server. Only rendering fields with values keeps payloads small and avoids sending empty strings for every key.
- **Alternatives**: Single hidden input with JSON — rejected because it is not standard form encoding and complicates server-side handling. Rendering all keys with empty string — rejected to avoid noise and potential overwrites.

### 2. Which Address fields get hidden inputs

- **Decision**: Include all scalar fields from the canonical `Address` type that are serializable as form values: string fields (e.g. `place_id`, `building_name`, `level`, `unit`, `lot_no`, `street_number`, `street_name`, `street_type`, `street_suffix`, `suburb`, `state`, `postcode`, `country`) and numeric fields (`latitude`, `longitude`) serialized as string (e.g. `String(addr.latitude)`). Use the same keys as the `Address` interface so server-side code can map `formData.get('address[suburb]')` etc. to a single object.
- **Rationale**: Keeps one-to-one mapping with the public type and avoids custom mapping configuration.

### 3. Placement of hidden inputs and accessibility

- **Decision**: Render the hidden inputs inside the same wrapper as the visible Autocomplete (e.g. a fragment or a small wrapper div that does not affect layout). Do not place them inside the Autocomplete’s `<input>` to avoid invalid HTML. Ensure they are associated with the same form as the visible input (they will be when the component is used inside a `<form>`).
- **Rationale**: No layout or visual change; screen readers and form logic see them as normal form controls.

### 4. Form reset and clear behavior

- **Decision**: Rely on React state and props. When the component is controlled, the parent (e.g. Mantine form state) sets `value` to `null`/empty on reset — the component already clears display when `value` is null. When uncontrolled, the component does not receive a native form reset event directly; support reset by (a) exposing an imperative ref method (e.g. `clear()` or `reset()`) that clears internal state and typed input, and/or (b) documenting that for native `form.reset()`, the component may need to be controlled or re-mounted. Prefer (a) so a parent can call `ref.current.reset()` after `form.reset()` for consistency.
- **Rationale**: Mantine form reset already sets field values to initial; if the address field is wired to that state (controlled), it will clear. For native forms, `form.reset()` only resets native inputs; our visible input is controlled by React state, so an imperative clear keeps behavior consistent. Ref-based clear is a common Mantine/React pattern.

### 5. Storybook structure

- **Decision**: Add stories: (1) Controlled — state in parent, show value and clear button; (2) Uncontrolled — `defaultValue` only; (3) Mantine form — `useForm` with address field and Reset/Clear buttons; (4) Native form — form with `name`, submit button, and display of `FormData` or submitted values to show hidden inputs. Use the existing mock adapter in non-Google stories.
- **Rationale**: Covers all usage modes and makes form support discoverable without changing the existing story layout drastically.

## Risks / Trade-offs

- **Hidden inputs and SSR/hydration**: Hidden inputs are derived from `address` in state; ensure they render the same on server and client when used in SSR (e.g. same order and same set of keys). Mitigation: Render in a deterministic order (e.g. by key name) and only from current `address`; no random or timestamp-based keys.

- **Ref API surface**: Adding `reset()` or `clear()` on the ref extends the public API. Mitigation: Document clearly; keep the ref forward to the underlying input for focus etc., and add only the minimal method needed for reset behavior.

- **Mantine form reset**: If the consumer does not map the address field to form state (e.g. uses uncontrolled address with other Mantine form fields), reset won’t clear the address. Mitigation: Document that for Mantine form reset to clear the address, the address field must be controlled by the form’s values (e.g. `value={form.values.address}` / `onChange={(v) => form.setFieldValue('address', v)}`).

## Migration Plan

- No breaking changes: `name` is optional; when omitted, behavior is unchanged.
- Release as minor (or patch if we treat this as a backward-compatible enhancement). Changelog entry for new `name` prop and form reset behavior; README update for form usage and storybook links.
- No rollback beyond reverting the release; no data migration.

## Open Questions

- Whether to support a custom list of keys for hidden inputs (e.g. only `suburb`, `postcode`, `country`) for smaller payloads — start with all scalar Address fields and add later if needed.
- Exact ref method name: `reset()` vs `clear()` — prefer `reset()` to align with form semantics.
