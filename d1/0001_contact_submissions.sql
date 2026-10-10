-- Applies the contact_submissions table to the shared `incorpify-email` D1
-- (database_id aa1a28a7-b1c2-4990-8407-c53f826bf657). Idempotent.
--
--   npx wrangler d1 execute incorpify-email --remote --file d1/0001_contact_submissions.sql
--
-- Local dev store used by `wrangler pages dev`:
--   npx wrangler d1 execute incorpify-email --local  --file d1/0001_contact_submissions.sql

CREATE TABLE IF NOT EXISTS contact_submissions (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  phone       TEXT NOT NULL DEFAULT '',
  service     TEXT NOT NULL DEFAULT '',
  message     TEXT NOT NULL,
  status      TEXT NOT NULL DEFAULT 'new',
  source      TEXT NOT NULL DEFAULT 'qodlabs.in',
  remote_ip   TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);
