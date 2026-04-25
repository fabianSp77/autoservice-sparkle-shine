import { useEffect, useState } from "react";

const STORAGE_KEY = "asb-embeds-consent";

export function getConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(STORAGE_KEY) === "granted";
}

export function useEmbedConsent() {
  const [consent, setConsent] = useState(false);
  useEffect(() => {
    setConsent(getConsent());
    const handler = () => setConsent(getConsent());
    window.addEventListener("asb-consent-change", handler);
    return () => window.removeEventListener("asb-consent-change", handler);
  }, []);
  return consent;
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) setVisible(true);
  }, []);

  if (!mounted || !visible) return null;

  const decide = (value: "granted" | "denied") => {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event("asb-consent-change"));
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-3 bottom-[88px] z-50 lg:bottom-4 sm:inset-x-auto sm:right-4 sm:max-w-md" style={{ marginBottom: "env(safe-area-inset-bottom)" }}>
      <div className="rounded-2xl bg-foreground text-background shadow-elegant border border-background/10 p-5">
        <p className="font-serif text-base">Cookies & Einbettungen</p>
        <p className="mt-2 text-sm text-background/75 leading-relaxed">
          Wir nutzen Google Maps und Facebook, um Ihnen unseren Standort und
          aktuelle Beiträge zu zeigen. Diese Dienste setzen Cookies und können
          Daten in den USA verarbeiten. Mit Ihrer Zustimmung werden die Inhalte
          geladen.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => decide("granted")}
            className="inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-hover transition-colors"
          >
            Inhalte zulassen
          </button>
          <button
            type="button"
            onClick={() => decide("denied")}
            className="inline-flex items-center justify-center rounded-full bg-background/10 border border-background/20 px-4 py-2 text-xs font-semibold text-background hover:bg-background/20 transition-colors"
          >
            Nur Notwendiges
          </button>
          <a
            href="/datenschutz"
            className="ml-auto self-center text-xs text-background/60 hover:text-gold underline-offset-4 hover:underline"
          >
            Datenschutz
          </a>
        </div>
      </div>
    </div>
  );
}
