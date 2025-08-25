import type en from "@/lib/dictionaries/en.json";
import type { ReactNode } from "react";
import type { Locale } from "../dictionaries/client";

export type Dictionary = typeof en;

export type PageProps = Readonly<{
  params: Promise<{ lang: Locale }>;
}>;

export type SlugPageProps = PageProps &
  Readonly<{
    params: Promise<{ slug: string }>;
  }>;

export type LayoutProps = Readonly<{
  params: Promise<{ lang: Locale }>;
  children: ReactNode;
}>;

export enum ApiSourceEnum {
  crypto_market = "crypto_market",
}
