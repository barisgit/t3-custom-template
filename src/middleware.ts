import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import type { ClerkMiddlewareAuth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { getUserRoleFromApi } from "~/lib/auth";
import { headers } from "next/headers";

import AppConfig from "~/AppConfig";

const navigationProtectedRoutes = AppConfig.navigation
  .filter((item) => item.protected && !item.admin)
  .flatMap((item) => [
    `${item.href}(.*)`, // Default route: /about(.*)
    `/:locale${item.href}(.*)`, // Locale route: /:locale/about(.*)
  ]);

const navigationAdminRoutes = AppConfig.navigation
  .filter((item) => item.admin)
  .flatMap((item) => [
    `${item.href}(.*)`, // Default route: /admin(.*)
    `/:locale${item.href}(.*)`, // Locale route: /:locale/admin(.*)
  ]);

const isProtectedRoute = createRouteMatcher(navigationProtectedRoutes);
const isProtectedAdminRoute = createRouteMatcher(navigationAdminRoutes);
const ignoredRoutes = AppConfig.ignoredRoutes;

const intlMiddleware = createMiddleware({
  locales: AppConfig.locales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

const redirectIfNotAuthenticated = (
  req: NextRequest,
  auth: ClerkMiddlewareAuth,
) => {
  const { userId } = auth();
  if (!userId) {
    const currentPath = req.nextUrl.href;
    const callbackUrl = encodeURIComponent(currentPath);
    return {
      response: NextResponse.redirect(
        new URL(`/sign-in?redirect_url=${callbackUrl}`, req.url),
      ),
      userId: undefined,
    };
  } else return { response: undefined, userId };
};

export default clerkMiddleware(async (auth: ClerkMiddlewareAuth, req) => {
  if (
    ignoredRoutes.some((route) => new RegExp(route).test(req.nextUrl.pathname))
  ) {
    return NextResponse.next();
  }

  // Check for protected routes
  if (isProtectedRoute(req)) {
    console.log("protected route", req.nextUrl.pathname);
    const { response } = redirectIfNotAuthenticated(req, auth);
    if (response) return response;
  }

  if (isProtectedAdminRoute(req)) {
    console.log("protected admin route", req.nextUrl.pathname);
    const { response, userId } = redirectIfNotAuthenticated(req, auth);
    if (response) return response;

    const role = await getUserRoleFromApi(req, userId);
    if (role !== "ADMIN" && role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/unauthorized", req.url));
    }
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next|monitoring).*)", "/", "/(api|trpc)(.*)"],
};
