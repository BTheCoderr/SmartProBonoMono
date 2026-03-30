import type { RiEvictionAnswers } from "@/lib/workflow/modules/ri-eviction/types";
import type { IssueFlag } from "@/lib/workflow/types";

/** Pure: derive informational flags from normalized answers. */
export function buildEvictionIssueFlags(
  a: Partial<RiEvictionAnswers>,
): IssueFlag[] {
  const flags: IssueFlag[] = [];
  if (a.lockoutOrShutoff === true) {
    flags.push({
      code: "LOCKOUT_OR_SHUTOFF",
      label: "Possible lockout or utility shutoff",
      severity: "urgent",
      detail:
        "These situations may need immediate help. Consider legal aid, court self-help, or emergency services if you are unsafe.",
    });
  }
  if (a.habitabilityConcern === true && a.role === "tenant") {
    flags.push({
      code: "HABITABILITY",
      label: "Possible habitability or repair issues",
      severity: "caution",
      detail:
        "Repair issues sometimes intersect with eviction defenses or counterclaims. A legal advocate may want to review photos, notices, and repair requests.",
    });
  }
  if (a.noticeReceived === false && a.role === "tenant") {
    flags.push({
      code: "NO_WRITTEN_NOTICE",
      label: "No written notice reported",
      severity: "info",
      detail:
        "Timing and requirements still depend on your situation. You may want to document all communications either way.",
    });
  }
  if (a.documentsAvailable === "none" || a.documentsAvailable === "unsure") {
    flags.push({
      code: "DOCUMENTS_THIN",
      label: "Documents may be incomplete",
      severity: "info",
      detail:
        "Gathering paperwork early often makes it easier to verify dates and claims.",
    });
  }
  return flags;
}
