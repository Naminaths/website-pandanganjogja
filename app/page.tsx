import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FeedCarousel } from "@/components/feed-carousel";
import { HeroSlider } from "@/components/hero-slider";
import { getHomeData } from "@/lib/paijo/content";

export default async function Home() {
  const home = await getHomeData();
  const [featuredStory, secondaryStory, ...latestStories] = home.latest;

  return (
    <main className="overflow-x-hidden bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.75),_transparent_30%),linear-gradient(180deg,_#f7f5f0_0%,_#efe4d6_50%,_#e2d4c4_100%)] text-foreground">
      <HeroSlider slides={home.hero} />

      <section id="categories" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[color:var(--color-accent)]">
              Kategori Utama
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
              Pintu masuk cepat untuk pembaca
            </h2>
          </div>
          <Badge variant="outline" className="rounded-full border-black/10 px-4 py-2 text-foreground/70">
            {home.brand.secondary}
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {home.featuredCategories.map((category) => (
            <Link key={category.slug} href={category.href} className="group block">
              <Card className="h-full overflow-hidden border-black/10 bg-background shadow-[0_18px_60px_rgba(84,54,21,0.08)] transition-transform group-hover:-translate-y-1">
                <CardContent className="relative p-0">
                  <img
                    src={category.image}
                    alt={category.label}
                    className="aspect-[3/4] w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent,_rgba(0,0,0,0.55))]" />
                  <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <div className="flex items-center justify-between gap-4">
                      <Badge className="rounded-full bg-black/60 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white">
                        {category.count} posts
                      </Badge>
                      <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/65">
                        {category.slug}
                      </span>
                    </div>
                    <h3 className="mt-4 text-2xl font-black tracking-[-0.04em]">
                      {category.label}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-white/78">
                      {category.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section id="latest" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <Card className="overflow-hidden border-black/10 bg-[linear-gradient(135deg,_rgba(17,17,17,0.96),_rgba(26,26,26,0.98))] text-white shadow-[0_24px_70px_rgba(20,12,6,0.22)]">
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <Badge className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white">
                  {home.sections.latestLabel}
                </Badge>
                <Button variant="outline" className="border-white/15 bg-white/5 text-white hover:bg-white hover:text-black" render={<Link href={featuredStory.href} />}>
                  Read latest
                </Button>
              </div>
              <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr] md:items-end">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/45">
                    Headline utama
                  </p>
                  <CardTitle className="mt-3 text-4xl leading-[0.95] tracking-[-0.05em] sm:text-5xl">
                    {featuredStory.title}
                  </CardTitle>
                  <CardDescription className="mt-4 max-w-2xl text-base leading-8 text-white/72">
                    {featuredStory.excerpt}
                  </CardDescription>
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
                    <span>{featuredStory.date}</span>
                    <span>•</span>
                    <span>{featuredStory.readingTime}</span>
                    <span>•</span>
                    <span>{featuredStory.category}</span>
                  </div>
                  <div className="mt-6 rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-white/45">
                      Next up
                    </p>
                    <p className="mt-2 text-lg font-black leading-7 tracking-[-0.03em]">
                      {secondaryStory?.title}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <img
                    src={featuredStory.image}
                    alt={featuredStory.imageAlt}
                    className="h-[320px] w-full rounded-[1.75rem] object-cover"
                  />
                </div>
              </div>
            </CardHeader>
          </Card>

          <div className="grid gap-4">
            {latestStories.slice(0, 4).map((story) => (
              <Link key={story.slug} href={story.href} className="group block">
                <Card className="overflow-hidden border-black/10 bg-background shadow-sm transition-transform group-hover:-translate-y-0.5">
                  <CardContent className="flex gap-4 p-4">
                    <img
                      src={story.image}
                      alt={story.imageAlt}
                      className="h-24 w-24 shrink-0 rounded-2xl object-cover"
                    />
                    <div className="min-w-0">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                        {story.category}
                      </p>
                      <h3 className="mt-2 text-lg font-black leading-6 tracking-[-0.03em] text-foreground">
                        {story.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm leading-6 text-foreground/65">
                        {story.excerpt}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="spotlight" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[color:var(--color-accent)]">
              Konten Khusus
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
              Ruang untuk isu, kultur, dan cerita khas
            </h2>
          </div>
          <Badge variant="outline" className="rounded-full border-black/10 px-4 py-2 text-foreground/70">
            Headless content
          </Badge>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <Card className="border-black/10 bg-[linear-gradient(180deg,_rgba(36,27,18,0.96),_rgba(18,14,10,0.98))] text-white shadow-[0_18px_60px_rgba(20,12,6,0.22)]">
            <CardHeader>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/55">
                Featured special
              </p>
              <CardTitle className="mt-3 text-3xl leading-[0.98] tracking-[-0.04em] sm:text-4xl">
                {home.spotlight[0].title}
              </CardTitle>
              <CardDescription className="text-base leading-7 text-white/72">
                {home.spotlight[0].excerpt}
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-2">
              {home.menu.special.slice(0, 4).map((item) => (
                <Link key={item.label} href={item.href} className="block rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10">
                  <p className="text-sm font-black uppercase tracking-[0.28em] text-[color:var(--color-accent)]">
                    {item.label}
                  </p>
                  {item.description ? (
                    <p className="mt-2 text-sm leading-6 text-white/70">{item.description}</p>
                  ) : null}
                </Link>
              ))}
            </CardContent>
          </Card>

          <div className="grid gap-4 sm:grid-cols-2">
            {home.spotlight.map((story) => (
              <Link key={story.slug} href={story.href} className="group block">
                <Card className="h-full overflow-hidden border-black/10 bg-background shadow-sm transition-transform group-hover:-translate-y-1">
                  <CardContent className="p-0">
                    <img
                      src={story.image}
                      alt={story.imageAlt}
                      className="aspect-[4/3] w-full object-cover"
                    />
                    <div className="p-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[color:var(--color-accent)]">
                        {story.category}
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
        </div>
      </section>

      <section id="feeds" className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[color:var(--color-accent)]">
              {home.sections.feedLabel}
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
              Video dan cerita singkat yang lebih hidup
            </h2>
          </div>
          <Badge variant="outline" className="rounded-full border-black/10 px-4 py-2 text-foreground/70">
            Swiper carousel
          </Badge>
        </div>

        <FeedCarousel items={home.feeds} />
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Card className="border-black/10 bg-background/90 shadow-[0_18px_60px_rgba(84,54,21,0.08)]">
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.45em] text-[color:var(--color-accent)]">
                About
              </p>
              <CardTitle className="mt-2 text-2xl font-black tracking-[-0.04em] sm:text-3xl">
                A Paijo-inspired newsroom shell, backed by typed content contracts
              </CardTitle>
            </div>
            <Button render={<Link href="/api/home" />}>View API</Button>
          </CardHeader>
          <CardContent className="grid gap-5 md:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/45">Frontend</p>
              <p className="mt-2 text-sm leading-7 text-foreground/68">
                Next.js renders the editorial shell, hero slider, category cards, and carousel sections.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/45">Backend</p>
              <p className="mt-2 text-sm leading-7 text-foreground/68">
                API routes expose home, article, category, and special-content payloads in a WordPress-like shape.
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-foreground/45">Theme</p>
              <p className="mt-2 text-sm leading-7 text-foreground/68">
                The palette, typography, and spacing follow the Paijo reference with a paper-first editorial feel.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

    </main>
  );
}
