import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { AppConfig } from "./utils/AppConfig";

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/:locale/dashboard(.*)",
]);

export default clerkMiddleware((auth, req, evt) => {
  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  if (isProtectedRoute(req)) {
    const locale = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? "";

    if (!auth.userId) {
      const signInUrl = new URL(`${locale}/sign-in`, req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|monitoring).*)", "/", "/(api|trpc)(.*)"],
};
