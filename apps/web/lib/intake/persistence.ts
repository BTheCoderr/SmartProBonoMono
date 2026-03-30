import type { WorkflowResult } from "@/lib/workflow/types";
import { createPersistSupabaseClient } from "@/lib/supabase/persist-client";

export async function createIntakeSession(params: {
  moduleSlug: string;
  anonymousClientId?: string | null;
}) {
  const supabase = createPersistSupabaseClient();
  const { data, error } = await supabase
    .from("intake_sessions")
    .insert({
      module_slug: params.moduleSlug,
      status: "in_progress",
      anonymous_client_id: params.anonymousClientId ?? null,
    })
    .select("id")
    .single();
  if (error) throw error;
  return data.id as string;
}

export async function updateSessionStep(params: {
  sessionId: string;
  currentStepKey: string | null;
  status?: "in_progress" | "completed" | "abandoned";
}) {
  const supabase = createPersistSupabaseClient();
  const { error } = await supabase
    .from("intake_sessions")
    .update({
      current_step_key: params.currentStepKey,
      ...(params.status ? { status: params.status } : {}),
    })
    .eq("id", params.sessionId);
  if (error) throw error;
}

export async function upsertAnswers(params: {
  sessionId: string;
  answers: Record<string, unknown>;
  stepKeyByQuestion: Record<string, string>;
}) {
  const supabase = createPersistSupabaseClient();
  const rows = Object.entries(params.answers).map(([question_key, value]) => ({
    session_id: params.sessionId,
    question_key,
    step_key: params.stepKeyByQuestion[question_key] ?? "unknown",
    value: value as object,
  }));
  if (rows.length === 0) return;
  const { error } = await supabase.from("intake_answers").upsert(rows, {
    onConflict: "session_id,question_key",
  });
  if (error) throw error;
}

export async function loadIntakeSession(sessionId: string) {
  const supabase = createPersistSupabaseClient();
  const { data: session, error: sErr } = await supabase
    .from("intake_sessions")
    .select("*")
    .eq("id", sessionId)
    .single();
  if (sErr) throw sErr;
  const { data: answers, error: aErr } = await supabase
    .from("intake_answers")
    .select("question_key, value, step_key")
    .eq("session_id", sessionId);
  if (aErr) throw aErr;
  const answerMap: Record<string, unknown> = {};
  for (const row of answers ?? []) {
    answerMap[row.question_key] = row.value;
  }
  return { session, answers: answerMap };
}

export async function saveWorkflowResult(params: {
  sessionId: string;
  result: WorkflowResult;
}) {
  const supabase = createPersistSupabaseClient();
  const { error: cErr } = await supabase.from("classifications").insert({
    session_id: params.sessionId,
    stage: params.result.stage,
    urgency: params.result.urgency,
    label: params.result.classification,
    issue_flags: params.result.issueFlags,
    rule_trace: params.result.ruleTrace ?? null,
  });
  if (cErr) throw cErr;
  const { error: oErr } = await supabase.from("outputs").insert({
    session_id: params.sessionId,
    type: "workflow_result",
    payload: params.result as unknown as object,
  });
  if (oErr) throw oErr;
  const { error: uErr } = await supabase
    .from("intake_sessions")
    .update({ status: "completed" })
    .eq("id", params.sessionId);
  if (uErr) throw uErr;
}
