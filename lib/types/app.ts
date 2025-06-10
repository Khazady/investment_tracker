import type en from "@/lib/dictionaries/en.json";
import type { ReactNode } from "react";
import type { Locale } from "../dictionaries/client";

export type Dictionary = typeof en;
export type PageParams = Readonly<{
  params: Promise<{ lang: Locale }>;
}>;

export type LayoutParams = Readonly<{
  params: Promise<{ lang: Locale }>;
  children: ReactNode;
}>;
