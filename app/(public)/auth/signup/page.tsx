import styles from './page.module.css';

export default function SignUpPage() {
  return (
    <div className={styles.wrapper}>
      <form className={styles.form} action="#" method="post">
        <h1>Sign Up</h1>
        <label>
          Email
          <input type="email" name="email" required />
        </label>
        <label>
          Password
          <input type="password" name="password" required />
        </label>
        <label>
          Confirm Password
          <input type="password" name="confirm" required />
        </label>
        <button type="submit">Create account</button>
      </form>
    </div>
  );
}
