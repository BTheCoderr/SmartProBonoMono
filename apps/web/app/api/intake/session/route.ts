import { NextResponse } from "next/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createIntakeSession } from "@/lib/intake/persistence";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Supabase not configured", code: "SUPABASE_DISABLED" },
      { status: 503 },
    );
  }
  try {
    const body = (await request.json()) as {
      moduleSlug?: string;
      anonymousClientId?: string | null;
    };
    if (!body.moduleSlug) {
      return NextResponse.json(
        { error: "moduleSlug is required" },
        { status: 400 },
      );
    }
    const id = await createIntakeSession({
      moduleSlug: body.moduleSlug,
      anonymousClientId: body.anonymousClientId,
    });
    return NextResponse.json({ sessionId: id });
  } catch (e) {
    console.error(e);
    return NextResponse.json(
      { error: "Failed to create session" },
      { status: 500 },
    );
  }
}
