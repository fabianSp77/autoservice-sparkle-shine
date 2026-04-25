import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import {
  Phone, Mail, MapPin, Clock, Loader2, Send, CheckCircle2,
  PhoneCall, Headphones, Users,
} from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { MapEmbed } from "@/components/MapEmbed";

const REQUEST_TYPES = [
  {
    id: "general",
    label: "Allgemeine Anfrage",
    desc: "Frage zum Service, Beratung oder Information",
  },
  {
    id: "services",
    label: "Anfrage zu Leistungen",
    desc: "Konkrete Leistungen anfragen oder Kostenvoranschlag",
  },
] as const;

type RequestType = (typeof REQUEST_TYPES)[number]["id"];

const SERVICE_OPTIONS = [
  "Inspektion / Wartung",
  "HU & AU",
  "Reparatur",
  "Klimaservice",
  "Reifenwechsel / Reifenservice",
  "Bremsen / Auspuff",
  "Batterie / Elektrik",
  "Fahrzeugaufbereitung",
  "Sonstiges",
] as const;

const schema = z
  .object({
    requestType: z.enum(["general", "services"]),
    name: z.string().trim().min(2, "Bitte Name angeben").max(100),
    phone: z.string().trim().max(40).optional().or(z.literal("")),
    email: z.string().trim().email("Gültige E-Mail-Adresse angeben").max(180),
    vehicle: z.string().trim().max(120).optional().or(z.literal("")),
    services: z.array(z.string()).max(9),
    message: z.string().trim().min(5, "Bitte beschreiben Sie kurz Ihr Anliegen").max(1500),
    consent: z.literal(true, {
      errorMap: () => ({ message: "Bitte Datenschutz bestätigen" }),
    }),
  })
  .refine(
    (d) => d.requestType !== "services" || d.services.length > 0,
    { path: ["services"], message: "Bitte mindestens eine Leistung wählen" },
  );

type FormState = {
  requestType: RequestType;
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  services: string[];
  message: string;
  consent: boolean;
  website: string; // Honeypot — muss leer bleiben
};

const INITIAL: FormState = {
  requestType: "general",
  name: "", phone: "", email: "", vehicle: "",
  services: [],
  message: "", consent: false,
  website: "",
};

