import { Source } from '@storybook/blocks';
import {
  Box,
  CopyButton,
  Divider,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import type { ReactNode } from 'react';

export function ExampleBlock(props: {
  title: string;
  description?: ReactNode;
  preview: ReactNode;
  snippet?: string;
}) {
  const { title, description, preview, snippet } = props;

  return (
    <Paper withBorder radius="md" p="lg">
      <Stack gap="md">
        <Box>
          <Title order={3}>{title}</Title>
          {description && (
            <Text c="dimmed" mt={4}>
              {description}
            </Text>
          )}
        </Box>

        <Grid gutter="lg" align="stretch">
          <Grid.Col span={{ base: 12, md: snippet ? 6 : 12 }}>
            <Box>{preview}</Box>
          </Grid.Col>

          {snippet && (
            <Grid.Col span={{ base: 12, md: 6 }}>
              <Stack gap="xs">
                <Group justify="space-between" align="center">
                  <Text fw={500} size="sm">
                    Code
                  </Text>
                  <CopyButton value={snippet}>
                    {({ copied, copy }) => (
                      <Text
                        size="sm"
                        c={copied ? 'teal' : 'dimmed'}
                        style={{ cursor: 'pointer' }}
                        onClick={copy}
                      >
                        {copied ? 'Copied' : 'Copy'}
                      </Text>
                    )}
                  </CopyButton>
                </Group>
                <Divider />
                <Source code={snippet} language="tsx" />
              </Stack>
            </Grid.Col>
          )}
        </Grid>
      </Stack>
    </Paper>
  );
}
