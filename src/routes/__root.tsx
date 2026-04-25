import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen flex items-center justify-center bg-background px-4 pt-24">
        <div className="max-w-md text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-primary font-medium">404</p>
          <h1 className="mt-3 font-serif text-4xl text-foreground">Seite nicht gefunden</h1>
          <p className="mt-3 text-muted-foreground">
            Die gesuchte Seite existiert nicht oder wurde verschoben.
          </p>
          <div className="mt-6">
            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary-hover transition-colors"
            >
              Zur Startseite
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Autoservice Beuerberg GmbH — Ihre Werkstatt im Voralpenland" },
      {
        name: "description",
        content:
          "Autoservice Beuerberg GmbH — Ihr Familienbetrieb für Inspektion, HU/AU, Reparaturen, Reifenservice und Klimaservice in Eurasburg-Beuerberg seit 2009.",
      },
      { name: "author", content: "Autoservice Beuerberg GmbH" },
      { name: "theme-color", content: "#1E5AA8" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "de_DE" },
      { property: "og:site_name", content: "Autoservice Beuerberg" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <SiteHeader />
      <main className="min-h-screen">
        <Outlet />
      </main>
      <SiteFooter />
      <Toaster richColors position="top-center" />
    </>
  );
}
