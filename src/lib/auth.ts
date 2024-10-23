import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import type { Role } from "@prisma/client";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

export async function getUserRole(inputUserId?: string) {
  const userId = inputUserId ?? auth().userId;
  if (!userId) return null;

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { role: true },
  });
  return user?.role;
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
