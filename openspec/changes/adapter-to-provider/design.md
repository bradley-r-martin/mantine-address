## Context

The library uses "adapter" for (1) the lookup contract and implementation (`AddressLookupAdapter`, `GooglePlacesAdapter`, `adapter` prop) and (2) the format contract (`AddressFormatAdapter`). The codebase, tests, and Storybook consistently use this terminology. The proposal replaces it with "provider" for clarity and ecosystem alignment. This is a cross-cutting rename across types, props, file paths, and copy with no behavior change.

## Goals / Non-Goals

**Goals:**

- Rename all public and internal "adapter" identifiers to "provider" (lookup and format).
- Move `src/adapters/` to `src/providers/` and rename the Google implementation class and file.
- Update user-facing and JSDoc copy (e.g. "adapter must be configured" → "provider must be configured").
- Keep behavior and semantics unchanged; only names and structure.

**Non-Goals:**

- No deprecation period or backward-compatibility layer (clean breaking change).
- No new provider implementations or format behavior.
- No changes to Mantine integration or component behavior beyond prop/type names.

## Decisions

1. **Single breaking release (no compatibility shim)**  
   We could export deprecated aliases (e.g. `AddressLookupAdapter = AddressLookupProvider`) for a release. Decision: do not. A single clean rename keeps the API surface clear and avoids maintaining two names. Consumers must update to the new names in one go.  
   _Alternative considered:_ Deprecation aliases for one minor release then remove in next major. Rejected to avoid extra maintenance and confusion.

2. **Directory: `adapters/` → `providers/`**  
   Rename the folder so the codebase matches the new terminology and future lookup implementations live under `providers/` (e.g. `GooglePlacesProvider.ts`).  
   _Alternative considered:_ Keep folder name `adapters/` and only rename types/classes. Rejected for consistency.

3. **Prop name: `adapter` → `provider`**  
   The main component prop that receives the lookup implementation is renamed from `adapter` to `provider`. The optional formatter prop stays `format`; only its type name changes to `AddressFormatProvider`.  
   _Alternative considered:_ Keep prop name `adapter` and only rename types. Rejected so that component API and types are aligned.

4. **Error and docs copy**  
   All user-visible and JSDoc strings that mention "adapter" are updated to "provider" (e.g. "Address autocomplete requires a provider to be configured"). Storybook story names and descriptions are updated similarly.

## Risks / Trade-offs

- **[Breaking change]** Consumers must update imports, types, and prop names.  
  _Mitigation:_ Release as a major version (e.g. 2.0.0) and document the renames in CHANGELOG/README with a short migration list.

- **[Rename oversights]** Some comment or string might still say "adapter".  
  _Mitigation:_ Grep the repo for "adapter" / "Adapter" after implementation and fix any remaining references; tests and Storybook runs confirm no regressions.

- **[External references]** Third-party docs or tutorials may reference old names.  
  _Mitigation:_ Document the rename clearly in the release notes; no code compatibility layer.

## Migration Plan

1. Implement renames and move in a feature branch (e.g. `adapter-to-provider`).
2. Run full test suite and Storybook; fix any remaining "adapter" references.
3. Merge to integration branch; release as new major version with CHANGELOG entry listing:
   - `AddressLookupAdapter` → `AddressLookupProvider`
   - `AddressFormatAdapter` → `AddressFormatProvider`
   - `GooglePlacesAdapter` → `GooglePlacesProvider` (and `adapters/` → `providers/`)
   - `adapter` prop → `provider` prop
   - Copy and docs: "adapter" → "provider"
4. No rollback beyond reverting the release; no runtime compatibility layer to remove.

## Open Questions

None. Scope is limited to renames and copy; no open technical decisions.
