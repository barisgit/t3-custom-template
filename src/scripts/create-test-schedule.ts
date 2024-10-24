import { scriptEnv } from "../utils/loadEnvForScripts";
import { db } from "~/server/db";

async function createTestSchedule() {
  try {
    const schedule = await db.emailSchedule.create({
      data: {
        name: "Test Schedule",
        cronExpression: "*/5 * * * *", // Every 5 minutes
        isActive: true,
        template: {
          create: {
            name: "Test Template",
            subject: "Test Email",
            text: "This is a test email sent at: {{timestamp}}",
            html: "<p>This is a test email sent at: {{timestamp}}</p>",
          },
        },
        group: {
          create: {
            name: "Test Group",
            members: ["your-test-email@example.com"],
            description: "Test group for local development",
          },
        },
      },
      include: {
        template: true,
        group: true,
      },
    });

    console.log("Created test schedule:", schedule);
  } catch (error) {
    console.error("Error creating test schedule:", error);
  }
}

await createTestSchedule().finally(() => void db.$disconnect());
