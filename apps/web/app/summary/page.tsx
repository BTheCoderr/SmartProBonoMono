"use client";

import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { TextLink } from "@/components/ui/TextLink";
import { ResultSections } from "@/components/results/ResultSections";
import { AnswersSummaryCard } from "@/components/summary/AnswersSummaryCard";
import { useClientMounted } from "@/hooks/useClientMounted";
import { intakeSteps } from "@/lib/workflow/modules/ri-eviction/questions";
import { resolveSummaryWorkflowResult } from "@/lib/intake/summary-format";
import { useIntakeStore } from "@/store/intakeStore";

export default function SummaryPage() {
  const mounted = useClientMounted();
  const answers = useIntakeStore((s) => s.answers);
  const lastResult = useIntakeStore((s) => s.lastResult);
  const recomputeWorkflow = useIntakeStore((s) => s.recomputeWorkflow);

  const result = resolveSummaryWorkflowResult(
    lastResult,
    recomputeWorkflow,
    mounted,
  );

  const answerRows = intakeSteps.flatMap((s) =>
    s.questions.map((question) => ({
      question,
      value: answers[question.key],
    })),
  );

  if (!mounted) {
    return (
      <Card>
        <p className="text-sm text-ink-600">Loading summary…</p>
      </Card>
    );
  }

  if (!result) {
    return (
      <Card className="space-y-4">
        <p className="text-sm text-ink-600">
          Complete the intake first to see a summary.
        </p>
        <TextLink href="/intake" variant="secondary">
          Go to intake
        </TextLink>
      </Card>
    );
  }

  return (
    <div className="space-y-6 print:max-w-none">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-ink-900">
            Session summary
          </h1>
          <p className="mt-2 text-sm text-ink-600">
            For your records. Not legal advice. Module:{" "}
            <span className="font-medium">Rhode Island eviction (triage)</span>
          </p>
        </div>
        <button
          type="button"
          onClick={() => window.print()}
          className="hidden rounded-xl border border-ink-200 bg-white px-4 py-2 text-sm font-medium text-ink-800 hover:bg-ink-50 sm:inline-flex print:hidden"
        >
          Print / Save PDF
        </button>
      </div>

      <AnswersSummaryCard rows={answerRows} />
      <ResultSections result={result} />

      <p className="text-center text-xs text-ink-500 print:hidden">
        <Link href="/results" className="text-accent hover:underline">
          Back to results
        </Link>
        {" · "}
        <Link href="/" className="text-accent hover:underline">
          Home
        </Link>
      </p>
    </div>
  );
}
