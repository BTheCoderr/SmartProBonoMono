/** Display labels for workflow stages / urgency — keep separate from engine. */
export const stageLabel: Record<string, string> = {
  pre_filing: "Pre-filing",
  court: "Court stage",
  post_judgment: "Post-judgment",
  emergency: "Possible emergency",
  unclear: "Needs clarification",
};

export const urgencyLabel: Record<string, string> = {
  low: "Lower urgency",
  medium: "Moderate urgency",
  high: "Higher urgency",
};
