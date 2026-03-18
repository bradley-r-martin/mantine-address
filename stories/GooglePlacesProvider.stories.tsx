/// <reference types="vite/client" />
import { useState, useEffect, useRef } from 'react';
import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider, Button, Text, Stack, Code } from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import type { Address } from '@/types';
import { international, australian } from '@/formatters';
import { GooglePlacesProvider } from '@/providers/GooglePlacesProvider';
import { COUNTRIES } from '@/regions';
import AUSTRALIA from '@/regions/states-au';

const BUILD_TIME_KEY = import.meta.env['STORYBOOK_GOOGLE_MAPS_API_KEY'] as
  | string
  | undefined;

type ScriptState = 'idle' | 'loading' | 'loaded' | 'error';

const scriptCache: { state: ScriptState; key: string | null } = {
  state: 'idle',
  key: null,
};

interface GooglePlacesDemoProps extends Partial<
  ComponentProps<typeof AddressInput>
> {
  apiKey: string;
}

function GooglePlacesDemo({
  apiKey,
  ...addressInputProps
}: GooglePlacesDemoProps) {
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

  if (!apiKey) {
    return (
      <Stack gap="xs" p="md" style={{ maxWidth: 480 }}>
        <Text size="sm" c="dimmed">
          Paste your Google Maps API key in the <strong>Controls</strong> panel
          to test live address lookup.
        </Text>
        <Text size="xs" c="dimmed">
          Restrict the key to <Code>http://localhost:*</Code> and your Storybook
          URL in Google Cloud Console.
        </Text>
      </Stack>
    );
  }

  if (scriptState === 'loading') {
    return (
      <Stack gap="xs" p="md">
        <Text size="sm">Loading Google Maps…</Text>
      </Stack>
    );
  }

  if (scriptState === 'error' && scriptCache.key !== apiKey) {
    return (
      <Stack gap="xs" p="md">
        <Text size="sm" c="red">
          The Google Maps script was already loaded with a different API key.
          Reload the page and enter the new key.
        </Text>
        <Button
          size="xs"
          variant="light"
          onClick={() => window.location.reload()}
        >
          Reload page
        </Button>
      </Stack>
    );
  }

  if (scriptState === 'error') {
    return (
      <Stack gap="xs" p="md">
        <Text size="sm" c="red">
          Failed to load Google Maps. Ensure your API key is valid and the{' '}
          <strong>Places API</strong> is enabled.
        </Text>
      </Stack>
    );
  }

  if (scriptState === 'loaded' && providerRef.current) {
    return (
      <AddressInput
        provider={providerRef.current}
        label={addressInputProps.label ?? 'Address'}
        placeholder={
          addressInputProps.placeholder ?? 'Start typing an address…'
        }
        onChange={(address) =>
          address != null && console.log('[GooglePlaces] selected:', address)
        }
        style={{ maxWidth: 480 }}
        {...addressInputProps}
      />
    );
  }

  return null;
}

const meta: Meta<typeof GooglePlacesDemo> = {
  component: GooglePlacesDemo,
  title: 'Google Places Provider',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Stories for **AddressInput** using the built-in **GooglePlacesProvider**. ' +
          'Requires a Google Maps API key with the Places API enabled. ' +
          'The provider uses Google’s Autocomplete (getPlacePredictions) and Place Details; ' +
          'when restrictions are set, it passes `allowedCountries` as `componentRestrictions` to filter suggestions by country.',
      },
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
  argTypes: {
    apiKey: {
      name: 'Google Maps API Key',
      description:
        'API key with Places API enabled. Can be set via STORYBOOK_GOOGLE_MAPS_API_KEY at build time.',
      control: { type: 'text' },
      table: { type: { summary: 'string' } },
    },
    debounce: {
      name: 'Debounce (ms)',
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      table: { defaultValue: { summary: '300' } },
    },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
};

export default meta;

type Story = StoryObj<typeof GooglePlacesDemo>;

export const Default: Story = {
  name: 'Default',
  args: {
    apiKey: BUILD_TIME_KEY ?? '',
    debounce: 300,
    label: 'Address',
    placeholder: 'Start typing a real address…',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Basic Google Places autocomplete. Type an address to see suggestions from the Places API.',
      },
    },
  },
};

