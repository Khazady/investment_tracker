"use server";

import { ROUTES } from "@/lib/constants/routes";
import { getUser } from "@/lib/db-queries/user";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { signUpUserSchema } from "../schemas/user.schema";

export interface ISignUpForm {
  error?: string;
  message?: string;
  fieldErrors?: {
    email?: string[];
    password?: string[];
    confirm?: string[];
  };
}
export const signup = async (
  _prevState: ISignUpForm,
  formData: FormData,
): Promise<ISignUpForm> => {
  const validatedFields = signUpUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid data. Failed to Create User.",
    };
  }

  const { email, password } = validatedFields.data;
  const cookieStore = await cookies();

  try {
    await connectDB();
    const userFound = await getUser({ email });
    if (userFound) {
      return { error: "Email already exists!" };
    }
    const username = email.split("@")[0];
    const publicSlug = await generateUniqueSlug(username);
    const newUser = new User({
      username,
      email,
      passwordHash: password,
      publicSlug,
      // add rest fields from IUser
    });
    await newUser.save();
  } catch (error) {
    console.log(error);
    return { message: "Database Error: Failed to Create User." };
  }
  const locale = cookieStore.get("locale")?.value;
  redirect(locale ? `/${locale}${ROUTES.AUTH.SIGNIN}` : ROUTES.AUTH.SIGNIN);
};

export async function generateUniqueSlug(base: string): Promise<string> {
  let slug = base;
  let counter = 1;
  while (await User.exists({ publicSlug: slug })) {
    slug = `${base}-${counter}`;
    counter += 1;
  }
  return slug;
}
