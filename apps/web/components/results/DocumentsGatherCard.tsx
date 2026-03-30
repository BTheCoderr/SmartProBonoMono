import { Card } from "@/components/ui/Card";

export function DocumentsGatherCard({ items }: { items: string[] }) {
  return (
    <Card>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
        Documents to gather
      </h2>
      <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-ink-700">
        {items.map((d, i) => (
          <li key={i}>{d}</li>
        ))}
      </ul>
    </Card>
  );
}
