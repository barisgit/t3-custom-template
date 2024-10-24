export function logCronJob(message: string, data?: unknown) {
  console.log(`[CRON] ${message}`, data ? JSON.stringify(data, null, 2) : "");
}
