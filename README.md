# mantine-address-input

Mantine plugin providing a reusable **AddressInput** component for [Mantine](https://mantine.dev) apps. **AddressInput** supports **autocomplete only**; **using an adapter is required**. Without an adapter the field is disabled and shows an error. Address lookup is powered by a pluggable adapter (e.g. Google Places or your own backend).

## Install

```bash
npm install mantine-address @mantine/core react
```

## Address model and adapter contract

**AddressInput** provides **address autocomplete only** — there is no freeform or manual address entry mode. You **must** configure an `AddressLookupAdapter`; without it, the field renders disabled and shows an error that the adapter must be configured.

The library uses a **uniform canonical `Address` type** that is region-agnostic: the same shape everywhere regardless of country or provider. All address fields are optional to accommodate varying adapter completeness.

- **Adapters** must implement `AddressLookupAdapter`: `getSuggestions(input)` and `getDetails(id)` returning `Promise<Address>`. Adapters map provider-specific responses (e.g. Google Places) into the canonical `Address` only; no provider types leak into the app.
- **Formatting** is provided by `addressToString`, `addressToStreetString`, and `addressToEnvelopeString`, which accept the uniform `Address`. Region-specific display (e.g. Australian abbreviations) is available via optional region transformers that consume the same `Address` and produce region-specific strings or validation.

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

### Formatting utilities

- **`addressToString(address)`** — single-line full address (street, suburb, state, postcode, country).
- **`addressToStreetString(address)`** — street-level line only (unit, building, level, lot, street number, name, type, suffix).
- **`addressToEnvelopeString(address, options?)`** — multi-line envelope format; `options.uppercase` for postal style.

All formatters omit undefined/empty fields and use consistent separators. Region-specific formatting (e.g. Australian state codes) can be layered via optional helpers from the Australian address module.

### Migration from AddressDetails

If you previously used `AddressDetails` (flat `streetAddress`, `city`, `state`, `postalCode`, `country`): the canonical type is now `Address` with structured fields (`street_number`, `street_name`, `suburb`, `postcode`, etc.). A deprecated type alias `AddressDetails = Address` is exported for one release to ease migration; update your code to use `Address` and the new field names. `getDetails` and `onChange` use `Address`; `value` is `Address | null` and the input manages its own display (typed text or formatted address).

## Usage

### AddressInput with Google Places

`AddressInput` wraps Mantine's `Autocomplete` and delegates address lookup to an adapter. **An adapter is required** — the component only supports autocomplete from the adapter's suggestions. Without an adapter the field is disabled and shows an error. The built-in `GooglePlacesAdapter` uses the Google Places API and returns the canonical `Address`.

**1. Load the Google Maps script in your HTML** (before your app bundle):

```html
<script
  src="https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_API_KEY&libraries=places"
  async
  defer
></script>
```

> **API key security:** Restrict your key to HTTP referrers in the [Google Cloud Console](https://console.cloud.google.com/) to prevent unauthorized use.

**2. Use the component:** `value` is the selected address (or `null`). The input manages its own display (typed text or formatted address when an address is set). Use `region` for region-specific formatting (e.g. Australian state codes).

```tsx
import { useState } from 'react';
import type { Address } from 'mantine-address';
import { AddressInput, GooglePlacesAdapter } from 'mantine-address';

const adapter = new GooglePlacesAdapter({ apiKey: 'YOUR_GOOGLE_API_KEY' });

function ShippingForm() {
  const [address, setAddress] = useState<Address | null>(null);

  return (
    <AddressInput
      adapter={adapter}
      label="Shipping address"
      placeholder="Start typing an address…"
      value={address}
      onChange={setAddress}
    />
  );
}
```

### Custom adapter

Any object that satisfies `AddressLookupAdapter` works. Adapters must map provider data into the **uniform `Address` type** only:

```tsx
import type {
  Address,
  AddressLookupAdapter,
  AddressSuggestion,
} from 'mantine-address';

const myAdapter: AddressLookupAdapter = {
  async getSuggestions(input: string): Promise<AddressSuggestion[]> {
    const results = await myAddressApi.autocomplete(input);
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

<AddressInput adapter={myAdapter} label="Address" />;
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

When present, `AddressInput` renders the matching portions of each suggestion label in **bold** inside the dropdown. Adapters that don't have this data can simply omit the field — the label renders as plain text. The built-in `GooglePlacesAdapter` populates this automatically from the Google Places API response.

### Form support (controlled, uncontrolled, native forms)

The component supports both **controlled** and **uncontrolled** usage:

- **Controlled:** pass `value` and `onChange`; the parent owns the address state. When the parent sets `value` to `null` (e.g. on form reset), the input clears.
- **Uncontrolled:** pass `defaultValue` only; the component owns state. Use the ref’s `reset()` method to clear after a native form reset: `ref.current?.reset()`.

For **native HTML forms**, pass a `name` prop (e.g. `name="address"`). The component renders hidden `<input type="hidden">` elements for each defined address field so that form submit or `FormData` includes keys like `address[suburb]`, `address[postcode]`, etc. Omit `name` to avoid rendering hidden inputs.

With **@mantine/form**, wire the address field with `value={form.values.address}` and `onChange={(address) => form.setFieldValue('address', address)}`; `form.reset()` will then clear the address.

Storybook includes **Form / Controlled**, **Form / Uncontrolled**, **Form / With reset**, and **Form / Native form (hidden inputs)** for examples.

### Props

| Prop                               | Type                                 | Default              | Description                                                                                                                              |
| ---------------------------------- | ------------------------------------ | -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `adapter`                          | `AddressLookupAdapter`               | required             | Lookup service adapter (returns canonical `Address` from `getDetails`). If missing at runtime, the field is disabled and shows an error. |
| `value`                            | `Address \| null`                    | —                    | Selected address (controlled). When undefined, component is uncontrolled.                                                                |
| `defaultValue`                     | `Address \| null`                    | —                    | Initial address when uncontrolled.                                                                                                       |
| `onChange`                         | `(address: Address \| null) => void` | —                    | Called when the user selects an address or clears the field.                                                                             |
| `region`                           | `AddressRegion`                      | —                    | When set (e.g. `'AU'`), the displayed address (when value is set) is formatted for this region                                           |
| `name`                             | `string`                             | —                    | When set, hidden inputs are rendered for native form submit (e.g. `address[suburb]`, `address[postcode]`).                               |
| `debounce`                         | `number`                             | `300`                | Milliseconds to debounce before fetching suggestions                                                                                     |
| `nothingFoundMessage`              | `React.ReactNode`                    | `"No results found"` | Message shown in the dropdown when the adapter returns an empty array for a non-empty query                                              |
| + all Mantine `Autocomplete` props |                                      |                      | Forwarded to the underlying `Autocomplete` (label, placeholder, error, size, etc.)                                                       |

The component’s ref type is `AddressInputRef` (extends `HTMLInputElement` with `reset(): void`). Use the ref for focus and to call `reset()` when uncontrolled.

#### Built-in UX behaviors

- **Adapter required** — if the component is rendered without a valid adapter (e.g. `undefined` or `null` at runtime), the input is **disabled** and displays an error message that the adapter must be configured. No lookup or selection occurs.
- **Loading indicator** — a spinner appears inside the input while `getSuggestions` is in flight. Provide a `rightSection` prop to replace it with your own element.
- **Match highlighting** — when an `AddressSuggestion` includes `matchedSubstrings`, the matched portion of the label is rendered in bold in the dropdown.
- **No-results message** — when the adapter returns `[]` for a non-empty query and no request is in flight, `nothingFoundMessage` is shown in the dropdown.

See [Storybook](https://bradley-r-martin.github.io/mantine-address/) for live examples (published on releases).

## Development

- **Format:** `npm run format` (write) / `npm run format:check` (check)
- **Lint:** `npm run lint`
- **Test:** `npm run test`
- **Build:** `npm run build`
- **Storybook:** `npm run storybook` (dev) / `npm run build:storybook` (static build)

PRs must target the `next` branch; the PR branch name must match an OpenSpec change (e.g. `setup-library`). CI runs tests, format, lint, commit message, build, and OpenSpec checks. See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch strategy, branch naming, commits, pre-commit hooks, and releases.
