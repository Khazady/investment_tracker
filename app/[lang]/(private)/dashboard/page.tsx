import { getDictionary } from '@/lib/dictionaries/server'

export default async function Dashboard({
  params: { lang },
}: {
  params: { lang: string }
}) {
  const dict = await getDictionary(lang as 'en' | 'be')

  return (
    <div>
      <h1>{dict.dashboard.title}</h1>
      <h2>{dict.dashboard.welcome}</h2>
      <p>{dict.dashboard.summary}</p>
    </div>
  )
} 