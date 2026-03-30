import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { WorkflowResult } from "@/lib/workflow/types";
import { stageLabel, urgencyLabel } from "@/components/results/result-labels";

export function ClassificationCard({ result }: { result: WorkflowResult }) {
  return (
    <Card>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
        Classification
      </h2>
      <p className="mt-2 text-lg font-medium text-ink-900">
        {result.classification}
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <Badge tone="info">{stageLabel[result.stage] ?? result.stage}</Badge>
        <Badge
          tone={
            result.urgency === "high"
              ? "urgent"
              : result.urgency === "medium"
                ? "warn"
                : "neutral"
          }
        >
          {urgencyLabel[result.urgency] ?? result.urgency}
        </Badge>
      </div>
    </Card>
  );
}
