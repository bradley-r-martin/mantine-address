import { useState, useRef, useEffect, useImperativeHandle } from 'react';
import {
  Alert,
  Autocomplete,
  Button,
  Grid,
  Group,
  Loader,
  Modal,
  ScrollArea,
  Select,
  Stack,
  TextInput,
  factory,
  useProps,
  type AutocompleteProps,
  type ComboboxItem,
} from '@mantine/core';
import type { Factory } from '@mantine/core';
import type {
  AcceptAddress,
  Address,
  AddressLookupProvider,
  AddressSuggestion,
  PrefillAddress,
} from './types';
import { international, type AddressFormatProvider } from './formatters';
import { addressSatisfiesRestrictions } from './utilities';
import { getCountriesSorted, getStatesForCountry } from './utilities';

/** Default validation message when an address does not satisfy restrictions. */
const RESTRICTION_ERROR_MESSAGE = 'Address must be within the allowed region';

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
  'data' | 'onOptionSubmit' | 'onChange' | 'value' | 'defaultValue' | 'accept'
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
  /**
   * Optional default values for the manual-entry form. When the user opens the manual modal,
   * only fields present in this object are pre-filled; others stay empty. Does not change value/defaultValue.
   */
  defaultAddress?: Partial<Address>;
  /**
   * Optional prefill for the manual-entry form. Prefer this over defaultAddress when using
   * constants (e.g. prefill={{ country: AUSTRALIA, state: AUSTRALIA.NEW_SOUTH_WALES }}).
   * When both prefill and defaultAddress are set, prefill wins for overlapping fields.
   */
  prefill?: PrefillAddress;
  /**
   * Optional accept filter (single country, optional single region). When set, only addresses
   * matching the given country and optionally region are accepted (autocomplete selection and manual submit).
   */
  accept?: AcceptAddress;
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

