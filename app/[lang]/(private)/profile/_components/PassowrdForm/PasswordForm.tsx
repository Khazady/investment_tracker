"use client";

import SubmitButton from "@/components/common/SubmitButton/SubmitButton";
import ErrorMessage from "@/components/ui/ErrorMessage/ErrorMessage";
import Input from "@/components/ui/Input/Input";
import {
  type IUpdatePasswordForm,
  updatePassword,
} from "@/lib/actions/updatePassword";
import { useDictionary } from "@/lib/hooks/useDictionary";
import { useActionState } from "react";
import Form from "@/components/common/Form/Form";

const initialState: IUpdatePasswordForm = {
  error: undefined,
  message: undefined,
  fieldErrors: undefined,
};

export default function PasswordForm() {
  const dict = useDictionary();
  const [state, dispatch, pending] = useActionState(
    updatePassword,
    initialState,
  );

  return (
    <Form action={dispatch}>
      <Input
        id="currentPassword"
        name="currentPassword"
        type="password"
        autoComplete="password"
        label={dict.profile.currentPassword}
        required
        disabled={pending}
        errors={state.fieldErrors?.currentPassword}
      />
      <Input
        id="newPassword"
        name="newPassword"
        type="password"
        autoComplete="new-password"
        label={dict.profile.newPassword}
        required
        disabled={pending}
        errors={state.fieldErrors?.password}
      />
      <Input
        id="confirm"
        name="confirm"
        type="password"
        autoComplete="confirm-password"
        label={dict.profile.confirmPassword}
        required
        disabled={pending}
        errors={state.fieldErrors?.confirm}
      />

      {!pending && state.error && <ErrorMessage message={state.error} />}
      {!pending && state.message && (
        <ErrorMessage message={state.message} color="primary" />
      )}

      <SubmitButton text={dict.profile.save} />
    </Form>
  );
}
