import { createServerFn } from "@tanstack/react-start";

export type GoogleReview = {
  author_name: string;
  rating: number;
  relative_time_description: string;
  text: string;
  profile_photo_url?: string;
  time: number;
};

export type ReviewsResult = {
  ok: boolean;
  rating?: number;
  total?: number;
  reviews: GoogleReview[];
  source: "google" | "fallback";
  error?: string;
};

// In-Memory Cache (Worker-Instanz, 24h TTL) — schont Places API Quota
type CacheEntry = { value: ReviewsResult; expiresAt: number };
const CACHE = new Map<string, CacheEntry>();
const TTL_MS = 24 * 60 * 60 * 1000;

const PLACE_ID = "ChIJZahmrqe4nUcR54emC0uv9SQ";

export const getGoogleReviews = createServerFn({ method: "GET" }).handler(
  async (): Promise<ReviewsResult> => {
    const cached = CACHE.get(PLACE_ID);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.value;
    }

    const apiKey = process.env.GOOGLE_MAPS_API_KEY;
    if (!apiKey) {
      const fallback: ReviewsResult = {
        ok: false,
        reviews: [],
        source: "fallback",
        error: "GOOGLE_MAPS_API_KEY is not configured",
      };
      return fallback;
    }

    try {
      const url = new URL(
        "https://maps.googleapis.com/maps/api/place/details/json",
      );
      url.searchParams.set("place_id", PLACE_ID);
      url.searchParams.set("fields", "rating,user_ratings_total,reviews");
      url.searchParams.set("language", "de");
      url.searchParams.set("reviews_sort", "newest");
      url.searchParams.set("key", apiKey);

      const res = await fetch(url.toString());
      if (!res.ok) {
        return {
          ok: false,
          reviews: [],
          source: "fallback",
          error: `Places API HTTP ${res.status}`,
        };
      }
      const data = (await res.json()) as {
        status: string;
        error_message?: string;
        result?: {
          rating?: number;
          user_ratings_total?: number;
          reviews?: GoogleReview[];
        };
      };

      if (data.status !== "OK" || !data.result) {
        return {
          ok: false,
          reviews: [],
          source: "fallback",
          error: data.error_message || data.status || "Unknown Places API error",
        };
      }

      const value: ReviewsResult = {
        ok: true,
        rating: data.result.rating,
        total: data.result.user_ratings_total,
        reviews: (data.result.reviews ?? []).slice(0, 6),
        source: "google",
      };
      CACHE.set(PLACE_ID, { value, expiresAt: Date.now() + TTL_MS });
      return value;
    } catch (error) {
      console.error("Google reviews fetch failed:", error);
      return {
        ok: false,
        reviews: [],
        source: "fallback",
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
);
