import type {
  PaijoCategory,
  PaijoFeedItem,
  PaijoHomePayload,
  PaijoStory,
} from "@/lib/paijo/types";

type WpRendered = {
  rendered: string;
};

type WpTerm = {
  id: number;
  slug: string;
  name: string;
  link?: string;
};

type WpEmbedded = {
  "wp:featuredmedia"?: Array<{
    source_url?: string;
  }>;
  "wp:term"?: Array<Array<WpTerm>>;
};

export type WpPostLike = {
  id: number;
  slug: string;
  date: string;
  link: string;
  title: WpRendered;
  excerpt: WpRendered;
  _embedded?: WpEmbedded;
  meta?: Record<string, unknown>;
};

const baseUrl = process.env.WORDPRESS_API_URL?.replace(/\/$/, "") ?? "";
const apiRoot = baseUrl ? `${baseUrl}/wp-json/wp/v2` : "";

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function readingTime(excerpt: string): string {
  const words = stripHtml(excerpt).split(/\s+/).filter(Boolean).length;
  return `${Math.max(2, Math.ceil(words / 45))} min read`;
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

async function wpJson<T>(path: string): Promise<T | null> {
  if (!apiRoot) {
    return null;
  }

  try {
    const response = await fetch(`${apiRoot}${path}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      return null;
    }

    return (await response.json()) as T;
  } catch {
    return null;
  }
}

async function wpCollection(path: string) {
  return wpJson<WpPostLike[]>(path);
}

export async function fetchWordPressHomePayload(
  fallback: PaijoHomePayload
): Promise<PaijoHomePayload | null> {
  if (!apiRoot) {
    return null;
  }

  const [posts, paijoContent, tokoBercerita] = await Promise.all([
    wpCollection("/posts?per_page=12&_embed=1&orderby=date&order=desc"),
    wpCollection("/paijo_content?per_page=12&_embed=1&orderby=date&order=desc"),
    wpCollection("/toko_bercerita?per_page=12&_embed=1&orderby=date&order=desc"),
  ]);

  if (!posts && !paijoContent && !tokoBercerita) {
    return null;
  }

  const sourcePosts = posts ?? [];
  const sourcePaijo = paijoContent ?? [];
  const sourceFeeds = tokoBercerita ?? [];

  const heroFallback = fallback.hero;
  const heroSource = sourcePosts
    .filter((item) => item.meta?._paijo_is_hero === "1" || item.meta?._paijo_is_hero === 1)
    .slice(0, 3);

  const hero =
    heroSource.length > 0
      ? heroSource.map((item, index) => normalizePost(item, heroFallback[index] ?? heroFallback[0], "post"))
      : heroFallback;

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
  const feeds =
    sourceFeeds.length > 0
      ? sourceFeeds.map((item, index) => normalizeFeed(item, fallback.feeds[index] ?? fallback.feeds[0]))
      : fallback.feeds;

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

