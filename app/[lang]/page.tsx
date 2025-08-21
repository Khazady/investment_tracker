import { ROUTES } from "@/lib/constants/routes";
import { redirect } from "next/navigation";

// SSR: uses redirect, so the page is rendered dynamically on each request
export default function IndexPage() {
  //if not logged in - redirect to signin
  redirect(ROUTES.DASHBOARD);
}
