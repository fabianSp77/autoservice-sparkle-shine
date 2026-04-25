import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import { Phone, Menu, X } from "lucide-react";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Start" },
  { to: "/leistungen", label: "Leistungen" },
  { to: "/reifenservice", label: "Reifenservice" },
  { to: "/ueber-uns", label: "Über uns" },
  { to: "/bewertungen", label: "Bewertungen" },
  { to: "/kontakt", label: "Kontakt & Termin" },
] as const;

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        "bg-background/95 backdrop-blur-md border-b border-border",
        scrolled ? "shadow-soft" : "shadow-none",
      )}
    >
      <div className="container-tight flex items-center justify-between h-16 md:h-20">
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          aria-label={SITE.legalName}
        >
          <span className="relative inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground shadow-warm">
            <span className="font-serif font-bold text-lg leading-none">AB</span>
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-gold border-2 border-background" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg font-semibold tracking-tight">
              Autoservice Beuerberg
            </span>
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mt-0.5">
              Familienbetrieb seit {SITE.founded}
            </span>
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-sm font-medium text-foreground/75 hover:text-primary transition-colors relative py-1.5"
              activeProps={{
                className:
                  "text-primary after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-primary after:rounded-full",
              }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${SITE.phoneIntl}`}
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-medium hover:bg-primary-hover transition-colors shadow-warm"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden md:inline">{SITE.phone}</span>
            <span className="md:hidden">Anrufen</span>
          </a>
          <button
            type="button"
            className="lg:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg text-foreground hover:bg-muted transition-colors"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menü öffnen"
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "lg:hidden overflow-hidden transition-all duration-300 bg-background/95 backdrop-blur-md border-b border-border",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none",
        )}
      >
        <nav className="container-tight py-4 flex flex-col gap-1">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="px-3 py-2.5 rounded-md text-sm font-medium hover:bg-muted text-foreground"
              activeProps={{ className: "bg-muted text-primary" }}
              activeOptions={{ exact: item.to === "/" }}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`tel:${SITE.phoneIntl}`}
            className="sm:hidden mt-2 inline-flex items-center gap-2 justify-center rounded-md bg-primary text-primary-foreground px-4 py-2.5 text-sm font-medium"
          >
            <Phone className="h-4 w-4" /> {SITE.phone}
          </a>
        </nav>
      </div>
    </header>
  );
}
