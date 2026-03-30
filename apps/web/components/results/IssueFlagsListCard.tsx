import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import type { IssueFlag } from "@/lib/workflow/types";

export function IssueFlagsListCard({ flags }: { flags: IssueFlag[] }) {
  if (flags.length === 0) return null;
  return (
    <Card>
      <h2 className="text-sm font-semibold uppercase tracking-wide text-ink-500">
        Possible issues to review
      </h2>
      <ul className="mt-3 space-y-3">
        {flags.map((f) => (
          <li
            key={f.code}
            className="rounded-xl border border-ink-100 bg-ink-50/50 p-3"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-medium text-ink-900">{f.label}</span>
              <Badge
                tone={
                  f.severity === "urgent"
                    ? "urgent"
                    : f.severity === "caution"
                      ? "warn"
                      : "neutral"
                }
              >
                {f.severity}
              </Badge>
            </div>
            {f.detail ? (
              <p className="mt-1 text-sm text-ink-600">{f.detail}</p>
            ) : null}
          </li>
        ))}
      </ul>
    </Card>
  );
}
