/*
# Create applications table

1. Purpose
   Stores mentorship applications submitted from the public landing page.
   This is a no-auth (single-tenant) site: visitors are not signed in, so the
   frontend uses the anon key. We allow public INSERT only (anyone may apply)
   and deny public SELECT/UPDATE/DELETE, since applications contain private
   applicant info and are reviewed manually by the Astra Capital team.

2. New Tables
   - `applications`
     - `id` (uuid, primary key)
     - `name` (text, not null) — applicant full name
     - `email` (text, not null) — applicant email
     - `track` (text, not null) — selected track ("new", "part-time", "full-time", "scaling")
     - `experience` (text, nullable) — free-text experience description
     - `capital` (text, nullable) — trading capital band
     - `goal` (text, nullable) — what they want from mentorship
     - `status` (text, not null default 'received') — review pipeline status
     - `created_at` (timestamptz, default now())

3. Security
   - Enable RLS on `applications`.
   - INSERT policy for `anon, authenticated` (public may submit applications).
   - No SELECT/UPDATE/DELETE policies for anon — applications are private and
     managed server-side by the team, so the public cannot read or modify them.

4. Notes
   - Idempotent: safe to re-run.
   - `status` defaults to 'received'; the team updates it manually server-side.
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  track text NOT NULL,
  experience text,
  capital text,
  goal text,
  status text NOT NULL DEFAULT 'received',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "public_insert_applications" ON applications;
CREATE POLICY "public_insert_applications"
  ON applications FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Index newest-first for manual review
CREATE INDEX IF NOT EXISTS applications_created_at_idx
  ON applications (created_at DESC);
