import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/datenschutz")({
  head: () => ({
    meta: [
      { title: "Datenschutz — Autoservice Beuerberg GmbH" },
      { name: "description", content: "Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Datenschutz,
});

function Datenschutz() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Datenschutz" subtitle="Informationen zur Verarbeitung personenbezogener Daten." breadcrumbs={[{ label: "Datenschutz" }]} showTrustStrip={false} />
      <section className="pb-20">
        <div className="container-tight max-w-2xl">
          <Block title="1. Verantwortlicher">
            <p>
              {SITE.legalName}<br />
              {SITE.street}, {SITE.zip} {SITE.city}<br />
              Telefon: {SITE.phone} · E-Mail: {SITE.email}
            </p>
          </Block>

          <Block title="2. Hosting">
            <p>
              Diese Website wird auf einer Edge-Infrastruktur in der EU
              betrieben. Beim Aufruf werden technisch notwendige Daten (z. B.
              IP-Adresse, Datum, Uhrzeit, Browsertyp) für maximal 7 Tage in
              Server-Logs gespeichert (Rechtsgrundlage Art. 6 Abs. 1 lit. f
              DSGVO – Bereitstellung und Sicherheit der Website).
            </p>
          </Block>

          <Block title="3. Kontakt- und Terminformular">
            <p>
              Wenn Sie uns über das Online-Formular eine Terminanfrage
              schicken, verarbeiten wir die von Ihnen angegebenen Daten
              (Name, Telefon, E-Mail, Fahrzeug, gewünschte Leistung,
              Wunschtermin, Nachricht) zur Bearbeitung Ihrer Anfrage
              (Art. 6 Abs. 1 lit. b DSGVO). Die Daten werden in einer
              gesicherten Datenbank gespeichert und nach Abschluss des
              Anliegens spätestens nach Ablauf gesetzlicher Aufbewahrungs­fristen
              gelöscht.
            </p>
          </Block>

          <Block title="4. Google Maps">
            <p>
              Wir binden eine interaktive Karte des Dienstes „Google Maps"
              (Google Ireland Ltd.) ein. Die Karte wird erst nach Ihrer
              ausdrücklichen Einwilligung im Cookie-Hinweis geladen. Mit der
              Einwilligung wird Ihre IP-Adresse an Google übermittelt und es
              können Cookies gesetzt werden. Eine Datenübermittlung in die
              USA ist nicht ausgeschlossen. Rechtsgrundlage: Art. 6 Abs. 1
              lit. a DSGVO.
            </p>
          </Block>

          <Block title="5. Google-Bewertungen (Places API)">
            <p>
              Auf der Bewertungsseite zeigen wir aktuelle Rezensionen, die
              wir serverseitig über die offizielle Google Places API laden.
              Dabei wird ausschließlich unsere Werkstatt-ID an Google
              gesendet — Ihre IP-Adresse wird hierbei nicht übertragen, da
              der Abruf vom Server erfolgt. Verantwortlich für die
              Bewertungsplattform ist Google.
            </p>
          </Block>

          <Block title="6. Facebook-Seitenplugin">
            <p>
              Wir binden auf der Bewertungsseite ein offizielles Facebook
              Page Plugin ein, das aktuelle Beiträge unserer Facebook-Seite
              zeigt. Das Plugin wird erst nach Ihrer Einwilligung geladen.
              Anbieter ist Meta Platforms Ireland Ltd. Mit dem Laden werden
              Daten (z. B. IP-Adresse, Browserinformationen, ggf. Cookies)
              an Meta übermittelt. Eine Datenübermittlung in die USA ist
              nicht ausgeschlossen. Rechtsgrundlage: Art. 6 Abs. 1 lit. a
              DSGVO.
            </p>
          </Block>

          <Block title="7. Cookies">
            <p>
              Wir setzen ausschließlich technisch notwendige Cookies. Ihre
              Entscheidung über die Einbettung externer Inhalte (Google Maps,
              Facebook) speichern wir lokal in Ihrem Browser
              („localStorage"), damit Sie nicht bei jedem Besuch erneut
              gefragt werden.
            </p>
          </Block>

          <Block title="8. Ihre Rechte">
            <p>
              Sie haben jederzeit Anspruch auf Auskunft, Berichtigung,
              Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit
              und Widerspruch (Art. 15–21 DSGVO) sowie auf Beschwerde bei
              einer Aufsichtsbehörde. Zuständig ist das Bayerische
              Landesamt für Datenschutzaufsicht (BayLDA).
            </p>
          </Block>

          <Block title="9. Kontakt zum Datenschutz">
            <p>
              Bei Fragen wenden Sie sich an:{" "}
              <a href={`mailto:${SITE.email}`} className="text-primary hover:underline">
                {SITE.email}
              </a>
            </p>
          </Block>

          <p className="mt-10 text-sm">
            <Link to="/impressum" className="text-primary hover:underline">Zum Impressum →</Link>
          </p>
        </div>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="font-serif text-xl text-foreground">{title}</h2>
      <div className="mt-2 text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
}
