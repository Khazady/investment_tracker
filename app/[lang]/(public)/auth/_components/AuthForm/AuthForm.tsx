"use client";

import FormFields from "@/app/[lang]/(public)/auth/_components/AuthForm/FormFields";
import SubmitButton from "@/components/common/SubmitButton/SubmitButton";
import ErrorMessage from "@/components/ui/ErrorMessage/ErrorMessage";
import type { ISignInForm } from "@/lib/actions/signin";
import { signin } from "@/lib/actions/signin";
import type { ISignUpForm } from "@/lib/actions/signup";
import { signup } from "@/lib/actions/signup";
import { useDictionary } from "@/lib/hooks/useDictionary";
import { useActionState } from "react";
import Form from "@/components/common/Form/Form";

const initialState: ISignUpForm | ISignInForm = {
  error: undefined,
  message: undefined,
  fieldErrors: undefined,
};

function AuthForm({ isSignUpPage }: { isSignUpPage: boolean }) {
  const dict = useDictionary();
  const [state, dispatch, pending] = useActionState(
    isSignUpPage ? signup : signin,
    initialState,
  );

  return (
    <Form action={dispatch}>
      <FormFields isSignUpPage={isSignUpPage} errors={state.fieldErrors} />

      {!pending && state.error && <ErrorMessage message={state.error} />}
      {!pending && state.message && <ErrorMessage message={state.message} />}

      <SubmitButton
        text={isSignUpPage ? dict.auth.signup.submit : dict.auth.signin.submit}
      />
    </Form>
  );
}

export default AuthForm;
