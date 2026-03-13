import { TextInput, factory, useProps } from '@mantine/core';
import type { Factory } from '@mantine/core';
import type { ComponentPropsWithoutRef } from 'react';

export type AddressInputProps = ComponentPropsWithoutRef<typeof TextInput> & {
  /** Label for the address field. Defaults to "Address". */
  label?: string;
};

export type AddressInputFactory = Factory<{
  props: AddressInputProps;
  ref: HTMLInputElement;
}>;

const defaultProps = {
  label: 'Address',
  placeholder: 'Enter address...',
} satisfies Partial<AddressInputProps>;

/**
 * Address input component. Wraps Mantine TextInput for consistency with
 * other Mantine inputs: supports value, onChange, defaultValue, label,
 * placeholder, error, description, and all standard TextInput props.
 * Uses factory and useProps so defaultProps and theme.components.AddressInput
 * can be set on MantineProvider.
 */
export const AddressInput = factory<AddressInputFactory>((_props, ref) => {
  const props = useProps('AddressInput', defaultProps, _props);
  const { label, placeholder, ...rest } = props;
  return (
    <TextInput ref={ref} label={label} placeholder={placeholder} {...rest} />
  );
});

AddressInput.displayName = 'AddressInput';
