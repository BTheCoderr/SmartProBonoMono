import type { RiEvictionAnswers } from "@/lib/workflow/modules/ri-eviction/types";
import type { WorkflowStage } from "@/lib/workflow/types";

/** Pure */
export function buildTenantNextSteps(
  stage: WorkflowStage,
  a: Partial<RiEvictionAnswers>,
): string[] {
  const steps: string[] = [];
  if (stage === "emergency") {
    steps.push(
      "If you are locked out or without essential utilities, consider contacting legal aid or court self-help as soon as you can.",
      "Keep a short written timeline of what happened and who was present.",
    );
    return steps;
  }
  if (stage === "post_judgment") {
    steps.push(
      "Review the judgment or order carefully for deadlines (e.g., appeal or move-out timelines).",
      "If you disagree with the outcome, ask a legal advocate whether an appeal or motion may apply — timing is often strict.",
    );
    return steps;
  }
  if (stage === "court") {
    steps.push(
      "Confirm court name, case number, and any hearing date on your paperwork.",
      "Gather notices, lease or rental agreement, rent ledgers, and proof of payment if you have them.",
      "You may want to explore legal aid clinics or limited-scope representation before the hearing.",
    );
    if (a.stayOrLeave === "stay") {
      steps.push(
        "If your goal is to stay, write down facts that support your position (payments, repairs, notices) for an advocate to review.",
      );
    }
    return steps;
  }
  if (a.noticeReceived === false) {
    steps.push(
      "Start a simple log of rent payments and conversations (dates, method, what was said).",
      "If a written notice arrives, keep the original and note the date you received it.",
    );
  } else if (a.noticeReceived === true) {
    steps.push(
      "Compare the notice type you selected with the document you have — if labels do not match, note both.",
      "Look for dates, amounts, and cure periods (if any) on the notice.",
    );
    if (a.noticeType === "nonpayment") {
      steps.push(
        "If nonpayment is at issue, gather proof of payment, bank transfers, or agreed payment plans.",
      );
    }
  } else {
    steps.push(
      "Complete the intake questions when you can — partial information may still help you prepare.",
    );
  }
  if (a.stayOrLeave === "leave") {
    steps.push(
      "If you plan to move, consider documenting move-out condition and any agreement about amounts owed.",
    );
  }
  return steps;
}

/** Pure */
export function buildLandlordNextSteps(stage: WorkflowStage): string[] {
  if (stage === "court" || stage === "post_judgment") {
    return [
      "Verify court rules and filing requirements for your municipality and court.",
      "Ensure notices and filings align with current procedures — mistakes can delay the case.",
      "Many landlords use counsel for court; self-represented compliance still requires careful documentation.",
    ];
  }
  return [
    "Confirm which notice type applies before next steps — requirements vary.",
    "Keep copies of notices, service details, and the lease or rental terms.",
    "If you are unsure about timing or service, consider consulting a qualified attorney.",
  ];
}
