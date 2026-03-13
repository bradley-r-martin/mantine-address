import type { Meta, StoryObj } from '@storybook/react';
import { AddressInput } from './AddressInput';

const meta: Meta<typeof AddressInput> = {
  component: AddressInput,
  title: 'AddressInput',
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AddressInput>;

export const Default: Story = {
  args: {
    label: 'Address',
    placeholder: 'Enter address...',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Shipping address',
    defaultValue: '123 Main St',
  },
};
