# 06 · Sicherheitskonzept

## Aktuell implementiert

### 1. Datenbank-Sicherheit
- **RLS aktiv** auf allen Public-Tabellen (`booking_requests`, `rate_limits`)
- **Explizite Deny-Policies** für anon und authenticated (kein Read, kein Write)
- Inserts ausschließlich über **Service-Role im Server-Endpoint**
- Service-Role-Key nur in `client.server.ts`, niemals im Browser-Bundle

### 2. Input-Validierung
- **Zod-Schema** im Endpoint validiert Typen, Längen und Pflichtfelder
- E-Mail-Format-Check, max. 1500 Zeichen Nachricht
- `consent` muss literal `true` sein — sonst 400

### 3. Anti-Spam / Anti-Abuse
- **Honeypot-Feld** (`website`): visuell verborgen via `position: absolute; left: -9999px`, `tabindex="-1"`. Bots füllen es typischerweise — Server gibt dann fake-200 zurück, speichert aber nichts.
- **Rate-Limiting**: max. 5 Anfragen pro IP / 10 Minuten. IP aus `x-forwarded-for` / `cf-connecting-ip` / `x-real-ip`.
- **Bei Limit-Überschreitung**: `429` mit Hinweistext „Bitte später erneut oder telefonisch melden."

### 4. Security-Headers (global via `src/start.ts`)

| Header | Wert |
|---|---|
| `Content-Security-Policy` | siehe unten |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(), microphone=(), camera=(), payment=()` |
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |

### 5. CSP-Policy

```text
default-src 'self';
script-src 'self' 'unsafe-inline' 'unsafe-eval';
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
font-src 'self' https://fonts.gstatic.com data:;
img-src 'self' data: blob: https:;
frame-src https://www.google.com https://www.google.de https://maps.google.com;
connect-src 'self' https://*.supabase.co wss://*.supabase.co;
object-src 'none';
base-uri 'self';
form-action 'self';
frame-ancestors 'self';
```

**Notiz**: `unsafe-inline`/`unsafe-eval` sind nötig für TanStack Start Hydration und Tailwind. Mittelfristig kann mit Nonces gehärtet werden (siehe Roadmap).

### 6. Datenschutz / DSGVO
- **Cookie-Banner** mit Opt-In (essenzielle Cookies / Marketing)
- Map-Embed als iframe (Google Maps) — nur nach Consent / sichtbar gemacht
- Datenschutzerklärung verlinkt im Formular-Consent + Footer
- Consent-Checkbox im Formular muss explizit angehakt werden

## Bekannt nicht implementiert (bewusst)

- **Kein User-Login** — Website ist rein öffentlich, kein User-Konto nötig
- **Kein Captcha** (Honeypot + Rate-Limit reichen für Werkstatt-Volumen, hCaptcha wäre Roadmap-Punkt)
- **Keine 2FA** (kein Login)

## Audit-Hinweise

- Letzter Security-Scan (April 2026): keine kritischen Findings, alle Warnings adressiert
- `supabase--linter`: keine Issues
- Manuelle Review nötig nach jeder Schema-Änderung
