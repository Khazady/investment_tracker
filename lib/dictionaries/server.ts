import "server-only";
import type { Locale } from "./client";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  be: () => import("./be.json").then((module) => module.default),
};

export const getDictionary = async (params: Promise<{ lang: Locale }>) =>
  dictionaries[(await params).lang]();
