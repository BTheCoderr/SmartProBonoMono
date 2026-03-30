import type { WorkflowResult } from "@/lib/workflow/types";
import {
  RI_EVICTION_MODULE_SLUG,
  runEvictionWorkflow,
} from "@/lib/workflow/modules/ri-eviction";

/**
 * Central dispatch for workflow modules. Add new `case` branches as modules ship.
 */
export function runWorkflowModule(
  moduleSlug: string,
  answers: Record<string, unknown>,
): WorkflowResult {
  switch (moduleSlug) {
    case RI_EVICTION_MODULE_SLUG:
      return runEvictionWorkflow(answers);
    default:
      return {
        moduleSlug,
        classification: "This topic is not available yet.",
        stage: "unclear",
        urgency: "low",
        issueFlags: [],
        nextSteps: ["Try another topic from the home page."],
        documentsToGather: [],
        summaryNotes: [
          /* SCAFFOLD: replace when module ships */
          "Module not implemented — scaffold only.",
        ],
        ruleTrace: ["unknown_module"],
      };
  }
}
