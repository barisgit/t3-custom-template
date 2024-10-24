import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import type { Role } from "@prisma/client";
import { redirect } from "~/i18n/routing";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { createCaller } from "~/server/api/root";

export async function getUserRole(inputUserId?: string) {
  const userId = inputUserId ?? auth().userId;
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role;
}

export async function getUserRoleFromApi(
  req: NextRequest,
  inputUserId?: string | null,
) {
  if (!inputUserId) return null;

  try {
    // Instead of using TRPC/Prisma directly, we'll make an API call to a regular Node.js endpoint
    const response = await fetch(
      `${req.nextUrl.origin}/api/get-user-role?userId=${inputUserId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    const data = (await response.json()) as { role: Role | null };

    if (!data.role) {
      const clerkUserResponse = await fetch(
        `https://api.clerk.com/v1/users/${inputUserId}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
          },
        },
      );

      const clerkUser = (await clerkUserResponse.json()) as {
        first_name: string;
        last_name: string;
        email_addresses: { email_address: string }[];
        image_url: string;
      };

      // Instead of using TRPC directly, make a POST request to a regular API endpoint
      await fetch(`${req.nextUrl.origin}/api/create-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: inputUserId,
          firstName: clerkUser.first_name ?? "",
          lastName: clerkUser.last_name ?? "",
          email: clerkUser.email_addresses[0]?.email_address ?? "",
          profileImageUrl: clerkUser.image_url ?? "",
        }),
      });
    }

    return data.role;
  } catch (error) {
    console.error("Error fetching user role:", error);
    return null;
  }
}

export async function hasRole(allowedRoles: Role | Role[]) {
  const role = await getUserRole();
  if (!role) return false;

  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];
  return roles.includes(role);
}

export function redirectIfNotAuthenticated(path: string) {
  const { userId } = auth();
  if (!userId) redirect(path);
  else return userId;
}

export function signInIfNotAuthenticated(path?: string) {
  const { userId } = auth();
  if (!userId) {
    const headersList = headers();
    // Get the current URL from headers
    const pathname =
      headersList.get("x-clerk-clerk-url") ?? headersList.get("referer");
    const currentPath = path ?? pathname ?? "/";
    console.log({
      providedPath: path,
      pathname,
      currentPath,
    });
    const callbackUrl = encodeURIComponent(currentPath);
    redirect(`/sign-in?redirect_url=${callbackUrl}`);
  } else return userId;
}
