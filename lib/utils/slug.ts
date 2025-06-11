import type { FilterQuery, Model } from "mongoose";

export async function generateUniqueSlug<T extends Record<string, unknown>>(
  model: Model<T>,
  base: string,
  slugField: keyof T & string = "slug",
): Promise<string> {
  let slug = base;
  let counter = 1;
  const query: FilterQuery<T> = { [slugField]: slug } as FilterQuery<T>;
  while (await model.exists(query)) {
    slug = `${base}-${counter}`;
    (query as Record<string, string>)[slugField] = slug;
    counter += 1;
  }
  return slug;
}
