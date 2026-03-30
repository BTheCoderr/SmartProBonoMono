import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { upsertAnswers } from "@/lib/intake/persistence";

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(request: Request, context: Ctx) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase not configured", code: "SUPABASE_DISABLED" },
      { status: 503 },
    );
  }
  try {
    const { id } = await context.params;
    const body = (await request.json()) as {
      answers?: Record<string, unknown>;
      stepKeyByQuestion?: Record<string, string>;
    };
    if (!body.answers) {
      return NextResponse.json({ error: "answers required" }, { status: 400 });
    }
    await upsertAnswers({
      sessionId: id,
      answers: body.answers,
      stepKeyByQuestion: body.stepKeyByQuestion ?? {},
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to save answers" },
      { status: 500 },
    );
  }
}
