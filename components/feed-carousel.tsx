"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, PlayIcon } from "lucide-react";
import { A11y, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PaijoFeedItem } from "@/lib/paijo/types";

type FeedCarouselProps = {
  items: PaijoFeedItem[];
};

export function FeedCarousel({ items }: FeedCarouselProps) {
  return (
    <div className="relative">
      <div className="mb-4 flex items-center justify-end gap-2">
        <button
          type="button"
          className="feed-prev flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-foreground shadow-sm transition hover:bg-[color:var(--color-accent)] hover:text-white"
          aria-label="Previous feed"
        >
          <ChevronLeftIcon className="size-4" />
        </button>
        <button
          type="button"
          className="feed-next flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-foreground shadow-sm transition hover:bg-[color:var(--color-accent)] hover:text-white"
          aria-label="Next feed"
        >
          <ChevronRightIcon className="size-4" />
        </button>
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={18}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1.25 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        navigation={{ prevEl: ".feed-prev", nextEl: ".feed-next" }}
        pagination={{ el: ".feed-dots", clickable: true }}
      >
        {items.map((item) => (
          <SwiperSlide key={item.slug} className="pb-10">
            <Card className="h-full overflow-hidden border-black/10 bg-background shadow-[0_18px_60px_rgba(84,54,21,0.08)]">
              <CardHeader className="p-0">
                <div className="relative">
                  <img src={item.image} alt={item.imageAlt} className="aspect-[4/3] w-full object-cover" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,_transparent,_rgba(0,0,0,0.5))]" />
                  <div className="absolute left-4 top-4 flex items-center gap-2">
                    <Badge className="rounded-full bg-black/70 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white">
                      {item.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4 flex h-12 w-12 items-center justify-center rounded-full bg-white text-[color:var(--color-accent)] shadow-lg">
                    <PlayIcon className="size-5" />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 p-5">
                <CardTitle className="text-xl leading-7">{item.title}</CardTitle>
                <CardDescription className="text-sm leading-6">{item.excerpt}</CardDescription>
                <div className="flex items-center justify-between gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-foreground/45">
                  <span>{item.date}</span>
                  <Button variant="ghost" className="h-8 px-0 text-[11px] uppercase tracking-[0.28em]" render={<Link href={item.href} />}>
                    Open
                  </Button>
                </div>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="feed-dots mt-3 flex justify-center" />
    </div>
  );
}

