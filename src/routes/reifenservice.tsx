import { createFileRoute, Link } from "@tanstack/react-router";
import {
  CheckCircle2, Snowflake, Sun, Warehouse, ShoppingBag, Bell,
  Phone, ArrowRight, ShieldCheck, Wrench, Gauge, Sparkles,
} from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";
import reifenHero from "@/assets/reifen-hero.jpg";
import reifenHotel from "@/assets/reifenhotel.jpg";
import reifenSommer from "@/assets/reifen-sommer.jpg";
import reifenWinter from "@/assets/reifen-winter.jpg";

export const Route = createFileRoute("/reifenservice")({
  head: () => ({
    meta: [
      { title: "Reifenservice & Reifenhotel — Autoservice Beuerberg" },
      {
        name: "description",
        content:
          "Reifenwechsel, Auswuchten, Verkauf und sichere Einlagerung im Reifenhotel. Familienbetrieb in Eurasburg-Beuerberg — pünktlich zur Saison wieder einsatzbereit.",
      },
      { property: "og:title", content: "Reifenservice & Reifenhotel — Autoservice Beuerberg" },
      {
        property: "og:description",
        content:
          "Reifenwechsel, Verkauf und Einlagerung im Reifenhotel — alles aus einer Hand.",
      },
      { property: "og:image", content: reifenHero },
    ],
  }),
  component: ReifenPage,
});

const VORTEILE = [
  {
    icon: Warehouse,
    t: "Sichere Einlagerung",
    d: "Trocken, dunkel und temperiert — wie ein Hotel für Ihre Räder.",
  },
  {
    icon: Bell,
    t: "Saison-Erinnerung",
    d: "Wir denken mit und melden uns rechtzeitig vor dem nächsten Wechsel.",
  },
  {
    icon: ShoppingBag,
    t: "Beratung & Verkauf",
    d: "Markenreifen passend zu Fahrzeug, Fahrprofil und Budget.",
  },
  {
    icon: CheckCircle2,
    t: "Profil- & Druckcheck",
    d: "Bei jedem Wechsel: Profiltiefe, Druck und Beschädigungen geprüft.",
  },
];

const ABLAUF = [
  {
    step: "01",
    icon: Phone,
    t: "Termin abstimmen",
    d: "Kurzer Anruf genügt — wir finden den passenden Slot, auch in der Hochsaison.",
  },
  {
    step: "02",
    icon: Wrench,
    t: "Wechsel & Auswuchten",
    d: "Demontage, Reinigung, Wuchten und Montage mit drehmomentgenauem Anzug.",
  },
  {
    step: "03",
    icon: Gauge,
    t: "Check & Dokumentation",
    d: "Profiltiefe, Reifendruck, RDKS-Anlernen und Sichtprüfung — schriftlich festgehalten.",
  },
  {
    step: "04",
    icon: Warehouse,
    t: "Einlagerung im Reifenhotel",
    d: "Auf Wunsch verstauen wir Ihre Räder bei uns — bis zur nächsten Saison.",
  },
];

