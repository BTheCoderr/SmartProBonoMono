import { Card } from "@/components/ui/Card";

export function SummaryNotesCard({ notes }: { notes: string[] }) {
  return (
    <Card className="border-ink-100 bg-ink-50/40">
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
        Summary notes
      </h2>
      <ul className="mt-3 space-y-2 text-sm text-ink-600">
        {notes.map((n, i) => (
          <li key={i}>{n}</li>
        ))}
      </ul>
    </Card>
  );
}
