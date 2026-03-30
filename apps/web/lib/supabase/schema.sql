-- SmartProBono MVP — run in Supabase SQL editor or via migration tool.
-- After this, either:
--   A) Use SUPABASE_SERVICE_ROLE_KEY in Next.js (no extra SQL), or
--   B) Run policies-anon-demo.sql so publishable/anon key can write from Route Handlers (demo only).

create extension if not exists "pgcrypto";

create table if not exists public.intake_sessions (
  id uuid primary key default gen_random_uuid(),
  module_slug text not null,
  current_step_key text,
  status text not null default 'in_progress'
    check (status in ('in_progress', 'completed', 'abandoned')),
  anonymous_client_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.intake_answers (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.intake_sessions (id) on delete cascade,
  question_key text not null,
  step_key text not null,
  value jsonb not null,
  updated_at timestamptz not null default now(),
  unique (session_id, question_key)
);

create table if not exists public.classifications (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.intake_sessions (id) on delete cascade,
  stage text,
  urgency text,
  label text,
  issue_flags jsonb,
  rule_trace jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.outputs (
  id uuid primary key default gen_random_uuid(),
  session_id uuid not null references public.intake_sessions (id) on delete cascade,
  type text not null default 'workflow_result',
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists intake_answers_session_id_idx
  on public.intake_answers (session_id);

create index if not exists classifications_session_id_idx
  on public.classifications (session_id);

create index if not exists outputs_session_id_idx
  on public.outputs (session_id);

create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists intake_sessions_set_updated_at on public.intake_sessions;
create trigger intake_sessions_set_updated_at
before update on public.intake_sessions
for each row execute function public.set_updated_at();

-- MVP: allow anon/service access via API (no direct browser writes). Enable RLS and add policies when wiring Better Auth.

alter table public.intake_sessions enable row level security;
alter table public.intake_answers enable row level security;
alter table public.classifications enable row level security;
alter table public.outputs enable row level security;

-- Service role bypasses RLS. For anon key from browser later, replace with user-scoped policies.

create policy "service_role_all_intake_sessions"
  on public.intake_sessions for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "service_role_all_intake_answers"
  on public.intake_answers for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "service_role_all_classifications"
  on public.classifications for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');

create policy "service_role_all_outputs"
  on public.outputs for all
  using (auth.role() = 'service_role')
  with check (auth.role() = 'service_role');
