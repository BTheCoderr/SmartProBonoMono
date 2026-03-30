import type { RiEvictionAnswers } from "@/lib/workflow/modules/ri-eviction/types";
import type { WorkflowStage } from "@/lib/workflow/types";

/** Pure: human-readable classification line (non-deterministic outcomes avoided). */
export function buildEvictionClassification(
  a: Partial<RiEvictionAnswers>,
  stage: WorkflowStage,
): string {
  if (a.role === "landlord") {
    return "Landlord-side eviction workflow (informational)";
  }
  if (a.role === "tenant") {
    if (stage === "emergency")
      return "Possible urgent housing issue — you may want immediate guidance";
    if (stage === "post_judgment")
      return "Possible post-judgment stage — deadlines and options may be limited";
    if (stage === "court")
      return "Possible active court stage — paperwork and dates likely matter";
    if (a.noticeReceived === false)
      return "Possible early stage — no written notice reported";
    if (a.noticeReceived === true)
      return "Possible pre-court stage — notice and timing may matter";
    return "Tenant situation — some details still unclear";
  }
  return "Situation needs more detail";
}
