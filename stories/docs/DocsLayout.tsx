import { DocsHero } from './DocsHero';
import { DocsNav, type NavItem } from './DocsNav';
import type { ReactNode } from 'react';

export function DocsLayout(props: {
  title: string;
  tagline: ReactNode;
  badges?: string[];
  sections: NavItem[];
  children: ReactNode;
}) {
  const { title, tagline, badges, sections, children } = props;

  return (
    <div className="sb-unstyled min-h-screen bg-docs-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <DocsHero title={title} tagline={tagline} badges={badges} />

        <div className="mt-10 lg:mt-14 lg:grid lg:grid-cols-[1fr_200px] lg:gap-10">
          <main className="min-w-0 space-y-14">{children}</main>
          <aside className="hidden lg:block">
            <DocsNav items={sections} />
          </aside>
        </div>
      </div>
    </div>
  );
}
