import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wrench,
  Gauge,
  Snowflake,
  ShieldCheck,
  CircleDot,
  Sparkles,
  Phone,
  CalendarCheck,
  ArrowRight,
  Star,
  MapPin,
  Clock,
  Award,
  Users,
  HeartHandshake,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { SectionHeading } from "@/components/PageHero";
import { MapEmbed } from "@/components/MapEmbed";
import { GoogleRatingBadge } from "@/components/GoogleRatingBadge";
import { GOOGLE_REVIEWS, REVIEWS_SUMMARY } from "@/lib/reviews";
import heroImg from "@/assets/real/header-gebaeude.jpg";
import teamImg from "@/assets/real/foto-02.jpg";
import reifenImg from "@/assets/real/foto-05.jpg";
import detailImg from "@/assets/real/foto-04.jpg";
import gallery1 from "@/assets/real/foto-03.jpg";
import gallery2 from "@/assets/real/foto-06.jpg";
import gallery3 from "@/assets/real/foto-07.jpg";
import gallery4 from "@/assets/real/foto-08.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Autoservice Beuerberg GmbH — Ihre Werkstatt im Voralpenland" },
      {
        name: "description",
        content:
          "Familiengeführte Kfz-Werkstatt in Eurasburg-Beuerberg. Inspektion, HU/AU, Reparaturen aller Marken, Reifenservice & Klimaservice. Seit 2009 für Sie da.",
      },
      { property: "og:title", content: "Autoservice Beuerberg GmbH — Ihre Werkstatt im Voralpenland" },
      {
        property: "og:description",
        content:
          "Familiengeführte Kfz-Werkstatt in Eurasburg-Beuerberg seit 2009. Inspektion, HU/AU, Reparaturen aller Marken, Reifenservice.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: HomePage,
});

const SERVICES = [
  {
    icon: Gauge,
    title: "Inspektion & Wartung",
    text: "Herstellervorgaben, transparente Kostenvoranschläge, Garantieerhalt.",
  },
  {
    icon: ShieldCheck,
    title: "HU & AU",
    text: "Hauptuntersuchung direkt bei uns im Haus — schnell und unkompliziert.",
  },
  {
    icon: Wrench,
    title: "Reparatur aller Marken",
    text: "Von Bremse bis Motor — moderne Diagnose, ehrliches Handwerk.",
  },
  {
    icon: Snowflake,
    title: "Klimaservice",
    text: "Klimaanlagen-Check, Wartung und Befüllung für angenehme Fahrten.",
  },
  {
    icon: CircleDot,
    title: "Reifen & Räder",
    text: "Wechsel, Auswuchten, Verkauf, Einlagerung in unserem Reifenhotel.",
  },
  {
    icon: Sparkles,
    title: "Fahrzeugaufbereitung",
    text: "Innen- und Außenpflege für ein Fahrzeug wie aus dem Showroom.",
  },
];

const TRUST = [
  { icon: Award, label: `Familienbetrieb seit ${SITE.founded}` },
  { icon: HeartHandshake, label: "Persönliche Beratung" },
  { icon: Users, label: "Alle Marken & Modelle" },
  { icon: ShieldCheck, label: "Faire, transparente Preise" },
];

