import { z } from "zod";
import type {
  PaijoCategory,
  PaijoFeedItem,
  PaijoHomePayload,
  PaijoStory,
} from "@/lib/paijo/types";

// --- 1. Zod Schemas for API Validation ---
const WpRenderedSchema = z.object({
  rendered: z.string().default(""),
}).catch({ rendered: "" });

const WpTermSchema = z.object({
  id: z.number().optional(),
  slug: z.string().default(""),
  name: z.string().default(""),
  link: z.string().optional(),
}).passthrough();

const WpFeaturedMediaSchema = z.object({
  source_url: z.string().optional(),
}).passthrough();

const WpEmbeddedSchema = z.object({
  "wp:featuredmedia": z.array(WpFeaturedMediaSchema).optional(),
  "wp:term": z.array(z.array(WpTermSchema)).optional(),
}).passthrough();

export const WpPostLikeSchema = z.object({
  id: z.number().optional(),
  slug: z.string().default(""),
  date: z.string().default(""),
  link: z.string().optional(),
  title: WpRenderedSchema.optional(),
  excerpt: WpRenderedSchema.optional(),
  _embedded: WpEmbeddedSchema.optional(),
  meta: z.record(z.string(), z.unknown()).optional(),
}).passthrough();

export type WpPostLike = z.infer<typeof WpPostLikeSchema>;

// --- 2. Configuration ---
const baseUrl = process.env.WORDPRESS_API_URL?.replace(/\/$/, "") ?? "";
const apiRoot = baseUrl ? `${baseUrl}/wp-json/wp/v2` : "";
const WORDS_PER_MINUTE = 200; // Kecepatan rata-rata membaca

