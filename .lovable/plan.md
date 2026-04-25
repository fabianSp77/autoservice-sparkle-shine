# Planungsdokumente für die Website neu erstellen

Ich lege im neuen Ordner `docs/` 11 Markdown-Dateien an, die den vollständigen aktuellen Stand der Website abbilden — vom Projekt-Überblick über Architektur und Sicherheit bis zur Roadmap. Diese Dokumente sind die zentrale Referenz für alle weiteren Iterationen.

## Welche Dateien entstehen

```text
docs/
├── README.md                    Inhaltsverzeichnis aller Doku-Dateien
├── 01-overview.md               Projektüberblick, Geschäftsdaten, Ziele, Zielgruppen, USP
├── 02-architecture.md           Tech-Stack, Verzeichnisstruktur, Daten-Flow, Architektur-Entscheidungen
├── 03-content-structure.md      Sitemap, Inhalt jeder Route, Konsistenz-Regeln
├── 04-design-system.md          Farb-Tokens, Typografie, Komponenten-Inventar, UI-Patterns
├── 05-backend-database.md       Tabellen-Schemas, RLS-Policies, API-Endpoint /api/booking
├── 06-security.md               Security-Headers, CSP, Honeypot, Rate-Limiting, DSGVO
├── 07-mobile-accessibility.md   MobileActionBar, Touch-Targets, WCAG-Status
├── 08-seo-meta.md               Per-Route Meta, geplantes Schema.org, lokale SEO-Signale
├── 09-deployment.md             Publishing-Workflow, Custom-Domain-Setup, Env-Vars
└── 10-roadmap.md                Offene Punkte (E-Mail-Notification, Schema.org, Admin-Dashboard …)
```

## Was die Dokumente abbilden

**Aktueller Bestand** wird vollständig dokumentiert:
- 7 öffentliche Routen + 1 API-Route (`/api/booking`)
- Datenbank: `booking_requests` + `rate_limits` mit Deny-RLS
- Security: 6 Response-Header global via `src/start.ts`, vollständige CSP
- Anti-Spam: Honeypot-Feld + IP-Rate-Limit (5 / 10 Min)
- Mobile: Sticky-Action-Bar, 48 px Touch-Targets, iOS-Zoom-Prevention
- Single Source of Truth: `src/lib/site.ts` für Adresse/Telefon/Maps-Links
- Verifizierte Daten: Google-Place-ID, echte Reviews, Handelsregister

**Roadmap** listet sinnvolle nächste Schritte:
- E-Mail-Benachrichtigung bei neuem Booking (Resend)
- Schema.org-LocalBusiness-JSON-LD für Google-Knowledge-Panel
- sitemap.xml + robots.txt
- Per-Route og:image für besseres Social-Sharing
- Skip-to-Content-Link für Tastatur-Navigation
- Mittelfristig: Admin-Dashboard, Reifeneinlagerungs-Verwaltung, CSP-Härtung

**Wartungs-Checkliste** für laufende Pflege (Reviews aktualisieren, Öffnungszeiten prüfen).

## Format

Alle Dateien in deutschem Markdown, mit Tabellen für strukturierte Daten, Code-Blöcken für SQL/Config-Beispiele und ASCII-Diagrammen wo sinnvoll. Jede Datei für sich lesbar (kein Pflicht-Reihenfolge), aber das `README.md` dient als Einstieg.

## Was sich nicht ändert

Keine Code-Änderungen am App-Code — reine Dokumentations-Erstellung. Die Dokumente liegen im `docs/`-Ordner und werden nicht im Build/Deployment der Website ausgeliefert.