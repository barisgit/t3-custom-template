import { scriptEnv } from "../utils/loadEnvForScripts";
import { processScheduledEmails } from "~/utils/emailCron";
import { db } from "~/server/db";

async function testEmailProcessing() {
  try {
    console.log("Starting test email processing...");
    await processScheduledEmails();
    console.log("Email processing completed");
  } catch (error) {
    console.error("Error during email processing:", error);
  } finally {
    await db.$disconnect();
  }
}

testEmailProcessing().catch(console.error);