function ReifenPage() {
  return (
    <>
      <PageHero
        eyebrow="Reifen & Saisonservice"
        title="Reifenwechsel, Verkauf und Einlagerung — alles aus einer Hand."
        subtitle="Sommer, Winter oder Ganzjahr: Wir wechseln, wuchten und lagern Ihre Räder fachgerecht ein. Pünktlich zur Saison wieder einsatzbereit."
        breadcrumbs={[{ label: "Reifenservice" }]}
        image={reifenHero}
        imageAlt="Mechaniker montiert einen Premium-Reifen auf eine Alufelge"
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
            search={{ leistung: "reifenservice" }}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-background/80 backdrop-blur px-6 py-3 text-sm font-semibold hover:bg-cream transition-colors"
          >
            Schriftlich anfragen
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </PageHero>

      {/* STATS-STRIP — Vertrauen */}
      <section className="border-y border-border bg-card">
        <div className="container-tight grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
          {[
            { v: "15+", l: "Jahre Reifenerfahrung" },
            { v: "Mo–Do", l: "7:30–18 Uhr · Fr bis 12" },
            { v: "24/7", l: "Telefonassistent" },
            { v: "Trocken", l: "& überwachte Lagerung" },
          ].map((s) => (
            <div key={s.l} className="px-4 py-6 text-center">
              <p className="font-serif text-2xl md:text-3xl text-foreground">{s.v}</p>
              <p className="mt-1 text-xs md:text-sm text-muted-foreground">{s.l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* REIFENHOTEL */}
      <section className="py-16 md:py-24">
        <div className="container-tight grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 lg:order-1">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elegant border border-border">
              <img
                src={reifenHotel}
                alt="Blick in unser Reifenhotel mit ordentlich gelagerten Kundenrädern"
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            {/* schwebendes Detail-Kärtchen */}
            <div className="hidden md:flex absolute -bottom-6 -right-6 items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-warm max-w-[16rem]">
              <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary shrink-0">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div className="text-xs leading-snug">
                <p className="font-semibold text-foreground">Versichert eingelagert</p>
                <p className="text-muted-foreground">Beschriftet & dokumentiert</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-semibold">
              <span className="h-px w-8 bg-primary/60" />
              Reifenhotel
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-balance leading-[1.1]">
              Ihre Räder schlafen bei uns — sicher, sauber, saisonbereit.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Schluss mit Reifenstapeln in Garage oder Keller. Wir bewahren Sommer-
              und Winterreifen fachgerecht auf, prüfen sie regelmäßig und montieren
              sie pünktlich zur Saison wieder an Ihr Fahrzeug.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-3">
              {VORTEILE.map((v) => (
                <div
                  key={v.t}
                  className="rounded-2xl bg-card border border-border p-5 hover:border-primary/40 hover:shadow-soft transition-all"
                >
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary">
                    <v.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 font-semibold">{v.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ABLAUF — So läuft's bei uns */}
      <section className="py-16 md:py-24 bg-cream/50 border-y border-border">
        <div className="container-tight">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-semibold">
              <span className="h-px w-8 bg-primary/60" />
              Ablauf
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-balance leading-[1.1]">
              In vier Schritten zum frischen Reifen.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Transparent, planbar und ohne Überraschungen — so arbeiten wir bei jedem
              Reifenwechsel.
            </p>
          </div>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {ABLAUF.map((a) => (
              <div
                key={a.step}
                className="relative rounded-2xl bg-card border border-border p-6 hover:shadow-warm hover:border-primary/30 transition-all"
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-primary/10 text-primary">
                    <a.icon className="h-5 w-5" />
                  </span>
                  <span className="font-serif text-3xl text-primary/15 leading-none">
                    {a.step}
                  </span>
                </div>
                <p className="mt-5 font-serif text-lg">{a.t}</p>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{a.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAISON-CARDS mit Bildern */}
      <section className="py-16 md:py-24">
        <div className="container-tight">
          <div className="max-w-2xl mx-auto text-center">
            <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-semibold">
              <Sparkles className="h-3 w-3" />
              Saisonwechsel
            </p>
            <h2 className="mt-4 font-serif text-3xl md:text-4xl text-balance leading-[1.1]">
              Zur richtigen Zeit auf den richtigen Reifen.
            </h2>
            <p className="mt-4 text-muted-foreground">
              Im Voralpenland gehört der Saisonwechsel zur Pflicht — wir nehmen Ihnen
              die Planung ab.
            </p>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-6">
            {/* Sommer */}
            <article className="group relative rounded-3xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-elegant transition-all">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={reifenSommer}
                  alt="Sommerreifen auf sonniger Landstraße"
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="p-7 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-amber-100 text-amber-700">
                    <Sun className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif text-2xl">Sommerwechsel</h3>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Ab milderen Temperaturen — meist <strong className="text-foreground">Mitte März</strong> —
                  bringen wir Sie sicher in die Sommersaison. Kürzerer Bremsweg,
                  weniger Verschleiß, besseres Fahrverhalten.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    Auswuchten & Reifendruck-Kontrolle inklusive
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    RDKS-Sensoren angelernt & geprüft
                  </li>
                </ul>
              </div>
            </article>

            {/* Winter */}
            <article className="group relative rounded-3xl overflow-hidden border border-border bg-card shadow-soft hover:shadow-elegant transition-all">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={reifenWinter}
                  alt="Winterreifen mit Schneeflocken im Voralpenland"
                  width={1024}
                  height={640}
                  loading="lazy"
                  className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-700"
                />
              </div>
              <div className="p-7 md:p-8">
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-sky-100 text-sky-700">
                    <Snowflake className="h-5 w-5" />
                  </span>
                  <h3 className="font-serif text-2xl">Winterwechsel</h3>
                </div>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Faustregel <strong className="text-foreground">„O bis O"</strong> — von Oktober
                  bis Ostern. Im Voralpenland besonders wichtig: rechtzeitig Termin
                  sichern, bevor der erste Schnee fällt.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    M+S- und 3PMSF-Reifen auf Lager bestellbar
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                    Profiltiefen-Empfehlung ≥ 4 mm für sicheren Grip
                  </li>
                </ul>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-20 md:pb-24">
        <div className="container-tight">
          <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-hover text-primary-foreground p-10 md:p-14 text-center relative overflow-hidden shadow-elegant">
            <div className="absolute inset-0 bg-grid-soft opacity-10" aria-hidden />
            <div className="relative max-w-2xl mx-auto">
              <p className="text-xs uppercase tracking-[0.22em] font-semibold opacity-90">
                Termin sichern
              </p>
              <h2 className="mt-3 font-serif text-3xl md:text-4xl">
                Jetzt Reifenwechsel oder Einlagerung anfragen.
              </h2>
              <p className="mt-4 text-primary-foreground/85 text-base md:text-lg">
                Am schnellsten geht's per Telefon — Mo–Fr 8–17 Uhr persönlich,
                außerhalb 24/7 über unseren Telefonassistenten.
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
                  search={{ leistung: "reifenservice" }}
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
