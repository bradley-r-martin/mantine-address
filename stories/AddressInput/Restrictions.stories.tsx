import type { ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider, Stack, Text, Code } from '@mantine/core';
import { AddressInput } from '@/AddressInput';
import type { Address } from '@/types';
import { COUNTRIES, REGIONS } from '@/regions';
import { mockProvider } from '../mocks/addressInputMocks';

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput/Restrictions',
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Examples of restricting which addresses are accepted (country/region/state/postcode). These stories are provider-agnostic (manual-only or mock provider).',
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
};

export default meta;
type Story = StoryObj<typeof AddressInput>;

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
