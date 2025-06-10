import Typography from "@/components/ui/Typography/Typography";
import { ROUTES } from "@/lib/constants/routes";
import type { Dictionary } from "@/lib/types/app";
import Link from "next/link";
import styles from "./AuthSwitchLink.module.css";

interface AuthSwitchLinkProps {
  isSignUpPage: boolean;
  dict: Dictionary;
}

function AuthSwitchLink({ isSignUpPage, dict }: AuthSwitchLinkProps) {
  const questionText = isSignUpPage
    ? dict.auth.signup.signupQuestion
    : dict.auth.signin.loginQuestion;
  const linkText = isSignUpPage
    ? dict.auth.signup.signupLink
    : dict.auth.signin.loginLink;
  const targetRoute = isSignUpPage ? ROUTES.AUTH.SIGNIN : ROUTES.AUTH.SIGNUP;

  return (
    <div className={styles.container}>
      <Typography align="center" variant="caption">
        {questionText}{" "}
        <Link href={targetRoute} className={styles.link}>
          {linkText}
        </Link>
      </Typography>
    </div>
  );
}

export default AuthSwitchLink;
