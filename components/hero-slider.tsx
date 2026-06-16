"use client";

import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon, MoonIcon } from "lucide-react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { useState } from "react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import type { PaijoStory } from "@/lib/paijo/types";

type HeroSliderProps = {
  slides: PaijoStory[];
  articles?: PaijoStory[];
};

export function HeroSlider({ slides, articles = [] }: HeroSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = slides[activeIndex % slides.length]?.image ?? "";

  return (
    <div className="relative text-white">

      {/* ── Shared bleed background (follows active slide) ── */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
        {slides.map((slide, index) => {
          const isActive = index === activeIndex % slides.length;
          return (
            <img
              key={slide.slug}
              src={slide.image}
              alt=""
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
                isActive ? "hero-bg-active" : "opacity-0"
              }`}
            />
          );
        })}
        {/* gradient: light at top, heavy dark at bottom for article strip */}
        <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.08)_0%,rgba(0,0,0,0.28)_40%,rgba(0,0,0,0.80)_68%,rgba(0,0,0,0.97)_100%)]" />
      </div>

      {/* ══════════════════ HERO SLIDER ══════════════════ */}
      <section className="relative z-10">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, A11y]}
          slidesPerView={1}
          loop
          autoplay={{ delay: 6000, disableOnInteraction: false }}
          navigation={{ prevEl: ".hero-prev", nextEl: ".hero-next" }}
          pagination={{ clickable: true, dynamicBullets: false }}
          onSlideChange={(swiper: SwiperType) => setActiveIndex(swiper.realIndex)}
          className="hero-swiper"
          style={{ height: "100svh", minHeight: "580px" } as React.CSSProperties}
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.slug}>
              <article
                className="relative flex flex-col justify-end"
                style={{ height: "100svh", minHeight: "580px" }}
              >
                {/* invisible per-slide image (swiper needs it internally) */}
                <img
                  src={slide.image}
                  alt={slide.imageAlt}
                  className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-0"
                  aria-hidden
                />

                {/* ── Slide content ── */}
                <div className="relative z-10 w-full px-4 pb-[90px] pt-20 sm:px-6 lg:px-8">
                  <div className="mx-auto w-full max-w-7xl">

                    {/* Category tag */}
                    <span className="hero-text-anim anim-delay-1 inline-block text-[9px] font-black uppercase tracking-[0.45em] text-[color:var(--color-accent)] sm:text-[10px]">
                      {slide.category}
                    </span>

                    {/* Title */}
                    <h1 className="hero-text-anim anim-delay-2 mt-2 text-[1.6rem] font-black leading-[1.08] tracking-[-0.03em] text-white sm:mt-3 sm:text-4xl lg:text-5xl xl:text-[3.2rem]">
                      {slide.title}
                    </h1>

                    {/* Excerpt — hidden on very small screens to keep it clean */}
                    <p className="hero-text-anim anim-delay-3 mt-3 hidden max-w-xl text-sm leading-7 text-white/68 sm:block sm:text-[0.9rem]">
                      {slide.excerpt}
                    </p>
                    {/* Short excerpt on mobile */}
                    <p className="hero-text-anim anim-delay-3 mt-2 line-clamp-2 text-[0.78rem] leading-6 text-white/60 sm:hidden">
                      {slide.excerpt}
                    </p>

                    {/* Date + reading time + READ ARTICLE */}
                    <div className="hero-text-anim anim-delay-4 mt-4 flex flex-wrap items-center justify-between gap-3 sm:mt-5">
                      {/* meta */}
                      <div className="flex items-center gap-2.5 text-[9px] font-semibold uppercase tracking-[0.3em] text-white/40 sm:text-[10px]">
                        <span>{slide.date}</span>
                        <span className="h-px w-3 bg-white/25" />
                        <span>{slide.readingTime}</span>
                      </div>

                      {/* READ ARTICLE — always visible, moves below on mobile */}
                      <Link
                        href={slide.href}
                        className="inline-flex items-center rounded-full border-2 border-white bg-white/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.18em] text-white backdrop-blur-sm transition-all duration-200 hover:bg-white hover:text-black sm:px-7 sm:py-3 sm:text-sm"
                      >
                        READ ARTICLE
                      </Link>
                    </div>

                  </div>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Left arrow */}
        <button
          type="button"
          aria-label="Previous slide"
          className="hero-prev absolute left-2 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/55 sm:left-4 sm:h-11 sm:w-11"
        >
          <ChevronLeftIcon className="size-3.5 sm:size-5" />
        </button>

        {/* Right arrow */}
        <button
          type="button"
          aria-label="Next slide"
          className="hero-next absolute right-2 top-1/2 z-20 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/55 sm:right-4 sm:h-11 sm:w-11"
        >
          <ChevronRightIcon className="size-3.5 sm:size-5" />
        </button>

        {/* Moon button — just below right arrow */}
        <button
          type="button"
          aria-label="Toggle dark mode"
          className="absolute right-2 z-20 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/85 text-foreground shadow transition-all hover:bg-white sm:right-4 sm:h-10 sm:w-10"
          style={{ top: "calc(50% + 40px)" }}
        >
          <MoonIcon className="size-3 sm:size-4" />
        </button>
      </section>

      {/* ══════════════════ BACA ARTIKEL KHAS ══════════════════ */}
      {articles.length > 0 && (
        <section className="relative z-10 pb-8 pt-6 sm:pb-12 sm:pt-8">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Heading */}
            <div className="mb-5 text-center sm:mb-7">
              <h2 className="text-xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                Baca Artikel Khas
              </h2>
              <p className="mt-1 text-xs text-white/45 sm:text-sm">
                Beragam cerita, menggerakkan ekosistem
              </p>
            </div>

            {/* Horizontal scrollable cards */}
            <div className="flex gap-3 overflow-x-auto pb-1 scrollbar-hide sm:gap-4">
              {articles.map((article) => (
                <Link
                  key={article.slug}
                  href={article.href}
                  className="group shrink-0 flex-1 snap-start"
                  style={{ minWidth: "110px", maxWidth: "clamp(110px, 28vw, 200px)" }}
                >
                  <div className="relative overflow-hidden rounded-xl" style={{ aspectRatio: "3/4" }}>
                    <img
                      src={article.image}
                      alt={article.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {/* gradient overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_30%,rgba(0,0,0,0.82))]" />
                    {/* text */}
                    <div className="absolute inset-x-0 bottom-0 p-2.5 sm:p-3">
                      <p className="text-[7px] font-black uppercase tracking-[0.28em] text-[color:var(--color-accent)] sm:text-[8px]">
                        {article.category}
                      </p>
                      <p className="mt-0.5 line-clamp-2 text-[9px] font-bold leading-snug text-white sm:text-[10px]">
                        {article.title}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        </section>
      )}

    </div>
  );
}
