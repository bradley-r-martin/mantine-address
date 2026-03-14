## Context

The AddressInput component has a manual-entry modal that currently uses five form fields (street, suburb, state, postcode, country) and maps the single "street" field to `Address.street_name`. The canonical `Address` type in `src/types.ts` includes additional optional fields: building_name, level, unit, lot_no, street_number, street_name, street_type, street_suffix, suburb, state, postcode, country; place_id, latitude, and longitude are excluded from manual entry by product decision. The codebase is a single-component Mantine library; the modal is implemented inline in AddressInput.tsx with React state per field and Mantine TextInput/Modal/Stack.

## Goals / Non-Goals

**Goals:**

- Extend the manual-entry form so it collects every `Address` field except `place_id`, `latitude`, and `longitude`.
- Preserve existing behavior: modal open/close, submit/cancel, onChange and display formatting.
- Keep the public API unchanged (no new props).

**Non-Goals:**

- Configurable field visibility, conditional fields, or validation rules.
- Geocoding or setting place_id/lat/long from manual entry.
- Changing the Address type or format-provider contract.

## Decisions

**1. One form control per Address field (except place_id, lat, long)**  
Rationale: Matches the Address shape, keeps submission logic simple (one-to-one mapping), and allows format providers to use any combination of fields. Alternative: keep a single "street" free-text and parse into components (rejected: complex, region-dependent, and error-prone).

**2. Field order and grouping**  
Rationale: Use a logical order (e.g. building/level/unit → street number/name/type/suffix → suburb → state → postcode → country) and a single vertical Stack so the modal stays simple and accessible. Grouping into sections (e.g. "Street" vs "Locality") can be done with Stack + Text as section headers if desired; minimal first step is a flat list of inputs. Alternative: multi-step wizard (rejected for scope).

**3. Optional fields and empty submit**  
Rationale: All manual form fields remain optional; submit builds an Address with only non-empty trimmed values, consistent with current behavior and the optional nature of Address fields. No "required" validation in this change.

**4. Initial values when opening modal (e.g. from "Enter manually" with typed text)**  
Rationale: When opening with pre-filled search text (e.g. from no-results "Enter manually"), continue to pass that into a single initial field (e.g. street_name or a combined street line) so the user is not forced to re-type. Other new fields start empty; future enhancement could pre-fill from current address if the modal is opened for editing.

## Risks / Trade-offs

- **More form fields** → Modal height and scroll on small viewports. Mitigation: use ScrollArea or allow modal to scroll; keep labels short.
- **Longer form** → Slightly higher interaction cost for minimal addresses. Mitigation: all fields optional; users can fill only what they need.
- **No new props** → Cannot hide specific fields without a follow-up change. Acceptable for this iteration.

## Migration Plan

Not applicable (internal UI and state only; no API or data migration). Deploy as part of normal release; no rollback beyond reverting the change.

## Open Questions

None. Field order and optional labels (e.g. "Level", "Unit", "Lot no") can be refined during implementation to match common address UX.
