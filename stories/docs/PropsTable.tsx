import { Badge, Text } from '@mantine/core';

type PropDef = {
  name: string;
  type: string;
  required?: boolean;
  defaultValue?: string;
  description: string;
};

export function PropsTable(props: { items: PropDef[] }) {
  const { items } = props;

  return (
    <div className="rounded-xl border border-docs-border overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-docs-bg text-left">
            <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-docs-muted/70">
              Prop
            </th>
            <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-docs-muted/70">
              Type
            </th>
            <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-docs-muted/70 hidden sm:table-cell">
              Default
            </th>
            <th className="px-4 py-3 font-semibold text-xs uppercase tracking-wider text-docs-muted/70">
              Description
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-docs-border">
          {items.map((item) => (
            <tr
              key={item.name}
              className="bg-docs-surface hover:bg-docs-bg/50 transition-colors"
            >
              <td className="px-4 py-3 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <code className="text-[13px] font-semibold text-docs-accent">
                    {item.name}
                  </code>
                  {item.required && (
                    <Badge size="xs" variant="light" color="red" radius="sm">
                      required
                    </Badge>
                  )}
                </div>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs px-1.5 py-0.5 rounded bg-docs-bg text-docs-muted font-mono">
                  {item.type}
                </code>
              </td>
              <td className="px-4 py-3 hidden sm:table-cell">
                {item.defaultValue ? (
                  <code className="text-xs text-docs-muted font-mono">
                    {item.defaultValue}
                  </code>
                ) : (
                  <Text size="xs" c="dimmed">
                    —
                  </Text>
                )}
              </td>
              <td className="px-4 py-3">
                <Text size="xs" c="dimmed" className="leading-relaxed">
                  {item.description}
                </Text>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
