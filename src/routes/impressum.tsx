import { createFileRoute, Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/PageHero";

export const Route = createFileRoute("/impressum")({
  head: () => ({
    meta: [
      { title: "Impressum — Autoservice Beuerberg GmbH" },
      { name: "description", content: "Impressum und Anbieterkennzeichnung der Autoservice Beuerberg GmbH gemäß § 5 TMG." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: Impressum,
});

function Impressum() {
  return (
    <>
      <PageHero eyebrow="Rechtliches" title="Impressum" subtitle="Angaben gemäß § 5 TMG" breadcrumbs={[{ label: "Impressum" }]} showTrustStrip={false} />
      <section className="pb-20">
        <div className="container-tight max-w-2xl prose-like">
          <Block title="Anbieter">
            <p>
              {SITE.legalName}<br />
              {SITE.street}<br />
              {SITE.zip} {SITE.city}<br />
              Deutschland
            </p>
          </Block>

          <Block title="Kontakt">
            <p>
              Telefon: <a className="text-primary hover:underline" href={`tel:${SITE.phoneIntl}`}>{SITE.phone}</a><br />
              E-Mail: <a className="text-primary hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </Block>

          <Block title="Vertretungsberechtigte Geschäftsführer">
            <p>{SITE.owners.join(", ")}</p>
          </Block>

          <Block title="Registereintrag">
            <p>
              Eingetragen im Handelsregister<br />
              Registergericht: {SITE.registerCourt}<br />
              Registernummer: {SITE.registerNumber}
            </p>
          </Block>

          <Block title="Umsatzsteuer-ID">
            <p className="text-muted-foreground">
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: wird auf Anfrage mitgeteilt.
            </p>
          </Block>

          <Block title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
            <p>{SITE.owners[0]}<br />{SITE.street}, {SITE.zip} {SITE.city}</p>
          </Block>

          <Block title="EU-Streitschlichtung">
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a className="text-primary hover:underline" href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                https://ec.europa.eu/consumers/odr
              </a>. Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer Verbraucherschlichtungs­stelle
              teilzunehmen.
            </p>
          </Block>

          <Block title="Haftungshinweis">
            <p>
              Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine
              Haftung für die Inhalte externer Links. Für den Inhalt der
              verlinkten Seiten sind ausschließlich deren Betreiber
              verantwortlich.
            </p>
          </Block>

          <Block title="Bildnachweis">
            <p className="text-muted-foreground">
              Alle gezeigten Werkstatt- und Teamfotos: © {SITE.legalName}.
              Verwendung gemäß Pressefreigabe.
            </p>
          </Block>

          <p className="mt-10 text-sm">
            <Link to="/datenschutz" className="text-primary hover:underline">Zur Datenschutzerklärung →</Link>
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
