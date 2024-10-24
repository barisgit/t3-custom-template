import { getNextRunDate } from "./cronUtils";
import { db } from "~/server/db";
import { sendEmail } from "./mailgun";

export async function processScheduledEmails() {
  console.log("Starting scheduled email processing:", new Date().toISOString());

  const now = new Date();
  const schedules = await db.emailSchedule.findMany({
    where: {
      isActive: true,
      OR: [{ nextRun: null }, { nextRun: { lte: now } }],
    },
    include: {
      template: true,
      group: true,
    },
  });

  console.log(`Found ${schedules.length} schedules to process`);

  for (const schedule of schedules) {
    try {
      console.log(`Processing schedule: ${schedule.id} - ${schedule.name}`);

      // Calculate next run time
      const nextRun = getNextRunDate(schedule.cronExpression);

      // Send emails to group members
      if (schedule.group?.members) {
        for (const member of schedule.group.members) {
          try {
            await sendEmail({
              to: member,
              subject: schedule.template.subject,
              text: schedule.template.text,
              html: schedule.template.html ?? undefined,
            });

            // Log successful email
            await db.emailLog.create({
              data: {
                to: member,
                subject: schedule.template.subject,
                text: schedule.template.text,
                html: schedule.template.html,
                status: "sent",
                schedule: { connect: { id: schedule.id } }, // Use connect instead of scheduleId
              },
            });
          } catch (emailError) {
            console.error(`Failed to send email to ${member}:`, emailError);

            // Log failed email
            await db.emailLog.create({
              data: {
                to: member,
                subject: schedule.template.subject,
                text: schedule.template.text,
                html: schedule.template.html,
                status: "failed",
                error:
                  emailError instanceof Error
                    ? emailError.message
                    : String(emailError),
                schedule: { connect: { id: schedule.id } }, // Use connect instead of scheduleId
              },
            });
          }
        }
      }

      // Update schedule timestamps
      await db.emailSchedule.update({
        where: { id: schedule.id },
        data: {
          lastRun: now,
          nextRun: nextRun,
        },
      });
    } catch (error) {
      console.error(`Error processing schedule ${schedule.id}:`, error);

      // Log schedule error
      await db.emailLog.create({
        data: {
          to: "SCHEDULE_ERROR",
          subject: `Error processing schedule: ${schedule.name}`,
          text: error instanceof Error ? error.message : "Unknown error",
          status: "failed",
          error: error instanceof Error ? error.stack : String(error),
          schedule: { connect: { id: schedule.id } },
        },
      });
    }
  }
}

// Optional: Add error logging function
async function logScheduleError(scheduleId: string, error: unknown) {
  await db.emailSchedule.update({
    where: { id: scheduleId },
    data: {
      isActive: false, // Optionally disable failing schedules
      error: error instanceof Error ? error.message : String(error),
    },
  });
}
