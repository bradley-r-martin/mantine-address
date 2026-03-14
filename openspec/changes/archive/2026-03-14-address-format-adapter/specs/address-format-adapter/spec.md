## ADDED Requirements

### Requirement: Address format adapter interface is defined

The library SHALL define an interface `AddressFormatAdapter` with a single method `format(address: Address): string` that returns a display string for the given uniform `Address`. The interface SHALL be the sole contract for address display formatting used by the component.

#### Scenario: Interface is exported

- **WHEN** a consumer imports the type from the package
- **THEN** `AddressFormatAdapter` is available and describes an object with `format(address: Address): string`

#### Scenario: Custom formatter implements interface

- **WHEN** a consumer provides an object `{ format(address) { return address.street_name ?? ''; } }` as the formatter prop
- **THEN** the component uses that object to format the selected address for display without error

---

### Requirement: Default international formatter is provided and used when formatter is omitted

The library SHALL provide a built-in **international** formatter instance (e.g. `internationalAddressFormat`) that formats any `Address` into a single-line string using a consistent international convention (street components, then locality components, with defined separators). When the component is rendered without a `formatter` prop, the component SHALL use this international formatter for display.

#### Scenario: No formatter prop

- **WHEN** a consumer renders `<AddressInput adapter={a} />` with no `formatter` prop
- **THEN** the selected address is displayed using the international formatter (e.g. same output as current `addressToString` for the default case)

#### Scenario: International formatter is exported

- **WHEN** a consumer imports `internationalAddressFormat` from the package
- **THEN** they may pass it explicitly as `formatter={internationalAddressFormat}` or use it elsewhere to format addresses

---

### Requirement: Australian formatter is provided

The library SHALL provide a built-in Australian formatter instance (e.g. `australianAddressFormat`) that formats an `Address` according to Australian display conventions (e.g. state as code, comma-separated lines). The formatter SHALL accept any `Address`; it does not restrict or validate the address's country.

#### Scenario: Australian formatter used for display

- **WHEN** a consumer renders `<AddressInput adapter={a} formatter={australianAddressFormat} />` and the user selects an address (e.g. US or AU)
- **THEN** the displayed value is formatted using Australian conventions (e.g. state as code when applicable, Australian order and separators)

#### Scenario: Australian formatter is exported

- **WHEN** a consumer imports `australianAddressFormat` from the package
- **THEN** they may pass it as the `formatter` prop to get Australian-style display

---

### Requirement: Formatter is display-only

The formatter prop SHALL affect only how the selected address is displayed in the input (and any other place the component renders the address string). It SHALL NOT restrict which addresses can be selected, SHALL NOT validate the address by country, and SHALL NOT filter suggestions.

#### Scenario: Non-AU address with Australian formatter

- **WHEN** the consumer uses `formatter={australianAddressFormat}` and the user selects a US address
- **THEN** the address is displayed using the Australian formatter's rules (e.g. order and separators); the component does not reject or alter the selected address data
