"use client";

import AvatarUpload from "@/components/common/AvatarUpload/AvatarUpload";
import SubmitButton from "@/components/common/SubmitButton/SubmitButton";
import ErrorMessage from "@/components/ui/ErrorMessage/ErrorMessage";
import Input from "@/components/ui/Input/Input";
import {
  type IUpdateProfileForm,
  updateProfile,
} from "@/lib/actions/updateProfile";
import { useDictionary } from "@/lib/hooks/useDictionary";
import type { IUser } from "@/models/User";
import { useActionState } from "react";
import styles from "./ProfileForm.module.css";

interface ProfileFormProps {
  user: Pick<IUser, "username" | "bio" | "avatarUrl">;
}

const initialState: IUpdateProfileForm = {
  error: undefined,
  message: undefined,
  fieldErrors: undefined,
};

export default function ProfileForm({ user }: ProfileFormProps) {
  const dict = useDictionary();
  const [state, dispatch, pending] = useActionState(
    updateProfile,
    initialState,
  );

  return (
    <form action={dispatch} className={styles.form}>
      <AvatarUpload
        initialUrl={user.avatarUrl}
        label={dict.profile.avatar}
        errors={state.fieldErrors?.image}
        disabled={pending}
      />
      <Input
        id="username"
        name="username"
        label={dict.profile.username}
        defaultValue={user.username}
        required
        errors={state.fieldErrors?.username}
        disabled={pending}
      />

      {!pending && state.error && <ErrorMessage message={state.error} />}
      {!pending && state.message && (
        <ErrorMessage message={state.message} color="primary" />
      )}

      <SubmitButton text={dict.profile.save} />
    </form>
  );
}
