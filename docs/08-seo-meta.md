# 08 · SEO & Meta-Tags

## Strategie

**Lokales SEO** ist der Hauptfokus. Werkstatt sucht keine Bundesweit-Sichtbarkeit, sondern Eurasburg + Umkreis (Wolfratshausen, Bad Tölz, Geretsried, Königsdorf).

## Pro-Route Meta-Tags

Jede Route definiert eigene `head()` mit:
- `<title>` (50–60 Zeichen, Markenname am Ende)
- `<meta name="description">` (140–160 Zeichen, mit Telefonnummer wo sinnvoll)
- `og:title`, `og:description` für Social-Sharing

Beispiel `/kontakt`:
```ts
{ title: "Kontakt — Autoservice Beuerberg | 24/7 telefonisch erreichbar" }
{ name: "description", content: "Telefonisch rund um die Uhr erreichbar: 08179 929244 …" }
```

## Root-Defaults (`__root.tsx`)
- `viewport`: `width=device-width, initial-scale=1`
- `theme-color`: `#1E5AA8` (Primary)
- `og:type`: `website`
- `og:locale`: `de_DE`
- `og:site_name`: `Autoservice Beuerberg`
- `twitter:card`: `summary_large_image`
- **Bewusst KEIN globales `og:image`** — würde alle Per-Page-Images überschreiben

## Geplante Erweiterungen (Roadmap)

### Schema.org / JSON-LD
Structured Data für `LocalBusiness` / `AutomotiveBusiness`:
```json
{
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  "name": "Autoservice Beuerberg GmbH",
  "address": { ... },
  "telephone": "+49-8179-929244",
  "openingHours": "Mo-Fr 08:00-17:00",
  "aggregateRating": { "ratingValue": "4.6", "reviewCount": "..." }
}
```
→ wichtig für Google-Rich-Results (Knowledge-Panel)

### sitemap.xml
- Statisch generiert oder als Server-Route
- Listet alle Public-Routes mit lastmod

### robots.txt
- `Allow: /`
- `Sitemap: https://autoservice-beuerberg.de/sitemap.xml`
- `Disallow: /api/`

### Per-Route og:image
- Pro Seite eigenes Hero-Bild als `og:image` (z. B. Reifenservice → Reifen-Hero)
- Auflösung 1200×630

## Performance (SEO-relevant)

- **SSR aktiviert** → schneller First-Contentful-Paint, indexierbarer Content
- **Vite-Asset-Optimierung** für Bilder
- **Schriften via preconnect** zu fonts.gstatic.com
- **Lazy-Loading** Map-iframe (verhindert Render-Block)

## Lokale Signale

- Verifizierter **Google-Maps-Eintrag** mit Place-ID `0x479db8a7ae26a865:0x24f5af4b0ba698e7`
- **Maps-Embed** auf Kontaktseite verstärkt lokale Relevanz
- **Adresse + Telefon konsistent** in Header/Footer/Kontakt/Impressum (NAP-Konsistenz)
- **Bewertungen-Seite** mit echten Reviews → Trust-Signal für Crawler

## Tracking (aktuell NICHT aktiv)

- Kein Google Analytics, kein Plausible installiert
- Cookie-Banner ist vorbereitet, falls später Marketing-Pixel ergänzt werden
- Empfehlung: **Plausible** (DSGVO-konform, kein Consent-Banner-Zwang)
