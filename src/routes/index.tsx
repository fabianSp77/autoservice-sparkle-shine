import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Wrench, Gauge, Snowflake, ShieldCheck, CircleDot, Sparkles,
  Phone, ArrowRight, Star, MapPin, Clock, Award, Users,
  HeartHandshake, Quote, CalendarClock, Search, CheckCircle2,
  Hammer, KeyRound,
} from "lucide-react";
import { SITE } from "@/lib/site";
import { SectionHeading } from "@/components/PageHero";
import { MapEmbed } from "@/components/MapEmbed";
import { GoogleRatingBadge } from "@/components/GoogleRatingBadge";
import { GOOGLE_REVIEWS, REVIEWS_SUMMARY } from "@/lib/reviews";
import heroImg from "@/assets/real/header-gebaeude.jpg";
import teamImg from "@/assets/real/team-gruppe-43.jpg";
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
          "Familiengeführte Kfz-Werkstatt in Eurasburg-Beuerberg seit 2009. Inspektion, HU/AU, Reparaturen aller Marken, Reifenservice & Klimaservice — 4,6★ auf Google.",
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

const ABLAUF = [
  {
    icon: Phone,
    step: "01",
    t: "Anruf oder Anfrage",
    d: "Mo–Fr persönlich, sonst über unseren 24/7 Telefonassistenten.",
  },
  {
    icon: CalendarClock,
    step: "02",
    t: "Termin & Erstgespräch",
    d: "Wir besprechen Anliegen und Zeitfenster — ehrlich und ohne Zeitdruck.",
  },
  {
    icon: Search,
    step: "03",
    t: "Diagnose & Kostenvoranschlag",
    d: "Klare Aussage, was wirklich nötig ist — schriftlich, bevor wir loslegen.",
  },
  {
    icon: Hammer,
    step: "04",
    t: "Fachgerechte Ausführung",
    d: "Meisterwerkstatt-Qualität mit moderner Technik und geprüften Teilen.",
  },
  {
    icon: KeyRound,
    step: "05",
    t: "Übergabe & Nachsorge",
    d: "Erklärung der Arbeiten, Empfehlung für die nächste Wartung.",
  },
];

// Echte Google-Reviews — kompakte Auswahl für die Startseite
const HOME_REVIEWS = GOOGLE_REVIEWS.filter((r) =>
  ["Mia Oeckl", "Auto Linner", "Andreas M.", "Josef Fichtner"].includes(r.author),
).slice(0, 3);

