"use server";
import { ROUTES } from "@/lib/constants/routes";
import { getUser } from "@/lib/db-queries/user";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { redirect } from "next/navigation";
import { hashPassword } from "../utils";

export const signup = async (values: any) => {
  //formData check here
  const { email, password, name } = values;

  try {
    await connectDB();
    const userFound = getUser({ email });
    if (userFound) {
      return { error: "Email already exists!" };
    }
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      // add rest fields from IUser
    });
    const savedUser = await newUser.save();
  } catch {
    return { message: "Database Error: Failed to Create User." };
  } finally {
    redirect(ROUTES.AUTH.SIGNIN);
  }
};
