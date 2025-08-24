"use server";

import { ERRORS } from "@/lib/constants/errors";
import { ROUTES } from "@/lib/constants/routes";
import { updatePasswordSchema } from "@/lib/schemas/user.schema";
import { getCurrentUser } from "@/lib/server/getCurrentUser";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export interface IUpdatePasswordForm {
  error?: string;
  message?: string;
  fieldErrors?: {
    currentPassword?: string[];
    password?: string[];
    confirm?: string[];
  };
}

export async function updatePassword(
  _prevState: IUpdatePasswordForm,
  formData: FormData,
): Promise<IUpdatePasswordForm> {
  const validatedFields = updatePasswordSchema.safeParse({
    currentPassword: formData.get("currentPassword"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      message: ERRORS.GENERAL.INVALID_DATA,
    };
  }

  const { currentPassword, password } = validatedFields.data;

  const user = await getCurrentUser();

  if (!user) {
    return { error: ERRORS.AUTH.NOT_AUTHENTICATED };
  }

  try {
    const isValidPassword = await user.comparePassword(currentPassword);

    if (!isValidPassword) {
      return { error: ERRORS.AUTH.PASSWORD_INCORRECT };
    }

    user.passwordHash = password;
    await user.save();
  } catch (error) {
    console.error(error);
    return { message: ERRORS.GENERAL.DATABASE };
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "";
  const path = locale ? `/${locale}${ROUTES.PROFILE}` : ROUTES.PROFILE;
  revalidatePath(path);

  return { message: "Password updated." };
}
