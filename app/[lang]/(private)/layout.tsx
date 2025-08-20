import Image from "@/components/ui/Image/Image";
import { signout } from "@/lib/actions/signout";
import { ROUTES } from "@/lib/constants/routes";
import { getDictionary } from "@/lib/dictionaries/server";
import { getCurrentUser } from "@/lib/server/getCurrentUser";
import type { LayoutParams } from "@/lib/types/app";
import Link from "next/link";

export default async function PrivateLayout({
  children,
  params,
}: LayoutParams) {
  const dict = await getDictionary(params);

  const user = await getCurrentUser();

  return (
    <header>
      <nav>
        {user && (
          <Link href={ROUTES.PROFILE}>
            {user.avatarUrl && (
              <Image
                src={user.avatarUrl}
                alt={user.username}
                size={32}
                shape="circle"
              />
            )}
            {user.username}
          </Link>
        )}
        <form action={signout}>
          <button type="submit">{dict.navigation.signOut}</button>
        </form>
      </nav>
      {children}
    </header>
  );
}
