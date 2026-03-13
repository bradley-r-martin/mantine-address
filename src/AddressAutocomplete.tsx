import { useState, useRef } from 'react';
import {
  Autocomplete,
  Loader,
  type AutocompleteProps,
  type ComboboxItem,
} from '@mantine/core';
import type {
  AddressDetails,
  AddressLookupAdapter,
  AddressSuggestion,
} from './types';

/** Sentinel value used to render the "no results" row inside the dropdown. */
const NO_RESULTS_VALUE = '__mantine-address-no-results__';

export interface AddressAutocompleteProps extends Omit<
  AutocompleteProps,
  'data' | 'onOptionSubmit'
> {
  /** Lookup adapter that provides address suggestions and details. */
  adapter: AddressLookupAdapter;
  /** Called with structured address data when the user selects a suggestion. */
  onAddressSelect?: (address: AddressDetails) => void;
  /** Debounce delay in milliseconds before fetching suggestions. Defaults to 300. */
  debounce?: number;
  /**
   * Message displayed in the dropdown when the adapter returns no suggestions
   * for a non-empty query. Defaults to `"No results found"`.
   */
  nothingFoundMessage?: React.ReactNode;
}

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

export function AddressAutocomplete({
  adapter,
  onAddressSelect,
  debounce: debounceMs = 300,
  onChange,
  rightSection,
  nothingFoundMessage = 'No results found',
  ...props
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);

  const showNoResults =
    !isLoading && inputValue.length > 0 && suggestions.length === 0;

  const handleChange = (value: string) => {
    setInputValue(value);
    onChange?.(value);

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
      .then((details) => onAddressSelect?.(details))
      .catch(() => {});
  };

  // When no results, add a disabled sentinel item so the dropdown stays open and shows the message.
  const data: (string | ComboboxItem)[] = showNoResults
    ? [{ value: NO_RESULTS_VALUE, label: '', disabled: true }]
    : suggestions.map((s) => s.label);

  return (
    <Autocomplete
      data={data}
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
      {...props}
    />
  );
}
