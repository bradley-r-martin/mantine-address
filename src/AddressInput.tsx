import { useState, useRef, useEffect, useImperativeHandle } from 'react';
import {
  Autocomplete,
  Loader,
  factory,
  useProps,
  type AutocompleteProps,
  type ComboboxItem,
} from '@mantine/core';
import type { Factory } from '@mantine/core';
import type {
  Address,
  AddressLookupProvider,
  AddressSuggestion,
} from './types';
import { international, type AddressFormatProvider } from './formatters';

/** Keys of Address that are serialized as hidden form inputs, in stable order. */
const ADDRESS_FORM_KEYS: (keyof Address)[] = [
  'place_id',
  'building_name',
  'level',
  'unit',
  'lot_no',
  'street_number',
  'street_name',
  'street_type',
  'street_suffix',
  'suburb',
  'state',
  'postcode',
  'country',
  'latitude',
  'longitude',
];

/** Sentinel value used to render the "no results" row inside the dropdown. */
const NO_RESULTS_VALUE = '__mantine-address-no-results__';

/** Message shown when the component is rendered without a valid provider. */
const PROVIDER_REQUIRED_MESSAGE =
  'Address autocomplete requires a provider to be configured';

export interface AddressInputProps extends Omit<
  AutocompleteProps,
  'data' | 'onOptionSubmit' | 'onChange' | 'value' | 'defaultValue'
> {
  /** Lookup provider that provides address suggestions and details. */
  provider: AddressLookupProvider;
  /**
   * The selected address (controlled). When undefined, component is uncontrolled and uses defaultValue.
   */
  value?: Address | null;
  /** Initial address when uncontrolled. */
  defaultValue?: Address | null;
  /** Called when the user selects an address or clears the field. */
  onChange?: (address: Address | null) => void;
  /**
   * Optional formatter for how the selected address is displayed. The component calls
   * formatter.toString(address). When omitted, the international formatter is used. E.g. format={australian}.
   * Display-only: does not restrict which addresses can be selected.
   */
  format?: AddressFormatProvider;
  /**
   * Name for native form participation. When set, hidden inputs are rendered for each defined
   * address field under `{name}[field]` (e.g. name="address" → address[suburb], address[postcode]).
   */
  name?: string;
  /** Debounce delay in milliseconds before fetching suggestions. Defaults to 300. */
  debounce?: number;
  /**
   * Message displayed in the dropdown when the provider returns no suggestions
   * for a non-empty query. Defaults to `"No results found"`.
   */
  nothingFoundMessage?: React.ReactNode;
}

export interface AddressInputRef extends HTMLInputElement {
  /** Clears the selected address and typed input. Use after form reset when uncontrolled. */
  reset(): void;
}

export type AddressInputFactory = Factory<{
  props: AddressInputProps;
  ref: AddressInputRef;
}>;

const defaultProps = {
  debounce: 300,
  nothingFoundMessage: 'No results found',
  format: international,
} satisfies Partial<AddressInputProps>;

function highlightLabel(
  label: string,
  matchedSubstrings: AddressSuggestion['matchedSubstrings']
): React.ReactNode {
  if (!matchedSubstrings || matchedSubstrings.length === 0) return label;

  const ranges = [...matchedSubstrings].sort((a, b) => a.offset - b.offset);
  const parts: React.ReactNode[] = [];
  let cursor = 0;

  for (const { offset, length } of ranges) {
    if (offset > cursor) parts.push(label.slice(cursor, offset));
    parts.push(
      <mark
        key={offset}
        style={{ fontWeight: 700, background: 'transparent', color: 'inherit' }}
      >
        {label.slice(offset, offset + length)}
      </mark>
    );
    cursor = offset + length;
  }

  if (cursor < label.length) parts.push(label.slice(cursor));

  return <span>{parts}</span>;
}

function renderHiddenInputs(
  name: string,
  address: Address | null
): React.ReactNode {
  if (!name || !address) return null;
  const entries: Array<[keyof Address, string]> = [];
  for (const key of ADDRESS_FORM_KEYS) {
    const v = address[key];
    if (v === undefined || v === null) continue;
    const value = typeof v === 'number' ? String(v) : v;
    entries.push([key, value]);
  }
  return (
    <>
      {entries.map(([field, value]) => (
        <input
          key={field}
          type="hidden"
          name={`${name}[${field}]`}
          value={value}
          readOnly
          aria-hidden
        />
      ))}
    </>
  );
}

