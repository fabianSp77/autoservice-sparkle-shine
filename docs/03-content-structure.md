# 03 · Inhaltsstruktur & Routen

## Sitemap

```text
/                    Startseite
├── /leistungen      Komplette Service-Übersicht (3 Gruppen)
├── /reifenservice   Eigene Landingpage (saisonal sehr wichtig)
├── /ueber-uns       Team Fischer, Geschichte, Werte
├── /bewertungen     Alle Google-Reviews (verifiziert)
├── /kontakt         Telefon-CTA + Schreibformular
├── /impressum       Pflichtangaben
└── /datenschutz     DSGVO
```

## Seite für Seite

### `/` — Startseite
- **Hero** mit Werkstatt-Bild, Eyebrow „Familienbetrieb seit 2009", Doppel-CTA (Anrufen / Schriftlich)
- **Stats-Bar** (Desktop): 4,6★ · 15+ Jahre · Alle Marken · 24/7 — *einmalig*, keine Doppelung mit Hero-Inline-Trustzeile (die nur Mobile sichtbar)
- **Trust-Strip** (Mobile): KFZ-Meister, Familienbetrieb, transparente Preise, alle Marken
- **Leistungen-Grid** (6 Kacheln nummeriert 01–06) mit Lucide-Icons
- **Ablauf-Sektion** „So arbeiten wir" (5 Schritte horizontal)
- **Bewertungen-Grid** (3 ausgewählte Reviews kompakt)
- **Bento-Galerie** (1 großes + 3 kleine Werkstatt-Bilder)
- **Final-CTA** (Gradient-Block, 24/7-Telefon)

### `/leistungen`
- 3 Service-Gruppen: *Service & Sicherheit*, *Fahrwerk & Reifen*, *Komfort/Elektrik/Pflege*
- Sticky Quick-Nav springt zu den Gruppen
- Jede Karte: nummeriert, Icon, Bullet-Liste der Sub-Leistungen
- „Warum wir"-Block + Final-CTA

### `/reifenservice`
- Eigene Landing wegen Saisonalität (Sommer/Winter, Reifenhotel)
- Hero-Bild Reifen, Sommer/Winter-Vorteile, Reifenhotel-Erklärung
- Preisanker („ab xx €" — bewusst keine Festpreise wegen Schwankungen)

### `/ueber-uns`
- Familie Fischer, Geschichte seit 2009, Meister-Qualifikation
- Werkstatt-Bilder, Werte (Ehrlichkeit, Persönlichkeit, Qualität)

### `/bewertungen`
- Alle echten Google-Reviews aus `src/lib/reviews.ts`
- Inhaber-Antworten falls vorhanden
- CTA „Bewertung schreiben" → Deeplink zu Google

### `/kontakt`
- **Großer Telefon-CTA-Block** ganz oben (empfohlen, schnellster Weg)
- **Formular** zweispaltig: Anfragetyp (Allgemein / Konkrete Leistung), Persönliche Daten, Service-Auswahl (nur bei „Leistung"), Nachricht, Consent
- **Sidebar**: Telefon-Karte, E-Mail-Karte, Adresse, Öffnungszeiten, Map-Embed
- **Hidden Honeypot** gegen Bots

### `/impressum`, `/datenschutz`
- Pflichtangaben nach TMG / DSGVO
- Verweise auf Cookie-Banner-Setup

## Konsistenz-Regeln

- **Telefon immer aus `SITE.phone` / `SITE.phoneIntl`** — niemals hardcoded
- **Adressblöcke aus `SITE.street/zip/city`**
- **Maps-Links aus `SITE.mapsLink`** (verifizierte Place-ID)
- **Review-Link aus `SITE.googleReviewLink`** (verifizierter CID-Deeplink)
- **Bilder in `src/assets/`**, importiert als ES-Module für Vite-Optimierung
