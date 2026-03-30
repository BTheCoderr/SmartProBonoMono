import { Card } from "@/components/ui/Card";
import type { QuestionDef } from "@/lib/workflow/modules/ri-eviction/questions";
import { formatAnswerForSummary } from "@/lib/intake/summary-format";

type Row = { question: QuestionDef; value: unknown };

export function AnswersSummaryCard({ rows }: { rows: Row[] }) {
  return (
    <Card>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
        Your answers
      </h2>
      <dl className="mt-4 space-y-3 text-sm">
        {rows.map(({ question, value }) => (
          <div
            key={question.key}
            className="flex flex-col gap-1 border-b border-ink-100 pb-3 last:border-0 sm:flex-row sm:justify-between"
          >
            <dt className="text-ink-600">{question.label}</dt>
            <dd className="font-medium text-ink-900">
              {formatAnswerForSummary(value)}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
