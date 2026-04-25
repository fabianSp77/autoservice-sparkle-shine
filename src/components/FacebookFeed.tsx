import { useEmbedConsent } from "./CookieBanner";
import { Facebook, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/site";

type Props = {
  height?: number;
  width?: number;
};

export function FacebookFeed({ height = 500, width = 500 }: Props) {
  const consent = useEmbedConsent();
  // Facebook plugin caps width at 500. We render the iframe centered and let the
  // surrounding card span full width — looks balanced on desktop and mobile.
  const pluginUrl = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
    SITE.facebookUrl,
  )}&tabs=timeline&width=${width}&height=${height}&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=true&locale=de_DE`;

  return (
    <div className="rounded-2xl bg-card border border-border overflow-hidden shadow-warm">
      <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-border bg-cream/40">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#1877F2] text-white">
            <Facebook className="h-4 w-4" />
          </span>
          <div className="leading-tight">
            <p className="text-sm font-semibold">Aktuelles auf Facebook</p>
            <p className="text-xs text-muted-foreground">
              @{SITE.facebookHandle}
            </p>
          </div>
        </div>
        <a
          href={SITE.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:gap-2 transition-all"
        >
          Zur Seite <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      {consent ? (
        <div className="bg-cream/30 flex justify-center">
          <iframe
            title="Autoservice Beuerberg auf Facebook"
            src={pluginUrl}
            width={width}
            height={height}
            style={{ border: "none", overflow: "hidden", display: "block", maxWidth: "100%" }}
            scrolling="no"
            loading="lazy"
            allow="encrypted-media"
          />
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center text-center px-6 py-10 bg-cream/30"
          style={{ minHeight: height }}
        >
          <Facebook className="h-10 w-10 text-[#1877F2]" />
          <p className="mt-4 text-sm text-foreground/80 max-w-xs leading-relaxed">
            Damit wir Ihnen unsere Facebook-Beiträge direkt anzeigen können,
            benötigen wir Ihre Zustimmung. Sie können diese unten im
            Cookie-Hinweis erteilen.
          </p>
          <a
            href={SITE.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1877F2] text-white px-4 py-2 text-xs font-semibold hover:bg-[#0e63d6] transition-colors"
          >
            <Facebook className="h-3.5 w-3.5" />
            Auf Facebook ansehen
          </a>
        </div>
      )}
    </div>
  );
}
