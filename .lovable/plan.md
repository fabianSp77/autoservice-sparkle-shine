## Website für Autoservice Beuerberg GmbH

Eine vertrauensvolle, bayerisch-warme Premium-Website für den Familienbetrieb (Familie Fischer, seit 2009) in Beuerberg.

### Recherchierte Eckdaten
- **Adresse:** Bahnhofstraße 45, 82547 Eurasburg-Beuerberg
- **Telefon:** 08179 929244
- **Familienbetrieb** seit 2009, gegründet von Jürgen & Monika Fischer, heute mit Sohn Ludwig Fischer
- Lage: Voralpenland zwischen Tölz, Wolfratshausen und Tegernsee

### Design-Richtung: Bayerisch & Vertrauensvoll
- **Farbpalette:** Warmes Anthrazit als Basis, sattes Bayrisch-Blau (#1E5AA8) als Primärfarbe, gebrochenes Weiß/Creme (#F8F4EC), warmes Holzbraun-Akzent
- **Typografie:** Serif-Headlines (Playfair Display oder Fraunces) für Wärme & Tradition, Inter für klare Fließtexte
- **Bildsprache:** Werkstatt-Atmosphäre, Berge im Hintergrund, persönliche Team-Fotos (Platzhalter), warmes Licht
- Subtile bayerische Elemente (dezente Rauten-Texturen, keine Klischees)
- Smooth Scroll-Animationen, sanftes Fade-in beim Scrollen

### Seitenstruktur (separate TanStack-Routen)

**1. Startseite (`/`)**
- Hero: Großes Werkstatt-/Berg-Bild, Headline „Ihre Werkstatt im Herzen von Beuerberg", Sub: „Familienbetrieb seit 2009", CTA „Termin online buchen" + „Anrufen"
- Vertrauens-Strip: „Seit 2009 · Familiengeführt · Alle Marken · Meisterbetrieb"
- Leistungs-Übersicht (6 Kacheln mit Icons)
- Über-uns-Teaser (Familie Fischer, kurzer Text + Bild)
- Reifenservice-Highlight (Saisonservice & Einlagerung)
- Bewertungs-Karussell (3-4 Top-Reviews)
- Standort-Sektion mit Karte & Öffnungszeiten
- Kontakt-CTA

**2. Leistungen (`/leistungen`)**
- Inspektion & Wartung, HU/AU, Reparaturen aller Marken, Klimaservice, Bremsen/Auspuff, Unfallinstandsetzung, Reifen & Räder, Fahrzeugaufbereitung
- Jede Leistung mit Beschreibung, Icon, optional Richtpreis-Hinweis

**3. Reifenservice & Saison (`/reifenservice`)**
- Reifenwechsel, Einlagerung mit Hotel-Konzept, Reifenkauf-Beratung
- Saison-Reminder, Online-Anfrage-Formular (Fahrzeug, Reifengröße, gewünschter Termin)
- Vorteile-Liste, Preisorientierung

**4. Über uns (`/ueber-uns`)**
- Familiengeschichte seit 2009, Werte, Meisterbetrieb-Qualität
- Team-Sektion (Jürgen, Monika, Ludwig + Mitarbeiter-Platzhalter)
- Werkstatt-Galerie

**5. Bewertungen (`/bewertungen`)**
- Kundenstimmen-Grid mit Sternen
- Vorher/Nachher-Beispiele möglich
- Link zu Google-Bewertungen

**6. Kontakt & Termin (`/kontakt`)**
- Online-Terminbuchung: Formular mit Name, Telefon, E-Mail, Fahrzeug (Marke/Modell/Bj.), Servicewahl (Dropdown), Wunschdatum, Wunschuhrzeit, Nachricht
- Allgemeines Kontaktformular
- Eingebettete Google Maps Karte mit Standort
- Adresse, Telefon, E-Mail, Öffnungszeiten klar dargestellt
- Anfahrtsbeschreibung

### Funktionen
- **Online-Terminbuchung:** Formular speichert Anfrage + sendet E-Mail an Werkstatt + Bestätigungs-E-Mail an Kunden
- **Kontaktformular:** Per E-Mail an Werkstatt, Bestätigung an Kunde
- **Google Maps:** Eingebettete Karte mit Marker auf der Kontaktseite
- Sticky Header mit „Anrufen"-Button (Mobile prominent)
- Footer mit Kontakt, Öffnungszeiten, Schnell-Links, Impressum-/Datenschutz-Platzhalter

### Technische Umsetzung
- TanStack Start mit separater Route pro Seite (eigene SEO-Meta-Tags je Seite)
- Tailwind v4 + benutzerdefiniertes Designsystem in `src/styles.css` (Bayrisch-Blau, Creme, Anthrazit als HSL/oklch Tokens)
- shadcn-Komponenten für Form, Input, Select, Calendar, Card, Button, Toast
- Lovable Cloud aktivieren für: Termin-/Kontakt-Formular-Speicherung in DB + Lovable Email für Versand
- Zod-Validierung aller Formulareingaben
- Google Maps via einfacher iframe-Einbettung (kein API-Key nötig)
- Voll responsiv, Mobile-First, A11y, sauberes SEO (Title, Meta, OG-Tags pro Route)

### Hinweis zu Inhalten
- Texte werden professionell und vertrauensvoll auf Deutsch verfasst
- Bilder sind hochwertige Platzhalter (Werkstatt-/Bergbilder), die Familie Fischer kann später eigene Fotos einsetzen
- Impressum/Datenschutz als Platzhalter — die echten Texte muss die Werkstatt rechtssicher selbst einsetzen
