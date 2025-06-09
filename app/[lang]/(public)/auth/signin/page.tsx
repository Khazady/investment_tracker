import Button from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";
import { Typography } from "@/components/ui/Typography/Typography";
import { getDictionary } from "@/lib/dictionaries/server";
import styles from "./page.module.css";

export default async function SignInPage({
  params: { lang },
}: {
  params: { lang: string };
}) {
  const dict = await getDictionary(lang as "en" | "be");

  return (
    <div className={styles.wrapper}>
      <form className={styles.form} action="#" method="post">
        <Typography variant="h1">{dict.auth.signin.title}</Typography>
        <Input
          label={dict.auth.signin.email}
          type="email"
          name="email"
          required
        />
        <Input
          label={dict.auth.signin.password}
          type="password"
          name="password"
          required
        />
        <Button type="submit" fullWidth>
          {dict.auth.signin.submit}
        </Button>
      </form>
    </div>
  );
}