export const AddressInput = factory<AddressInputFactory>((_props, ref) => {
  const props = useProps('AddressInput', defaultProps, _props);
  const {
    provider,
    format: formatProp,
    debounce: debounceMs,
    value: valueProp,
    defaultValue,
    onChange,
    name: nameProp,
    rightSection,
    nothingFoundMessage,
    ...rest
  } = props;

  const formatProvider = formatProp ?? international;

  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [typedInput, setTypedInput] = useState('');
  const [uncontrolledAddress, setUncontrolledAddress] =
    useState<Address | null>(() => defaultValue ?? null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setTypedInput('');
    setUncontrolledAddress(null);
    setSuggestions([]);
    setIsLoading(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    requestIdRef.current++;
    onChange?.(null);
  };

  useImperativeHandle(ref, () => {
    const el = inputRef.current;
    if (!el) return null as unknown as AddressInputRef;
    (el as AddressInputRef).reset = reset;
    return el as AddressInputRef;
  }, [reset]);

  const isControlled = valueProp !== undefined;
  const address = isControlled ? (valueProp ?? null) : uncontrolledAddress;

  const displayValue =
    address != null ? formatProvider.toString(address) : typedInput;

  useEffect(() => {
    if (isControlled && valueProp == null) setTypedInput('');
  }, [isControlled, valueProp]);

  const showNoResults =
    !isLoading && typedInput.length > 0 && suggestions.length === 0;

  const handleChange = (value: string) => {
    setTypedInput(value);
    if (!isControlled) setUncontrolledAddress(null);
    onChange?.(null);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (!value) {
      requestIdRef.current++;
      setIsLoading(false);
      setSuggestions([]);
      return;
    }

    timerRef.current = setTimeout(() => {
      const currentId = ++requestIdRef.current;
      setIsLoading(true);

      provider
        .getSuggestions(value)
        .then((results) => {
          if (requestIdRef.current !== currentId) return;
          setSuggestions(results);
          setIsLoading(false);
        })
        .catch(() => {
          if (requestIdRef.current !== currentId) return;
          setSuggestions([]);
          setIsLoading(false);
        });
    }, debounceMs);
  };

  const handleOptionSubmit = (label: string) => {
    if (label === NO_RESULTS_VALUE) return;

    const suggestion = suggestions.find((s) => s.label === label);
    if (!suggestion) return;

    provider
      .getDetails(suggestion.id)
      .then((address) => {
        const formatted = formatProvider.toString(address);
        setTypedInput(formatted);
        if (!isControlled) setUncontrolledAddress(address);
        onChange?.(address);
      })
      .catch(() => {});
  };

  // When no results, add a disabled sentinel item so the dropdown stays open and shows the message.
  const data: (string | ComboboxItem)[] = showNoResults
    ? [{ value: NO_RESULTS_VALUE, label: '', disabled: true }]
    : suggestions.map((s) => s.label);

  if (provider == null) {
    return (
      <>
        {nameProp ? renderHiddenInputs(nameProp, address) : null}
        <Autocomplete
          ref={inputRef}
          data={[]}
          value={displayValue}
          onChange={() => {}}
          onOptionSubmit={() => {}}
          disabled
          error={PROVIDER_REQUIRED_MESSAGE}
          {...rest}
        />
      </>
    );
  }

  return (
    <>
      {nameProp ? renderHiddenInputs(nameProp, address) : null}
      <Autocomplete
        ref={inputRef}
        data={data}
        value={displayValue}
        onChange={handleChange}
        onOptionSubmit={handleOptionSubmit}
        rightSection={
          rightSection ??
          (isLoading ? (
            <span role="status" aria-label="Loading suggestions">
              <Loader size="xs" />
            </span>
          ) : undefined)
        }
        renderOption={({ option }) => {
          if (option.value === NO_RESULTS_VALUE) {
            return (
              <span
                style={{
                  color: 'var(--mantine-color-dimmed)',
                  cursor: 'default',
                }}
              >
                {nothingFoundMessage}
              </span>
            );
          }
          const suggestion = suggestions.find((s) => s.label === option.value);
          return highlightLabel(option.value, suggestion?.matchedSubstrings);
        }}
        filter={({ options }) => options}
        {...rest}
      />
    </>
  );
});

AddressInput.displayName = 'AddressInput';
