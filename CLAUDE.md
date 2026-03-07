# CLAUDE.md — Dilu

> Agent guidance for AI coding assistants (Claude, Copilot, Cursor, etc.).
> Read this file in full before making any changes to this repository.

---

## What Is Dilu?

Dilu is the WokSpec **no-code product builder** — a launchpad that lets anyone build and launch a production product without writing code. Users browse a curated template gallery (AI News Platform, Tool Suite, AI Assistant, Discord Bot, Content Generator, Agency Console), configure their product through a guided wizard, choose a domain, and get a fully deployed, Cloudflare-hosted product in minutes.

Dilu is part of the WokSpec ecosystem alongside wokpost (AI news), eral (AI assistant), and WokTool. It is source-available under **FSL-1.1-MIT**.

**Live URL:** https://dilu.wokspec.org

---

## Repository Layout

```
Dilu/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/
│   │   │   └── waitlist/       # POST /api/waitlist — KV-backed signups
│   │   ├── start/              # /start — 4-step launch wizard
│   │   ├── templates/
│   │   │   └── [id]/           # /templates/:id — individual template detail
│   │   ├── layout.tsx          # Root layout (fonts, metadata, EralWidget)
│   │   ├── page.tsx            # Home: Nav + Hero + TemplateGallery + Waitlist
│   │   └── globals.css         # Tailwind base + CSS custom properties
│   ├── components/
│   │   ├── wizard/             # Multi-step launch wizard
│   │   │   ├── WizardShell.tsx # Wizard state machine + step router
│   │   │   ├── StepTemplate.tsx
│   │   │   ├── StepConfigure.tsx
│   │   │   ├── StepDomain.tsx
│   │   │   └── StepReview.tsx
│   │   ├── EralWidget.tsx      # Dilu AI assistant chat bubble
│   │   ├── Features.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── Nav.tsx
│   │   ├── TemplateCard.tsx
│   │   ├── TemplateGallery.tsx
│   │   └── Waitlist.tsx
│   └── lib/
│       └── templates.ts        # Template registry (ids, config fields, metadata)
├── wrangler.toml               # Cloudflare Pages config + KV bindings
├── open-next.config.ts         # @opennextjs/cloudflare config
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── package.json
```

---

## High-Fidelity UI Standards (Anti-Vibe-Coded)

Dilu must follow the WokSpec High-Fidelity UI Standards defined in [../UI_STANDARDS.md](../UI_STANDARDS.md).

- **8pt Spacing:** Use strict 4/8pt increments for all layout gaps and paddings.
- **Loading States:** Mandatory loading indicators or skeleton screens for all async actions (e.g. wizard transitions, waitlist submission).
- **Consistency:** Maintain uniform border-radii (e.g., matching wizard cards and template cards) and typography ramps.
- **Anti-Vibe:** Avoid random purple gradients and sparkle emoji overkill in hero sections and taglines.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, React 19) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| Runtime | Cloudflare Pages via `@opennextjs/cloudflare` |
| KV Storage | Cloudflare KV (`WAITLIST_KV`) |
| AI Widget | Eral (WokSpec AI) |
| Build | `next build` → `opennextjs-cloudflare build` → `wrangler pages deploy` |
| Typecheck | `tsc --noEmit` |

---

## Architecture: Cloudflare Pages + opennextjs-cloudflare

Dilu runs entirely on **Cloudflare Pages** using the `@opennextjs/cloudflare` adapter. There is no traditional Node.js server.

### How the build pipeline works

```
npm run build:cf
  → next build            (outputs .next/)
  → opennextjs-cloudflare build --skipNextBuild
                           (transforms .next/ → .open-next/)
npm run assemble
  → copies .open-next/ assets → .deploy/
  → writes .deploy/_routes.json
wrangler pages deploy .deploy --project-name wokspec-dilu
```

The assembled output at `.deploy/`:
- `_worker.js` — the Cloudflare Worker entry point
- `_routes.json` — controls which requests go to the Worker vs static assets
- `_next/static/` — Next.js static chunks, served directly from CDN
- `cloudflare/` — CF-specific runtime shims (skew protection, image handler)
- `server-functions/` — SSR server functions
- `middleware/` — Edge middleware

### Local development

```bash
npm run dev          # Next.js dev server with Turbopack (fast, but no CF bindings)
npm run preview      # Full CF Pages emulation via wrangler pages dev
```

Use `npm run preview` to test anything that touches CF bindings (KV, etc.).

---

## Edge Runtime Constraints

> **Critical: Cloudflare Workers is NOT Node.js.**

All server-side code in Dilu runs in the **Cloudflare Workers runtime**, which is V8-based. Constraints:

