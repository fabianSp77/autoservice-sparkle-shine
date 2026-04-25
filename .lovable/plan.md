## Recherche-Ergebnisse (verifiziert)

**Firmendaten (aus Gelbe Seiten, Das Örtliche, Das Gelbe Blatt):**
- Name: Autoservice Beuerberg GmbH
- Inhaber: Jürgen & Monika Fischer (Familienunternehmen, Sohn Ludwig im Betrieb)
- Gegründet: 2009 (Neubau begann 2008, viel Eigenleistung)
- Adresse: Bahnhofstr. 45, 82547 Eurasburg-Beuerberg
- Telefon: 08179 92 92 44
- Öffnungszeiten: Mo–Fr 08:00–17:00 (Sa/So geschlossen — laut Gelbe Seiten)
- Fotos: 17 Originalbilder verfügbar bei dasgelbeblatt.de (`assets/images/28/487/28487*-autoservice-beuerberg-*.jpg`)

**Google-Bewertungen:** Direktes Scraping ist nicht zuverlässig möglich (Google rendert clientseitig, blockiert Bots). Echte Bewertungen lassen sich nur über die **Google Places API** holen — dafür braucht es einen Google Maps Platform API Key vom Inhaber.

**Facebook:** Profil existiert, aber Facebook blockiert Scraping. Wir können aber das offizielle **Facebook Page Plugin** als iFrame einbetten (zeigt automatisch die letzten Posts) — funktioniert nur mit der echten Page-URL des Inhabers.

---

## Plan: Was umgesetzt wird

### 1. Verifizierte Stammdaten in `src/lib/site.ts` aktualisieren
- Öffnungszeiten korrigieren auf **Mo–Fr 08:00–17:00** (Sa/So geschlossen)
- Telefonnummer bestätigen: `08179 929244`
- Inhaber & Gründungsjahr bestätigt im About-Bereich

### 2. Echte Werkstatt-Fotos einbauen (statt KI-generierter Bilder)
- 6–8 der 17 Originalbilder von dasgelbeblatt.de via Build-Skript herunterladen
- Lokal in `src/assets/real/` ablegen (lizenzrechtlicher Hinweis: Bilder sind © Autoservice Beuerberg laut Quelle)
- Hero-, Werkstatt- und Service-Bilder ersetzen
- Galerie-Sektion auf Startseite + `/ueber-uns` mit echten Bildern

### 3. Echte Google-Bewertungen via Places API
- Edge Route `/api/reviews` (server function) holt Reviews via Google Places API (`place_id` ist bekannt: `ChIJZahmrqe4nUcR54emC0uv9SQ`)
- Caching: 24h serverseitig im Memory + via TanStack Query auf Client
- Fallback-UI wenn API-Key fehlt: Hinweis + Link zum Google-Profil
- **Wir benötigen vom Inhaber einen `GOOGLE_MAPS_API_KEY` mit aktivierter Places API** — wird via `add_secret` angefragt, sobald der Plan genehmigt ist
- Anzeige: Sterne-Schnitt, Anzahl, 3–5 jüngste Reviews mit Autor, Datum, Text auf `/bewertungen` + Teaser auf Startseite
- "Bewertung schreiben"-Button verlinkt direkt auf das Google-Bewertungsformular

### 4. Facebook-Integration
- Footer + Header: Facebook-Icon-Link zur Page
- `/bewertungen` (oder neuer Bereich auf Startseite): **Facebook Page Plugin** als iFrame eingebettet, zeigt die letzten Posts in einem schmalen Widget (300×500px)
- **Wir benötigen die exakte Facebook-Page-URL** — Inhaber muss bestätigen (z.B. `facebook.com/AutoserviceBeuerberg`); wird per `ask_questions` nachgefragt

### 5. Impressum + Datenschutz (Pflicht in DE)
- `/impressum` mit echten Daten (Geschäftsführer, HRB falls bekannt, USt-ID Platzhalter)
- `/datenschutz` mit Hinweisen zu Google Maps, Google Reviews API, Facebook-Embed (Cookies)

### 6. Cookie-Hinweis
- Da Facebook-Embed und Google Maps Tracker setzen, dezenter Consent-Banner (eigene minimale Lösung, keine Zusatz-Library)

---

## Was wir vom Inhaber brauchen (nach Plan-Genehmigung)

1. **Facebook-Page-URL** bestätigen
2. **Google Maps API Key** (mit Places API enabled) — Anleitung wird mitgeliefert
3. Optional: Eigene Logo-Datei
4. Optional: Höher aufgelöste Original-Bilder (sonst nehmen wir die aus dem Presseartikel)

## Technische Details

- Bilder-Download als einmaliges Build-Skript (`scripts/fetch-images.ts`), Bilder werden als statische Assets eingecheckt
- Google Places API call: `https://maps.googleapis.com/maps/api/place/details/json?place_id=...&fields=reviews,rating,user_ratings_total&key=...`
- Cache-Layer: serverseitiger In-Memory-Cache mit 24h TTL (Places API Pricing schonen)
- Facebook Plugin: `https://www.facebook.com/plugins/page.php` iframe, kein API-Key nötig
- Cookie-Consent-State in `localStorage`, Embeds erst nach Zustimmung geladen
