# Address format adapter (region-adapter pattern)

## Why

Today the component takes an optional `region` prop of type `AddressRegion` (currently `'AU'`). Formatting is implemented with a switch in `formatAddressForRegion(address, region)`. This does not scale: every new convention requires editing that central switch and extending a string union. It also blurs the mental model: "region" sounds like "which country’s addresses we accept," but the intent is **display formatting only**—like date internationalisation. The same address data can be shown in any convention (e.g. select a US address but display it in Australian style). We want the same adapter pattern used for lookup: consumers pass a **format adapter** (or use a default), and built-in adapters are provided so that "use Australian formatting" is `formatter={australianAddressFormat}` (or equivalent), not `region="AU"`.

Goals:

- **Adapter pattern for display formatting**: The component accepts an optional **address format adapter** (object with a single responsibility: turn `Address` into a display string). No central switch; new conventions are new adapter implementations.
- **Default = international**: When no adapter is provided, use a built-in **international** formatter that follows a single, consistent international-style order (e.g. street, locality, country) without country-specific rules. This becomes the default behaviour instead of "no region" today.
- **Clarify semantics**: Specifying a format adapter does **not** restrict which addresses can be selected or validated. It only controls how the selected address is **displayed** in the input (and optionally elsewhere). Same as `Intl.DateTimeFormat(locale)`: same data, different presentation.
- **Naming**: Align with the "display convention" idea rather than "region." The prop could be named after the adapter’s role (e.g. `formatter`) so it’s clear we’re not filtering by geography.

## What changes

- **New interface**: Introduce an **address format adapter** interface (e.g. `AddressFormatAdapter` or `AddressFormatter`) with a single method: `format(address: Address): string`. The component accepts an optional prop (e.g. `formatter` or `format`) of this type.
- **Default formatter**: Provide and use by default a built-in **international** formatter that formats any `Address` in a single, documented international convention (e.g. street line, locality line, country; consistent separators and order). This replaces the current "no region" behaviour so that there is always an explicit formatter in use.
- **Built-in adapters**: Ship at least two formatter adapters: (1) **international** (default), (2) **Australian** (current AU behaviour: state as code, commas, etc.). Consumers can pass the Australian adapter when they want addresses displayed in Australian convention regardless of the address’s actual country.
- **Replace `region` prop**: Remove the optional `region?: AddressRegion` prop and the `AddressRegion` type from the component’s public API. All display formatting goes through the format adapter. The existing `formatAddressForRegion` and `AddressRegion` can remain as internal or legacy exports during migration but are no longer the primary contract; the primary contract is the adapter interface and the default international formatter.
- **Public API**: Export the new interface, the default international formatter instance (e.g. `internationalAddressFormat`), and the Australian formatter (e.g. `australianAddressFormat` or `AustralianAddressFormat`). Document that the prop is for **display formatting only** and does not restrict or validate the address’s country.

## Research summary: naming and pattern

- **Intl / date i18n**: `Intl.DateTimeFormat(locale)` takes a **locale**; same `Date`, different display. No validation of "is this an Australian date." The parallel here is: same `Address`, different display convention. The prop could be the **formatter** (the object that knows how to display), not a locale string, to keep the adapter pattern and allow custom formatters.
- **libaddressinput**: Uses "locale" for parsing/formatting rules and "region/country" in metadata for postal format. So "format" is about **how** to display, not **where** the address is from. Our adapter is exactly that: "how to display."
- **Prop name options**:
  - **`formatter`** — Clear: it’s the object that formats. Mirrors "adapter" for lookup.
  - **`format`** — Short; possible clash with other "format" meanings (e.g. string format).
  - **`addressFormat`** — Explicit but a bit long.
  - **`displayFormat`** — Very explicit.  
    Recommendation: **`formatter`** as the prop name and **`AddressFormatAdapter`** (or **`AddressFormatter`**) as the interface name, so the API reads: "pass a formatter to control how the address is displayed; default is international."
- **Default behaviour**: Having a default **international** formatter means we never render without a formatter; the component always has a single code path: `formatter.format(address)`.

## Capabilities

### New capabilities

- **Address format adapter**: A formal interface for "format this Address for display." Built-in implementations: international (default), Australian. Consumers can implement custom formatters (e.g. UK, US postal conventions) without changing the library.

### Modified capabilities

- **address-autocomplete (AddressInput)**: Component accepts optional `formatter` (or chosen name) implementing the format adapter; when omitted, use built-in international formatter. Remove `region` prop and `AddressRegion` from the component API. Display logic always uses `formatter.format(address)`.
- **address-formatting (formatAddress)**: Introduce the adapter interface and international/Australian implementations; refactor or deprecate `formatAddressForRegion` / `AddressRegion` in favour of the adapter. Document international format order and separators.

## Impact

- **Types**: New type(s) for the format adapter; remove or deprecate `AddressRegion` from component props.
- **AddressInput**: Replace `region` with optional `formatter`; default to international formatter; all display via `formatter.format(address)`.
- **formatAddress.ts / regions**: Implement international formatter (likely current `addressToString` or a small variant); wrap Australian logic in an adapter that implements the interface; keep or move helpers (e.g. `formatAustralianState`) behind the Australian adapter.
- **Exports**: Export interface, `internationalAddressFormat`, and Australian formatter (e.g. `australianAddressFormat`). Optionally keep `formatAddressForRegion` and `AddressRegion` as deprecated for one major version.
- **Stories / README**: Update examples to use `formatter={australianAddressFormat}` (or similar); document that formatter is display-only and does not restrict address source.

## Non-goals (this change)

- Adding more built-in formatters (e.g. UK, US) beyond international and Australian. The adapter pattern makes those easy to add later.
- Changing the lookup adapter or the canonical `Address` type.
- Validation or restriction of addresses by country; the formatter is display-only.
- Tasks or specs in this artifact; those can be added when implementation is planned.
