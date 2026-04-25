import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wrench, Gauge, Snowflake, ShieldCheck, CircleDot, Sparkles,
  Disc, Battery, Cog, ArrowRight, CheckCircle2, Phone,
  Award, Users, Clock, HeartHandshake,
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
      { property: "og:image", content: heroImg },
    ],
  }),
  component: LeistungenPage,
});

type Service = {
  icon: typeof Wrench;
  title: string;
  text: string;
  points: string[];
  link?: string;
};

type Group = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  services: Service[];
};

const GROUPS: Group[] = [
  {
    id: "service",
    eyebrow: "Service & Sicherheit",
    title: "Werterhalt nach Herstellervorgabe.",
    description:
      "Inspektion, HU/AU und Reparaturen — bei uns bleibt Ihre Garantie erhalten und Ihr Fahrzeug zuverlässig.",
    services: [
      {
        icon: Gauge,
        title: "Inspektion & Wartung",
        text: "Service exakt nach Herstellervorgaben — mit Originalteilen oder geprüfter Qualität. Garantie und Werterhalt bleiben gesichert.",
        points: ["Service nach Hersteller", "Original- oder Markenteile", "Transparente Kostenvoranschläge"],
      },
      {
        icon: ShieldCheck,
        title: "HU & AU",
        text: "Hauptuntersuchung und Abgasuntersuchung direkt bei uns vor Ort — ohne Umweg, mit kurzer Wartezeit und sofortiger Bescheinigung.",
        points: ["HU & AU im Haus", "Vorab-Check inklusive", "Mängelbehebung möglich"],
      },
      {
        icon: Wrench,
        title: "Reparaturen aller Marken",
        text: "Ob Motor, Getriebe, Auspuff, Elektrik oder Fahrwerk — wir reparieren markenunabhängig auf Meisterniveau. Ehrliche Diagnose, faire Preise.",
        points: ["Alle Fabrikate", "Moderne Diagnosetechnik", "Festpreise nach Absprache"],
      },
    ],
  },
  {
    id: "fahrwerk",
    eyebrow: "Fahrwerk & Reifen",
    title: "Sicher unterwegs — bei jedem Wetter.",
    description:
      "Bremsen, Reifen, Achsen — alles, was Sie sicher auf der Straße hält. Inklusive eigenem Reifenhotel.",
    services: [
      {
        icon: Disc,
        title: "Bremsen & Auspuff",
        text: "Sicherheit beginnt beim Bremsweg. Wir prüfen, warten und tauschen Bremsbeläge, Scheiben und komplette Auspuffanlagen.",
        points: ["Brems-Komplettcheck", "Beläge & Scheiben", "Auspuff & Katalysator"],
      },
      {
        icon: CircleDot,
        title: "Reifen & Räder",
        text: "Reifenwechsel, Auswuchten, Verkauf und sichere Einlagerung in unserem Reifenhotel — alles aus einer Hand.",
        points: ["Wechsel inkl. Auswuchten", "Reifenverkauf aller Marken", "Einlagerung im Reifenhotel"],
        link: "/reifenservice",
      },
      {
        icon: Cog,
        title: "Achsvermessung & Fahrwerk",
        text: "Ungleicher Reifenverschleiß? Schiefes Lenkrad? Wir vermessen Ihre Achse präzise und justieren das Fahrwerk neu.",
        points: ["3D-Vermessung", "Spur & Sturz", "Fahrwerksprüfung"],
      },
    ],
  },
  {
    id: "komfort",
    eyebrow: "Komfort, Elektrik & Pflege",
    title: "Damit jede Fahrt angenehm bleibt.",
    description:
      "Klima, Elektrik und Aufbereitung — die Details, die ein Auto wieder neu wirken lassen.",
    services: [
      {
        icon: Snowflake,
        title: "Klimaservice",
        text: "Klimaanlagen verlieren jährlich Kältemittel. Wir reinigen, befüllen und desinfizieren — für angenehme Fahrten und gesunde Luft.",
        points: ["R134a & R1234yf", "Filterwechsel & Hygiene", "Lecksuche"],
      },
      {
        icon: Battery,
        title: "Batterie & Elektrik",
        text: "Batterietest, Wechsel und Elektronik-Diagnose. Auch komplexe Steuergeräte-Probleme finden und beheben wir.",
        points: ["Batterietest gratis", "Starthilfe & Wechsel", "Steuergeräte-Diagnose"],
      },
      {
        icon: Sparkles,
        title: "Fahrzeugaufbereitung",
        text: "Innen- und Außenpflege, Polsterreinigung, Lackpflege — Ihr Auto fühlt sich an wie am ersten Tag.",
        points: ["Innenraumreinigung", "Lackaufbereitung", "Geruchsneutralisation"],
      },
    ],
  },
];

