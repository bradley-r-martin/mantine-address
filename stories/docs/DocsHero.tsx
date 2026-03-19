import { Badge } from '@mantine/core';
import { IconBrandGithub, IconMapPin } from '@tabler/icons-react';
import { CodeBlock } from './CodeBlock';
import type { ReactNode } from 'react';

function HeroGraphic() {
  return (
    <div className="relative w-full h-full min-h-[280px] flex items-center justify-center">
      {/* Glow backdrop */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-violet-500/20 blur-3xl" />
      </div>

      {/* Address card mockup */}
      <div className="relative w-64">
        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-5 space-y-3 shadow-2xl">
          {/* Input skeleton */}
          <div className="flex items-center gap-2.5">
            <div className="w-5 h-5 rounded-md bg-violet-500/30 flex items-center justify-center shrink-0">
              <IconMapPin size={12} stroke={2} className="text-violet-300" />
            </div>
            <div className="h-3 rounded-full bg-white/15 flex-1" />
          </div>

          <div className="border-t border-white/6" />

          {/* Field rows */}
          <div className="space-y-2.5">
            <div className="flex gap-2">
              <div className="h-2.5 rounded-full bg-white/8 flex-2" />
              <div className="h-2.5 rounded-full bg-white/8 flex-1" />
            </div>
            <div className="flex gap-2">
              <div className="h-2.5 rounded-full bg-white/8 flex-1" />
              <div className="h-2.5 rounded-full bg-violet-400/15 flex-1" />
              <div className="h-2.5 rounded-full bg-white/8 flex-[0.6]" />
            </div>
            <div className="flex gap-2">
              <div className="h-2.5 rounded-full bg-white/8 flex-1" />
              <div className="h-2.5 rounded-full bg-white/8 flex-[1.5]" />
            </div>
          </div>

          <div className="border-t border-white/6" />

          {/* Country badge row */}
          <div className="flex items-center gap-2">
            <div className="px-2 py-0.5 rounded bg-violet-500/20 text-[10px] font-medium text-violet-300">
              AU
            </div>
            <div className="h-2 rounded-full bg-white/6 flex-1" />
          </div>
        </div>

        {/* Floating suggestion dropdown */}
        <div className="absolute -right-4 top-4 w-48 rounded-lg border border-white/8 bg-white/4 backdrop-blur-sm p-2.5 space-y-1.5 shadow-xl">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-md bg-violet-500/10">
            <div className="w-1.5 h-1.5 rounded-full bg-violet-400" />
            <div className="h-2 rounded-full bg-white/20 flex-1" />
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="h-2 rounded-full bg-white/8 flex-1" />
          </div>
          <div className="flex items-center gap-2 px-2 py-1.5">
            <div className="w-1.5 h-1.5 rounded-full bg-white/20" />
            <div className="h-2 rounded-full bg-white/8 flex-[0.7]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DocsHero(props: {
  title: string;
  tagline: ReactNode;
  badges?: string[];
}) {
  const { title, tagline, badges } = props;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-docs-gradient-from via-docs-gradient-via to-docs-gradient-to p-px">
      <div className="rounded-[calc(1rem-1px)] relative overflow-hidden">
        {/* Rich gradient background */}
        <div className="absolute inset-0 bg-[#0f0b1f]" />
        <div className="absolute inset-0 bg-linear-to-br from-violet-950/80 via-[#0f0b1f] to-fuchsia-950/40" />
        <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-violet-500/[0.07] to-transparent" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-linear-to-tl from-fuchsia-500/6 to-transparent" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="relative z-10 px-8 py-12 sm:px-12 sm:py-16">
          <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-center">
            {/* Left: content */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-linear-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
                  <IconMapPin size={20} stroke={1.5} className="text-white" />
                </div>
                {badges && badges.length > 0 && (
                  <div className="flex gap-2">
                    {badges.map((b) => (
                      <Badge
                        key={b}
                        variant="light"
                        color="violet"
                        size="sm"
                        radius="sm"
                      >
                        {b}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="https://github.com/bradley-r-martin/mantine-address"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 transition-colors no-underline mb-3"
              >
                <IconBrandGithub size={14} stroke={1.5} />
                bradley-r-martin/mantine-address
              </a>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-3">
                {title}
              </h1>
              <p className="text-base sm:text-lg text-white/55 leading-relaxed mb-8 max-w-xl">
                {tagline}
              </p>

              <CodeBlock
                compact
                variants={[
                  {
                    label: 'npm',
                    code: 'npm install mantine-address',
                    language: 'bash',
                  },
                  {
                    label: 'yarn',
                    code: 'yarn add mantine-address',
                    language: 'bash',
                  },
                  {
                    label: 'pnpm',
                    code: 'pnpm add mantine-address',
                    language: 'bash',
                  },
                ]}
              />
            </div>

            {/* Right: infographic */}
            <div className="hidden lg:block">
              <HeroGraphic />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