// Echte Google-Reviews — wir picken 3 prägnante Kurz-Bewertungen für die Startseite
const HOME_REVIEWS = GOOGLE_REVIEWS.filter((r) =>
  ["Mia Oeckl", "Auto Linner", "Andreas M.", "Josef Fichtner"].includes(r.author),
).slice(0, 3);

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative flex items-end overflow-hidden min-h-[68svh] md:min-h-[72svh] lg:min-h-[78svh]">
        <img
          src={heroImg}
          alt="Autoservice Beuerberg GmbH — Kfz-Meisterbetrieb in Beuerberg"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/65 to-foreground/30"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-foreground/75 via-foreground/20 to-transparent"
          aria-hidden
        />
        <div className="relative container-tight pb-12 md:pb-20 pt-28 md:pt-36 text-background">
          <p
            className="text-xs sm:text-sm uppercase tracking-[0.28em] text-gold font-medium fade-in-up"
          >
            Familienbetrieb · Seit {SITE.founded} · Eurasburg-Beuerberg
          </p>
          <h1
            className="mt-5 font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.05] text-balance max-w-3xl fade-in-up"
            style={{ animationDelay: "60ms" }}
          >
            Ihre Werkstatt im Herzen von Beuerberg.
          </h1>
          <p
            className="mt-5 text-base sm:text-lg text-background/90 max-w-2xl text-pretty fade-in-up"
            style={{ animationDelay: "120ms" }}
          >
            Service, Reparatur und Reifen — ehrlich, persönlich und auf
            Meister­niveau. Familie Fischer und ihr Team sind seit über 15
            Jahren für Sie da.
          </p>
          <div
            className="mt-8 flex flex-col sm:flex-row gap-3 fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-all hover:shadow-elegant shadow-warm"
            >
              <CalendarCheck className="h-4 w-4" />
              Termin online buchen
            </Link>
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-background/10 backdrop-blur border border-background/30 px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/20 transition-colors"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="border-y border-border bg-cream-deep/50">
        <div className="container-tight py-6">
          <ul className="grid grid-cols-2 md:grid-cols-4 gap-y-4 gap-x-6">
            {TRUST.map((t) => (
              <li key={t.label} className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary shrink-0">
                  <t.icon className="h-4 w-4" />
                </span>
                <span className="text-sm font-medium text-foreground/80">
                  {t.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section className="py-20 md:py-28">
        <div className="container-tight">
          <div className="flex items-end justify-between gap-8 flex-wrap">
            <SectionHeading
              eyebrow="Unsere Leistungen"
              title="Alles aus einer Hand — für Ihr Fahrzeug."
              subtitle="Von der jährlichen Inspektion bis zur komplexen Reparatur. Wir betreuen alle Fahrzeugmarken mit modernster Technik und ehrlichem Handwerk."
            />
            <Link
              to="/leistungen"
              className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              Alle Leistungen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((s) => (
              <article
                key={s.title}
                className="group relative rounded-2xl bg-card border border-border p-7 hover:border-primary/30 hover:shadow-warm transition-all duration-300"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 font-serif text-xl text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {s.text}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ÜBER UNS TEASER */}
      <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
                <img
                  src={teamImg}
                  alt="Familie Fischer — das Team von Autoservice Beuerberg"
                  width={1024}
                  height={1280}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 sm:bottom-8 sm:right-8 bg-card rounded-2xl shadow-warm border border-border p-5 max-w-[14rem]">
                <p className="font-serif text-3xl text-primary">15+</p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                  Jahre Erfahrung im Voralpenland
                </p>
              </div>
            </div>
            <div>
              <SectionHeading
                eyebrow="Familie Fischer"
                title="Drei Generationen Leidenschaft fürs Auto."
                subtitle="2009 gründeten Jürgen und Monika Fischer ihren Autoservice in der Bahnhofstraße. Heute führen sie den Betrieb gemeinsam mit ihrem Sohn Ludwig — und einem eingespielten Team, dem Qualität und Verlässlichkeit am Herzen liegen."
              />
              <ul className="mt-8 space-y-3">
                {[
                  "Persönliche Ansprechpartner — keine Hotline",
                  "Transparente Kostenvoranschläge vor jeder Reparatur",
                  "Hol- und Bringservice in der Region auf Anfrage",
                ].map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm">
                    <ShieldCheck className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/80">{p}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  to="/ueber-uns"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
                >
                  Lernen Sie uns kennen <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REIFENSERVICE */}
      <section className="py-20 md:py-28">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="lg:order-2">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elegant">
                <img
                  src={reifenImg}
                  alt="Reifenhotel und Reifenservice"
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
            <div className="lg:order-1">
              <SectionHeading
                eyebrow="Reifen & Saisonservice"
                title="Reifenwechsel & Einlagerung — bequem wie ein Hotel."
                subtitle="Wir wechseln, wuchten und lagern Ihre Räder fachgerecht ein. Im Frühjahr und Herbst stehen sie pünktlich für Sie bereit — mit ausführlicher Profil- und Druckkontrolle."
              />
              <div className="mt-8 grid sm:grid-cols-2 gap-4">
                {[
                  { t: "Reifenwechsel & Auswuchten", d: "Termin meist innerhalb weniger Tage" },
                  { t: "Reifenhotel", d: "Sicher und sauber bei uns eingelagert" },
                  { t: "Beratung & Verkauf", d: "Markenreifen passend zu Ihrem Fahrzeug" },
                  { t: "Saison-Erinnerung", d: "Wir melden uns zur richtigen Zeit" },
                ].map((b) => (
                  <div key={b.t} className="rounded-xl bg-card border border-border p-4">
                    <p className="font-medium text-foreground">{b.t}</p>
                    <p className="text-xs text-muted-foreground mt-1">{b.d}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/reifenservice"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
                >
                  Zum Reifenservice <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BEWERTUNGEN */}
      <section className="py-20 md:py-28 bg-foreground text-background relative overflow-hidden">
        <div
          className="absolute inset-0 bg-raute opacity-[0.06] pointer-events-none"
          aria-hidden
        />
        <div className="container-tight relative">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-gold font-medium">
              Was unsere Kunden sagen
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-balance">
              Vertrauen, das man hört.
            </h2>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="rounded-2xl bg-background/5 border border-background/10 p-7 backdrop-blur"
              >
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 text-background/90 leading-relaxed">
                  „{r.text}"
                </blockquote>
                <figcaption className="mt-5 text-sm">
                  <span className="font-medium text-background">{r.name}</span>
                  <span className="text-background/60"> · {r.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/bewertungen"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:gap-3 transition-all"
            >
              Alle Bewertungen lesen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* STANDORT */}
      <section className="py-20 md:py-28">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Mitten im Voralpenland"
                title="Direkt an der Bahnhofstraße in Beuerberg."
                subtitle="Gut erreichbar aus Wolfratshausen, Bad Tölz, Tegernsee und dem gesamten Landkreis. Parkplätze direkt vor der Tür."
              />
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary shrink-0">
                    <MapPin className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium">Adresse</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {SITE.street}, {SITE.zip} {SITE.city}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">Öffnungszeiten</p>
                    <ul className="mt-1 text-sm text-muted-foreground space-y-0.5">
                      {SITE.hours.map((h) => (
                        <li key={h.day} className="flex justify-between gap-3">
                          <span>{h.day}</span>
                          <span>{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary shrink-0">
                    <Phone className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-medium">Direkt anrufen</p>
                    <a
                      href={`tel:${SITE.phoneIntl}`}
                      className="text-sm text-primary hover:underline"
                    >
                      {SITE.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <MapEmbed className="aspect-[4/3] lg:aspect-square shadow-elegant" />
          </div>
        </div>
      </section>

      {/* GALERIE — echte Werkstattfotos */}
      <section className="pb-20 md:pb-28">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-primary font-medium">
              Einblicke
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl text-balance">
              Ein Blick in unsere Werkstatt.
            </h2>
            <p className="mt-3 text-muted-foreground">
              Modernes Equipment, viel Platz und ein eingespieltes Team — so
              sieht Werkstatt heute aus.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {[gallery1, gallery2, gallery3, gallery4].map((src, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-cream border border-border">
                <img
                  src={src}
                  alt={`Eindruck aus dem Autoservice Beuerberg ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden">
        <img
          src={detailImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/85 to-primary/70"
          aria-hidden
        />
        <div className="container-tight relative text-center text-primary-foreground">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-balance max-w-2xl mx-auto">
            Bereit für einen Termin? Wir kümmern uns um den Rest.
          </h2>
          <p className="mt-4 text-primary-foreground/85 max-w-xl mx-auto">
            Buchen Sie online oder rufen Sie uns einfach an — wir finden
            gemeinsam den passenden Termin.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-background text-foreground px-6 py-3.5 text-sm font-semibold hover:bg-background/90 transition-colors shadow-warm"
            >
              <CalendarCheck className="h-4 w-4" /> Termin online buchen
            </Link>
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-background/40 bg-background/10 backdrop-blur px-6 py-3.5 text-sm font-semibold text-background hover:bg-background/20 transition-colors"
            >
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