function HomePage() {
  return (
    <div>
      {/* HERO */}
      <section className="relative flex items-end overflow-hidden min-h-[78svh] md:min-h-[86svh] lg:min-h-[92svh]">
        <img
          src={heroImg}
          alt="Autoservice Beuerberg GmbH — Kfz-Meisterbetrieb in Beuerberg"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-foreground/95 via-foreground/70 to-foreground/35"
          aria-hidden
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/25 to-transparent"
          aria-hidden
        />

        {/* schwebendes Trust-Kärtchen oben rechts */}
        <div className="hidden lg:flex absolute top-32 right-8 xl:right-16 items-center gap-3 rounded-2xl bg-background/95 backdrop-blur border border-background/20 p-4 shadow-elegant max-w-[16rem] fade-in-up" style={{ animationDelay: "300ms" }}>
          <span className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 text-primary shrink-0">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div className="text-xs leading-snug">
            <p className="font-semibold text-foreground">KFZ-Meisterbetrieb</p>
            <p className="text-muted-foreground mt-0.5">Familie Fischer · seit {SITE.founded}</p>
          </div>
        </div>

        <div className="relative container-tight pb-20 md:pb-28 pt-28 md:pt-36 text-background">
          <p className="text-xs sm:text-sm uppercase tracking-[0.28em] text-gold font-medium fade-in-up">
            <span className="inline-block h-px w-8 bg-gold align-middle mr-3" />
            Familienbetrieb · Seit {SITE.founded} · Eurasburg-Beuerberg
          </p>
          <h1
            className="mt-5 font-serif text-4xl sm:text-5xl md:text-7xl leading-[1.02] text-balance max-w-4xl fade-in-up"
            style={{ animationDelay: "60ms" }}
          >
            Ihre Werkstatt im Herzen von Beuerberg.
          </h1>
          <p
            className="mt-6 text-base sm:text-lg md:text-xl text-background/90 max-w-2xl text-pretty fade-in-up leading-relaxed"
            style={{ animationDelay: "120ms" }}
          >
            Service, Reparatur und Reifen — ehrlich, persönlich und auf
            Meisterniveau. Familie Fischer und ihr Team sind seit über 15
            Jahren für Sie da.
          </p>
          <div
            className="mt-9 flex flex-col sm:flex-row gap-3 fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-all hover:shadow-elegant shadow-warm"
            >
              <Phone className="h-4 w-4" />
              {SITE.phone}
            </a>
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-background/10 backdrop-blur border border-background/30 px-7 py-4 text-sm font-semibold text-background hover:bg-background/20 transition-colors"
            >
              Schriftlich anfragen
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          {/* Mobile-only Trust-Zeile (Desktop zeigt Stats-Bar unten) */}
          <div
            className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 fade-in-up md:hidden"
            style={{ animationDelay: "260ms" }}
          >
            <GoogleRatingBadge variant="dark" />
            <p className="text-xs text-background/75">
              <span className="inline-block h-2 w-2 rounded-full bg-emerald-400 mr-2 align-middle animate-pulse" />
              <strong className="text-background">24/7 erreichbar</strong>
            </p>
          </div>
        </div>

        {/* Stats-Bar im Hero unten */}
        <div className="absolute bottom-0 inset-x-0 hidden md:block">
          <div className="container-tight">
            <div className="bg-background/95 backdrop-blur border-t border-x border-border rounded-t-2xl shadow-elegant grid grid-cols-4 divide-x divide-border">
              {[
                { v: REVIEWS_SUMMARY.rating.toFixed(1) + "★", l: "Google-Bewertung" },
                { v: "15+", l: "Jahre Erfahrung" },
                { v: "Alle", l: "Marken & Modelle" },
                { v: "24/7", l: "Erreichbarkeit" },
              ].map((s) => (
                <div key={s.l} className="px-4 py-5 text-center">
                  <p className="font-serif text-2xl lg:text-3xl text-foreground leading-none">{s.v}</p>
                  <p className="mt-1.5 text-xs uppercase tracking-wider text-muted-foreground">{s.l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP — mobil & als Spacer */}
      <section className="border-b border-border bg-cream-deep/50 md:hidden">
        <div className="container-tight py-6">
          <ul className="grid grid-cols-2 gap-y-4 gap-x-6">
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
      <div className="hidden md:block h-6" aria-hidden />

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
            {SERVICES.map((s, i) => (
              <article
                key={s.title}
                className="group relative rounded-3xl bg-card border border-border p-7 hover:border-primary/40 hover:shadow-elegant transition-all duration-300 flex flex-col"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center justify-center h-12 w-12 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <s.icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-2xl text-primary/15 leading-none tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-xl text-foreground">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">
                  {s.text}
                </p>
                <Link
                  to="/leistungen"
                  className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:gap-2.5 transition-all self-start opacity-0 group-hover:opacity-100"
                >
                  Mehr erfahren <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </article>
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link
              to="/leistungen"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
            >
              Alle Leistungen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ÜBER UNS TEASER */}
      <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elegant bg-muted">
                <img
                  src={teamImg}
                  alt="Das Team von Autoservice Beuerberg vor der Werkstatt"
                  width={1440}
                  height={1080}
                  loading="lazy"
                  className="h-full w-full object-cover object-center"
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
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground/85">{p}</span>
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

      {/* ABLAUF — So arbeiten wir */}
      <section className="py-20 md:py-28">
        <div className="container-tight">
          <div className="max-w-2xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-semibold">
              <Sparkles className="h-3 w-3" />
              So arbeiten wir
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-5xl text-balance leading-[1.05]">
              Vom ersten Anruf bis zur Übergabe — transparent.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Keine Überraschungen, keine versteckten Kosten. Sie wissen jederzeit,
              woran Sie bei uns sind.
            </p>
          </div>

          <ol className="mt-14 grid md:grid-cols-3 lg:grid-cols-5 gap-5 relative">
            {/* dezente Verbindungslinie auf großen Screens */}
            <div className="hidden lg:block absolute top-7 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-border to-transparent" aria-hidden />
            {ABLAUF.map((a) => (
              <li
                key={a.step}
                className="relative rounded-2xl bg-card border border-border p-5 hover:border-primary/30 hover:shadow-warm transition-all"
              >
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-primary text-primary-foreground shadow-warm">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-2xl text-primary/20 leading-none tabular-nums">
                    {a.step}
                  </span>
                </div>
                <p className="mt-4 font-serif text-base">{a.t}</p>
                <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">{a.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* REIFENSERVICE */}
      <section className="py-20 md:py-28 bg-cream/50 border-y border-border">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="lg:order-2">
              <div className="relative">
                <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elegant border border-border">
                  <img
                    src={reifenImg}
                    alt="Reifenhotel und Reifenservice"
                    width={1280}
                    height={960}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="hidden md:flex absolute -bottom-6 -left-6 items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-warm">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary shrink-0">
                    <CircleDot className="h-5 w-5" />
                  </span>
                  <div className="text-xs leading-snug">
                    <p className="font-semibold text-foreground">Reifenhotel</p>
                    <p className="text-muted-foreground">Sicher · trocken · überwacht</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:order-1">
              <SectionHeading
                eyebrow="Reifen & Saisonservice"
                title="Reifenwechsel & Einlagerung — bequem wie ein Hotel."
                subtitle="Wir wechseln, wuchten und lagern Ihre Räder fachgerecht ein. Im Frühjahr und Herbst stehen sie pünktlich für Sie bereit — mit ausführlicher Profil- und Druckkontrolle."
              />
              <div className="mt-8 grid sm:grid-cols-2 gap-3">
                {[
                  { t: "Reifenwechsel & Auswuchten", d: "Termin meist innerhalb weniger Tage" },
                  { t: "Reifenhotel", d: "Sicher und sauber bei uns eingelagert" },
                  { t: "Beratung & Verkauf", d: "Markenreifen passend zu Ihrem Fahrzeug" },
                  { t: "Saison-Erinnerung", d: "Wir melden uns zur richtigen Zeit" },
                ].map((b) => (
                  <div
                    key={b.t}
                    className="rounded-xl bg-card border border-border p-4 hover:border-primary/30 transition-colors"
                  >
                    <p className="font-medium text-foreground text-sm">{b.t}</p>
                    <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{b.d}</p>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link
                  to="/reifenservice"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary-hover transition-colors shadow-warm"
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
              Echte Google-Bewertungen
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-balance">
              Vertrauen, das man hört.
            </h2>
            <div className="mt-6 flex justify-center">
              <GoogleRatingBadge variant="dark" />
            </div>
          </div>
          <div className="mt-12 grid md:grid-cols-3 gap-5">
            {HOME_REVIEWS.map((r) => (
              <figure
                key={r.author}
                className="relative rounded-2xl bg-background/[0.04] border border-background/10 p-7 backdrop-blur flex flex-col hover:bg-background/[0.07] transition-colors"
              >
                <Quote className="absolute top-5 right-5 h-8 w-8 text-gold/20" />
                <div className="flex gap-0.5 text-gold relative">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={i < r.rating ? "h-4 w-4 fill-gold" : "h-4 w-4 opacity-30"}
                    />
                  ))}
                </div>
                <blockquote className="mt-4 text-background/90 leading-relaxed flex-1 text-[0.95rem]">
                  „{truncate(r.text, 220)}"
                </blockquote>
                <figcaption className="mt-5 flex items-center gap-3 text-sm border-t border-background/10 pt-4">
                  <span className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-gold/15 text-gold font-serif font-semibold text-xs">
                    {r.initials}
                  </span>
                  <div className="leading-tight">
                    <p className="font-medium text-background">{r.author}</p>
                    <p className="text-background/60 text-xs">{r.date}</p>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/bewertungen"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gold hover:gap-3 transition-all"
            >
              Alle {REVIEWS_SUMMARY.count} Bewertungen auf Google ansehen <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* GALERIE — Bento-Layout */}
      <section className="py-20 md:py-28">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-primary font-medium">
              Einblicke
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-5xl text-balance leading-[1.05]">
              Ein Blick in unsere Werkstatt.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Modernes Equipment, viel Platz und ein eingespieltes Team — so
              sieht Werkstatt heute aus.
            </p>
          </div>

          {/* Bento: 1 großes Bild + 3 kleinere */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 md:grid-rows-2 gap-3 md:gap-4 md:h-[520px]">
            <BentoImg src={gallery1} alt="Eindruck aus dem Autoservice Beuerberg 1" className="md:col-span-2 md:row-span-2" />
            <BentoImg src={gallery2} alt="Eindruck aus dem Autoservice Beuerberg 2" />
            <BentoImg src={gallery3} alt="Eindruck aus dem Autoservice Beuerberg 3" />
            <BentoImg src={gallery4} alt="Eindruck aus dem Autoservice Beuerberg 4" className="md:col-span-2" />
          </div>
        </div>
      </section>

      {/* STANDORT */}
      <section className="py-20 md:py-28 bg-cream/50 border-y border-border">
        <div className="container-tight">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                eyebrow="Mitten im Voralpenland"
                title="Direkt an der Bahnhofstraße in Beuerberg."
                subtitle="Gut erreichbar aus Wolfratshausen, Bad Tölz, Tegernsee und dem gesamten Landkreis. Parkplätze direkt vor der Tür."
              />
              <div className="mt-8 space-y-3">
                <InfoRow icon={MapPin} title="Adresse" body={`${SITE.street}, ${SITE.zip} ${SITE.city}`} />
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary shrink-0">
                    <Clock className="h-5 w-5" />
                  </span>
                  <div className="flex-1">
                    <p className="font-medium">Öffnungszeiten</p>
                    <ul className="mt-2 text-sm space-y-1.5">
                      {SITE.hours.map((h) => (
                        <li key={h.day} className="flex items-start justify-between gap-3">
                          <span className="text-foreground/80 shrink-0">{h.day}</span>
                          <span className="text-muted-foreground tabular-nums text-right whitespace-pre-line leading-snug">
                            {h.time.replace(/\s·\s/g, "\n")}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <InfoRow
                  icon={Phone}
                  title="Direkt anrufen"
                  body={
                    <a
                      href={`tel:${SITE.phoneIntl}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {SITE.phone}
                    </a>
                  }
                />
              </div>
            </div>
            <MapEmbed className="aspect-[4/3] lg:aspect-square shadow-elegant" />
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
          <p className="text-xs uppercase tracking-[0.28em] font-semibold opacity-90">
            Termin sichern
          </p>
          <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-balance max-w-2xl mx-auto">
            Bereit für Ihren Termin? Ein Anruf genügt.
          </h2>
          <p className="mt-5 text-primary-foreground/85 max-w-xl mx-auto leading-relaxed">
            Persönlich Mo–Do 7:30–12 & 13–18 Uhr, Fr 7:30–12 Uhr — außerhalb nimmt unser Telefonassistent
            <strong className="text-primary-foreground"> rund um die Uhr</strong> Ihre Terminwünsche entgegen.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-background text-foreground px-7 py-4 text-sm font-semibold hover:bg-cream transition-colors shadow-warm"
            >
              <Phone className="h-4 w-4" /> {SITE.phone}
            </a>
            <Link
              to="/kontakt"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-background/40 bg-background/10 backdrop-blur px-7 py-4 text-sm font-semibold text-background hover:bg-background/20 transition-colors"
            >
              Schriftlich kontaktieren
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function BentoImg({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  return (
    <div className={`group relative aspect-square md:aspect-auto rounded-2xl overflow-hidden bg-cream border border-border ${className}`}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
      />
    </div>
  );
}

function InfoRow({
  icon: Icon, title, body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
      <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </span>
      <div className="flex-1 text-sm">
        <p className="font-medium">{title}</p>
        <div className="mt-0.5 text-muted-foreground">{body}</div>
      </div>
    </div>
  );
}

function truncate(s: string, n: number) {
  if (s.length <= n) return s;
  return s.slice(0, n).trimEnd() + "…";
}
