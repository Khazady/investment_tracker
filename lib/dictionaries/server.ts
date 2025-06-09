import "server-only";
import { Locale } from "./client";

const dictionaries = {
  en: () => import("./en.json").then((module) => module.default),
  be: () => import("./be.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) => dictionaries[locale]();
