import { NextResponse } from "next/server";
import { processScheduledEmails } from "~/utils/emailCron";
import { env } from "~/env";
import { logCronJob } from "~/utils/logger";

export const runtime = "edge";

export async function GET(req: Request) {
  try {
    // Verify the request is from Vercel Cron
    const authHeader = req.headers.get("authorization");
    if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
      return new Response("Unauthorized", { status: 401 });
    }

    logCronJob("Starting email processing");
    await processScheduledEmails();
    logCronJob("Email processing completed");

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error in cron job", { error });
    logCronJob("Error in cron job", { error });
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
