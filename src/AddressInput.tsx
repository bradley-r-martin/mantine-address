import { useState, useRef, useEffect, useImperativeHandle } from 'react';
import {
  Autocomplete,
  Button,
  Loader,
  Modal,
  ScrollArea,
  Stack,
  TextInput,
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

/** Value for the "Enter manually" dropdown option when preventManualEntry is false (only used when a provider is set). */
const ENTER_MANUALLY_VALUE = '__mantine-address-enter-manually__';

export interface AddressInputProps extends Omit<
  AutocompleteProps,
  'data' | 'onOptionSubmit' | 'onChange' | 'value' | 'defaultValue'
> {
  /** Lookup provider for address suggestions and details. When absent, the component operates in manual-only mode (input enabled, focus/click opens manual-entry modal). */
  provider?: AddressLookupProvider | null;
  /**
   * When true, do not show an "Enter manually" option when the provider returns no results. Only has effect when a provider is set; when no provider is supplied, manual entry is always the only path.
   * @default false
   */
  preventManualEntry?: boolean;
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
  preventManualEntry: false,
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
    preventManualEntry,
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
  const [manualModalOpen, setManualModalOpen] = useState(false);
  const [manualFormBuildingName, setManualFormBuildingName] = useState('');
  const [manualFormLevel, setManualFormLevel] = useState('');
  const [manualFormUnit, setManualFormUnit] = useState('');
  const [manualFormLotNo, setManualFormLotNo] = useState('');
  const [manualFormStreetNumber, setManualFormStreetNumber] = useState('');
  const [manualFormStreetName, setManualFormStreetName] = useState('');
  const [manualFormStreetType, setManualFormStreetType] = useState('');
  const [manualFormStreetSuffix, setManualFormStreetSuffix] = useState('');
  const [manualFormSuburb, setManualFormSuburb] = useState('');
  const [manualFormState, setManualFormState] = useState('');
  const [manualFormPostcode, setManualFormPostcode] = useState('');
  const [manualFormCountry, setManualFormCountry] = useState('');
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  /** When true, the next focus/click open is ignored (modal just closed and returnFocus refocused the input). */
  const manualModalJustClosedRef = useRef(false);

  const openManualModal = (initialStreet?: string) => {
    setManualFormBuildingName('');
    setManualFormLevel('');
    setManualFormUnit('');
    setManualFormLotNo('');
    setManualFormStreetNumber('');
    setManualFormStreetName(initialStreet ?? '');
    setManualFormStreetType('');
    setManualFormStreetSuffix('');
    setManualFormSuburb('');
    setManualFormState('');
    setManualFormPostcode('');
    setManualFormCountry('');
    setManualModalOpen(true);
  };

  const closeManualModal = () => {
    manualModalJustClosedRef.current = true;
    setManualModalOpen(false);
  };

  const handleOpenManualModalNoProvider = () => {
    if (manualModalJustClosedRef.current) {
      manualModalJustClosedRef.current = false;
      return;
    }
    openManualModal();
  };

  const handleManualSubmit = () => {
    const address: Address = {};
    if (manualFormBuildingName.trim())
      address.building_name = manualFormBuildingName.trim();
    if (manualFormLevel.trim()) address.level = manualFormLevel.trim();
    if (manualFormUnit.trim()) address.unit = manualFormUnit.trim();
    if (manualFormLotNo.trim()) address.lot_no = manualFormLotNo.trim();
    if (manualFormStreetNumber.trim())
      address.street_number = manualFormStreetNumber.trim();
    if (manualFormStreetName.trim())
      address.street_name = manualFormStreetName.trim();
    if (manualFormStreetType.trim())
      address.street_type = manualFormStreetType.trim();
    if (manualFormStreetSuffix.trim())
      address.street_suffix = manualFormStreetSuffix.trim();
    if (manualFormSuburb.trim()) address.suburb = manualFormSuburb.trim();
    if (manualFormState.trim()) address.state = manualFormState.trim();
    if (manualFormPostcode.trim()) address.postcode = manualFormPostcode.trim();
    if (manualFormCountry.trim()) address.country = manualFormCountry.trim();
    setTypedInput(formatProvider.toString(address));
    if (!isControlled) setUncontrolledAddress(address);
    onChange?.(address);
    closeManualModal();
  };

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
    // Prevent the "Enter manually" option from overwriting the input with its label.
    if (value === 'Enter manually' || value === ENTER_MANUALLY_VALUE) {
      return;
    }
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

    if (provider) {
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
    }
  };

  const handleOptionSubmit = (label: string) => {
    if (label === NO_RESULTS_VALUE) return;
    if (label === ENTER_MANUALLY_VALUE) {
      openManualModal(typedInput);
      return;
    }

    const suggestion = suggestions.find((s) => s.label === label);
    if (!suggestion || !provider) return;

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

  // When no results: show disabled no-results message; when !preventManualEntry also show selectable "Enter manually".
  const data: (string | ComboboxItem)[] = showNoResults
    ? !preventManualEntry
      ? [
          { value: NO_RESULTS_VALUE, label: '', disabled: true },
          { value: ENTER_MANUALLY_VALUE, label: 'Enter manually' },
        ]
      : [{ value: NO_RESULTS_VALUE, label: '', disabled: true }]
    : suggestions.map((s) => s.label);

  const manualModal = (
    <Modal
      title="Enter address"
      opened={manualModalOpen}
      onClose={closeManualModal}
      centered
    >
      <ScrollArea.Autosize mah="70vh" type="scroll">
        <Stack gap="md">
          <TextInput
            label="Building name"
            placeholder="Building name"
            value={manualFormBuildingName}
            onChange={(e) => setManualFormBuildingName(e.currentTarget.value)}
          />
          <TextInput
            label="Level"
            placeholder="Level"
            value={manualFormLevel}
            onChange={(e) => setManualFormLevel(e.currentTarget.value)}
          />
          <TextInput
            label="Unit"
            placeholder="Unit"
            value={manualFormUnit}
            onChange={(e) => setManualFormUnit(e.currentTarget.value)}
          />
          <TextInput
            label="Lot no"
            placeholder="Lot number"
            value={manualFormLotNo}
            onChange={(e) => setManualFormLotNo(e.currentTarget.value)}
          />
          <TextInput
            label="Street number"
            placeholder="Street number"
            value={manualFormStreetNumber}
            onChange={(e) => setManualFormStreetNumber(e.currentTarget.value)}
          />
          <TextInput
            label="Street name"
            placeholder="Street name"
            value={manualFormStreetName}
            onChange={(e) => setManualFormStreetName(e.currentTarget.value)}
          />
          <TextInput
            label="Street type"
            placeholder="e.g. Road, Street"
            value={manualFormStreetType}
            onChange={(e) => setManualFormStreetType(e.currentTarget.value)}
          />
          <TextInput
            label="Street suffix"
            placeholder="e.g. North, East"
            value={manualFormStreetSuffix}
            onChange={(e) => setManualFormStreetSuffix(e.currentTarget.value)}
          />
          <TextInput
            label="Suburb"
            placeholder="Suburb / City"
            value={manualFormSuburb}
            onChange={(e) => setManualFormSuburb(e.currentTarget.value)}
          />
          <TextInput
            label="State / Province"
            placeholder="State or province"
            value={manualFormState}
            onChange={(e) => setManualFormState(e.currentTarget.value)}
          />
          <TextInput
            label="Postcode"
            placeholder="Postcode"
            value={manualFormPostcode}
            onChange={(e) => setManualFormPostcode(e.currentTarget.value)}
          />
          <TextInput
            label="Country"
            placeholder="Country"
            value={manualFormCountry}
            onChange={(e) => setManualFormCountry(e.currentTarget.value)}
          />
          <Button onClick={handleManualSubmit}>Save</Button>
          <Button variant="default" onClick={closeManualModal}>
            Cancel
          </Button>
        </Stack>
      </ScrollArea.Autosize>
    </Modal>
  );

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
          onFocus={handleOpenManualModalNoProvider}
          onClick={handleOpenManualModalNoProvider}
          readOnly
          {...rest}
        />
        {manualModal}
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
          if (option.value === ENTER_MANUALLY_VALUE) {
            return <span>Enter manually</span>;
          }
          const suggestion = suggestions.find((s) => s.label === option.value);
          return highlightLabel(option.value, suggestion?.matchedSubstrings);
        }}
        filter={({ options }) => options}
        {...rest}
      />
      {manualModal}
    </>
  );
});

AddressInput.displayName = 'AddressInput';
