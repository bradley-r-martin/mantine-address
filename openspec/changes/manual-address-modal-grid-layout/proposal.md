## Why

The Manual Address Modal currently renders all inputs in a single vertical list, which makes the form long and harder to scan. Converting to a structured grid layout will improve readability and data-entry efficiency without changing field behavior, validation, or the address data model.

## What Changes

- Replace the vertical stack of form fields in the manual-entry modal with a responsive grid layout.
- Reorder and group fields into defined rows: Row 1 (Unit, Lot no, Level); Row 2 full-width (Building name); Row 3 (Street no, Street name); Row 4 (Street type, Street suffix); Row 5 (Suburb, Postcode); Row 6 (State, Country).
- Ensure multi-column rows distribute space evenly and Building name spans full width.
- No changes to labels, input behaviour, validation, or public API (props/exports). Compatible with existing Mantine versions and consumer usage.

## Capabilities

### New Capabilities

None.

### Modified Capabilities

- `manual-address-entry`: Add a requirement that the manual-entry modal form SHALL use a grid layout with fields in the specified order and row/column structure (Unit, Lot no, Level | Building name full width | Street no, Street name | Street type, Street suffix | Suburb, Postcode | State, Country). Layout and visual grouping only; no change to which fields exist or how they are submitted.

## Impact

- **Affected code**: Manual-entry modal form markup and layout in `AddressInput.tsx` (grid structure, field order, optional Mantine `Grid` or equivalent).
- **APIs**: No change to public props or exports.
- **Dependencies**: No new dependencies; use existing Mantine layout primitives (e.g. `Grid`, `SimpleGrid`).
- **Testing / Storybook**: Existing stories and tests for manual entry remain valid; add or adjust tests only to assert layout/order where desired (e.g. DOM order or visual regression). No change to validation or submission behaviour.

## Non-goals

- Address data model or type changes.
- Field renaming or new/removed fields.
- Validation logic changes.
- Address standardisation or autocomplete integration.
- Changing modal open/close behaviour or preventManualEntry semantics.
