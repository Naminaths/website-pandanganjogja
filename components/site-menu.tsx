"use client";

import { MenuIcon, MoonIcon, XIcon } from "lucide-react";
import logo from "@/assets/logo.png";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SearchBar } from "@/components/search-bar";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import type { PaijoBrand, PaijoMenuLink } from "@/lib/paijo/types";

type SiteMenuProps = {
  brand: PaijoBrand;
  menu: {
    primary: PaijoMenuLink[];
    special: PaijoMenuLink[];
  };
};

export function SiteMenu({ brand, menu }: SiteMenuProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-black/10 bg-background/85 backdrop-blur-xl">
      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <Sheet>
          <SheetTrigger
            render={<Button variant="outline" size="icon" aria-label="Open menu" />}
          >
            <MenuIcon className="size-5" />
          </SheetTrigger>
          <SheetContent
            side="left"
            className="!fixed !inset-0 !h-screen !w-screen !max-w-none !rounded-none !border-none bg-[linear-gradient(180deg,_rgba(15,15,15,0.99),_rgba(3,3,3,0.99))] p-0 text-background shadow-none data-[side=left]:!w-screen data-[side=left]:!max-w-none data-[side=left]:!border-r-0"
            showCloseButton={false}
          >
            <div className="flex h-full flex-col">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-white/10 px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2">
                  <SheetClose
                    render={<Button variant="outline" size="icon-sm" aria-label="Close menu" />}
                  >
                    <XIcon className="size-4" />
                  </SheetClose>
                  <SearchBar />
                </div>

                <div className="pointer-events-none flex justify-center text-center">
                  <img src={logo.src} alt={brand.name} className="h-5 w-auto" />
                </div>

                <div className="flex items-center justify-end gap-3 text-right">
                  <div className="hidden sm:block">
                    <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white">
                      {brand.secondary}
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--color-accent)]/55 bg-white text-[color:var(--color-accent)]">
                    <span className="text-3xl font-black leading-none">#</span>
                  </div>
                </div>
              </div>

              <div className="relative grid flex-1 gap-10 px-6 py-10 sm:px-8 lg:grid-cols-2 lg:px-10 lg:py-14">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.5em] text-white/45">
                    Kategori Utama
                  </p>
                  <Separator className="my-5 bg-white/10" />
                  <div className="space-y-4">
                    {menu.primary.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block text-[clamp(1.4rem,2vw,2rem)] font-black leading-none tracking-[-0.05em] text-white transition-colors hover:text-[color:var(--color-accent)]"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.5em] text-[color:var(--color-accent)]">
                    Konten Khusus
                  </p>
                  <Separator className="my-5 bg-white/10" />
                  <div className="space-y-4">
                    {menu.special.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="block text-[clamp(1.15rem,1.6vw,1.75rem)] font-semibold leading-tight text-white/92 transition-colors hover:text-[color:var(--color-accent)]"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>

                <div className="absolute right-6 top-1/2 hidden h-16 w-16 -translate-y-1/2 items-center justify-center rounded-full border border-[color:var(--color-accent)]/45 bg-white text-[color:var(--color-accent)] shadow-[0_18px_50px_rgba(255,255,255,0.16)] lg:flex">
                  <MoonIcon className="size-6" />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-white/10 px-6 py-4 text-[11px] uppercase tracking-[0.35em] text-white/40 sm:px-8 lg:px-10">
                <span>Innovatif</span>
                <span>Terpercaya</span>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <img src={logo.src} alt={brand.name} className="h-8 w-auto md:h-10" />
        </div>

        <div className="flex items-center gap-2 justify-self-end">
          <SearchBar />
          <div className="hidden text-right md:block">
            <Badge variant="outline" className="rounded-full border-black/10 bg-white/80 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-foreground/70">
              {brand.secondary}
            </Badge>
          </div>
        </div>
      </div>
    </header>
  );
}
