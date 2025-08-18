"use server";

import { ROUTES } from "@/lib/constants/routes";
import { connectDB } from "@/lib/mongodb";
import { updateProfileSchema } from "@/lib/schemas/user.schema";
import User from "@/models/User";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export interface IUpdateProfileForm {
  error?: string;
  message?: string;
  fieldErrors?: {
    username?: string[];
    currentPassword?: string[];
    newPassword?: string[];
    confirm?: string[];
  };
}

export async function updateProfile(
  _prevState: IUpdateProfileForm,
  formData: FormData,
): Promise<IUpdateProfileForm> {
  const validatedFields = updateProfileSchema.safeParse({
    username: formData.get("username"),
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirm: formData.get("confirm"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid data. Failed to update profile.",
    };
  }

  const { username, currentPassword, newPassword } = validatedFields.data;
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  if (!userId) {
    return { error: "Not authenticated." };
  }

  try {
    await connectDB();
    const user = await User.findById(userId);

    if (!user) {
      return { error: "User not found" };
    }

    const isValidPassword = await user.comparePassword(currentPassword);

    if (!isValidPassword) {
      return { error: "Current password is incorrect." };
    }

    user.username = username;

    if (newPassword) {
      user.passwordHash = newPassword;
    }
    await user.save();
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to update profile." };
  }

  const locale = cookieStore.get("locale")?.value || "";
  const path = locale ? `/${locale}${ROUTES.PROFILE}` : ROUTES.PROFILE;
  revalidatePath(path);

  return { message: "Profile updated." };
}
