"use client";

import Button from "@/components/ui/Button/Button";
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
  isSignUp: boolean;
}

function SubmitButton({ text }: { text: string }) {
  const { pending } = useFormStatus();
  const dict = useDictionary();

  return (
    <Button type="submit" fullWidth isLoading={pending}>
      {pending ? dict.loading.message : text}
    </Button>
  );
}
function signinPlaceholder(prevState: FormState, formData: FormData) {
  return {} as Promise<FormState>;
}
const initialState: FormState = {
  error: undefined,
  message: undefined,
  fieldErrors: {},
};

function AuthForm({ isSignUp }: AuthFormProps) {
  const dict = useDictionary();
  const [state, formAction] = useActionState(
    isSignUp ? signup : signinPlaceholder,
    initialState,
  );

  return (
    <form action={formAction} className={styles.form}>
      <Input
        label={dict.auth.signin.email}
        type="email"
        name="email"
        required
        error={state.fieldErrors?.email}
      />

      <Input
        label={dict.auth.signin.password}
        type="password"
        name="password"
        required
        error={state.fieldErrors?.password}
      />

      {isSignUp && (
        <Input
          label={dict.auth.signup.confirmPassword}
          type="password"
          name="confirm"
          required
          error={state.fieldErrors?.confirm}
        />
      )}

      {(state.error || state.message) && (
        <Typography variant="caption" color="error">
          {state.error || state.message}
        </Typography>
      )}

      <SubmitButton
        text={isSignUp ? dict.auth.signup.submit : dict.auth.signin.submit}
      />
    </form>
  );
}

export default AuthForm;
