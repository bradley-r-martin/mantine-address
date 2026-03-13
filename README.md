# mantine-address-input

Mantine plugin providing a reusable address input component for [Mantine](https://mantine.dev) apps.

## Install

```bash
npm install mantine-address-input @mantine/core react
```

## Usage

```tsx
import { AddressInput } from 'mantine-address-input';

<AddressInput label="Shipping address" placeholder="Enter address..." />;
```

See [Storybook](https://your-org.github.io/mantine-address-input/) for more examples (published on releases).

## Development

- **Format:** `npm run format` (write) / `npm run format:check` (check)
- **Lint:** `npm run lint`
- **Test:** `npm run test`
- **Build:** `npm run build`
- **Storybook:** `npm run storybook` (dev) / `npm run build:storybook` (static build)

PRs must target the `next` branch; the PR branch name must match an OpenSpec change (e.g. `setup-library`). CI runs tests, format, lint, commit message, build, and OpenSpec checks. See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch strategy, branch naming, commits, pre-commit hooks, and releases.
