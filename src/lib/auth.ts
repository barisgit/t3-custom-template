import { auth } from "@clerk/nextjs/server";
import { db } from "~/server/db";
import type { Role } from "@prisma/client";

export async function getUserRole() {
  const { userId } = auth();

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
