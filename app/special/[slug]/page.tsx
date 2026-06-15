import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSpecialPageBySlug } from "@/lib/paijo/content";

type SpecialPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: SpecialPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getSpecialPageBySlug(slug);

  if (!page) {
    return { title: "Halaman Tidak Ditemukan | Pandangan Jogja" };
  }

  const item = page.item;

  return {
    title: `${item.title} | Pandangan Jogja`,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      images: [{ url: item.image }],
      type: "article",
    },
  };
}

export default async function SpecialPage({ params }: SpecialPageProps) {
  const { slug } = await params;
  const page = await getSpecialPageBySlug(slug);

  if (!page) {
    notFound();
  }

  if (page.type === "feed") {
    const feed = page.item;

    return (
      <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="overflow-hidden border-black/10 bg-background shadow-[0_18px_60px_rgba(84,54,21,0.08)]">
          <CardHeader className="space-y-4">
            <Badge className="w-fit rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.35em]">
              {feed.category}
            </Badge>
            <CardTitle className="text-4xl leading-[0.95] tracking-[-0.05em] sm:text-5xl">
              {feed.title}
            </CardTitle>
            <CardDescription className="max-w-3xl text-base leading-8">
              {feed.excerpt}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <img src={feed.image} alt={feed.imageAlt} className="aspect-[16/9] w-full rounded-[1.75rem] object-cover" />
            <div className="rounded-[1.75rem] border border-black/10 bg-[linear-gradient(180deg,_rgba(29,23,18,0.98),_rgba(12,10,8,0.99))] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/55">Embed URL</p>
              <a href={feed.embedUrl} target="_blank" rel="noopener noreferrer" className="mt-4 block break-all text-sm leading-7 text-white/75 hover:text-[color:var(--color-accent)] underline underline-offset-4">
                {feed.embedUrl}
              </a>
            </div>
            <Button render={<Link href="/" />}>Back home</Button>
          </CardContent>
        </Card>
      </main>
    );
  }

  const story = page.item;

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
        </CardHeader>
        <CardContent className="space-y-6">
          <img src={story.image} alt={story.imageAlt} className="aspect-[16/9] w-full rounded-[1.75rem] object-cover" />
          <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
            <article className="space-y-5 text-base leading-8 text-foreground/80 prose prose-neutral dark:prose-invert max-w-none prose-headings:font-black prose-headings:tracking-tight prose-a:text-[color:var(--color-accent)]">
              {story.content ? (
                <div dangerouslySetInnerHTML={{ __html: story.content }} />
              ) : null}
              <div className="pt-8">
                <Button render={<Link href="/" />}>Back home</Button>
              </div>
            </article>
            <div className="rounded-[1.75rem] border border-black/10 bg-[linear-gradient(180deg,_rgba(29,23,18,0.98),_rgba(12,10,8,0.99))] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/55">Special view</p>
              <p className="mt-4 text-sm leading-7 text-white/75">
                The backend contract can swap in WordPress REST data later without changing the page layout.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

