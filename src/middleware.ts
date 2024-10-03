import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { ClerkMiddlewareAuth } from "@clerk/nextjs/server";
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

const ignoredRoutes = ["/api/clerk(.*)", "/api/stripe/webhooks(.*)"];

export default clerkMiddleware((auth: ClerkMiddlewareAuth, req, evt) => {
  if (
    ignoredRoutes.some((route) => new RegExp(route).test(req.nextUrl.pathname))
  ) {
    return NextResponse.next();
  }

  const intlResponse = intlMiddleware(req);
  if (intlResponse) return intlResponse;

  if (isProtectedRoute(req)) {
    const { userId } = auth();
    const match = /(\/.*)\/dashboard/.exec(req.nextUrl.pathname);
    const locale = match?.[1] ?? "";

    if (userId) {
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
