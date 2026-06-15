"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PaijoStory } from "@/lib/paijo/types";

type HeroSliderProps = {
  slides: PaijoStory[];
};

export function HeroSlider({ slides }: HeroSliderProps) {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,_rgba(15,15,15,0.94),_rgba(10,10,10,0.98))] text-white">
      <Swiper
        modules={[Navigation, Pagination, Autoplay, A11y]}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        navigation={{
          prevEl: ".hero-prev",
          nextEl: ".hero-next",
        }}
        pagination={{
          el: ".hero-dots",
          clickable: true,
        }}
        className="relative min-h-[calc(100vh-5rem)]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.slug}>
            <article className="relative min-h-[calc(100vh-5rem)]">
              <img
                src={slide.image}
                alt={slide.imageAlt}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,_rgba(5,5,5,0.2),_rgba(5,5,5,0.35)_40%,_rgba(5,5,5,0.9))]" />

              <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-7xl flex-col justify-end px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
                <div className="max-w-3xl">
                  <Badge className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-white">
                    {slide.category}
                  </Badge>
                  <h1 className="mt-5 text-4xl font-black leading-[0.92] tracking-[-0.06em] text-balance sm:text-5xl lg:text-7xl">
                    {slide.title}
                  </h1>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-white/75 sm:text-lg">
                    {slide.excerpt}
                  </p>
                  <div className="mt-5 flex flex-wrap items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55">
                    <span>{slide.date}</span>
                    <span>•</span>
                    <span>{slide.readingTime}</span>
                  </div>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <Button render={<Link href={slide.href} />}>Read Article</Button>
                    <Button variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white hover:text-black" render={<Link href="#categories" />}>
                      Explore Categories
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="pointer-events-none absolute inset-x-0 bottom-7 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="hero-dots pointer-events-auto" />
        <div className="pointer-events-auto flex items-center gap-2">
          <button
            type="button"
            className="hero-prev flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur transition hover:bg-[color:var(--color-accent)]"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="size-5" />
          </button>
          <button
            type="button"
            className="hero-next flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur transition hover:bg-[color:var(--color-accent)]"
            aria-label="Next slide"
          >
            <ChevronRightIcon className="size-5" />
          </button>
        </div>
      </div>
    </section>
  );
}

