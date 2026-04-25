# 10 · Roadmap & Offene Punkte

## Kurzfristig (sinnvoll als nächste Schritte)

### E-Mail-Benachrichtigung bei neuem Booking
- Werkstatt bekommt Mail an `info@autoservice-beuerberg.de` bei jedem Form-Submit
- Umsetzung: Resend-Integration im `/api/booking`-Endpoint
- Optional: Kunden-Bestätigungsmail mit „Wir haben Ihre Anfrage erhalten"

### Schema.org / JSON-LD `LocalBusiness`
- In `__root.tsx` als `<script type="application/ld+json">` einbetten
- Ratings, Adresse, Öffnungszeiten, Telefon
- Wirkung: Google-Knowledge-Panel, Rich-Results

### sitemap.xml + robots.txt
- Statische Server-Route `/sitemap.xml`
- Hinweis in `robots.txt`

### Per-Route og:image
- Eigene Social-Preview-Bilder pro Hauptseite (1200×630)
- Bilder in `src/assets/og/` ablegen

### Skip-to-Content-Link
- Für Tastatur-Navigation: am Anfang von `<body>` ein versteckter „Zum Inhalt springen"-Link

## Mittelfristig

### Admin-Dashboard für Anfragen
- Eigene Route `/admin` mit Login (Supabase Auth)
- Liste aller `booking_requests`, Status-Update, Notizen
- User-Roles-Tabelle (siehe Sicherheits-Pattern)

### Online-Terminbuchung mit Slot-Verfügbarkeit
- Aktuell: Wunschdatum/-Zeit als Freitext
- Erweiterung: echte Slot-Verfügbarkeit aus internem Kalender (Cal.com-Integration?)
- Erfahrungsgemäß bei KFZ aber heikel — viele Termine brauchen telefonische Vorabklärung

### Reifeneinlagerungs-Verwaltung
- Stammkunden sehen ihren eingelagerten Reifensatz
- Saison-Erinnerung per E-Mail
- Eigene Tabelle `tire_storage` mit User-Verknüpfung

### CSP-Härtung mit Nonces
- `unsafe-inline` für script-src durch Nonces ersetzen
- Pro-Request generierter Nonce in Middleware + Render

### hCaptcha als Backup zu Honeypot
- Optional bei Verdacht auf gezielten Spam
- Nur einbinden wenn Honeypot+Rate-Limit nicht reichen

## Nice-to-have

### Plausible Analytics
- DSGVO-konform, kein Consent-Banner-Zwang
- Conversion-Ziel: Anruf-Klicks + Form-Submits

### Bilder-Optimierung
- WebP/AVIF-Varianten
- `<picture>` mit srcset für Hero
- Aktuell: nur Vite-Default

### Werkstatt-Galerie als eigene Seite
- Mehr Bilder von Werkstatt, Team, Arbeit
- Inspirationsmaterial: Vor/Nach-Reparaturen

### Newsletter
- Saisonale Reminder (Reifenwechsel, HU/AU-Termin)
- Double-Opt-In via Resend

## Bewusst NICHT geplant

- **Online-Bezahlung** — KFZ-Werkstatt rechnet nach Auftrag ab
- **Live-Chat** — Telefon ist persönlicher und schneller
- **Multi-Language** — lokaler Markt 100% deutschsprachig
- **Komplexe Konfigurator-Wizards** für Inspektionspakete — überfordert Stammkunden
- **Dark Mode** — Cream-Premium-Look ist bewusste Marken-Entscheidung

## Wartungs-Checkliste

- [ ] Quartalsweise: Google-Bewertungen in `src/lib/reviews.ts` aktualisieren
- [ ] Jährlich: Öffnungszeiten / Feiertage prüfen
- [ ] Bei Team-Änderungen: `SITE.owners` anpassen
- [ ] Bei Adress-/Telefon-Änderung: nur `src/lib/site.ts` editieren
- [ ] Nach Schema-Änderungen: `supabase--linter` + manueller Security-Scan
