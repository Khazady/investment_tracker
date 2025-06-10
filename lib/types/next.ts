import type { ReactNode } from "react";
import type { Locale } from "../dictionaries/client";

export type PageParams = Readonly<{
  params: Promise<{ lang: Locale }>;
}>;

export type LayoutParams = Readonly<{
  params: Promise<{ lang: Locale }>;
  children: ReactNode;
}>;
