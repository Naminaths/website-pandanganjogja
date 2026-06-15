import Link from "next/link";
import type { PaijoBrand, PaijoMenuLink } from "@/lib/paijo/types";

type SiteFooterProps = {
  brand: PaijoBrand;
  menu: {
    primary: PaijoMenuLink[];
  };
};

export function SiteFooter({ brand, menu }: SiteFooterProps) {
  return (
    <footer className="border-t border-black/10 bg-[linear-gradient(180deg,_rgba(29,23,18,0.98),_rgba(12,10,8,0.99))] text-white mt-auto">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-white/55">
            {brand.name}
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/75">
            Editorial frontend and headless content layer for a Paijo-inspired news portal.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55">Sections</p>
          <ul className="mt-4 space-y-3 text-sm text-white/78">
            {menu.primary.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="hover:text-[color:var(--color-accent)]">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.28em] text-white/55">Contact</p>
          <ul className="mt-4 space-y-3 text-sm text-white/78">
            <li>hello@pandanganjogja.local</li>
            <li>Editorial desk</li>
            <li>Media kit and partnerships</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
