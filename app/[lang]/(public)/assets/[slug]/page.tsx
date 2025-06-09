export default function Page({ params }: {params: {slug: string}}) {
  return <p>Asset: {params.slug}</p>;
}
