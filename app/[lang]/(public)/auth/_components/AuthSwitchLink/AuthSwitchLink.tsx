"use client";

import Typography from "@/components/ui/Typography/Typography";
import { ROUTES } from "@/lib/constants/routes";
import { useDictionary } from "@/lib/hooks/useDictionary";
import Link from "next/link";
import styles from "./AuthSwitchLink.module.css";

interface AuthSwitchLinkProps {
  isSignUpPage: boolean;
}

function AuthSwitchLink({ isSignUpPage }: AuthSwitchLinkProps) {
  const dict = useDictionary();

  const questionText = isSignUpPage
    ? dict.auth.signup.signupQuestion
    : dict.auth.signin.loginQuestion;
  const linkText = isSignUpPage
    ? dict.auth.signup.signupLink
    : dict.auth.signin.loginLink;
  const targetRoute = isSignUpPage ? ROUTES.AUTH.SIGNIN : ROUTES.AUTH.SIGNUP;

  return (
    <Typography variant="caption" className={styles.container}>
      {questionText}{" "}
      <Link href={targetRoute} className={styles.link}>
        {linkText}
      </Link>
    </Typography>
  );
}

export default AuthSwitchLink;
