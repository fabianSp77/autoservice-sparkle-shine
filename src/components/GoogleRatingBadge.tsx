import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { REVIEWS_SUMMARY } from "@/lib/reviews";

type Variant = "compact" | "default" | "dark";

type Props = {
  variant?: Variant;
  className?: string;
  rating?: number;
  count?: number;
};

/**
 * Wiederverwendbares Google-Rating-Badge — zeigt den echten Google-Schnitt
 * und verlinkt auf die Bewertungsseite. Werte können per Props überschrieben
 * werden (z.B. mit Live-Daten aus Loader); ansonsten Fallback aus REVIEWS_SUMMARY.
 */
export function GoogleRatingBadge({
  variant = "default",
  className = "",
  rating = REVIEWS_SUMMARY.rating,
  count = REVIEWS_SUMMARY.count,
}: Props) {
  const filled = Math.round(rating);

  if (variant === "compact") {
    return (
      <Link
        to="/bewertungen"
        className={`inline-flex items-center gap-1.5 rounded-full border border-border bg-card hover:border-primary/40 hover:shadow-warm px-2.5 py-1 transition-all ${className}`}
        aria-label={`${rating.toFixed(1)} von 5 Sternen auf Google`}
      >
        <GoogleG className="h-3.5 w-3.5" />
        <span className="text-xs font-semibold text-foreground tabular-nums">
          {rating.toFixed(1)}
        </span>
        <span className="flex gap-0.5 text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={i < filled ? "h-2.5 w-2.5 fill-gold" : "h-2.5 w-2.5 opacity-30"}
            />
          ))}
        </span>
      </Link>
    );
  }

  if (variant === "dark") {
    return (
      <Link
        to="/bewertungen"
        className={`inline-flex items-center gap-3 rounded-full bg-background/10 backdrop-blur border border-background/20 hover:bg-background/15 px-4 py-2 transition-all group ${className}`}
        aria-label={`${rating.toFixed(1)} von 5 Sternen auf Google`}
      >
        <GoogleG className="h-4 w-4" />
        <span className="text-sm font-semibold text-background tabular-nums">
          {rating.toFixed(1)}
        </span>
        <span className="flex gap-0.5 text-gold">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={i < filled ? "h-3 w-3 fill-gold" : "h-3 w-3 opacity-30"}
            />
          ))}
        </span>
        <span className="text-xs text-background/75 hidden sm:inline">
          auf Google
        </span>
      </Link>
    );
  }

  return (
    <Link
      to="/bewertungen"
      className={`inline-flex items-center gap-3 rounded-full bg-card border border-border hover:border-primary/40 hover:shadow-warm px-4 py-2 transition-all ${className}`}
      aria-label={`${rating.toFixed(1)} von 5 Sternen auf Google – ${count} Bewertungen`}
    >
      <GoogleG className="h-4 w-4" />
      <span className="text-sm font-semibold text-foreground tabular-nums">
        {rating.toFixed(1)}
      </span>
      <span className="flex gap-0.5 text-gold">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={i < filled ? "h-3 w-3 fill-gold" : "h-3 w-3 opacity-30"}
          />
        ))}
      </span>
      <span className="text-xs text-muted-foreground hidden sm:inline">
        {count} Bewertungen
      </span>
    </Link>
  );
}

function GoogleG({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.5-5.2l-6.2-5.2c-2 1.5-4.5 2.4-7.3 2.4-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.6 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.3 5.6l6.2 5.2c-.4.4 6.8-5 6.8-14.8 0-1.3-.1-2.4-.4-3.5z" />
    </svg>
  );
}
