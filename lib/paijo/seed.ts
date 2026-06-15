import type { PaijoHomePayload, PaijoCategory, PaijoFeedItem, PaijoStory } from "@/lib/paijo/types";

const heroStories: PaijoStory[] = [
  {
    slug: "malioboro-pagi-ini",
    title: "Malioboro pagi ini bergerak pelan, lalu berubah jadi arus cerita",
    excerpt:
      "Kabar harian, pejalan kaki, dan lapak yang mulai buka perlahan membentuk halaman depan yang ramah dibaca.",
    category: "News",
    categorySlug: "news",
    date: "2026-06-15",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Street life in a busy city corridor",
    href: "/articles/malioboro-pagi-ini",
    kind: "post",
    isHero: true,
  },
  {
    slug: "kuliner-malam-di-jogja",
    title: "Kuliner malam di Jogja yang selalu punya alasan untuk disinggahi",
    excerpt:
      "Dari gerobak kaki lima sampai meja kecil di sudut jalan, semuanya menyusun ritme rasa yang akrab.",
    category: "Kuliner Berbintang",
    categorySlug: "kuliner-berbintang",
    date: "2026-06-14",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Night food scene with warm lights",
    href: "/articles/kuliner-malam-di-jogja",
    kind: "post",
    isHero: true,
  },
  {
    slug: "cerita-warga-di-kawasan-heritage",
    title: "Cerita warga di kawasan heritage tetap jadi inti dari pembacaan kota",
    excerpt:
      "Ruang publik, rumah tua, dan percakapan kecil di sore hari memberi lapisan yang tidak terlihat dari jauh.",
    category: "Kultur by Pandangan Jogja",
    categorySlug: "kultur-by-pandangan-jogja",
    date: "2026-06-13",
    readingTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1519500528353-2f7f3c4d3e0d?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Heritage district street",
    href: "/articles/cerita-warga-di-kawasan-heritage",
    kind: "paijo_content",
    isHero: true,
  },
];

const featuredCategories: PaijoCategory[] = [
  {
    slug: "insight",
    label: "Insight",
    description: "Liputan mendalam dan catatan editorial yang membantu pembaca melihat konteks kota.",
    image:
      "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=900&q=80",
    href: "/categories/insight",
    accent: "#f1818f",
    count: 18,
  },
  {
    slug: "khas",
    label: "Khas",
    description: "Cerita khas, sudut pandang warga, dan laporan yang terasa dekat dengan keseharian.",
    image:
      "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?auto=format&fit=crop&w=900&q=80",
    href: "/categories/khas",
    accent: "#d8a15d",
    count: 14,
  },
  {
    slug: "kultur",
    label: "Kultur",
    description: "Seni, kebiasaan, dan ruang kota yang membentuk identitas Pandangan Jogja.",
    image:
      "https://images.unsplash.com/photo-1499678329028-101435549a4e?auto=format&fit=crop&w=900&q=80",
    href: "/categories/kultur",
    accent: "#f1818f",
    count: 22,
  },
  {
    slug: "urban-legend",
    label: "Urban Legend",
    description: "Kisah kota, memori lokal, dan cerita yang tumbuh dari percakapan warga.",
    image:
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=900&q=80",
    href: "/categories/urban-legend",
    accent: "#8faccb",
    count: 9,
  },
];

