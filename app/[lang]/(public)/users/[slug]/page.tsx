import Image from "@/components/ui/Image/Image";
import Typography from "@/components/ui/Typography/Typography";
import { getUser } from "@/lib/db-queries/user";
import { getDictionary } from "@/lib/dictionaries/server";
import { connectDB } from "@/lib/mongodb";
import type { SlugPageParams } from "@/lib/types/app";
import { formatDate } from "@/lib/utils/formatDate";

export default async function UserPage({ params }: SlugPageParams) {
  const dict = await getDictionary(params);
  const { slug, lang } = await params;

  await connectDB();
  const user = await getUser({ publicSlug: slug });

  if (!user) {
    return <Typography variant="body">{dict.profile.userNotFound}</Typography>;
  }

  const joinedDate = formatDate(user.createdAt, lang);

  return (
    <>
      {user.avatarUrl && (
        <Image src={user.avatarUrl} alt={user.username} size={128} />
      )}
      <Typography align="center" variant="h1">
        {user.username}
      </Typography>
      {user.bio && (
        <Typography align="center" variant="body">
          {user.bio}
        </Typography>
      )}
      <Typography align="center" color="muted">
        {dict.profile.joined} {joinedDate}
      </Typography>
    </>
  );
}
