import { NextResponse } from "next/server";
import { db } from "~/server/db";
import { Role } from "@prisma/client";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
      profileImageUrl: string;
    };

    if (!body.id || !body.email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const user = await db.user.create({
      data: {
        id: body.id,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        profileImageUrl: body.profileImageUrl,
        role: Role.USER, // Default role
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 },
    );
  }
}
