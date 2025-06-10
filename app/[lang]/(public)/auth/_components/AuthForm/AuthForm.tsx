"use client";

import SubmitButton from "@/components/common/SubmitButton/SubmitButton";
import Input from "@/components/ui/Input/Input";
import Typography from "@/components/ui/Typography/Typography";
import { signup } from "@/lib/actions/signup";
import { useDictionary } from "@/lib/hooks/useDictionary";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import styles from "./AuthForm.module.css";

interface FormState {
  error?: string;
  message?: string;
  fieldErrors?: {
    email?: string;
    password?: string;
    confirm?: string;
  };
}

interface AuthFormProps {
  isSignUpPage: boolean;
}

function signinPlaceholder(prevState: FormState, formData: FormData) {
  return {} as Promise<FormState>;
}
const initialState: FormState = {
  error: undefined,
  message: undefined,
  fieldErrors: {},
};

function AuthForm({ isSignUpPage }: AuthFormProps) {
  const dict = useDictionary();
  const [state, formAction] = useActionState(
    isSignUpPage ? signup : signinPlaceholder,
    initialState,
  );
  const { pending } = useFormStatus();

  return (
    <form action={formAction} className={styles.form}>
      <Input
        id="email"
        type="email"
        name="email"
        required
        error={state.fieldErrors?.email}
        autoCapitalize="none"
        autoComplete="email"
        autoCorrect="off"
        placeholder={
          isSignUpPage
            ? dict.auth.signup.placeholders.email
            : dict.auth.signin.placeholders.email
        }
        disabled={pending}
        label={dict.auth.signin.email}
      />

      <Input
        id="password"
        type="password"
        name="password"
        required
        autoCapitalize="none"
        autoComplete="new-password"
        autoCorrect="off"
        error={state.fieldErrors?.password}
        placeholder={
          isSignUpPage
            ? dict.auth.signup.placeholders.password
            : dict.auth.signin.placeholders.password
        }
        disabled={pending}
        label={dict.auth.signin.password}
      />

      {isSignUpPage && (
        <Input
          label={dict.auth.signup.confirmPassword}
          type="password"
          name="confirm"
          required
          error={state.fieldErrors?.confirm}
          placeholder={dict.auth.signup.placeholders.confirmPassword}
          autoCapitalize="none"
          autoComplete="new-password"
          autoCorrect="off"
          disabled={pending}
        />
      )}

      {(state.error || state.message) && (
        <Typography variant="caption" color="error">
          {state.error || state.message}
        </Typography>
      )}

      <SubmitButton
        text={isSignUpPage ? dict.auth.signup.submit : dict.auth.signin.submit}
      />
    </form>
  );
}

export default AuthForm;