- ❌ No Node.js built-ins: `fs`, `path`, `crypto` (use `globalThis.crypto`), `process.env` (use CF bindings or `NEXT_PUBLIC_*`)
- ❌ No `require()` — ESM only
- ❌ No long-running background tasks (Workers have CPU time limits)
- ✅ Use `fetch()` for all HTTP calls
- ✅ Use CF bindings for storage (`WAITLIST_KV`, future `DB`, etc.)
- ✅ `nodejs_compat` flag is enabled in `wrangler.toml` — gives access to some Node.js APIs

The `nodejs_compat` compatibility flag is set in `wrangler.toml`:
```toml
compatibility_flags = ["nodejs_compat"]
```
This enables a subset of Node.js APIs but does NOT make it a full Node.js environment.

---

## Accessing Cloudflare Bindings

Use the `@opennextjs/cloudflare` context helper:

```typescript
import { getCloudflareContext } from '@opennextjs/cloudflare';

// In API routes or Server Components:
const ctx = await getCloudflareContext({ async: true });
const kv = ctx.env.WAITLIST_KV;
```

**Do NOT** use `globalThis.__env__` or `process.env` for CF bindings — these are deprecated / non-functional patterns. The `getCloudflareContext({ async: true })` pattern is the correct approach.

Available bindings (wrangler.toml):
- `WAITLIST_KV` — KV namespace for waitlist entries

---

## Key Environment Variables

| Variable | Where set | Purpose |
|----------|-----------|---------|
| `NEXT_PUBLIC_BASE_URL` | `wrangler.toml [vars]` | Public base URL (`https://dilu.wokspec.org`) |
| `WAITLIST_KV` | CF Pages binding (KV namespace) | Stores waitlist email entries |

`NEXT_PUBLIC_*` vars are inlined at build time (accessible in client components).
CF bindings are only accessible in server-side code via `getCloudflareContext()`.

---

## Route Structure

### Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `app/page.tsx` | Home: Hero, template gallery, waitlist signup |
| `/start` | `app/start/page.tsx` | 4-step launch wizard |
| `/start?template=<id>` | `app/start/page.tsx` | Pre-select a template and skip step 0 |
| `/templates/[id]` | `app/templates/[id]/page.tsx` | Individual template detail page |

### API Routes

| Route | Method | Auth | Description |
|-------|--------|------|-------------|
| `/api/waitlist` | `POST` | None | Add email + config to waitlist KV |

---

## Template Registry (`src/lib/templates.ts`)

All available templates are defined in `src/lib/templates.ts`. Each template has:

```typescript
type Template = {
  id: string;                  // e.g. 'ai-news', 'tool-suite'
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  tags: string[];
  liveUrl?: string;            // live demo URL
  color: string;               // accent hex color
  icon: string;                // emoji icon
  status: 'available' | 'coming-soon';
  features: string[];
  stack: { label: string; value: string }[];
  configFields: ConfigField[]; // wizard config inputs
};
```

Current templates:
- `ai-news` — AI News Platform (based on WokPost)
- `tool-suite` — 80+ browser-based utilities (based on WokTool)
- `ai-assistant` — Branded AI assistant (based on Eral)
- `discord-bot` — Discord bot with dashboard (based on Chopsticks)
- `content-gen` — AI content studio (WokGen, coming soon)
- `agency-console` — CRM + client platform (coming soon)

**To add a new template:** append a new `Template` object to the `templates` array in `src/lib/templates.ts`. Ensure `id` is URL-safe (kebab-case), `configFields` covers all user-configurable values, and `status` is set correctly.

---

## The Launch Wizard (`src/components/wizard/`)

The wizard is a client-side state machine implemented in `WizardShell.tsx`. It manages:

```typescript
type WizardState = {
  templateId: string;    // selected template id
  config: Record<string, string>; // per-template config fields
  domain: string;        // desired domain
  email: string;         // user email
};
```

**Steps:**

1. **StepTemplate** — Browse and select a template
2. **StepConfigure** — Fill in template-specific config fields (from `template.configFields`)
3. **StepDomain** — Choose a domain / subdomain
4. **StepReview** — Preview config and submit (calls `POST /api/waitlist`)

Deep-link to wizard with pre-selected template: `/start?template=<templateId>` — WizardShell reads the `template` query param and skips to step 1.

---

## Waitlist API (`src/app/api/waitlist/route.ts`)

```typescript
POST /api/waitlist
Content-Type: application/json

{
  "email": "user@example.com",
  "templateId": "ai-news",       // optional
  "config": { "siteName": "..." } // optional
}
```

Stores to KV with key `waitlist:<email>`:
```json
{
  "email": "user@example.com",
  "templateId": "ai-news",
  "config": { ... },
  "joinedAt": "2025-01-01T00:00:00.000Z"
}
```

