import styles from './page.module.css';

export default function SignInPage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} action="#" method="post">
        <h1>Sign In</h1>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <button type="submit">Log in</button>
      </form>
    </div>
  );
}
