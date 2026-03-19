import { create } from '@storybook/theming';

export default create({
  base: 'light',

  brandTitle: 'mantine-address',
  brandUrl: 'https://github.com/bradley-r-martin/mantine-address',

  // Colors
  colorPrimary: '#7c3aed',
  colorSecondary: '#7c3aed',

  // UI
  appBg: '#faf8ff',
  appContentBg: '#ffffff',
  appPreviewBg: '#ffffff',
  appBorderColor: '#ede9fe',
  appBorderRadius: 8,

  // Text
  textColor: '#1e1b2e',
  textInverseColor: '#ffffff',
  textMutedColor: '#6d6590',

  // Toolbar
  barTextColor: '#6d6590',
  barSelectedColor: '#7c3aed',
  barHoverColor: '#5b21b6',
  barBg: '#faf8ff',

  // Inputs
  inputBg: '#ffffff',
  inputBorder: '#ddd6fe',
  inputTextColor: '#1e1b2e',
  inputBorderRadius: 6,

  // Booleans
  booleanBg: '#ede9fe',
  booleanSelectedBg: '#7c3aed',

  // Button
  buttonBg: '#7c3aed',
  buttonBorder: '#7c3aed',
});
