"use client";

import { Card } from "@/components/ui/Card";
import { StepProgress } from "@/components/intake/StepProgress";
import { QuestionField } from "@/components/intake/QuestionField";
import { IntakeStepHeader } from "@/components/intake/IntakeStepHeader";
import { SessionStatusNote } from "@/components/intake/SessionStatusNote";
import { IntakeFooterNav } from "@/components/intake/IntakeFooterNav";
import { useIntakeFlow } from "@/hooks/useIntakeFlow";

export default function IntakePage() {
  const {
    mounted,
    disclaimerAccepted,
    sessionId,
    step,
    currentStepIndex,
    visibleQuestions,
    answers,
    setAnswer,
    stepError,
    goNext,
    goBack,
    intakeSteps,
  } = useIntakeFlow();

  if (!mounted) {
    return (
      <Card>
        <p className="text-sm text-ink-600">Loading intake…</p>
      </Card>
    );
  }

  if (!disclaimerAccepted) return null;

  const isLastStep = currentStepIndex >= intakeSteps.length - 1;

  return (
    <div className="space-y-6">
      <IntakeStepHeader step={step} />
      <StepProgress
        steps={intakeSteps.map((s) => ({ key: s.key, title: s.title }))}
        currentIndex={currentStepIndex}
      />
      <Card className="space-y-8">
        <SessionStatusNote sessionId={sessionId} />
        <div className="space-y-6">
          {visibleQuestions.map((q) => (
            <QuestionField
              key={q.key}
              q={q}
              value={answers[q.key]}
              onChange={(v) => setAnswer(q.key, v)}
            />
          ))}
        </div>
        {stepError ? (
          <p className="text-sm text-red-700" role="alert">
            {stepError}
          </p>
        ) : null}
        <IntakeFooterNav
          onBack={goBack}
          onNext={goNext}
          isLastStep={isLastStep}
        />
      </Card>
    </div>
  );
}
