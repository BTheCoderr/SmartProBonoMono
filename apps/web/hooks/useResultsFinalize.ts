"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkflowResult } from "@/lib/workflow/types";
import { useIntakeStore } from "@/store/intakeStore";

export type ResultsViewState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; result: WorkflowResult };

/**
 * Computes workflow result, syncs to store, persists final snapshot when answers change.
 */
export function useResultsFinalize(): ResultsViewState {
  const answers = useIntakeStore((s) => s.answers);
  const recomputeWorkflow = useIntakeStore((s) => s.recomputeWorkflow);
  const setLastResult = useIntakeStore((s) => s.setLastResult);
  const finalizeRemote = useIntakeStore((s) => s.finalizeRemote);
  const lastResult = useIntakeStore((s) => s.lastResult);

  const [mounted, setMounted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const finalizedForAnswers = useRef<string | null>(null);
  const answersKey = JSON.stringify(answers);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    try {
      const result = recomputeWorkflow();
      setLastResult(result);
      if (finalizedForAnswers.current !== answersKey) {
        finalizedForAnswers.current = answersKey;
        void finalizeRemote(result);
      }
      setError(null);
    } catch {
      setError("Could not compute results from your answers.");
    }
  }, [
    mounted,
    answers,
    answersKey,
    recomputeWorkflow,
    setLastResult,
    finalizeRemote,
  ]);

  if (!mounted) return { status: "loading" };
  if (error) return { status: "error", message: error };
  if (!lastResult) return { status: "error", message: "No results yet." };
  return { status: "ready", result: lastResult };
}