// --- 3. Utilities ---
function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function readingTime(excerpt: string): string {
  const words = stripHtml(excerpt).split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.ceil(words / WORDS_PER_MINUTE))} min read`;
}

function mediaUrl(item: WpPostLike, fallback: string): string {
  const media = item._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  return media ?? fallback;
}

function categoryLabel(item: WpPostLike, fallback: { label: string; slug: string }) {
  const terms = item._embedded?.["wp:term"]?.flat() ?? [];
  const term = terms.find((entry) => Boolean(entry.slug));

  return {
    label: term?.name ?? fallback.label,
    slug: term?.slug ?? fallback.slug,
  };
}

// --- 4. Data Normalizers ---
function normalizePost(
  item: WpPostLike,
  fallback: PaijoStory,
  kind: PaijoStory["kind"] = "post"
): PaijoStory {
  const category = categoryLabel(item, {
    label: fallback.category,
    slug: fallback.categorySlug,
  });

  return {
    slug: item.slug || fallback.slug,
    title: stripHtml(item.title?.rendered || fallback.title),
    excerpt: stripHtml(item.excerpt?.rendered || fallback.excerpt),
    category: category.label,
    categorySlug: category.slug,
    date: item.date || fallback.date,
    readingTime: readingTime(item.excerpt?.rendered || fallback.excerpt),
    image: mediaUrl(item, fallback.image),
    imageAlt: fallback.imageAlt,
    href: `/articles/${item.slug || fallback.slug}`,
    kind,
    isHero: fallback.isHero,
  };
}

function normalizeFeed(item: WpPostLike, fallback: PaijoFeedItem): PaijoFeedItem {
  const category = categoryLabel(item, {
    label: fallback.category,
    slug: fallback.category.toLowerCase().replace(/\s+/g, "-"),
  });

  return {
    slug: item.slug || fallback.slug,
    title: stripHtml(item.title?.rendered || fallback.title),
    excerpt: stripHtml(item.excerpt?.rendered || fallback.excerpt),
    category: category.label,
    embedUrl: fallback.embedUrl,
    image: mediaUrl(item, fallback.image),
    imageAlt: fallback.imageAlt,
    href: `/special/${item.slug || fallback.slug}`,
    date: item.date || fallback.date,
  };
}

// --- 5. API Client ---
async function wpJson<T>(path: string, schema?: z.ZodType<T>): Promise<T | null> {
  if (!apiRoot) {
    return null;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const response = await fetch(`${apiRoot}${path}`, {
      next: { revalidate: 60 },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.error(`[WP Fetch Error] Path: ${path}, Status: ${response.status}`);
      return null;
    }

    const json = await response.json();
    
    if (schema) {
      const parsed = schema.safeParse(json);
      if (!parsed.success) {
        console.error(`[WP Validation Error] Path: ${path}`, parsed.error.format());
        return null;
      }
      return parsed.data;
    }

    return json as T;
  } catch (error) {
    console.error(`[WP Fetch Exception] Path: ${path}`, error instanceof Error ? error.message : error);
    return null;
  }
}

function buildCollectionQuery(postType: string, limit: number = 12) {
  const params = new URLSearchParams({
    per_page: limit.toString(),
    _embed: "1",
    orderby: "date",
    order: "desc"
  });
  return `/${postType}?${params.toString()}`;
}

async function wpCollection(path: string) {
  return wpJson<WpPostLike[]>(path, z.array(WpPostLikeSchema));
}

// --- 6. Business Logic ---
export async function fetchWordPressHomePayload(
  fallback: PaijoHomePayload
): Promise<PaijoHomePayload | null> {
  if (!apiRoot) {
    return null;
  }

  const [postsRes, paijoRes, feedsRes] = await Promise.allSettled([
    wpCollection(buildCollectionQuery("posts", 12)),
    wpCollection(buildCollectionQuery("paijo_content", 12)),
    wpCollection(buildCollectionQuery("toko_bercerita", 12)),
  ]);

  const sourcePosts = postsRes.status === "fulfilled" && postsRes.value ? postsRes.value : [];
  const sourcePaijo = paijoRes.status === "fulfilled" && paijoRes.value ? paijoRes.value : [];
  const sourceFeeds = feedsRes.status === "fulfilled" && feedsRes.value ? feedsRes.value : [];

  if (!sourcePosts.length && !sourcePaijo.length && !sourceFeeds.length) {
    return null;
  }

  // Hero Section
  const heroFallback = fallback.hero;
  const heroSource = sourcePosts
    .filter((item) => item.meta?._paijo_is_hero === "1" || item.meta?._paijo_is_hero === 1)
    .slice(0, 3);

  const hero =
    heroSource.length > 0
      ? heroSource.map((item, index) => normalizePost(item, heroFallback[index] ?? heroFallback[0], "post"))
      : heroFallback;

  // Latest & Spotlight
  const mergedStories = [
    ...sourcePosts.map((item, index) =>
      normalizePost(item, fallback.latest[index] ?? fallback.latest[0], "post")
    ),
    ...sourcePaijo.map((item, index) =>
      normalizePost(item, fallback.spotlight[index] ?? fallback.spotlight[0], "paijo_content")
    ),
  ];

  const latest = mergedStories.length > 0 ? mergedStories.slice(0, 6) : fallback.latest;
  const spotlight = mergedStories.length > 3 ? mergedStories.slice(3, 6) : fallback.spotlight;

  // Feeds
  const feeds =
    sourceFeeds.length > 0
      ? sourceFeeds.map((item, index) => normalizeFeed(item, fallback.feeds[index] ?? fallback.feeds[0]))
      : fallback.feeds;

  // Featured Categories
  const featuredCategories: PaijoCategory[] = fallback.featuredCategories.map((category, index) => {
    const matchedTerm = [...sourcePaijo, ...sourcePosts]
      .flatMap((item) => item._embedded?.["wp:term"]?.flat() ?? [])
      .find((term) => term.slug === category.slug || term.name === category.label);

    return {
      ...category,
      label: matchedTerm?.name ?? category.label,
      slug: matchedTerm?.slug ?? category.slug,
      href: matchedTerm?.slug ? `/categories/${matchedTerm.slug}` : category.href,
      count: Math.max(category.count, sourcePaijo.length + sourcePosts.length - index),
    };
  });

  return {
    ...fallback,
    hero,
    latest,
    spotlight,
    feeds,
    featuredCategories,
  };
}
