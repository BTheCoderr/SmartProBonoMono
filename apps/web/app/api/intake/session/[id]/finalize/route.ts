import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { saveWorkflowResult } from "@/lib/intake/persistence";
import type { WorkflowResult } from "@/lib/workflow/types";
import { jsonLocalOk } from "@/lib/intake/local-api-fallback";

type Ctx = { params: Promise<{ id: string }> };

export async function POST(request: Request, context: Ctx) {
  if (!isSupabaseConfigured()) {
    return jsonLocalOk();
  }
  try {
    const { id } = await context.params;
    const body = (await request.json()) as { result?: WorkflowResult };
    if (!body.result) {
      return NextResponse.json({ error: "result required" }, { status: 400 });
    }
    await saveWorkflowResult({ sessionId: id, result: body.result });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to finalize session" },
      { status: 500 },
    );
  }
}
