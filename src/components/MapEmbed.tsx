import { useEmbedConsent } from "./CookieBanner";
import { SITE } from "@/lib/site";
import { MapPin } from "lucide-react";

type Props = { className?: string; height?: string };

export function MapEmbed({ className = "", height = "100%" }: Props) {
  const consent = useEmbedConsent();
  return (
    <div
      className={`rounded-2xl overflow-hidden border border-border bg-cream/40 ${className}`}
      style={{ minHeight: 320 }}
    >
      {consent ? (
        <iframe
          title={`Standort ${SITE.legalName}`}
          src={SITE.mapsEmbed}
          width="100%"
          height={height}
          style={{ border: 0, display: "block", minHeight: 320 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full min-h-[320px] text-center px-6 py-10">
          <MapPin className="h-9 w-9 text-primary" />
          <p className="mt-4 text-sm text-foreground/80 max-w-xs">
            Google Maps wird erst nach Ihrer Zustimmung geladen.
          </p>
          <a
            href={SITE.mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-sm font-semibold text-primary hover:underline"
          >
            Auf Google Maps öffnen →
          </a>
        </div>
      )}
    </div>
  );
}
