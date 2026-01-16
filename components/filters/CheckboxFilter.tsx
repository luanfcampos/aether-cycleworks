"use client";

import { useQueryFilters } from "@/hooks/useQueryFilters";

interface CheckboxFilterProps {
  title: string;
  name: string;
  options: string[];
}

export function CheckboxFilter({ title, name, options }: CheckboxFilterProps) {
  const { toggleArrayQuery, getQueryArray } = useQueryFilters();
  const selectedValues = getQueryArray(name);

  return (
    <div>
      <h3 className="text-sm font-semibold text-zinc-400 block mb-2">{title}</h3>
      <div className="space-y-2 max-h-48 overflow-y-auto">
        {options.map((option) => (
          <div key={option} className="flex items-center">
            <input
              id={`${name}-${option}`}
              type="checkbox"
              checked={selectedValues.includes(option)}
              onChange={() => toggleArrayQuery(name, option)}
              className="h-4 w-4 rounded-none border-zinc-700 bg-zinc-900 text-brand focus:ring-brand"
            />
            <label htmlFor={`${name}-${option}`} className="ml-3 text-sm text-zinc-300">
              {option}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
