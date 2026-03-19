# storybook Specification (delta)

## ADDED Requirements

### Requirement: Prefill story group under AddressInput

The Storybook stories for the primary component SHALL include a **Prefill** story group under AddressInput that documents the `prefill` prop. The group SHALL contain stories that demonstrate prefill using constant-based values (e.g. `prefill={{ country: COUNTRIES.AU, state: REGIONS.NEW_SOUTH_WALES }}`) so that developers can see the preferred API. Stories MAY also show partial prefill (e.g. country only) or prefill combined with other props.

#### Scenario: Prefill group is navigable under AddressInput

- **WHEN** a developer runs or builds Storybook
- **THEN** a **Prefill** story group SHALL appear under the AddressInput section (e.g. `AddressInput/Prefill`)
- **THEN** opening the group SHALL show one or more stories that use the `prefill` prop with constants (e.g. `COUNTRIES.AU`, `REGIONS.NEW_SOUTH_WALES` or equivalent)

#### Scenario: Prefill stories demonstrate constant-based usage

- **WHEN** a developer views a Prefill story under AddressInput
- **THEN** the story SHALL pass `prefill` using imported constants (e.g. `REGIONS.NEW_SOUTH_WALES`) rather than string literals (e.g. `'NSW'`) where constants are available, so that the preferred pattern is visible in the source
