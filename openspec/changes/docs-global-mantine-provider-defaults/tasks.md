## 1. Storybook preview

- [x] 1.1 Add a story (e.g. `stories/AddressInput/GlobalDefaults.stories.tsx`) that wraps content in `MantineProvider` with `createTheme({ components: { AddressInput: { defaultProps: { ... } } } })`, supplying `provider` and at least one additional default prop; render `<AddressInput />` without a `provider` prop on the instance.
- [x] 1.2 Reuse the same provider pattern as existing AddressInput stories (mock or `GooglePlacesProvider` + placeholder API key) so the story runs in CI without secrets.

## 2. Docs page (MDX)

- [x] 2.1 Import the new story in `stories/Docs.mdx` and add a `sections` nav entry with anchor id for the new section.
- [x] 2.2 Add a `DocsSection` (after **Providers**, per design) with title/description explaining app-wide defaults via `MantineProvider` / `createTheme` / `components.AddressInput.defaultProps`.
- [x] 2.3 Add an `ExampleBlock` with `<Story of={...} />` preview and a copy-paste snippet covering: `createTheme`, `MantineProvider`, shared `provider`, extra `defaultProps` examples, and minimal `<AddressInput />`; note that instance props override theme defaults.

## 3. Verification

- [x] 3.1 Run Storybook build (or `pnpm build` / project equivalent) and confirm the Docs page renders the new section without MDX errors.
- [x] 3.2 After implementation, archive or update `openspec/specs/documentation/spec.md` from the change delta per project OpenSpec workflow (if required by `/opsx:apply` follow-up).
