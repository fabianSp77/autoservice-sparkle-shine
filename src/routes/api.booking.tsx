import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const bodySchema = z.object({
  // Honeypot — muss leer sein. Bots füllen meist alles aus.
  website: z.string().max(0).optional().or(z.literal("")),
  requestType: z.enum(["general", "services"]).optional(),
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  email: z.string().trim().email().max(180),
  vehicle: z.string().trim().max(120).optional().or(z.literal("")),
  services: z.array(z.string().max(80)).max(9).optional(),
  service: z.string().trim().max(80).optional(),
  date: z.string().nullable().optional(),
  time: z.string().max(40).optional(),
  message: z.string().trim().min(5).max(1500),
  consent: z.literal(true),
});

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 Minuten
const RATE_LIMIT_MAX = 5;

function getClientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const cf = request.headers.get("cf-connecting-ip");
  if (cf) return cf;
  const real = request.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

async function checkRateLimit(ip: string): Promise<boolean> {
  const since = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();
  const { count } = await supabaseAdmin
    .from("rate_limits")
    .select("id", { count: "exact", head: true })
    .eq("bucket", "booking")
    .eq("key", ip)
    .gte("created_at", since);
  if ((count ?? 0) >= RATE_LIMIT_MAX) return false;
  await supabaseAdmin
    .from("rate_limits")
    .insert({ bucket: "booking", key: ip });
  return true;
}

export const Route = createFileRoute("/api/booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let json: unknown;
        try {
          json = await request.json();
        } catch {
          return new Response(
            JSON.stringify({ error: "Invalid JSON" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }
        const parsed = bodySchema.safeParse(json);
        if (!parsed.success) {
          return new Response(
            JSON.stringify({ error: "Invalid input" }),
            { status: 400, headers: { "Content-Type": "application/json" } },
          );
        }
        const d = parsed.data;
        // Honeypot getriggert? Erfolg vortäuschen, nichts speichern.
        if (d.website && d.website.length > 0) {
          return new Response(
            JSON.stringify({ ok: true }),
            { status: 200, headers: { "Content-Type": "application/json" } },
          );
        }

        const ip = getClientIp(request);
        const allowed = await checkRateLimit(ip);
        if (!allowed) {
          return new Response(
            JSON.stringify({ error: "Zu viele Anfragen. Bitte später erneut versuchen oder telefonisch melden." }),
            { status: 429, headers: { "Content-Type": "application/json" } },
          );
        }

        const serviceText = d.services && d.services.length > 0
          ? d.services.join(", ")
          : d.service || (d.requestType === "general" ? "Allgemeine Anfrage" : null);

        const { error } = await supabaseAdmin
          .from("booking_requests")
          .insert({
            name: d.name,
            phone: d.phone || null,
            email: d.email,
            vehicle: d.vehicle || null,
            service: serviceText,
            requested_date: d.date ? d.date.slice(0, 10) : null,
            requested_time: d.time || null,
            message: d.message || null,
          });
        if (error) {
          console.error("booking insert failed", error);
          return new Response(
            JSON.stringify({ error: "Storage failed" }),
            { status: 500, headers: { "Content-Type": "application/json" } },
          );
        }
        return new Response(
          JSON.stringify({ ok: true }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      },
    },
  },
});
