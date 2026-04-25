# 04 · Design-System

## Designprinzipien

- **Premium, aber bodenständig**: Serif-Headings (Fraunces) + warme Cream-Töne — nicht „Tech-Startup", nicht „Discount".
- **Telefonisch ist erste Wahl**: Anruf-CTAs überall prominent (Header, Hero, Sticky-Bar, Footer, Final-Block).
- **Vertrauen durch Konkretheit**: Echte Bewertungen, echte Familiennamen, KFZ-Meister-Siegel, Stats-Bar.

## Farben (Tokens in `src/styles.css`)

| Token | Verwendung |
|---|---|
| `--background` | Site-Hintergrund (warmes Off-White) |
| `--foreground` | Standardtext (dunkles Anthrazit) |
| `--primary` | Markenblau — CTAs, Links, Akzente |
| `--primary-hover` | Hover-State |
| `--primary-foreground` | Text auf Primary (weiß) |
| `--cream` / `--cream-deep` | Sektions-Hintergründe (warm) |
| `--gold` | Sekundär-Akzent (Sterne, Footer-Icons) |
| `--card`, `--border`, `--muted`, `--muted-foreground` | Standard-Shadcn-Tokens |
| `--destructive` | Form-Errors |

**Regel**: NIEMALS `text-white`, `bg-black`, `text-blue-500` o. ä. direkt verwenden — immer Tokens via Tailwind-Klassen.

## Typografie

- **Headings**: `font-serif` (Fraunces, opsz 9–144)
- **Body & UI**: `font-sans` (Inter)
- **Hero-Titel**: `text-5xl md:text-7xl` mit serif
- **Eyebrows**: `text-xs uppercase tracking-[0.18em]` in primary

## Schatten / Effekte

| Klasse | Zweck |
|---|---|
| `shadow-warm` | Buttons, Hero-CTAs |
| `shadow-soft` | Cards, Forms |
| `shadow-elegant` | Premium-Hover, Final-CTA |

## Wiederkehrende Komponenten

| Komponente | Pfad | Zweck |
|---|---|---|
| `PageHero` | `src/components/PageHero.tsx` | Header für Unterseiten (Eyebrow, Titel, Subtitle, Breadcrumbs, optional Trust-Strip) |
| `SiteHeader` | `src/components/SiteHeader.tsx` | Sticky-Nav, Logo links, Anruf-Button rechts, Mobile-Hamburger |
| `MobileActionBar` | `src/components/MobileActionBar.tsx` | Fixed-Bottom (Mobile only): Anrufen + Anfragen, 48px Touch-Targets, Safe-Area-Inset |
| `GoogleRatingBadge` | `src/components/GoogleRatingBadge.tsx` | „4.6★ auf Google" Pille, light/dark Varianten |
| `MapEmbed` | `src/components/MapEmbed.tsx` | Lazy-Loading Google-Maps-iframe |
| `CookieBanner` | `src/components/CookieBanner.tsx` | DSGVO-Consent, jetzt über MobileActionBar positioniert |

## Layout-Container

- `container-tight` — max-width ~1200px mit horizontalem Padding
- Sektionen: `py-16 md:py-24` Standard
- Section-Wechsel: `bg-cream/40` für Alternation

## Interaktions-Patterns

- **CTAs**: `rounded-full` für Primary (markant), `rounded-2xl` für Cards
- **Hover**: subtile `transition-colors` 200–300ms, leichtes Shadow-Up
- **Animationen**: `fade-in-up` mit `animationDelay` für Hero-Stagger
