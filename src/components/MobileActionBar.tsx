import { Phone, MessageSquare } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SITE } from "@/lib/site";

/**
 * Mobile-only sticky action bar with primary contact CTAs.
 * Hidden on lg+ to avoid covering desktop hero stats.
 */
export function MobileActionBar() {
  return (
    <div
      className="lg:hidden fixed bottom-0 inset-x-0 z-40 border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.15)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      role="navigation"
      aria-label="Schnellkontakt"
    >
      <div className="flex items-stretch gap-2 px-3 py-2.5">
        <a
          href={`tel:${SITE.phoneIntl}`}
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors min-h-[48px] shadow-warm"
        >
          <Phone className="h-4 w-4" aria-hidden="true" />
          <span>Anrufen</span>
        </a>
        <Link
          to="/kontakt"
          className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-foreground/5 border border-border text-foreground px-4 py-3 text-sm font-semibold hover:bg-foreground/10 transition-colors min-h-[48px]"
        >
          <MessageSquare className="h-4 w-4" aria-hidden="true" />
          <span>Anfragen</span>
        </Link>
      </div>
    </div>
  );
}
