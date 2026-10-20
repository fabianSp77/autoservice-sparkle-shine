import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Eigener Betrieb statt Lovable (Umzug auf Netlify, 20.10.2026)
//
// Ohne explizite `nitro`-Option überspringt der Lovable-Wrapper Nitro außerhalb seiner Sandbox
// und es entsteht nur der rohe Server-Bundle, den kein Hoster bedienen kann. Mit `nitro` baut
// Nitro den passenden Ausgabebaum; die Ordner werden hier auf die von Netlify erwartete
// Struktur gesetzt:
//   .netlify/functions-internal/  -> SSR-Funktion (findet Netlify automatisch)
//   dist/                         -> statische Dateien (publish-Ordner), inkl. _headers/_redirects
export default defineConfig({
  nitro: {
    preset: process.env.NITRO_PRESET || "netlify",
    output: {
      dir: ".netlify/functions-internal",
      serverDir: ".netlify/functions-internal/server",
      publicDir: "dist",
    },
  },
});
