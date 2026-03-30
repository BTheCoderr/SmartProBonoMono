import type { RiEvictionAnswers } from "@/lib/workflow/modules/ri-eviction/types";
import type {
  IssueFlag,
  WorkflowStage,
  WorkflowUrgency,
} from "@/lib/workflow/types";

/** Pure */
export function inferEvictionStage(
  a: Partial<RiEvictionAnswers>,
): WorkflowStage {
  if (a.lockoutOrShutoff === true) return "emergency";
  if (a.judgmentEntered === true) return "post_judgment";
  if (a.courtFiled === true) return "court";
  if (a.noticeReceived === true || a.noticeReceived === false)
    return "pre_filing";
  return "unclear";
}

/** Pure */
export function inferEvictionUrgency(
  stage: WorkflowStage,
  flags: IssueFlag[],
  a: Partial<RiEvictionAnswers>,
): WorkflowUrgency {
  if (stage === "emergency") return "high";
  if (flags.some((f) => f.severity === "urgent")) return "high";
  if (
    stage === "court" &&
    a.hearingDateKnown === true &&
    typeof a.daysSinceNotice === "number" &&
    a.daysSinceNotice <= 14
  )
    return "high";
  if (flags.some((f) => f.severity === "caution")) return "medium";
  if (stage === "post_judgment") return "medium";
  return "low";
}
