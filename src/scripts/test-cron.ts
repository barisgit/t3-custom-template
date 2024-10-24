import { scriptEnv } from "../utils/loadEnvForScripts";

async function testCron() {
  console.log("🔄 Testing cron endpoint...");
  console.log("Environment:", {
    nodeEnv: scriptEnv.NODE_ENV,
    hasCronSecret: !!scriptEnv.CRON_SECRET,
  });

  try {
    const response = await fetch("http://localhost:3000/api/cron/emails", {
      headers: {
        Authorization: `Bearer ${scriptEnv.CRON_SECRET}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error(
        `HTTP error! status: ${response.status}, message: ${text}`,
      );
    }

    const data = (await response.json()) as { success: boolean };
    console.log("✅ Cron response:", data);
  } catch (error) {
    console.error("❌ Error:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

testCron().catch(console.error);
