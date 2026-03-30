import type { QuestionDef } from "@/lib/workflow/modules/ri-eviction/questions";
import { stepSchema } from "@/lib/workflow/modules/ri-eviction/schema";

export type StepValidationResult =
  | { ok: true }
  | { ok: false; message: string };

/**
 * Pure: validate visible fields for a workflow intake step.
 */
export function validateIntakeStep(
  stepKey: string,
  visibleQuestions: QuestionDef[],
  answers: Record<string, unknown>,
): StepValidationResult {
  const slice: Record<string, unknown> = {};
  for (const q of visibleQuestions) {
    slice[q.key] = answers[q.key];
  }
  const parsed = stepSchema(stepKey).safeParse(slice);
  if (parsed.success) return { ok: true };
  const first = parsed.error.flatten().fieldErrors;
  const message =
    (Object.values(first).flat()[0] as string | undefined) ??
    "Please complete this step.";
  return { ok: false, message };
}
