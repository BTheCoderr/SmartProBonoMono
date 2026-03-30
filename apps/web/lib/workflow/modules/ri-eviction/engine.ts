import {
  RI_EVICTION_INFORMATIONAL_DISCLAIMER,
  RI_EVICTION_MODULE_SLUG,
} from "@/lib/workflow/modules/ri-eviction/constants";
import { buildEvictionClassification } from "@/lib/workflow/modules/ri-eviction/eviction-classification";
import { buildEvictionDocumentsList } from "@/lib/workflow/modules/ri-eviction/eviction-documents";
import { buildEvictionIssueFlags } from "@/lib/workflow/modules/ri-eviction/eviction-flags";
import {
  buildLandlordNextSteps,
  buildTenantNextSteps,
} from "@/lib/workflow/modules/ri-eviction/eviction-next-steps";
import {
  inferEvictionStage,
  inferEvictionUrgency,
} from "@/lib/workflow/modules/ri-eviction/eviction-stage-urgency";
import { normalizeRiEvictionAnswers } from "@/lib/workflow/modules/ri-eviction/normalize-input";
import type { RiEvictionAnswers } from "@/lib/workflow/modules/ri-eviction/types";
import type { WorkflowResult } from "@/lib/workflow/types";

/**
 * Pure rule engine: normalized answers → structured triage result.
 * Prefer this in tests; no I/O, no side effects.
 */
export function evaluateRiEvictionWorkflow(
  answers: Partial<RiEvictionAnswers>,
): WorkflowResult {
  const trace: string[] = [];
  const stage = inferEvictionStage(answers);
  trace.push(`stage:${stage}`);

  const flags = buildEvictionIssueFlags(answers);
  const urgency = inferEvictionUrgency(stage, flags, answers);
  const classification = buildEvictionClassification(answers, stage);

  if (answers.role === "landlord") trace.push("role:landlord");
  else if (answers.role === "tenant") trace.push("role:tenant");
  else trace.push("role:unknown");

  const nextSteps =
    answers.role === "landlord"
      ? buildLandlordNextSteps(stage)
      : buildTenantNextSteps(stage, answers);

  const summaryNotes = [
    RI_EVICTION_INFORMATIONAL_DISCLAIMER,
    "Rhode Island practice can vary by court and facts — treat this as a starting point for organizing your situation.",
  ];
  if (answers.role === "landlord") {
    summaryNotes.push(
      "This module is oriented toward triage language for tenants; landlord outcomes still require case-specific review.",
    );
  }

  return {
    moduleSlug: RI_EVICTION_MODULE_SLUG,
    classification,
    stage,
    urgency,
    issueFlags: flags,
    nextSteps,
    documentsToGather: buildEvictionDocumentsList(answers, stage),
    summaryNotes,
    ruleTrace: trace,
  };
}

/**
 * Pure: accepts raw store/API map — normalizes then evaluates.
 */
export function runEvictionWorkflow(
  rawAnswers: Record<string, unknown>,
): WorkflowResult {
  return evaluateRiEvictionWorkflow(normalizeRiEvictionAnswers(rawAnswers));
}
