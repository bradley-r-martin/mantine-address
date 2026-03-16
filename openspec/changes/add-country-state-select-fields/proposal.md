## Why

Manual address entry currently uses plain text inputs for Country and State/Province. Users benefit from structured selection (dropdowns) for these fields to reduce typos, standardize values, and improve UX. Storing every country’s subdivisions would be heavy and hard to maintain, so we start with a full country list plus Australian and US states only, with a pattern that makes adding more countries straightforward. For countries without a configured state list, the state field remains a plain text input so all countries stay usable.

## What Changes

- **Country select**: The manual-entry form SHALL use a **select** for Country, populated from a canonical list of all countries (e.g. ISO 3166-1 names or codes).
- **State select or text**: The manual-entry form SHALL use a **select** for State when the selected country has a configured list of states/territories (initially Australia and United States). For any other country, the State field SHALL be a **plain text input** so users can still enter a state/province/region.
- **Data layout**: Countries list and per-country state lists (AU, US) SHALL live in dedicated data files under the library, in a structure similar to `src/formatters/` (one module or file per “region” or dataset), so other countries can be added later without changing component structure.
- **Public API**: New exports for region data (e.g. countries list, getStatesForCountry or similar) so consumers can reuse or extend if needed. No new required props on `AddressInput`; behavior is internal to the manual form. Compatibility with current Mantine versions is unchanged.

**Non-goals**: We are not adding a new required prop for “allowed countries” or “state source” in this change; the built-in lists are used by default. Comprehensive i18n of country/state labels is out of scope (can be a follow-up). Testing and Storybook will cover the new behavior (country select, state select vs text, and at least one story demonstrating a country without states).

## Capabilities

### New Capabilities

- `country-state-regions`: Defines the data and API for the list of countries and optional states per country. Includes file/module layout (similar to formatters), initial datasets (all countries, Australian states, US states), and a way to look up “states for country” so the manual form can choose select vs text. May export types and accessors for use by the component and optionally by consumers.

### Modified Capabilities

- `manual-address-entry`: The Country form control SHALL be a select populated from the countries list. The State form control SHALL be a select when the selected country has a configured state list (AU, US in this change), and SHALL be a plain text input otherwise. Field order and grid layout (e.g. Row 6: State, Country) may stay as-is; only the control types and data source for Country and State change.

## Impact

- **Affected code**: `AddressInput.tsx` (manual modal: replace Country/State text inputs with select or conditional state control), new region data modules under `src/` (e.g. `src/regions/` or under formatters-style layout), and any shared types/utilities for “states for country”.
- **APIs**: New exports from the package (e.g. `countries`, `getStatesForCountry`, or region types) for reuse and tree-shaking. No change to existing `AddressInput` props or `Address` type.
- **Dependencies**: No new runtime dependencies required; country/state data can be static TypeScript/JSON.
- **Testing / Storybook**: Tests for “state is select when country has states” and “state is text input when country has no state list”; stories for manual entry with AU, US, and at least one country without states.
