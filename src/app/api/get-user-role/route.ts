import { type NextRequest, NextResponse } from "next/server";
import { appRouter } from "~/server/api/root";
import { createCallerFactory } from "~/server/api/trpc";
import { db } from "~/server/db";

const createCaller = createCallerFactory(appRouter);

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
  }

  const context = {
    headers: req.headers,
    user: null,
    db: db,
  };

  const caller = createCaller(context);

  try {
    const userRole = await caller.user.getRole({ userId });
    return NextResponse.json({ role: userRole?.role });
  } catch (error) {
    console.error("Error checking user role:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
