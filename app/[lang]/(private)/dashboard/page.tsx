import Typography from "@/components/ui/Typography/Typography";
import { getDictionary } from "@/lib/dictionaries/server";
import type { PageProps } from "@/lib/types/app";

export default async function Dashboard({ params }: PageProps) {
  const dict = await getDictionary(params);

  return (
    <>
      <Typography variant="h1" align="center">
        {dict.dashboard.title}
      </Typography>
      <Typography variant="h2" align="center">
        {dict.dashboard.welcome}
      </Typography>
      <Typography variant="body" align="center">
        {dict.dashboard.summary}
      </Typography>
    </>
  );
}
