import { useEffect, useRef, useState } from 'react';
import type { ComponentType } from 'react';

export type NavItem = {
  label: string;
  id: string;
  icon?: ComponentType<{ size?: number; stroke?: number; className?: string }>;
};

export function DocsNav(props: { items: NavItem[] }) {
  const { items } = props;
  const [activeId, setActiveId] = useState<string>(items[0]?.id ?? '');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current?.disconnect();

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
    );

    headings.forEach((el) => observer.observe(el));
    observerRef.current = observer;

    return () => observer.disconnect();
  }, [items]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
    }
  };

  return (
    <nav className="hidden lg:block sticky top-8 self-start">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-violet-400/70 mb-3 px-3">
        On this page
      </p>
      <ul className="space-y-0.5">
        {items.map((item) => {
          const isActive = item.id === activeId;
          const Icon = item.icon;
          return (
            <li key={item.id}>
              <button
                onClick={() => handleClick(item.id)}
                className={`flex items-center gap-2 w-full text-left px-3 py-1.5 text-[13px] rounded-md transition-all duration-150 cursor-pointer border-0 bg-transparent ${
                  isActive
                    ? 'text-violet-600 font-medium bg-violet-50'
                    : 'text-gray-500 hover:text-violet-600 hover:bg-violet-50/50'
                }`}
              >
                {Icon && (
                  <Icon
                    size={15}
                    stroke={isActive ? 2 : 1.5}
                    className={isActive ? 'text-violet-500' : 'text-gray-400'}
                  />
                )}
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
