import { createFileRoute, Link } from "@tanstack/react-router";
import { CheckCircle2, Snowflake, Sun, Warehouse, ShoppingBag, Bell } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";
import reifenImg from "@/assets/reifenservice.jpg";

export const Route = createFileRoute("/reifenservice")({
  head: () => ({
    meta: [
      { title: "Reifenservice & Reifenhotel — Autoservice Beuerberg" },
      {
        name: "description",
        content:
          "Reifenwechsel, Auswuchten, Verkauf und sichere Einlagerung im Reifenhotel. Termin online anfragen — Familienbetrieb in Eurasburg-Beuerberg.",
      },
      { property: "og:title", content: "Reifenservice & Reifenhotel — Autoservice Beuerberg" },
      {
        property: "og:description",
        content:
          "Reifenwechsel, Verkauf und Einlagerung im Reifenhotel. Termin direkt online anfragen.",
      },
      { property: "og:image", content: reifenImg },
    ],
  }),
  component: ReifenPage,
});

const VORTEILE = [
  { icon: Warehouse, t: "Sichere Einlagerung", d: "Trocken, sauber und gegen unbefugten Zugriff geschützt — wie ein Hotel für Ihre Räder." },
  { icon: Bell, t: "Saison-Erinnerung", d: "Wir denken für Sie mit und melden uns rechtzeitig vor dem nächsten Wechsel." },
  { icon: ShoppingBag, t: "Beratung & Verkauf", d: "Markenreifen passend zu Ihrem Fahrzeug, Fahrprofil und Budget." },
  { icon: CheckCircle2, t: "Profil- & Druckcheck", d: "Bei jedem Wechsel kontrollieren wir Profiltiefe, Druck und Beschädigungen." },
];

function ReifenPage() {
  return (
    <>
      <PageHero
        eyebrow="Reifen & Saisonservice"
        title="Reifenwechsel, Verkauf und Einlagerung — alles aus einer Hand."
        subtitle="Sommer, Winter oder Ganzjahr: Wir wechseln, wuchten und lagern Ihre Räder fachgerecht ein. Pünktlich zur Saison wieder einsatzbereit."
        breadcrumbs={[{ label: "Reifenservice" }]}
        image={reifenImg}
        imageAlt="Reifenservice und Reifenhotel im Autoservice Beuerberg"
      />

      <section className="py-16 md:py-20">
        <div className="container-tight grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-elegant">
            <img
              src={reifenImg}
              alt="Reifenhotel"
              width={1280}
              height={960}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-balance">
              Ihr Reifenhotel im Voralpenland.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Lagern Sie Ihre Räder bei uns ein, statt sie zuhause Platz wegnehmen
              zu lassen. Wir bewahren Sommer- und Winterreifen sicher auf, prüfen
              regelmäßig den Zustand und montieren sie pünktlich zur Saison wieder
              an Ihr Fahrzeug.
            </p>
            <div className="mt-8 grid sm:grid-cols-2 gap-4">
              {VORTEILE.map((v) => (
                <div key={v.t} className="rounded-xl bg-card border border-border p-5">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary">
                    <v.icon className="h-4 w-4" />
                  </span>
                  <p className="mt-3 font-medium">{v.t}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-cream">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-card border border-border p-7">
              <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary">
                <Sun className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-2xl">Sommerwechsel</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sobald die Tage milder werden — meist ab Mitte März — bringen wir
                Sie sicher in die Sommersaison.
              </p>
            </div>
            <div className="rounded-2xl bg-card border border-border p-7">
              <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary">
                <Snowflake className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-serif text-2xl">Winterwechsel</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Faustregel „O bis O" — von Oktober bis Ostern. Im Voralpenland
                besonders wichtig: rechtzeitig Termin sichern.
              </p>
            </div>
          </div>
          <div className="mt-12 text-center">
            <h3 className="font-serif text-2xl md:text-3xl">Termin sichern</h3>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">
              Am schnellsten geht's per Telefon — unser Telefonassistent ist
              <strong className="text-foreground"> 24/7</strong> für Terminanfragen erreichbar.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={`tel:${SITE.phoneIntl}`}
                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                {SITE.phone}
              </a>
              <Link
                to="/kontakt"
                search={{ leistung: "reifenservice" }}
                className="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-muted transition-colors"
              >
                Schriftlich anfragen
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
