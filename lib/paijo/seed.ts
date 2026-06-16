import type { PaijoHomePayload, PaijoCategory, PaijoFeedItem, PaijoStory } from "@/lib/paijo/types";

// Data dari WordPress export (pandanganjogja.WordPress.2026-06-14.xml)
// URL gambar menggunakan placeholder publik karena gambar WP ada di server lokal.
// Saat WordPress REST API aktif, gambar asli akan di-load otomatis dari API.

const heroStories: PaijoStory[] = [
  {
    // post_id: 8 | _paijo_is_hero: 1 | category: Kultur
    slug: "aku-penasaran-kenapa-selalu-ada-penjual-bunga-di-perempatan-gramedia-jogja",
    title: "Aku Penasaran Kenapa Selalu Ada Penjual Bunga di Perempatan Gramedia Jogja",
    excerpt:
      "Setiap hari, di bawah terik atau gerimis, sosok-sosok itu tetap ada. Apa yang membuat perempatan ini begitu istimewa bagi mereka?",
    category: "Kultur",
    categorySlug: "kultur",
    date: "2026-06-09",
    readingTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Penjual bunga di perempatan kota Jogja",
    href: "/articles/aku-penasaran-kenapa-selalu-ada-penjual-bunga-di-perempatan-gramedia-jogja",
    kind: "post",
    isHero: true,
  },
  {
    // post_id: 47 | category: News
    slug: "geliat-tugu-di-bawah-orasi-saat-landmark-budaya-jogja-menjadi-saksi-bisu-tuntutan-massa",
    title: "Geliat Tugu di Bawah Orasi: Saat Landmark Budaya Jogja Menjadi Saksi Bisu Tuntutan Massa",
    excerpt:
      "Tugu Yogyakarta bukan sekadar landmark. Dalam beberapa hari ini, ia menjadi panggung diam dari tuntutan yang lantang.",
    category: "News",
    categorySlug: "news",
    date: "2026-06-13",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1519500528353-2f7f3c4d3e0d?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Tugu Yogyakarta saat demo berlangsung",
    href: "/articles/geliat-tugu-di-bawah-orasi-saat-landmark-budaya-jogja-menjadi-saksi-bisu-tuntutan-massa",
    kind: "post",
    isHero: true,
  },
  {
    // post_id: 38 | type: paijo_content | category: Derby Istimewa
    slug: "derby-diy-berwajah-baru-merayakan-sepak-bola-tanpa-air-mata-di-tanah-mataram",
    title: "Derby DIY Berwajah Baru: Merayakan Sepak Bola Tanpa Air Mata di Tanah Mataram",
    excerpt:
      "Rivalitas yang dulu terasa panas kini bertransformasi menjadi perayaan bersama. Derby DIY sedang menemukan wajah barunya.",
    category: "Derby Istimewa",
    categorySlug: "derby-istimewa",
    date: "2026-06-13",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Stadion sepak bola Derby DIY",
    href: "/articles/derby-diy-berwajah-baru-merayakan-sepak-bola-tanpa-air-mata-di-tanah-mataram",
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
    // post_id: 35 | type: paijo_content | category: Kuliner Berbintang
    slug: "gudeg-jogja-riwayat-kuliner-keraton-yang-menaklukkan-lidah-dunia",
    title: "Gudeg Jogja: Riwayat Kuliner Keraton yang Menaklukkan Lidah Dunia",
    excerpt:
      "Dari dapur keraton ke meja makan dunia — sebuah perjalanan panjang gudeg yang kini menjadi identitas tak tergantikan kota ini.",
    category: "Kuliner Berbintang",
    categorySlug: "kuliner-berbintang",
    date: "2026-06-13",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Gudeg Jogja dalam tampah tradisional",
    href: "/articles/gudeg-jogja-riwayat-kuliner-keraton-yang-menaklukkan-lidah-dunia",
    kind: "paijo_content",
  },
  {
    // post_id: 41 | type: paijo_content | category: Skena Jogsel
    slug: "demam-pelana-di-bumi-projotamansari-ketika-pemuda-bantul-ramai-ramai-beralih-ke-olahraga-berkuda",
    title: "Demam Pelana di Bumi Projotamansari: Ketika Pemuda Bantul Ramai-Ramai Beralih ke Olahraga Berkuda",
    excerpt:
      "Olahraga berkuda yang dulu terasa eksklusif kini merambah ke halaman-halaman Bantul. Apa yang menggerakkan tren ini?",
    category: "Skena Jogsel",
    categorySlug: "skena-jogsel",
    date: "2026-06-13",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pemuda Bantul berlatih berkuda",
    href: "/articles/demam-pelana-di-bumi-projotamansari-ketika-pemuda-bantul-ramai-ramai-beralih-ke-olahraga-berkuda",
    kind: "paijo_content",
  },
  {
    // post_id: 44 | type: paijo_content | category: Kultur by Pandangan Jogja
    slug: "bukan-sekadar-hura-hura-menakar-suntikan-energi-kebudayaan-populer-di-panggung-cherrypop",
    title: "Bukan Sekadar Hura-Hura: Menakar Suntikan Energi Kebudayaan Populer di Panggung Cherrypop",
    excerpt:
      "Cherrypop bukan festival biasa. Di balik gegap gempitanya, ada pertanyaan serius soal arah kebudayaan populer kita.",
    category: "Kultur by Pandangan Jogja",
    categorySlug: "kultur-by-pandangan-jogja",
    date: "2026-06-13",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Panggung festival Cherrypop Yogyakarta",
    href: "/articles/bukan-sekadar-hura-hura-menakar-suntikan-energi-kebudayaan-populer-di-panggung-cherrypop",
    kind: "paijo_content",
  },
  {
    // post_id: 50 | type: post | category: News
    slug: "menantang-arus-kemiskinan-kisah-mereka-yang-mengais-asa-di-pinggiran-bantaran-sungai-jogja",
    title: "Menantang Arus Kemiskinan: Kisah Mereka yang Mengais Asa di Pinggiran Bantaran Sungai Jogja",
    excerpt:
      "Di tepian Code dan Winongo, ada keluarga-keluarga yang bertahan dengan cara-cara yang tidak pernah terbayangkan sebelumnya.",
    category: "News",
    categorySlug: "news",
    date: "2026-06-13",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pemukiman di bantaran sungai Jogja",
    href: "/articles/menantang-arus-kemiskinan-kisah-mereka-yang-mengais-asa-di-pinggiran-bantaran-sungai-jogja",
    kind: "post",
  },
  {
    // post_id: 53 | type: post | category: Urban Legend
    slug: "melintasi-zaman-dan-generasi-mengapa-khazanah-nyi-roro-kidul-tetap-sakral-di-era-modern",
    title: "Melintasi Zaman dan Generasi: Mengapa Khazanah Nyi Roro Kidul Tetap Sakral di Era Modern",
    excerpt:
      "Dari dongeng nenek moyang hingga konten viral, sosok Nyi Roro Kidul terus hadir dan mengukuhkan diri di imajinasi kolektif Jogja.",
    category: "Urban Legend",
    categorySlug: "urban-legend",
    date: "2026-06-13",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Pantai selatan Jogja dalam nuansa mistis",
    href: "/articles/melintasi-zaman-dan-generasi-mengapa-khazanah-nyi-roro-kidul-tetap-sakral-di-era-modern",
    kind: "post",
  },
  {
    // post_id: 86 | type: paijo_content | category: Tinggal di Jogja
    slug: "menatap-jogja-hari-ini-bagaimana-kos-kontrak-dan-rumah-pribadi-menawarkan-level-bahagia-yang-sama",
    title: "Menatap Jogja Hari Ini: Bagaimana Kos, Kontrak, dan Rumah Pribadi Menawarkan Level Bahagia yang Sama",
    excerpt:
      "Tinggal di Jogja punya banyak cara. Ternyata, kebahagiaannya bukan soal status hunian — melainkan soal bagaimana kamu menjalaninya.",
    category: "Tinggal di Jogja",
    categorySlug: "tinggal-di-jogja",
    date: "2026-06-14",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1487611459768-bd414656ea10?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Kamar kos yang nyaman di Yogyakarta",
    href: "/articles/menatap-jogja-hari-ini-bagaimana-kos-kontrak-dan-rumah-pribadi-menawarkan-level-bahagia-yang-sama",
    kind: "paijo_content",
  },
];

