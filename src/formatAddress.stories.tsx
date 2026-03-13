import type { Meta, StoryObj } from '@storybook/react';
import {
  MantineProvider,
  Stack,
  Text,
  Code,
  Title,
  Divider,
} from '@mantine/core';
import {
  addressToString,
  addressToStreetString,
  addressToEnvelopeString,
} from './formatAddress';
import type { Address } from './types';

const meta: Meta = {
  title: 'Address Formatting',
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

type Story = StoryObj;

function FormattingDemo({
  address,
  label,
}: {
  address: Address;
  label: string;
}) {
  const street = addressToStreetString(address);
  const single = addressToString(address);
  const envelope = addressToEnvelopeString(address);
  const envelopeUpper = addressToEnvelopeString(address, { uppercase: true });

  return (
    <Stack gap="md">
      <Text size="sm" fw={500} c="dimmed">
        {label}
      </Text>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          addressToStreetString
        </Text>
        <Code block>{street || '(empty)'}</Code>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          addressToString
        </Text>
        <Code block>{single || '(empty)'}</Code>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          addressToEnvelopeString
        </Text>
        <Code block>{envelope || '(empty)'}</Code>
      </Stack>
      <Stack gap="xs">
        <Text size="sm" fw={600}>
          addressToEnvelopeString(..., {'{ uppercase: true }'})
        </Text>
        <Code block>{envelopeUpper || '(empty)'}</Code>
      </Stack>
    </Stack>
  );
}

const fullAddress: Address = {
  place_id: 'ChIJN1t_tDeuEmsRUsoyG83frY4',
  unit: '5',
  building_name: 'Tower A',
  level: '2',
  street_number: '123',
  street_name: 'Collins',
  street_type: 'St',
  suburb: 'Melbourne',
  state: 'VIC',
  postcode: '3000',
  country: 'AU',
};

const minimalAddress: Address = {
  street_name: 'Only Street',
  suburb: 'Town',
};

const usAddress: Address = {
  street_number: '1600',
  street_name: 'Pennsylvania Avenue',
  street_type: 'NW',
  suburb: 'Washington',
  state: 'DC',
  postcode: '20500',
  country: 'US',
};

const withSuffix: Address = {
  street_number: '42',
  street_name: 'Main',
  street_type: 'St',
  street_suffix: 'N',
  suburb: 'Sydney',
  state: 'NSW',
  postcode: '2000',
  country: 'AU',
};

export const FullAddress: Story = {
  name: 'Full address (all fields)',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>Formatting a full address</Title>
      <FormattingDemo
        address={fullAddress}
        label="Address with unit, building, level, street components, suburb, state, postcode, country."
      />
    </Stack>
  ),
};

export const MinimalAddress: Story = {
  name: 'Minimal address',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>Minimal address</Title>
      <FormattingDemo
        address={minimalAddress}
        label="Only street name and suburb; other formatters omit missing fields."
      />
    </Stack>
  ),
};

export const USAddress: Story = {
  name: 'US-style address',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>US address</Title>
      <FormattingDemo
        address={usAddress}
        label="Uniform Address works for any region; formatting is region-agnostic."
      />
    </Stack>
  ),
};

export const WithStreetSuffix: Story = {
  name: 'With street suffix',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>Address with street suffix</Title>
      <FormattingDemo
        address={withSuffix}
        label="street_suffix (e.g. N, S, E, W) included in street line."
      />
    </Stack>
  ),
};

export const AllVariants: Story = {
  name: 'All variants side by side',
  render: () => (
    <Stack gap="xl">
      <Title order={3}>Address formatting utilities</Title>
      <Text size="sm" c="dimmed">
        addressToString, addressToStreetString, and addressToEnvelopeString
        operate on the uniform Address type. Optional fields are omitted.
      </Text>
      <Divider />
      <FormattingDemo address={fullAddress} label="Full (AU)" />
      <Divider />
      <FormattingDemo address={minimalAddress} label="Minimal" />
      <Divider />
      <FormattingDemo address={usAddress} label="US" />
    </Stack>
  ),
};
