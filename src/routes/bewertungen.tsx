import { createFileRoute } from "@tanstack/react-router";
import { Star, ExternalLink } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/bewertungen")({
  head: () => ({
    meta: [
      { title: "Bewertungen & Kundenstimmen — Autoservice Beuerberg" },
      {
        name: "description",
        content:
          "Was Kundinnen und Kunden über den Autoservice Beuerberg in Eurasburg sagen. Lesen Sie ehrliche Stimmen aus der Region.",
      },
      { property: "og:title", content: "Bewertungen & Kundenstimmen — Autoservice Beuerberg" },
      {
        property: "og:description",
        content: "Ehrliche Kundenstimmen über unsere Werkstatt im Voralpenland.",
      },
    ],
  }),
  component: ReviewsPage,
});

const REVIEWS = [
  { name: "Andrea L.", role: "Münsing", text: "Schnelle Termine, ehrliche Kommunikation und immer ein freundliches Wort. Wir sind seit Jahren Kunde — uneingeschränkt zu empfehlen." },
  { name: "Matthias R.", role: "Wolfratshausen", text: "Super Werkstatt, sehr kompetent und fair im Preis. Familie Fischer und das Team kümmern sich wirklich um jeden Wagen." },
  { name: "Stefanie B.", role: "Beuerberg", text: "Endlich eine Werkstatt, der man vertrauen kann. Reifeneinlagerung, Inspektion, HU — alles aus einer Hand und immer top." },
  { name: "Hans G.", role: "Bad Tölz", text: "Klimaservice und HU an einem Tag erledigt. Faire Preisansage, sauber gearbeitet. Komme wieder." },
  { name: "Tanja K.", role: "Geretsried", text: "Mein Auto wurde nicht nur repariert, sondern auch innen gereinigt zurückgegeben. So macht Werkstatt Freude." },
  { name: "Florian P.", role: "Eurasburg", text: "Ludwig hat sich richtig Zeit genommen, um den Fehler zu erklären. Keine Tricks, keine Mehrkosten — einfach gute Arbeit." },
  { name: "Birgit H.", role: "Königsdorf", text: "Reifenwechsel ohne lange Wartezeit, freundlicher Empfang, alles tipptopp. Ich empfehle die Werkstatt gerne weiter." },
  { name: "Markus W.", role: "Penzberg", text: "Kompetente Diagnose nachdem zwei andere Werkstätten den Fehler nicht gefunden haben. Top-Team!" },
  { name: "Carolin S.", role: "Wolfratshausen", text: "Persönlich, herzlich, kompetent — so soll eine Werkstatt sein. Vielen Dank an das ganze Team!" },
];

function ReviewsPage() {
  return (
    <>
      <PageHero
        eyebrow="Kundenstimmen"
        title="Vertrauen, das man hört."
        subtitle="Über 15 Jahre kümmern wir uns um die Autos unserer Region. Ein Auszug aus den Stimmen, die uns besonders freuen."
      >
        <div className="flex items-center gap-3">
          <div className="flex gap-0.5 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-gold" />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            Hervorragende Bewertungen aus der Region
          </span>
        </div>
      </PageHero>

      <section className="py-16 md:py-20">
        <div className="container-tight">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {REVIEWS.map((r) => (
              <figure
                key={r.name}
                className="rounded-2xl bg-card border border-border p-6 hover:shadow-warm transition-all"
              >
                <div className="flex gap-0.5 text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 text-foreground/85 leading-relaxed">
                  „{r.text}"
                </blockquote>
                <figcaption className="mt-5 pt-5 border-t border-border text-sm">
                  <span className="font-medium text-foreground">{r.name}</span>
                  <span className="text-muted-foreground"> · {r.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href={SITE.mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors"
            >
              Bewertungen auf Google ansehen <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
