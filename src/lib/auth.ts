import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import type { Role } from "@prisma/client";
import { redirect } from "~/i18n/routing";
import { headers } from "next/headers";
import type { NextRequest } from "next/server";
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
