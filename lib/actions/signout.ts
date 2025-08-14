"use server";

import { ROUTES } from "@/lib/constants/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const signout = async () => {
  const cookieStore = await cookies();
  cookieStore.delete("userId");
  redirect(ROUTES.AUTH.SIGNIN);
};
