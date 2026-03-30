import type { WorkflowResult } from "@/lib/workflow/types";

export type RiEvictionAnswers = {
  role: "tenant" | "landlord" | "";
  noticeReceived: boolean | null;
  noticeType: "nonpayment" | "lease_violation" | "no_cause" | "unknown" | "";
  daysSinceNotice: number | null;
  courtFiled: boolean | null;
  hearingDateKnown: boolean | null;
  judgmentEntered: boolean | null;
  habitabilityConcern: boolean | null;
  lockoutOrShutoff: boolean | null;
  stayOrLeave: "stay" | "leave" | "unsure" | "";
  documentsAvailable: "some" | "none" | "unsure" | "";
};

export type RiEvictionWorkflowResult = WorkflowResult;
