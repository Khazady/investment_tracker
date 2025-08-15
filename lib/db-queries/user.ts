import type { IUser } from "@/models/User";
import User from "@/models/User";
import type { RootFilterQuery } from "mongoose";

export async function getUser(filter: RootFilterQuery<IUser>) {
  try {
    return await User.findOne(filter);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
