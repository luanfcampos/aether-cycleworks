"use client";

import { useQueryFilters } from "@/hooks/useQueryFilters";

export function SortFilter() {
  const { searchParams, setSingleQuery } = useQueryFilters();
  const sortBy = searchParams.get("sortBy") || "newest";

  const options = [
    { value: "newest", label: "Newest" },
    { value: "price-asc", label: "Price: Low to High" },
    { value: "price-desc", label: "Price: High to Low" },
  ];

  return (
    <div>
      <label htmlFor="sort" className="text-sm font-semibold text-zinc-400 block mb-2">Sort by</label>
      <select
        id="sort"
        value={sortBy}
        onChange={(e) => setSingleQuery("sortBy", e.target.value)}
        className="w-full bg-zinc-900 border border-zinc-800 focus:ring-2 focus:ring-brand focus:border-brand transition-colors rounded-none p-3 text-sm"
      >
        {options.map(option => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
}
