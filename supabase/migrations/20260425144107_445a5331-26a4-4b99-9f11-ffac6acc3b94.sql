-- 1) Felder lockern, die im UI optional sind
ALTER TABLE public.booking_requests
  ALTER COLUMN phone DROP NOT NULL,
  ALTER COLUMN vehicle DROP NOT NULL,
  ALTER COLUMN service DROP NOT NULL;

-- 2) Explizite Deny-Policy für anon/authenticated (Service-Role bypasst RLS ohnehin)
-- RLS ist bereits enabled. Da KEINE Policies existieren, wird bereits alles verweigert.
-- Wir machen das explizit, damit der Linter zufrieden ist UND das Verhalten dokumentiert ist.
CREATE POLICY "Deny anon read"
  ON public.booking_requests
  FOR SELECT
  TO anon, authenticated
  USING (false);

CREATE POLICY "Deny anon write"
  ON public.booking_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (false);

-- 3) Rate-Limit-Tabelle (nur via Service-Role nutzbar)
CREATE TABLE IF NOT EXISTS public.rate_limits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  bucket text NOT NULL,
  key text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS rate_limits_bucket_key_created_idx
  ON public.rate_limits (bucket, key, created_at DESC);

ALTER TABLE public.rate_limits ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Deny all anon"
  ON public.rate_limits
  FOR ALL
  TO anon, authenticated
  USING (false)
  WITH CHECK (false);