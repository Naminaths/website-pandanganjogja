"use client";

import { MenuIcon, MoonIcon, SearchIcon, XIcon } from "lucide-react";
import logoWhite from "@/assets/logo-white.png";

import type { PaijoBrand, PaijoMenuLink } from "@/lib/paijo/types";
import { useEffect, useRef, useState } from "react";

type SiteMenuProps = {
  brand: PaijoBrand;
  menu: {
    primary: PaijoMenuLink[];
    special: PaijoMenuLink[];
  };
};

export function SiteMenu({ brand, menu }: SiteMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  /* ── scroll detection ── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── auto-focus search input ── */
  useEffect(() => {
    if (searchOpen) {
      const t = setTimeout(() => searchInputRef.current?.focus(), 80);
      return () => clearTimeout(t);
    }
  }, [searchOpen]);

  /* ── close menu on outside click ── */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  /* ── close on Escape ── */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-40 transition-all duration-500"
      style={{
        /* Background + blur lives on the FULL-WIDTH header — clean on all screen sizes */
        background: scrolled ? "rgba(8,8,8,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(18px) saturate(1.6)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(18px) saturate(1.6)" : "none",
      }}
    >
      {/* ── Navbar row ── */}
      <div className="relative mx-auto flex w-full max-w-7xl items-center px-3 py-2.5 sm:px-6 sm:py-3 lg:px-8">

        {/* LEFT: Hamburger + Search */}
        <div className="flex items-center gap-0.5 sm:gap-1">
          {/* Hamburger */}
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => { setMenuOpen((v) => !v); setSearchOpen(false); }}
            className={[
              "flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-200 sm:h-9 sm:w-9",
              menuOpen
                ? "border-white/25 bg-white/10 text-white"
                : "border-transparent text-white hover:border-white/15 hover:bg-white/8",
            ].join(" ")}
          >
            {menuOpen
              ? <XIcon className="size-3.5 sm:size-4" />
              : <MenuIcon className="size-4 sm:size-[1.1rem]" />
            }
          </button>

          {/* Search */}
          <button
            aria-label="Search"
            onClick={() => { setSearchOpen((v) => !v); setMenuOpen(false); }}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-transparent text-white transition-all duration-200 hover:border-white/15 hover:bg-white/8 sm:h-9 sm:w-9"
          >
            <SearchIcon className="size-4 sm:size-[1.1rem]" />
          </button>
        </div>

        {/* CENTER: Logo — absolutely centered */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <img
            src={logoWhite.src}
            alt={brand.name}
            className="h-7 w-auto sm:h-8 md:h-9 lg:h-10"
          />
        </div>

        {/* RIGHT: spacer to maintain centering */}
        <div className="ml-auto" />
      </div>

      {/* ── Dropdown menu panel ── */}
      <div
        className="overflow-hidden transition-all duration-[380ms] ease-in-out"
        style={{
          maxHeight: menuOpen ? "520px" : "0px",
          opacity: menuOpen ? 1 : 0,
        }}
        aria-hidden={!menuOpen}
      >
        <div className="bg-[rgba(6,6,6,0.97)] backdrop-blur-2xl">
          <div className="h-px w-full bg-white/[0.07]" />

          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 px-4 py-6 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-10">

            {/* LEFT: Kategori Utama */}
            <div className="border-b border-white/[0.07] pb-6 md:border-b-0 md:border-r md:pb-0 md:pr-12">
              <p className="text-[9px] font-black uppercase tracking-[0.45em] text-white/30 sm:text-[10px]">
                Kategori Utama
              </p>
              <div className="mt-4 space-y-0.5">
                {menu.primary.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-2.5 py-2 text-lg font-black tracking-[-0.02em] transition-all duration-150 hover:text-[color:var(--color-accent)] sm:py-2.5 sm:text-xl"
                    style={{ color: '#ffffff' }}
                  >
                    <span className="block h-px w-0 shrink-0 bg-[color:var(--color-accent)] transition-all duration-200 group-hover:w-4" />
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            {/* RIGHT: Konten Khusus */}
            <div className="relative pt-6 md:pl-12 md:pt-0">
              <p className="text-[9px] font-black uppercase tracking-[0.45em] text-[color:var(--color-accent)] sm:text-[10px]">
                Konten Khusus
              </p>
              <div className="mt-4 space-y-0">
                {menu.special.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-2.5 py-1.5 text-sm font-semibold tracking-[-0.01em] transition-all duration-150 hover:text-[color:var(--color-accent)] sm:text-base"
                    style={{ color: '#ffffff' }}
                  >
                    <span className="block h-px w-0 shrink-0 bg-[color:var(--color-accent)] transition-all duration-200 group-hover:w-3" />
                    {item.label}
                  </a>
                ))}
              </div>

              {/* Moon button — desktop only */}
              <div className="absolute bottom-0 right-0 hidden lg:block">
                <button
                  aria-label="Toggle dark mode"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-[color:var(--color-accent)]/35 bg-white text-[color:var(--color-accent)] shadow-[0_8px_28px_rgba(241,129,143,0.18)] transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_36px_rgba(241,129,143,0.32)]"
                >
                  <MoonIcon className="size-4" />
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>

      {/* ── Search overlay ── */}
      <div
        className="overflow-hidden transition-all duration-[380ms] ease-in-out"
        style={{
          maxHeight: searchOpen ? "80px" : "0px",
          opacity: searchOpen ? 1 : 0,
        }}
        aria-hidden={!searchOpen}
      >
        <div className="bg-[rgba(10,10,10,0.94)] backdrop-blur-xl px-3 py-3 sm:px-6">
          <form
            onSubmit={handleSearch}
            className="mx-auto flex max-w-3xl items-center gap-2 sm:gap-3"
          >
            <div className="relative flex flex-1 items-center">
              <SearchIcon className="pointer-events-none absolute left-3.5 size-4 text-white/35 sm:left-4 sm:size-5" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                placeholder="Cari artikel..."
                className="h-10 w-full rounded-full border border-white/12 bg-white/9 pl-10 pr-4 text-sm text-white placeholder:text-white/35 outline-none transition-all duration-200 focus:border-[color:var(--color-accent)]/55 focus:bg-white/14 sm:h-11 sm:pl-12 sm:text-base"
              />
            </div>
            <button
              type="submit"
              className="h-10 shrink-0 rounded-full bg-[color:var(--color-accent)] px-5 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all duration-200 hover:brightness-110 active:scale-95 sm:h-11 sm:px-7 sm:text-sm"
            >
              CARI
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