const spotlightStories: PaijoStory[] = [
  {
    // post_id: 89 | type: paijo_content | category: Tinggal di Jogja
    slug: "burjo-dan-angkringan-mulai-terpinggirkan-ternyata-ini-rahasia-kuliner-lokal-jogja-tetap-bertahan-di-tengah-modernisasi",
    title: "Burjo dan Angkringan Mulai Terpinggirkan: Rahasia Kuliner Lokal Jogja Bertahan di Tengah Modernisasi",
    excerpt:
      "Café viral datang dan pergi, tapi angkringan tetap ada. Rahasia ketahanannya tersimpan di balik kesederhanaan yang sering diremehkan.",
    category: "Tinggal di Jogja",
    categorySlug: "tinggal-di-jogja",
    date: "2026-06-14",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Angkringan khas Jogja di malam hari",
    href: "/articles/burjo-dan-angkringan-mulai-terpinggirkan-ternyata-ini-rahasia-kuliner-lokal-jogja-tetap-bertahan-di-tengah-modernisasi",
    kind: "paijo_content",
  },
  {
    // post_id: 92 | type: paijo_content | category: Tinggal di Jogja
    slug: "dilema-aspal-yogyakarta-menakar-nasib-andong-dan-becak-di-tengah-deru-digitalisasi-transportasi",
    title: "Dilema Aspal Yogyakarta: Menakar Nasib Andong dan Becak di Tengah Deru Digitalisasi Transportasi",
    excerpt:
      "Andong dan becak adalah jiwa kota wisata ini. Tapi di era ojol dan kendaraan listrik, apakah mereka masih punya tempat berpijak?",
    category: "Tinggal di Jogja",
    categorySlug: "tinggal-di-jogja",
    date: "2026-06-14",
    readingTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Andong melintas di jalan Malioboro",
    href: "/articles/dilema-aspal-yogyakarta-menakar-nasib-andong-dan-becak-di-tengah-deru-digitalisasi-transportasi",
    kind: "paijo_content",
  },
  {
    // post_id: 80 | type: post | category: News
    slug: "menjaga-jiwa-kota-pelajar-di-tengah-gempuran-hotel-dan-kafe-estetik",
    title: "Menjaga Jiwa Kota Pelajar di Tengah Gempuran Hotel dan Kafe Estetik",
    excerpt:
      "Jogja berubah cepat. Tapi apakah identitasnya sebagai kota pelajar bisa bertahan dari serbuan kapital yang terus mengalir?",
    category: "News",
    categorySlug: "news",
    date: "2026-06-14",
    readingTime: "4 min read",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=900&q=80",
    imageAlt: "Kafe estetik di kawasan kampus Jogja",
    href: "/articles/menjaga-jiwa-kota-pelajar-di-tengah-gempuran-hotel-dan-kafe-estetik",
    kind: "post",
  },
];