/** Resolve prefill/default value to string for the manual form. */
function resolvePrefillCountry(v: PrefillAddress['country']): string {
  if (v == null) return '';
  return typeof v === 'string' ? v.trim() : v.code;
}
function resolvePrefillState(v: PrefillAddress['state']): string {
  if (v == null) return '';
  return typeof v === 'string' ? v.trim() : v.abbreviation;
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
    defaultAddress,
    prefill,
    accept,
    error: errorProp,
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
  const [manualFormError, setManualFormError] = useState<string | null>(null);
  const [restrictionError, setRestrictionError] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  /** When true, the next focus/click open is ignored (modal just closed and returnFocus refocused the input). */
  const manualModalJustClosedRef = useRef(false);

  const openManualModal = (initialStreet?: string) => {
    setManualFormError(null);
    const d = defaultAddress ?? {};
    const p = prefill ?? {};
    const merged = { ...d, ...p };
    const str = (v: string | undefined) => (v != null ? String(v).trim() : '');
    setManualFormBuildingName(str(merged.building_name));
    setManualFormLevel(str(merged.level));
    setManualFormUnit(str(merged.unit));
    setManualFormLotNo(str(merged.lot_no));
    setManualFormStreetNumber(str(merged.street_number));
    setManualFormStreetName(initialStreet ?? str(merged.street_name));
    setManualFormStreetType(str(merged.street_type));
    setManualFormStreetSuffix(str(merged.street_suffix));
    setManualFormSuburb(str(merged.suburb));
    setManualFormState(resolvePrefillState(merged.state));
    setManualFormPostcode(str(merged.postcode));
    setManualFormCountry(resolvePrefillCountry(merged.country));
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

    if (accept && !addressSatisfiesRestrictions(address, accept)) {
      setManualFormError(RESTRICTION_ERROR_MESSAGE);
      return;
    }
    setManualFormError(null);
    setRestrictionError(null);
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
    setRestrictionError(null);
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
          .getSuggestions(value, {
            accept: accept ?? undefined,
          })
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
        if (accept && !addressSatisfiesRestrictions(address, accept)) {
          setRestrictionError(RESTRICTION_ERROR_MESSAGE);
          return;
        }
        setRestrictionError(null);
        const formatted = formatProvider.toString(address);
        setTypedInput(formatted);
        if (!isControlled) setUncontrolledAddress(address);
        onChange?.(address);
      })
      .catch(() => {});
  };

  const acceptCountryCode = accept?.country
    ? (typeof accept.country === 'string'
        ? accept.country
        : accept.country.code
      )
        .trim()
        .toUpperCase()
    : null;
  const allCountries = getCountriesSorted();
  const manualCountryList = (
    acceptCountryCode
      ? allCountries.filter((c) => c.code.toUpperCase() === acceptCountryCode)
      : allCountries
  ).map((c) => ({ value: c.code, label: c.name }));

  const acceptRegionAbbr = accept?.region
    ? (typeof accept.region === 'string'
        ? accept.region
        : accept.region.abbreviation
      )
        .trim()
        .toUpperCase()
    : null;
  const stateOptionsRaw = getStatesForCountry(manualFormCountry);
  const manualStateList = (
    stateOptionsRaw
      ? acceptRegionAbbr
        ? stateOptionsRaw.filter(
            (s) => s.code.toUpperCase() === acceptRegionAbbr
          )
        : stateOptionsRaw
      : undefined
  )?.map((s) => ({ value: s.code, label: s.name }));

  const effectiveError = restrictionError ?? errorProp;

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
          <Grid>
            {/* Row 1: Unit, Lot no, Level (3 columns) */}
            <Grid.Col span={4}>
              <TextInput
                label="Unit"
                placeholder="Unit"
                value={manualFormUnit}
                onChange={(e) => setManualFormUnit(e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Lot no"
                placeholder="Lot number"
                value={manualFormLotNo}
                onChange={(e) => setManualFormLotNo(e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput
                label="Level"
                placeholder="Level"
                value={manualFormLevel}
                onChange={(e) => setManualFormLevel(e.currentTarget.value)}
              />
            </Grid.Col>
            {/* Row 2: Building name (full width) */}
            <Grid.Col span={12}>
              <TextInput
                label="Building name"
                placeholder="Building name"
                value={manualFormBuildingName}
                onChange={(e) =>
                  setManualFormBuildingName(e.currentTarget.value)
                }
              />
            </Grid.Col>
            {/* Row 3: Street number, Street name (2 columns) */}
            <Grid.Col span={6}>
              <TextInput
                label="Street number"
                placeholder="Street number"
                value={manualFormStreetNumber}
                onChange={(e) =>
                  setManualFormStreetNumber(e.currentTarget.value)
                }
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Street name"
                placeholder="Street name"
                value={manualFormStreetName}
                onChange={(e) => setManualFormStreetName(e.currentTarget.value)}
              />
            </Grid.Col>
            {/* Row 4: Street type, Street suffix (2 columns) */}
            <Grid.Col span={6}>
              <TextInput
                label="Street type"
                placeholder="e.g. Road, Street"
                value={manualFormStreetType}
                onChange={(e) => setManualFormStreetType(e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Street suffix"
                placeholder="e.g. North, East"
                value={manualFormStreetSuffix}
                onChange={(e) =>
                  setManualFormStreetSuffix(e.currentTarget.value)
                }
              />
            </Grid.Col>
            {/* Row 5: Suburb, Postcode (2 columns) */}
            <Grid.Col span={6}>
              <TextInput
                label="Suburb"
                placeholder="Suburb / City"
                value={manualFormSuburb}
                onChange={(e) => setManualFormSuburb(e.currentTarget.value)}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Postcode"
                placeholder="Postcode"
                value={manualFormPostcode}
                onChange={(e) => setManualFormPostcode(e.currentTarget.value)}
              />
            </Grid.Col>
            {/* Row 6: State, Country (2 columns) */}
            <Grid.Col span={6}>
              {manualStateList !== undefined ? (
                <Select
                  label="State / Province"
                  placeholder="State or territory"
                  value={manualFormState || null}
                  onChange={(v) => setManualFormState(v ?? '')}
                  data={manualStateList}
                  clearable
                  searchable
                />
              ) : (
                <TextInput
                  label="State / Province"
                  placeholder="State or province"
                  value={manualFormState}
                  onChange={(e) => setManualFormState(e.currentTarget.value)}
                />
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Country"
                placeholder="Country"
                value={manualFormCountry || null}
                onChange={(v) => {
                  setManualFormCountry(v ?? '');
                  if (v != null && getStatesForCountry(v) === undefined)
                    setManualFormState('');
                }}
                data={manualCountryList}
                searchable
              />
            </Grid.Col>
          </Grid>
          {manualFormError && (
            <Alert variant="light" color="red" title={manualFormError} />
          )}
          <Group justify="flex-end">
            <Button variant="subtle" color="gray" onClick={closeManualModal}>
              Cancel
            </Button>
            <Button onClick={handleManualSubmit}>Use manual address</Button>
          </Group>
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
          error={effectiveError}
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
        error={effectiveError}
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
