import { ROUTES } from "@/lib/constants/routes";
import { redirect } from "next/navigation";

export default function IndexPage() {
  //if not logged in - redirect to signin
  redirect(ROUTES.DASHBOARD);
}
