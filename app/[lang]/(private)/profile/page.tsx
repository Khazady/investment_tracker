import Typography from "@/components/ui/Typography/Typography";
import { getDictionary } from "@/lib/dictionaries/server";
import { getCurrentUser } from "@/lib/server/getCurrentUser";
import type { PageParams } from "@/lib/types/app";
import ProfileForm from "./_components/ProfileForm";

export default async function ProfilePage({ params }: PageParams) {
  const dict = await getDictionary(params);

  const user = await getCurrentUser();

  if (!user) {
    return <Typography variant="body"> {dict.profile.userNotFound}</Typography>;
  }

  return (
    <>
      <Typography align="center" variant="h1">
        {dict.profile.title}
      </Typography>
      <ProfileForm
        user={{
          username: user.username,
          // bio: user.bio ?? "",
          // avatarUrl: user.avatarUrl ?? "",
        }}
      />
    </>
  );
}