**Accessing the KV namespace in API routes:**
```typescript
import { getCloudflareContext } from '@opennextjs/cloudflare';
const ctx = await getCloudflareContext({ async: true });
const kv = ctx.env.WAITLIST_KV;
await kv.put(key, JSON.stringify(entry));
```

---

## Eral Widget (`src/components/EralWidget.tsx`)

The `EralWidget` is an AI chat bubble embedded in the Dilu UI. It is contextually aware of Dilu's available templates and the WokSpec product ecosystem.

- Chat context: System prompt identifies it as "Dilu, the WokSpec launchpad assistant"
- Backend: calls Eral API (WokSpec AI) — `https://eral.wokspec.org/api`
- Session: per-browser random ID (`dilu-<random>`)
- Client component only (`'use client'`) — zero server-side code

If you add new templates, update the `CONTEXT` string in `EralWidget.tsx` to include the new template description.

---

## Integration Patterns: WokSpec Ecosystem

Dilu is the **launchpad** — it deploys other WokSpec products as independent instances. It doesn't directly integrate with Shopify, Stripe, or Discord at the Dilu codebase level; those integrations live in the respective product templates.

| Template | Integration |
|----------|------------|
| AI News Platform (wokpost) | Cloudflare D1, KV, Workers AI, GitHub Actions cron |
| Discord Bot (Chopsticks) | Discord Gateway API, Lavalink, PostgreSQL |
| AI Assistant (Eral) | Workers AI (Llama 3.3 70B), Cloudflare KV |
| Tool Suite (WokTool) | Fully client-side, no backend |

When adding template integrations to the Dilu config wizard, keep config fields generic (e.g. collect API keys as text inputs) — Dilu itself never holds integration secrets; they're handed off during deployment.

---

## Styling System

Dilu uses **Tailwind CSS 3** with a custom design system using CSS variables. Key custom tokens (defined in `globals.css` / `tailwind.config.ts`):

- `bg-dilu-bg` — dark background
- `text-dilu-muted` — secondary text
- `border-dilu-border` — subtle borders
- `text-dilu-purple` — primary accent (purple)
- `bg-dilu-purple/20` — translucent accent background
- `text-dilu-green` — success / completed state

Do not use hardcoded hex values in components — use the design token classes.

---

## Adding a New API Route

1. Create `src/app/api/<name>/route.ts`
2. Export named HTTP method handlers (`GET`, `POST`, etc.)
3. Access CF bindings via `getCloudflareContext({ async: true })`
4. Return `NextResponse.json(...)` — never use Node.js `res.send()`
5. Add input validation at the top of the handler before any side effects
6. Never log secrets or user emails to `console.log` in production

Example:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from '@opennextjs/cloudflare';

export async function POST(req: NextRequest) {
  const body = await req.json();
  // validate...
  const ctx = await getCloudflareContext({ async: true });
  const kv = ctx.env.WAITLIST_KV;
  // ...
  return NextResponse.json({ ok: true });
}
```

---

## Adding a New Page

1. Create `src/app/<route>/page.tsx`
2. Default export a React Server Component (RSC) unless interaction requires `'use client'`
3. Prefer RSC for static/fetchable content; only add `'use client'` when required
4. Add metadata export for SEO:
```typescript
export const metadata = { title: 'Page Title | Dilu', description: '...' };
```

---

## How to Add a New Integration (for future product templates)

When Dilu starts managing live integrations (Shopify, Stripe, Discord) for deployed products:

1. **Never store third-party API keys in KV plaintext** — encrypt before storing or use Cloudflare Secrets
2. Add a new `configField` entry to the relevant template in `templates.ts`
3. Add an API route at `src/app/api/<integration>/route.ts` to proxy calls
4. Validate HMAC signatures on all inbound webhooks (Shopify, Stripe, Discord all sign webhook payloads)
5. Keep integration clients in `src/lib/<integration>.ts` — never inline API calls in route handlers

---

## Webhook Handling (Future)

When adding webhook endpoints for integrations:

### Shopify
- Verify `X-Shopify-Hmac-Sha256` header using `HMAC-SHA256(body, shopifySecret)`
- Use `crypto.subtle.verify` (Web Crypto API) — available in CF Workers

### Stripe
- Verify `Stripe-Signature` header with `stripe.webhooks.constructEvent()`
- Raw body must be preserved — do not call `req.json()` before verification

### Discord
- Verify `X-Signature-Ed25519` + `X-Signature-Timestamp` using Ed25519
- Discord uses Ed25519, not HMAC — use `crypto.subtle.verify` with `Ed25519` algorithm

Example HMAC verification pattern for CF Workers:
```typescript
async function verifyHmac(body: string, signature: string, secret: string): Promise<boolean> {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
  );
  const sig = Uint8Array.from(Buffer.from(signature, 'hex'));
  return crypto.subtle.verify('HMAC', key, sig, enc.encode(body));
}
```

---

## Auth (Current Status)

Dilu currently has **no authentication**. The wizard and waitlist are public. There are no `(auth)/` routes.

When auth is added:
- Use NextAuth v5 with CF Workers adapter (same pattern as wokpost)
- Auth routes: `src/app/(auth)/` (route group, no URL segment)
- Store sessions in KV or D1, not filesystem
- Gate any user-specific API routes with session validation at the top of the handler

---

## Build & Development Commands

```bash
# Install dependencies
npm install

