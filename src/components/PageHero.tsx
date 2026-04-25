import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  className,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative pt-32 md:pt-40 pb-16 md:pb-24 overflow-hidden bg-cream",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-raute opacity-40 pointer-events-none"
        aria-hidden
      />
      <div
        className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-primary/10 blur-3xl pointer-events-none"
        aria-hidden
      />
      <div className="container-tight relative">
        {eyebrow && (
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-medium fade-in-up">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-3 font-serif text-4xl sm:text-5xl md:text-6xl text-foreground text-balance fade-in-up max-w-3xl">
          {title}
        </h1>
        {subtitle && (
          <p
            className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty fade-in-up"
            style={{ animationDelay: "80ms" }}
          >
            {subtitle}
          </p>
        )}
        {children && (
          <div className="mt-8 fade-in-up" style={{ animationDelay: "160ms" }}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
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
