import { signout } from "@/lib/actions/signout";
import type { LayoutParams } from "@/lib/types/app";

export default function PrivateLayout({ children }: LayoutParams) {
  return (
    <header>
      <form action={signout}>
        <button type="submit">Sign Out</button>
      </form>
      {children}
    </header>
  );
}
