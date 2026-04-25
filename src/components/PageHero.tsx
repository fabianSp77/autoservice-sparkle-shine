import { Link } from "@tanstack/react-router";
import { ChevronRight, MapPin, Phone, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { SITE } from "@/lib/site";

type Crumb = { label: string; to?: string };

export function PageHero({
  eyebrow,
  title,
  subtitle,
  className,
  children,
  image,
  imageAlt,
  breadcrumbs,
  showTrustStrip = true,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: Crumb[];
  showTrustStrip?: boolean;
}) {
  return (
    <section
      className={cn(
        "relative pt-28 md:pt-36 pb-14 md:pb-20 overflow-hidden bg-hero-soft",
        className,
      )}
    >
      {/* feines Grid-Raster (statt Rauten) */}
      <div
        className="absolute inset-0 bg-grid-soft pointer-events-none opacity-[0.55]"
        aria-hidden
      />
      {/* dezente Ecklinie als Designdetail */}
      <div
        className="absolute top-24 right-0 hidden lg:block h-px w-40 bg-gradient-to-r from-transparent to-primary/40"
        aria-hidden
      />

      <div className="container-tight relative">
        <div
          className={cn(
            "grid items-center gap-10 lg:gap-14",
            image ? "lg:grid-cols-[1.1fr_1fr]" : "grid-cols-1",
          )}
        >
          <div>
            {breadcrumbs && breadcrumbs.length > 0 && (
              <nav
                aria-label="Breadcrumb"
                className="mb-5 flex flex-wrap items-center gap-1.5 text-xs text-muted-foreground fade-in-up"
              >
                <Link to="/" className="hover:text-primary transition-colors">
                  Start
                </Link>
                {breadcrumbs.map((c, i) => (
                  <span key={i} className="flex items-center gap-1.5">
                    <ChevronRight className="h-3 w-3" />
                    {c.to ? (
                      <Link to={c.to} className="hover:text-primary transition-colors">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="text-foreground/80 font-medium">{c.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}

            {eyebrow && (
              <p className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-primary font-semibold fade-in-up">
                <span className="h-px w-8 bg-primary/60" />
                {eyebrow}
              </p>
            )}
            <h1 className="mt-4 font-serif text-4xl sm:text-5xl md:text-6xl text-foreground text-balance fade-in-up max-w-2xl leading-[1.05]">
              {title}
            </h1>
            {subtitle && (
              <p
                className="mt-5 text-base md:text-lg text-muted-foreground max-w-xl text-pretty fade-in-up"
                style={{ animationDelay: "80ms" }}
              >
                {subtitle}
              </p>
            )}
            {children && (
              <div className="mt-7 fade-in-up" style={{ animationDelay: "160ms" }}>
                {children}
              </div>
            )}
          </div>

          {image && (
            <div
              className="relative fade-in-up"
              style={{ animationDelay: "200ms" }}
            >
              <div className="relative aspect-[4/3] lg:aspect-[5/4] rounded-3xl overflow-hidden shadow-elegant border border-border bg-cream">
                <img
                  src={image}
                  alt={imageAlt ?? ""}
                  loading="eager"
                  className="h-full w-full object-cover"
                />
                {/* sanfte Eckmarke */}
                <div className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-background/90 backdrop-blur px-3 py-1.5 text-xs font-medium text-foreground shadow-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  KFZ-Meisterbetrieb · Beuerberg
                </div>
              </div>
              {/* Schwebendes Info-Kärtchen */}
              <div className="hidden md:flex absolute -bottom-6 -left-6 items-center gap-3 rounded-2xl bg-card border border-border p-4 shadow-warm max-w-[15rem]">
                <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-primary/10 text-primary shrink-0">
                  <ShieldCheck className="h-5 w-5" />
                </span>
                <div className="text-xs leading-snug">
                  <p className="font-semibold text-foreground">Familie Fischer</p>
                  <p className="text-muted-foreground">Seit {SITE.founded} im Voralpenland</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {showTrustStrip && (
          <div className="mt-10 md:mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            <TrustItem icon={MapPin} label="Bahnhofstr. 45 · Beuerberg" />
            <TrustItem icon={Phone} label={SITE.phone} href={`tel:${SITE.phoneIntl}`} />
            <TrustItem icon={ShieldCheck} label="KFZ-Meisterbetrieb" />
            <TrustItem icon={() => <span className="font-serif font-bold">★</span>} label={`Familienbetrieb seit ${SITE.founded}`} />
          </div>
        )}
      </div>
    </section>
  );
}

function TrustItem({
  icon: Icon,
  label,
  href,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  href?: string;
}) {
  const inner = (
    <div className="flex items-center gap-2.5 rounded-xl border border-border/70 bg-background/70 backdrop-blur-sm px-3.5 py-2.5 text-xs sm:text-sm text-foreground/80 hover:border-primary/40 transition-colors">
      <span className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-primary/10 text-primary shrink-0">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="truncate font-medium">{label}</span>
    </div>
  );
  return href ? (
    <a href={href} className="block">{inner}</a>
  ) : inner;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="text-xs uppercase tracking-[0.22em] text-primary font-medium">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 font-serif text-3xl sm:text-4xl md:text-5xl text-foreground text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base md:text-lg text-muted-foreground text-pretty">
          {subtitle}
        </p>
      )}
    </div>
  );
}
