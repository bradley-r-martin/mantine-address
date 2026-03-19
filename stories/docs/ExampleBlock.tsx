import { useState } from 'react';
import { Text, Title, UnstyledButton } from '@mantine/core';
import { IconCode, IconCodeOff } from '@tabler/icons-react';
import { CodeBlock } from './CodeBlock';
import type { ReactNode } from 'react';

export function ExampleBlock(props: {
  title: string;
  description?: ReactNode;
  preview: ReactNode;
  snippet?: string;
}) {
  const { title, description, preview, snippet } = props;
  const [showCode, setShowCode] = useState(false);

  return (
    <div className="rounded-xl border border-docs-border bg-docs-surface overflow-hidden">
      <div className="px-5 pt-5 pb-4">
        <Title order={4} className="text-sm font-semibold">
          {title}
        </Title>
        {description && (
          <Text size="sm" c="dimmed" mt={4}>
            {description}
          </Text>
        )}
      </div>

      <div className="mx-5 mb-4 rounded-lg border border-docs-border bg-docs-bg p-6">
        {preview}
      </div>

      {snippet && (
        <>
          <div className="border-t border-docs-border px-5 py-2.5 flex items-center justify-between bg-docs-bg/50">
            <UnstyledButton
              onClick={() => setShowCode((v) => !v)}
              className="flex items-center gap-1.5 text-xs font-medium text-docs-muted hover:text-docs-accent transition-colors"
            >
              {showCode ? (
                <IconCodeOff size={15} stroke={1.5} />
              ) : (
                <IconCode size={15} stroke={1.5} />
              )}
              {showCode ? 'Hide code' : 'Show code'}
            </UnstyledButton>
          </div>

          {showCode && (
            <div className="border-t border-docs-border">
              <CodeBlock code={snippet} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
