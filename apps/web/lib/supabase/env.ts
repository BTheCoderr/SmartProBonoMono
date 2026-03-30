/**
 * Public key: Supabase Dashboard may label this "anon" or "publishable default".
 * Both work with @supabase/supabase-js on the server for Row-Level Security as `anon`.
 */
export function getPublicSupabaseKey(): string | undefined {
  return (
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
  );
}

export function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const publicKey = getPublicSupabaseKey();
  return { url, serviceKey, publicKey };
}

/** True when URL + at least one key is set (service role preferred for RLS bypass). */
export function isSupabaseConfigured(): boolean {
  const { url, serviceKey, publicKey } = getSupabaseConfig();
  return Boolean(url && (serviceKey || publicKey));
}