export const Route = createFileRoute("/kontakt")({
  validateSearch: (s: Record<string, unknown>) => ({
    leistung: typeof s.leistung === "string" ? s.leistung : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Kontakt — Autoservice Beuerberg | 24/7 telefonisch erreichbar" },
      {
        name: "description",
        content:
          "Telefonisch rund um die Uhr erreichbar: 08179 929244. Persönlich Mo–Fr 8–17 Uhr, außerhalb über unseren Telefonassistenten. Oder schreiben Sie uns eine Nachricht.",
      },
      { property: "og:title", content: "Kontakt — Autoservice Beuerberg" },
      {
        property: "og:description",
        content: "Telefonisch rund um die Uhr — persönlich oder über unseren Telefonassistenten.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const search = Route.useSearch();
  const presetService =
    search.leistung === "reifenservice" ? ["Reifenwechsel / Reifenservice"] : [];
  const presetType: RequestType = presetService.length > 0 ? "services" : "general";

  const [form, setForm] = useState<FormState>({
    ...INITIAL,
    requestType: presetType,
    services: presetService,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const toggleService = (s: string) => {
    setForm((p) => ({
      ...p,
      services: p.services.includes(s)
        ? p.services.filter((x) => x !== s)
        : [...p.services, s],
    }));
    setErrors((p) => ({ ...p, services: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      toast.error("Bitte prüfen Sie Ihre Eingaben.");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error("Anfrage fehlgeschlagen");
      setSubmitted(true);
      toast.success("Nachricht gesendet — wir melden uns!");
      setForm({ ...INITIAL });
    } catch {
      toast.error("Es ist etwas schiefgelaufen. Bitte rufen Sie uns kurz an.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title="Am schnellsten erreichen Sie uns telefonisch."
        subtitle="Persönlich Mo–Fr von 8 bis 17 Uhr — außerhalb der Öffnungszeiten nimmt unser Telefonassistent rund um die Uhr Ihre Anliegen entgegen."
        breadcrumbs={[{ label: "Kontakt" }]}
        showTrustStrip={false}
      />

      {/* PHONE-FIRST CTA */}
      <section className="py-10 md:py-12 bg-cream/40 border-b border-border">
        <div className="container-tight">
          <div className="rounded-3xl bg-card border border-border shadow-warm p-6 md:p-10 grid md:grid-cols-[1fr_auto] gap-6 md:gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-3">
                <Headphones className="h-3.5 w-3.5" />
                Empfohlen — am schnellsten
              </div>
              <h2 className="font-serif text-2xl md:text-3xl">
                Lieber telefonisch?
              </h2>
              <p className="mt-2 text-muted-foreground max-w-xl">
                Rufen Sie uns einfach an — innerhalb der Öffnungszeiten meldet sich
                persönlich unser Team. Außerhalb (abends, am Wochenende, an Feiertagen)
                nimmt unser <strong className="text-foreground">Telefonassistent rund um die Uhr</strong> Ihre
                Terminwünsche und Anliegen entgegen.
              </p>
              <ul className="mt-4 grid sm:grid-cols-2 gap-2 text-sm">
                <li className="flex items-center gap-2 text-foreground/80">
                  <Users className="h-4 w-4 text-primary shrink-0" />
                  Mo–Fr 8–17 Uhr persönlich
                </li>
                <li className="flex items-center gap-2 text-foreground/80">
                  <Headphones className="h-4 w-4 text-primary shrink-0" />
                  24/7 Telefonassistent
                </li>
              </ul>
            </div>
            <a
              href={`tel:${SITE.phoneIntl}`}
              className="inline-flex flex-col items-center justify-center gap-1 rounded-2xl bg-primary text-primary-foreground px-8 py-6 hover:bg-primary-hover transition-colors shadow-warm w-full md:w-auto"
            >
              <Phone className="h-6 w-6" />
              <span className="font-serif text-2xl md:text-3xl tracking-tight">
                {SITE.phone}
              </span>
              <span className="text-xs uppercase tracking-wider opacity-90">
                Jetzt anrufen
              </span>
            </a>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20">
        <div className="container-tight grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14">
          {/* FORM */}
          <div>
            {submitted ? (
              <div className="rounded-3xl bg-card border border-border p-10 text-center shadow-warm">
                <span className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-7 w-7" />
                </span>
                <h2 className="mt-5 font-serif text-2xl">Vielen Dank!</h2>
                <p className="mt-3 text-muted-foreground max-w-md mx-auto">
                  Ihre Nachricht ist bei uns eingegangen. Wir melden uns
                  innerhalb eines Werktages.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Neue Nachricht schreiben
                </Button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="relative rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-soft"
              >
                <h2 className="font-serif text-2xl">Schreiben Sie uns</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Für konkrete Termine empfehlen wir den Anruf — schriftliche
                  Anfragen beantworten wir innerhalb eines Werktages.
                </p>

                {/* Anfragetyp */}
                <fieldset className="mt-6">
                  <legend className="text-sm font-medium">
                    Worum geht es? *
                  </legend>
                  <div className="mt-3 grid sm:grid-cols-2 gap-3">
                    {REQUEST_TYPES.map((t) => {
                      const checked = form.requestType === t.id;
                      return (
                        <label
                          key={t.id}
                          className={cn(
                            "flex flex-col gap-1 rounded-xl border px-4 py-3 cursor-pointer transition-colors text-sm",
                            checked
                              ? "border-primary bg-primary/5"
                              : "border-border bg-background hover:border-primary/40",
                          )}
                        >
                          <div className="flex items-center gap-2.5">
                            <input
                              type="radio"
                              name="requestType"
                              checked={checked}
                              onChange={() => set("requestType", t.id)}
                              className="h-4 w-4 border-border accent-primary"
                            />
                            <span className="font-semibold">{t.label}</span>
                          </div>
                          <span className="text-xs text-muted-foreground pl-6.5">
                            {t.desc}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </fieldset>

                {/* Persönliche Daten */}
                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <Field label="Name *" error={errors.name} id="name">
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Max Mustermann"
                      autoComplete="name"
                      enterKeyHint="next"
                      className="h-12 text-base"
                    />
                  </Field>
                  <Field label="Telefon (optional)" error={errors.phone} id="phone">
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="0151 12345678"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      enterKeyHint="next"
                      className="h-12 text-base"
                    />
                  </Field>
                  <Field label="E-Mail *" error={errors.email} id="email" className="sm:col-span-2">
                    <Input
                      id="email"
                      value={form.email}
                      onChange={(e) => set("email", e.target.value)}
                      placeholder="ihre@email.de"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      enterKeyHint="next"
                      className="h-12 text-base"
                    />
                  </Field>
                  <Field
                    label={form.requestType === "services" ? "Fahrzeug (Marke, Modell, Bj.)" : "Fahrzeug (optional)"}
                    error={errors.vehicle}
                    id="vehicle"
                    className="sm:col-span-2"
                  >
                    <Input
                      id="vehicle"
                      value={form.vehicle}
                      onChange={(e) => set("vehicle", e.target.value)}
                      placeholder="z. B. VW Golf VII, 2018"
                      autoComplete="off"
                      enterKeyHint="next"
                      className="h-12 text-base"
                    />
                  </Field>
                </div>

                {/* Honeypot — visuell verborgen, von Bots aber befüllt */}
                <div aria-hidden="true" className="absolute left-[-9999px] w-px h-px overflow-hidden">
                  <label htmlFor="website-hp">Website (bitte freilassen)</label>
                  <input
                    id="website-hp"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(e) => set("website", e.target.value)}
                  />
                </div>

                {/* Leistungen — nur bei "services" */}
                {form.requestType === "services" && (
                  <fieldset className="mt-6">
                    <legend className="text-sm font-medium">
                      Gewünschte Leistungen *{" "}
                      <span className="text-muted-foreground font-normal">
                        (Mehrfachauswahl möglich)
                      </span>
                    </legend>
                    <div className="mt-3 grid sm:grid-cols-2 gap-2">
                      {SERVICE_OPTIONS.map((s) => {
                        const checked = form.services.includes(s);
                        return (
                          <label
                            key={s}
                            className={cn(
                              "flex items-center gap-3 rounded-xl border px-4 py-3 cursor-pointer transition-colors text-sm",
                              checked
                                ? "border-primary bg-primary/5 text-foreground"
                                : "border-border bg-background hover:border-primary/40",
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleService(s)}
                              className="h-4 w-4 rounded border-border accent-primary"
                            />
                            <span className="font-medium">{s}</span>
                          </label>
                        );
                      })}
                    </div>
                    {errors.services && (
                      <p className="mt-2 text-xs text-destructive">{errors.services}</p>
                    )}
                  </fieldset>
                )}

                {/* Nachricht */}
                <div className="mt-6">
                  <Field label="Ihre Nachricht *" error={errors.message} id="message">
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder={
                        form.requestType === "services"
                          ? "Beschreiben Sie kurz, was an Ihrem Fahrzeug gemacht werden soll…"
                          : "Worum geht es? Stellen Sie hier gerne Ihre Frage…"
                      }
                      rows={5}
                      maxLength={1500}
                    />
                  </Field>
                </div>

                <label className="mt-6 flex items-start gap-3 text-sm">
                  <input
                    type="checkbox"
                    checked={form.consent}
                    onChange={(e) => set("consent", e.target.checked)}
                    className="mt-1 h-4 w-4 rounded border-border accent-primary"
                  />
                  <span className="text-muted-foreground">
                    Ich bin damit einverstanden, dass meine Angaben zur
                    Bearbeitung der Anfrage verwendet werden. *
                  </span>
                </label>
                {errors.consent && (
                  <p className="mt-1 text-xs text-destructive">{errors.consent}</p>
                )}

                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting}
                  className="mt-6 w-full sm:w-auto rounded-full px-8"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Senden…
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Nachricht senden
                    </>
                  )}
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Wir antworten innerhalb eines Werktages. Für konkrete
                  Termine ist ein kurzer Anruf am schnellsten.
                </p>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4">
            <ContactCard icon={PhoneCall} title="Telefonisch erreichbar" body={
              <p className="text-xs text-muted-foreground leading-relaxed">
                <span className="text-foreground font-medium">Mo–Fr 8–17 Uhr</span>{" "}
                persönlich · außerhalb übernimmt unser Telefonassistent
                rund um die Uhr.
              </p>
            } />
            <ContactCard icon={Mail} title="E-Mail" body={
              <a href={`mailto:${SITE.email}`} className="text-primary hover:underline break-all">{SITE.email}</a>
            } />
            <ContactCard icon={MapPin} title="Adresse" body={
              <span>{SITE.street}<br />{SITE.zip} {SITE.city}</span>
            } />
            <ContactCard icon={Clock} title="Öffnungszeiten" body={
              <ul className="space-y-0.5">
                {SITE.hours.map((h) => (
                  <li key={h.day} className="flex justify-between gap-3">
                    <span>{h.day}</span><span className="text-muted-foreground">{h.time}</span>
                  </li>
                ))}
              </ul>
            } />
            <MapEmbed className="aspect-[4/3]" />
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({
  label, error, id, children, className,
}: {
  label: string; error?: string; id: string; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <Label htmlFor={id} className="text-sm font-medium">{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

function ContactCard({
  icon: Icon, title, body,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-card border border-border p-5 flex items-start gap-4">
      <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-primary/10 text-primary shrink-0">
        <Icon className="h-5 w-5" />
      </span>
      <div className="text-sm flex-1">
        <p className="font-medium">{title}</p>
        <div className="mt-1 text-foreground/80">{body}</div>
      </div>
    </div>
  );
}
