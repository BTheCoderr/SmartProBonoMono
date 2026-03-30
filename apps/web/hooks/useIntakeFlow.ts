"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { intakeSteps } from "@/lib/workflow/modules/ri-eviction/questions";
import { isIntakeQuestionVisible } from "@/lib/intake/question-visibility";
import { validateIntakeStep } from "@/lib/intake/validate-intake-step";
import { useIntakeStore } from "@/store/intakeStore";

export function useIntakeFlow() {
  const router = useRouter();
  const disclaimerAccepted = useIntakeStore((s) => s.disclaimerAccepted);
  const answers = useIntakeStore((s) => s.answers);
  const setAnswer = useIntakeStore((s) => s.setAnswer);
  const currentStepIndex = useIntakeStore((s) => s.currentStepIndex);
  const setStepIndex = useIntakeStore((s) => s.setStepIndex);
  const ensureRemoteSession = useIntakeStore((s) => s.ensureRemoteSession);
  const persistAnswersRemote = useIntakeStore((s) => s.persistAnswersRemote);
  const persistStepRemote = useIntakeStore((s) => s.persistStepRemote);
  const sessionId = useIntakeStore((s) => s.sessionId);

  const [mounted, setMounted] = useState(false);
  const [stepError, setStepError] = useState<string | null>(null);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    if (!disclaimerAccepted) router.replace("/disclaimer");
  }, [mounted, disclaimerAccepted, router]);

  useEffect(() => {
    if (!mounted || !disclaimerAccepted) return;
    void ensureRemoteSession();
  }, [mounted, disclaimerAccepted, ensureRemoteSession]);

  useEffect(() => {
    if (!sessionId) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      void persistAnswersRemote();
    }, 600);
    return () => {
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [answers, sessionId, persistAnswersRemote]);

  const step = intakeSteps[currentStepIndex] ?? intakeSteps[0]!;

  const visibleQuestions = useMemo(
    () =>
      step.questions.filter((q) =>
        isIntakeQuestionVisible(q.key, answers),
      ),
    [step, answers],
  );

  const validateStep = useCallback(() => {
    const result = validateIntakeStep(step.key, visibleQuestions, answers);
    if (!result.ok) {
      setStepError(result.message);
      return false;
    }
    setStepError(null);
    return true;
  }, [step.key, visibleQuestions, answers]);

  const goNext = useCallback(() => {
    if (!validateStep()) return;
    if (currentStepIndex >= intakeSteps.length - 1) {
      void persistStepRemote();
      router.push("/results");
      return;
    }
    setStepIndex(currentStepIndex + 1);
    void persistStepRemote();
  }, [
    validateStep,
    currentStepIndex,
    setStepIndex,
    persistStepRemote,
    router,
  ]);

  const goBack = useCallback(() => {
    setStepError(null);
    if (currentStepIndex <= 0) {
      router.push("/disclaimer");
      return;
    }
    setStepIndex(currentStepIndex - 1);
    void persistStepRemote();
  }, [currentStepIndex, setStepIndex, persistStepRemote, router]);

  return {
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
  };
}
