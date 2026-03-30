import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { WorkflowResult } from "@/lib/workflow/types";
import { runWorkflowModule } from "@/lib/workflow/run-module";
import {
  RI_EVICTION_MODULE_SLUG,
  intakeSteps,
  questionStepKeyByQuestionKey,
} from "@/lib/workflow/modules/ri-eviction";
import {
  apiCreateSession,
  apiFinalize,
  apiPatchSession,
  apiPutAnswers,
} from "@/lib/intake/sync-client";

export const emptyAnswers: Record<string, unknown> = {
  role: "",
  noticeReceived: null,
  noticeType: "",
  daysSinceNotice: null,
  courtFiled: null,
  hearingDateKnown: null,
  judgmentEntered: null,
  habitabilityConcern: null,
  lockoutOrShutoff: null,
  stayOrLeave: "",
  documentsAvailable: "",
};

type IntakeState = {
  moduleSlug: string;
  sessionId: string | null;
  currentStepIndex: number;
  answers: Record<string, unknown>;
  lastResult: WorkflowResult | null;
  disclaimerAccepted: boolean;
  syncError: string | null;
  syncEnabled: boolean;
  setAnswer: (key: string, value: unknown) => void;
  setStepIndex: (index: number) => void;
  acceptDisclaimer: () => void;
  setLastResult: (r: WorkflowResult | null) => void;
  reset: () => void;
  ensureRemoteSession: () => Promise<void>;
  persistAnswersRemote: () => Promise<void>;
  persistStepRemote: () => Promise<void>;
  finalizeRemote: (result: WorkflowResult) => Promise<void>;
  recomputeWorkflow: () => WorkflowResult;
};

export const useIntakeStore = create<IntakeState>()(
  persist(
    (set, get) => ({
      moduleSlug: RI_EVICTION_MODULE_SLUG,
      sessionId: null,
      currentStepIndex: 0,
      answers: { ...emptyAnswers },
      lastResult: null,
      disclaimerAccepted: false,
      syncError: null,
      syncEnabled: true,

      setAnswer: (key, value) =>
        set((s) => ({
          answers: { ...s.answers, [key]: value },
          syncError: null,
        })),

      setStepIndex: (index) => set({ currentStepIndex: index }),

      acceptDisclaimer: () => set({ disclaimerAccepted: true }),

      setLastResult: (r) => set({ lastResult: r }),

      reset: () =>
        set({
          sessionId: null,
          currentStepIndex: 0,
          answers: { ...emptyAnswers },
          lastResult: null,
          disclaimerAccepted: false,
          syncError: null,
        }),

      ensureRemoteSession: async () => {
        const { sessionId, moduleSlug, syncEnabled } = get();
        if (!syncEnabled) return;
        if (sessionId) return;
        try {
          const id = await apiCreateSession({ moduleSlug });
          set({ sessionId: id, syncError: null });
        } catch {
          set({
            syncError:
              "Could not start a saved session (check Supabase env). Continuing locally.",
          });
        }
      },

      persistAnswersRemote: async () => {
        const { sessionId, answers, syncEnabled } = get();
        if (!syncEnabled || !sessionId) return;
        try {
          await apiPutAnswers(sessionId, {
            answers,
            stepKeyByQuestion: questionStepKeyByQuestionKey,
          });
          set({ syncError: null });
        } catch {
          set({ syncError: "Answers not synced — still saved on this device." });
        }
      },

      persistStepRemote: async () => {
        const { sessionId, currentStepIndex, syncEnabled } = get();
        if (!syncEnabled || !sessionId) return;
        const stepKey = intakeSteps[currentStepIndex]?.key ?? null;
        try {
          await apiPatchSession(sessionId, { currentStepKey: stepKey });
          set({ syncError: null });
        } catch {
          set({ syncError: "Progress not synced to server." });
        }
      },

      finalizeRemote: async (result) => {
        const { sessionId, syncEnabled } = get();
        if (!syncEnabled || !sessionId) return;
        try {
          await apiFinalize(sessionId, result);
          set({ syncError: null });
        } catch {
          set({ syncError: "Results not saved to server — copy summary if needed." });
        }
      },

      recomputeWorkflow: () =>
        runWorkflowModule(get().moduleSlug, get().answers),
    }),
    {
      name: "smartprobono-intake",
      partialize: (s) => ({
        sessionId: s.sessionId,
        currentStepIndex: s.currentStepIndex,
        answers: s.answers,
        lastResult: s.lastResult,
        disclaimerAccepted: s.disclaimerAccepted,
        moduleSlug: s.moduleSlug,
      }),
    },
  ),
);
