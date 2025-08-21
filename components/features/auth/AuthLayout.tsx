import PrivateLayout from "@/app/[lang]/(private)/layout";
import PublicLayout from "@/app/[lang]/(public)/layout";
import type { LayoutProps } from "@/lib/types/app";
import { cookies } from "next/headers";

export default async function AuthLayout({ children, params }: LayoutProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get("userId")?.value;

  return userId ? (
    <PrivateLayout params={params}>{children}</PrivateLayout>
  ) : (
    <PublicLayout params={params}>{children}</PublicLayout>
  );
}
