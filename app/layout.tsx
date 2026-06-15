import type { Metadata } from "next";

import { SiteMenu } from "@/components/site-menu";
import { seedHomePayload } from "@/lib/paijo/seed";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pandangan Jogja | Editorial Portal",
  description: "A Paijo-inspired editorial portal built with Next.js, shadcn/ui, Swiper, and typed content data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full antialiased font-sans">
      <body className="min-h-full bg-background text-foreground">
        <SiteMenu brand={seedHomePayload.brand} menu={seedHomePayload.menu} />
        {children}
      </body>
    </html>
  );
}
