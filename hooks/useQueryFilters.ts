"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import {
  createQueryString,
  toggleArrayQueryString,
  updateOrDeleteQueryString,
} from "@/lib/query-params";

export function useQueryFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateQuery = useCallback(
    (newQuery: string) => {
      // Usando 'replace' para não adicionar ao histórico de navegação
      router.replace(`${pathname}?${newQuery}`, { scroll: false });
    },
    [pathname, router]
  );

  const setSingleQuery = useCallback(
    (name: string, value: string) => {
      const newQuery = updateOrDeleteQueryString(searchParams, name, value);
      updateQuery(newQuery);
    },
    [searchParams, updateQuery]
  );

  const toggleArrayQuery = useCallback(
    (name: string, value: string) => {
      const newQuery = toggleArrayQueryString(searchParams, name, value);
      updateQuery(newQuery);
    },
    [searchParams, updateQuery]
  );
  
  const getQueryArray = useCallback(
    (name: string) => {
      return searchParams.get(name)?.split(',') || [];
    },
    [searchParams]
  );

  return {
    searchParams,
    setSingleQuery,
    toggleArrayQuery,
    getQueryArray
  };
}
