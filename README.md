# Qod Labs LLP — Company Website

Marketing and technical website for Qod Labs LLP (modern web engineering & intelligent AI solutions): landing page, services, portfolio, and an edge-powered contact form with live AI chat. Served as a **static Next.js export on Cloudflare Workers Static Assets**, with a worker handling the contact API and frontdesk chat proxies. Live at **https://qodlabs.in**.

## Architecture

```
Browser
  → Cloudflare (DNS + CDN + Workers)
      → Worker (worker/index.ts)
          ├── static assets from ./out        (ASSETS binding — all pages)
          ├── POST /api/contact               (validate → Turnstile siteverify →
          │                                    D1 insert → email notify to support@qodlabs.in)
          ├── POST /api/chat                  (rate limit → Turnstile → proxy to incorpify-ai-frontdesk)
          └── GET  /api/chat/poll             (proxy message polling to incorpify-ai-frontdesk)
```

- **Static site:** Next.js 14 `output: 'export'` → `out/`, served by Cloudflare's `ASSETS` binding.
- **Contact API:** `/api/contact` validates request body, verifies Cloudflare Turnstile token, writes to D1 (`contact_submissions` table with `source: 'qodlabs.in'`), and triggers notification emails via the `MAILER` service binding.
- **AI Front Desk Chat:** `/api/chat` and `/api/chat/poll` proxy to the shared `incorpify-ai-frontdesk` worker, delivering autonomous AI answers and Telegram human operator handoff.
- **Bot protection:** Cloudflare Turnstile server-side verification in the Worker.
- **Storage:** Shared `incorpify-email` D1 database (`aa1a28a7-b1c2-4990-8407-c53f826bf657`).
- **Notifications:** Service binding `MAILER` → `incorpify-email` Worker (`POST /send`).
- **CI/CD:** Cloudflare Workers Builds — pushes to `main` deploy production; PRs get preview versions.

## Tech Stack

- **Framework:** Next.js 14 (App Router, static export)
- **Language:** TypeScript
- **Styling:** Tailwind CSS, Framer Motion
- **UI Components:** Radix UI, Lucide icons, Sonner toast
- **Cloud Platform:** Cloudflare Workers (Static Assets), D1, R2, Cloudflare Email
- **Bot Protection:** Cloudflare Turnstile
- **AI Front Desk:** Cloudflare Workers AI + Vectorize + Telegram Relay

## Project Structure

```
app/                          # Static pages (Server Components) + *-client.tsx (interactive UI)
├── page.tsx / _components/   # Home (hero, capabilities, about preview, portfolio preview, CTA)
├── about|services|portfolio|contact/   # Core marketing and technical service pages
├── layout.tsx                # Fonts, theme, Turnstile + chat scripts, metadata
├── robots.ts / sitemap.ts    # Static robots.txt / sitemap.xml
worker/
├── index.ts                  # Worker entry: /api/contact, /api/chat, /api/chat/poll, ASSETS fallthrough
└── tsconfig.json             # Worker TypeScript config
d1/
└── 0001_contact_submissions.sql   # D1 schema (idempotent, source: 'qodlabs.in')
components/ | hooks/ | lib/
wrangler.jsonc                # Cloudflare Worker config: assets, bindings, vars
.env.production               # NEXT_PUBLIC_TURNSTILE_SITE_KEY (public site key)
.npmrc                        # legacy-peer-deps=true
.nvmrc                        # 22 (pinned Node version)
DEPLOY.md                     # Full deployment runbook
```

## Configuration

Build-time (public, committed in `.env.production`):

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Turnstile **site** key (public; inlined into the client bundle) |

Worker secrets (set via `wrangler secret put` / Cloudflare Dashboard):

| Secret | Description |
|---|---|
| `TURNSTILE_SECRET` | Turnstile secret key (server-side siteverify) |
| `INBOX_API_KEY` | Bearer for the `incorpify-email` Worker's `/send` |
| `FRONTDESK_PROXY_SECRET` | Secret key shared with the `incorpify-ai-frontdesk` Worker |

Bindings and environment variables in `wrangler.jsonc`:
- `DB` (D1 `incorpify-email`)
- `R2` (`incorpify-mail-r2`)
- `MAILER` (service binding to `incorpify-email`)
- `FRONTDESK` (service binding to `incorpify-ai-frontdesk`)
- `NOTIFY_TO`: `support@qodlabs.in`
- `NOTIFY_FROM`: `postmaster@qodlabs.in`
- `SITE_SOURCE`: `qodlabs.in`

## Local Development

```bash
npm install --legacy-peer-deps

# Build with the Turnstile TEST site key:
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run build

# Start local worker dev:
npx wrangler dev
```

Smoke test the API:

```bash
curl -s -X POST localhost:8787/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"test@qodlabs.in","message":"Hello Qod Labs","cf-turnstile-response":"test"}'
```

## Deployment

Git-connected Cloudflare Workers Builds:
1. Push to `main` branch on `https://github.com/Qod-Labs-LLP/qodlabs-website.git`.
2. Cloudflare runs `npm run build` followed by `npx wrangler deploy`.
3. Worker serves `./out` statically and handles API routes dynamically.
See **[DEPLOY.md](./DEPLOY.md)** for detailed setup instructions.
