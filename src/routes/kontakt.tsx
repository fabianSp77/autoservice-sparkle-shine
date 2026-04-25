import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import {
  CalendarIcon, Phone, Mail, MapPin, Clock, Loader2, Send, CheckCircle2,
  PhoneCall, Plus, X,
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

type Slot = { date?: Date; time: string };

const slotSchema = z.object({
  date: z.date().optional(),
  time: z.string().optional(),
});

const schema = z.object({
  name: z.string().trim().min(2, "Bitte Name angeben").max(100),
  phone: z.string().trim().min(5, "Bitte Telefonnummer angeben").max(40),
  email: z.string().trim().email("Gültige E-Mail-Adresse angeben").max(180),
  vehicle: z.string().trim().min(2, "Bitte Fahrzeug angeben").max(120),
  services: z.array(z.string()).min(1, "Bitte mindestens eine Leistung wählen").max(9),
  slots: z.array(slotSchema).min(1).max(3),
  message: z.string().trim().max(1500).optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Bitte Datenschutz bestätigen" }),
  }),
});

type FormState = {
  name: string; phone: string; email: string; vehicle: string;
  services: string[];
  slots: Slot[];
  message: string; consent: boolean;
};

const INITIAL: FormState = {
  name: "", phone: "", email: "", vehicle: "",
  services: [],
  slots: [{ date: undefined, time: "" }],
  message: "", consent: false,
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
          "Termin online buchen oder rund um die Uhr telefonisch: 08179 929244. Autoservice Beuerberg GmbH, Bahnhofstraße 45, 82547 Eurasburg-Beuerberg.",
      },
      { property: "og:title", content: "Kontakt & Termin online buchen — Autoservice Beuerberg" },
      {
        property: "og:description",
        content: "Termin direkt online buchen oder telefonisch — 24/7 erreichbar über unseren Telefonassistenten.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const search = Route.useSearch();
  const presetService =
    search.leistung === "reifenservice" ? ["Reifenwechsel / Reifenservice"] : [];

  const [form, setForm] = useState<FormState>({ ...INITIAL, services: presetService });
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

  const updateSlot = (i: number, patch: Partial<Slot>) => {
    setForm((p) => ({
      ...p,
      slots: p.slots.map((s, idx) => (idx === i ? { ...s, ...patch } : s)),
    }));
  };

  const addSlot = () => {
    if (form.slots.length >= 3) return;
    setForm((p) => ({ ...p, slots: [...p.slots, { date: undefined, time: "" }] }));
  };

  const removeSlot = (i: number) => {
    setForm((p) => ({
      ...p,
      slots: p.slots.length === 1 ? p.slots : p.slots.filter((_, idx) => idx !== i),
    }));
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
        body: JSON.stringify({
          ...parsed.data,
          slots: parsed.data.slots.map((s) => ({
            date: s.date ? s.date.toISOString() : null,
            time: s.time || null,
          })),
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
        title="Termin online — oder rund um die Uhr per Telefon."
        subtitle="Tragen Sie bis zu drei Wunschtermine ein und wählen Sie alle gewünschten Leistungen aus. Wir bestätigen innerhalb eines Werktages."
      />

      <section className="pb-20">
        <div className="container-tight grid lg:grid-cols-[1.3fr_1fr] gap-10 lg:gap-14">
          {/* FORM */}
          <div>
            {/* 24/7 Telefonassistent Hinweis */}
            <div className="mb-6 rounded-2xl border border-primary/20 bg-primary/5 p-5 sm:p-6 flex flex-col sm:flex-row items-start gap-4">
              <span className="inline-flex items-center justify-center h-11 w-11 rounded-xl bg-primary text-primary-foreground shrink-0 shadow-warm">
                <PhoneCall className="h-5 w-5" />
              </span>
              <div className="flex-1">
                <p className="font-serif text-lg text-foreground">
                  Lieber direkt anrufen? Wir sind <span className="text-primary">rund um die Uhr</span> erreichbar.
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Unser Telefonassistent nimmt Ihre Terminwünsche 24/7 entgegen — auch
                  abends, am Wochenende und an Feiertagen. Innerhalb der Öffnungszeiten
                  erreichen Sie persönlich unser Team.
                </p>
                <a
                  href={`tel:${SITE.phoneIntl}`}
                  className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-5 py-2.5 text-sm font-semibold hover:bg-primary-hover transition-colors shadow-warm"
                >
                  <Phone className="h-4 w-4" /> {SITE.phone}
                </a>
              </div>
            </div>

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
                </div>

                {/* Multi-Leistungen */}
                <fieldset className="mt-6">
                  <legend className="text-sm font-medium">
                    Gewünschte Leistungen * <span className="text-muted-foreground font-normal">(Mehrfachauswahl möglich)</span>
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

                {/* Multi-Wunschtermine */}
                <fieldset className="mt-6">
                  <legend className="text-sm font-medium">
                    Wunschtermine <span className="text-muted-foreground font-normal">(bis zu 3 Vorschläge möglich)</span>
                  </legend>
                  <div className="mt-3 space-y-3">
                    {form.slots.map((slot, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-border bg-background p-3 sm:p-4"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                            Wunsch {i + 1}
                          </span>
                          {form.slots.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeSlot(i)}
                              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-destructive transition-colors"
                              aria-label={`Wunschtermin ${i + 1} entfernen`}
                            >
                              <X className="h-3.5 w-3.5" /> entfernen
                            </button>
                          )}
                        </div>
                        <div className="grid sm:grid-cols-2 gap-3">
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                type="button"
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !slot.date && "text-muted-foreground",
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {slot.date
                                  ? format(slot.date, "PPP", { locale: de })
                                  : "Datum wählen"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={slot.date}
                                onSelect={(d) => updateSlot(i, { date: d })}
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
                          <Select
                            value={slot.time}
                            onValueChange={(v) => updateSlot(i, { time: v })}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Zeit wählen" />
                            </SelectTrigger>
                            <SelectContent>
                              {TIME_OPTIONS.map((t) => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    ))}
                  </div>
                  {form.slots.length < 3 && (
                    <button
                      type="button"
                      onClick={addSlot}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all"
                    >
                      <Plus className="h-4 w-4" /> Weiteren Wunschtermin hinzufügen
                    </button>
                  )}
                </fieldset>

                <div className="mt-6">
                  <Field label="Nachricht (optional)" error={errors.message} id="message">
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
                  — unser Telefonassistent ist <strong className="text-foreground/80">24/7</strong> für Sie da.
                </p>
              </form>
            )}
          </div>

          {/* SIDEBAR */}
          <aside className="space-y-4">
            <ContactCard icon={PhoneCall} title="Telefon — 24/7" body={
              <>
                <a href={`tel:${SITE.phoneIntl}`} className="text-primary hover:underline font-medium">{SITE.phone}</a>
                <p className="text-xs text-muted-foreground mt-1">
                  Telefonassistent rund um die Uhr · Persönlich Mo–Fr 8–17 Uhr
                </p>
              </>
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
