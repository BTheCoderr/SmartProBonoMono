import type { IntakeStepDef } from "@/lib/workflow/modules/ri-eviction/questions";

type Props = {
  step: IntakeStepDef;
  eyebrow?: string;
};

export function IntakeStepHeader({
  step,
  eyebrow = "Rhode Island eviction — guided intake",
}: Props) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-ink-500">
        {eyebrow}
      </p>
      <h1 className="mt-1 text-2xl font-semibold text-ink-900">{step.title}</h1>
      <p className="mt-2 text-sm text-ink-600">{step.description}</p>
    </div>
  );
}
