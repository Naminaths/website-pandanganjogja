export type PaijoContentKind = "post" | "paijo_content" | "toko_bercerita";

export type PaijoMenuLink = {
  label: string;
  href: string;
  description?: string;
};

export type PaijoStory = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  categorySlug: string;
  date: string;
  readingTime: string;
  image: string;
  imageAlt: string;
  href: string;
  kind: PaijoContentKind;
  isHero?: boolean;
  content?: string;
};

export type PaijoCategory = {
  slug: string;
  label: string;
  description: string;
  image: string;
  href: string;
  accent: string;
  count: number;
};

export type PaijoFeedItem = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  embedUrl: string;
  image: string;
  imageAlt: string;
  href: string;
  date: string;
};

export type PaijoBrand = {
  name: string;
  tagline: string;
  secondary: string;
};

export type PaijoHomePayload = {
  brand: PaijoBrand;
  menu: {
    primary: PaijoMenuLink[];
    special: PaijoMenuLink[];
  };
  hero: PaijoStory[];
  featuredCategories: PaijoCategory[];
  latest: PaijoStory[];
  spotlight: PaijoStory[];
  feeds: PaijoFeedItem[];
  sections: {
    latestLabel: string;
    feedLabel: string;
  };
};

