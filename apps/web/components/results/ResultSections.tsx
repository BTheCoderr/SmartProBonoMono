"use client";

import type { WorkflowResult } from "@/lib/workflow/types";
import { ClassificationCard } from "@/components/results/ClassificationCard";
import { DocumentsGatherCard } from "@/components/results/DocumentsGatherCard";
import { IssueFlagsListCard } from "@/components/results/IssueFlagsListCard";
import { NextStepsCard } from "@/components/results/NextStepsCard";
import { SummaryNotesCard } from "@/components/results/SummaryNotesCard";

export function ResultSections({ result }: { result: WorkflowResult }) {
  return (
    <div className="space-y-4">
      <ClassificationCard result={result} />
      <IssueFlagsListCard flags={result.issueFlags} />
      <NextStepsCard steps={result.nextSteps} />
      <DocumentsGatherCard items={result.documentsToGather} />
      <SummaryNotesCard notes={result.summaryNotes} />
    </div>
  );
}
