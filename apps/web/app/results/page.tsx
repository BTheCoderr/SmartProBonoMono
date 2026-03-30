"use client";

import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { ResultSections } from "@/components/results/ResultSections";
import { useResultsFinalize } from "@/hooks/useResultsFinalize";

export default function ResultsPage() {
  const state = useResultsFinalize();

  if (state.status === "loading") {
    return (
      <Card>
        <p className="text-sm text-ink-600">Preparing your summary…</p>
      </Card>
    );
  }

  if (state.status === "error") {
    return (
      <Card className="space-y-4">
        <p className="text-sm text-red-700">{state.message}</p>
        <TextLink href="/intake" variant="secondary">
          Return to intake
        </TextLink>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-ink-900">Your results</h1>
        <p className="mt-2 text-sm text-ink-600">
          Organizational summary from your answers — not a legal conclusion.
        </p>
      </div>
      <ResultSections result={state.result} />
      <div className="flex flex-wrap gap-3">
        <TextLink href="/summary" variant="primary">
          View printable summary
        </TextLink>
        <TextLink href="/intake" variant="secondary">
          Edit answers
        </TextLink>
      </div>
    </div>
  );
}
