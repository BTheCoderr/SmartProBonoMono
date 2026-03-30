import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { loadIntakeSession, updateSessionStep } from "@/lib/intake/persistence";
import { jsonLocalOk } from "@/lib/intake/local-api-fallback";

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: Ctx) {
  if (!isSupabaseConfigured()) {
    const { id } = await context.params;
    return NextResponse.json({ session: { id }, answers: {} });
  }
  try {
    const { id } = await context.params;
    const data = await loadIntakeSession(id);
    return NextResponse.json(data);
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to load session" },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request, context: Ctx) {
  if (!isSupabaseConfigured()) {
    return jsonLocalOk();
  }
  try {
    const { id } = await context.params;
    const body = (await request.json()) as {
      currentStepKey?: string | null;
      status?: "in_progress" | "completed" | "abandoned";
    };
    await updateSessionStep({
      sessionId: id,
      currentStepKey: body.currentStepKey ?? null,
      status: body.status,
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to update session" },
      { status: 500 },
    );
  }
}
