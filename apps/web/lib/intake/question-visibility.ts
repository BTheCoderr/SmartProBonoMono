/**
 * Pure: which question keys should render for the current answer state.
 */
export function isIntakeQuestionVisible(
  questionKey: string,
  answers: Record<string, unknown>,
): boolean {
  if (questionKey === "noticeType" || questionKey === "daysSinceNotice") {
    return answers.noticeReceived === true;
  }
  if (questionKey === "hearingDateKnown" || questionKey === "judgmentEntered") {
    return answers.courtFiled === true;
  }
  return true;
}
