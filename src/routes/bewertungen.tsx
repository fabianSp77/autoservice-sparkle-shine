import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ExternalLink, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { PageHero } from "@/components/PageHero";
import { FacebookFeed } from "@/components/FacebookFeed";
import { SITE } from "@/lib/site";
import { getGoogleReviews, type ReviewsResult } from "@/lib/reviews.functions";

export const Route = createFileRoute("/bewertungen")({
  loader: () => getGoogleReviews(),
  head: () => ({
    meta: [
      { title: "Google-Bewertungen — Autoservice Beuerberg" },
      {
        name: "description",
        content:
          "Echte Google-Bewertungen für den Autoservice Beuerberg in Eurasburg. Lesen Sie, was Kundinnen und Kunden über uns sagen.",
      },
      { property: "og:title", content: "Google-Bewertungen — Autoservice Beuerberg" },
      {
        property: "og:description",
        content: "Echte Stimmen aus der Region — auf Google bewertet.",
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const data = Route.useLoaderData() as ReviewsResult;

  return (
    <>
      <PageHero
        eyebrow="Echte Google-Bewertungen"
        title="Vertrauen, das man hört."
        subtitle="Hier zeigen wir die aktuellen Rezensionen, die unsere Kundinnen und Kunden direkt auf Google hinterlassen haben — ungefiltert und tagesaktuell."
        breadcrumbs={[{ label: "Bewertungen" }]}
        showTrustStrip={false}
      >
        <RatingHeader data={data} />
      </PageHero>

      <section className="py-16 md:py-20">
        <div className="container-tight">
          {data.ok && data.reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.reviews.map((r) => (
                <ReviewCard
                  key={`${r.author_name}-${r.time}`}
                  name={r.author_name}
                  date={r.relative_time_description}
                  rating={r.rating}
                  text={r.text}
                  avatar={r.profile_photo_url}
                />
              ))}
            </div>
          ) : (
            <FallbackPanel error={data.error} />
          )}

          <div className="mt-16 grid lg:grid-cols-[1fr_auto] gap-10 items-start">
            <div className="rounded-3xl bg-cream border border-border p-8 md:p-10">
              <h2 className="font-serif text-2xl md:text-3xl">
                Sie waren bei uns? Wir freuen uns über Ihre Bewertung.
              </h2>
              <p className="mt-3 text-muted-foreground max-w-xl">
                Eine kurze Rezension hilft uns enorm — und anderen Autofahrern
                aus der Region, eine ehrliche Werkstatt zu finden.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={SITE.googleReviewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors"
                >
                  <Star className="h-4 w-4 fill-primary-foreground" />
                  Bei Google bewerten
                </a>
                <a
                  href={SITE.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
                >
                  Alle Bewertungen <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            <div className="lg:w-[360px]">
              <FacebookFeed height={420} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function RatingHeader({ data }: { data: ReviewsResult }) {
  if (!data.ok || !data.rating) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex gap-0.5 text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 fill-gold" />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          Direkt auf Google bewertet
        </span>
      </div>
    );
  }
  const filled = Math.round(data.rating);
  return (
    <div className="flex flex-wrap items-center gap-4">
      <span className="font-serif text-3xl text-foreground">
        {data.rating.toFixed(1)}
      </span>
      <div className="flex gap-0.5 text-gold" aria-label={`${data.rating} von 5 Sternen`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < filled ? "h-5 w-5 fill-gold" : "h-5 w-5 opacity-30"}
          />
        ))}
      </div>
      <span className="text-sm text-muted-foreground">
        {data.total ?? 0} Google-Bewertungen
      </span>
    </div>
  );
}

function ReviewCard({
  name, date, rating, text, avatar,
}: {
  name: string; date: string; rating: number; text: string; avatar?: string;
}) {
  const [showFull, setShowFull] = useState(false);
  const long = text.length > 220;
  return (
    <figure className="rounded-2xl bg-card border border-border p-6 hover:shadow-warm transition-all flex flex-col">
      <div className="flex items-center gap-3">
        {avatar ? (
          <img
            src={avatar}
            alt=""
            width={40}
            height={40}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-10 w-10 rounded-full bg-cream object-cover"
          />
        ) : (
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-serif">
            {name.slice(0, 1)}
          </span>
        )}
        <div className="leading-tight">
          <p className="text-sm font-semibold">{name}</p>
          <p className="text-xs text-muted-foreground">{date}</p>
        </div>
        <Quote className="ml-auto h-5 w-5 text-primary/30" />
      </div>
      <div className="mt-4 flex gap-0.5 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < rating ? "h-4 w-4 fill-gold" : "h-4 w-4 opacity-25"}
          />
        ))}
      </div>
      <blockquote className="mt-3 text-sm text-foreground/85 leading-relaxed flex-1">
        {long && !showFull ? `${text.slice(0, 220).trim()}…` : text}
      </blockquote>
      {long && (
        <button
          type="button"
          onClick={() => setShowFull((v) => !v)}
          className="mt-2 self-start text-xs font-semibold text-primary hover:underline"
        >
          {showFull ? "Weniger" : "Mehr lesen"}
        </button>
      )}
    </figure>
  );
}

function FallbackPanel({ error }: { error?: string }) {
  // Hint nur in dev
  useEffect(() => {
    if (error) console.info("[Reviews] Fallback aktiv:", error);
  }, [error]);
  return (
    <div className="rounded-3xl bg-cream border border-border p-8 md:p-12 text-center max-w-2xl mx-auto">
      <Star className="h-10 w-10 text-gold mx-auto fill-gold/30" />
      <h2 className="mt-4 font-serif text-2xl">
        Bewertungen direkt auf Google ansehen
      </h2>
      <p className="mt-3 text-muted-foreground">
        Die aktuellen Rezensionen unserer Kundinnen und Kunden finden Sie auf
        unserem Google-Profil. Klicken Sie auf den Link, um alle Bewertungen
        zu lesen.
      </p>
      <div className="mt-6 flex flex-wrap gap-3 justify-center">
        <a
          href={SITE.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors"
        >
          Bewertungen auf Google
          <ExternalLink className="h-4 w-4" />
        </a>
        <Link
          to="/kontakt"
          className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
        >
          Termin anfragen
        </Link>
      </div>
    </div>
  );
}