const latestStories: PaijoStory[] = [
  {
    slug: "skena-jogsel-malam-ini",
    title: "Skena Jogsel malam ini lebih ramai dari yang diperkirakan",
    excerpt:
      "Panggung kecil, lampu hangat, dan percakapan yang bertahan sampai larut mengisi daerah ini dengan energi baru.",
    category: "Skena Jogsel",
    categorySlug: "skena-jogsel",
    date: "2026-06-15",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Live music crowd at night",
    href: "/articles/skena-jogsel-malam-ini",
    kind: "paijo_content",
  },
  {
    slug: "derby-istimewa-kota",
    title: "Derby Istimewa membawa memori lama ke halaman depan baru",
    excerpt:
      "Olahraga, identitas lokal, dan kebiasaan berkumpul di tribun masih punya tempat yang kuat di kota ini.",
    category: "Derby Istimewa",
    categorySlug: "derby-istimewa",
    date: "2026-06-14",
    readingTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Football stadium crowd",
    href: "/articles/derby-istimewa-kota",
    kind: "paijo_content",
  },
  {
    slug: "tinggal-di-jogja-yang-terus-berubah",
    title: "Tinggal di Jogja: ritme baru, pilihan lama, dan ruang untuk menetap",
    excerpt:
      "Hunian, mobilitas, dan kebiasaan sehari-hari saling membentuk cara orang melihat kota ini.",
    category: "Tinggal di Jogja",
    categorySlug: "tinggal-di-jogja",
    date: "2026-06-13",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Living room interior",
    href: "/articles/tinggal-di-jogja-yang-terus-berubah",
    kind: "paijo_content",
  },
  {
    slug: "kultur-by-pandangan-jogja-ruang-baru",
    title: "Kultur by Pandangan Jogja membuka ruang baca yang terasa hangat",
    excerpt:
      "Desain editorial yang rapi membantu cerita panjang tetap nyaman diikuti dari awal sampai akhir.",
    category: "Kultur by Pandangan Jogja",
    categorySlug: "kultur-by-pandangan-jogja",
    date: "2026-06-12",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Person reading in a calm interior",
    href: "/articles/kultur-by-pandangan-jogja-ruang-baru",
    kind: "paijo_content",
  },
  {
    slug: "pasar-malam-dan-cerita-warga",
    title: "Pasar malam dan cerita warga yang membuat kota terasa dekat",
    excerpt:
      "Tenda, aroma makanan, dan kerumunan kecil memberi lapisan sosial yang hidup di setiap sudut.",
    category: "News",
    categorySlug: "news",
    date: "2026-06-11",
    readingTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Busy night market scene",
    href: "/articles/pasar-malam-dan-cerita-warga",
    kind: "post",
  },
  {
    slug: "urban-legend-gang-kecil",
    title: "Urban legend gang kecil yang tetap hidup dari satu generasi ke generasi berikutnya",
    excerpt:
      "Cerita lama kota sering bertahan karena terus diceritakan ulang oleh warga dan penikmatnya.",
    category: "Urban Legend",
    categorySlug: "urban-legend",
    date: "2026-06-10",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Narrow alley with city lights",
    href: "/articles/urban-legend-gang-kecil",
    kind: "post",
  },
];

const spotlightStories: PaijoStory[] = [
  {
    slug: "art-space-di-selatan-kota",
    title: "Art space di selatan kota yang menampung ide sampai malam",
    excerpt:
      "Studio kecil, obrolan santai, dan papan pengumuman membuat tempat ini terasa hidup setiap akhir pekan.",
    category: "Khas",
    categorySlug: "khas",
    date: "2026-06-09",
    readingTime: "3 min read",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Creative studio space",
    href: "/articles/art-space-di-selatan-kota",
    kind: "post",
  },
  {
    slug: "kopi-dan-ruang-baca",
    title: "Kopi dan ruang baca yang menyatukan pagi yang tenang",
    excerpt:
      "Satu sudut kecil yang baik sering kali cukup untuk membuat pembaca ingin tinggal lebih lama.",
    category: "Insight",
    categorySlug: "insight",
    date: "2026-06-08",
    readingTime: "2 min read",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Coffee and reading nook",
    href: "/articles/kopi-dan-ruang-baca",
    kind: "post",
  },
  {
    slug: "kuliner-berbintang-akhir-pekan",
    title: "Kuliner Berbintang yang layak masuk agenda akhir pekan",
    excerpt:
      "Pilihan rasa, harga, dan suasana yang memberi alasan kuat untuk kembali lagi.",
    category: "Kuliner Berbintang",
    categorySlug: "kuliner-berbintang",
    date: "2026-06-07",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Restaurant table and dishes",
    href: "/articles/kuliner-berbintang-akhir-pekan",
    kind: "paijo_content",
  },
];

