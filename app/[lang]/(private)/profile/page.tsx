import Typography from "@/components/ui/Typography/Typography";
import { getDictionary } from "@/lib/dictionaries/server";
import { getCurrentUser } from "@/lib/server/getCurrentUser";
import type { PageProps } from "@/lib/types/app";
import PasswordForm from "./_components/PassowrdForm/PasswordForm";
import ProfileForm from "./_components/ProfileForm/ProfileForm";

// SSR: reads cookies and queries MongoDB on each request
export default async function ProfilePage({ params }: PageProps) {
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
          bio: user.bio,
          avatarUrl: user.avatarUrl,
        }}
      />
      <PasswordForm />
    </>
  );
}
