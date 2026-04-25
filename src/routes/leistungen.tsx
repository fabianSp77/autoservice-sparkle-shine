import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wrench, Gauge, Snowflake, ShieldCheck, CircleDot, Sparkles,
  Disc, Battery, Cog, ArrowRight, CheckCircle2,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";
import heroImg from "@/assets/real/foto-04.jpg";

export const Route = createFileRoute("/leistungen")({
  head: () => ({
    meta: [
      { title: "Leistungen — Autoservice Beuerberg GmbH" },
      {
        name: "description",
        content:
          "Inspektion, HU/AU, Reparaturen aller Marken, Klimaservice, Bremsen, Reifen und Fahrzeugaufbereitung. Ihre Werkstatt in Eurasburg-Beuerberg.",
      },
      { property: "og:title", content: "Leistungen — Autoservice Beuerberg GmbH" },
      {
        property: "og:description",
        content:
          "Komplettes Werkstattangebot: Inspektion, HU/AU, Reparatur, Klimaservice, Reifen, Bremsen, Aufbereitung.",
      },
    ],
  }),
  component: LeistungenPage,
});

const LEISTUNGEN = [
  {
    icon: Gauge,
    title: "Inspektion & Wartung",
    text: "Wir führen die Inspektion exakt nach Herstellervorgaben durch — mit Originalteilen oder geprüfter Qualität. Garantie und Werterhalt bleiben gesichert.",
    points: ["Service nach Hersteller", "Original- oder Markenteile", "Transparente Kostenvoranschläge"],
  },
  {
    icon: ShieldCheck,
    title: "HU & AU",
    text: "Hauptuntersuchung und Abgasuntersuchung erledigen wir direkt bei uns vor Ort — ohne Umweg, mit kurzer Wartezeit und sofortiger Bescheinigung.",
    points: ["HU & AU im Haus", "Vorab-Check inklusive", "Mängelbehebung möglich"],
  },
  {
    icon: Wrench,
    title: "Reparaturen aller Marken",
    text: "Ob Motor, Getriebe, Auspuff, Elektrik oder Fahrwerk — wir reparieren markenunabhängig auf Meisterniveau. Ehrliche Diagnose, faire Preise.",
    points: ["Alle Fabrikate", "Moderne Diagnosetechnik", "Festpreise nach Absprache"],
  },
  {
    icon: Disc,
    title: "Bremsen & Auspuff",
    text: "Sicherheit beginnt beim Bremsweg. Wir prüfen, warten und tauschen Bremsbeläge, Scheiben und komplette Auspuffanlagen.",
    points: ["Brems-Komplettcheck", "Beläge & Scheiben", "Auspuff & Katalysator"],
  },
  {
    icon: Snowflake,
    title: "Klimaservice",
    text: "Klimaanlagen verlieren jährlich Kältemittel. Wir reinigen, befüllen und desinfizieren — für angenehme Fahrten und gesunde Luft.",
    points: ["R134a & R1234yf", "Filterwechsel & Hygiene", "Lecksuche"],
  },
  {
    icon: CircleDot,
    title: "Reifen & Räder",
    text: "Reifenwechsel, Auswuchten, Verkauf und sichere Einlagerung in unserem Reifenhotel — alles aus einer Hand.",
    points: ["Wechsel inkl. Auswuchten", "Reifenverkauf aller Marken", "Einlagerung im Reifenhotel"],
    link: "/reifenservice",
  },
  {
    icon: Battery,
    title: "Batterie & Elektrik",
    text: "Batterietest, Wechsel und Elektronik-Diagnose. Auch komplexe Steuergeräte-Probleme finden und beheben wir.",
    points: ["Batterietest gratis", "Starthilfe & Wechsel", "Steuergeräte-Diagnose"],
  },
  {
    icon: Cog,
    title: "Achsvermessung & Fahrwerk",
    text: "Ungleicher Reifenverschleiß? Schiefes Lenkrad? Wir vermessen Ihre Achse präzise und justieren das Fahrwerk neu.",
    points: ["3D-Vermessung", "Spur & Sturz", "Fahrwerksprüfung"],
  },
  {
    icon: Sparkles,
    title: "Fahrzeugaufbereitung",
    text: "Innen- und Außenpflege, Polsterreinigung, Lackpflege — Ihr Auto fühlt sich an wie am ersten Tag.",
    points: ["Innenraumreinigung", "Lackaufbereitung", "Geruchsneutralisation"],
  },
];

function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Werkstatt-Leistungen"
        title="Alles, was Ihr Auto braucht — unter einem Dach."
        subtitle="Vom routinemäßigen Ölwechsel bis zur komplexen Reparatur. Wir betreuen alle Marken mit moderner Diagnosetechnik und ehrlichem Handwerk."
        breadcrumbs={[{ label: "Leistungen" }]}
        image={heroImg}
        imageAlt="Detailaufnahme aus der Werkstatt — Autoservice Beuerberg"
      />

      <section className="py-16 md:py-20">
        <div className="container-tight grid md:grid-cols-2 gap-6">
          {LEISTUNGEN.map((l) => (
            <article
              key={l.title}
              className="group rounded-2xl bg-card border border-border p-7 hover:border-primary/30 hover:shadow-warm transition-all"
            >
              <div className="flex items-start gap-4">
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
                  <l.icon className="h-5 w-5" />
                </span>
                <div className="flex-1">
                  <h2 className="font-serif text-xl text-foreground">{l.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{l.text}</p>
                  <ul className="mt-4 space-y-1.5">
                    {l.points.map((p) => (
                      <li key={p} className="flex items-center gap-2 text-sm text-foreground/80">
                        <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  {l.link && (
                    <Link
                      to={l.link}
                      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                    >
                      Mehr erfahren <ArrowRight className="h-4 w-4" />
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-20 bg-cream">
        <div className="container-tight text-center max-w-2xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-balance">
            Ihre Leistung ist nicht dabei?
          </h2>
          <p className="mt-4 text-muted-foreground">
            Rufen Sie uns einfach an — wir helfen weiter oder vermitteln Sie an
            unsere Partner.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors"
            >
              {SITE.phone}
            </a>
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors"
            >
              Schriftlich anfragen
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
