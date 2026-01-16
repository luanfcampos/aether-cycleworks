"use client";

import { ReadonlyURLSearchParams } from "next/navigation";

export const createQueryString = (
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams);
  params.set(name, value);
  return params.toString();
};

export const updateOrDeleteQueryString = (
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set(name, value);
  } else {
    params.delete(name);
  }
  return params.toString();
};

export const toggleArrayQueryString = (
  searchParams: ReadonlyURLSearchParams,
  name: string,
  value: string
) => {
  const params = new URLSearchParams(searchParams);
  const currentValues = params.get(name)?.split(",") || [];
  const newValues = currentValues.includes(value)
    ? currentValues.filter((v) => v !== value)
    : [...currentValues, value];

  if (newValues.length > 0) {
    params.set(name, newValues.join(","));
  } else {
    params.delete(name);
  }

  return params.toString();
};
