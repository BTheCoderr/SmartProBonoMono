-- DEMO ONLY — run in Supabase SQL Editor AFTER schema.sql
-- Allows the publishable/anon key (used from Next.js Route Handlers) to read/write intake tables.
-- Service role bypasses RLS and does not need this file.
-- Remove or replace with user-scoped policies before production.

drop policy if exists "demo_anon_intake_sessions" on public.intake_sessions;
create policy "demo_anon_intake_sessions"
  on public.intake_sessions
  for all
  to anon
  using (true)
  with check (true);

drop policy if exists "demo_anon_intake_answers" on public.intake_answers;
create policy "demo_anon_intake_answers"
  on public.intake_answers
  for all
  to anon
  using (true)
  with check (true);

drop policy if exists "demo_anon_classifications" on public.classifications;
create policy "demo_anon_classifications"
  on public.classifications
  for all
  to anon
  using (true)
  with check (true);

drop policy if exists "demo_anon_outputs" on public.outputs;
create policy "demo_anon_outputs"
  on public.outputs
  for all
  to anon
  using (true)
  with check (true);
