"use client";

import FormFields from "@/app/[lang]/(public)/auth/_components/AuthForm/FormFields";
import SubmitButton from "@/components/common/SubmitButton/SubmitButton";
import ErrorMessage from "@/components/ui/ErrorMessage/ErrorMessage";
import type { ISignUpForm } from "@/lib/actions/signup";
import { signup } from "@/lib/actions/signup";
import { useDictionary } from "@/lib/hooks/useDictionary";
import { useActionState } from "react";
import styles from "./AuthForm.module.css";

function signinPlaceholder(prevState: ISignUpForm, formData: FormData) {
  return {} as Promise<ISignUpForm>;
}
const initialState: ISignUpForm = {
  error: undefined,
  message: undefined,
  fieldErrors: undefined,
};

function AuthForm({ isSignUpPage }: { isSignUpPage: boolean }) {
  const dict = useDictionary();
  const [state, dispatch] = useActionState(
    isSignUpPage ? signup : signinPlaceholder,
    initialState,
  );

  return (
    <form action={dispatch} className={styles.form}>
      <FormFields isSignUpPage={isSignUpPage} errors={state.fieldErrors} />

      {state.error && <ErrorMessage message={state.error} />}
      {state.message && <ErrorMessage message={state.message} />}

      <SubmitButton
        text={isSignUpPage ? dict.auth.signup.submit : dict.auth.signin.submit}
      />
    </form>
  );
}

export default AuthForm;
