# 09 · Deployment & Domain

## Hosting-Setup

| Komponente | Wo |
|---|---|
| Frontend (SSR) | Cloudflare Workers via Lovable |
| Backend (DB + Edge Functions) | Lovable Cloud (Supabase) |
| Assets | gebündelt im Worker (Vite-Build) |
| DNS | Lovable-managed oder externer Registrar |

## Veröffentlichungs-Workflow

1. Im Lovable-Editor oben rechts auf **Publish** → erste Veröffentlichung erzeugt `<projekt>.lovable.app`-Subdomain
2. Spätere Frontend-Änderungen: **Publish → Update** klicken (Frontend-Deploys sind manuell)
3. Backend-Änderungen (DB-Migrations, `/api/booking`): **deployen sofort automatisch**, kein Klick nötig

## Custom Domain — `autoservice-beuerberg.de`

### Empfohlener Weg: Domain bei Lovable kaufen
- Project Settings → Domains → **Buy new domain**
- Automatische DNS-Konfiguration + SSL
- DNS-Verwaltung in der Lovable-UI (`⋯ → Configure → Manage DNS records`)

### Alternative: Bestehende Domain verbinden
1. Project Settings → Domains → **Connect Domain**
2. Beim externen Registrar (Strato/IONOS/etc.) folgende DNS-Records setzen:
   - `A @ → 185.158.133.1`
   - `A www → 185.158.133.1`
   - `TXT _lovable → lovable_verify=<Token aus UI>`
3. Beide Hostnamen (`autoservice-beuerberg.de` + `www.autoservice-beuerberg.de`) in Lovable separat eintragen
4. Einen davon als **Primary** markieren — der andere wird redirected
5. SSL wird automatisch via Let's Encrypt provisioniert (max. 72 h Wartezeit)

### Cloudflare Proxy?
Wenn DNS hinter Cloudflare-Proxy läuft: in „Connect Domain" → **Advanced** → „Domain uses Cloudflare" anhaken (CNAME-basierte Verifikation statt A-Records).

## Umgebungsvariablen

Werden automatisch von Lovable Cloud gesetzt — **niemals manuell editieren**:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`
- `SUPABASE_URL` (server)
- `SUPABASE_SERVICE_ROLE_KEY` (server, secret)

## Datenbank-Migrationen

- Werden via `supabase--migration`-Tool im Editor erstellt
- Liegen in `supabase/migrations/` (nicht manuell editieren)
- Werden bei nächstem Deploy automatisch ausgeführt
- **Niemals** `auth`/`storage`/`realtime`-Schemas anfassen

## Rollback / Versionierung

- Lovable speichert Versionsverlauf — über die Versionsleiste oben rückrollbar
- **Achtung**: Lovable Cloud kann nach Aktivierung NICHT mehr deaktiviert werden, auch ein Versions-Rollback macht das nicht rückgängig

## Monitoring

- **Edge Function Logs** über `supabase--edge_function_logs` (für Booking-Endpoint-Errors)
- **Lovable Cloud Status** via `cloud_status` Tool falls DB komisch reagiert
- Empfehlung: Externer Uptime-Monitor (z. B. Better Stack) auf `/`
