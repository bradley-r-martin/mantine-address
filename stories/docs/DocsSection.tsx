import { Box, Divider, Stack, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';

export function DocsSection(props: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  const { title, description, children } = props;

  return (
    <Box>
      <Stack gap="xs">
        <Box>
          <Title order={2}>{title}</Title>
          {description && <Text c="dimmed">{description}</Text>}
        </Box>
        <Divider />
        {children}
      </Stack>
    </Box>
  );
}
