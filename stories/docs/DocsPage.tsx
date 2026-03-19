import {
  Box,
  Container,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { IconBook2 } from '@tabler/icons-react';
import type { ReactNode } from 'react';

export function DocsPage(props: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  const { title, description, children } = props;

  return (
    <Container fluid px="xl" py="xl">
      <Paper withBorder radius="lg" p="xl">
        <Stack gap="lg">
          <Box>
            <Stack gap="xs">
              <ThemeIcon variant="light" size="lg" radius="md">
                <IconBook2 />
              </ThemeIcon>
              <Title order={1}>{title}</Title>
              {description && <Text c="dimmed">{description}</Text>}
            </Stack>
          </Box>
          {children}
        </Stack>
      </Paper>
    </Container>
  );
}
