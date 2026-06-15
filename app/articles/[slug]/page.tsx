import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getStoryBySlug } from "@/lib/paijo/content";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      <Card className="overflow-hidden border-black/10 bg-background shadow-[0_18px_60px_rgba(84,54,21,0.08)]">
        <CardHeader className="space-y-4">
          <Badge className="w-fit rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.35em]">
            {story.category}
          </Badge>
          <CardTitle className="text-4xl leading-[0.95] tracking-[-0.05em] sm:text-5xl">
            {story.title}
          </CardTitle>
          <CardDescription className="max-w-3xl text-base leading-8">
            {story.excerpt}
          </CardDescription>
          <div className="flex flex-wrap items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/45">
            <span>{story.date}</span>
            <span>•</span>
            <span>{story.readingTime}</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-8">
          <img src={story.image} alt={story.imageAlt} className="aspect-[16/9] w-full rounded-[1.75rem] object-cover" />
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="space-y-5 text-base leading-8 text-foreground/80">
              <p>
                Ini adalah tampilan detail artikel untuk konten headless yang berasal dari model Paijo. Halaman ini
                siap dipetakan ke WordPress REST API atau data feed lain yang mengikuti struktur yang sama.
              </p>
              <p>
                Gunakan halaman ini untuk menampilkan reportase panjang, foto essay, atau tulisan editorial yang
                membutuhkan ruang baca lebih luas.
              </p>
              <Button render={<Link href="/" />}>Back to home</Button>
            </article>
            <div className="rounded-[1.75rem] border border-black/10 bg-[linear-gradient(180deg,_rgba(29,23,18,0.98),_rgba(12,10,8,0.99))] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/55">Reading note</p>
              <p className="mt-4 text-sm leading-7 text-white/75">
                The article layout keeps the editorial tone close to the reference theme: strong headline, generous
                whitespace, and a calm paper-first reading experience.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
