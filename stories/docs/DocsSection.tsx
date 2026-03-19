import { Title, Text } from '@mantine/core';
import type { ReactNode } from 'react';

function toKebab(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function DocsSection(props: {
  title: string;
  id?: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  const { title, description, children } = props;
  const sectionId = props.id ?? toKebab(title);

  return (
    <section id={sectionId} className="scroll-mt-8">
      <div className="mb-6">
        <Title order={2} className="text-xl font-semibold tracking-tight mb-1">
          <a
            href={`#${sectionId}`}
            className="text-inherit no-underline hover:underline decoration-docs-accent/40 underline-offset-4"
          >
            {title}
          </a>
        </Title>
        {description && (
          <Text size="sm" c="dimmed" className="leading-relaxed max-w-2xl">
            {description}
          </Text>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  );
}
