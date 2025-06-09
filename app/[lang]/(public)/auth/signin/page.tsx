import { Input } from "@/components/ui/Input/Input";
import { Typography } from "@/components/ui/Typography/Typography";
import styles from "./page.module.css";

export default function SignInPage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} action="#" method="post">
        <Typography variant="h1">Sign In</Typography>
        <Input label="Email" type="email" name="email" required />
        <Input label="Password" type="password" name="password" required />
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
