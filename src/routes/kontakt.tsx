import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  CalendarIcon, Phone, Mail, MapPin, Clock, Loader2, Send, CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import { PageHero } from "@/components/PageHero";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectTrigger, SelectValue, SelectContent, SelectItem,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { MapEmbed } from "@/components/MapEmbed";

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

const TIME_OPTIONS = [
  "08:00 – 10:00",
  "10:00 – 12:00",
  "12:00 – 14:00",
  "14:00 – 17:00",
  "Egal — bitte vorschlagen",
] as const;

const schema = z.object({
  name: z.string().trim().min(2, "Bitte Name angeben").max(100),
  phone: z.string().trim().min(5, "Bitte Telefonnummer angeben").max(40),
  email: z.string().trim().email("Gültige E-Mail-Adresse angeben").max(180),
  vehicle: z.string().trim().min(2, "Bitte Fahrzeug angeben").max(120),
  service: z.string().min(1, "Bitte Leistung wählen"),
  date: z.date().optional(),
  time: z.string().optional(),
  message: z.string().trim().max(1500).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Bitte Datenschutz bestätigen" }),
  }),
});

type FormState = {
  name: string; phone: string; email: string; vehicle: string;
  service: string; date?: Date; time: string; message: string; consent: boolean;
};

const INITIAL: FormState = {
  name: "", phone: "", email: "", vehicle: "",
  service: "", date: undefined, time: "", message: "", consent: false,
};

export const Route = createFileRoute("/kontakt")({
  validateSearch: (s: Record<string, unknown>) => ({
    leistung: typeof s.leistung === "string" ? s.leistung : undefined,
  }),
  head: () => ({
    meta: [
      { title: "Kontakt & Termin online buchen — Autoservice Beuerberg" },
      {
        name: "description",
        content:
          "Termin online buchen oder direkt anrufen: 08179 929244. Autoservice Beuerberg GmbH, Bahnhofstraße 45, 82547 Eurasburg-Beuerberg.",
      },
      { property: "og:title", content: "Kontakt & Termin online buchen — Autoservice Beuerberg" },
      {
        property: "og:description",
        content: "Termin direkt online buchen — wir bestätigen innerhalb eines Werktages.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const search = Route.useSearch();
  const presetService =
    search.leistung === "reifenservice" ? "Reifenwechsel / Reifenservice" : "";

  const [form, setForm] = useState<FormState>({ ...INITIAL, service: presetService });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        fieldErrors[issue.path.join(".")] = issue.message;
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
        body: JSON.stringify({
          ...parsed.data,
          date: parsed.data.date ? parsed.data.date.toISOString() : null,
        }),
      });
      if (!res.ok) throw new Error("Anfrage fehlgeschlagen");
      setSubmitted(true);
      toast.success("Anfrage gesendet — wir melden uns!");
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
        eyebrow="Kontakt & Termin"
        title="Termin online — wir bestätigen innerhalb eines Werktages."
        subtitle="Tragen Sie Ihren Wunschtermin ein, oder rufen Sie uns einfach an. Wir freuen uns auf Sie."
      />

      <section className="pb-20">
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
                  Ihre Anfrage ist bei uns eingegangen. Wir melden uns
                  innerhalb eines Werktages zur Terminbestätigung.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => setSubmitted(false)}
                >
                  Neue Anfrage stellen
                </Button>
              </div>
            ) : (
              <form
                onSubmit={onSubmit}
                noValidate
                className="rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-soft"
              >
                <h2 className="font-serif text-2xl">Termin anfragen</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Pflichtfelder sind mit * markiert.
                </p>

                <div className="mt-6 grid sm:grid-cols-2 gap-4">
                  <Field label="Name *" error={errors.name} id="name">
                    <Input
                      id="name"
                      value={form.name}
                      onChange={(e) => set("name", e.target.value)}
                      placeholder="Max Mustermann"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Telefon *" error={errors.phone} id="phone">
                    <Input
                      id="phone"
                      value={form.phone}
                      onChange={(e) => set("phone", e.target.value)}
                      placeholder="0151 12345678"
                      type="tel"
                      autoComplete="tel"
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
                    />
                  </Field>
                  <Field label="Fahrzeug (Marke, Modell, Bj.) *" error={errors.vehicle} id="vehicle" className="sm:col-span-2">
                    <Input
                      id="vehicle"
                      value={form.vehicle}
                      onChange={(e) => set("vehicle", e.target.value)}
                      placeholder="z. B. VW Golf VII, 2018"
                    />
                  </Field>
                  <Field label="Gewünschte Leistung *" error={errors.service} id="service" className="sm:col-span-2">
                    <Select value={form.service} onValueChange={(v) => set("service", v)}>
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Leistung wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {SERVICE_OPTIONS.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Wunschdatum" id="date">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.date && "text-muted-foreground",
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.date
                            ? format(form.date, "PPP", { locale: de })
                            : "Datum wählen"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={form.date}
                          onSelect={(d) => set("date", d)}
                          locale={de}
                          weekStartsOn={1}
                          disabled={(d) => {
                            const today = new Date();
                            today.setHours(0, 0, 0, 0);
                            return d < today || d.getDay() === 0;
                          }}
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </Field>

                  <Field label="Wunschzeit" id="time">
                    <Select value={form.time} onValueChange={(v) => set("time", v)}>
                      <SelectTrigger id="time">
                        <SelectValue placeholder="Zeit wählen" />
                      </SelectTrigger>
                      <SelectContent>
                        {TIME_OPTIONS.map((t) => (
                          <SelectItem key={t} value={t}>{t}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>

                  <Field label="Nachricht (optional)" error={errors.message} id="message" className="sm:col-span-2">
                    <Textarea
                      id="message"
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      placeholder="Beschreiben Sie kurz Ihr Anliegen…"
                      rows={4}
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
                      Anfrage senden
                    </>
                  )}
                </Button>
                <p className="mt-3 text-xs text-muted-foreground">
                  Lieber telefonisch?{" "}
                  <a href={`tel:${SITE.phoneIntl}`} className="text-primary font-medium hover:underline">
                    {SITE.phone}
                  </a>{" "}
                  — wir sind Mo–Fr von 8 bis 17 Uhr für Sie da.
                </p>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4">
            <ContactCard icon={Phone} title="Telefon" body={
              <a href={`tel:${SITE.phoneIntl}`} className="text-primary hover:underline">{SITE.phone}</a>
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
            <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-soft">
              <iframe
                src={SITE.mapsEmbed}
                title="Standort auf Google Maps"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            </div>
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
