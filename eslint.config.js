import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import react from 'eslint-plugin-react';
import prettier from 'eslint-config-prettier';

export default [
  {
    ignores: [
      'node_modules',
      'dist',
      'coverage',
      'storybook-static',
      '*.config.js',
      '.git',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: { react },
    languageOptions: {
      parserOptions: { ecmaFeatures: { jsx: true } },
      globals: { React: 'readonly', JSX: 'readonly' },
    },
    settings: { react: { version: 'detect' } },
    rules: {
      ...react.configs.recommended.rules,
      'react/react-in-jsx-scope': 'off',
    },
  },
  prettier,
];
