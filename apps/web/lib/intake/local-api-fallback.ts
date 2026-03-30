import { randomUUID } from "crypto";
import { NextResponse } from "next/server";

/** When Supabase env is missing, APIs still succeed so local / Netlify preview works (Zustand keeps real state). */
export function jsonLocalSession() {
  return NextResponse.json({
    sessionId: randomUUID(),
    persistence: "local" as const,
  });
}

export function jsonLocalOk() {
  return NextResponse.json({ ok: true as const, persistence: "local" as const });
}
