import { validateCronExpression, getNextRunDate } from "~/utils/cronUtils";
import { processScheduledEmails } from "~/utils/emailCron";

export async function handleCronExecution() {
  try {
    const now = new Date();
    console.log("Processing scheduled emails at:", now.toISOString());
    await processScheduledEmails();
    return { success: true, message: "Cron job executed successfully" };
  } catch (error) {
    console.error("Error in cron execution:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
