import type { WorkflowResult } from "@/lib/workflow/types";

export async function apiCreateSession(body: {
  moduleSlug: string;
  anonymousClientId?: string | null;
}) {
  const res = await fetch("/api/intake/session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = (await res.json()) as
    | { sessionId: string }
    | { error: string; code?: string };
  if (!res.ok)
    throw new Error("error" in data ? data.error : "create session failed");
  return (data as { sessionId: string }).sessionId;
}

export async function apiPatchSession(
  sessionId: string,
  body: { currentStepKey?: string | null; status?: string },
) {
  const res = await fetch(`/api/intake/session/${sessionId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("update session failed");
}

export async function apiPutAnswers(
  sessionId: string,
  body: {
    answers: Record<string, unknown>;
    stepKeyByQuestion: Record<string, string>;
  },
) {
  const res = await fetch(`/api/intake/session/${sessionId}/answers`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error("save answers failed");
}

export async function apiFinalize(
  sessionId: string,
  result: WorkflowResult,
) {
  const res = await fetch(`/api/intake/session/${sessionId}/finalize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ result }),
  });
  if (!res.ok) throw new Error("finalize failed");
}
