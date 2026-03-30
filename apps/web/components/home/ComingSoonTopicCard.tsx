import { Card } from "@/components/ui/Card";

/** SCAFFOLD: placeholder until additional workflow modules ship. */
export function ComingSoonTopicCard() {
  return (
    <Card className="border-dashed border-ink-200/80 bg-white/60">
      <h2 className="text-lg font-semibold text-ink-700">More topics (soon)</h2>
      <p className="mt-2 text-sm text-ink-500">
        Additional modules will use the same intake shell and rule-engine
        pattern — one platform, many subject areas.
      </p>
      <p className="mt-4 text-xs font-medium uppercase tracking-wide text-ink-400">
        Scaffolded — not available
      </p>
    </Card>
  );
}
