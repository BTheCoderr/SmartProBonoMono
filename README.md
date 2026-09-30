# SmartProBono Monorepo — Architecture Prototype

<!-- repo-intro:start -->
**Project snapshot:** An earlier SmartProBono Turborepo/monorepo experiment used to explore shared packages, multiple Next.js apps, Supabase-backed development, and a scalable workspace structure.

**What it demonstrates:** Turborepo · pnpm workspaces · Next.js · TypeScript · shared packages · monorepo architecture.
<!-- repo-intro:end -->

## Repository role

This repo is an **architecture/prototyping branch of the SmartProBono ecosystem**, not the canonical public product repository.

The current unified SmartProBono Legal + IP direction lives in **smartprobonoip**, while this repository is retained to show the earlier monorepo exploration and shared-package setup.

## Workspace

The project uses Turborepo and pnpm workspaces for multiple applications and shared configuration/packages.

See:

- `docs/local-setup.md` for local installation and Supabase notes
- root `package.json` for workspace scripts
- app/package directories for the individual Next.js surfaces

## Commands

```bash
pnpm install
pnpm dev
pnpm build
pnpm lint
pnpm check-types
```

## Why it remains in the portfolio

It documents the move from isolated applications toward reusable packages and a more intentional platform architecture.
