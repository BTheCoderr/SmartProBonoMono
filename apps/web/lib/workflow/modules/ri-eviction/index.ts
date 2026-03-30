/**
 * Rhode Island eviction workflow module — rules, intake definition, validation.
 */
export {
  RI_EVICTION_MODULE_SLUG,
  RI_EVICTION_INFORMATIONAL_DISCLAIMER,
} from "@/lib/workflow/modules/ri-eviction/constants";
export {
  intakeSteps,
  questionStepKeyByQuestionKey,
  type IntakeStepDef,
  type QuestionDef,
} from "@/lib/workflow/modules/ri-eviction/questions";
export {
  riEvictionAnswersSchema,
  stepSchema,
  type RiEvictionAnswersInput,
} from "@/lib/workflow/modules/ri-eviction/schema";
export type {
  RiEvictionAnswers,
  RiEvictionWorkflowResult,
} from "@/lib/workflow/modules/ri-eviction/types";
export {
  evaluateRiEvictionWorkflow,
  runEvictionWorkflow,
} from "@/lib/workflow/modules/ri-eviction/engine";
export { normalizeRiEvictionAnswers } from "@/lib/workflow/modules/ri-eviction/normalize-input";
