"use client";

import Input from "@/components/ui/Input/Input";
import type { ISignUpForm } from "@/lib/actions/signup";
import { useDictionary } from "@/lib/hooks/useDictionary";
import { useFormStatus } from "react-dom";

function FormFields({
  isSignUpPage,
  errors,
}: {
  isSignUpPage: boolean;
  errors: ISignUpForm["fieldErrors"];
}) {
  const dict = useDictionary();

  const { pending } = useFormStatus();

  return (
    <>
      <Input
        id="email"
        type="email"
        name="email"
        required
        errors={errors?.email}
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
        errors={errors?.password}
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
          errors={errors?.confirm}
          placeholder={dict.auth.signup.placeholders.confirmPassword}
          autoCapitalize="none"
          autoComplete="new-password"
          autoCorrect="off"
          disabled={pending}
        />
      )}
    </>
  );
}
export default FormFields;
