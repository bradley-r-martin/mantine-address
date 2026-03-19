# Proposal: Storybook restrictions stories with country/region select

## Why

Restriction stories currently hardcode a single `accept` (e.g. Australia only, or NSW only). To try another country or region, a developer must edit the story. Adding a small wrapper that renders country and region select controls and passes their values into `AddressInput`’s `accept` prop lets anyone test different country/region combinations directly in Storybook without changing code.

## What Changes

- Add a wrapper component (or story-level controls) used by the restrictions documentation stories that:
  - Renders a **country** select (e.g. “Any”, AU, US) and a **region** select (options depend on selected country; e.g. NSW, VIC for AU; CA, NY for US).
  - Passes the selected country and optional region into `AddressInput` as `accept={{ country?, region? }}`.
- Refactor existing restriction stories (e.g. “Australia only”, “accept with region (NSW)”, “Autocomplete with accept”) to use this wrapper so all restriction examples are explorable via the same country/region selects.
- No change to the public API of `AddressInput` (no new props or exports). Compatible with current Mantine usage.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- **storybook**: Restriction documentation stories SHALL provide a way to choose country and (when applicable) region from the Storybook UI and pass those values to `AddressInput`’s `accept` prop so users can test different combinations without editing story source.

## Impact

- **Affected code**: `stories/AddressInput/Restrictions.stories.tsx` (and possibly a small shared wrapper or story component under `stories/`).
- **APIs**: No public API changes; internal story structure only.
- **Dependencies**: No new dependencies.
- **Non-goals**: This change does not add new restriction behavior to the component, alter the address-restrictions spec, or expand automated test coverage beyond what is already in place; it improves Storybook as the place to manually test restriction combos.
