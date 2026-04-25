import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const bodySchema = z.object({
  name: z.string().trim().min(2).max(100),
  phone: z.string().trim().min(5).max(40),
  email: z.string().trim().email().max(180),
  vehicle: z.string().trim().min(2).max(120),
  service: z.string().trim().min(1).max(80),
  date: z.string().nullable().optional(),
  time: z.string().max(40).optional(),
  message: z.string().max(1500).optional(),
  consent: z.literal(true),
});

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
        const { error } = await supabaseAdmin
          .from("booking_requests")
          .insert({
            name: d.name,
            phone: d.phone,
            email: d.email,
            vehicle: d.vehicle,
            service: d.service,
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