const feedItems: PaijoFeedItem[] = [
  {
    // post_id: 97 | toko_bercerita | Gudeg Pawon
    slug: "gudeg-pawon-sensasi-kuliner-tengah-malam-langsung-dari-dapur",
    title: "Gudeg Pawon, Sensasi Kuliner Tengah Malam Langsung dari Dapur",
    excerpt:
      "Antri dari tengah malam, makan langsung di samping tungku kayu. Pengalaman Gudeg Pawon yang tidak bisa ditemukan di tempat lain.",
    category: "Toko Bercerita",
    embedUrl: "https://www.instagram.com/pandanganjogja/",
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Gudeg Pawon Yogyakarta suasana malam",
    href: "/special/gudeg-pawon-sensasi-kuliner-tengah-malam-langsung-dari-dapur",
    date: "2026-06-14",
  },
  {
    // post_id: 111 (Barber Brown) | toko_bercerita
    slug: "barber-brown-barbershop-dengan-jiwa-lokal-yang-kuat",
    title: "Barber Brown: Barbershop dengan Jiwa Lokal yang Kuat",
    excerpt:
      "Di antara barbershop franchise yang menjamur, Barber Brown memilih jalannya sendiri — otentik, komunal, dan khas Jogja.",
    category: "Toko Bercerita",
    embedUrl: "https://www.instagram.com/pandanganjogja/",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Interior Barber Brown Yogyakarta",
    href: "/special/barber-brown-barbershop-dengan-jiwa-lokal-yang-kuat",
    date: "2026-06-14",
  },
  {
    // post_id: 115 (Kava-Naa) | toko_bercerita
    slug: "kava-naa-cerita-kopi-dari-sudut-yang-tak-terduga",
    title: "Kava-Naa: Cerita Kopi dari Sudut yang Tak Terduga",
    excerpt:
      "Kava-Naa hadir dengan konsep yang sederhana: kopi bagus, ruang nyaman, dan percakapan yang mengalir tanpa terburu-buru.",
    category: "Toko Bercerita",
    embedUrl: "https://www.instagram.com/pandanganjogja/",
    image:
      "https://images.unsplash.com/photo-1513682128068-702bb9d8dc61?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Kedai kopi Kava-Naa Yogyakarta",
    href: "/special/kava-naa-cerita-kopi-dari-sudut-yang-tak-terduga",
    date: "2026-06-14",
  },
  {
    // post_id: 106 (Kostbox) | toko_bercerita
    slug: "kostbox-id-penitipan-barang-solusi-cerdas-untuk-anak-kos-jogja",
    title: "Kostbox.id: Penitipan Barang Solusi Cerdas untuk Anak Kos Jogja",
    excerpt:
      "Pindah kos tapi barang tak tertampung? Kostbox hadir sebagai solusi praktis yang lahir dari pemahaman mendalam kebutuhan mahasiswa.",
    category: "Toko Bercerita",
    embedUrl: "https://www.instagram.com/pandanganjogja/",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    imageAlt: "Layanan penitipan barang Kostbox.id Yogyakarta",
    href: "/special/kostbox-id-penitipan-barang-solusi-cerdas-untuk-anak-kos-jogja",
    date: "2026-06-14",
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
