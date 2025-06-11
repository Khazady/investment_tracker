"use server";

import { ROUTES } from "@/lib/constants/routes";
import { getUser } from "@/lib/db-queries/user";
import { connectDB } from "@/lib/mongodb";
import { redirect } from "next/navigation";
import { signInUserSchema } from "../schemas/user.schema";
import { cookies } from "next/headers";

export interface ISignInForm {
  error?: string;
  message?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
  };
}

export const signin = async (
  _prevState: ISignInForm,
  formData: FormData,
): Promise<ISignInForm> => {
  const validatedFields = signInUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid data. Failed to Sign In.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await connectDB();
    const existingUser = await getUser({ email });
    if (!existingUser) {
      return { error: "Wrong Email" };
    }
    const isValid = await existingUser.comparePassword(password);
    if (!isValid) {
      return { error: "Wrong Password" };
    }
    cookies().set("userId", String(existingUser._id), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  } catch (error) {
    console.log(error);
    return { message: "Database Error: Failed to Sign In." };
  }

  try {
    redirect(ROUTES.DASHBOARD);
  } catch {
    return { message: "Redirect Error: Failed to Redirect User." };
  }
};
