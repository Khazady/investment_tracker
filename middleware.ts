import { PRIVATE_ROUTES, ROUTES } from "@/lib/constants/routes";
import type { Locale } from "@/lib/dictionaries/client";
import { defaultLocale, locales } from "@/lib/dictionaries/client";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

function getLocale(request: NextRequest) {
  const cookieLocale = request.cookies.get("locale")?.value;
  const refererHeader = request.headers.get("referer") || "";
  const refererLocale = locales.find((l) => refererHeader.startsWith(`/${l}`));

  if (cookieLocale || refererLocale) {
    return (cookieLocale || refererLocale) as Locale;
  }

  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) {
    const currentLocale = pathname.split("/")[1] as Locale;

    const isPrivate = PRIVATE_ROUTES.some((route) =>
      pathname.startsWith(`/${currentLocale}${route}`),
    );
    const userId = request.cookies.get("userId")?.value;

    if (isPrivate && !userId) {
      const signInUrl = request.nextUrl.clone();
      signInUrl.pathname = `/${currentLocale}${ROUTES.AUTH.SIGNIN}`;
      const redirectResponse = NextResponse.redirect(signInUrl);
      redirectResponse.cookies.set("locale", currentLocale, { path: "/" });
      return redirectResponse;
    }

    const response = NextResponse.next();
    response.cookies.set("locale", currentLocale, { path: "/" });
    return response;
  }

  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
