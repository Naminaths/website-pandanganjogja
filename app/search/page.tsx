import { Metadata } from "next";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHomeData } from "@/lib/paijo/content";

type SearchPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q : "";
  return {
    title: `Pencarian: ${query} | Pandangan Jogja`,
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, page } = await searchParams;
  const query = typeof q === "string" ? q : "";
  const currentPage = typeof page === "string" ? parseInt(page, 10) : 1;
  const ITEMS_PER_PAGE = 6;

  const home = await getHomeData();
  const allStories = [...home.latest, ...home.spotlight, ...home.hero];
  
  // Deduplicate
  const uniqueStories = Array.from(new Map(allStories.map((story) => [story.slug, story])).values());
  
  // Filter by query
  const filteredStories = query 
    ? uniqueStories.filter(story => 
        story.title.toLowerCase().includes(query.toLowerCase()) || 
        story.excerpt.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const paginatedStories = filteredStories.slice(0, currentPage * ITEMS_PER_PAGE);
  const hasMore = paginatedStories.length < filteredStories.length;

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 min-h-[60vh]">
      <div className="mb-8">
        <h1 className="text-3xl font-black tracking-[-0.04em] sm:text-4xl">
          {query ? `Hasil pencarian untuk "${query}"` : "Pencarian"}
        </h1>
        <p className="mt-2 text-foreground/60">
          Ditemukan {filteredStories.length} artikel.
        </p>
      </div>

      {paginatedStories.length > 0 ? (
        <section>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {paginatedStories.map((story) => (
              <Link key={story.slug} href={story.href} className="group block">
                <Card className="h-full overflow-hidden border-black/10 bg-background shadow-sm transition-transform group-hover:-translate-y-1">
                  <CardContent className="p-0">
                    <img src={story.image} alt={story.imageAlt} className="aspect-[4/3] w-full object-cover" />
                    <div className="p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                        {story.date}
                      </p>
                      <h3 className="mt-2 text-lg font-black leading-7 tracking-[-0.03em]">
                        {story.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-foreground/65">{story.excerpt}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
          {hasMore && (
            <div className="mt-8 flex justify-center">
              <Button render={<Link href={`/search?q=${encodeURIComponent(query)}&page=${currentPage + 1}`} scroll={false} />}>
                Load More
              </Button>
            </div>
          )}
        </section>
      ) : (
        <div className="mt-12 py-16 text-center">
          <p className="text-lg text-foreground/60">
            {query ? "Tidak ada artikel yang cocok dengan pencarian Anda." : "Masukkan kata kunci untuk mencari."}
          </p>
        </div>
      )}
    </main>
  );
}
