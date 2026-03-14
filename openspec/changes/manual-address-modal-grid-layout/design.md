## Context

The manual-entry modal in `AddressInput.tsx` currently uses a single `<Stack>` to render all address fields vertically. All inputs and behaviour are already in place; the change is layout-only. The library uses Mantine (TypeScript, React) and must remain compatible with existing consumers and Mantine versions.

## Goals / Non-Goals

**Goals:**

- Replace the vertical field list with a responsive grid so fields appear in the specified rows and columns.
- Preserve exact field set, labels, validation, and submission behaviour; no API or data model changes.
- Improve scanability and data-entry efficiency via consistent row alignment and grouping.

**Non-Goals:**

- Address data model or type changes; field renaming; validation logic; address standardisation; autocomplete integration.

## Decisions

1. **Use Mantine `Grid` for layout**  
   Use Mantine’s `Grid` (and `Grid.Col` or equivalent) so layout is consistent with the rest of the library and responsive. Alternative: custom CSS Grid — rejected to avoid duplicating Mantine’s breakpoints and theming.

2. **Row structure and column spans**  
   Implement the specified structure: Row 1 — 3 cols (Unit, Lot no, Level); Row 2 — full width (Building name); Rows 3–6 — 2 columns each (Street no/name, Street type/suffix, Suburb/Postcode, State/Country). Building name SHALL span the full row. Multi-column rows SHALL distribute space evenly (e.g. equal `span` or flex).

3. **Order of fields in markup**  
   Render fields in DOM in the defined row order so tab order and accessibility follow the visual layout. No reordering of state or submit logic.

4. **Responsiveness**  
   Grid SHALL remain usable on small viewports (e.g. narrow modals). Option: collapse to single column on small breakpoints if needed; otherwise keep 2–3 columns with appropriate `span`/breakpoints. Prefer minimal breakpoint changes unless testing shows overflow.

## Risks / Trade-offs

- **Layout regression on narrow viewports** → Use Mantine breakpoints so columns stack or reduce count on small screens; test in Storybook at narrow widths.
- **DOM order vs. visual order** → Keep DOM order matching the grid row order so focus order stays logical.
- **Existing tests assume vertical stack** → Update any tests that depend on a single-column stack (e.g. selectors or order); add assertions for row/column structure or field order if desired.

## Migration Plan

- Single-component change; no data migration or feature flags. Deploy as part of normal release. Rollback: revert the layout commit; behaviour and API are unchanged.

## Open Questions

None; layout and row/column counts are specified in the proposal.
