# Deploying qodlabs-website to Cloudflare (Workers Static Assets)

Static Next.js export (`out/`) served by a **Cloudflare Worker with Static Assets**. The Worker
(`worker/index.ts`) serves the assets and runs server code for:
- **`POST /api/contact`** — validate → **Turnstile** siteverify → store in the shared `incorpify-email` **D1** (`contact_submissions` with `source: 'qodlabs.in'`) → notify by e-mail (`support@qodlabs.in`) via **service binding** (`MAILER`) to the `incorpify-email` Worker.
- **`POST /api/chat` & `GET /api/chat/poll`** — rate limit → Turnstile gate → proxy to **service binding** (`FRONTDESK`) to the `incorpify-ai-frontdesk` Worker with `site: 'qodlabs.in'`.
- Everything else falls through to `env.ASSETS.fetch(request)`.

## Architecture

```
Browser
  → Cloudflare (DNS + CDN + Workers)
      → Worker (worker/index.ts)
          ├── static assets from ./out        (ASSETS binding — all pages)
          ├── POST /api/contact               (validate → Turnstile siteverify →
          │                                    D1 insert → email notify to support@qodlabs.in)
          └── POST /api/chat & /poll          (rate limit → Turnstile → proxy to FRONTDESK)
```

## One-time setup

### 1. GitHub repo
```bash
git remote add origin git@github.com:Qod-Labs-LLP/qodlabs-website.git
git push -u origin main
```

### 2. Turnstile widget
Create a Turnstile widget for `qodlabs.in` in the Cloudflare dashboard:
- Name: `qodlabs.in Turnstile`
- Domains: `qodlabs.in`, `staging.qodlabs.in`, `localhost`, and your `*.workers.dev` preview domain.
- Mode: Managed.
- Set the generated **site key** in `.env.production` as `NEXT_PUBLIC_TURNSTILE_SITE_KEY=<site_key>`.
- Set the matching **secret key** via `npx wrangler secret put TURNSTILE_SECRET` or via the dashboard.

### 3. Cloudflare Workers Builds project (Git-connected)
Dashboard → **Workers & Pages → Create → Import a repository** → `Qod-Labs-LLP/qodlabs-website`.
- **Worker name:** `qodlabs-website`
- **Build command:** `npm run build`
- **Deploy command:** `npx wrangler deploy` (and NOTHING else).
- **Production branch:** `main`
- **Node version:** pinned to `22` via committed `.nvmrc`.

Bindings come directly from `wrangler.jsonc` (committed):
- `ASSETS` (→ `./out`)
- `DB` (D1 `incorpify-email`, `aa1a28a7-b1c2-4990-8407-c53f826bf657`)
- `R2` (`incorpify-mail-r2`)
- service `MAILER` → `incorpify-email`
- service `FRONTDESK` → `incorpify-ai-frontdesk`
- `NOTIFY_TO` = `support@qodlabs.in`, `NOTIFY_FROM` = `postmaster@qodlabs.in`, `SITE_SOURCE` = `qodlabs.in`

### 4. Secrets
Configure secrets on the Worker:
```bash
npx wrangler secret put TURNSTILE_SECRET        # Turnstile secret key for qodlabs.in
npx wrangler secret put INBOX_API_KEY           # Bearer for incorpify-email Worker's /send
npx wrangler secret put FRONTDESK_PROXY_SECRET   # Secret shared with incorpify-ai-frontdesk
```
Or set them via Dashboard: Worker → **Settings → Variables and Secrets**.

### 5. Custom Domain
Under Worker → **Settings → Domains & Routes**:
1. Add `staging.qodlabs.in` as a custom domain for staging verification.
2. Add `qodlabs.in` (and `www.qodlabs.in`) as custom domains for production cutover.

## Local development

```bash
npm install --legacy-peer-deps

# Build with the Turnstile TEST site key for local testing:
NEXT_PUBLIC_TURNSTILE_SITE_KEY=1x00000000000000000000AA npm run build

# Run local worker dev:
npx wrangler dev
```

Smoke test the contact endpoint:
```bash
curl -s -X POST localhost:8787/api/contact -H 'Content-Type: application/json' \
  -d '{"name":"Test User","email":"test@qodlabs.in","message":"Hello from dev","cf-turnstile-response":"test"}'
```
