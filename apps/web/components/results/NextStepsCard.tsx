import { Card } from "@/components/ui/Card";

export function NextStepsCard({ steps }: { steps: string[] }) {
  return (
    <Card>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
        Suggested next steps
      </h2>
      <ul className="mt-3 list-inside list-disc space-y-2 text-sm text-ink-700">
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ul>
    </Card>
  );
}
