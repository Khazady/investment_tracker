import type { Locale } from "@/lib/dictionaries/client";

export function formatDate(
  date: Date,
  lang: Locale,
  options?: Intl.DateTimeFormatOptions,
) {
  return new Intl.DateTimeFormat(lang, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...options,
  }).format(date);
}
