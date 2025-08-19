"use server";

import { ROUTES } from "@/lib/constants/routes";
import { ERRORS } from "@/lib/constants/errors";
import { getUser } from "@/lib/db-queries/user";
import { connectDB } from "@/lib/mongodb";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signInUserSchema } from "../schemas/user.schema";

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
      message: ERRORS.GENERAL.INVALID_DATA,
    };
  }

  const { email, password } = validatedFields.data;
  const cookieStore = await cookies();

  try {
    await connectDB();
    const existingUser = await getUser({ email });
    if (!existingUser) {
      return { error: ERRORS.AUTH.INVALID_CREDENTIALS };
    }
    const isValid = await existingUser.comparePassword(password);
    if (!isValid) {
      return { error: ERRORS.AUTH.INVALID_CREDENTIALS };
    }
    cookieStore.set("userId", String(existingUser._id), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  } catch (error) {
    console.log(error);
    return { message: ERRORS.GENERAL.DATABASE };
  }

  const locale = cookieStore.get("locale")?.value;
  redirect(locale ? `/${locale}${ROUTES.DASHBOARD}` : ROUTES.DASHBOARD);
};
