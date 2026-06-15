import { seedHomePayload } from "@/lib/paijo/seed";
import type {
  PaijoCategory,
  PaijoFeedItem,
  PaijoHomePayload,
  PaijoStory,
} from "@/lib/paijo/types";
import { fetchWordPressHomePayload } from "@/lib/paijo/wordpress";

function sortByDateDesc<T extends { date: string }>(items: T[]): T[] {
  return [...items].sort((left, right) => right.date.localeCompare(left.date));
}

function asArticleHref(kind: PaijoStory["kind"], slug: string): string {
  return kind === "toko_bercerita" ? `/special/${slug}` : `/articles/${slug}`;
}

export async function getHomeData(): Promise<PaijoHomePayload> {
  const wpHome = await fetchWordPressHomePayload(seedHomePayload);
  const payload = wpHome ?? seedHomePayload;

  return {
    ...payload,
    latest: sortByDateDesc(payload.latest),
    spotlight: sortByDateDesc(payload.spotlight),
    hero: sortByDateDesc(payload.hero),
    feeds: sortByDateDesc(payload.feeds),
  };
}

export async function getStoryBySlug(slug: string): Promise<PaijoStory | null> {
  const home = await getHomeData();
  const story = [...home.hero, ...home.latest, ...home.spotlight].find((item) => item.slug === slug);
  
  if (!story) return null;

  return {
    ...story,
    content: story.content || `
      <p>Perjalanan menyusuri sudut kota selalu menyisakan banyak cerita. Dari riuhnya lalu lalang kendaraan hingga percakapan pelan di warung kopi kecil, setiap detail memiliki nyawa tersendiri. Ini adalah tampilan dinamis dari konten yang disajikan menggunakan model Paijo, memberikan ruang membaca yang lebih leluasa dan immersif.</p>
      <h3>Menemukan Sudut Baru</h3>
      <p>Seringkali, hal-hal menarik justru tersembunyi di balik jalan-jalan utama. Ruang publik, pasar tradisional, atau sekadar bangku taman tua menyimpan histori yang panjang. Artikel ini menggunakan HTML dinamis yang disuntikkan langsung ke halaman, siap untuk diintegrasikan dengan WordPress REST API atau Headless CMS pilihan Anda.</p>
      <blockquote>"Kota yang baik adalah kota yang terus bergerak tanpa melupakan akar ceritanya."</blockquote>
      <p>Terus ikuti berbagai liputan menarik kami dan temukan berbagai sudut pandang baru yang mungkin belum pernah Anda sadari sebelumnya.</p>
    `
  };
}

export async function getCategoryBySlug(slug: string): Promise<PaijoCategory | null> {
  const home = await getHomeData();
  const category = home.featuredCategories.find((item) => item.slug === slug);
  return category ?? null;
}

export async function getFeedBySlug(slug: string): Promise<PaijoFeedItem | null> {
  const home = await getHomeData();
  const feed = home.feeds.find((item) => item.slug === slug);
  return feed ?? null;
}

export async function getSpecialPageBySlug(slug: string) {
  const story = await getStoryBySlug(slug);
  if (story) {
    return {
      type: "story" as const,
      item: {
        ...story,
        href: asArticleHref(story.kind, story.slug),
      },
    };
  }

  const feed = await getFeedBySlug(slug);
  if (feed) {
    return {
      type: "feed" as const,
      item: feed,
    };
  }

  return null;
}
