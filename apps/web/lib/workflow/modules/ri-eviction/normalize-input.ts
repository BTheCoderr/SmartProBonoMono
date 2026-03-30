import type { RiEvictionAnswers } from "@/lib/workflow/modules/ri-eviction/types";

/**
 * Pure: coerce raw intake map into typed partial answers for the rule engine.
 */
export function normalizeRiEvictionAnswers(
  raw: Record<string, unknown>,
): Partial<RiEvictionAnswers> {
  return {
    role: (raw.role as RiEvictionAnswers["role"]) ?? "",
    noticeReceived:
      typeof raw.noticeReceived === "boolean" ? raw.noticeReceived : null,
    noticeType: (raw.noticeType as RiEvictionAnswers["noticeType"]) ?? "",
    daysSinceNotice:
      typeof raw.daysSinceNotice === "number" &&
      !Number.isNaN(raw.daysSinceNotice)
        ? raw.daysSinceNotice
        : null,
    courtFiled: typeof raw.courtFiled === "boolean" ? raw.courtFiled : null,
    hearingDateKnown:
      typeof raw.hearingDateKnown === "boolean"
        ? raw.hearingDateKnown
        : null,
    judgmentEntered:
      typeof raw.judgmentEntered === "boolean"
        ? raw.judgmentEntered
        : null,
    habitabilityConcern:
      typeof raw.habitabilityConcern === "boolean"
        ? raw.habitabilityConcern
        : null,
    lockoutOrShutoff:
      typeof raw.lockoutOrShutoff === "boolean"
        ? raw.lockoutOrShutoff
        : null,
    stayOrLeave:
      (raw.stayOrLeave as RiEvictionAnswers["stayOrLeave"]) ?? "",
    documentsAvailable:
      (raw.documentsAvailable as RiEvictionAnswers["documentsAvailable"]) ?? "",
  };
}
