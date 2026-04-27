import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, ExternalLink, Quote, ShieldCheck, MapPin } from "lucide-react";
import { useState } from "react";
import { PageHero } from "@/components/PageHero";
import { FacebookFeed } from "@/components/FacebookFeed";
import { SITE } from "@/lib/site";
import { GOOGLE_REVIEWS, REVIEWS_SUMMARY, type StaticReview } from "@/lib/reviews";
import { getGoogleReviewsSummary } from "@/lib/reviews.functions";

export const Route = createFileRoute("/bewertungen")({
  loader: async () => {
    try {
      return { summary: await getGoogleReviewsSummary() };
    } catch {
      return {
        summary: {
          rating: REVIEWS_SUMMARY.rating,
          count: REVIEWS_SUMMARY.count,
          source: "fallback" as const,
        },
      };
    }
  },
  head: () => ({
    meta: [
      { title: "Google-Bewertungen — Autoservice Beuerberg" },
      {
        name: "description",
        content:
          "4,7 Sterne auf Google: Lesen Sie echte Erfahrungsberichte von Kundinnen und Kunden des Autoservice Beuerberg in Eurasburg.",
      },
      { property: "og:title", content: "Google-Bewertungen — Autoservice Beuerberg" },
      {
        property: "og:description",
        content: "Echte 5-Sterne-Stimmen aus der Region — verifiziert auf Google.",
      },
    ],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  const { summary } = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="Echte Google-Bewertungen"
        title="Vertrauen, das man hört."
        subtitle="Was unsere Kundinnen und Kunden auf Google über uns schreiben — ungefiltert, verifiziert, mit Link direkt zur Quelle."
        breadcrumbs={[{ label: "Bewertungen" }]}
        showTrustStrip={false}
      >
        <RatingHeader rating={summary.rating} count={summary.count} />
      </PageHero>

      <GoogleReviewsSection />
      <FacebookSection />
      <CtaSection />
    </>
  );
}

/* ---------------- Rating Header (im Hero) ---------------- */

function RatingHeader({ rating, count }: { rating: number; count: number }) {
  const filled = Math.round(rating);
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
      <div className="flex items-center gap-3">
        <span className="font-serif text-4xl md:text-5xl text-foreground leading-none">
          {rating.toFixed(1)}
        </span>
        <div className="flex flex-col gap-1">
          <div className="flex gap-0.5 text-gold" aria-label={`${rating} von 5 Sternen`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={i < filled ? "h-5 w-5 fill-gold" : "h-5 w-5 opacity-30"}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground">
            aus {count} Google-Bewertungen
          </p>
        </div>
      </div>
      <a
        href={SITE.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary-hover transition-colors w-fit"
      >
        <GoogleIcon className="h-4 w-4" />
        Auf Google ansehen
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  );
}

/* ---------------- Google Reviews Block ---------------- */

function GoogleReviewsSection() {
  // Featured = die ausführlichste Bewertung oben groß
  const [featured, ...rest] = GOOGLE_REVIEWS;

  return (
    <section className="py-16 md:py-24">
      <div className="container-tight">
        {/* Section Header */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-cream border border-border px-3 py-1 text-xs font-medium text-muted-foreground mb-3">
              <GoogleIcon className="h-3.5 w-3.5" />
              Direkt auf Google bewertet
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            </div>
            <h2 className="font-serif text-3xl md:text-4xl">
              Was unsere Kundschaft sagt
            </h2>
          </div>
          <a
            href={SITE.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-primary hover:underline inline-flex items-center gap-1.5"
          >
            Alle Bewertungen auf Google
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>

        {/* Featured Review */}
        <FeaturedReview review={featured} />

        {/* Grid mit den restlichen Bewertungen */}
        <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((r) => (
            <ReviewCard key={r.author} review={r} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedReview({ review }: { review: StaticReview }) {
  return (
    <figure className="relative rounded-3xl bg-gradient-to-br from-cream to-card border border-border p-8 md:p-12 shadow-warm overflow-hidden">
      <Quote className="absolute top-6 right-6 md:top-8 md:right-10 h-16 w-16 md:h-24 md:w-24 text-primary/10" />
      <div className="relative">
        <div className="flex items-center gap-4 mb-5">
          <Avatar initials={review.initials} size="lg" />
          <div>
            <div className="flex items-center gap-2">
              <p className="font-semibold text-base">{review.author}</p>
              {review.isLocalGuide && (
                <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-2 py-0.5">
                  Local Guide
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {review.reviewCount ? `${review.reviewCount} Rezensionen · ` : ""}
              {review.date}
            </p>
          </div>
          <div className="ml-auto flex gap-0.5 text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={i < review.rating ? "h-5 w-5 fill-gold" : "h-5 w-5 opacity-25"}
              />
            ))}
          </div>
        </div>
        <blockquote className="font-serif text-xl md:text-2xl leading-relaxed text-foreground/90 max-w-3xl">
          {review.text.split("\n\n").map((p, i) => (
            <p key={i} className={i > 0 ? "mt-4" : ""}>
              {p}
            </p>
          ))}
        </blockquote>
        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
          <GoogleIcon className="h-4 w-4" />
          Verifizierte Bewertung auf Google
        </div>
      </div>
    </figure>
  );
}

function ReviewCard({ review }: { review: StaticReview }) {
  const [showFull, setShowFull] = useState(false);
  const long = review.text.length > 220;
  const display = long && !showFull ? `${review.text.slice(0, 220).trim()}…` : review.text;

  return (
    <figure className="rounded-2xl bg-card border border-border p-6 hover:shadow-warm hover:border-primary/30 transition-all flex flex-col">
      <div className="flex items-start gap-3">
        <Avatar initials={review.initials} />
        <div className="leading-tight min-w-0 flex-1">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-sm font-semibold truncate">{review.author}</p>
            {review.isLocalGuide && (
              <span className="inline-flex items-center rounded-full bg-primary/10 text-primary text-[10px] font-semibold px-1.5 py-0.5">
                Guide
              </span>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{review.date}</p>
        </div>
        <GoogleIcon className="h-4 w-4 mt-1 opacity-70 shrink-0" />
      </div>

      <div className="mt-4 flex gap-0.5 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < review.rating ? "h-4 w-4 fill-gold" : "h-4 w-4 opacity-25"}
          />
        ))}
      </div>

      <blockquote className="mt-3 text-sm text-foreground/85 leading-relaxed flex-1 whitespace-pre-line">
        {display}
      </blockquote>

      {long && (
        <button
          type="button"
          onClick={() => setShowFull((v) => !v)}
          className="mt-2 self-start text-xs font-semibold text-primary hover:underline"
        >
          {showFull ? "Weniger anzeigen" : "Mehr lesen"}
        </button>
      )}

      {review.ownerReply && showFull && (
        <div className="mt-4 rounded-xl bg-cream/60 border border-border/60 p-3">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wide">
            Antwort vom Inhaber
          </p>
          <p className="mt-1.5 text-xs text-foreground/75 leading-relaxed">
            {review.ownerReply}
          </p>
        </div>
      )}
    </figure>
  );
}

function Avatar({ initials, size = "md" }: { initials: string; size?: "md" | "lg" }) {
  const cls =
    size === "lg"
      ? "h-14 w-14 text-base"
      : "h-10 w-10 text-sm";
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full bg-primary/10 text-primary font-serif font-semibold shrink-0 ${cls}`}
    >
      {initials}
    </span>
  );
}

/* ---------------- Facebook Section (volle Breite, unter den Reviews) ---------------- */

function FacebookSection() {
  return (
    <section className="py-16 md:py-20 bg-cream/40 border-y border-border">
      <div className="container-tight">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-2">
            Aktuelles
          </p>
          <h2 className="font-serif text-3xl md:text-4xl">
            Folgen Sie uns auf Facebook
          </h2>
          <p className="mt-3 text-muted-foreground">
            Saisonale Hinweise, Aktionen und ein Blick hinter die Kulissen unserer
            Werkstatt — direkt aus Beuerberg.
          </p>
        </div>
        <div className="mx-auto" style={{ maxWidth: 500 }}>
          <FacebookFeed height={640} width={500} />
        </div>
      </div>
    </section>
  );
}

/* ---------------- CTA Section ---------------- */

function CtaSection() {
  return (
    <section className="py-16 md:py-20">
      <div className="container-tight">
        <div className="rounded-3xl bg-gradient-to-br from-primary to-primary-hover text-primary-foreground p-10 md:p-14 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-soft opacity-10" aria-hidden />
          <div className="relative max-w-2xl mx-auto">
            <Star className="h-10 w-10 mx-auto fill-primary-foreground/90 text-primary-foreground/90" />
            <h2 className="mt-4 font-serif text-3xl md:text-4xl">
              Sie waren bei uns? Erzählen Sie es weiter.
            </h2>
            <p className="mt-3 text-primary-foreground/85 text-base md:text-lg">
              Eine kurze Rezension auf Google hilft uns enorm — und anderen
              Autofahrern aus der Region, eine ehrliche Werkstatt zu finden.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a
                href={SITE.googleReviewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary-foreground text-primary px-6 py-3 text-sm font-semibold hover:bg-cream transition-colors"
              >
                <Star className="h-4 w-4 fill-primary" />
                Bei Google bewerten
              </a>
              <a
                href={SITE.mapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                <MapPin className="h-4 w-4" />
                Alle Bewertungen ansehen
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <Link
                to="/kontakt"
                className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/40 px-6 py-3 text-sm font-semibold hover:bg-primary-foreground/10 transition-colors"
              >
                Kontakt aufnehmen
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Google Icon (inline SVG, lizenzfrei vereinfacht) ---------------- */

function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path
        fill="#FFC107"
        d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
      />
      <path
        fill="#FF3D00"
        d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
      />
      <path
        fill="#4CAF50"
        d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.3 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z"
      />
      <path
        fill="#1976D2"
        d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2c-.4.4 6.8-5 6.8-14.8 0-1.3-.1-2.4-.4-3.5z"
      />
    </svg>
  );
}
