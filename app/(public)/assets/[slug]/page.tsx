// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function Page({ params }: any) {
  return <p>Asset: {params.slug}</p>;
}
