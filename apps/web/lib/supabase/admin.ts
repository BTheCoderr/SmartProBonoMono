import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseConfig } from "@/lib/supabase/env";

/**
 * Server-only client with **service role** only. Never import in Client Components.
 * Use when `SUPABASE_SERVICE_ROLE_KEY` is set; otherwise use `createPersistSupabaseClient`.
 */
export function createServiceRoleClient(): SupabaseClient {
  const { url, serviceKey } = getSupabaseConfig();
  if (!url || !serviceKey) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  return createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
