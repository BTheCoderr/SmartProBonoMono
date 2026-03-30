import type { WorkflowResult } from "@/lib/workflow/types";

/** Pure */
export function formatAnswerForSummary(value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

/** Pure: resolve result for summary when store may be empty (e.g. direct navigation). */
export function resolveSummaryWorkflowResult(
  lastResult: WorkflowResult | null,
  recompute: () => WorkflowResult,
  mounted: boolean,
): WorkflowResult | null {
  if (lastResult) return lastResult;
  if (!mounted) return null;
  try {
    return recompute();
  } catch {
    return null;
  }
}
