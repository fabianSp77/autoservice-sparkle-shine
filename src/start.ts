// Global Start configuration — Security headers via request middleware.
import { createStart, createMiddleware } from "@tanstack/react-start";

const securityHeaders = createMiddleware().server(async ({ next }) => {
  const result = await next();
  const response: Response | undefined = (result as { response?: Response }).response;
  if (response && response.headers) {
    // Sicherheits-Header — sinnvolle Defaults für eine statisch ausgelieferte Marketing-Site
    // mit Google Maps-Embed, Google Fonts und einigen Bildern.
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "SAMEORIGIN");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    response.headers.set(
      "Permissions-Policy",
      "geolocation=(), microphone=(), camera=(), payment=()",
    );
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains",
    );
    // CSP — bewusst pragmatisch (erlaubt Google Maps iframe, Google Fonts, Inline-Scripts
    // für TanStack-Start-Hydration). 'unsafe-inline' für Style ist nötig, weil Tailwind
    // teilweise Inline-Styles erzeugt; 'unsafe-inline' für Script weil TSR Scripts inline einbettet.
    response.headers.set(
      "Content-Security-Policy",
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data: blob: https:",
        "frame-src https://www.google.com https://www.google.de https://maps.google.com",
        "connect-src 'self' https://*.supabase.co wss://*.supabase.co",
        "object-src 'none'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'self'",
      ].join("; "),
    );
  }
  return result;
});

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeaders],
}));
