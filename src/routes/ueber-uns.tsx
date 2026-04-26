import { createFileRoute } from "@tanstack/react-router";
import { Award, HeartHandshake, Sparkles, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";
import heroImg from "@/assets/real/team-gruppe.jpg";
import handshakeImg from "@/assets/real/team-handshake.jpg";
import technikImg from "@/assets/real/foto-02.jpg";
import lackImg from "@/assets/real/foto-08.jpg";

export const Route = createFileRoute("/ueber-uns")({
  head: () => ({
    meta: [
      { title: "Über uns — Familie Fischer | Autoservice Beuerberg" },
      {
        name: "description",
        content:
          "Seit 2009 führt Familie Fischer den Autoservice Beuerberg. Lernen Sie das Team kennen — persönlich, ehrlich und auf Meisterniveau.",
      },
      { property: "og:title", content: "Über uns — Familie Fischer | Autoservice Beuerberg" },
      {
        property: "og:description",
        content:
          "Familienbetrieb seit 2009 — geführt von Jürgen, Monika und Ludwig Fischer.",
      },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: HeartHandshake,
    t: "Persönlich",
    d: "Sie sprechen direkt mit der Familie und dem Team — keine Hotline, keine wechselnden Ansprechpartner.",
  },
  {
    icon: Award,
    t: "Meisterhandwerk",
    d: "Geführt von Kfz-Meistern. Saubere Arbeit, moderne Technik, Werterhalt Ihres Fahrzeugs.",
  },
  {
    icon: Users,
    t: "Verwurzelt",
    d: "Wir leben und arbeiten in Beuerberg — das verpflichtet zu Qualität, der man vertrauen kann.",
  },
  {
    icon: Sparkles,
    t: "Mit Liebe zum Auto",
    d: "Wir sind selbst Auto-Enthusiasten. Diese Leidenschaft fließt in jeden Auftrag ein.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={`Familie Fischer · seit ${SITE.founded}`}
        title="Eine Werkstatt mit Handschlag-Qualität."
        subtitle="2009 gründeten Jürgen und Monika Fischer ihren Autoservice in der Bahnhofstraße. Heute führen sie den Betrieb gemeinsam mit ihrem Sohn Ludwig — und einem eingespielten Team aus erfahrenen Mechanikern."
        breadcrumbs={[{ label: "Über uns" }]}
        image={heroImg}
        imageAlt="Das Team von Autoservice Beuerberg vor der Werkstatt"
      />

      <section className="py-16 md:py-20">
        <div className="container-tight grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-elegant">
              <img
                src={handshakeImg}
                alt="Ludwig Fischer mit Auszubildendem vor der Werkstatt — Wissen wird weitergegeben"
                width={1024}
                height={1280}
                loading="lazy"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 sm:bottom-8 sm:left-8 bg-card rounded-2xl shadow-warm border border-border p-5">
              <p className="font-serif text-3xl text-primary">
                {new Date().getFullYear() - SITE.founded}+
              </p>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mt-1">
                Jahre für unsere Region
              </p>
            </div>
          </div>
          <div>
            <h2 className="font-serif text-3xl md:text-4xl text-balance">
              Aus einem Familientraum wurde eine feste Adresse.
            </h2>
            <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Im Frühjahr {SITE.founded} öffneten Jürgen und Monika Fischer
                die Tore ihres Autoservice in Beuerberg — mit damals einem
                Auszubildenden, viel Erfahrung und noch mehr Begeisterung.
              </p>
              <p>
                Heute, über 15 Jahre später, ist daraus eine eingespielte
                Werkstatt geworden, in der Sohn Ludwig die Tradition als
                Kfz-Meister fortführt. Mit modernster Diagnosetechnik, einem
                gut sortierten Reifenhotel und Hand­werks­qualität, die man
                an jedem Detail spürt.
              </p>
              <p>
                Was uns ausmacht? Wir nehmen uns Zeit für Ihr Anliegen,
                erklären verständlich und lassen Sie nicht im Regen stehen —
                weder bei der Inspektion noch beim ersten Werkstattbesuch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-cream">
        <div className="container-tight">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-xs uppercase tracking-[0.22em] text-primary font-medium">
              Unsere Werte
            </p>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl text-balance">
              Was uns wichtig ist.
            </h2>
          </div>
          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {VALUES.map((v) => (
              <article
                key={v.t}
                className="rounded-2xl bg-card border border-border p-6 text-center"
              >
                <span className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mx-auto">
                  <v.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 font-serif text-lg">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-tight grid md:grid-cols-2 gap-6">
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-warm">
            <img
              src={technikImg}
              alt="Bosch-Achsmessung in unserer Werkstatt"
              width={1280}
              height={960}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-warm">
            <img
              src={lackImg}
              alt="Lackierarbeiten in unserer Lackierkabine"
              width={1920}
              height={800}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>
    </>
  );
}
