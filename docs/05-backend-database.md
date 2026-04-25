# 05 · Backend & Datenbank

## Übersicht

Backend läuft auf **Lovable Cloud** (Supabase). Aktuell zwei Tabellen:

## `booking_requests`

Speichert eingehende Kontaktformular-Anfragen.

| Spalte | Typ | Default | Nullable |
|---|---|---|---|
| `id` | uuid | `gen_random_uuid()` | NO |
| `created_at` | timestamptz | `now()` | NO |
| `name` | text | — | NO |
| `phone` | text | — | YES |
| `email` | text | — | NO |
| `vehicle` | text | — | YES |
| `service` | text | — | YES (joined comma-string oder "Allgemeine Anfrage") |
| `requested_date` | date | — | YES |
| `requested_time` | text | — | YES |
| `message` | text | — | YES |
| `status` | text | `'new'` | NO |

**Index**: `created_at DESC`

### RLS-Policies (alle Deny für anon/authenticated)

```sql
CREATE POLICY "Deny anon read" ON booking_requests
  FOR SELECT TO anon, authenticated USING (false);

CREATE POLICY "Deny anon write" ON booking_requests
  FOR INSERT TO anon, authenticated WITH CHECK (false);
```

→ Inserts erfolgen ausschließlich über die **Service-Role** (Server-Endpoint).
→ Lesen ist nur über die Lovable-Cloud-Konsole möglich.

## `rate_limits`

Anti-Spam-Tabelle für IP-basierte Drosselung.

| Spalte | Typ | Default |
|---|---|---|
| `id` | uuid | `gen_random_uuid()` |
| `bucket` | text | — (z. B. `"booking"`) |
| `key` | text | — (IP-Adresse) |
| `created_at` | timestamptz | `now()` |

**Index**: `(bucket, key, created_at DESC)`

**RLS**: Deny-All für anon/authenticated — nur Service-Role schreibt/liest.

## API-Endpoint: `POST /api/booking`

Datei: `src/routes/api.booking.tsx`

**Request-Body** (JSON):
```ts
{
  requestType?: "general" | "services",
  name: string (2-100),
  phone?: string,
  email: string (email),
  vehicle?: string,
  services?: string[] (max 9),
  service?: string,
  date?: string,
  time?: string,
  message: string (5-1500),
  consent: true,         // muss exakt true sein
  website?: ""           // Honeypot — muss leer
}
```

**Verarbeitung**:
1. JSON parsen → 400 bei Fehler
2. Zod-Validierung → 400 bei Fehler
3. Honeypot-Check: wenn `website` befüllt, **fake 200 OK**, kein Insert
4. Rate-Limit: max. **5 Requests pro IP / 10 Minuten** → 429
5. Service-Text bauen (Multi-Select join, Fallback "Allgemeine Anfrage")
6. Insert via `supabaseAdmin`

**Responses**: `200 {ok:true}` · `400 {error}` · `429 {error}` · `500 {error}`

## Erwartete Erweiterungen (siehe Roadmap)

- E-Mail-Benachrichtigung an Werkstatt bei neuem Booking (Resend / SMTP)
- Admin-Dashboard zur Anfragen-Übersicht (mit Login)
- Status-Updates (`new` → `contacted` → `done`)
