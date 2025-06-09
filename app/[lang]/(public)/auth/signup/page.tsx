import Button from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { Typography } from "@/components/ui/Typography/Typography";
import { getDictionary } from "@/lib/dictionaries/server";
import styles from "./page.module.css";

export default async function SignUpPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang as "en" | "be");

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} action="#" method="post">
        <Typography variant="h1">{dict.auth.signup.title}</Typography>
        <Input
          label={dict.auth.signup.email}
          type="email"
          name="email"
          required
        />
        <Input
          label={dict.auth.signup.password}
          type="password"
          name="password"
          required
        />
        <Input
          label={dict.auth.signup.confirmPassword}
          type="password"
          name="confirm"
          required
        />
        <Button type="submit" fullWidth>
          {dict.auth.signup.submit}
        </Button>
      </form>
    </div>
  );
}
