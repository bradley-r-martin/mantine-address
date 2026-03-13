import { TextInput } from '@mantine/core';
import type { ComponentPropsWithoutRef } from 'react';

export type AddressInputProps = ComponentPropsWithoutRef<typeof TextInput> & {
  /** Label for the address field. Defaults to "Address". */
  label?: string;
};

/**
 * Address input component. Wraps Mantine TextInput for consistency with
 * other Mantine inputs: supports value, onChange, defaultValue, label,
 * placeholder, error, description, and all standard TextInput props.
 */
export function AddressInput({
  label = 'Address',
  placeholder = 'Enter address...',
  ...props
}: AddressInputProps) {
  return <TextInput label={label} placeholder={placeholder} {...props} />;
}
