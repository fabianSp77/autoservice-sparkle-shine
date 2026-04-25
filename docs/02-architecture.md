# 02 · Architektur & Tech-Stack

## Stack

| Schicht | Technologie |
|---|---|
| Framework | TanStack Start v1 (React 19, SSR) |
| Build | Vite 7 + `@lovable.dev/vite-tanstack-config` |
| Routing | TanStack Router (file-based, `src/routes/`) |
| Styling | Tailwind CSS v4 (via `src/styles.css`, OKLCH-Tokens) |
| UI-Komponenten | shadcn/ui (Radix-basiert) |
| Icons | lucide-react |
| Toasts | sonner |
| Validierung | Zod |
| Backend | Lovable Cloud (Supabase) |
| Hosting | Cloudflare Workers (Edge SSR) via Lovable |

## Verzeichnisstruktur

```text
src/
├── routes/                 # File-based Routing
│   ├── __root.tsx          # Root-Layout, Header/Footer/Toaster/MobileBar
│   ├── index.tsx           # Startseite
│   ├── leistungen.tsx      # Service-Übersicht
│   ├── reifenservice.tsx   # Reifenservice (eigene Landingpage)
│   ├── ueber-uns.tsx       # Familie & Werkstatt
│   ├── bewertungen.tsx     # Google-Reviews (alle)
│   ├── kontakt.tsx         # Kontaktformular + Telefon-CTA
│   ├── impressum.tsx
│   ├── datenschutz.tsx
│   └── api.booking.tsx     # Server-Endpoint POST /api/booking
├── components/
│   ├── SiteHeader.tsx      # Sticky-Header, Mobile-Menü
│   ├── SiteFooter.tsx
│   ├── MobileActionBar.tsx # Sticky Anrufen/Anfragen unten (Mobile)
│   ├── PageHero.tsx        # Wiederverwendbarer Page-Header
│   ├── MapEmbed.tsx        # Google Maps iframe
│   ├── GoogleRatingBadge.tsx
│   ├── CookieBanner.tsx
│   ├── FacebookFeed.tsx
│   └── ui/                 # shadcn/ui-Primitives
├── lib/
│   ├── site.ts             # Single Source of Truth (Adresse, Telefon, Links)
│   ├── reviews.ts          # Verifizierte Google-Bewertungen (statisch)
│   └── utils.ts            # cn() Helper
├── assets/                 # Bilder (Hero, Reifen, Werkstatt …)
├── integrations/supabase/  # Auto-generiert (NICHT editieren)
├── styles.css              # Tailwind v4 Tokens & Globals
├── router.tsx              # Router-Setup
└── start.ts                # Globale Request-Middleware (Security-Headers)

supabase/
└── migrations/             # SQL-Migrationen (Auto-managed)

docs/                       # Diese Planungsdokumente
```

## Daten-Flow (Kontaktformular)

```text
User (Browser)
  └─ POST /api/booking  (JSON: name, email, message, …)
       │
       ▼
  TanStack Server-Route (Edge Worker)
   1. Zod-Validierung
   2. Honeypot-Check
   3. Rate-Limit-Check (max. 5 / 10 min / IP)
   4. Insert via supabaseAdmin (Service-Role)
       │
       ▼
  Supabase: booking_requests (RLS = Deny anon)
```

## Wichtige Architektur-Entscheidungen

- **File-Routing statt Hash-Anchors**: Jede Sektion ist eigene Route mit eigenem `<head>` (SEO, Social-Sharing).
- **Server-Endpoint statt Direct-Insert**: Anonyme User können die DB nicht direkt beschreiben — RLS verweigert alles, der Server fügt mit Service-Role hinzu nach Validierung + Rate-Limit.
- **Static Reviews**: Keine Live-Google-Places-API (kostet, fehleranfällig). Reviews werden manuell vom Inhaber gepflegt in `src/lib/reviews.ts`.
- **`src/lib/site.ts` als Single Source of Truth**: Adresse, Telefon, Maps-Links zentral — Änderungen propagieren überall.
