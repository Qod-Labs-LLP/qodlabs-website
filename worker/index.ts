/// <reference types="@cloudflare/workers-types" />

// Cloudflare Worker (Static Assets) for qodlabs.in.
//   - static export in ./out is served by the ASSETS binding (assets take
//     precedence for existing files; this handler only runs for /api/* and
//     genuine asset misses).
//   - POST /api/contact  →  validate → Turnstile siteverify → store in the
//     shared incorpify-email D1 (contact_submissions) → notify by e-mail via the
//     incorpify-email Worker (service binding MAILER → POST /send).
//   - POST /api/chat & GET /api/chat/poll → rate limit → Turnstile gate for
//     new sessions → proxy to FRONTDESK (incorpify-ai-frontdesk Worker).

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  R2: R2Bucket;
  MAILER: Fetcher; // service binding → incorpify-email Worker
  FRONTDESK: Fetcher; // service binding → incorpify-ai-frontdesk Worker
  CHAT_LIMITER: RateLimit;
  TURNSTILE_SECRET: string;
  FRONTDESK_PROXY_SECRET: string;
  INBOX_API_KEY: string;
  NOTIFY_TO: string;
  NOTIFY_FROM: string;
  SITE_SOURCE: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const JSON_HEADERS = { "Content-Type": "application/json" };

const err = (message: string, status = 400) =>
  new Response(JSON.stringify({ error: message }), { status, headers: JSON_HEADERS });

async function verifyTurnstile(secret: string, token: string, ip: string | null): Promise<boolean> {
  if (!token) return false;
  const form = new FormData();
  form.append("secret", secret);
  form.append("response", token);
  if (ip) form.append("remoteip", ip);
  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: form,
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

async function handleContact(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  if (request.method !== "POST") return err("Method not allowed", 405);

  let body: Record<string, unknown> | null = null;
  try {
    body = await request.json();
  } catch {
    return err("Invalid request body");
  }
  if (!body) return err("Invalid request body");

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const name = str(body.name);
  const email = str(body.email);
  const phone = str(body.phone);
  const service = str(body.service);
  const message = str(body.message);
  const token = str(body["cf-turnstile-response"]) || str(body.turnstileToken);

  if (!name || !email || !message) return err("Name, email, and message are required.");
  if (!EMAIL_RE.test(email)) return err("Please enter a valid email address.");

  const ip = request.headers.get("CF-Connecting-IP");
  const ok = await verifyTurnstile(env.TURNSTILE_SECRET, token, ip);
  if (!ok) return err("Bot verification failed. Please try again.", 403);

  const id = crypto.randomUUID();
  try {
    await env.DB.prepare(
      `INSERT INTO contact_submissions (id, name, email, phone, service, message, status, source, remote_ip)
       VALUES (?, ?, ?, ?, ?, ?, 'new', ?, ?)`,
    )
      .bind(id, name, email, phone, service, message, env.SITE_SOURCE || "qodlabs.in", ip)
      .run();
  } catch (e) {
    console.error("contact D1 insert failed:", e);
    return err("Failed to submit. Please try again later.", 500);
  }

  // Notify by e-mail via the mail Worker. Non-fatal: the submission is already
  // captured in D1, so a mail hiccup must not fail the user's request.
  const subject = `New contact enquiry — ${name}${service ? ` (${service})` : ""}`;
  const text =
    `New contact form submission on ${env.SITE_SOURCE || "qodlabs.in"}\n\n` +
    `Name:    ${name}\n` +
    `Email:   ${email}\n` +
    `Phone:   ${phone || "—"}\n` +
    `Service: ${service || "—"}\n` +
    `IP:      ${ip || "—"}\n` +
    `Ref:     ${id}\n\n` +
    `Message:\n${message}\n`;

  ctx.waitUntil(
    env.MAILER.fetch("https://mailer.internal/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.INBOX_API_KEY}`,
      },
      body: JSON.stringify({ from: env.NOTIFY_FROM, to: env.NOTIFY_TO, subject, text }),
    })
      .then(async (r) => {
        if (!r.ok) console.error("contact notify failed:", r.status, await r.text());
      })
      .catch((e) => console.error("contact notify error:", e)),
  );

  return new Response(JSON.stringify({ success: true, id }), { status: 201, headers: JSON_HEADERS });
}

async function handleChat(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") return err("Method not allowed", 405);

  let body: Record<string, unknown> | null = null;
  try {
    body = await request.json();
  } catch {
    return err("Invalid request body");
  }
  if (!body) return err("Invalid request body");

  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");
  const sessionId = str(body.session_id);
  const sessionToken = str(body.session_token);
  const message = str(body.message);
  if (!message || message.length > 3000) return err("Enter a message of up to 3000 characters.");
  const ip = request.headers.get("CF-Connecting-IP") || "unknown";
  const { success: allowed } = await env.CHAT_LIMITER.limit({ key: ip });
  if (!allowed) return err("Too many chat messages. Please try again shortly.", 429);

  let siteSecurityVerified = false;
  if (!sessionId) {
    if (str(body.website)) return err("Invalid request");
    siteSecurityVerified = await verifyTurnstile(env.TURNSTILE_SECRET, str(body.turnstile_token), ip);
    if (!siteSecurityVerified) return err("Bot verification failed. Please try again.", 403);
  }

  const payload = {
    session_id: sessionId || undefined,
    session_token: sessionToken || undefined,
    message,
    name: str(body.name) || undefined,
    email: str(body.email) || undefined,
    phone: str(body.phone) || undefined,
    site: env.SITE_SOURCE || "qodlabs.in",
    site_security_verified: siteSecurityVerified,
  };

  const response = await env.FRONTDESK.fetch("https://frontdesk.internal/chat", {
    method: "POST",
    headers: {
      ...JSON_HEADERS,
      "X-Frontdesk-Site-Secret": env.FRONTDESK_PROXY_SECRET,
    },
    body: JSON.stringify(payload),
  });
  return new Response(response.body, { status: response.status, headers: JSON_HEADERS });
}

async function handleChatPoll(request: Request, env: Env): Promise<Response> {
  const url = new URL(request.url);
  const target = new URL("https://frontdesk.internal/chat/messages");
  target.searchParams.set("session_id", url.searchParams.get("session_id") || "");
  target.searchParams.set("session_token", url.searchParams.get("session_token") || "");
  target.searchParams.set("after", url.searchParams.get("after") || "0");
  target.searchParams.set("site", env.SITE_SOURCE || "qodlabs.in");
  const response = await env.FRONTDESK.fetch(target.toString(), {
    headers: { "X-Frontdesk-Site-Secret": env.FRONTDESK_PROXY_SECRET },
  });
  return new Response(response.body, { status: response.status, headers: JSON_HEADERS });
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === "/api/contact") {
      return handleContact(request, env, ctx);
    }
    if (url.pathname === "/api/chat") return handleChat(request, env);
    if (url.pathname === "/api/chat/poll") return handleChatPoll(request, env);
    // Not an API route → serve the static export (incl. 404 handling).
    return env.ASSETS.fetch(request);
  },
};
