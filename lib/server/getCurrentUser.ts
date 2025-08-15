import "server-only";
import { getUser } from "@/lib/db-queries/user";

import { connectDB } from "@/lib/mongodb";

import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;
  if (!userId) return null;

  await connectDB();
  return await getUser({ _id: userId });
}
