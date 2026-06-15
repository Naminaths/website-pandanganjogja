import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getCategoryBySlug, getHomeData } from "@/lib/paijo/content";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, home] = await Promise.all([getCategoryBySlug(slug), getHomeData()]);

  if (!category) {
    notFound();
  }

  const stories = [...home.latest, ...home.spotlight, ...home.hero].filter(
    (story) => story.categorySlug === slug
  );

  return (
    <main className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <Card className="overflow-hidden border-black/10 bg-background shadow-[0_18px_60px_rgba(84,54,21,0.08)]">
        <CardHeader className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
          <div className="space-y-4">
            <Badge className="w-fit rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.35em]">
              {category.slug}
            </Badge>
            <CardTitle className="text-4xl tracking-[-0.05em] sm:text-5xl">{category.label}</CardTitle>
            <CardDescription className="text-base leading-8">{category.description}</CardDescription>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="rounded-full border-black/10 px-4 py-2 text-foreground/70">
                {category.count} posts
              </Badge>
              <Button render={<Link href="/" />}>Back home</Button>
            </div>
          </div>
          <img
            src={category.image}
            alt={category.label}
            className="aspect-[16/10] w-full rounded-[1.75rem] object-cover"
          />
        </CardHeader>
      </Card>

      <section className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stories.map((story) => (
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
      </section>
    </main>
  );
}

