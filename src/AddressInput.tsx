import type { ComponentPropsWithoutRef } from 'react';

export interface AddressInputProps extends ComponentPropsWithoutRef<'input'> {
  /** Label for the address field */
  label?: string;
}

/**
 * Address input component for Mantine. Placeholder until full implementation.
 */
export function AddressInput({
  label = 'Address',
  ...props
}: AddressInputProps) {
  return (
    <label>
      {label}
      <input type="text" placeholder="Enter address..." {...props} />
    </label>
  );
}
