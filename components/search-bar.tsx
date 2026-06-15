"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-foreground/50" />
      <input
        type="search"
        placeholder="Cari Artikel ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-9 w-[120px] rounded-full border border-black/10 bg-white/80 pl-8 pr-3 text-[12px] shadow-sm outline-none transition-all focus:w-[160px] focus:bg-white md:w-[160px] md:focus:w-[220px]"
      />
    </form>
  );
}
