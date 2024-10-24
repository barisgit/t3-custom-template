import { NextResponse } from "next/server";
import { handleCronExecution } from "~/utils/cronHandler";

export const runtime = "edge";

export async function GET() {
  const result = await handleCronExecution();

  if (result.success) {
    return NextResponse.json({ message: result.message }, { status: 200 });
  } else {
    return NextResponse.json({ error: result.message }, { status: 500 });
  }
}