const feedItems: PaijoFeedItem[] = [
  {
    slug: "toko-bercerita-kopi-jalanan",
    title: "Kopi Jalanan dan percakapan yang memulai hari lebih ringan",
    excerpt:
      "Potongan video singkat yang memperlihatkan bagaimana satu lapak sederhana bisa membangun ritual harian.",
    category: "Toko Bercerita",
    embedUrl: "https://www.instagram.com/p/C7X-example/",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Coffee cup on a city street table",
    href: "/special/toko-bercerita-kopi-jalanan",
    date: "2026-06-15",
  },
  {
    slug: "toko-bercerita-bengkel-kreatif",
    title: "Bengkel kreatif yang mengubah sudut kecil menjadi panggung ide",
    excerpt:
      "Video ini mengikuti proses membangun karya dari ruang kerja yang penuh percobaan.",
    category: "Toko Bercerita",
    embedUrl: "https://www.tiktok.com/@pandanganjogja/video/1234567890",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Creative workshop with tools",
    href: "/special/toko-bercerita-bengkel-kreatif",
    date: "2026-06-14",
  },
  {
    slug: "toko-bercerita-toko-tua",
    title: "Toko tua yang masih menyimpan banyak percakapan baik",
    excerpt:
      "Ruang ritel lama yang bertahan karena pelanggan dan cerita yang terus kembali.",
    category: "Toko Bercerita",
    embedUrl: "https://www.instagram.com/p/C7Y-example/",
    image:
      "https://images.unsplash.com/photo-1513682128068-702bb9d8dc61?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Vintage storefront",
    href: "/special/toko-bercerita-toko-tua",
    date: "2026-06-13",
  },
  {
    slug: "toko-bercerita-ritme-malam",
    title: "Ritme malam dari sudut kuliner yang paling ramai dibicarakan",
    excerpt:
      "Klip vertikal yang cocok untuk halaman depan dengan nuansa editorial yang hidup.",
    category: "Toko Bercerita",
    embedUrl: "https://www.tiktok.com/@pandanganjogja/video/9876543210",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Warm night food stall",
    href: "/special/toko-bercerita-ritme-malam",
    date: "2026-06-12",
  },
];

export const seedHomePayload: PaijoHomePayload = {
  brand: {
    name: "Pandangan Jogja",
    tagline: "News portal with an editorial edge",
    secondary: "Inovatif terpercaya",
  },
  menu: {
    primary: [
      { label: "Insight", href: "/categories/insight" },
      { label: "Khas", href: "/categories/khas" },
      { label: "Kultur", href: "/categories/kultur" },
      { label: "News", href: "/categories/news" },
      { label: "Urban Legend", href: "/categories/urban-legend" },
    ],
    special: [
      { label: "Derby Istimewa", href: "/special/derby-istimewa" },
      { label: "Insight", href: "/special/insight" },
      { label: "Kuliner Berbintang", href: "/special/kuliner-berbintang" },
      { label: "Kultur by Pandangan Jogja", href: "/special/kultur-by-pandangan-jogja" },
      { label: "Skena Jogsel", href: "/special/skena-jogsel" },
      { label: "Tinggal di Jogja", href: "/special/tinggal-di-jogja" },
      { label: "Toko Bercerita", href: "/special/toko-bercerita" },
    ],
  },
  hero: heroStories,
  featuredCategories,
  latest: latestStories,
  spotlight: spotlightStories,
  feeds: feedItems,
  sections: {
    latestLabel: "Terus Update",
    feedLabel: "Toko Bercerita",
  },
};

