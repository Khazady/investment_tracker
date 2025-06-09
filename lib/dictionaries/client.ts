import beDict from "./be.json";
import enDict from "./en.json";

export const locales = ["en", "be"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale = "en" as const;

// Client-side dictionaries
export const dictionaries = {
  en: enDict,
  be: beDict,
} as const; 