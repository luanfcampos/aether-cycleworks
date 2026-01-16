"use client";

import { useQueryFilters } from "@/hooks/useQueryFilters";
import { useDebouncedCallback } from "use-debounce";

export function SearchFilter() {
  const { searchParams, setSingleQuery } = useQueryFilters();

  const debounced = useDebouncedCallback((value) => {
    setSingleQuery("q", value);
  }, 300);

  return (
    <div>
      <label htmlFor="search" className="text-sm font-semibold text-zinc-400 block mb-2">Search</label>
      <input
        id="search"
        type="text"
        defaultValue={searchParams.get("q") || ""}
        onChange={(e) => debounced(e.target.value)}
        placeholder="Search for products..."
        className="w-full bg-zinc-900 border border-zinc-800 focus:ring-2 focus:ring-brand focus:border-brand transition-colors rounded-none p-3 text-sm"
      />
    </div>
  );
}
