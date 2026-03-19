import type { Preview } from '@storybook/react';
import { MantineProvider } from '@mantine/core';
import { DocsContainer } from '@storybook/blocks';
import '@mantine/core/styles.css';

const preview: Preview = {
  parameters: {
    layout: 'fullscreen',
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      container: ({ children, context }) => (
        <DocsContainer context={context}>
          <MantineProvider>
            <style>{`
              .sbdocs-wrapper { padding: 0 !important; }
              .sbdocs-content { max-width: none !important; padding: 0 !important; }
              .sbdocs { max-width: none !important; }
              #storybook-docs { max-width: none !important; }
              .docs-story, .sbdocs-preview { max-width: none !important; }
            `}</style>
            {children}
          </MantineProvider>
        </DocsContainer>
      ),
    },
  },
  decorators: [
    (Story) => (
      <MantineProvider>
        <Story />
      </MantineProvider>
    ),
  ],
};

export default preview;
