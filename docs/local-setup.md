# Local setup (pnpm + Supabase)

## Package manager: use pnpm, not npm at the repo root

This repo is a **pnpm** monorepo (`packageManager": "pnpm@9.0.0"`). Running `npm install` at the root can hit a different dependency tree and bogus conflicts (e.g. `knip` / `eslint`).

`apps/web` already lists `@supabase/supabase-js` — you do **not** need a separate Supabase install step.

From the **repository root**:

```sh
cd /path/to/SmartProBonoMono
pnpm install
```

To add a dependency **only to the web app**:

```sh
pnpm add some-package --filter web
```

Do **not** use `npm install …` at the monorepo root for normal workflow.

---

## Supabase environment variables

Put secrets in **`apps/web/.env.local`** (gitignored — never commit).

### Public / anon key (JWT `eyJ…`)

From **Supabase → Project Settings → API → anon public**. The app reads it as:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Some dashboards use a **publishable** key instead of the word “anon”. Either name works in code:

- `NEXT_PUBLIC_SUPABASE_ANON_KEY`, or  
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY`

Restart the dev server after changing env:

```sh
pnpm --filter web dev
```

### Server writes without the service role

If you are **not** setting `SUPABASE_SERVICE_ROLE_KEY`, run the SQL in **`apps/web/lib/supabase/policies-anon-demo.sql`** in the Supabase SQL Editor (after **`apps/web/lib/supabase/schema.sql`**) so API routes using the anon key can insert/update intake tables.

**Recommended for production:** add **`SUPABASE_SERVICE_ROLE_KEY`** (service role **secret** from the same API settings) **only** on the server / in `.env.local` — never expose it to the client. With the service role, you do not need the anon demo policies for those server routes.

### Database password

The password you chose when creating the Supabase project is for **Postgres / pooler** connections, not for these Next.js env vars.

---

## Security

- Do **not** commit `.env.local` or paste real keys into GitHub issues or public chats if you can avoid it.
- The anon key is intended for client-side use, but it can still be abused; rotate it in **Settings → API** if needed.

---

## Related files

| File | Purpose |
|------|--------|
| `apps/web/.env.example` | Template env names (no real secrets) |
| `apps/web/lib/supabase/schema.sql` | Tables for intake sessions |
| `apps/web/lib/supabase/policies-anon-demo.sql` | Demo RLS for anon-only server usage |
