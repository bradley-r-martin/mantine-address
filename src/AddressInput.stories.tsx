import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { MantineProvider } from '@mantine/core';
import { AddressInput } from './AddressInput';

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput',
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

export const Default: Story = {
  args: {
    label: 'Address',
    placeholder: 'Enter address...',
  },
};

export const Uncontrolled: Story = {
  name: 'Uncontrolled (defaultValue)',
  args: {
    label: 'Shipping address',
    defaultValue: '123 Main St',
    placeholder: 'Enter address...',
  },
};

export const Controlled: Story = {
  name: 'Controlled (value + onChange)',
  render: function ControlledStory() {
    const [value, setValue] = useState('123 Main St');
    return (
      <AddressInput
        label="Shipping address"
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        placeholder="Enter address..."
      />
    );
  },
};

export const WithError: Story = {
  args: {
    label: 'Address',
    placeholder: 'Enter address...',
    error: 'A valid address is required',
  },
};
