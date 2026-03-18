# mantine-address-input

Mantine plugin providing a reusable **AddressInput** component for [Mantine](https://mantine.dev) apps. **AddressInput** supports **autocomplete only**; **a provider is required**. Without a provider the field is disabled and shows an error. Address lookup is powered by a pluggable provider (e.g. Google Places or your own backend).

## Install

```bash
npm install mantine-address @mantine/core react
```

## Address model and provider contract

**AddressInput** provides **address autocomplete only** — there is no freeform or manual address entry mode. You **must** configure an `AddressLookupProvider`; without it, the field renders disabled and shows an error that the provider must be configured.

The library uses a **uniform canonical `Address` type** that is region-agnostic: the same shape everywhere regardless of country or provider. All address fields are optional to accommodate varying provider completeness.

- **Providers** must implement `AddressLookupProvider`: `getSuggestions(input)` and `getDetails(id)` returning `Promise<Address>`. Providers map backend-specific responses (e.g. Google Places) into the canonical `Address` only; no backend types leak into the app.
- **Formatting** is provided by the **formatter** (`AddressFormatProvider`). The formatter is responsible for converting an `Address` into text: use `international` or `australian` from the package. Each formatter exposes `toString(address)` (single-line; used by the input for display) and `toEnvelope(address, options?)` (multi-line envelope). How the selected address is **displayed** in the input is controlled by the optional **`format`** prop, e.g. `format={australian}`. When omitted, the international formatter is used. The format is display-only — it does not restrict which addresses can be selected.

### Address type (canonical)

```ts
interface Address {
  place_id?: string;
  building_name?: string;
  level?: string;
  unit?: string;
  lot_no?: string;
  street_number?: string;
  street_name?: string;
  street_type?: string;
  street_suffix?: string;
  suburb?: string;
  state?: string;
  postcode?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}
```

### Formatters (Address → text)

The **formatter** is responsible for converting an `Address` into text. Use `international` or `australian` from the package; each implements `AddressFormatProvider`. The component uses **`toString()`** for the input display.

- **`formatter.toString(address)`** — single-line full address (street, suburb, state, postcode, country). Used by AddressInput for display.
- **`formatter.toEnvelope(address, options?)`** — multi-line envelope format; `options.uppercase` for postal style.

For **display in the input**, use the `format` prop: pass `format={australian}` for Australian conventions (e.g. state as code), or omit it for the default international formatter. The format only affects how the address is shown, not which addresses can be selected.

### Migration from AddressDetails

If you previously used `AddressDetails` (flat `streetAddress`, `city`, `state`, `postalCode`, `country`): the canonical type is now `Address` with structured fields (`street_number`, `street_name`, `suburb`, `postcode`, etc.). A deprecated type alias `AddressDetails = Address` is exported for one release to ease migration; update your code to use `Address` and the new field names. `getDetails` and `onChange` use `Address`; `value` is `Address | null` and the input manages its own display (typed text or formatted address).

## Usage

### AddressInput with Google Places

`AddressInput` wraps Mantine's `Autocomplete` and delegates address lookup to a provider. **A provider is required** — the component only supports autocomplete from the provider's suggestions. Without a provider the field is disabled and shows an error. The built-in `GooglePlacesProvider` uses the Google Places API and returns the canonical `Address`.

**1. Load the Google Maps script in your HTML** (before your app bundle):

```html
<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places"
  async
  defer
></script>
```

> **API key security:** Restrict your key to HTTP referrers in the [Google Cloud Console](https://console.cloud.google.com/) to prevent unauthorized use.

**2. Use the component:** `value` is the selected address (or `null`). The input manages its own display (typed text or formatted address when an address is set). Use the optional `format` prop for display convention (e.g. `format={australian}` for Australian formatting).

```tsx
import { useState } from 'react';
import type { Address } from 'mantine-address';
import { AddressInput, GooglePlacesProvider } from 'mantine-address';

const provider = new GooglePlacesProvider({ apiKey: 'YOUR_GOOGLE_API_KEY' });

function ShippingForm() {
  const [address, setAddress] = useState<Address | null>(null);

  return (
    <AddressInput
      provider={provider}
      label="Shipping address"
      placeholder="Start typing an address…"
      value={address}
      onChange={setAddress}
    />
  );
}
```

### Custom provider

Any object that satisfies `AddressLookupProvider` works. Providers must map backend data into the **uniform `Address` type** only:

```tsx
import type {
  Address,
  AddressLookupProvider,
  AddressSuggestion,
} from 'mantine-address';

const myProvider: AddressLookupProvider = {
  async getSuggestions(
    input: string,
    options?: { restrictions?: AddressRestrictions }
  ): Promise<AddressSuggestion[]> {
    const results = await myAddressApi.autocomplete(input, {
      country: options?.restrictions?.allowedCountries,
    });
    return results.map((r) => ({
      id: r.placeId,
      label: r.fullAddress,
      matchedSubstrings: r.matchedSubstrings,
    }));
  },

  async getDetails(id: string): Promise<Address> {
    const place = await myAddressApi.details(id);
    return {
      place_id: place.placeId,
      street_number: place.streetNumber,
      street_name: place.streetName,
      street_type: place.streetType,
      suburb: place.suburb,
      state: place.state,
      postcode: place.postcode,
      country: place.country,
    };
  },
};

<AddressInput provider={myProvider} label="Address" />;
```

#### `matchedSubstrings` — highlight what the user typed

Each `AddressSuggestion` returned by `getSuggestions` may include an optional `matchedSubstrings` field:

```ts
interface AddressSuggestion {
  id: string;
  label: string;
  matchedSubstrings?: Array<{ offset: number; length: number }>;
}
```

When present, `AddressInput` renders the matching portions of each suggestion label in **bold** inside the dropdown. Providers that don't have this data can simply omit the field — the label renders as plain text. The built-in `GooglePlacesProvider` populates this automatically from the Google Places API response.

### Default address and restrictions

You can **pre-fill the manual-entry form** when the user opens it and **restrict** which addresses are accepted.

- **`defaultAddress`** — Optional `Partial<Address>`. When the user opens the manual-entry modal, only fields present in `defaultAddress` are pre-filled; others stay empty. Does not change the component’s `value` or `defaultValue`; it only sets the form’s initial state.

- **`restrictions`** — Optional `AddressRestrictions` to limit which addresses are valid. When set, both **autocomplete selection** and **manual submit** are validated: only addresses that satisfy every non-empty restriction are accepted. An address that fails (e.g. country not in `allowedCountries`) does not call `onChange` and shows a validation error (“Address must be within the allowed region”).

**`AddressRestrictions`** (optional string arrays; all are AND semantics):

- `allowedCountries?: (string | Country)[]` — e.g. `[COUNTRIES.AU, COUNTRIES.NZ]` (import `COUNTRIES` from the package; same pattern as `REGIONS`)
- `allowedStates?: string[]` — e.g. `['NSW', 'VIC']`
- `allowedPostcodes?: string[]` — e.g. `['2000', '2001']`
- `allowedSuburbs?: string[]` — e.g. `['Sydney', 'Melbourne']`

When `allowedCountries` is set, the manual form’s Country select lists only those countries. When `allowedStates` is set and the country has a state list (e.g. AU, US), the State select lists only those states; for other countries the state field is validated on submit.

**Provider filtering:** Restrictions are passed to the lookup provider’s `getSuggestions(input, options)` so providers can filter server-side when possible. The built-in `GooglePlacesProvider` uses `allowedCountries` as Google’s `componentRestrictions.country`, so suggestions are restricted to those countries. Other restriction fields (state, postcode, suburb) are not supported by the Places Autocomplete API and remain client-side only after selection.

```tsx
<AddressInput
  provider={provider}
  defaultAddress={{ country: 'AU', state: 'NSW' }}
  restrictions={{
    allowedCountries: [COUNTRIES.AU],
    allowedPostcodes: ['2000', '2001'],
  }}
  onChange={setAddress}
/>
```

### Form support (controlled, uncontrolled, native forms)

The component supports both **controlled** and **uncontrolled** usage:

- **Controlled:** pass `value` and `onChange`; the parent owns the address state. When the parent sets `value` to `null` (e.g. on form reset), the input clears.
- **Uncontrolled:** pass `defaultValue` only; the component owns state. Use the ref’s `reset()` method to clear after a native form reset: `ref.current?.reset()`.

For **native HTML forms**, pass a `name` prop (e.g. `name="address"`). The component renders hidden `<input type="hidden">` elements for each defined address field so that form submit or `FormData` includes keys like `address[suburb]`, `address[postcode]`, etc. Omit `name` to avoid rendering hidden inputs.

With **@mantine/form**, wire the address field with `value={form.values.address}` and `onChange={(address) => form.setFieldValue('address', address)}`; `form.reset()` will then clear the address.

Storybook includes **Form / Controlled**, **Form / Uncontrolled**, **Form / With reset**, and **Form / Native form (hidden inputs)** for examples.

### Props

| Prop                               | Type                                 | Default              | Description                                                                                                                                                               |
| ---------------------------------- | ------------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `provider`                         | `AddressLookupProvider`              | required             | Lookup service provider (returns canonical `Address` from `getDetails`). If missing at runtime, the field is disabled and shows an error.                                 |
| `value`                            | `Address \| null`                    | —                    | Selected address (controlled). When undefined, component is uncontrolled.                                                                                                 |
| `defaultValue`                     | `Address \| null`                    | —                    | Initial address when uncontrolled.                                                                                                                                        |
| `onChange`                         | `(address: Address \| null) => void` | —                    | Called when the user selects an address or clears the field.                                                                                                              |
| `format`                           | `AddressFormatProvider`              | international        | Optional. How the selected address is displayed. E.g. `format={australian}` or `format={international}`. Display-only; does not restrict which addresses can be selected. |
| `name`                             | `string`                             | —                    | When set, hidden inputs are rendered for native form submit (e.g. `address[suburb]`, `address[postcode]`).                                                                |
| `debounce`                         | `number`                             | `300`                | Milliseconds to debounce before fetching suggestions                                                                                                                      |
| `nothingFoundMessage`              | `React.ReactNode`                    | `"No results found"` | Message shown in the dropdown when the provider returns an empty array for a non-empty query                                                                              |
| `defaultAddress`                   | `Partial<Address>`                   | —                    | Optional. Pre-fills the manual-entry form when the modal opens; only provided fields are set. Does not change `value`/`defaultValue`.                                     |
| `restrictions`                     | `AddressRestrictions`                | —                    | Optional. Restricts which addresses are accepted (allowed countries, states, postcodes, suburbs). Applied to autocomplete selection and manual submit.                    |
| + all Mantine `Autocomplete` props |                                      |                      | Forwarded to the underlying `Autocomplete` (label, placeholder, error, size, etc.)                                                                                        |

The component’s ref type is `AddressInputRef` (extends `HTMLInputElement` with `reset(): void`). Use the ref for focus and to call `reset()` when uncontrolled.

**Migration from `region`:** If you previously used `region="AU"`, use the format prop instead: `format={australian}`. Import `australian` from the package. For default (international) display, omit the `format` prop.

**Built-in formatters:** The package exports `international` and `australian` from the formatters module. Use `format={australian}` for Australian display conventions (state as code, comma-separated). Use `format={international}` explicitly or omit `format` for the default single-line international format.

#### Built-in UX behaviors

- **Provider required** — if the component is rendered without a valid provider (e.g. `undefined` or `null` at runtime), the input is **disabled** and displays an error message that the provider must be configured. No lookup or selection occurs.
- **Loading indicator** — a spinner appears inside the input while `getSuggestions` is in flight. Provide a `rightSection` prop to replace it with your own element.
- **Match highlighting** — when an `AddressSuggestion` includes `matchedSubstrings`, the matched portion of the label is rendered in bold in the dropdown.
- **No-results message** — when the provider returns `[]` for a non-empty query and no request is in flight, `nothingFoundMessage` is shown in the dropdown.

See [Storybook](https://bradley-r-martin.github.io/mantine-address/) for live examples (published on releases).

## Development

- **Format:** `npm run format` (write) / `npm run format:check` (check)
- **Lint:** `npm run lint`
- **Test:** `npm run test`
- **Build:** `npm run build`
- **Storybook:** `npm run storybook` (dev) / `npm run build:storybook` (static build)

PRs must target the `next` branch; the PR branch name must match an OpenSpec change (e.g. `setup-library`). CI runs tests, format, lint, commit message, build, and OpenSpec checks. See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch strategy, branch naming, commits, pre-commit hooks, and releases.
