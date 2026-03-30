/**
 * Shared contract for rules-based workflow modules.
 * Other jurisdictions/topics can implement the same shape.
 */
export type WorkflowStage =
  | "pre_filing"
  | "court"
  | "post_judgment"
  | "emergency"
  | "unclear";

export type WorkflowUrgency = "low" | "medium" | "high";

export type IssueFlag = {
  code: string;
  label: string;
  severity: "info" | "caution" | "urgent";
  detail?: string;
};

export type WorkflowResult = {
  moduleSlug: string;
  classification: string;
  stage: WorkflowStage;
  urgency: WorkflowUrgency;
  issueFlags: IssueFlag[];
  nextSteps: string[];
  documentsToGather: string[];
  summaryNotes: string[];
  /** Optional trace for audits / debugging; safe to omit in UI */
  ruleTrace?: string[];
};
