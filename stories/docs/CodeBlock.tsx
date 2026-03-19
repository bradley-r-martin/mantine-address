import { Source } from '@storybook/blocks';
import { CopyButton } from '@mantine/core';
import { IconCheck, IconCopy } from '@tabler/icons-react';
import { useState } from 'react';

type CodeVariant = {
  label: string;
  code: string;
  language?: string;
};

export function CodeBlock(props: {
  code?: string;
  language?: string;
  variants?: CodeVariant[];
  compact?: boolean;
}) {
  const { code, language = 'tsx', variants, compact } = props;
  const [activeTab, setActiveTab] = useState(0);

  const isTabbed = variants && variants.length > 1;
  const activeCode = isTabbed ? variants[activeTab].code : (code ?? '');
  const activeLang = isTabbed
    ? (variants[activeTab].language ?? 'tsx')
    : language;

  if (compact) {
    return (
      <div className="inline-flex items-center rounded-lg bg-white/5 border border-white/8">
        {isTabbed && (
          <div className="flex border-r border-white/8">
            {variants.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setActiveTab(i)}
                className={`px-2.5 py-1.5 text-[11px] font-medium transition-colors cursor-pointer border-0 bg-transparent first:rounded-l-lg ${
                  i === activeTab
                    ? 'bg-white/10 text-white'
                    : 'text-white/40 hover:text-white/70'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}
        <code className="px-3 py-1.5 text-[13px] font-mono text-violet-300">
          {activeCode}
        </code>
        <CopyButton value={activeCode}>
          {({ copied, copy }) => (
            <button
              onClick={copy}
              className="px-2.5 py-1.5 border-0 bg-transparent cursor-pointer text-white/30 hover:text-white/70 transition-colors border-l border-white/8"
            >
              {copied ? (
                <IconCheck
                  size={13}
                  stroke={1.5}
                  className="text-emerald-400"
                />
              ) : (
                <IconCopy size={13} stroke={1.5} />
              )}
            </button>
          )}
        </CopyButton>
      </div>
    );
  }

  return (
    <div className="rounded-lg overflow-hidden bg-docs-code-bg">
      <div className="flex items-center justify-between px-4 py-2 bg-docs-code-surface border-b border-white/6">
        {isTabbed ? (
          <div className="flex gap-1">
            {variants.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setActiveTab(i)}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer border-0 bg-transparent ${
                  i === activeTab
                    ? 'bg-white/10 text-white'
                    : 'text-white/50 hover:text-white/80'
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        ) : (
          <span className="text-xs font-medium text-white/40 uppercase tracking-wider">
            {activeLang}
          </span>
        )}

        <CopyButton value={activeCode}>
          {({ copied, copy }) => (
            <button
              onClick={copy}
              className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/80 transition-colors bg-transparent border-0 p-0 cursor-pointer"
            >
              {copied ? (
                <>
                  <IconCheck size={14} stroke={1.5} />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <IconCopy size={14} stroke={1.5} />
                  <span>Copy</span>
                </>
              )}
            </button>
          )}
        </CopyButton>
      </div>

      <div className="docs-source-override">
        <Source code={activeCode} language={activeLang} dark />
      </div>
    </div>
  );
}
