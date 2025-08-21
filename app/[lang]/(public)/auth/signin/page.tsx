import AuthSwitchLink from "@/app/[lang]/(public)/auth/_components/AuthSwitchLink/AuthSwitchLink";
import Typography from "@/components/ui/Typography/Typography";
import { getDictionary } from "@/lib/dictionaries/server";
import type { PageProps } from "@/lib/types/app";
import AuthForm from "../_components/AuthForm/AuthForm";

// SSG: static sign-in page generated at build time
export default async function SignInPage({ params }: PageProps) {
  const dict = await getDictionary(params);

  return (
    <>
      <Typography align="center" variant="h1">
        {dict.auth.signin.title}
      </Typography>
      <AuthForm isSignUpPage={false} />
      <AuthSwitchLink isSignUpPage={false} dict={dict} />
    </>
  );
}
