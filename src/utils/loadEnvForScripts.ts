import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

// Create a simpler env schema just for scripts
export const scriptEnv = createEnv({
  server: {
    POSTGRES_URL: z.string().url(),
    CRON_SECRET: z.string().min(1),
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
  },
  runtimeEnv: {
    POSTGRES_URL: process.env.POSTGRES_URL,
    CRON_SECRET: process.env.CRON_SECRET,
    NODE_ENV: process.env.NODE_ENV,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
