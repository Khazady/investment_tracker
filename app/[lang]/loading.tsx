import { getDictionary } from "@/lib/dictionaries";

export default async function Loading({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang as 'en' | 'be');
  return <p>{dict.loading.message}</p>;
}
