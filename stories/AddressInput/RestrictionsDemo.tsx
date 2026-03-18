import { useState, useMemo } from 'react';
import type { ComponentProps } from 'react';
import { Stack, Group, Select, Text } from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import { countries, COUNTRIES, getStatesForCountry } from '@/regions';
import type { AddressLookupProvider } from '@/types';

const COUNTRY_OPTIONS = [
  { value: '', label: 'Any' },
  ...countries.map((c) => ({ value: c.code, label: c.name })),
];

export interface RestrictionsDemoProps {
  provider?: AddressLookupProvider | null;
  label?: string;
  placeholder?: string;
  debounce?: number;
  onChange?: (address: import('@/types').Address | null) => void;
}

export function RestrictionsDemo({
  provider = null,
  label = 'Address',
  placeholder = 'Click to enter address…',
  debounce,
  onChange,
}: RestrictionsDemoProps) {
  const [countryCode, setCountryCode] = useState<string>('');
  const [regionCode, setRegionCode] = useState<string>('');

  const regionOptions = useMemo(() => {
    if (!countryCode) return [];
    const states = getStatesForCountry(countryCode);
    if (!states) return [];
    return [
      { value: '', label: 'Any region' },
      ...states.map((s) => ({ value: s.code, label: s.name })),
    ];
  }, [countryCode]);

  const hasRegions = regionOptions.length > 0;

  const accept = useMemo(() => {
    if (!countryCode) return undefined;
    const country = COUNTRIES[countryCode];
    const base = { country: country ?? countryCode };
    if (regionCode && countryCode) {
      return { ...base, region: regionCode };
    }
    return base;
  }, [countryCode, regionCode]);

  const addressInputProps = {
    provider: provider as ComponentProps<typeof AddressInput>['provider'],
    accept,
    label,
    placeholder,
    ...(debounce != null && { debounce }),
    onChange,
  };

  return (
    <Stack gap="md" style={{ maxWidth: 480 }}>
      <Group wrap="nowrap" align="flex-end" gap="sm">
        <Select
          label="Restrict to country"
          placeholder="Any"
          data={COUNTRY_OPTIONS}
          value={countryCode || null}
          onChange={(v) => {
            setCountryCode(v ?? '');
            setRegionCode('');
          }}
          clearable
          searchable
          style={{ flex: 1 }}
        />
        <Select
          label="Restrict to region (state)"
          placeholder="Any region"
          data={hasRegions ? regionOptions : [{ value: '', label: '—' }]}
          value={hasRegions ? regionCode || null : null}
          onChange={(v) => setRegionCode(v ?? '')}
          clearable
          searchable
          disabled={!hasRegions}
          style={{ flex: 1 }}
        />
      </Group>
      {accept && (
        <Text size="sm" c="dimmed">
          accept={'{{'} country: {countryCode}
          {regionCode && `, region: '${regionCode}'`} {'}}'}
        </Text>
      )}
      <AddressInput {...addressInputProps} />
    </Stack>
  );
}
