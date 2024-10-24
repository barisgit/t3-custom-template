import { scriptEnv } from "../utils/loadEnvForScripts";

async function simulateCron() {
  console.log("🔄 Starting cron simulation...");

  // Run indefinitely
  while (true) {
    try {
      const response = await fetch("http://localhost:3000/api/cron/emails", {
        headers: {
          Authorization: `Bearer ${scriptEnv.CRON_SECRET}`,
        },
      });

      if (!response.ok) {
        const text = await response.text();
        console.error(
          `❌ HTTP error! status: ${response.status}, message: ${text}`,
        );
        continue;
      }

      const data = (await response.json()) as { success: boolean };
      console.log("✅ Cron execution:", data);
    } catch (error) {
      console.error(
        "❌ Error:",
        error instanceof Error ? error.message : error,
      );
    }

    // Wait for 1 minute
    await new Promise((resolve) => setTimeout(resolve, 60 * 1000));
  }
}

simulateCron().catch(console.error);
