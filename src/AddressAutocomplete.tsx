import { useState, useRef, useEffect } from 'react';
import {
  Autocomplete,
  Loader,
  factory,
  useProps,
  type AutocompleteProps,
  type ComboboxItem,
} from '@mantine/core';
import type { Factory } from '@mantine/core';
import type { Address, AddressLookupAdapter, AddressSuggestion } from './types';
import { addressToString, formatAddressForRegion } from './formatAddress';
import type { AddressRegion } from './formatAddress';

/** Sentinel value used to render the "no results" row inside the dropdown. */
const NO_RESULTS_VALUE = '__mantine-address-no-results__';

function formatDisplayAddress(
  address: Address,
  region?: AddressRegion
): string {
  return region != null
    ? formatAddressForRegion(address, region)
    : addressToString(address);
}

export interface AddressAutocompleteProps extends Omit<
  AutocompleteProps,
  'data' | 'onOptionSubmit' | 'onChange' | 'value' | 'defaultValue'
> {
  /** Lookup adapter that provides address suggestions and details. */
  adapter: AddressLookupAdapter;
  /**
   * The selected address (controlled). When undefined, component is uncontrolled and uses defaultValue.
   */
  value?: Address | null;
  /** Initial address when uncontrolled. */
  defaultValue?: Address | null;
  /** Called when the user selects an address or clears the field. */
  onChange?: (address: Address | null) => void;
  /**
   * When set, the displayed address (when value is set) is formatted for this region
   * (e.g. 'AU' for Australian state codes and conventions).
   */
  region?: AddressRegion;
  /** Debounce delay in milliseconds before fetching suggestions. Defaults to 300. */
  debounce?: number;
  /**
   * Message displayed in the dropdown when the adapter returns no suggestions
   * for a non-empty query. Defaults to `"No results found"`.
   */
  nothingFoundMessage?: React.ReactNode;
}

export type AddressAutocompleteFactory = Factory<{
  props: AddressAutocompleteProps;
  ref: HTMLInputElement;
}>;

const defaultProps = {
  debounce: 300,
  nothingFoundMessage: 'No results found',
} satisfies Partial<AddressAutocompleteProps>;

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

export const AddressAutocomplete = factory<AddressAutocompleteFactory>(
  (_props, ref) => {
    const props = useProps('AddressAutocomplete', defaultProps, _props);
    const {
      adapter,
      region,
      debounce: debounceMs,
      value: valueProp,
      defaultValue,
      onChange,
      rightSection,
      nothingFoundMessage,
      ...rest
    } = props;

    const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [typedInput, setTypedInput] = useState('');
    const [uncontrolledAddress, setUncontrolledAddress] =
      useState<Address | null>(() => defaultValue ?? null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const requestIdRef = useRef(0);

    const isControlled = valueProp !== undefined;
    const address = isControlled ? (valueProp ?? null) : uncontrolledAddress;

    const displayValue =
      address != null ? formatDisplayAddress(address, region) : typedInput;

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

        adapter
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

      adapter
        .getDetails(suggestion.id)
        .then((address) => {
          const formatted = formatDisplayAddress(address, region);
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

    return (
      <Autocomplete
        ref={ref}
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
    );
  }
);

AddressAutocomplete.displayName = 'AddressAutocomplete';
