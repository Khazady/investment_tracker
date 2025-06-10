import Typography from "@/components/ui/Typography/Typography";
import type { Locale } from "@/lib/dictionaries/client";
import { getDictionary } from "@/lib/dictionaries/server";
import AuthForm from "../_components/AuthForm/AuthForm";

export default async function SignUpPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const dict = await getDictionary(params);

  return (
    <>
      <Typography variant="h1">{dict.auth.signup.title}</Typography>
      <AuthForm isSignUp />
    </>
  );
}
