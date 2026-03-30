import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getPublicSupabaseKey, getSupabaseConfig } from "@/lib/supabase/env";

/**
 * Server-only client for intake persistence.
 * - Prefers service role (bypasses RLS; keep secret server-only).
 * - Falls back to public/anon key if you applied `policies-anon-demo.sql` in Supabase.
 */
export function createPersistSupabaseClient(): SupabaseClient {
  const { url, serviceKey } = getSupabaseConfig();
  const publicKey = getPublicSupabaseKey();
  const key = serviceKey ?? publicKey;
  if (!url || !key) {
    throw new Error(
      "Missing Supabase env: set NEXT_PUBLIC_SUPABASE_URL and either SUPABASE_SERVICE_ROLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY / NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY",
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
