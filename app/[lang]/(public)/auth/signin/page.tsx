import AuthSwitchLink from "@/app/[lang]/(public)/auth/_components/AuthSwitchLink/AuthSwitchLink";
import Typography from "@/components/ui/Typography/Typography";
import { getDictionary } from "@/lib/dictionaries/server";
import type { PageParams } from "@/lib/types/next";
import AuthForm from "../_components/AuthForm/AuthForm";

export default async function SignInPage({ params }: PageParams) {
  const dict = await getDictionary(params);

  return (
    <>
      <Typography variant="h1">{dict.auth.signin.title}</Typography>
      <AuthForm isSignUpPage={false} />
      <AuthSwitchLink isSignUpPage={false} />
    </>
  );
}
