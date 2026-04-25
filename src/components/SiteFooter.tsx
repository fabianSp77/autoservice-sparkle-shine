import { Link } from "@tanstack/react-router";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="container-tight py-16 grid gap-12 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary text-primary-foreground">
              <span className="font-serif font-bold text-lg">AB</span>
            </span>
            <div className="leading-tight">
              <div className="font-serif text-lg">Autoservice Beuerberg</div>
              <div className="text-xs uppercase tracking-[0.18em] text-background/60">
                Seit {SITE.founded}
              </div>
            </div>
          </div>
          <p className="mt-5 text-sm text-background/70 leading-relaxed">
            Ihr Familienbetrieb für Service, Reparatur und Reifen im Herzen
            des bayerischen Voralpenlands.
          </p>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-background/60 font-sans">
            Kontakt
          </h4>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-start gap-3">
              <MapPin className="h-4 w-4 mt-0.5 text-gold shrink-0" />
              <span>
                {SITE.street}
                <br />
                {SITE.zip} {SITE.city}
              </span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-gold shrink-0" />
              <a href={`tel:${SITE.phoneIntl}`} className="hover:text-gold transition-colors">
                {SITE.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-gold shrink-0" />
              <a href={`mailto:${SITE.email}`} className="hover:text-gold transition-colors">
                {SITE.email}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-background/60 font-sans">
            Öffnungszeiten
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            {SITE.hours.map((h) => (
              <li key={h.day} className="flex items-center justify-between gap-3 max-w-[14rem]">
                <span className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 text-gold/70" />
                  {h.day}
                </span>
                <span className="text-background/70">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-xs uppercase tracking-[0.18em] text-background/60 font-sans">
            Schnellzugriff
          </h4>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/leistungen" className="hover:text-gold transition-colors">Leistungen</Link></li>
            <li><Link to="/reifenservice" className="hover:text-gold transition-colors">Reifenservice</Link></li>
            <li><Link to="/ueber-uns" className="hover:text-gold transition-colors">Über uns</Link></li>
            <li><Link to="/bewertungen" className="hover:text-gold transition-colors">Bewertungen</Link></li>
            <li><Link to="/kontakt" className="hover:text-gold transition-colors">Termin buchen</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-background/10">
        <div className="container-tight py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-background/55">
          <p>© {new Date().getFullYear()} {SITE.legalName} · Alle Rechte vorbehalten</p>
          <p className="flex items-center gap-4">
            <span className="opacity-70">Impressum</span>
            <span className="opacity-70">Datenschutz</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
