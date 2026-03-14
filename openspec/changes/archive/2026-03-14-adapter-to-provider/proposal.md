# Adapter → Provider rename

## Why

The library currently uses the term "adapter" for the pluggable services that supply address lookup (suggestions + details) and address formatting. "Adapter" suggests translating between two existing interfaces; here these objects are the primary source of behavior (lookup or formatting). "Provider" better describes that role and aligns with common React/ecosystem usage (e.g. context providers, data providers). Renaming now keeps the public API clear and consistent before wider adoption.

## What Changes

- **Lookup**: Rename `AddressLookupAdapter` → `AddressLookupProvider`; component prop `adapter` → `provider`. Rename `GooglePlacesAdapter` → `GooglePlacesProvider` and move/rename `adapters/GooglePlacesAdapter.ts` to `providers/GooglePlacesProvider.ts`. Update all references, tests, and Storybook.
- **Format**: Rename `AddressFormatAdapter` → `AddressFormatProvider` in formatters (types, `international`, `australian`, exports). Component prop remains `format` (value type becomes `AddressFormatProvider`).
- **Copy and docs**: User-facing and JSDoc text that says "adapter" (e.g. "adapter must be configured", "Lookup adapter") → "provider". Storybook docs and story names updated.
- **BREAKING**: All of the above are breaking for anyone using the current types, props, or class names. This should be released as a major version or clearly called out as breaking.

## Capabilities

### New Capabilities

None. This is a naming/terminology change only.

### Modified Capabilities

- `lookup-adapter`: Requirements unchanged; spec and types rename to provider (interface `AddressLookupProvider`, prop `provider`).
- `address-format-adapter`: Requirements unchanged; spec and types rename to provider (`AddressFormatProvider`).
- `google-places-adapter`: Requirements unchanged; spec and implementation rename to `GooglePlacesProvider` and `providers/GooglePlacesProvider`.
- `address-autocomplete`: Component API and docs use `provider` instead of `adapter`; behavior unchanged.
- `documentation`: Storybook and any docs use "provider" terminology throughout.

## Impact

- **Public API**: All exports and prop names that currently use "adapter" (types, `GooglePlacesAdapter`, `adapter` prop, `AddressFormatAdapter`) will use "provider" equivalents. Tree-shaking and TypeScript usage remain the same; call sites must switch prop and type names.
- **Compatibility**: Breaking change; no compatibility layer planned (clean rename). Mantine version support unchanged.
- **Tests and Storybook**: Full pass to rename identifiers, props, and copy; no behavior changes.

## Non-goals

- Adding new provider implementations or new formatting behavior.
- Changing autocomplete or formatting semantics; only naming and file/organization (adapters → providers) change.
- Changing test or Storybook coverage scope beyond what’s needed for the rename.
