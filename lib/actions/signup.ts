"use server";
import { ROUTES } from "@/lib/constants/routes";
import { getUser } from "@/lib/db-queries/user";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { redirect } from "next/navigation";
import { signUpUserSchema } from "../schemas/user.schema";
import { hashPassword } from "../utils";

export interface FormState {
  error?: string;
  message?: string;
  fieldErrors?: {
    email?: string;
    password?: string;
    confirm?: string;
  };
}
export const signup = async (
  _prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const validatedFields = signUpUserSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  });

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten(),
      message: "Invalid data. Failed to Create User.",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await connectDB();
    const userFound = await getUser({ email });
    if (userFound) {
      return { error: "Email already exists!" };
    }
    const hashedPassword = hashPassword(password);
    const username = email.split("@")[0];
    const newUser = new User({
      username,
      email,
      passwordHash: hashedPassword,
      publicSlug: username,
      // add rest fields from IUser
    });
    await newUser.save();
    redirect(ROUTES.AUTH.SIGNIN);
  } catch {
    return { message: "Database Error: Failed to Create User." };
  }
};
