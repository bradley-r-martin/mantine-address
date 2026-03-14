## Why

The manual-entry modal currently collects only a subset of address fields (street, suburb, state, postcode, country). The canonical `Address` type includes additional fields (e.g. building_name, level, unit, lot_no, street_number, street_type, street_suffix). Manual entries therefore cannot populate a full `Address`, which limits parity with provider-returned addresses and prevents consumers from capturing or displaying the full structure. Adding the missing fields (excluding place_id, latitude, longitude) aligns manual entry with the Address shape and supports richer address data.

## What Changes

- Extend the manual-entry modal form to include all `Address` fields except `place_id`, `latitude`, and `longitude`.
- Add form inputs and state for: `building_name`, `level`, `unit`, `lot_no`, `street_number`, `street_name`, `street_type`, `street_suffix`, `suburb`, `state`, `postcode`, `country` (replacing or refining the single "Street" field as needed so each has a dedicated input).
- On submit, build the `Address` from all collected fields and pass it to `onChange`; display value continues to use the active format provider.
- No change to public API surface (props, exports); internal state and modal UI only. Compatible with existing Mantine usage.

**Non-goals**: No new props for controlling which fields appear; no geocoding (lat/long) or place_id in manual entry. Testing and Storybook should cover the new fields and submission behavior; scope is the manual-entry flow only.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `manual-address-entry`: The manual-entry form SHALL collect and submit all `Address` fields except `place_id`, `latitude`, and `longitude` (i.e. building_name, level, unit, lot_no, street_number, street_name, street_type, street_suffix, suburb, state, postcode, country). Each field SHALL have a corresponding form control; submission SHALL produce an `Address` with every such field populated when the user entered a value.

## Impact

- **Affected code**: `AddressInput.tsx` — manual modal form state, inputs, and `handleManualSubmit` logic.
- **APIs**: No new or changed public props or exports.
- **Dependencies**: None; Mantine `TextInput` (or equivalent) for additional fields.
- **Systems**: Storybook manual-entry stories should be updated to demonstrate and test the extended form.
