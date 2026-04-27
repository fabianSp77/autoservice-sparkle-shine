import { createServerFn } from "@tanstack/react-start";
import { REVIEWS_SUMMARY } from "./reviews";

const PLACE_ID = "ChIJZagmrqe4nUcR55imC0uv9SQ";
const CACHE_TTL_MS = 6 * 60 * 60 * 1000; // 6 Stunden

type Summary = { rating: number; count: number; source: "google" | "fallback" };

// In-Memory-Cache pro Server-Instanz
let cached: { value: Summary; fetchedAt: number } | null = null;

export const getGoogleReviewsSummary = createServerFn({ method: "GET" }).handler(
  async (): Promise<Summary> => {
    const now = Date.now();
    if (cached && now - cached.fetchedAt < CACHE_TTL_MS) {
      return cached.value;
    }

    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    const fallback: Summary = {
      rating: REVIEWS_SUMMARY.rating,
      count: REVIEWS_SUMMARY.count,
      source: "fallback",
    };

    if (!apiKey) {
      console.warn("[reviews] GOOGLE_PLACES_API_KEY not set, using fallback");
      return fallback;
    }

    try {
      // Places API (New) — empfohlener Endpoint
      const url = `https://places.googleapis.com/v1/places/${PLACE_ID}`;
      const res = await fetch(url, {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount",
        },
      });

      if (!res.ok) {
        console.error(`[reviews] Google Places API error ${res.status}: ${await res.text()}`);
        return fallback;
      }

      const data = (await res.json()) as { rating?: number; userRatingCount?: number };
      const value: Summary = {
        rating: typeof data.rating === "number" ? data.rating : fallback.rating,
        count: typeof data.userRatingCount === "number" ? data.userRatingCount : fallback.count,
        source: "google",
      };
      cached = { value, fetchedAt: now };
      return value;
    } catch (err) {
      console.error("[reviews] Google Places fetch failed:", err);
      return fallback;
    }
  },
);