# Development (Turbopack, fast, no CF bindings emulation)
npm run dev

# Full CF Pages local preview (includes KV bindings via wrangler)
npm run preview

# TypeScript type check
npm run typecheck         # tsc --noEmit

# Production build (Next.js)
npm run build

# Full Cloudflare build (Next + opennext transform)
npm run build:cf

# Assemble deploy artifact
npm run assemble          # copies .open-next → .deploy

# Deploy to Cloudflare Pages
npm run deploy            # build:cf + assemble + wrangler pages deploy
```

---

## wrangler.toml Reference

```toml
name = "wokspec-dilu"
compatibility_date = "2026-02-20"
compatibility_flags = ["nodejs_compat"]
pages_build_output_dir = ".deploy"

[vars]
NEXT_PUBLIC_BASE_URL = "https://dilu.wokspec.org"

[[kv_namespaces]]
binding = "WAITLIST_KV"
id = "97ea97b2c7854e94adc79f9dfd965c68"
```

To add a new KV namespace:
1. Create it in the Cloudflare dashboard or with `wrangler kv:namespace create <NAME>`
2. Add `[[kv_namespaces]]` block to `wrangler.toml` with `binding` and `id`
3. Access via `ctx.env.<BINDING_NAME>` after `getCloudflareContext()`

---

## Commit Conventions

This repo uses **Conventional Commits**:

```
feat:     new feature
fix:      bug fix
chore:    maintenance, deps, tooling
refactor: internal restructure (no behavior change)
docs:     documentation only
perf:     performance improvement
style:    formatting, no logic change
```

**All AI-authored commits must include:**
```
Co-authored-by: Copilot <223556219+Copilot@users.noreply.github.com>
```

Examples:
```
feat: add Shopify integration template
fix: correct KV key collision on duplicate emails
chore: upgrade @opennextjs/cloudflare to 1.18.0
```

---

## Agent Guidance

### What agents should do
- Read this file and the relevant source files before making changes
- Prefer editing existing files over creating new ones
- Follow the existing component and naming patterns
- Keep components small and focused; extract logic to `src/lib/`
- Always run `npm run typecheck` mentally before proposing changes
- Access CF bindings only via `getCloudflareContext({ async: true })`

### What agents must NOT do
- ❌ Add Node.js `fs`, `path`, `os`, `child_process` usage in server code
- ❌ Use `process.env` to access CF bindings (use `getCloudflareContext()`)
- ❌ Use `globalThis.__env__` (deprecated pattern)
- ❌ Hardcode API keys, secrets, or KV namespace IDs in source files
- ❌ Import server-only code into client components (`'use client'`)
- ❌ Use `require()` — ESM only
- ❌ Add `export const runtime = 'nodejs'` to new routes (unnecessary; CF handles this)
- ❌ Call `.json()` on a request body before HMAC verification in webhook routes

### Code review checklist
Before submitting a PR, verify:
- [ ] `npm run typecheck` passes
- [ ] No hardcoded secrets or API keys
- [ ] CF bindings accessed via `getCloudflareContext()` only
- [ ] New API routes validate input before side effects
- [ ] Webhook routes verify HMAC/signature before processing
- [ ] Client components have minimal dependencies (no heavy server libs)
- [ ] Conventional commit format used

---

## Project Context: WokSpec Ecosystem

Dilu is one of several WokSpec products:

| Product | Repo | Purpose |
|---------|------|---------|
| **Dilu** | `wokspec/Dilu` | No-code product builder (this repo) |
| **wokpost** | `wokspec/wokpost` | AI-curated news platform |
| **Eral** | `wokspec/eral` | AI assistant with memory |
| **WokTool** | `wokspec/woktool` | Browser-based utility suite |
| **Chopsticks** | `wokspec/chopsticks` | Discord bot + dashboard |
| **WokSpec Console** | `wokspec/console` | Agency CRM |

All WokSpec products share:
- Cloudflare Pages deployment via `@opennextjs/cloudflare`
- Conventional commits
- The Eral AI widget on every user-facing page
- FSL-1.1-MIT source-available license

---

## License

Source-available under **FSL-1.1-MIT**. You may use, modify, and distribute the code under the terms of the Functional Source License. The code converts to MIT after the BSL change date.

Do not remove license headers or the LICENSE file.
