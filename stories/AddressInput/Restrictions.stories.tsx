/// <reference types="vite/client" />
import { useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  MantineProvider,
  Stack,
  Text,
  Code,
  Group,
  Select,
  Button,
} from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import type { Address } from '@/types';
import { COUNTRIES, REGIONS, REGIONS_US, countries } from '@/regions';
import { GooglePlacesProvider } from '@/providers/GooglePlacesProvider';
import { mockProvider } from '../mocks/addressInputMocks';

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput/Restrictions',
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AddressInput>;

const BUILD_TIME_KEY = import.meta.env['STORYBOOK_GOOGLE_MAPS_API_KEY'] as
  | string
  | undefined;

type ScriptState = 'idle' | 'loading' | 'loaded' | 'error';

const scriptCache: { state: ScriptState; key: string | null } = {
  state: 'idle',
  key: null,
};

function CountryAndRegionControlsStory() {
  const [countryCode, setCountryCode] = useState<string>('AU');
  const [regionAbbrev, setRegionAbbrev] = useState<string | null>(null);

  const apiKey = BUILD_TIME_KEY ?? '';
  const [scriptState, setScriptState] = useState<ScriptState>(() => {
    if (scriptCache.state === 'loaded' && scriptCache.key === apiKey)
      return 'loaded';
    return apiKey ? 'idle' : 'idle';
  });
  const providerRef = useRef<GooglePlacesProvider | null>(null);

  useEffect(() => {
    if (!apiKey) {
      setScriptState('idle');
      return;
    }
    if (scriptCache.state === 'loaded' && scriptCache.key === apiKey) {
      setScriptState('loaded');
      providerRef.current = new GooglePlacesProvider({ apiKey });
      return;
    }
    if (scriptCache.state === 'loaded' && scriptCache.key !== apiKey) {
      setScriptState('error');
      return;
    }
    setScriptState('loading');
    scriptCache.state = 'loading';
    scriptCache.key = apiKey;
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places`;
    script.async = true;
    script.addEventListener('load', () => {
      scriptCache.state = 'loaded';
      providerRef.current = new GooglePlacesProvider({ apiKey });
      setScriptState('loaded');
    });
    script.addEventListener('error', () => {
      scriptCache.state = 'error';
      setScriptState('error');
    });
    document.head.appendChild(script);
  }, [apiKey]);

  const countryOptions = useMemo(
    () => countries.map((c) => ({ value: c.code, label: c.name })),
    []
  );

  const availableRegions = useMemo(() => {
    if (countryCode === 'AU') return Object.values(REGIONS);
    if (countryCode === 'US') return Object.values(REGIONS_US);
    return [];
  }, [countryCode]);

  const regionOptions = useMemo(
    () =>
      availableRegions
        .map((r) => ({
          value: r.abbreviation,
          label: `${r.name} (${r.abbreviation})`,
        }))
        .sort((a, b) => a.label.localeCompare(b.label, 'en')),
    [availableRegions]
  );

  const selectedCountry = COUNTRIES[countryCode];
  const selectedRegion =
    availableRegions.find((r) => r.abbreviation === regionAbbrev) ?? null;

  return (
    <Stack gap="md" style={{ maxWidth: 560 }}>
      <Text size="sm" c="dimmed">
        Uses the built-in <Code>GooglePlacesProvider</Code>. Change the selects
        below to update <Code>restrictions</Code> passed into the AddressInput.
        Region options are available for AU and US.
      </Text>

      <Group align="flex-end" grow>
        <Select
          label="Allowed country"
          searchable
          data={countryOptions}
          value={countryCode}
          onChange={(v) => {
            if (!v) return;
            setCountryCode(v);
            setRegionAbbrev(null);
          }}
        />
        <Select
          label="Allowed region"
          placeholder={
            availableRegions.length
              ? 'Pick a region…'
              : 'No region list for this country'
          }
          data={regionOptions}
          value={regionAbbrev}
          onChange={setRegionAbbrev}
          disabled={!availableRegions.length}
          clearable
        />
      </Group>

      {!apiKey ? (
        <Stack gap="xs">
          <Text size="sm" c="dimmed">
            Set <Code>STORYBOOK_GOOGLE_MAPS_API_KEY</Code> to use Google Places
            in this story.
          </Text>
          <AddressInput
            {...({ provider: null } as unknown as ComponentProps<
              typeof AddressInput
            >)}
            label="Address"
            placeholder="API key missing — manual entry only…"
            restrictions={{
              allowedCountries: selectedCountry ? [selectedCountry] : undefined,
              allowedRegions: selectedRegion ? [selectedRegion] : undefined,
            }}
            defaultAddress={{
              country: selectedCountry?.code,
              state: selectedRegion?.abbreviation,
            }}
            onChange={(address) => console.log('Address:', address)}
          />
        </Stack>
      ) : scriptState === 'loading' ? (
        <Text size="sm">Loading Google Maps…</Text>
      ) : scriptState === 'error' && scriptCache.key !== apiKey ? (
        <Stack gap="xs">
          <Text size="sm" c="red">
            The Google Maps script was already loaded with a different API key.
            Reload the page and re-open this story.
          </Text>
          <Button
            size="xs"
            variant="light"
            onClick={() => window.location.reload()}
          >
            Reload page
          </Button>
        </Stack>
      ) : scriptState === 'error' ? (
        <Text size="sm" c="red">
          Failed to load Google Maps. Ensure your API key is valid and the
          Places API is enabled.
        </Text>
      ) : scriptState === 'loaded' && providerRef.current ? (
        <AddressInput
          provider={providerRef.current}
          label="Address"
          placeholder="Start typing a real address…"
          restrictions={{
            allowedCountries: selectedCountry ? [selectedCountry] : undefined,
            allowedRegions: selectedRegion ? [selectedRegion] : undefined,
          }}
          defaultAddress={{
            country: selectedCountry?.code,
            state: selectedRegion?.abbreviation,
          }}
          onChange={(address) => console.log('Address:', address)}
        />
      ) : null}
    </Stack>
  );
}

export const AustraliaOnly: Story = {
  name: 'Australia only',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        <Code>restrictions={'{{ allowedCountries: [COUNTRIES.AU] }}'}</Code> —
        Country dropdown shows only Australia. Manual submit validated on
        submit.
      </Text>
      <AddressInput
        {...({ provider: null } as unknown as ComponentProps<
          typeof AddressInput
        >)}
        restrictions={{ allowedCountries: [COUNTRIES.AU] }}
        label="Address (Australia only)"
        placeholder="Click to enter address…"
        onChange={(address) => console.log('Address:', address)}
      />
    </Stack>
  ),
};

export const AllowedRegionsNSW: Story = {
  name: 'allowedRegions (REGIONS.NEW_SOUTH_WALES)',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        <Code>
          restrictions=
          {
            '{{ allowedCountries: [COUNTRIES.AU], allowedRegions: [REGIONS.NEW_SOUTH_WALES] }}'
          }
        </Code>{' '}
        — only NSW. With a provider, location bias uses the region&apos;s
        lat/lng/radius.
      </Text>
      <AddressInput
        {...({ provider: null } as unknown as ComponentProps<
          typeof AddressInput
        >)}
        restrictions={{
          allowedCountries: [COUNTRIES.AU],
          allowedRegions: [REGIONS.NEW_SOUTH_WALES],
        }}
        defaultAddress={{ country: 'AU', state: 'NSW' }}
        label="Address (NSW only)"
        placeholder="Click to enter address…"
        onChange={(address) => console.log('Address:', address)}
      />
    </Stack>
  ),
};

export const StateAndPostcode: Story = {
  name: 'State + postcode (NSW, 2000, 2001)',
  render: () => (
    <Stack gap="xs" style={{ maxWidth: 480 }}>
      <Text size="sm" c="dimmed">
        Only NSW addresses with postcode 2000 or 2001 accepted.
      </Text>
      <AddressInput
        {...({ provider: null } as unknown as ComponentProps<
          typeof AddressInput
        >)}
        restrictions={{
          allowedCountries: [COUNTRIES.AU],
          allowedStates: ['NSW'],
          allowedPostcodes: ['2000', '2001'],
        }}
        defaultAddress={{ country: 'AU', state: 'NSW' }}
        label="Address (NSW 2000/2001 only)"
        placeholder="Click to enter address…"
        onChange={(address) => console.log('Address:', address)}
      />
    </Stack>
  ),
};

export const AutocompleteWithRestrictions: Story = {
  name: 'Autocomplete (mock, Australia only)',
  args: {
    provider: mockProvider,
    restrictions: { allowedCountries: [COUNTRIES.AU] },
    label: 'Address (Australia only)',
    placeholder: 'Type "123 Main" — selection rejected (mock returns US)',
    debounce: 300,
    onChange: (address: Address | null) =>
      address != null && console.log('Accepted:', address),
  },
  parameters: {
    docs: {
      description: {
        story:
          'With restrictions, selecting a suggestion validates the resolved address. Mock returns US; only AU allowed, so selection shows an error.',
      },
    },
  },
};

export const CountryAndRegionControls: Story = {
  name: 'Controls: country + region',
  render: () => <CountryAndRegionControlsStory />,
};
