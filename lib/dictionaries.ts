import "server-only";
import beDict from "@/lib/dictionaries/be.json";
import enDict from "@/lib/dictionaries/en.json";

export const locales = ["en", "be"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = "en" as const;

const dictionaries = {
  en: () =>
    import("@/lib/dictionaries/en.json").then((module) => module.default),
  be: () =>
    import("@/lib/dictionaries/be.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();

// Client-side dictionaries
export const clientDictionaries = {
  en: enDict,
  be: beDict,
} as const;
