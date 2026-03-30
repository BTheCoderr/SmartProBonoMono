import type { RiEvictionAnswers } from "@/lib/workflow/modules/ri-eviction/types";
import type { WorkflowStage } from "@/lib/workflow/types";

/** Pure */
export function buildEvictionDocumentsList(
  a: Partial<RiEvictionAnswers>,
  stage: WorkflowStage,
): string[] {
  const docs = new Set<string>();
  docs.add("Lease or rental agreement (if any)");
  docs.add("Written notices (if any)");
  if (a.role === "tenant") docs.add("Rent payment records or receipts");
  if (stage === "court" || stage === "post_judgment") {
    docs.add("Court papers (summons, complaint, docket)");
  }
  if (a.habitabilityConcern === true) {
    docs.add("Photos or repair requests related to conditions");
  }
  if (a.lockoutOrShutoff === true) {
    docs.add("Evidence of occupancy (mail, utility bills, photos)");
  }
  return [...docs];
}
