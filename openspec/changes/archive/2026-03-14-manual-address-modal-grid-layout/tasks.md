## 1. Grid layout structure

- [x] 1.1 In `AddressInput.tsx`, replace the manual-entry modal's inner `Stack` with a Mantine `Grid` (or `SimpleGrid`) and ensure the modal body still uses `ScrollArea.Autosize` with the same max height
- [x] 1.2 Implement Row 1: three columns for Unit, Lot no, Level (equal span); Row 2: full-width column for Building name; Row 3: two columns for Street number, Street name; Row 4: two columns for Street type, Street suffix; Row 5: two columns for Suburb, Postcode; Row 6: two columns for State, Country
- [x] 1.3 Ensure Building name spans the full width of the form and multi-column rows distribute space evenly (e.g. equal `span` per column)

## 2. Field order and actions

- [x] 2.1 Reorder all manual form `TextInput` components so DOM order matches the grid rows (Unit, Lot no, Level, then Building name, then Street no/name, etc.) so tab order matches the layout
- [x] 2.2 Keep Save and Cancel buttons below the grid (same behaviour); ensure no change to submit or close handlers

## 3. Verification and docs

- [x] 3.1 Manually verify in Storybook that the manual-entry modal shows the new grid layout, field order, and full-width Building name; check at least one narrow viewport for responsiveness
- [x] 3.2 Run existing tests for manual entry (form submit, cancel, field presence); add or adjust tests if any assert vertical stack structure (e.g. DOM order or layout), and add a test that asserts grid layout / field order per spec where appropriate