export const RestrictionsAustraliaOnly: Story = {
  name: 'Restrictions / Australia only',
  args: {
    apiKey: BUILD_TIME_KEY ?? '',
    debounce: 300,
    label: 'Address (Australia only)',
    placeholder: 'Type an address in Australia…',
    restrictions: { allowedCountries: [COUNTRIES.AU] },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Restricts suggestions to Australia using Google’s componentRestrictions. ' +
          'Only Australian addresses appear in the dropdown; selecting one still runs client-side validation.',
      },
    },
  },
};

export const RestrictionsNSWOnly: Story = {
  name: 'Restrictions / NSW only',
  args: {
    apiKey: BUILD_TIME_KEY ?? '',
    debounce: 300,
    label: 'Address (NSW only)',
    placeholder: 'Type an address in NSW, Australia…',
    restrictions: {
      allowedCountries: [COUNTRIES.AU],
      allowedRegions: [AUSTRALIA.REGIONS.NEW_SOUTH_WALES],
    },
    format: australian,
    defaultAddress: { country: 'AU', state: 'NSW' },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Uses allowedRegions with REGIONS.NEW_SOUTH_WALES. Google biases results to NSW (location + radius); only NSW addresses accepted. ' +
          'Pass allowedCountries: [COUNTRIES.AU] when using allowedRegions.',
      },
    },
  },
};

export const RestrictionsVictoriaOnly: Story = {
  name: 'Restrictions / Victoria only',
  args: {
    apiKey: BUILD_TIME_KEY ?? '',
    debounce: 300,
    label: 'Address (Victoria only)',
    placeholder: 'Type an address in Victoria, Australia…',
    restrictions: {
      allowedCountries: [COUNTRIES.AU],
      allowedRegions: [AUSTRALIA.REGIONS.VICTORIA],
    },
    format: australian,
    defaultAddress: { country: 'AU', state: 'VIC' },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Uses allowedRegions with REGIONS.VICTORIA. Google biases results to Victoria (location + radius); only VIC addresses accepted. ' +
          'Pass allowedCountries: [COUNTRIES.AU] when using allowedRegions.',
      },
    },
  },
};

export const AustralianFormat: Story = {
  name: 'Australian format',
  args: {
    apiKey: BUILD_TIME_KEY ?? '',
    debounce: 300,
    label: 'Address',
    placeholder: 'Start typing…',
    format: australian,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Selected address is displayed using the Australian formatter (state as code, comma-separated).',
      },
    },
  },
};

export const WithDefaultAddress: Story = {
  name: 'With default address (manual form)',
  args: {
    apiKey: BUILD_TIME_KEY ?? '',
    debounce: 300,
    label: 'Address',
    placeholder: 'Type or click to enter manually…',
    defaultAddress: { country: 'AU', state: 'NSW' },
  },
  parameters: {
    docs: {
      description: {
        story:
          'When the user chooses "Enter manually", the manual form opens with Country and State pre-filled (e.g. Australia, NSW).',
      },
    },
  },
};

function ControlledGoogleStory() {
  const [address, setAddress] = useState<Address | null>(null);
  return (
    <Stack gap="md" style={{ maxWidth: 480 }}>
      <GooglePlacesDemo
        apiKey={BUILD_TIME_KEY ?? ''}
        debounce={300}
        label="Address (controlled)"
        placeholder="Select an address…"
        value={address}
        onChange={setAddress}
      />
      {address != null && (
        <Stack gap="xs">
          <Text size="sm" fw={500}>
            Selected:
          </Text>
          <Code block>{international.toString(address)}</Code>
          <Button variant="light" size="xs" onClick={() => setAddress(null)}>
            Clear
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export const Controlled: Story = {
  name: 'Controlled with display',
  render: () => <ControlledGoogleStory />,
  parameters: {
    docs: {
      description: {
        story:
          'Controlled usage: selected address is shown below; Clear resets the field.',
      },
    },
  },
};

export const RestrictionsAustraliaOnlyWithFormat: Story = {
  name: 'Restrictions / Australia only + format',
  args: {
    apiKey: BUILD_TIME_KEY ?? '',
    debounce: 300,
    label: 'Australian address',
    placeholder: 'Type an Australian address…',
    restrictions: { allowedCountries: [COUNTRIES.AU] },
    format: australian,
    defaultAddress: { country: 'AU' },
  },
  parameters: {
    docs: {
      description: {
        story:
          'Combines country restriction (Australia only), Australian display format, and a default country for the manual form.',
      },
    },
  },
};
