# documentation — Delta (adapter-required-autocomplete-only)

## MODIFIED Requirements

### Requirement: README describes the project and usage

The repository SHALL include a README (e.g. README.md) that describes the project, how to install it, basic usage, and the main development scripts (e.g. format, lint, test, build, Storybook) so that users and developers can onboard quickly. The README SHALL refer to the single address component as **AddressInput** and state that it supports **autocomplete only** and that **using an adapter is required**; it MUST NOT imply that the component can operate without an adapter or that there is a non-autocomplete (e.g. freeform manual entry) mode.

#### Scenario: README exists and is discoverable

- **WHEN** a user or contributor opens the repository root
- **THEN** a README file (e.g. README.md) exists and is the default view on the hosting platform (e.g. GitHub)

#### Scenario: README includes install and usage

- **WHEN** a user reads the README
- **THEN** it contains instructions or links for installing the package (e.g. npm install) and at least minimal usage or link to docs (e.g. Storybook)

#### Scenario: README includes development scripts

- **WHEN** a developer reads the README
- **THEN** it documents or references the main scripts (e.g. format, lint, test, build, Storybook) so they know how to run quality checks and build

#### Scenario: README states autocomplete only and adapter required

- **WHEN** a user reads the README
- **THEN** it explicitly states that the AddressInput component provides autocomplete only and that an adapter must be configured
- **THEN** it does not imply that the field can work without an adapter or that there is a non-autocomplete input mode
