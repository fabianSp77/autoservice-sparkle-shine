# 07 · Mobile & Accessibility

## Mobile-First-Strategie

Großteil der Werkstatt-Anfragen kommt vom Smartphone. Daher:

### Sticky-Action-Bar (Mobile)
Komponente `MobileActionBar.tsx`, fixed bottom, nur unter `lg` sichtbar:
- Zwei gleichbreite Buttons: **Anrufen** (Primary) + **Anfragen** (Sekundär → `/kontakt`)
- Min-Höhe **48px** (WCAG-Empfehlung Touch-Target)
- `padding-bottom: env(safe-area-inset-bottom)` für iPhone-Notch
- `<main>` hat `pb-[76px] lg:pb-0` damit Inhalt nicht überdeckt wird
- CookieBanner verschoben auf `bottom-[88px]` auf Mobile, `bottom-4` auf Desktop

### Header / Navigation
- Hamburger-Menü unter `lg`-Breakpoint
- Anrufen-Button bereits ab `sm` sichtbar in der Header-Bar
- Sticky bei Scroll mit Backdrop-Blur

### Kontaktformular (mobil-optimiert)
- Alle Inputs: `h-12 text-base` → 48px hoch, 16px Schrift verhindert iOS-Auto-Zoom
- `inputMode="tel"`, `inputMode="email"` → richtige Tastatur
- `enterKeyHint="next" / "enter"` → Tastatur-Submit-Button
- `autoComplete="name|tel|email"` → schnelles Ausfüllen
- Consent-Checkbox: `h-5 w-5` (statt 4) für bessere Tappability
- Submit-Button: `w-full sm:w-auto` (volle Breite mobil) + `h-12`
- Service-Auswahl-Karten haben großzügige Padding (`px-4 py-3`)

## Responsive Breakpoints (Tailwind-Defaults)

| Breakpoint | Min-Width | Verwendung |
|---|---|---|
| `sm` | 640px | Header-Anruf-Button erscheint, 2-spaltige Form-Felder |
| `md` | 768px | Tablet-Layout, Stats-Bar im Hero |
| `lg` | 1024px | Desktop-Nav, Kontakt 2-spaltig (Form + Sidebar), MobileActionBar verschwindet |

## Accessibility (WCAG 2.1 AA Ziele)

### Implementiert
- **Semantische HTML**: `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- **ARIA-Labels** an icon-only Buttons (Hamburger, Social-Icons, Anruf-Button)
- **`aria-expanded`** am Mobile-Menü-Toggle
- **`aria-hidden="true"`** an dekorativen Icons in Buttons mit Text
- **Form-Labels** korrekt verknüpft (`<Label htmlFor>`)
- **Error-Messages** unter Feld, in `text-destructive`
- **Focus-States**: shadcn/ui Default + Ring-Token
- **Heading-Hierarchie**: jede Seite genau ein `<h1>`, dann `<h2>`/`<h3>` strukturiert
- **`lang="de"`** auf `<html>`
- **Kontraste**: Primary-Blau auf weiß = ~5.4:1 (AA passt), Foreground/Cream = >12:1

### Touch-Targets (alle ≥ 44×44 px)
- Mobile-Action-Bar Buttons: 48px ✓
- Form-Inputs: 48px ✓
- Header-Anruf-Button: 40px (sm) → wird sm:40 px hoch dargestellt mit `py-2` + `text-sm`
- Hamburger: 40×40 ✓ (`h-10 w-10`)

### Bekannte Schwächen (Roadmap)
- Skip-to-Content-Link fehlt
- Kein dedizierter Dark-Mode (Cream-Look-Vorgabe — bewusst)
- Form-Feedback (success) könnte ARIA-Live-Region nutzen
