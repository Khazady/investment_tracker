import { ERRORS } from "@/lib/constants/errors";
import type { IUser } from "@/models/User";
import User from "@/models/User";

export async function getUser(filter: Partial<IUser>) {
  try {
    return await User.findOne(filter);
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error(ERRORS.GENERAL.DATABASE);
  }
}