const WARUM = [
  { icon: Award, t: "KFZ-Meisterbetrieb", d: "Geprüfte Qualität nach Innungsstandard." },
  { icon: HeartHandshake, t: "Familienbetrieb seit 2009", d: "Persönlich, ehrlich, langfristig gedacht." },
  { icon: Users, t: "Alle Marken", d: "Markenunabhängig — vom Kleinwagen bis zum Transporter." },
  { icon: Clock, t: "Pünktlich & planbar", d: "Termin steht, Fahrzeug fertig — ohne Überraschungen." },
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
        showTrustStrip={false}
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`tel:${SITE.phoneIntl}`}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors shadow-warm"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
          <Link
            to="/kontakt"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-6 py-3 text-sm font-semibold hover:bg-cream transition-colors"
          >
            Schriftlich anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      {/* Quick-Nav (Sprungmarken) */}
      <nav
        aria-label="Leistungs-Kategorien"
        className="border-y border-border bg-card sticky top-16 z-30 backdrop-blur supports-[backdrop-filter]:bg-card/85"
      >
        <div className="container-tight flex flex-wrap items-center gap-2 py-3 text-sm">
          <span className="text-xs uppercase tracking-wider text-muted-foreground mr-2 hidden sm:inline">
            Bereiche:
          </span>
          {GROUPS.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="rounded-full border border-border bg-background px-4 py-1.5 text-xs sm:text-sm font-medium text-foreground/80 hover:border-primary hover:text-primary transition-colors"
            >
              {g.eyebrow}
            </a>
          ))}
        </div>
      </nav>

      {/* GROUPS */}
      {GROUPS.map((group, gi) => (
        <section
          key={group.id}
          id={group.id}
          className={
            gi % 2 === 1
              ? "py-16 md:py-24 bg-cream/40 border-y border-border scroll-mt-32"
              : "py-16 md:py-24 scroll-mt-32"
          }
        >
          <div className="container-tight">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-semibold">
                <span className="h-px w-8 bg-primary/60" />
                {group.eyebrow}
              </p>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl text-balance leading-[1.1]">
                {group.title}
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {group.description}
              </p>
            </div>

            <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {group.services.map((s, i) => (
                <ServiceCard key={s.title} service={s} index={gi * 3 + i + 1} />
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Warum Beuerberg */}
      <section className="py-16 md:py-24">
        <div className="container-tight">
          <div className="max-w-2xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-semibold">
              <Award className="h-3 w-3" />
              Warum Autoservice Beuerberg
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-balance leading-[1.1]">
              Eine Werkstatt, die Sie weiterempfehlen.
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WARUM.map((w) => (
              <div
                key={w.t}
                className="rounded-2xl bg-card border border-border p-6 text-center hover:shadow-warm hover:border-primary/30 transition-all"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mx-auto">
                  <w.icon className="h-5 w-5" />
                </span>
                <p className="mt-4 font-serif text-lg">{w.t}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="pb-20 md:pb-24">
        <div className="container-tight">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-hover text-primary-foreground p-10 md:p-14 text-center relative overflow-hidden shadow-elegant">
            <div className="absolute inset-0 bg-grid-soft opacity-10" aria-hidden />
            <div className="relative max-w-2xl mx-auto">
              <p className="text-xs uppercase tracking-[0.22em] font-semibold opacity-90">
                Ihre Leistung nicht dabei?
              </p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">
                Sprechen Sie uns einfach an.
              </h2>
              <p className="mt-4 text-primary-foreground/85 text-base md:text-lg">
                Mo–Fr 8–17 Uhr persönlich, außerhalb 24/7 über unseren
                Telefonassistenten — wir helfen weiter oder vermitteln Sie an
                unsere Partner.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href={`tel:${SITE.phoneIntl}`}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-foreground text-primary px-7 py-3.5 text-base font-semibold hover:bg-cream transition-colors shadow-warm"
                >
                  <Phone className="h-5 w-5" />
                  {SITE.phone}
                </a>
                <Link
                  to="/kontakt"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-primary-foreground/40 px-7 py-3.5 text-base font-semibold hover:bg-primary-foreground/10 transition-colors"
                >
                  Schriftlich anfragen
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <article className="group relative rounded-3xl bg-card border border-border p-7 hover:border-primary/40 hover:shadow-elegant transition-all flex flex-col">
      <div className="flex items-start justify-between gap-3">
        <span className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors shrink-0">
          <Icon className="h-5 w-5" />
        </span>
        <span className="font-serif text-3xl text-primary/15 leading-none tabular-nums">
          {String(index).padStart(2, "0")}
        </span>
      </div>
      <h3 className="mt-5 font-serif text-xl text-foreground">{service.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{service.text}</p>
      <ul className="mt-5 space-y-2 flex-1">
        {service.points.map((p) => (
          <li
            key={p}
            className="flex items-start gap-2 text-sm text-foreground/85"
          >
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            {p}
          </li>
        ))}
      </ul>
      {service.link && (
        <Link
          to={service.link}
          className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all self-start"
        >
          Mehr erfahren <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </article>
  );
}
