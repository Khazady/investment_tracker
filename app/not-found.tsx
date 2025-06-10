import Typography from "@/components/ui/Typography/Typography";
import { ROUTES } from "@/lib/constants/routes";
import Link from "next/link";

export default async function NotFound() {
  return (
    <div>
      <Typography variant="h2">Not Found</Typography>
      <p>Could not find requested resource</p>
      <Link href={ROUTES.HOME}>Return Home</Link>
    </div>
  );
}
