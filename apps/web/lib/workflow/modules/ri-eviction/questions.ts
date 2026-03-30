export type QuestionType = "select" | "boolean" | "number";

export type QuestionDef = {
  key: string;
  label: string;
  helper?: string;
  type: QuestionType;
  options?: { value: string; label: string }[];
};

export type IntakeStepDef = {
  key: string;
  title: string;
  description: string;
  questions: QuestionDef[];
};

export const intakeSteps: IntakeStepDef[] = [
  {
    key: "role",
    title: "Your role",
    description:
      "We tailor questions based on whether you rent or own the tenancy.",
    questions: [
      {
        key: "role",
        label: "In this situation, are you the tenant or the landlord?",
        type: "select",
        options: [
          { value: "tenant", label: "Tenant" },
          { value: "landlord", label: "Landlord" },
        ],
      },
    ],
  },
  {
    key: "notice",
    title: "Notices & communications",
    description:
      "Written notices often matter for timing. If you are unsure, choose the closest option.",
    questions: [
      {
        key: "noticeReceived",
        label:
          "Did you receive a written notice related to eviction or ending the tenancy?",
        helper:
          "If you only received verbal messages, answer No — you may still want to document what was said.",
        type: "boolean",
      },
      {
        key: "noticeType",
        label: "What type of notice best describes what you received?",
        type: "select",
        options: [
          { value: "nonpayment", label: "Nonpayment / rent" },
          { value: "lease_violation", label: "Lease violation" },
          { value: "no_cause", label: "No-cause / end of tenancy" },
          { value: "unknown", label: "I'm not sure" },
        ],
      },
      {
        key: "daysSinceNotice",
        label: "About how many days ago did you receive that notice?",
        type: "number",
      },
    ],
  },
  {
    key: "court",
    title: "Court & hearings",
    description:
      "Court filings change deadlines and options. Approximate answers are OK.",
    questions: [
      {
        key: "courtFiled",
        label:
          "Has a court case already been filed (summons, complaint, or court papers)?",
        type: "boolean",
      },
      {
        key: "hearingDateKnown",
        label: "Do you already have a hearing or court date scheduled?",
        type: "boolean",
      },
      {
        key: "judgmentEntered",
        label:
          "Has a court judgment or written order already been entered (not just a scheduled hearing)?",
        helper:
          "If you are not sure, answer “No” and verify with your paperwork or the court.",
        type: "boolean",
      },
    ],
  },
  {
    key: "conditions",
    title: "Safety & housing conditions",
    description:
      "These issues may affect urgency. This tool does not provide emergency services.",
    questions: [
      {
        key: "lockoutOrShutoff",
        label:
          "Has there been a lockout, or utility shutoff (water/heat/electric), without a court order you know of?",
        helper:
          "If you are in immediate danger, contact local emergency services or a trusted crisis line.",
        type: "boolean",
      },
      {
        key: "habitabilityConcern",
        label:
          "Are there serious repair or habitability concerns (mold, heat, pests, safety)?",
        type: "boolean",
      },
    ],
  },
  {
    key: "goals",
    title: "Goals & documents",
    description:
      "Helps us suggest practical next steps — not legal outcomes.",
    questions: [
      {
        key: "stayOrLeave",
        label: "What are you hoping to do, as best you know today?",
        type: "select",
        options: [
          { value: "stay", label: "Stay in the home" },
          { value: "leave", label: "Leave / move out" },
          { value: "unsure", label: "Not sure yet" },
        ],
      },
      {
        key: "documentsAvailable",
        label:
          "Do you have key documents available (lease, notices, rent receipts, court papers)?",
        type: "select",
        options: [
          { value: "some", label: "Yes — I have some or all" },
          { value: "none", label: "Not really" },
          { value: "unsure", label: "I'm not sure" },
        ],
      },
    ],
  },
];

export const questionStepKeyByQuestionKey: Record<string, string> =
  Object.fromEntries(
    intakeSteps.flatMap((s) => s.questions.map((q) => [q.key, s.key])),
  );
