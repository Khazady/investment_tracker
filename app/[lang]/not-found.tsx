import { getDictionary } from "@/lib/dictionaries/server";

export default async function NotFound({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang as 'en' | 'be');
  return <p>{dict.notFound.message}</p>;
}
